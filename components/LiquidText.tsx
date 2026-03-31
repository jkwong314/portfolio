"use client";

import { useRef, useEffect, forwardRef } from "react";

interface LiquidTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isDark?: boolean;
}

const DARK_COLORS  = ["#A78BFA", "#C9A84C", "#F472B6", "#818CF8"];
const LIGHT_COLORS = ["#7C3AED", "#EC4899", "#C9A84C", "#6366F1"];

export default forwardRef<HTMLSpanElement, LiquidTextProps>(function LiquidText(
  { children, className = "", style, isDark = true },
  forwardedRef
) {
  const innerRef = useRef<HTMLSpanElement>(null);
  const ref = (forwardedRef as React.RefObject<HTMLSpanElement>) ?? innerRef;

  const mouse  = useRef({ x: 0.5, y: 0.5 });
  const smooth = useRef({ x: 0.5, y: 0.5 });
  const raf    = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMove);

    const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

    // helper: oscillate a value + mouse influence
    const osc = (
      base: number, amp: number, freq: number, phase: number,
      mInfluence: number, mVal: number
    ) => base + Math.sin(Date.now() * 0.001 * freq + phase) * amp + mVal * mInfluence;

    const tick = () => {
      const el = ref.current;
      if (!el) { raf.current = requestAnimationFrame(tick); return; }

      // Smooth-follow mouse
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.045;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.045;
      const mx = smooth.current.x;
      const my = smooth.current.y;

      // Four blobs — base position, oscillation, mouse push
      const b1x = osc(20, 16, 0.50, 0.0,  32, mx);
      const b1y = osc(35, 14, 0.38, 1.0,  22, my);
      const b2x = osc(68, 18, 0.33, 2.0, -28, mx);
      const b2y = osc(50, 16, 0.52, 0.5, -20, my);
      const b3x = osc(78, 10, 0.62, 1.5,  18, mx);
      const b3y = osc(22, 18, 0.44, 2.5,  26, my);
      const b4x = osc(42, 14, 0.41, 3.0,  22, mx);
      const b4y = osc(72, 12, 0.58, 1.2, -18, my);

      el.style.backgroundImage = [
        `radial-gradient(ellipse 55% 70% at ${b1x}% ${b1y}%, ${colors[0]}d0 0%, transparent 65%)`,
        `radial-gradient(ellipse 50% 60% at ${b2x}% ${b2y}%, ${colors[1]}b0 0%, transparent 65%)`,
        `radial-gradient(ellipse 60% 55% at ${b3x}% ${b3y}%, ${colors[2]}a0 0%, transparent 65%)`,
        `radial-gradient(ellipse 48% 65% at ${b4x}% ${b4y}%, ${colors[3]}c0 0%, transparent 65%)`,
      ].join(", ");

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [isDark, ref]);

  return (
    <span
      ref={ref}
      className={`bg-clip-text text-transparent select-none ${className}`}
      style={{ backgroundSize: "200% 200%", ...style }}
    >
      {children}
    </span>
  );
});
