// LinkedIn cover generator: renders brand/linkedin-cover.png at 1584x396,
// LinkedIn's personal-profile cover size, via Playwright/Chromium.
//
// Not part of the app build — run manually with `npm run cover`.
//
// The globe is the site's own globe, not a lookalike: the point cloud comes
// from src/lib/globe-land.ts and the projection below is the same maths as
// src/components/Globe.tsx, held at a single frame. Copy comes from
// content.ts. Both mean the cover cannot quietly drift from the portfolio.
//
// The eyebrow carries no place name. A cover is a baked PNG on someone else's
// site, so a city in it goes stale on the next move and cannot be quietly
// regenerated the way the portfolio can.
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { site } from "../src/lib/content.ts";
import { buildGlobePoints, latLonToVector } from "../src/lib/globe-land.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const outDir = path.join(root, "brand");
mkdirSync(outDir, { recursive: true });

// LinkedIn's stated cover size. Rendered at 3x and left at that resolution:
// LinkedIn downscales, and downscaling a 3x render is what keeps the 1px dots
// from turning into the mush this replaces.
const W = 1584;
const H = 396;
const SCALE = 3;

// Dark theme tokens, verbatim from src/app/globals.css.
const BG = "#0a0b0c";
const INK = "#f2f2f0";
const INK_MUTED = "#a7abae";
const BORDER = "#1f2224";
const BORDER_STRONG = "#2c3033";
const ACCENT = "#5eead4";

const fontsDir = path.join(root, "node_modules", "geist", "dist", "fonts");
const b64 = async (p) => (await readFile(p)).toString("base64");
const sansFont = await b64(
  path.join(fontsDir, "geist-sans", "Geist-Variable.woff2")
);
const monoFont = await b64(
  path.join(fontsDir, "geist-mono", "GeistMono-Variable.woff2")
);

// ---------------------------------------------------------------------------
// Globe
// ---------------------------------------------------------------------------

// Matches Globe.tsx: SAMPLES at the desktop breakpoint, and the same 1° tilt.
// Keeping the sample count identical is what makes this the site's globe at a
// larger size rather than a denser one that merely resembles it.
const SAMPLES = 6000;
const TILT = (1 * Math.PI) / 180;
const BUCKETS = 32;
const HOME = latLonToVector(10.61, 104.18);

// Globe.tsx projects x to the screen as `z*sinA - x*cosA`, so a point sits dead
// centre when lon + angle = 90°. Solving that for home puts the marker on the
// meridian facing the viewer — the one framing of the sphere that is about him
// rather than arbitrary.
const ANGLE = Math.PI / 2 - (104.18 * Math.PI) / 180;

const points = buildGlobePoints(SAMPLES);

/**
 * The draw body of Globe.tsx, minus the animation: one frame, with the marker
 * at the same fixed phase the component itself uses under reduced motion.
 * Returns paint instructions rather than drawing, so the browser side stays a
 * dumb renderer and the geometry is verifiable here.
 */
function globeOps(size) {
  const center = size / 2;
  const radius = size * 0.42;
  const cosA = Math.cos(ANGLE);
  const sinA = Math.sin(ANGLE);
  const cosT = Math.cos(TILT);
  const sinT = Math.sin(TILT);

  // Four groups, painted far hemisphere first so near-side dots sit on top.
  const groups = {
    backInk: [],
    backAccent: [],
    frontInk: [],
    frontAccent: [],
  };
  for (const key of Object.keys(groups)) {
    groups[key] = Array.from({ length: BUCKETS }, () => []);
  }

  for (const point of points) {
    const rx = point.z * sinA - point.x * cosA;
    const rz = point.x * sinA + point.z * cosA;
    const ry = point.y * cosT - rz * sinT;
    const depth = point.y * sinT + rz * cosT;
    const isFront = depth > 0;

    let alpha;
    let dotRadius;
    if (point.land) {
      alpha = isFront ? 0.22 + depth * 0.72 : 0.08 * (1 + depth);
      dotRadius = isFront ? 0.9 + depth * 0.8 : 0.7;
    } else {
      alpha = isFront ? 0.06 + depth * 0.1 : 0.03 * (1 + depth);
      dotRadius = isFront ? 0.7 : 0.6;
    }

    const bucket = Math.min(BUCKETS - 1, Math.floor(alpha * BUCKETS));
    const key = point.accent
      ? isFront
        ? "frontAccent"
        : "backAccent"
      : isFront
        ? "frontInk"
        : "backInk";

    groups[key][bucket].push([
      +(center + rx * radius).toFixed(2),
      +(center - ry * radius).toFixed(2),
      +dotRadius.toFixed(2),
    ]);
  }

  // Home marker, still: two radar rings at the reduced-motion phase.
  const hx = HOME.z * sinA - HOME.x * cosA;
  const hz = HOME.x * sinA + HOME.z * cosA;
  const hy = HOME.y * cosT - hz * sinT;
  const hDepth = HOME.y * sinT + hz * cosT;
  const marker =
    hDepth > 0
      ? {
          x: center + hx * radius,
          y: center - hy * radius,
          facing: Math.min(1, hDepth * 3),
          phase: 0.35,
        }
      : null;

  return { groups, marker, size };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

// The same "EN." mark as the favicon and the in-app logo.
const MARK = `
  <svg width="76" height="48" viewBox="0 0 38 24" fill="none">
    <text x="0" y="19.3" font-family="Geist, sans-serif" font-weight="700"
          font-size="21" fill="${INK}">EN</text>
    <rect x="30.1" y="12.8" width="6.5" height="6.5" rx="1.2" fill="${ACCENT}" />
  </svg>`;

const esc = (v) =>
  String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const stackHtml = site.stack
  .map(
    (item, i) =>
      `<span>${esc(item)}</span>` +
      (i < site.stack.length - 1 ? `<i>&middot;</i>` : "")
  )
  .join("");

function coverHtml(globeSize) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family:"Geist"; src:url(data:font/woff2;base64,${sansFont}) format("woff2"); font-weight:100 900; font-display:block; }
  @font-face { font-family:"Geist Mono"; src:url(data:font/woff2;base64,${monoFont}) format("woff2"); font-weight:100 900; font-display:block; }
  html,body{margin:0;padding:0;}
  .cover{
    position:relative; width:${W}px; height:${H}px; background:${BG};
    overflow:hidden; box-sizing:border-box;
    font-family:"Geist", ui-sans-serif, system-ui, sans-serif;
  }
  /* Same teal bloom as the OG card, pulled toward the globe. */
  .glow{
    position:absolute; top:-300px; right:60px; width:820px; height:620px;
    border-radius:50%; pointer-events:none;
    background:radial-gradient(closest-side, rgba(94,234,212,0.13), transparent 70%);
  }
  .vignette{
    position:absolute; inset:0; pointer-events:none;
    background:linear-gradient(90deg, ${BG} 18%, rgba(10,11,12,0) 52%);
  }
  /* Hairline top and bottom, so the cover reads as a band rather than a
     rectangle that happens to be dark. */
  .rule-h{position:absolute;left:0;right:0;height:1px;background:${BORDER};}

  /* LinkedIn drops the avatar over the bottom-left of the cover. On a ~760px
     card a 152px photo scales to roughly 320px at this size, sitting about
     x 50-370 and y 240-396, so the copy starts clear of that column outright
     rather than trusting it to miss. */
  .copy{
    position:absolute; left:420px; top:80px; z-index:2;
    padding-left:44px; border-left:1px solid ${BORDER_STRONG};
  }
  .mark{ margin-bottom:26px; height:48px; }
  .eyebrow{
    font-family:"Geist Mono", ui-monospace, monospace;
    font-size:17px; letter-spacing:0.2em; text-transform:uppercase;
    color:${ACCENT}; margin:0 0 18px 0; white-space:nowrap;
  }
  h1{
    font-size:64px; font-weight:500; letter-spacing:-0.02em; line-height:1.05;
    color:${INK}; margin:0;
  }
  .stack{
    display:flex; align-items:center; gap:14px; margin:22px 0 0 0;
    font-family:"Geist Mono", ui-monospace, monospace;
    font-size:19px; color:${INK_MUTED};
  }
  .stack i{ color:${BORDER_STRONG}; font-style:normal; }

  canvas{ position:absolute; right:96px; top:${(H - globeSize) / 2}px; }
  </style></head><body>
    <div class="cover">
      <canvas id="globe" width="${globeSize}" height="${globeSize}"
              style="width:${globeSize}px;height:${globeSize}px"></canvas>
      <div class="glow"></div>
      <div class="vignette"></div>
      <div class="rule-h" style="top:0"></div>
      <div class="rule-h" style="bottom:0"></div>
      <div class="copy">
        <div class="mark">${MARK}</div>
        <p class="eyebrow">${esc(site.availability)}</p>
        <h1>${esc(site.title)}</h1>
        <div class="stack">${stackHtml}</div>
      </div>
    </div>
  </body></html>`;
}

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

const GLOBE_SIZE = 362; // 0.42 radius => a ~304px sphere, clear of both edges
const ops = globeOps(GLOBE_SIZE);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: W, height: H },
  deviceScaleFactor: SCALE,
});
await page.setContent(coverHtml(GLOBE_SIZE));
await page.evaluate(
  ([ops, ink, accent, scale]) => {
    const canvas = document.getElementById("globe");
    // Back the canvas with real device pixels; CSS keeps it at layout size.
    canvas.width = ops.size * scale;
    canvas.height = ops.size * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    const hex = (h) => [
      parseInt(h.slice(1, 3), 16),
      parseInt(h.slice(3, 5), 16),
      parseInt(h.slice(5, 7), 16),
    ];
    const [ir, ig, ib] = hex(ink);
    const [ar, ag, ab] = hex(accent);

    const paint = (buckets, rgb) => {
      buckets.forEach((dots, i) => {
        if (!dots.length) return;
        ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${(i + 0.5) / 32})`;
        ctx.beginPath();
        for (const [x, y, r] of dots) {
          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, Math.PI * 2);
        }
        ctx.fill();
      });
    };

    paint(ops.groups.backInk, [ir, ig, ib]);
    paint(ops.groups.backAccent, [ar, ag, ab]);
    paint(ops.groups.frontInk, [ir, ig, ib]);
    paint(ops.groups.frontAccent, [ar, ag, ab]);

    const m = ops.marker;
    if (m) {
      for (const offset of [0, 0.5]) {
        const p = (m.phase + offset) % 1;
        ctx.strokeStyle = `rgba(${ar},${ag},${ab},${(1 - p) * 0.45 * m.facing})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 3.5 + p * 17, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = `rgba(${ar},${ag},${ab},${0.22 * m.facing})`;
      ctx.beginPath();
      ctx.arc(m.x, m.y, 7.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(${ar},${ag},${ab},${m.facing})`;
      ctx.beginPath();
      ctx.arc(m.x, m.y, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
  },
  [ops, INK, ACCENT, SCALE]
);

await page.waitForTimeout(120); // let the embedded fonts settle before the shot
const buffer = await page.screenshot({ type: "png" });
await browser.close();

const outFile = path.join(outDir, "linkedin-cover.png");
writeFileSync(outFile, buffer);
console.log(
  `Wrote ${outFile} (${W * SCALE}x${H * SCALE}, for a ${W}x${H} slot)`
);
