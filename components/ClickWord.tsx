"use client";

import { useAnimate, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

// ── Hand cursor SVG ────────────────────────────────────────────────────────
function HandCursor() {
  return (
    <svg
      width="32" height="40" viewBox="0 0 32 40"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}
    >
      {/* Index finger (pointing up) */}
      <path
        d="M12 1C10.1 1 8.5 2.6 8.5 4.5V19H7.5C5.6 19 4 20.6 4 22.5V29C4 34 8 38 13 38H19C24 38 28 34 28 29V22.5C28 20.6 26.4 19 24.5 19V13.5C24.5 11.6 22.9 10 21 10V4.5C21 2.6 19.4 1 17.5 1H12Z"
        fill="white" stroke="#1a1a1a" strokeWidth="1.4" strokeLinejoin="round"
      />
      {/* Knuckle lines */}
      <line x1="6" y1="25" x2="26" y2="25" stroke="#ccc" strokeWidth="0.9"/>
      <line x1="6" y1="30" x2="26" y2="30" stroke="#ccc" strokeWidth="0.9"/>
      <line x1="6" y1="35" x2="26" y2="35" stroke="#ccc" strokeWidth="0.9"/>
      {/* Finger splits */}
      <line x1="16" y1="10" x2="16" y2="19" stroke="#ccc" strokeWidth="0.7"/>
      <line x1="21" y1="13" x2="21" y2="19" stroke="#ccc" strokeWidth="0.7"/>
    </svg>
  );
}

// ── 4-pointed star ─────────────────────────────────────────────────────────
function Star({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill={color}>
      <path d="M5 0 L5.9 4.1 L10 5 L5.9 5.9 L5 10 L4.1 5.9 L0 5 L4.1 4.1 Z" />
    </svg>
  );
}

// ── Burst ring ─────────────────────────────────────────────────────────────
function Ring() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="18" stroke="var(--color-accent-light)" strokeWidth="2.5" />
    </svg>
  );
}

// ── Particle layout: [left%, top%, endX px, endY px, shape, color, size] ──
const PARTICLES: [number, number, number, number, "star" | "dot", string, number][] = [
  [-12, 25,  -28, -18, "star", "var(--color-accent-light)",  10],
  [-8,  65,  -22,  14, "dot",  "var(--color-gold)",            6],
  [18, -18,   -6, -30, "star", "var(--color-accent)",           8],
  [50, -20,    2, -32, "star", "var(--color-accent-light)",     6],
  [80, -18,   14, -28, "dot",  "var(--color-gold)",             5],
  [108, 20,   28, -16, "star", "var(--color-accent-light)",     9],
  [110, 65,   26,  14, "dot",  "var(--color-accent)",           6],
  [30, 108,   -6,  26, "star", "var(--color-gold)",             7],
  [68, 110,   12,  24, "dot",  "var(--color-accent-light)",     5],
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function ClickWord({ children }: { children: React.ReactNode }) {
  const [scope, animate] = useAnimate();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    let alive = true;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const run = async () => {
      if (!scope.current || !alive) return;

      // ── Reset ──────────────────────────────────────────────────────────
      animate("[data-outline]",  { opacity: 1 },                           { duration: 0 });
      animate("[data-cursor]",   { opacity: 0, x: 24, y: 0, scale: 1 },   { duration: 0 });
      animate("[data-ring]",     { scale: 0, opacity: 0 },                 { duration: 0 });
      animate(scope.current,     { textShadow: "0px 0px 0px transparent" }, { duration: 0 });
      (Array.from(scope.current.querySelectorAll("[data-particle]")) as HTMLElement[]).forEach((el) => {
        el.style.cssText += "; opacity: 0; transform: translate(0,0)";
      });

      await sleep(60);
      if (!alive) return;

      // ── Phase 1 (0–200ms): cursor slides in + outline fades → fill reveals ──
      animate("[data-cursor]", { opacity: 1, x: 0 }, { duration: 0.2, ease: EASE_OUT });
      await animate("[data-outline]", { opacity: 0 }, { duration: 0.2, ease: "easeOut" });

      // ── Phase 2 (200–350ms): hover pause ──────────────────────────────
      await sleep(150);
      if (!alive) return;

      // ── Phase 3 (350–500ms): press + shadow + ring begins ─────────────
      animate("[data-cursor]", { y: 9, scale: 0.82 }, { duration: 0.1, ease: "easeOut" });
      animate(scope.current, {
        textShadow: "4px 5px 0px var(--color-accent)",
      }, { duration: 0.08 });
      await animate(
        "[data-ring]",
        { scale: [0, 1.1], opacity: [1, 0.55] },
        { duration: 0.18, ease: "easeOut" }
      );

      // ── Phase 4 (500–1000ms): release + particles + ring expands ──────
      if (!alive) return;
      animate("[data-cursor]",  { y: 0, scale: 1, opacity: 0, x: 30 },    { duration: 0.32, ease: EASE_OUT });
      animate(scope.current,    { textShadow: "0px 0px 0px transparent" }, { duration: 0.25 });
      animate("[data-ring]",    { scale: 4.5, opacity: 0 },                { duration: 0.5, ease: "easeOut" });

      (Array.from(scope.current.querySelectorAll("[data-particle]")) as HTMLElement[]).forEach((el, i) => {
        const [, , dx, dy] = PARTICLES[i];
        animate(el, { opacity: [1, 1, 0], x: [0, dx], y: [0, dy] }, {
          duration: 0.46,
          ease: "easeOut",
        });
      });
    };

    run();
    const id = setInterval(run, 5000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [animate, prefersReduced, scope]);

  return (
    <span
      ref={scope}
      className="relative inline-block"
      style={{ isolation: "isolate" }}
    >
      {children}

      {/* Outline overlay (initial state — base-color fill + stroke = outline look) */}
      <span
        data-outline="true"
        aria-hidden
        className="pointer-events-none select-none absolute top-0 left-0 whitespace-nowrap"
        style={{
          color: "var(--color-base)",
          WebkitTextFillColor: "var(--color-base)",
          WebkitTextStroke: "1.5px var(--color-accent-light)",
        }}
      >
        {children}
      </span>

      {/* Hand cursor */}
      <span
        data-cursor="true"
        className="pointer-events-none absolute"
        style={{ bottom: "-8px", right: "-14%", opacity: 0 }}
      >
        <HandCursor />
      </span>

      {/* Burst ring — anchored near cursor tip */}
      <span
        data-ring="true"
        className="pointer-events-none absolute"
        style={{ bottom: "0px", right: "-8%", opacity: 0, scale: 0 }}
      >
        <Ring />
      </span>

      {/* Particles */}
      {PARTICLES.map(([left, top, , , shape, color, size], i) => (
        <span
          key={i}
          data-particle="true"
          aria-hidden
          className="pointer-events-none absolute opacity-0"
          style={{ left: `${left}%`, top: `${top}%` }}
        >
          {shape === "star" ? (
            <Star size={size} color={color} />
          ) : (
            <span
              className="block rounded-full"
              style={{ width: size, height: size, backgroundColor: color }}
            />
          )}
        </span>
      ))}
    </span>
  );
}
