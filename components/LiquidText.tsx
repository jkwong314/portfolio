"use client";

import { useRef, useEffect } from "react";

interface LiquidTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Purple / blue / magenta / pink only — no warm hues
const BLOBS = [
  { color: "#FF0080", sx: 65, sy: 80 }, // hot magenta
  { color: "#7700FF", sx: 70, sy: 75 }, // electric violet
  { color: "#0066FF", sx: 62, sy: 72 }, // electric blue
  { color: "#CC00FF", sx: 68, sy: 78 }, // vivid purple
  { color: "#FF0055", sx: 60, sy: 70 }, // deep pink
];

// Each blob has its own orbital path
const ORBITS = [
  { bx: 22, by: 38, rx: 22, ry: 20, fx: 0.40, fy: 0.36, px: 0.0, py: 1.0 },
  { bx: 72, by: 52, rx: 20, ry: 24, fx: 0.33, fy: 0.48, px: 2.1, py: 0.6 },
  { bx: 82, by: 24, rx: 16, ry: 22, fx: 0.58, fy: 0.40, px: 1.4, py: 2.4 },
  { bx: 38, by: 72, rx: 18, ry: 16, fx: 0.43, fy: 0.54, px: 3.0, py: 1.3 },
  { bx: 56, by: 42, rx: 24, ry: 18, fx: 0.28, fy: 0.63, px: 0.9, py: 3.4 },
];

// Mouse influence per blob — large values = dramatic distortion
const MOUSE_PUSH = [
  { mx:  90, my:  70 },
  { mx: -80, my: -65 },
  { mx:  60, my:  80 },
  { mx:  70, my: -55 },
  { mx: -50, my:  65 },
];

export default function LiquidText({ children, className = "", style }: LiquidTextProps) {
  const ref    = useRef<HTMLSpanElement>(null);
  const mouse  = useRef({ x: 0.5, y: 0.5 });
  const lerped = useRef({ x: 0.5, y: 0.5 });
  const raf    = useRef<number>(0);

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

      // Responsive lerp — slightly faster so distortion is immediate
      lerped.current.x += (mouse.current.x - lerped.current.x) * 0.07;
      lerped.current.y += (mouse.current.y - lerped.current.y) * 0.07;
      const mx = lerped.current.x;
      const my = lerped.current.y;

      const t = ts * 0.001;

      const gradients = ORBITS.map((o, i) => {
        const { mx: mxi, my: myi } = MOUSE_PUSH[i];
        const x = o.bx + Math.sin(t * o.fx + o.px) * o.rx + mx * mxi;
        const y = o.by + Math.cos(t * o.fy + o.py) * o.ry + my * myi;
        const { color, sx, sy } = BLOBS[i];
        return `radial-gradient(ellipse ${sx}% ${sy}% at ${x}% ${y}%, ${color} 0%, transparent 68%)`;
      });

      // Solid deep-purple base fill — keeps text readable against dark bg
      gradients.push("linear-gradient(135deg, #1a0050 0%, #0d002e 100%)");

      // Hue oscillates ±45 ° (stays in cool purple-blue-pink band)
      // Mouse x warps an additional ±80 ° for obvious distortion
      const hue = Math.sin(t * 0.18) * 45 + (mx - 0.5) * 160;

      el.style.backgroundImage = gradients.join(", ");
      el.style.filter = `hue-rotate(${hue}deg) saturate(1.7) brightness(1.1)`;

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
