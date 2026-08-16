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
  const menuButton = page.getByRole("button", { name: "Open menu" });
  if (await menuButton.isVisible()) {
    await menuButton.click();
  }
  await page.locator("header").getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/#work/);
  await expect(page.getByRole("heading", { name: "Products I've built and shipped" })).toBeVisible();
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
