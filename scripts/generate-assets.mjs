// One-off asset generator: renders the favicon mark and OG image via
// Playwright/Chromium at exact pixel sizes, then writes PNGs to /public.
// Not part of the app build — run manually with `node scripts/generate-assets.mjs`.
import { chromium } from "@playwright/test";
import pngToIco from "png-to-ico";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

const BG = "#0a0b0c";
const ACCENT = "#5eead4";
const INK = "#f2f2f0";
const MUTED = "#a7abae";

// Same "EN." mark used for the in-app logo (src/components/LogoMark.tsx),
// rendered here (with a system-font fallback for the Geist variable, which
// isn't loaded on this blank page) so the favicon/app icons are the same
// asset as the header logo, not a lookalike.
const MARK_FONT_STACK =
  "-apple-system, Segoe UI, Roboto, Arial, sans-serif";

// Measured (via canvas pixel-scan) ink bounds of "EN" at x=0 y=19.3, font-size 21,
// weight 700, with this font stack: roughly x:[1.6, 26.1], cap-height top≈4.6.
// The accent square sits after it with a small gap, vertically centered on the
// cap-height band — kept in sync with src/components/LogoMark.tsx by hand.
function markSvgInner() {
  return `
    <text x="0" y="19.3" font-family="${MARK_FONT_STACK}" font-weight="700" font-size="21" fill="${INK}">EN</text>
    <rect x="30.1" y="8.7" width="6.5" height="6.5" rx="1.2" fill="${ACCENT}" />
  `;
}

function markHtml(size) {
  const radius = Math.round(size * 0.22);
  // Glyph fills nearly the full icon, edge to edge — the mark should read
  // clearly as content, not float in a mostly-empty square.
  const glyphWidth = Math.round(size * 0.92);
  const glyphHeight = Math.round(glyphWidth * (24 / 38));
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;background:transparent;}
    .mark{
      width:${size}px;height:${size}px;border-radius:${radius}px;
      background:${BG};
      display:flex;align-items:center;justify-content:center;
      box-sizing:border-box;
    }
  </style></head><body>
    <div class="mark">
      <svg width="${glyphWidth}" height="${glyphHeight}" viewBox="0 0 38 24">
        ${markSvgInner()}
      </svg>
    </div>
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
    .badge{
      position:relative;width:84px;height:52px;border-radius:14px;
      background:${BG};border:1px solid #1f2224;
      display:flex;align-items:center;justify-content:center;margin-bottom:32px;
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
      <div class="badge">
        <svg width="70" height="44" viewBox="0 0 38 24">
          ${markSvgInner()}
        </svg>
      </div>
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

const icoBuffer = await pngToIco([
  path.join(publicDir, "favicon-16x16.png"),
  path.join(publicDir, "favicon-32x32.png"),
  path.join(publicDir, "favicon-master-64.png"),
]);
writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
rmSync(path.join(publicDir, "favicon-master-64.png"), { force: true });

writeFileSync(
  path.join(publicDir, "site.webmanifest"),
  JSON.stringify(
    {
      id: "/",
      name: "Edgaras Neverdauskas — Senior Product Engineer",
      short_name: "Edgaras Neverdauskas",
      description:
        "Senior Product Engineer building modern web, AI, fintech and Web3 products with React, TypeScript and Next.js.",
      start_url: "/",
      scope: "/",
      display: "standalone",
      orientation: "portrait-primary",
      theme_color: "#0a0b0c",
      background_color: "#0a0b0c",
      icons: [
        { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      ],
    },
    null,
    2
  ) + "\n"
);

console.log("Assets generated in /public");
