import { test, expect, type Page } from "@playwright/test";

// The globe idles, follows a drag, and keeps the velocity it was thrown with
// before bleeding back to the idle drift. None of that is visible in the DOM,
// so these read the canvas itself.
//
// The first version of this file passed while the feature was completely dead —
// a `pointer-events-none` on the wrapper meant the canvas never saw a pointer
// at all. Every assertion was satisfied by the idle rotation alone. The tests
// below are built to fail in that case: each one distinguishes "responds to the
// pointer" from "is simply moving".

/** Checksum of a horizontal band through the centre of the globe. */
async function bandHash(page: Page) {
  return page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return 0;
    const ctx = canvas.getContext("2d");
    if (!ctx) return 0;
    const y = Math.max(0, Math.floor(canvas.height / 2) - 20);
    const { data } = ctx.getImageData(0, y, canvas.width, 40);
    let hash = 0;
    for (let i = 0; i < data.length; i += 41) hash = (hash * 31 + (data[i] ?? 0)) >>> 0;
    return hash;
  });
}

/** Mean pixel change between consecutive samples — how fast it is turning.
 *  Counting distinct frames saturates: at any speed above a crawl every sample
 *  already differs, so a throw cannot score higher than the idle drift. */
async function changeRate(page: Page, gapMs = 60, samples = 8) {
  const band = () =>
    page.evaluate(() => {
      const canvas = document.querySelector("canvas");
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return [] as number[];
      const y = Math.max(0, Math.floor(canvas.height / 2) - 20);
      const { data } = ctx.getImageData(0, y, canvas.width, 40);
      const out: number[] = [];
      for (let i = 0; i < data.length; i += 401) out.push(data[i] ?? 0);
      return out;
    });

  let previous = await band();
  let total = 0;
  for (let i = 0; i < samples; i++) {
    await page.waitForTimeout(gapMs);
    const next = await band();
    for (let j = 0; j < Math.min(previous.length, next.length); j++) {
      total += Math.abs((previous[j] ?? 0) - (next[j] ?? 0));
    }
    previous = next;
  }
  return total / samples;
}

/** Distinct frames over a window — used where only "moving at all" matters. */
async function distinctFrames(page: Page, ms: number, samples = 8) {
  const seen = new Set<number>();
  for (let i = 0; i < samples; i++) {
    seen.add(await bandHash(page));
    await page.waitForTimeout(ms / samples);
  }
  return seen.size;
}

test.describe("globe", () => {
  // Serial, because these measure how fast pixels change over wall-clock time.
  // Run in parallel, four Chromium workers contend for the CPU, the frame rate
  // sags unevenly and a rate-based measurement stops meaning anything — the
  // throw test passed alone and failed alongside its siblings.
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ page, isMobile }) => {
    test.skip(!!isMobile, "below lg the globe is a backdrop behind the text, deliberately inert");
    await page.goto("/");
    await page.waitForTimeout(400);
  });

  test("idles on its own", async ({ page }) => {
    await expect(page.locator("canvas")).toBeVisible();
    expect(await distinctFrames(page, 600)).toBeGreaterThan(1);
  });

  test("accepts pointer events at all", async ({ page }) => {
    // The bug that got through: the wrapper disabled them everywhere, so the
    // canvas was never the element under the cursor.
    const box = await page.locator("canvas").boundingBox();
    const atPoint = await page.evaluate(
      ({ x, y }) => {
        const el = document.elementFromPoint(x, y);
        return el?.tagName ?? "none";
      },
      { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 },
    );
    expect(atPoint).toBe("CANVAS");
  });

  test("holding it still stops it — the drag takes over from the idle drift", async ({ page }) => {
    const box = await page.locator("canvas").boundingBox();
    const x = box!.x + box!.width / 2;
    const y = box!.y + box!.height / 2;

    const idle = await changeRate(page);
    expect(idle).toBeGreaterThan(0);

    await page.mouse.move(x, y);
    await page.mouse.down();
    // A frame scheduled just before the handler ran can still land, so let the
    // drag take hold before measuring whether anything is still moving.
    await page.waitForTimeout(150);
    // Held without moving, nothing advances the angle. Not pixel-identical
    // though: the marker over Kampot pulses on its own timer, so the test asks
    // for near-stillness rather than stillness. If the pointer never reached
    // the canvas the drift continues and this sits at roughly the idle rate.
    const whileHeld = await changeRate(page);
    await page.mouse.up();

    expect(whileHeld).toBeLessThan(idle * 0.25);
  });

  test("a throw spins it faster than it idles, then settles back", async ({ page }) => {
    const box = await page.locator("canvas").boundingBox();
    const y = box!.y + box!.height / 2;

    const idle = await changeRate(page);

    // A hard flick. A gentle one lands close enough to the idle drift that the
    // comparison below measures noise rather than signal.
    await page.mouse.move(box!.x + box!.width * 0.1, y);
    await page.mouse.down();
    for (let i = 1; i <= 5; i++) {
      await page.mouse.move(box!.x + box!.width * (0.1 + i * 0.34), y);
    }
    await page.mouse.up();

    // A throw moves far more between samples than the drift does.
    const thrown = await changeRate(page);
    expect(thrown).toBeGreaterThan(idle);

    // SPIN_DECAY is 1.1s, so five seconds is several time constants: whatever
    // it was thrown at, it is back to the drift by now.
    await page.waitForTimeout(5000);
    const settled = await changeRate(page);
    expect(settled).toBeLessThan(thrown);
  });
});
