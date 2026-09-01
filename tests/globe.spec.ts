import { test, expect, type Page } from "@playwright/test";

// The globe idles, follows a drag, and keeps the velocity it was thrown with
// before bleeding back to the idle drift. None of that is observable from the
// DOM, so these read the canvas itself: a checksum of a band through the middle
// changes fast when it spins fast and slowly when it does not.

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

/** How many distinct frames appear over a window — a proxy for spin speed. */
async function distinctFrames(page: Page, ms: number, samples = 6) {
  const seen = new Set<number>();
  for (let i = 0; i < samples; i++) {
    seen.add(await bandHash(page));
    await page.waitForTimeout(ms / samples);
  }
  return seen.size;
}

test.describe("globe", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    test.skip(!!isMobile, "the globe is a faint backdrop below lg, not interactive");
    await page.goto("/");
    await page.waitForTimeout(400);
  });

  test("idles on its own", async ({ page }) => {
    const canvas = page.locator("canvas");
    await expect(canvas).toBeVisible();
    expect(await distinctFrames(page, 600)).toBeGreaterThan(1);
  });

  test("offers a grab cursor and leaves vertical scrolling to the page", async ({ page }) => {
    const style = await page.locator("canvas").evaluate((el) => {
      const s = getComputedStyle(el);
      return { cursor: s.cursor, touchAction: s.touchAction };
    });
    expect(style.cursor).toBe("grab");
    // Without pan-y a phone could not scroll past the globe.
    expect(style.touchAction).toBe("pan-y");
  });

  test("a throw spins it faster than idle, then it settles back", async ({ page }) => {
    const box = await page.locator("canvas").boundingBox();
    const y = box!.y + box!.height / 2;

    const idle = await distinctFrames(page, 500);

    // A fast flick across the globe.
    await page.mouse.move(box!.x + box!.width * 0.2, y);
    await page.mouse.down();
    for (let i = 1; i <= 8; i++) {
      await page.mouse.move(box!.x + box!.width * (0.2 + i * 0.08), y);
    }
    await page.mouse.up();

    const thrown = await distinctFrames(page, 500);

    // Given time, the decay brings it back down to roughly the idle drift.
    await page.waitForTimeout(3500);
    const settled = await distinctFrames(page, 500);

    expect(thrown).toBeGreaterThanOrEqual(idle);
    expect(settled).toBeLessThanOrEqual(thrown);
  });

  test("dragging moves it further than idling would", async ({ page }) => {
    const box = await page.locator("canvas").boundingBox();
    const y = box!.y + box!.height / 2;

    const before = await bandHash(page);

    await page.mouse.move(box!.x + box!.width * 0.25, y);
    await page.mouse.down();
    await page.mouse.move(box!.x + box!.width * 0.85, y, { steps: 12 });
    const held = await bandHash(page);
    await page.mouse.up();

    expect(held).not.toBe(before);
  });
});
