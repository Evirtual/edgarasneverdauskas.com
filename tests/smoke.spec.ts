import { test, expect } from "@playwright/test";

test("home page loads with no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  const response = await page.goto("/");
  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole("heading", { name: "Edgaras Neverdauskas" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("nav links scroll to sections", async ({ page }) => {
  await page.goto("/");
  // Desktop uses the header nav; mobile uses the fixed bottom tab bar.
  await page.locator('a[href="/#work"]:visible').first().click();
  await expect(page).toHaveURL(/#work/);
  await expect(page.getByRole("heading", { name: "Products I've built and shipped" })).toBeVisible();
});

test("mobile bottom nav is visible and desktop header nav is hidden on mobile", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile-only check");
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await expect(page.locator("header nav")).toBeHidden();
});

test("selected work links to a working case study page", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(String(err)));

  await page.goto("/");
  await page.locator('a[href="/work/ampuno/"]').click();
  await expect(page).toHaveURL(/\/work\/ampuno\/?$/);
  await expect(page.getByRole("heading", { name: "Ampuno" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("CV link resolves to a real PDF", async ({ page, request }) => {
  await page.goto("/");
  const href = await page.locator('a[href$=".pdf"]').first().getAttribute("href");
  expect(href).toBe("/Edgaras_Neverdauskas_CV.pdf");
  const res = await request.get(href!);
  expect(res.ok()).toBeTruthy();
  expect(res.headers()["content-type"]).toContain("pdf");
});

test("no horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(hasOverflow).toBe(false);
});

test("sitemap and robots are reachable", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
});

test("theme toggle switches and persists across reload", async ({ page }) => {
  await page.goto("/");
  const initial = await page.evaluate(() =>
    document.documentElement.getAttribute("data-theme")
  );
  await page.getByRole("button", { name: /Switch to (light|dark) mode/ }).click();
  const toggled = await page.evaluate(() =>
    document.documentElement.getAttribute("data-theme")
  );
  expect(toggled).not.toBe(initial);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(toggled);

  // No flash of the wrong theme on reload: body background should already
  // match the stored preference before any client JS re-applies it.
  const expectedBg = toggled === "light" ? "rgb(255, 255, 255)" : "rgb(10, 11, 12)";
  await page.reload();
  const bgOnLoad = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor
  );
  expect(bgOnLoad).toBe(expectedBg);
});
