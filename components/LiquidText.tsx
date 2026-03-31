"use client";

import { useRef, useEffect } from "react";

interface LiquidTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isDark?: boolean;
}

// Dark mode — Fleurox palette
const DARK_BLOBS = [
  { color: "#6B8FD8", sx: 70, sy: 85 },
  { color: "#D4A0CC", sx: 65, sy: 78 },
  { color: "#FF8C35", sx: 60, sy: 75 },
  { color: "#FF6B80", sx: 68, sy: 80 },
  { color: "#8866CC", sx: 62, sy: 72 },
];
const DARK_BASE = "linear-gradient(135deg, #1a0f2e 0%, #0f0820 100%)";

// Light mode — deeper tones to read on white
const LIGHT_BLOBS = [
  { color: "#4A70CC", sx: 70, sy: 85 },
  { color: "#B87AB0", sx: 65, sy: 78 },
  { color: "#E86B10", sx: 60, sy: 75 },
  { color: "#E04060", sx: 68, sy: 80 },
  { color: "#6644AA", sx: 62, sy: 72 },
];
const LIGHT_BASE = "linear-gradient(135deg, #e8e0f4 0%, #f0eafa 100%)";

// Orbital resting paths
const ORBITS = [
  { bx: 22, by: 38, rx: 20, ry: 18, fx: 0.40, fy: 0.36, px: 0.0, py: 1.0 },
  { bx: 72, by: 52, rx: 18, ry: 22, fx: 0.33, fy: 0.48, px: 2.1, py: 0.6 },
  { bx: 80, by: 24, rx: 14, ry: 20, fx: 0.58, fy: 0.40, px: 1.4, py: 2.4 },
  { bx: 38, by: 70, rx: 16, ry: 14, fx: 0.43, fy: 0.54, px: 3.0, py: 1.3 },
  { bx: 56, by: 42, rx: 22, ry: 16, fx: 0.28, fy: 0.63, px: 0.9, py: 3.4 },
];

// Finger radius (% of element) — how wide the disturbance reaches
const FINGER_R = 22;
// Max blob displacement in %
const MAX_DISP = 22;

export default function LiquidText({
  children,
  className = "",
  style,
  isDark = true,
}: LiquidTextProps) {
  const ref      = useRef<HTMLSpanElement>(null);
  const cursor   = useRef({ x: 50, y: 50 });   // cursor in element % coords
  const cVel     = useRef({ x: 0,  y: 0  });   // cursor velocity in %
  const prevCursor = useRef<{ x: number; y: number } | null>(null);
  const isOver   = useRef(false);
  const disp     = useRef(ORBITS.map(() => ({ x: 0, y: 0 })));
  const raf      = useRef<number>(0);
  const isDarkRef = useRef(isDark);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      isOver.current =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom;

      if (isOver.current) {
        // Cursor in element-local % coordinates
        const cx = ((e.clientX - rect.left) / rect.width)  * 100;
        const cy = ((e.clientY - rect.top)  / rect.height) * 100;

        if (prevCursor.current) {
          cVel.current.x = cx - prevCursor.current.x;
          cVel.current.y = cy - prevCursor.current.y;
        }

        cursor.current    = { x: cx, y: cy };
        prevCursor.current = { x: cx, y: cy };
      } else {
        prevCursor.current = null;
      }
    };

    window.addEventListener("mousemove", onMove);

    const tick = (ts: number) => {
      if (!el) { raf.current = requestAnimationFrame(tick); return; }

      const t     = ts * 0.001;
      const d     = disp.current;
      const dark  = isDarkRef.current;
      const blobs = dark ? DARK_BLOBS : LIGHT_BLOBS;
      const base  = dark ? DARK_BASE  : LIGHT_BASE;

      const velMag = Math.sqrt(cVel.current.x ** 2 + cVel.current.y ** 2);

      d.forEach((dp, i) => {
        const o = ORBITS[i];

        // Orbital centre at this moment
        const ox = o.bx + Math.sin(t * o.fx + o.px) * o.rx;
        const oy = o.by + Math.cos(t * o.fy + o.py) * o.ry;

        // Current world position of the blob
        const bx = ox + dp.x;
        const by = oy + dp.y;

        // Vector from cursor to blob (in %)
        const dx = bx - cursor.current.x;
        const dy = by - cursor.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (isOver.current && dist < FINGER_R && velMag > 0.3) {
          // Smooth falloff: strongest right at the finger tip
          const influence = (1 - dist / FINGER_R) ** 2;

          // 1. Push blob directly away from cursor (parts the liquid)
          const nx = dist > 0 ? dx / dist : 0;
          const ny = dist > 0 ? dy / dist : 0;
          dp.x += nx * velMag * 2.0 * influence;
          dp.y += ny * velMag * 2.0 * influence;

          // 2. Drag a little in the direction of travel (smear effect)
          const vn = velMag > 0 ? velMag : 1;
          dp.x += (cVel.current.x / vn) * velMag * 0.6 * influence;
          dp.y += (cVel.current.y / vn) * velMag * 0.6 * influence;
        }

        // Clamp
        dp.x = Math.max(-MAX_DISP, Math.min(MAX_DISP, dp.x));
        dp.y = Math.max(-MAX_DISP, Math.min(MAX_DISP, dp.y));

        // Spring back toward orbital path (liquid closing behind the finger)
        dp.x *= 0.93;
        dp.y *= 0.93;
      });

      // Decay cursor velocity
      cVel.current.x *= 0.68;
      cVel.current.y *= 0.68;

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
