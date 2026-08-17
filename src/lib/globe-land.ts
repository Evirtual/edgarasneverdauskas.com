import {
  LAND_MASK_BASE64,
  LAND_MASK_COLS,
  LAND_MASK_ROWS,
} from "./land-mask";

let maskBytes: Uint8Array | null = null;

function getMask(): Uint8Array {
  if (!maskBytes) {
    const binary = atob(LAND_MASK_BASE64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    maskBytes = bytes;
  }
  return maskBytes;
}

function isLand(lon: number, lat: number): boolean {
  const col = Math.min(
    LAND_MASK_COLS - 1,
    Math.max(0, Math.floor(lon + 180))
  );
  const row = Math.min(LAND_MASK_ROWS - 1, Math.max(0, Math.floor(lat + 90)));
  const bit = row * LAND_MASK_COLS + col;
  return (getMask()[bit >> 3]! & (128 >> (bit & 7))) !== 0;
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

/** Unit-sphere position for a lat/lon pair, matching buildGlobePoints' framing. */
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
