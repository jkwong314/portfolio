"use client";

import { useEffect, useRef, useState } from "react";

const LETTERS = ["W", "E", "L", "C", "O", "M", "E", "!"];
const TILE_COLORS = [
  { front: "#EC4899", border: "#F9A8D4" },
  { front: "#06B6D4", border: "#67E8F9" },
  { front: "#EAB308", border: "#FDE047" },
  { front: "#7C3AED", border: "#A78BFA" },
  { front: "#EC4899", border: "#F9A8D4" },
  { front: "#06B6D4", border: "#67E8F9" },
  { front: "#EAB308", border: "#FDE047" },
  { front: "#7C3AED", border: "#A78BFA" },
];

interface TileState {
  landed: boolean;
  flipped: boolean;
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [tiles, setTiles] = useState<TileState[]>(
    LETTERS.map(() => ({ landed: false, flipped: false }))
  );
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [tileSize, setTileSize] = useState(74);
  const [tileGap, setTileGap] = useState(10);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function q(fn: () => void, ms: number) {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  }

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("loader_shown")) return;
    sessionStorage.setItem("loader_shown", "1");

    // Compute tile size to fit viewport — solve: 8*size + 7*gap = vw - 32px
    // keeping gap/size ratio constant (10/74 ≈ 0.135)
    const n = LETTERS.length;
    const ratio = 10 / 74;
    const available = window.innerWidth - 32;
    const computed = available / (n + (n - 1) * ratio);
    const size = Math.min(74, Math.floor(computed));
    const gap = Math.min(10, Math.max(4, Math.floor(size * ratio)));
    setTileSize(size);
    setTileGap(gap);

    // Lock scroll
    document.body.style.overflow = "hidden";

    setVisible(true);

    // Land tiles with stagger
    LETTERS.forEach((_, i) => {
      q(() => {
        setTiles((prev) => {
          const next = [...prev];
          next[i] = { ...next[i], landed: true };
          return next;
        });
      }, 200 + i * 90);
    });

    // Flip each tile
    LETTERS.forEach((_, i) => {
      q(() => {
        setTiles((prev) => {
          const next = [...prev];
          next[i] = { ...next[i], flipped: true };
          return next;
        });
      }, 1200 + i * 100);
    });

    // Subtitle fades in after last tile flips
    q(() => setSubtitleVisible(true), 2400);

    // Hold fully visible, scroll to top, then begin slow fade
    q(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setFading(true);
    }, 5000);

    // Remove after 2s fade (total ≈ 7s)
    q(() => {
      document.body.style.overflow = "";
      setVisible(false);
    }, 7000);

    return () => {
      timers.current.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5"
      style={{
        background: "var(--color-base)",
        backgroundImage: [
          "radial-gradient(ellipse 60% 55% at -5% -8%, rgba(124,58,237,0.22) 0%, transparent 70%)",
          "radial-gradient(ellipse 55% 50% at 108% 108%, rgba(201,168,76,0.18) 0%, transparent 70%)",
          "radial-gradient(ellipse 45% 42% at 95% 38%, rgba(6,182,212,0.1) 0%, transparent 70%)",
          "radial-gradient(ellipse 42% 36% at 8% 80%, rgba(236,72,153,0.09) 0%, transparent 70%)",
        ].join(", "),
        opacity: fading ? 0 : 1,
        transition: "opacity 2s ease",
        pointerEvents: fading ? "none" : undefined,
      }}
    >
      {/* Grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: "var(--grain-opacity, 0.09)" as unknown as number,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Tiles row */}
      <div className="flex items-center" style={{ gap: tileGap }}>
        {LETTERS.map((letter, i) => {
          const color = TILE_COLORS[i];
          const { landed, flipped } = tiles[i];
          const fontSize = Math.round(tileSize * 0.51);
          const radius = Math.round(tileSize * 0.16);
          return (
            <div
              key={i}
              style={{
                width: tileSize,
                height: tileSize,
                perspective: 900,
                flexShrink: 0,
                transform: landed ? "translateY(0)" : "translateY(-140px)",
                opacity: landed ? 1 : 0,
                transition:
                  "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  transformStyle: "preserve-3d",
                  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {/* Front — solid color */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: radius,
                    backfaceVisibility: "hidden",
                    background: color.front,
                  }}
                />
                {/* Back — dark + letter */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: radius,
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "var(--color-surface)",
                    border: `2px solid ${color.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-bricolage-grotesque), sans-serif",
                      fontWeight: 600,
                      fontSize,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      color: "var(--color-text-primary)",
                      userSelect: "none",
                    }}
                  >
                    {letter}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontSize: "0.875rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-text-primary)",
          opacity: subtitleVisible ? 0.75 : 0,
          transform: subtitleVisible ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        Jamie Kwong&nbsp;&nbsp;·&nbsp;&nbsp;Product Designer
      </p>
    </div>
  );
}
