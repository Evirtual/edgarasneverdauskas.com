// Renders public/Edgaras_Neverdauskas_CV.pdf from the same data the site uses.
//
// The CV used to be a hand-made PDF with no source, so it drifted out of sync
// with the site: it still said Phnom Penh, still merged LiquidLoans with Fetch
// Oracle, and still carried dates the site had moved on from. Generating it
// from src/lib/content.ts means a fact can only be wrong in one place.
//
//   npm run cv
//
// The design follows the portfolio rather than the old PDF: experience is the
// same rail-and-dot timeline the site renders, products carry the tech chips,
// and the toolkit closes. Type is Geist Sans/Mono and the palette is the
// site's own light theme, both read from the project so they cannot drift.
import { chromium } from "@playwright/test";
import { mkdtemp, writeFile, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  site,
  expertise,
  experience,
  earlierExperience,
  projects,
} from "../src/lib/content.ts";
import {
  summary,
  experienceBullets,
  productBullets,
  languages,
} from "../src/lib/cv.ts";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const OUT = join(root, "public", "Edgaras_Neverdauskas_CV.pdf");

// The site's own typefaces, straight from the dependency — no vendored copy to
// fall out of date, and no network fetch that could silently fall back.
const fonts = join(root, "node_modules", "geist", "dist", "fonts");
const b64 = async (p) => (await readFile(p)).toString("base64");
const sansFont = await b64(join(fonts, "geist-sans", "Geist-Variable.woff2"));
const monoFont = await b64(join(fonts, "geist-mono", "GeistMono-Variable.woff2"));

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Bullets are keyed by org/slug so a rename fails loudly instead of silently. */
function bulletsFor(map, key, label) {
  const found = map[key];
  if (!found) throw new Error(`No CV bullets for ${label} "${key}" — add them to src/lib/cv.ts`);
  return found;
}

// A role with no bullets renders none at all rather than an empty list.
const li = (items) =>
  items.length ? `<ul>${items.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : "";

const section = (eyebrow, body) => `
  <section>
    <p class="eyebrow">${esc(eyebrow)}</p>
    ${body}
  </section>`;

// Two rows rather than one: at this measure a single line wraps mid phone number.
const contactRow = [
  esc(site.location),
  `<a href="mailto:${site.email}">${esc(site.email)}</a>`,
  esc(site.phone),
].join('<span class="sep">·</span>');

const linkRow = [
  `<a href="${site.url}">${esc(site.url.replace("https://", ""))}</a>`,
  `<a href="${site.linkedin}">${esc(site.linkedin.replace("https://", ""))}</a>`,
  `<a href="${site.github}">${esc(site.github.replace("https://", ""))}</a>`,
].join('<span class="sep">·</span>');

const productEntry = (p) => `
  <div class="entry">
    <div class="row">
      <p class="name">${esc(p.name)}<span class="role"> · ${esc(p.role)}</span></p>
      <p class="when">Since ${esc(p.started)}</p>
    </div>
    ${li(bulletsFor(productBullets, p.slug, "project slug"))}
  </div>`;

const earlierEntries = earlierExperience.map((e) => ({
  period: e.period,
  role: e.role,
  org: e.orgs.join(", "),
  location: e.location,
  bullets: e.description,
}));

const experienceEntry = (e, i) => `
  <li class="tl-item">
    <span class="dot${i === 0 ? " dot-now" : ""}"></span>
    <p class="when when-left">${esc(e.period)}</p>
    <p class="name">${esc(e.role)}<span class="role"> · ${esc(e.org)}</span></p>
    <p class="where">${esc(e.location)}</p>
    ${li(e.bullets ?? bulletsFor(experienceBullets, e.org, "experience org"))}
  </li>`;

// Ampuno is covered in full under Selected products, and the Independent
// Product Engineer entry already accounts for that period of self-employment,
// so repeating it in the timeline says nothing new. Listed by org name; the
// site keeps its own entry either way.
const COVERED_BY_PRODUCTS = ["Ampuno"];
const timelineRoles = experience.filter((e) => !COVERED_BY_PRODUCTS.includes(e.org));

const sections = {
  products: section("Selected products", projects.map(productEntry).join("")),
  experience: section(
    "Professional experience",
    `<ul class="timeline">${[...timelineRoles, ...earlierEntries]
      .map(experienceEntry)
      .join("")}</ul>`,
  ),
  toolkit: section(
    "Toolkit",
    expertise
      .map((g) => `<p class="skill"><b>${esc(g.title)}:</b> ${esc(g.items.join(", "))}</p>`)
      .join(""),
  ),
  languages: section(
    "Languages",
    `<p class="langs">${languages
      .map((l) => `<b>${esc(l.name)}:</b> ${esc(l.level)}`)
      .join('<span class="sep">·</span>')}</p>`,
  ),
};

// Experience leads, because this CV is aimed at getting hired: recruiters and
// CV parsers look for the employment block first. Swap the first two keys to
// put products first, which reads better for advisory and client outreach.
const SECTION_ORDER = ["experience", "products", "toolkit", "languages"];

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<style>
  @font-face { font-family:"Geist"; src:url(data:font/woff2;base64,${sansFont}) format("woff2"); font-weight:100 900; font-display:block; }
  @font-face { font-family:"Geist Mono"; src:url(data:font/woff2;base64,${monoFont}) format("woff2"); font-weight:100 900; font-display:block; }

  /* The site's light theme, verbatim from globals.css. */
  :root {
    --ink: #0b0c0d;
    --ink-muted: #55585d;
    --ink-faint: #86898e;
    --accent: #0d9488;
    --border: #e8e8ea;
    --border-strong: #d1d2d5;
  }
  * { box-sizing: border-box; }
  @page { size: Letter; margin: 0.5in 0.6in 0.45in; }
  body {
    margin: 0; color: var(--ink); background: #fff;
    font-family: "Geist", ui-sans-serif, system-ui, sans-serif;
    font-size: 9.5pt; line-height: 1.38;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  /* Preview only: mimic the printed measure so --html looks like the PDF.
     Letter minus the 0.6in side margins is 7.3in of content. */
  @media screen {
    html { background: #55585d; }
    body { width: 7.3in; margin: 24px auto; padding: 0.5in 0.6in; box-shadow: 0 2px 24px rgba(0,0,0,.3); }
  }
  a { color: inherit; text-decoration: none; }

  header { margin-bottom: 2pt; }
  .avail {
    font-family: "Geist Mono", ui-monospace, monospace;
    font-size: 6.6pt; text-transform: uppercase; letter-spacing: 0.18em;
    color: var(--accent); margin: 0 0 3pt;
  }
  h1 { font-size: 23pt; font-weight: 500; letter-spacing: -0.02em; margin: 0; }
  .title { font-size: 11pt; color: var(--ink-muted); margin: 1pt 0 5pt; }
  .contact {
    font-family: "Geist Mono", ui-monospace, monospace;
    font-size: 7.8pt; color: var(--ink-muted); margin: 0;
  }
  .sep { padding: 0 4pt; color: var(--border-strong); }
  /* The links sit a shade back from the contact details above them. */
  .contact-links { color: var(--ink-faint); }
  .summary { font-size: 9.5pt; color: var(--ink-muted); margin: 6pt 0 0; }
  .summary strong { color: var(--ink); font-weight: 500; }

  section { margin-top: 10pt; }
  .eyebrow {
    font-family: "Geist Mono", ui-monospace, monospace;
    font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.2em;
    color: var(--accent); margin: 0 0 5pt;
    padding-bottom: 4pt; border-bottom: 0.6pt solid var(--border);
    break-after: avoid;
  }

  .entry { margin-top: 8pt; break-inside: avoid; }
  .row { display: flex; align-items: baseline; justify-content: space-between; gap: 10pt; }
  .name { font-size: 10pt; font-weight: 500; margin: 0; }
  .name .role { font-size: 8.5pt; font-weight: 400; color: var(--accent); }
  .when {
    font-family: "Geist Mono", ui-monospace, monospace;
    font-size: 7.5pt; color: var(--ink-faint); margin: 0; white-space: nowrap;
  }
  .where {
    font-family: "Geist Mono", ui-monospace, monospace;
    font-size: 7.2pt; color: var(--ink-faint); margin: 1pt 0 0;
  }

  ul { margin: 3pt 0 0; padding-left: 10pt; }
  li { font-size: 9pt; color: var(--ink-muted); margin-bottom: 2pt; }
  li::marker { color: var(--border-strong); }

  /* The experience rail, matching the site's Experience section: a continuous
     line with a marker per role, the current one picked out in the accent.
     The dot's white ring punches a hole so the line reads as passing behind. */
  .timeline { list-style: none; margin: 0; padding: 0 0 0 14pt; border-left: 0.6pt solid var(--border); }
  .tl-item { position: relative; margin-top: 6pt; break-inside: avoid; }
  .tl-item:first-child { margin-top: 2pt; }
  .dot {
    position: absolute; left: -17.2pt; top: 2.4pt;
    width: 5.5pt; height: 5.5pt; border-radius: 50%;
    background: var(--border-strong); box-shadow: 0 0 0 3pt #fff;
  }
  .dot-now { background: var(--accent); }
  .when-left { margin-bottom: 1.5pt; }

  .skill { margin: 0 0 3pt; font-size: 9pt; color: var(--ink-muted); }
  .skill b { color: var(--ink); font-weight: 500; }
  .langs { font-size: 9pt; color: var(--ink-muted); margin: 0; }
  .langs b { color: var(--ink); font-weight: 500; }
</style></head>
<body>
  <header>
    <p class="avail">${esc(site.location)} — ${esc(site.availability)}</p>
    <h1>${esc(site.name)}</h1>
    <p class="title">${esc(site.title)}</p>
    <p class="contact">${contactRow}</p>
    <p class="contact contact-links">${linkRow}</p>
    <p class="summary"><strong>${esc(summary.lead)}</strong> ${esc(summary.rest)}</p>
  </header>

  ${SECTION_ORDER.map((k) => sections[k]).join("\n")}
</body></html>`;

// `npm run cv -- --html` also drops the rendered HTML beside the PDF, which is
// far easier to iterate on than a PDF viewer.
if (process.argv.includes("--html")) {
  const debugPath = join(root, "out", "cv-preview.html");
  await writeFile(debugPath, html, "utf8").catch(() => {});
  console.log("Also wrote " + debugPath);
}

const dir = await mkdtemp(join(tmpdir(), "cv-"));
const pageFile = join(dir, "cv.html");
await writeFile(pageFile, html, "utf8");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file://${pageFile.replace(/\\/g, "/")}`, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
const fontsOk = await page.evaluate(
  () => document.fonts.check("500 23pt Geist") && document.fonts.check("400 7pt 'Geist Mono'"),
);

// The whole employment history is meant to land on page one, so page two opens
// on Selected products. It fits by only a few points, so check rather than
// trust: adding a bullet is exactly the edit that would quietly break it.
const pageOne = await page.evaluate(() => {
  const body = document.body;
  const pad = parseFloat(getComputedStyle(body).paddingTop);
  const pageHeight = (11 - 0.5 - 0.45) * 96; // Letter minus vertical margins
  const origin = body.getBoundingClientRect().top + window.scrollY + pad;
  const last = [...document.querySelectorAll(".tl-item")].pop();
  if (!last) return { ok: true, headroom: 0 };
  const bottom = last.getBoundingClientRect().bottom + window.scrollY - origin;
  return { ok: bottom < pageHeight, headroom: Math.round(pageHeight - bottom) };
});

await page.pdf({
  path: OUT,
  format: "Letter",
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: "<div></div>",
  footerTemplate: `<div style="width:100%;padding:0 0.6in;font-family:ui-monospace,monospace;font-size:6.5pt;color:#86898e;display:flex;justify-content:space-between;">
      <span>${esc(site.name)} · ${esc(site.title)}</span>
      <span>Page <span class="pageNumber"></span>/<span class="totalPages"></span></span>
    </div>`,
  margin: { top: "0.5in", right: "0.6in", bottom: "0.45in", left: "0.6in" },
});

await browser.close();
await rm(dir, { recursive: true, force: true });

if (!fontsOk) console.warn("WARNING: Geist did not load; the PDF fell back to a system face.");
if (!pageOne.ok) {
  console.warn(
    `WARNING: the experience timeline overflows page 1 by ${-pageOne.headroom}px, so page 2 no longer starts with Selected products. Trim a bullet or tighten spacing.`,
  );
} else if (pageOne.headroom < 12) {
  console.warn(`Note: only ${pageOne.headroom}px of room left on page 1.`);
}
console.log(`Wrote ${OUT}`);
