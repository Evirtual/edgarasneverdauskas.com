// One-off asset generator: renders the favicon mark and OG image via
// Playwright/Chromium at exact pixel sizes, then writes PNGs to /public.
// Not part of the app build — run manually with `node scripts/generate-assets.mjs`.
import { chromium } from "@playwright/test";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

const BG = "#0a0b0c";
const ACCENT = "#5eead4";
const INK = "#f2f2f0";
const MUTED = "#a7abae";

function markHtml(size) {
  const radius = Math.round(size * 0.22);
  const fontSize = Math.round(size * 0.52);
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;background:transparent;}
    .mark{
      width:${size}px;height:${size}px;border-radius:${radius}px;
      background:${BG};
      display:flex;align-items:center;justify-content:center;
      font-family:ui-sans-serif,Arial,sans-serif;font-weight:800;
      font-size:${fontSize}px;color:${ACCENT};line-height:1;
      box-sizing:border-box;border:${Math.max(1, Math.round(size * 0.02))}px solid #1f2224;
    }
    .mark span{transform:translateY(${Math.round(size * 0.02)}px);}
  </style></head><body>
    <div class="mark"><span>E</span></div>
  </body></html>`;
}

function ogHtml() {
  const w = 1200;
  const h = 630;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;}
    .card{
      width:${w}px;height:${h}px;background:${BG};position:relative;overflow:hidden;
      font-family:ui-sans-serif,Arial,sans-serif;box-sizing:border-box;
      display:flex;flex-direction:column;justify-content:center;
      padding:96px;
    }
    .glow{
      position:absolute;top:-260px;left:50%;transform:translateX(-50%);
      width:900px;height:560px;border-radius:50%;
      background:radial-gradient(closest-side, rgba(94,234,212,0.16), transparent 70%);
    }
    .eyebrow{
      font-family:ui-monospace,Menlo,monospace;font-size:20px;letter-spacing:0.2em;
      text-transform:uppercase;color:${ACCENT};margin:0 0 28px 0;position:relative;
    }
    h1{font-size:76px;font-weight:600;color:${INK};margin:0;letter-spacing:-0.02em;position:relative;}
    h2{font-size:40px;font-weight:400;color:${MUTED};margin:14px 0 0 0;position:relative;}
    .stack{
      margin-top:44px;font-family:ui-monospace,Menlo,monospace;font-size:26px;
      color:#6c7275;position:relative;
    }
    .stack b{color:${MUTED};font-weight:400;}
  </style></head><body>
    <div class="card">
      <div class="glow"></div>
      <p class="eyebrow">Phnom Penh, Cambodia</p>
      <h1>Edgaras Neverdauskas</h1>
      <h2>Senior Product Engineer</h2>
      <p class="stack"><b>React · TypeScript · Next.js · AI · Web3 · Fintech</b></p>
    </div>
  </body></html>`;
}

const browser = await chromium.launch();

async function shot(html, size, outFile) {
  const page = await browser.newPage({
    viewport: size,
    deviceScaleFactor: 1,
  });
  await page.setContent(html);
  await page.screenshot({ path: path.join(publicDir, outFile), omitBackground: true });
  await page.close();
}

// Favicon-family PNGs (transparent background outside rounded square)
await shot(markHtml(16), { width: 16, height: 16 }, "favicon-16x16.png");
await shot(markHtml(32), { width: 32, height: 32 }, "favicon-32x32.png");
await shot(markHtml(180), { width: 180, height: 180 }, "apple-touch-icon.png");
await shot(markHtml(192), { width: 192, height: 192 }, "android-chrome-192x192.png");
await shot(markHtml(512), { width: 512, height: 512 }, "android-chrome-512x512.png");
await shot(markHtml(64), { width: 64, height: 64 }, "favicon-master-64.png");

// OG image
await shot(ogHtml(), { width: 1200, height: 630 }, "og-image.png");

await browser.close();

writeFileSync(
  path.join(publicDir, "site.webmanifest"),
  JSON.stringify(
    {
      name: "Edgaras Neverdauskas — Senior Product Engineer",
      short_name: "Edgaras Neverdauskas",
      icons: [
        { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      theme_color: "#0a0b0c",
      background_color: "#0a0b0c",
      display: "standalone",
    },
    null,
    2
  ) + "\n"
);

console.log("Assets generated in /public");
