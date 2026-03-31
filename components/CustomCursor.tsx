"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

// ── 4 palettes cycling with each page nav ─────────────────────────────────────
// dark  = reads on dark bg   (lighter fill, brighter outline)
// light = reads on light bg  (deeper fill,  darker outline)
const PALETTES = [
  { dark: { fill: "#FFE8F2", outline: "#FF66AA" }, light: { fill: "#FFAAD0", outline: "#CC0055" } }, // pink
  { dark: { fill: "#EEE4FF", outline: "#AA66EE" }, light: { fill: "#CC99FF", outline: "#7711CC" } }, // purple
  { dark: { fill: "#E4EAFF", outline: "#6688EE" }, light: { fill: "#8899EE", outline: "#2233AA" } }, // blue
  { dark: { fill: "#DFFBFF", outline: "#33CCDD" }, light: { fill: "#66DDEE", outline: "#007788" } }, // cyan
] as const;

// ── Pixel-art hand (second column of reference) ───────────────────────────────
// 13 × 17 grid → displayed 26 × 34 px
// Hotspot (fingertip) at col ~4, row 0  →  translate(-8px, 0)
function PixelHand({
  fill, outline, pressing,
}: { fill: string; outline: string; pressing: boolean }) {
  return (
    <motion.svg
      width="26" height="34"
      viewBox="0 0 13 17"
      shapeRendering="crispEdges"
      animate={pressing ? { y: 2, scale: 0.91 } : { y: 0, scale: 1 }}
      transition={{ duration: 0.08, ease: "easeOut" }}
    >
      {/* ── Index finger ── */}
      <rect x="4" y="0" width="2" height="1" fill={outline} />  {/* tip */}
      <rect x="3" y="0" width="1" height="7" fill={outline} />  {/* left edge */}
      <rect x="6" y="0" width="1" height="4" fill={outline} />  {/* right edge */}
      <rect x="4" y="1" width="2" height="5" fill={fill}    />  {/* body */}

      {/* ── Middle finger ── */}
      <rect x="6" y="3" width="1" height="1" fill={outline} />  {/* cap */}
      <rect x="6" y="4" width="1" height="2" fill={fill}    />  {/* body */}
      <rect x="7" y="3" width="1" height="4" fill={outline} />  {/* right edge */}

      {/* ── Ring finger ── */}
      <rect x="7" y="4" width="1" height="1" fill={outline} />  {/* cap */}
      <rect x="7" y="5" width="1" height="1" fill={fill}    />  {/* body */}
      <rect x="8" y="4" width="1" height="3" fill={outline} />  {/* right edge */}

      {/* ── Pinky ── */}
      <rect x="8" y="5" width="1" height="1" fill={outline} />  {/* cap */}
      <rect x="9" y="5" width="1" height="2" fill={outline} />  {/* right edge */}

      {/* ── Palm ── */}
      <rect x="2"  y="7"  width="1"  height="7" fill={outline} />  {/* left */}
      <rect x="3"  y="7"  width="7"  height="7" fill={fill}    />  {/* body */}
      <rect x="10" y="5"  width="1"  height="9" fill={outline} />  {/* right (incl. pinky) */}
      <rect x="3"  y="14" width="7"  height="1" fill={outline} />  {/* bottom */}

      {/* ── Thumb ── */}
      <rect x="1" y="8"  width="1" height="1" fill={outline} />  {/* cap */}
      <rect x="0" y="9"  width="1" height="4" fill={outline} />  {/* left edge */}
      <rect x="1" y="9"  width="1" height="5" fill={fill}    />  {/* body */}
      <rect x="1" y="14" width="1" height="1" fill={outline} />  {/* bottom cap */}
    </motion.svg>
  );
}

// ── Click-burst ring ──────────────────────────────────────────────────────────
interface Burst { id: number; x: number; y: number }

function ClickBurst({
  x, y, outline, fill, onDone,
}: { x: number; y: number; outline: string; fill: string; onDone(): void }) {
  const R = 30; // max radius
  return (
    <motion.svg
      className="pointer-events-none fixed z-[9998]"
      style={{ left: x - R, top: y - R }}
      width={R * 2} height={R * 2}
      viewBox={`0 0 ${R * 2} ${R * 2}`}
      shapeRendering="crispEdges"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.55, delay: 0.08 }}
      onAnimationComplete={onDone}
    >
      {/* Outer ring — outline colour, dashed pixel style */}
      <motion.circle
        cx={R} cy={R}
        fill="none"
        stroke={outline}
        strokeWidth="3"
        strokeDasharray="5 3"
        strokeLinecap="square"
        initial={{ r: 2 }}
        animate={{ r: R - 3 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      {/* Inner ring — fill colour, offset phase */}
      <motion.circle
        cx={R} cy={R}
        fill="none"
        stroke={fill}
        strokeWidth="2"
        strokeDasharray="4 4"
        strokeLinecap="square"
        initial={{ r: 2 }}
        animate={{ r: R - 10 }}
        transition={{ duration: 0.32, ease: "easeOut", delay: 0.04 }}
      />
    </motion.svg>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CustomCursor() {
  const [pos, setPos]           = useState({ x: -300, y: -300 });
  const [visible, setVisible]   = useState(false);
  const [pressing, setPressing] = useState(false);
  const [bursts, setBursts]     = useState<Burst[]>([]);
  const [paletteIdx, setPaletteIdx] = useState(0);
  const burstId  = useRef(0);
  const prevPath = useRef<string | null>(null);

  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Advance palette on every navigation
  useEffect(() => {
    if (prevPath.current !== null && prevPath.current !== pathname) {
      setPaletteIdx((i) => (i + 1) % PALETTES.length);
    }
    prevPath.current = pathname;
  }, [pathname]);

  const { fill, outline } = isDark
    ? PALETTES[paletteIdx].dark
    : PALETTES[paletteIdx].light;

  const removeBurst = useCallback(
    (id: number) => setBursts((p) => p.filter((b) => b.id !== id)),
    [],
  );

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove  = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const onDown  = (e: MouseEvent) => {
      setPressing(true);
      setBursts((p) => [...p, { id: burstId.current++, x: e.clientX, y: e.clientY }]);
    };
    const onUp    = () => setPressing(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove",    onMove, { passive: true });
    window.addEventListener("mousedown",    onDown);
    window.addEventListener("mouseup",      onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove",    onMove);
      window.removeEventListener("mousedown",    onDown);
      window.removeEventListener("mouseup",      onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>

      <AnimatePresence>
        {visible && (
          <motion.div
            className="pointer-events-none fixed z-[9999]"
            style={{
              left: pos.x,
              top:  pos.y,
              // col 4 of 13 grid at 26px wide = 8px; fingertip at row 0
              transform: "translate(-8px, 0px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <PixelHand fill={fill} outline={outline} pressing={pressing} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bursts.map(({ id, x, y }) => (
          <ClickBurst
            key={id} x={x} y={y}
            outline={outline} fill={fill}
            onDone={() => removeBurst(id)}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
