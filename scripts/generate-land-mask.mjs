// Regenerates src/lib/land-mask.ts from Natural Earth 110m land polygons.
//
//   node scripts/generate-land-mask.mjs
//
// Rasterises the coastlines into a 1-degree land bitmask (row-major, lat -90
// to +90, lon -180 to +180). The globe samples ~6k points over the sphere,
// roughly 1.7 degrees apart, so a 1-degree grid is finer than the dots it feeds.
import { writeFileSync } from "node:fs";

const SOURCE =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson";
const COLS = 360;
const ROWS = 180;

const response = await fetch(SOURCE);
if (!response.ok) {
  throw new Error(`Failed to fetch land data: ${response.status}`);
}
const geo = await response.json();

// Flatten every ring (outer rings and holes alike) into one edge list. Land
// polygons never overlap, so an even-odd fill across all of them yields land
// while excluding holes such as the Caspian.
const edges = [];
function addRing(ring) {
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [ax, ay] = ring[j];
    const [bx, by] = ring[i];
    if (ay === by) continue; // horizontal edges never cross a scanline
    edges.push([ax, ay, bx, by]);
  }
}

for (const feature of geo.features) {
  const geometry = feature.geometry;
  if (geometry.type === "Polygon") geometry.coordinates.forEach(addRing);
  else if (geometry.type === "MultiPolygon")
    geometry.coordinates.forEach((polygon) => polygon.forEach(addRing));
}

const bytes = new Uint8Array((COLS * ROWS) / 8);
let landCells = 0;

for (let row = 0; row < ROWS; row++) {
  const lat = -90 + row + 0.5;
  const crossings = [];

  for (const [x1, y1, x2, y2] of edges) {
    if (y1 > lat !== y2 > lat) {
      crossings.push(x1 + ((lat - y1) * (x2 - x1)) / (y2 - y1));
    }
  }

  crossings.sort((a, b) => a - b);

  for (let k = 0; k + 1 < crossings.length; k += 2) {
    // Cell centres sit at -180 + col + 0.5
    const colStart = Math.max(0, Math.ceil(crossings[k] - 0.5 + 180));
    const colEnd = Math.min(COLS - 1, Math.floor(crossings[k + 1] - 0.5 + 180));
    for (let col = colStart; col <= colEnd; col++) {
      const bit = row * COLS + col;
      bytes[bit >> 3] |= 128 >> (bit & 7);
      landCells++;
    }
  }
}

const base64 = Buffer.from(bytes).toString("base64");

writeFileSync(
  "src/lib/land-mask.ts",
  `// Generated from Natural Earth 110m land data — do not edit by hand.
// Run: node scripts/generate-land-mask.mjs
// One bit per 1-degree cell, row-major from lat -90 to +90, lon -180 to +180.

export const LAND_MASK_COLS = ${COLS};
export const LAND_MASK_ROWS = ${ROWS};
export const LAND_MASK_BASE64 =
  "${base64}";
`
);

console.log(
  `wrote src/lib/land-mask.ts — ${landCells} land cells ` +
    `(${((landCells / (COLS * ROWS)) * 100).toFixed(1)}% of grid), ` +
    `${(base64.length / 1024).toFixed(1)}KB base64`
);
