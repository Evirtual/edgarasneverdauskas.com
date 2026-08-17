// Coarse continent outlines as [lon, lat, lon, lat, ...] rings.
// Deliberately low-fidelity: at ~2,000 rendered dots the silhouette is what
// reads, not the coastline. Overlapping rings are fine — the land test is a
// union across all of them.
const LAND_RINGS: number[][] = [
  // North America
  [
    -168, 65, -166, 68, -156, 71, -140, 70, -128, 70, -115, 69, -100, 68, -95,
    72, -85, 73, -78, 73, -70, 68, -64, 60, -56, 54, -52, 48, -62, 46, -67, 45,
    -70, 43, -74, 40, -76, 35, -81, 31, -80, 25, -85, 30, -90, 29, -94, 29, -97,
    26, -99, 22, -105, 20, -110, 24, -114, 30, -117, 33, -122, 37, -124, 42,
    -124, 48, -130, 54, -135, 58, -140, 60, -150, 59, -158, 56, -165, 60,
  ],
  // Central America
  [-105, 20, -96, 16, -92, 15, -88, 16, -83, 11, -79, 9, -77, 8, -82, 9, -86, 12, -90, 13, -95, 17],
  // South America
  [
    -77, 8, -72, 12, -62, 11, -52, 5, -50, 0, -44, -2, -35, -5, -35, -9, -39,
    -17, -48, -25, -53, -34, -58, -38, -62, -40, -65, -45, -68, -50, -70, -55,
    -73, -52, -73, -45, -73, -37, -71, -30, -70, -20, -75, -14, -80, -5, -81, 0,
    -78, 5,
  ],
  // Greenland
  [-45, 60, -50, 64, -53, 68, -55, 72, -50, 76, -40, 80, -25, 82, -18, 79, -20, 75, -25, 70, -33, 66, -40, 62],
  // Africa
  [
    -17, 15, -16, 21, -12, 28, -6, 32, 2, 34, 10, 34, 18, 31, 25, 32, 32, 31,
    35, 24, 37, 18, 39, 15, 43, 12, 48, 12, 51, 10, 48, 3, 42, -3, 40, -10, 40,
    -16, 36, -21, 33, -26, 28, -31, 22, -34, 18, -34, 15, -27, 12, -18, 9, -5,
    6, 4, 0, 5, -8, 5, -13, 8, -17, 12,
  ],
  // Madagascar
  [43, -12, 48, -13, 50, -18, 48, -24, 45, -25, 43, -21],
  // Europe
  [
    -10, 36, -9, 39, -9, 43, -4, 44, -1, 46, -2, 49, 1, 51, 4, 52, 7, 54, 9, 57,
    11, 59, 15, 62, 19, 65, 23, 68, 28, 71, 35, 70, 42, 68, 50, 69, 58, 70, 60,
    66, 58, 60, 55, 57, 52, 52, 48, 48, 42, 45, 38, 45, 35, 42, 30, 41, 25, 40,
    21, 39, 16, 39, 12, 42, 15, 45, 13, 45, 9, 44, 4, 43, 0, 40, -3, 37, -6, 36,
  ],
  // British Isles
  [-10, 51, -8, 55, -5, 58, -2, 57, 0, 53, -3, 51, -6, 50],
  // Asia — Siberia through China
  [
    50, 45, 52, 52, 58, 60, 62, 66, 70, 72, 80, 74, 95, 76, 105, 77, 115, 74,
    128, 73, 140, 72, 150, 70, 160, 67, 170, 66, 180, 65, 180, 62, 170, 60, 162,
    58, 155, 54, 148, 50, 142, 46, 135, 43, 130, 38, 122, 37, 120, 33, 118, 28,
    113, 22, 110, 20, 105, 22, 100, 25, 95, 27, 90, 28, 85, 29, 80, 32, 75, 35,
    70, 38, 62, 42, 55, 44,
  ],
  // Arabia and the Levant
  [35, 37, 40, 38, 45, 39, 48, 37, 50, 30, 52, 25, 56, 24, 59, 22, 57, 18, 52, 16, 48, 13, 44, 12, 41, 15, 39, 20, 36, 28, 34, 31],
  // Iran and Central Asia
  [48, 37, 55, 38, 62, 40, 68, 38, 70, 35, 67, 30, 62, 25, 57, 25, 52, 28, 48, 32],
  // India
  [68, 24, 72, 20, 73, 15, 77, 8, 80, 13, 80, 16, 84, 19, 87, 22, 89, 22, 88, 26, 80, 29, 75, 32, 71, 28],
  // Southeast Asia
  [92, 21, 96, 17, 98, 12, 100, 6, 104, 2, 103, 8, 106, 11, 109, 15, 107, 20, 104, 22, 98, 22],
  // Indonesian archipelago
  [95, 5, 105, 5, 115, 3, 125, 2, 135, -2, 140, -4, 140, -8, 130, -8, 120, -9, 110, -8, 100, -3],
  // Japan
  [130, 32, 135, 34, 140, 37, 142, 41, 145, 44, 142, 45, 138, 38, 133, 34],
  // Australia
  [
    113, -22, 114, -27, 115, -33, 120, -34, 126, -32, 132, -32, 137, -35, 140,
    -38, 146, -39, 150, -37, 153, -32, 153, -27, 148, -20, 145, -15, 142, -11,
    136, -12, 131, -11, 127, -14, 122, -17, 117, -20,
  ],
  // New Zealand
  [166, -46, 168, -44, 172, -41, 175, -39, 178, -37, 176, -39, 173, -42, 170, -45],
  // Antarctica
  [
    -180, -84, -180, -78, -150, -77, -120, -73, -90, -73, -60, -72, -30, -75, 0,
    -70, 30, -70, 60, -68, 90, -67, 120, -66, 150, -68, 180, -66, 180, -84,
  ],
];

function inRing(lon: number, lat: number, ring: number[]): boolean {
  let inside = false;
  const count = ring.length / 2;
  for (let i = 0, j = count - 1; i < count; j = i++) {
    const xi = ring[i * 2]!;
    const yi = ring[i * 2 + 1]!;
    const xj = ring[j * 2]!;
    const yj = ring[j * 2 + 1]!;
    if (yi > lat !== yj > lat) {
      const x = ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
      if (lon < x) inside = !inside;
    }
  }
  return inside;
}

function isLand(lon: number, lat: number): boolean {
  for (const ring of LAND_RINGS) {
    if (inRing(lon, lat, ring)) return true;
  }
  return false;
}

export type GlobePoint = {
  x: number;
  y: number;
  z: number;
  land: boolean;
  accent: boolean;
};

/**
 * Distributes `samples` points evenly over a unit sphere (Fibonacci lattice),
 * flagging which ones fall on a continent. Ocean points are kept so the sphere
 * still reads as a globe while the Pacific faces the viewer.
 */
export function buildGlobePoints(samples: number): GlobePoint[] {
  const points: GlobePoint[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  let landIndex = 0;

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    const lat = (Math.asin(y) * 180) / Math.PI;
    const lon = (Math.atan2(z, x) * 180) / Math.PI;
    const land = isLand(lon, lat);

    points.push({
      x,
      y,
      z,
      land,
      accent: land && landIndex++ % 11 === 0,
    });
  }

  return points;
}

/** Unit-sphere position for a lat/lon pair, matching buildLandPoints' framing. */
export function latLonToVector(lat: number, lon: number) {
  const phi = (lat * Math.PI) / 180;
  const lambda = (lon * Math.PI) / 180;
  const radius = Math.cos(phi);
  return {
    x: radius * Math.cos(lambda),
    y: Math.sin(phi),
    z: radius * Math.sin(lambda),
  };
}
