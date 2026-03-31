"use client";

import { useRef, useEffect } from "react";

interface LiquidTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Five vibrant blobs spread across the colour wheel.
// hue-rotate() cycles them continuously so they feel alive.
const BLOBS = [
  { color: "#FF0080", sx: 60, sy: 75 }, // hot magenta
  { color: "#7700FF", sx: 65, sy: 70 }, // electric violet
  { color: "#0099FF", sx: 58, sy: 68 }, // electric blue
  { color: "#FF5500", sx: 55, sy: 72 }, // vivid orange
  { color: "#FF0044", sx: 50, sy: 65 }, // hot red-pink
];

// Independent orbital parameters per blob
const ORBITS = [
  { bx: 22, by: 38, rx: 22, ry: 20, fx: 0.40, fy: 0.36, px: 0.0, py: 1.0, mx: 32, my: 24 },
  { bx: 72, by: 52, rx: 20, ry: 24, fx: 0.33, fy: 0.48, px: 2.1, py: 0.6, mx: -28, my: -22 },
  { bx: 82, by: 24, rx: 16, ry: 22, fx: 0.58, fy: 0.40, px: 1.4, py: 2.4, mx: 20, my: 26 },
  { bx: 38, by: 72, rx: 18, ry: 16, fx: 0.43, fy: 0.54, px: 3.0, py: 1.3, mx: 22, my: -18 },
  { bx: 56, by: 42, rx: 24, ry: 18, fx: 0.28, fy: 0.63, px: 0.9, py: 3.4, mx: -16, my: 20 },
];

export default function LiquidText({ children, className = "", style }: LiquidTextProps) {
  const ref   = useRef<HTMLSpanElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const lerped = useRef({ x: 0.5, y: 0.5 });
  const raf   = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMove);

    const tick = (ts: number) => {
      const el = ref.current;
      if (!el) { raf.current = requestAnimationFrame(tick); return; }

      // Smooth-follow cursor
      lerped.current.x += (mouse.current.x - lerped.current.x) * 0.04;
      lerped.current.y += (mouse.current.y - lerped.current.y) * 0.04;
      const mx = lerped.current.x;
      const my = lerped.current.y;

      const t = ts * 0.001;

      // Animate each blob along its independent orbit + mouse push
      const gradients = ORBITS.map((o, i) => {
        const x = o.bx + Math.sin(t * o.fx + o.px) * o.rx + mx * o.mx;
        const y = o.by + Math.cos(t * o.fy + o.py) * o.ry + my * o.my;
        const { color, sx, sy } = BLOBS[i];
        return `radial-gradient(ellipse ${sx}% ${sy}% at ${x}% ${y}%, ${color} 0%, transparent 68%)`;
      });

      // Cycle hue slowly (full rotation ≈ 30 s) — drives the liquid colour shift
      const hue = (t * 12) % 360;
      // Mouse x subtly warps hue an extra ±25 deg for distortion feel
      const hueShift = hue + (mx - 0.5) * 50;

      el.style.backgroundImage = gradients.join(", ");
      el.style.filter = `hue-rotate(${hueShift}deg) saturate(1.6) brightness(1.08)`;

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
