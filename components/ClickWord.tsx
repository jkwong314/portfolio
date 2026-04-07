"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

function CursorSVG() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.55))" }}
    >
      <path
        d="M4 2L4 17.5L7.5 14L10.5 20.5L13 19.5L10 13H15.5Z"
        fill="white"
        stroke="#2a2a2a"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const BURST_COUNT = 8;
const BURST_RADIUS = 20;
const BURST_ANGLES = Array.from(
  { length: BURST_COUNT },
  (_, i) => (i / BURST_COUNT) * 2 * Math.PI
);

// Lottie timing (30fps, 60 frames = 2s):
//  approach:  0 → 167ms  (frames 0→5)
//  hover:   167 → 533ms  (frames 5→16)
//  press:   533 → 633ms  (frames 16→19, scale 1→0.64)
//  release: 633 → 900ms  (frames 19→27, scale 0.64→1)
//  exit:    900 → 1567ms (frames 27→47)
const ANIM_DURATION = 2; // seconds
const TIMES = [0, 0.083, 0.267, 0.317, 0.45, 0.783, 1] as const;
const BURST_AT_MS = 633;
const INTERVAL_MS = 5000;

export default function ClickWord({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 500);
    }, BURST_AT_MS);
    return () => clearTimeout(t);
  }, [cycle]);

  if (prefersReduced) return <>{children}</>;

  return (
    <span className="relative inline-block">
      {children}

      {/* Fake cursor */}
      <motion.span
        key={`cursor-${cycle}`}
        className="pointer-events-none absolute"
        style={{ top: 0, left: "15%" }}
        initial={{ opacity: 0, x: -32, y: -28 }}
        animate={{
          opacity: [0,   1,   1,    1,     1,   0.7, 0],
          x:       [-32,  0,   0,    0,     0,   18,  30],
          y:       [-28, -4,  -4,   -2,    -4,    6,  16],
          scale:   [1,    1,   1,  0.64,    1,    1,   1],
        }}
        transition={{
          duration: ANIM_DURATION,
          times: [...TIMES],
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <CursorSVG />
      </motion.span>

      {/* Click burst */}
      <AnimatePresence>
        {showBurst && (
          <motion.span
            key={`burst-${cycle}`}
            className="pointer-events-none absolute"
            style={{ top: "20%", left: "20%" }}
          >
            {BURST_ANGLES.map((rad, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-accent-light"
                style={{ width: 6, height: 6, top: 0, left: 0 }}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1.2 }}
                animate={{
                  opacity: 0,
                  x: Math.cos(rad) * BURST_RADIUS,
                  y: Math.sin(rad) * BURST_RADIUS,
                  scale: 0,
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
