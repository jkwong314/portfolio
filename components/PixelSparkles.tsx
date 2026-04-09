"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

// ── Pixel star shapes from reference ─────────────────────────────────────────
// Top-left ref: 4-point star with hollow centre + spikes
export function Star4({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="5" y="0"  width="3" height="2" />
      <rect x="4" y="2"  width="1" height="2" />
      <rect x="8" y="2"  width="1" height="2" />
      <rect x="3" y="4"  width="1" height="1" />
      <rect x="9" y="4"  width="1" height="1" />
      <rect x="0" y="5"  width="3" height="3" />
      <rect x="10" y="5" width="3" height="3" />
      <rect x="3" y="7"  width="1" height="1" />
      <rect x="9" y="7"  width="1" height="1" />
      <rect x="4" y="8"  width="1" height="2" />
      <rect x="8" y="8"  width="1" height="2" />
      <rect x="5" y="10" width="3" height="2" />
      {/* hollow centre gap */}
      <rect x="4" y="5"  width="5" height="3" fill="transparent" />
    </svg>
  );
}

// Top-middle ref: crosshair / scope style
export function Crosshair({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 11 11" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="4" y="0"  width="3" height="3" />
      <rect x="4" y="8"  width="3" height="3" />
      <rect x="0" y="4"  width="3" height="3" />
      <rect x="8" y="4"  width="3" height="3" />
      <rect x="3" y="3"  width="1" height="1" />
      <rect x="7" y="3"  width="1" height="1" />
      <rect x="3" y="7"  width="1" height="1" />
      <rect x="7" y="7"  width="1" height="1" />
    </svg>
  );
}

// Top-right ref: 8-point star / sun burst — solid
export function Star8({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="5" y="0"  width="3" height="2" />
      <rect x="5" y="11" width="3" height="2" />
      <rect x="0" y="5"  width="2" height="3" />
      <rect x="11" y="5" width="2" height="3" />
      <rect x="3" y="2"  width="2" height="2" />
      <rect x="8" y="2"  width="2" height="2" />
      <rect x="3" y="9"  width="2" height="2" />
      <rect x="8" y="9"  width="2" height="2" />
      <rect x="3" y="4"  width="7" height="5" />
      <rect x="4" y="3"  width="5" height="7" />
    </svg>
  );
}

// Bottom-left ref: loose cross with scattered dots
export function StarLoose({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 11 13" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="4" y="0"  width="2" height="1" />   {/* top dot */}
      <rect x="3" y="2"  width="4" height="2" />
      <rect x="0" y="4"  width="2" height="2" />   {/* left dot */}
      <rect x="3" y="4"  width="4" height="4" />   {/* centre */}
      <rect x="8" y="4"  width="2" height="2" />   {/* right dot (offset) */}
      <rect x="3" y="8"  width="4" height="2" />
      <rect x="1" y="7"  width="1" height="1" />   {/* lower-left dot */}
      <rect x="4" y="11" width="2" height="1" />   {/* bottom dot */}
    </svg>
  );
}

// Bottom-middle ref: diamond ring (pixel circle outline)
export function DiamondRing({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="4" y="0"  width="5" height="2" />
      <rect x="2" y="2"  width="2" height="2" />
      <rect x="9" y="2"  width="2" height="2" />
      <rect x="0" y="4"  width="2" height="5" />
      <rect x="11" y="4" width="2" height="5" />
      <rect x="2" y="9"  width="2" height="2" />
      <rect x="9" y="9"  width="2" height="2" />
      <rect x="4" y="11" width="5" height="2" />
    </svg>
  );
}

// Bottom-right ref: compact 4-point star (smaller, chunkier)
export function Star4Small({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 9 9" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="3" y="0"  width="3" height="2" />
      <rect x="3" y="7"  width="3" height="2" />
      <rect x="0" y="3"  width="2" height="3" />
      <rect x="7" y="3"  width="2" height="3" />
      <rect x="2" y="2"  width="5" height="5" />
    </svg>
  );
}

// Simple 1px dot
export function DotPixel({ size = 6 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 4 4" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="0" y="0" width="4" height="4" />
    </svg>
  );
}

// ── Scatter map ───────────────────────────────────────────────────────────────
type SP = {
  Shape: React.ComponentType<{ size?: number }>;
  size: number;
  style: React.CSSProperties;
  opacity: number;
  delay: number;
  duration: number;
  blink: boolean;
};

const SPARKLES: SP[] = [
  // ── corners / edges ────────────────────────────────────────────────────────
  { Shape: Star4,       size: 28, style: { top: "5%",  left: "4%"   }, opacity: 0.20, delay: 0.0, duration: 5.0, blink: true  },
  { Shape: Star8,       size: 22, style: { top: "7%",  right: "5%"  }, opacity: 0.16, delay: 0.8, duration: 4.5, blink: false },
  { Shape: Star4Small,  size: 16, style: { top: "91%", left: "6%"   }, opacity: 0.18, delay: 1.2, duration: 4.8, blink: true  },
  { Shape: Star4,       size: 20, style: { top: "88%", right: "4%"  }, opacity: 0.15, delay: 2.0, duration: 5.2, blink: false },
  { Shape: DotPixel,    size: 3,  style: { top: "2%",  left: "2%"   }, opacity: 0.18, delay: 3.4, duration: 3.8, blink: true  },
  { Shape: DotPixel,    size: 3,  style: { top: "2%",  right: "2%"  }, opacity: 0.16, delay: 1.6, duration: 4.0, blink: false },
  { Shape: DiamondRing, size: 10, style: { top: "95%", left: "42%"  }, opacity: 0.12, delay: 2.3, duration: 5.4, blink: true  },
  { Shape: Star4Small,  size: 8,  style: { top: "96%", right: "35%" }, opacity: 0.13, delay: 0.9, duration: 4.6, blink: false },

  // ── upper band ─────────────────────────────────────────────────────────────
  { Shape: Crosshair,   size: 14, style: { top: "4%",  left: "22%"  }, opacity: 0.16, delay: 1.5, duration: 3.8, blink: true  },
  { Shape: DotPixel,    size: 5,  style: { top: "3%",  left: "40%"  }, opacity: 0.20, delay: 0.3, duration: 3.2, blink: false },
  { Shape: Star4Small,  size: 12, style: { top: "6%",  left: "58%"  }, opacity: 0.16, delay: 2.4, duration: 4.1, blink: true  },
  { Shape: DiamondRing, size: 16, style: { top: "5%",  right: "22%" }, opacity: 0.14, delay: 0.6, duration: 5.5, blink: false },
  { Shape: DotPixel,    size: 4,  style: { top: "10%", left: "72%"  }, opacity: 0.18, delay: 1.9, duration: 3.5, blink: true  },
  { Shape: Star8,       size: 8,  style: { top: "2%",  left: "32%"  }, opacity: 0.12, delay: 3.8, duration: 5.1, blink: false },
  { Shape: DotPixel,    size: 3,  style: { top: "8%",  left: "50%"  }, opacity: 0.16, delay: 2.7, duration: 3.3, blink: true  },
  { Shape: Star4Small,  size: 6,  style: { top: "4%",  right: "38%" }, opacity: 0.13, delay: 0.4, duration: 4.8, blink: false },
  { Shape: DiamondRing, size: 8,  style: { top: "9%",  right: "14%" }, opacity: 0.12, delay: 4.1, duration: 5.6, blink: true  },

  // ── upper-mid band ─────────────────────────────────────────────────────────
  { Shape: Star8,       size: 18, style: { top: "18%", left: "2%"   }, opacity: 0.14, delay: 1.0, duration: 4.6, blink: false },
  { Shape: StarLoose,   size: 20, style: { top: "15%", left: "18%"  }, opacity: 0.13, delay: 2.2, duration: 5.0, blink: true  },
  { Shape: DotPixel,    size: 5,  style: { top: "20%", left: "35%"  }, opacity: 0.18, delay: 0.5, duration: 3.3, blink: false },
  { Shape: Crosshair,   size: 12, style: { top: "17%", left: "48%"  }, opacity: 0.14, delay: 3.0, duration: 4.0, blink: true  },
  { Shape: Star4Small,  size: 14, style: { top: "14%", right: "18%" }, opacity: 0.15, delay: 1.7, duration: 4.4, blink: false },
  { Shape: DiamondRing, size: 18, style: { top: "22%", right: "8%"  }, opacity: 0.13, delay: 0.9, duration: 5.1, blink: true  },
  { Shape: DotPixel,    size: 3,  style: { top: "13%", left: "28%"  }, opacity: 0.16, delay: 4.5, duration: 3.7, blink: false },
  { Shape: Star4,       size: 10, style: { top: "24%", left: "62%"  }, opacity: 0.11, delay: 2.9, duration: 5.3, blink: true  },
  { Shape: DotPixel,    size: 6,  style: { top: "19%", right: "30%" }, opacity: 0.17, delay: 1.1, duration: 3.5, blink: false },
  { Shape: Crosshair,   size: 8,  style: { top: "12%", right: "42%" }, opacity: 0.12, delay: 3.6, duration: 4.7, blink: true  },

  // ── mid-left & mid-right rails ─────────────────────────────────────────────
  { Shape: Star4,       size: 24, style: { top: "35%", left: "1%"   }, opacity: 0.16, delay: 1.3, duration: 4.7, blink: false },
  { Shape: DotPixel,    size: 6,  style: { top: "42%", left: "6%"   }, opacity: 0.20, delay: 2.6, duration: 3.6, blink: true  },
  { Shape: StarLoose,   size: 16, style: { top: "50%", left: "2%"   }, opacity: 0.14, delay: 0.7, duration: 4.9, blink: false },
  { Shape: Crosshair,   size: 16, style: { top: "38%", right: "2%"  }, opacity: 0.15, delay: 1.8, duration: 3.9, blink: true  },
  { Shape: Star4Small,  size: 12, style: { top: "47%", right: "7%"  }, opacity: 0.16, delay: 0.4, duration: 4.2, blink: false },
  { Shape: DotPixel,    size: 4,  style: { top: "55%", right: "3%"  }, opacity: 0.18, delay: 2.8, duration: 3.4, blink: true  },
  { Shape: DiamondRing, size: 8,  style: { top: "31%", left: "5%"   }, opacity: 0.12, delay: 4.2, duration: 5.5, blink: false },
  { Shape: Star8,       size: 6,  style: { top: "58%", left: "3%"   }, opacity: 0.13, delay: 3.3, duration: 4.3, blink: true  },
  { Shape: DotPixel,    size: 3,  style: { top: "43%", right: "4%"  }, opacity: 0.16, delay: 1.4, duration: 3.1, blink: false },
  { Shape: Star4Small,  size: 8,  style: { top: "62%", right: "5%"  }, opacity: 0.13, delay: 2.5, duration: 4.8, blink: true  },

  // ── centre-left fill ───────────────────────────────────────────────────────
  { Shape: DiamondRing, size: 14, style: { top: "32%", left: "11%"  }, opacity: 0.12, delay: 3.2, duration: 5.3, blink: false },
  { Shape: DotPixel,    size: 5,  style: { top: "44%", left: "14%"  }, opacity: 0.16, delay: 1.4, duration: 3.7, blink: true  },
  { Shape: Star8,       size: 14, style: { top: "60%", left: "8%"   }, opacity: 0.13, delay: 2.1, duration: 4.5, blink: false },
  { Shape: Star4Small,  size: 6,  style: { top: "37%", left: "16%"  }, opacity: 0.12, delay: 4.8, duration: 5.0, blink: true  },
  { Shape: DotPixel,    size: 3,  style: { top: "53%", left: "10%"  }, opacity: 0.15, delay: 0.8, duration: 3.4, blink: false },
  { Shape: Crosshair,   size: 10, style: { top: "65%", left: "13%"  }, opacity: 0.11, delay: 3.7, duration: 5.2, blink: true  },

  // ── centre-right fill ──────────────────────────────────────────────────────
  { Shape: Star4,       size: 18, style: { top: "30%", right: "12%" }, opacity: 0.13, delay: 0.2, duration: 5.0, blink: true  },
  { Shape: DotPixel,    size: 4,  style: { top: "42%", right: "16%" }, opacity: 0.17, delay: 1.6, duration: 3.2, blink: false },
  { Shape: Crosshair,   size: 10, style: { top: "58%", right: "11%" }, opacity: 0.14, delay: 2.9, duration: 4.3, blink: true  },
  { Shape: StarLoose,   size: 8,  style: { top: "36%", right: "20%" }, opacity: 0.11, delay: 4.0, duration: 5.4, blink: false },
  { Shape: DotPixel,    size: 3,  style: { top: "50%", right: "18%" }, opacity: 0.15, delay: 2.3, duration: 3.6, blink: true  },
  { Shape: DiamondRing, size: 12, style: { top: "63%", right: "15%" }, opacity: 0.12, delay: 1.0, duration: 4.9, blink: false },

  // ── lower-mid band ─────────────────────────────────────────────────────────
  { Shape: StarLoose,   size: 22, style: { top: "68%", left: "4%"   }, opacity: 0.15, delay: 1.1, duration: 4.8, blink: false },
  { Shape: Star4Small,  size: 14, style: { top: "72%", left: "16%"  }, opacity: 0.16, delay: 2.5, duration: 3.8, blink: true  },
  { Shape: DotPixel,    size: 6,  style: { top: "75%", left: "30%"  }, opacity: 0.18, delay: 0.6, duration: 3.5, blink: false },
  { Shape: DiamondRing, size: 16, style: { top: "70%", right: "20%" }, opacity: 0.13, delay: 1.8, duration: 5.2, blink: true  },
  { Shape: Star8,       size: 20, style: { top: "67%", right: "7%"  }, opacity: 0.15, delay: 0.3, duration: 4.6, blink: false },
  { Shape: Crosshair,   size: 12, style: { top: "78%", right: "14%" }, opacity: 0.14, delay: 3.1, duration: 3.9, blink: true  },
  { Shape: DotPixel,    size: 3,  style: { top: "66%", left: "24%"  }, opacity: 0.16, delay: 4.4, duration: 4.2, blink: false },
  { Shape: Star4,       size: 8,  style: { top: "73%", left: "42%"  }, opacity: 0.12, delay: 2.7, duration: 5.1, blink: true  },
  { Shape: DotPixel,    size: 5,  style: { top: "80%", right: "28%" }, opacity: 0.16, delay: 1.3, duration: 3.3, blink: false },
  { Shape: Star4Small,  size: 6,  style: { top: "76%", right: "38%" }, opacity: 0.11, delay: 3.5, duration: 5.5, blink: true  },

  // ── lower band ─────────────────────────────────────────────────────────────
  { Shape: DotPixel,    size: 5,  style: { top: "85%", left: "20%"  }, opacity: 0.18, delay: 2.0, duration: 3.3, blink: false },
  { Shape: Star4,       size: 16, style: { top: "83%", left: "38%"  }, opacity: 0.14, delay: 1.3, duration: 4.7, blink: true  },
  { Shape: StarLoose,   size: 14, style: { top: "87%", left: "55%"  }, opacity: 0.13, delay: 0.8, duration: 5.0, blink: false },
  { Shape: DotPixel,    size: 4,  style: { top: "90%", right: "30%" }, opacity: 0.16, delay: 2.7, duration: 3.6, blink: true  },
  { Shape: Crosshair,   size: 14, style: { top: "93%", right: "12%" }, opacity: 0.14, delay: 1.5, duration: 4.2, blink: false },
  { Shape: Star8,       size: 10, style: { top: "84%", left: "10%"  }, opacity: 0.12, delay: 3.9, duration: 5.3, blink: true  },
  { Shape: DotPixel,    size: 3,  style: { top: "89%", left: "48%"  }, opacity: 0.15, delay: 0.5, duration: 3.8, blink: false },
  { Shape: DiamondRing, size: 12, style: { top: "92%", left: "68%"  }, opacity: 0.12, delay: 2.2, duration: 4.9, blink: true  },
  { Shape: Star4Small,  size: 8,  style: { top: "86%", right: "45%" }, opacity: 0.13, delay: 4.3, duration: 5.2, blink: false },
  { Shape: DotPixel,    size: 4,  style: { top: "94%", right: "22%" }, opacity: 0.15, delay: 1.7, duration: 3.4, blink: true  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function PixelSparkles() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  if (isMobile) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {SPARKLES.map(({ Shape, size, style, opacity, delay, duration, blink }, i) => (
        <motion.div
          key={i}
          className="text-accent-light absolute"
          style={style}
          initial={{ opacity: opacity * 0.4 }}
          animate={
            blink
              ? {
                  opacity: [opacity * 0.4, opacity * 0.4, opacity * 1.6, opacity * 0.05, opacity * 1.4, opacity * 0.4, opacity * 0.4],
                  scale:   [1, 1, 1.12, 0.88, 1.08, 1, 1],
                }
              : {
                  opacity: [opacity * 0.4, opacity, opacity * 0.6, opacity * 0.4],
                  scale:   [1, 1.06, 0.97, 1],
                }
          }
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
            times: blink ? [0, 0.55, 0.63, 0.70, 0.77, 0.85, 1] : [0, 0.33, 0.66, 1],
          }}
        >
          <Shape size={size} />
        </motion.div>
      ))}
    </div>
  );
}
