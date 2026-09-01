"use client";

import { useEffect, useRef } from "react";
import { buildGlobePoints, latLonToVector } from "@/lib/globe-land";

const SAMPLES = 6000;
const COMPACT_SAMPLES = 3200;
const ROTATION_SPEED = 0.16; // radians per second, the idle drift
/** Seconds for a throw to bleed most of the way back to the idle drift. */
const SPIN_DECAY = 1.1;
/** How far a full-width drag turns the globe. */
const DRAG_TURNS = 1.4;
/** Past this a throw stops feeling like a throw and starts strobing. */
const MAX_SPIN = 14;
// Positive tips the north pole toward the viewer. Negative did the opposite,
// which put an unhelpful amount of Antarctica in the middle of the frame.
const TILT = (1 * Math.PI) / 180;
const HOME = latLonToVector(10.61, 104.18); // Kampot
const BUCKETS = 32; // alpha levels; dots are batched per level to cut fill calls

type Rgb = [number, number, number];

function readColor(name: string, fallback: string): Rgb {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const hex = (raw || fallback).replace("#", "");
  const full =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    // Below lg the globe is a faint backdrop behind the hero copy, so it can
    // afford far fewer dots and half the frame rate — worth it on phones.
    const isCompact = window.matchMedia("(max-width: 1023px)").matches;
    const points = buildGlobePoints(isCompact ? COMPACT_SAMPLES : SAMPLES);
    const minFrameMs = isCompact ? 33 : 0;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let ink = readColor("--color-ink", "#f2f2f0");
    let accent = readColor("--color-accent", "#5eead4");
    let size = 0;
    let frame = 0;
    let running = false;
    let angle = 0;
    let lastTime = 0;

    // Grab-to-spin. The globe idles at ROTATION_SPEED, follows the pointer while
    // held, and on release keeps the velocity it was thrown with, bleeding back
    // to the idle drift. Reduced motion idles at zero but stays draggable —
    // the preference is about unrequested movement, not about being inert.
    const idleSpin = reduceMotion ? 0 : ROTATION_SPEED;
    /** Radians per second. Negative spins the other way. */
    let spin = idleSpin;
    let dragging = false;
    let pointerX = 0;
    let pointerAt = 0;
    /** Smoothed drag velocity, so a jittery last frame does not define the throw. */
    let thrown = 0;

    const themeObserver = new MutationObserver(() => {
      ink = readColor("--color-ink", "#f2f2f0");
      accent = readColor("--color-accent", "#5eead4");
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    function resize() {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;
      const rect = canvasEl.getBoundingClientRect();
      if (!rect.width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = rect.width;
      canvasEl.width = Math.round(size * dpr);
      canvasEl.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function paintBuckets(buckets: (Path2D | null)[], color: Rgb) {
      const [r, g, b] = color;
      for (let i = 0; i < BUCKETS; i++) {
        const path = buckets[i];
        if (!path) continue;
        ctx.fillStyle = `rgba(${r},${g},${b},${(i + 0.5) / BUCKETS})`;
        ctx.fill(path);
      }
    }

    function draw(time: number) {
      frame = requestAnimationFrame(draw);

      if (!size) resize();
      if (!size) return;
      if (lastTime && time - lastTime < minFrameMs) return;

      const delta = lastTime ? (time - lastTime) / 1000 : 0;
      lastTime = time;
      if (dragging) {
        // Held: the pointer alone moves it, so nothing is added here.
      } else {
        angle += delta * spin;
        // Exponential ease back to the idle drift. Framed as a time constant
        // rather than a per-frame multiplier so the decay is identical at 30fps
        // and 120fps.
        spin += (idleSpin - spin) * (1 - Math.exp(-delta / SPIN_DECAY));
      }

      const center = size / 2;
      const radius = size * 0.42;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosT = Math.cos(TILT);
      const sinT = Math.sin(TILT);

      ctx.clearRect(0, 0, size, size);

      const backInk: (Path2D | null)[] = new Array(BUCKETS).fill(null);
      const backAccent: (Path2D | null)[] = new Array(BUCKETS).fill(null);
      const frontInk: (Path2D | null)[] = new Array(BUCKETS).fill(null);
      const frontAccent: (Path2D | null)[] = new Array(BUCKETS).fill(null);

      for (const point of points) {
        // Screen x is negated relative to the rotated x so that east falls to
        // the right, as on a globe viewed from outside.
        const rx = point.z * sinA - point.x * cosA;
        const rz = point.x * sinA + point.z * cosA;
        const ry = point.y * cosT - rz * sinT;
        const depth = point.y * sinT + rz * cosT;
        const isFront = depth > 0;

        let alpha: number;
        let dotRadius: number;
        if (point.land) {
          alpha = isFront ? 0.22 + depth * 0.72 : 0.08 * (1 + depth);
          dotRadius = isFront ? 0.9 + depth * 0.8 : 0.7;
        } else {
          alpha = isFront ? 0.06 + depth * 0.1 : 0.03 * (1 + depth);
          dotRadius = isFront ? 0.7 : 0.6;
        }

        const bucket = Math.min(BUCKETS - 1, Math.floor(alpha * BUCKETS));
        const buckets = point.accent
          ? isFront
            ? frontAccent
            : backAccent
          : isFront
            ? frontInk
            : backInk;

        let path = buckets[bucket];
        if (!path) {
          path = new Path2D();
          buckets[bucket] = path;
        }

        const px = center + rx * radius;
        const py = center - ry * radius;
        path.moveTo(px + dotRadius, py);
        path.arc(px, py, dotRadius, 0, Math.PI * 2);
      }

      // Far hemisphere first so near-side dots always sit on top.
      paintBuckets(backInk, ink);
      paintBuckets(backAccent, accent);
      paintBuckets(frontInk, ink);
      paintBuckets(frontAccent, accent);

      // Home marker — a slow pulse while it faces the viewer.
      const hx = HOME.z * sinA - HOME.x * cosA;
      const hz = HOME.x * sinA + HOME.z * cosA;
      const hy = HOME.y * cosT - hz * sinT;
      const hDepth = HOME.y * sinT + hz * cosT;

      if (hDepth > 0) {
        const px = center + hx * radius;
        const py = center - hy * radius;
        const [r, g, b] = accent;
        // Fade out only right at the limb, so the marker stays legible for
        // most of the time it is turned towards the viewer.
        const facing = Math.min(1, hDepth * 3);

        // Two radar pings, half a cycle apart, so one is always expanding.
        const phase = reduceMotion ? 0.35 : (time / 2200) % 1;
        for (const offset of [0, 0.5]) {
          const p = (phase + offset) % 1;
          ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - p) * 0.45 * facing})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(px, py, 3.5 + p * 17, 0, Math.PI * 2);
          ctx.stroke();
          if (reduceMotion) break;
        }

        const blink = reduceMotion
          ? 1
          : 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(time / 450));

        // Soft halo, then the solid core.
        ctx.fillStyle = `rgba(${r},${g},${b},${0.22 * blink * facing})`;
        ctx.beginPath();
        ctx.arc(px, py, 7.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${r},${g},${b},${blink * facing})`;
        ctx.beginPath();
        ctx.arc(px, py, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function start() {
      if (running) return;
      running = true;
      lastTime = 0;
      frame = requestAnimationFrame(draw);
    }

    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    }

    function onPointerDown(event: PointerEvent) {
      if (event.button !== 0) return;
      dragging = true;
      thrown = 0;
      pointerX = event.clientX;
      pointerAt = event.timeStamp;
      // Throws if the pointer is no longer active, which a synthetic or
      // already-released one can be. Losing capture only costs us the drag.
      try {
        canvas!.setPointerCapture(event.pointerId);
      } catch {}
      canvas!.style.cursor = "grabbing";
    }

    function onPointerMove(event: PointerEvent) {
      if (!dragging || !size) return;
      const dx = event.clientX - pointerX;
      const dt = Math.max(1, event.timeStamp - pointerAt) / 1000;
      pointerX = event.clientX;
      pointerAt = event.timeStamp;

      // Horizontal only: the globe has one axis, and reading vertical movement
      // would fight the page scroll on a phone.
      const turned = (dx / size) * Math.PI * DRAG_TURNS;
      angle += turned;

      // Smoothed towards the latest sample, so releasing mid-flick throws at
      // the speed of the gesture rather than of its final millisecond.
      thrown = thrown * 0.7 + (turned / dt) * 0.3;
    }

    function endDrag(event: PointerEvent) {
      if (!dragging) return;
      dragging = false;
      spin = Math.max(-MAX_SPIN, Math.min(MAX_SPIN, thrown));
      try {
        if (canvas!.hasPointerCapture(event.pointerId)) {
          canvas!.releasePointerCapture(event.pointerId);
        }
      } catch {}
      canvas!.style.cursor = "";
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Skips the work entirely while hidden (mobile breakpoint) or scrolled past.
    const visibilityObserver = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) start();
      else stop();
    });
    visibilityObserver.observe(canvas);

    function onVisibilityChange() {
      if (document.hidden) stop();
      else start();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // pan-y keeps vertical page scrolling native on a phone while horizontal
      // drags are ours; touch-none would trap the page inside the globe.
      className="aspect-square w-full cursor-grab touch-pan-y"
    />
  );
}
