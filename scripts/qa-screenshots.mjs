import { chromium } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "qa-shots");

const browser = await chromium.launch();

const shots = [
  { url: "http://localhost:4173/", viewport: { width: 1440, height: 900 }, name: "home-desktop.png", fullPage: true },
  { url: "http://localhost:4173/", viewport: { width: 390, height: 844 }, name: "home-mobile.png", fullPage: true },
  { url: "http://localhost:4173/work/ampuno/", viewport: { width: 1440, height: 900 }, name: "case-study-desktop.png", fullPage: true },
];

for (const shot of shots) {
  const page = await browser.newPage({ viewport: shot.viewport });
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  await page.goto(shot.url, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outDir, shot.name), fullPage: shot.fullPage });
  console.log(shot.name, "console errors:", errors.length ? errors : "none");
  await page.close();
}

await browser.close();
