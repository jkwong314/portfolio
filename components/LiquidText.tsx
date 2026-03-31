"use client";

import { useRef, useEffect } from "react";

interface LiquidTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Pure blues / violets only — no hue that rotates into warm territory
const BLOBS = [
  { color: "#6600FF", sx: 65, sy: 80 }, // electric violet
  { color: "#0044FF", sx: 70, sy: 75 }, // electric blue
  { color: "#9900FF", sx: 62, sy: 72 }, // vivid purple
  { color: "#0088FF", sx: 68, sy: 78 }, // bright blue
  { color: "#4400CC", sx: 60, sy: 70 }, // deep indigo
];

// Resting orbital paths
const ORBITS = [
  { bx: 22, by: 38, rx: 20, ry: 18, fx: 0.40, fy: 0.36, px: 0.0, py: 1.0 },
  { bx: 72, by: 52, rx: 18, ry: 22, fx: 0.33, fy: 0.48, px: 2.1, py: 0.6 },
  { bx: 80, by: 24, rx: 14, ry: 20, fx: 0.58, fy: 0.40, px: 1.4, py: 2.4 },
  { bx: 38, by: 70, rx: 16, ry: 14, fx: 0.43, fy: 0.54, px: 3.0, py: 1.3 },
  { bx: 56, by: 42, rx: 22, ry: 16, fx: 0.28, fy: 0.63, px: 0.9, py: 3.4 },
];

// Each blob reacts differently to brush velocity → creates swirl / mixing look
// Positive = follows mouse direction, negative = counter-swirls
const RESPONSE = [
  { vx:  3.2, vy:  2.0 },
  { vx: -2.8, vy: -2.4 },
  { vx:  2.0, vy: -3.0 },
  { vx: -2.4, vy:  2.8 },
  { vx:  2.8, vy:  3.2 },
];

const MAX_DISP = 45; // clamp so blobs don't fly off-canvas

export default function LiquidText({ children, className = "", style }: LiquidTextProps) {
  const ref     = useRef<HTMLSpanElement>(null);
  const vel     = useRef({ x: 0, y: 0 });
  const prevPos = useRef<{ x: number; y: number } | null>(null);
  const isOver  = useRef(false);
  const disp    = useRef(BLOBS.map(() => ({ x: 0, y: 0 })));
  const raf     = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      isOver.current =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isOver.current && prevPos.current) {
        // Velocity as % of element dimensions — normalises across screen sizes
        vel.current.x = ((e.clientX - prevPos.current.x) / rect.width)  * 100;
        vel.current.y = ((e.clientY - prevPos.current.y) / rect.height) * 100;
      }
      prevPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMove);

    const tick = (ts: number) => {
      if (!el) { raf.current = requestAnimationFrame(tick); return; }

      const t = ts * 0.001;
      const d = disp.current;

      // While hovering accumulate displacement; decay regardless
      const decay = 0.90;
      d.forEach((dp, i) => {
        if (isOver.current) {
          dp.x += vel.current.x * RESPONSE[i].vx;
          dp.y += vel.current.y * RESPONSE[i].vy;
          // Clamp
          dp.x = Math.max(-MAX_DISP, Math.min(MAX_DISP, dp.x));
          dp.y = Math.max(-MAX_DISP, Math.min(MAX_DISP, dp.y));
        }
        dp.x *= decay;
        dp.y *= decay;
      });

      // Decay raw velocity each frame
      vel.current.x *= 0.72;
      vel.current.y *= 0.72;

      const gradients = ORBITS.map((o, i) => {
        const x = o.bx + Math.sin(t * o.fx + o.px) * o.rx + d[i].x;
        const y = o.by + Math.cos(t * o.fy + o.py) * o.ry + d[i].y;
        const { color, sx, sy } = BLOBS[i];
        return `radial-gradient(ellipse ${sx}% ${sy}% at ${x}% ${y}%, ${color} 0%, transparent 68%)`;
      });

      // Deep indigo base fill for contrast against dark background
      gradients.push("linear-gradient(135deg, #140040 0%, #0a001e 100%)");

      // Narrow hue oscillation: ±20 ° — stays firmly in blue-violet
      const hue = Math.sin(t * 0.18) * 20;

      el.style.backgroundImage = gradients.join(", ");
      el.style.filter = `hue-rotate(${hue}deg) saturate(1.8) brightness(1.1)`;

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <span
      ref={ref}
      className={`bg-clip-text text-transparent ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
