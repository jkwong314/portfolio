"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Pixel palette ─────────────────────────────────────────────────────────────
const C = {
  white:  "#FFFFFF",
  body:   "#FFF4F7",
  light:  "#FFE0EC",
  mid:    "#FFB3C8",
  petal:  "#FFB8CC",
  deep:   "#FF85A8",
  center: "#FFE866",
  hi:     "#FFFACC",
};

// ── Pixel-art hand SVG ────────────────────────────────────────────────────────
// 14 × 25 grid → displayed at 28 × 50 px
// Fingertip (hotspot) at col 4–6, row 0
function PixelHand({ pressing }: { pressing: boolean }) {
  return (
    <motion.svg
      width="28"
      height="50"
      viewBox="0 0 14 25"
      shapeRendering="crispEdges"
      animate={pressing ? { y: 3, scale: 0.9 } : { y: 0, scale: 1 }}
      transition={{ duration: 0.08, ease: "easeOut" }}
    >
      {/* ── Index finger ── */}
      <rect x="4" y="0" width="3" height="1" fill={C.white}  />
      <rect x="4" y="1" width="3" height="6" fill={C.body}   />
      <rect x="3" y="0" width="1" height="7" fill={C.mid}    />
      <rect x="7" y="0" width="1" height="7" fill={C.mid}    />
      <rect x="4" y="0" width="1" height="1" fill={C.light}  />

      {/* ── Middle finger ── */}
      <rect x="7" y="2"  width="2" height="1" fill={C.mid}   />
      <rect x="7" y="3"  width="2" height="4" fill={C.body}  />
      <rect x="9" y="2"  width="1" height="5" fill={C.mid}   />

      {/* ── Ring finger ── */}
      <rect x="9"  y="3"  width="2" height="1" fill={C.mid}  />
      <rect x="9"  y="4"  width="2" height="3" fill={C.body} />
      <rect x="11" y="3"  width="1" height="4" fill={C.mid}  />

      {/* ── Pinky ── */}
      <rect x="11" y="4"  width="1" height="1" fill={C.mid}  />
      <rect x="11" y="5"  width="1" height="2" fill={C.body} />
      <rect x="12" y="4"  width="1" height="3" fill={C.mid}  />

      {/* ── Palm ── */}
      <rect x="1"  y="7"  width="1"  height="5" fill={C.mid}  />
      <rect x="2"  y="7"  width="11" height="5" fill={C.body} />
      <rect x="13" y="7"  width="1"  height="5" fill={C.mid}  />
      <rect x="3"  y="12" width="9"  height="1" fill={C.mid}  />

      {/* ── Thumb ── */}
      <rect x="0" y="8"  width="2" height="1" fill={C.mid}   />
      <rect x="0" y="9"  width="2" height="3" fill={C.body}  />

      {/* ── Wrist ── */}
      <rect x="3" y="13" width="8" height="1" fill={C.light} />
      <rect x="4" y="14" width="6" height="1" fill={C.mid}   />

      {/* ── Flower petals ── */}
      <rect x="4" y="15" width="2" height="2" fill={C.petal} />
      <rect x="8" y="15" width="2" height="2" fill={C.petal} />
      <rect x="3" y="17" width="2" height="2" fill={C.petal} />
      <rect x="9" y="17" width="2" height="2" fill={C.petal} />
      <rect x="4" y="19" width="2" height="2" fill={C.petal} />
      <rect x="8" y="19" width="2" height="2" fill={C.petal} />
      {/* petal shadow ring */}
      <rect x="5" y="15" width="4" height="1" fill={C.deep}  />
      <rect x="5" y="21" width="4" height="1" fill={C.deep}  />

      {/* ── Flower centre ── */}
      <rect x="5"  y="16" width="4" height="5" fill={C.center} />
      <rect x="6"  y="15" width="2" height="1" fill={C.center} />
      <rect x="6"  y="21" width="2" height="1" fill={C.center} />
      <rect x="6"  y="17" width="1" height="1" fill={C.hi}     />
    </motion.svg>
  );
}

// ── Click-burst animation ─────────────────────────────────────────────────────
interface Burst { id: number; x: number; y: number }

function ClickBurst({ x, y, onDone }: { x: number; y: number; onDone(): void }) {
  return (
    <motion.div
      className="pointer-events-none fixed z-[9998]"
      style={{ left: x, top: y }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.12 }}
      onAnimationComplete={onDone}
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <motion.div
          key={deg}
          className="absolute"
          style={{
            width: 10,
            height: 3,
            background: "var(--color-accent-light, #A78BFA)",
            borderRadius: 0,
            top: -1.5,
            left: 0,
            transformOrigin: "0 50%",
            transform: `rotate(${deg}deg)`,
          }}
          initial={{ scaleX: 0.2, x: 8  }}
          animate={{ scaleX: 1.0, x: 26 }}
          transition={{ duration: 0.36, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CustomCursor() {
  const [pos, setPos]           = useState({ x: -300, y: -300 });
  const [visible, setVisible]   = useState(false);
  const [pressing, setPressing] = useState(false);
  const [bursts, setBursts]     = useState<Burst[]>([]);
  const burstId                 = useRef(0);

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
              // Offset so the index fingertip maps to the exact mouse coordinate
              transform: "translate(-11px, -1px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <PixelHand pressing={pressing} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bursts.map(({ id, x, y }) => (
          <ClickBurst key={id} x={x} y={y} onDone={() => removeBurst(id)} />
        ))}
      </AnimatePresence>
    </>
  );
}
