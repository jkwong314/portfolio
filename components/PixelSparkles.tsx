"use client";

import { motion } from "framer-motion";
import React from "react";

// ── Pixel art SVG primitives ──────────────────────────────────────────────────

export function StarPixel({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="5" y="0"  width="2" height="1" />
      <rect x="4" y="1"  width="4" height="2" />
      <rect x="3" y="3"  width="6" height="2" />
      <rect x="0" y="5"  width="12" height="2" />
      <rect x="3" y="7"  width="6" height="2" />
      <rect x="4" y="9"  width="4" height="2" />
      <rect x="5" y="11" width="2" height="1" />
      {/* centre highlight */}
      <rect x="5" y="5"  width="2" height="2" fill="white" opacity="0.45" />
    </svg>
  );
}

export function CrossPixel({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 6 6" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="2" y="0" width="2" height="6" />
      <rect x="0" y="2" width="6" height="2" />
    </svg>
  );
}

export function DotPixel({ size = 6 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 4 4" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="0" y="0" width="4" height="4" />
    </svg>
  );
}

export function RingPixel({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 6 6" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="1" y="0" width="4" height="1" />
      <rect x="0" y="1" width="1" height="4" />
      <rect x="5" y="1" width="1" height="4" />
      <rect x="1" y="5" width="4" height="1" />
    </svg>
  );
}

// ── Scatter configuration ─────────────────────────────────────────────────────

const SPARKLES: Array<{
  Shape: React.ComponentType<{ size?: number }>;
  size: number;
  style: React.CSSProperties;
  opacity: number;
  delay: number;
  duration: number;
  blink: boolean; // whether this one does the sharp blink
}> = [
  // ── original 12 ──────────────────────────────────────────────────────────
  { Shape: StarPixel,  size: 30, style: { top: "9%",  left: "5%"   }, opacity: 0.20, delay: 0.0, duration: 4.2, blink: false },
  { Shape: CrossPixel, size: 14, style: { top: "24%", left: "3%"   }, opacity: 0.18, delay: 1.3, duration: 3.6, blink: true  },
  { Shape: DotPixel,   size: 6,  style: { top: "11%", left: "52%"  }, opacity: 0.22, delay: 0.7, duration: 3.9, blink: false },
  { Shape: StarPixel,  size: 22, style: { top: "9%",  right: "7%"  }, opacity: 0.16, delay: 0.5, duration: 5.0, blink: true  },
  { Shape: CrossPixel, size: 12, style: { top: "38%", right: "4%"  }, opacity: 0.17, delay: 1.9, duration: 3.3, blink: false },
  { Shape: RingPixel,  size: 14, style: { top: "64%", left: "4%"   }, opacity: 0.15, delay: 1.0, duration: 4.6, blink: true  },
  { Shape: StarPixel,  size: 24, style: { top: "71%", right: "8%"  }, opacity: 0.18, delay: 1.5, duration: 4.3, blink: false },
  { Shape: DotPixel,   size: 5,  style: { top: "80%", left: "23%"  }, opacity: 0.20, delay: 0.3, duration: 3.7, blink: true  },
  { Shape: CrossPixel, size: 10, style: { top: "84%", right: "6%"  }, opacity: 0.17, delay: 2.3, duration: 3.4, blink: false },
  { Shape: RingPixel,  size: 12, style: { top: "88%", left: "56%"  }, opacity: 0.14, delay: 1.1, duration: 4.9, blink: true  },
  { Shape: DotPixel,   size: 4,  style: { top: "46%", left: "2%"   }, opacity: 0.20, delay: 1.7, duration: 3.1, blink: false },
  { Shape: CrossPixel, size: 8,  style: { top: "27%", right: "2%"  }, opacity: 0.15, delay: 0.8, duration: 4.5, blink: true  },

  // ── new 12 ───────────────────────────────────────────────────────────────
  { Shape: StarPixel,  size: 18, style: { top: "18%", left: "14%"  }, opacity: 0.14, delay: 2.1, duration: 5.2, blink: true  },
  { Shape: DotPixel,   size: 5,  style: { top: "33%", left: "8%"   }, opacity: 0.18, delay: 0.4, duration: 3.5, blink: false },
  { Shape: CrossPixel, size: 10, style: { top: "52%", left: "12%"  }, opacity: 0.16, delay: 1.6, duration: 4.1, blink: true  },
  { Shape: RingPixel,  size: 16, style: { top: "16%", right: "16%" }, opacity: 0.15, delay: 2.8, duration: 4.7, blink: false },
  { Shape: DotPixel,   size: 7,  style: { top: "48%", right: "12%" }, opacity: 0.18, delay: 0.9, duration: 3.8, blink: true  },
  { Shape: StarPixel,  size: 14, style: { top: "58%", right: "18%" }, opacity: 0.13, delay: 2.4, duration: 5.5, blink: false },
  { Shape: CrossPixel, size: 12, style: { top: "75%", left: "10%"  }, opacity: 0.17, delay: 1.4, duration: 3.2, blink: true  },
  { Shape: RingPixel,  size: 10, style: { top: "93%", left: "35%"  }, opacity: 0.14, delay: 2.0, duration: 4.4, blink: false },
  { Shape: DotPixel,   size: 4,  style: { top: "6%",  left: "30%"  }, opacity: 0.20, delay: 3.1, duration: 3.6, blink: true  },
  { Shape: StarPixel,  size: 20, style: { top: "92%", right: "22%" }, opacity: 0.15, delay: 1.8, duration: 4.8, blink: false },
  { Shape: CrossPixel, size: 8,  style: { top: "7%",  right: "30%" }, opacity: 0.16, delay: 0.6, duration: 3.3, blink: true  },
  { Shape: RingPixel,  size: 14, style: { top: "55%", left: "90%"  }, opacity: 0.13, delay: 2.6, duration: 5.1, blink: false },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function PixelSparkles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {SPARKLES.map(({ Shape, size, style, opacity, delay, duration, blink }, i) => (
        <motion.div
          key={i}
          className="text-accent-light absolute"
          style={style}
          initial={{ opacity: opacity * 0.5 }}
          animate={
            blink
              ? {
                  // Sit quiet, then flash on–off–on, then return
                  opacity: [
                    opacity * 0.5,
                    opacity * 0.5,
                    opacity * 1.8,
                    opacity * 0.05,
                    opacity * 1.6,
                    opacity * 0.5,
                    opacity * 0.5,
                  ],
                  scale: [1, 1, 1.15, 0.9, 1.1, 1, 1],
                }
              : {
                  // Gentle ambient breathe
                  opacity: [opacity * 0.5, opacity, opacity * 0.65, opacity * 0.5],
                  scale:   [1, 1.08, 0.96, 1],
                }
          }
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
            // blinkers spend most of the cycle idle — compress the flash to ~15% of duration
            times: blink ? [0, 0.55, 0.63, 0.70, 0.77, 0.85, 1] : [0, 0.33, 0.66, 1],
          }}
        >
          <Shape size={size} />
        </motion.div>
      ))}
    </div>
  );
}
