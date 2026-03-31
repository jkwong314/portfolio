"use client";

import { useRef, useEffect } from "react";

interface LiquidTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isDark?: boolean;
}

// Dark mode: Fleurox-inspired — periwinkle, lavender, orange, coral, purple
const DARK_BLOBS = [
  { color: "#6B8FD8", sx: 70, sy: 85 }, // cornflower blue
  { color: "#D4A0CC", sx: 65, sy: 78 }, // soft lavender/mauve
  { color: "#FF8C35", sx: 60, sy: 75 }, // vivid orange
  { color: "#FF6B80", sx: 68, sy: 80 }, // coral pink
  { color: "#8866CC", sx: 62, sy: 72 }, // medium purple
];
const DARK_BASE = "linear-gradient(135deg, #1a0f2e 0%, #0f0820 100%)";

// Light mode: same hues, richer/deeper so they read on white
const LIGHT_BLOBS = [
  { color: "#4A70CC", sx: 70, sy: 85 }, // deeper blue
  { color: "#B87AB0", sx: 65, sy: 78 }, // deeper mauve
  { color: "#E86B10", sx: 60, sy: 75 }, // deep orange
  { color: "#E04060", sx: 68, sy: 80 }, // deep coral
  { color: "#6644AA", sx: 62, sy: 72 }, // deep purple
];
const LIGHT_BASE = "linear-gradient(135deg, #e8e0f4 0%, #f0eafa 100%)";

// Resting orbital paths
const ORBITS = [
  { bx: 22, by: 38, rx: 20, ry: 18, fx: 0.40, fy: 0.36, px: 0.0, py: 1.0 },
  { bx: 72, by: 52, rx: 18, ry: 22, fx: 0.33, fy: 0.48, px: 2.1, py: 0.6 },
  { bx: 80, by: 24, rx: 14, ry: 20, fx: 0.58, fy: 0.40, px: 1.4, py: 2.4 },
  { bx: 38, by: 70, rx: 16, ry: 14, fx: 0.43, fy: 0.54, px: 3.0, py: 1.3 },
  { bx: 56, by: 42, rx: 22, ry: 16, fx: 0.28, fy: 0.63, px: 0.9, py: 3.4 },
];

// Asymmetric swirl responses — mix of follow / counter-swirl per blob
const RESPONSE = [
  { vx:  3.2, vy:  2.0 },
  { vx: -2.8, vy: -2.4 },
  { vx:  2.0, vy: -3.0 },
  { vx: -2.4, vy:  2.8 },
  { vx:  2.8, vy:  3.2 },
];

const MAX_DISP = 45;

export default function LiquidText({
  children,
  className = "",
  style,
  isDark = true,
}: LiquidTextProps) {
  const ref      = useRef<HTMLSpanElement>(null);
  const vel      = useRef({ x: 0, y: 0 });
  const prevPos  = useRef<{ x: number; y: number } | null>(null);
  const isOver   = useRef(false);
  const disp     = useRef(ORBITS.map(() => ({ x: 0, y: 0 })));
  const raf      = useRef<number>(0);
  const isDarkRef = useRef(isDark);

  // Keep ref in sync without restarting the rAF loop
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

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
        vel.current.x = ((e.clientX - prevPos.current.x) / rect.width)  * 100;
        vel.current.y = ((e.clientY - prevPos.current.y) / rect.height) * 100;
      }
      prevPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMove);

    const tick = (ts: number) => {
      if (!el) { raf.current = requestAnimationFrame(tick); return; }

      const t    = ts * 0.001;
      const d    = disp.current;
      const dark = isDarkRef.current;
      const blobs = dark ? DARK_BLOBS : LIGHT_BLOBS;
      const base  = dark ? DARK_BASE  : LIGHT_BASE;

      const decay = 0.90;
      d.forEach((dp, i) => {
        if (isOver.current) {
          dp.x += vel.current.x * RESPONSE[i].vx;
          dp.y += vel.current.y * RESPONSE[i].vy;
          dp.x = Math.max(-MAX_DISP, Math.min(MAX_DISP, dp.x));
          dp.y = Math.max(-MAX_DISP, Math.min(MAX_DISP, dp.y));
        }
        dp.x *= decay;
        dp.y *= decay;
      });

      vel.current.x *= 0.72;
      vel.current.y *= 0.72;

      const gradients = ORBITS.map((o, i) => {
        const x = o.bx + Math.sin(t * o.fx + o.px) * o.rx + d[i].x;
        const y = o.by + Math.cos(t * o.fy + o.py) * o.ry + d[i].y;
        const { color, sx, sy } = blobs[i];
        return `radial-gradient(ellipse ${sx}% ${sy}% at ${x}% ${y}%, ${color} 0%, transparent 68%)`;
      });

      gradients.push(base);

      el.style.backgroundImage = gradients.join(", ");
      el.style.filter = `saturate(1.6) brightness(${dark ? 1.05 : 1.0})`;

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
