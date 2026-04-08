"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useMotionValue, useSpring, animate } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

// ── Album images (album-04 moved to end) ─────────────────────────────────
const IMAGE_ORDER = [1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,4];
const IMAGES = IMAGE_ORDER.map((n, i) => ({
  id: i,
  src: `/images/album-${String(n).padStart(2, "0")}.jpg`,
  alt: `Photo ${i + 1}`,
}));

const CARD_WIDTH = 320;
const CARD_HEIGHT = 440;
const CARD_GAP = 72;
const VISIBLE_RANGE = 5;

export default function AlbumPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const mouseXFromCenter = useRef(0);

  // Start offset so ~4 cards are visible to the right, hinting it's a carousel
  const INITIAL_OFFSET = -3 * CARD_GAP;
  const rawOffset = useMotionValue(INITIAL_OFFSET);
  const offset = useSpring(rawOffset, { stiffness: 300, damping: 40 });

  const [centerIdx, setCenterIdx] = useState(3);

  // On mount, animate from the offset view back to card 0
  const hasAnimated = useRef(false);
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const timer = setTimeout(() => {
      animate(rawOffset, 0, {
        type: "spring",
        stiffness: 120,
        damping: 30,
        duration: 1.2,
      });
    }, 800);
    return () => clearTimeout(timer);
  }, [rawOffset]);

  const getCenter = useCallback(
    (off: number) => Math.round(-off / CARD_GAP),
    []
  );

  const snapTo = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(IMAGES.length - 1, idx));
      animate(rawOffset, -clamped * CARD_GAP, {
        type: "spring",
        stiffness: 300,
        damping: 40,
      });
    },
    [rawOffset]
  );

  // ── Pointer drag ─────────────────────────────────────────────────────────
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      dragStartX.current = e.clientX;
      dragStartOffset.current = rawOffset.get();
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [rawOffset]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStartX.current;
      const next = dragStartOffset.current + dx;
      const min = -(IMAGES.length - 1) * CARD_GAP;
      const clamped = Math.max(min - 100, Math.min(100, next));
      rawOffset.set(clamped);
    },
    [rawOffset]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const idx = getCenter(rawOffset.get());
    snapTo(idx);
  }, [rawOffset, getCenter, snapTo]);

  // Keep centerIdx in sync during drag
  useEffect(() => {
    const unsub = offset.on("change", (val) => {
      const idx = Math.round(-val / CARD_GAP);
      const clamped = Math.max(0, Math.min(IMAGES.length - 1, idx));
      setCenterIdx(clamped);
    });
    return unsub;
  }, [offset]);

  // ── Keyboard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") snapTo(centerIdx - 1);
      if (e.key === "ArrowRight") snapTo(centerIdx + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [centerIdx, snapTo]);

  // ── Wheel — capture when carousel has room, pass-through at edges ──────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const min = -(IMAGES.length - 1) * CARD_GAP;

    const onWheel = (e: WheelEvent) => {
      // Only handle wheel when cursor is over the card stack, not the side gutters
      const HITBOX = CARD_GAP * VISIBLE_RANGE + CARD_WIDTH / 2;
      if (Math.abs(mouseXFromCenter.current) > HITBOX) return;

      const cur = rawOffset.get();
      const delta = -e.deltaX - e.deltaY * 0.5;
      const atStart = cur >= 0 && delta > 0;
      const atEnd = cur <= min && delta < 0;

      // At edges → let the page scroll naturally to footer / back up
      if (atStart || atEnd) return;

      e.preventDefault();
      const next = cur + delta;
      rawOffset.set(Math.max(min - 100, Math.min(100, next)));
      clearTimeout((onWheel as any)._t);
      (onWheel as any)._t = setTimeout(() => {
        const idx = getCenter(rawOffset.get());
        snapTo(idx);
      }, 150);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [rawOffset, getCenter, snapTo]);

  return (
    <div
      className="relative flex flex-col"
      style={{ minHeight: "100vh", background: isDark ? "#0a0a0a" : "#F4F4F5" }}
    >
      {/* Title */}
      <div className="pt-52 pb-2 text-center">
        <h1
          className="font-display font-black leading-tight"
          style={{
            fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
            letterSpacing: "-0.04em",
            color: isDark ? "rgba(255,255,255,0.9)" : "rgba(24,24,27,0.9)",
          }}
        >
          A life in frames
        </h1>
        <p
          className="mt-2 text-sm tracking-wide"
          style={{ color: isDark ? "rgba(255,255,255,0.35)" : "rgba(24,24,27,0.4)" }}
        >
          Drag or use arrow keys to browse
        </p>
      </div>

      {/* Carousel viewport + nav arrows + glow edges (scoped here, not fixed) */}
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => snapTo(centerIdx - 1)}
          disabled={centerIdx <= 0}
          aria-label="Previous photo"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm transition-all disabled:opacity-20 disabled:pointer-events-none"
          style={{
            background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            borderWidth: 1,
            color: isDark ? "rgba(255,255,255,0.7)" : "rgba(24,24,27,0.6)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4L6 10L12 16" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => snapTo(centerIdx + 1)}
          disabled={centerIdx >= IMAGES.length - 1}
          aria-label="Next photo"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm transition-all disabled:opacity-20 disabled:pointer-events-none"
          style={{
            background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            borderWidth: 1,
            color: isDark ? "rgba(255,255,255,0.7)" : "rgba(24,24,27,0.6)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 4L14 10L8 16" />
          </svg>
        </button>

        <div
          ref={containerRef}
          className="relative cursor-grab items-center justify-center overflow-hidden active:cursor-grabbing select-none flex"
          style={{ perspective: "1200px", height: "clamp(480px, 60vh, 640px)" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseMove={(e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) mouseXFromCenter.current = e.clientX - (rect.left + rect.width / 2);
          }}
        >
          {IMAGES.map((img, i) => (
            <CarouselCard
              key={img.id}
              index={i}
              src={img.src}
              alt={img.alt}
              offset={offset}
              total={IMAGES.length}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center gap-3 -mt-8 pb-24">
        {/* Counter */}
        <span
          className="text-sm tabular-nums font-medium tracking-wider"
          style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(24,24,27,0.4)" }}
        >
          <span style={{ color: isDark ? "rgba(255,255,255,0.9)" : "rgba(24,24,27,0.85)" }}>
            {String(centerIdx + 1).padStart(2, "0")}
          </span>
          <span className="mx-1.5" style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(24,24,27,0.2)" }}>/</span>
          {String(IMAGES.length).padStart(2, "0")}
        </span>

        {/* Progress bar */}
        <div
          className="relative h-0.5 w-48 overflow-hidden rounded-full"
          style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(24,24,27,0.1)" }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${((centerIdx + 1) / IMAGES.length) * 100}%`,
              background: isDark
                ? "linear-gradient(to right, #A78BFA, #C9A84C)"
                : "linear-gradient(to right, #7C3AED, #EC4899)",
            }}
          />
        </div>

        {/* Dot pagination — grouped, showing 9 dots around current */}
        <div className="flex items-center gap-1 mt-1">
          {IMAGES.map((_, i) => {
            const dist = Math.abs(i - centerIdx);
            if (dist > 4) return null;
            const size = i === centerIdx ? 8 : dist <= 1 ? 6 : 4;
            const opacity = i === centerIdx ? 1 : dist <= 1 ? 0.5 : 0.2;
            return (
              <button
                key={i}
                className="shrink-0 rounded-full transition-all duration-300"
                style={{
                  width: size,
                  height: size,
                  opacity,
                  background: i === centerIdx
                    ? isDark
                      ? "linear-gradient(135deg, #A78BFA, #C9A84C)"
                      : "linear-gradient(135deg, #7C3AED, #EC4899)"
                    : isDark
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(24,24,27,0.35)",
                }}
                onClick={() => snapTo(i)}
                aria-label={`Go to photo ${i + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Individual card (optimized: lazy image + early bail) ──────────────────
function CarouselCard({
  index,
  src,
  alt,
  offset,
  total,
}: {
  index: number;
  src: string;
  alt: string;
  offset: ReturnType<typeof useSpring>;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isNearby, setIsNearby] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const unsub = offset.on("change", (val) => {
      // ── Optimization 2: compute distance first, bail early ──
      const normalized = (index * CARD_GAP + val) / CARD_GAP;
      const dist = Math.abs(normalized);
      const cutoff = VISIBLE_RANGE + 1.5;

      if (dist > cutoff) {
        el.style.visibility = "hidden";
        return;
      }

      el.style.visibility = "visible";

      // ── Optimization 1: load image when within extended range ──
      if (dist <= VISIBLE_RANGE + 3 && !isNearby) {
        setIsNearby(true);
      }

      const rotateY = normalized * -12;
      const translateX = normalized * CARD_GAP;
      const translateZ = -dist * 60;
      const scale = Math.max(0.5, 1 - dist * 0.065);
      const opacity = Math.max(0, 1 - dist * 0.12);

      el.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      el.style.opacity = `${opacity}`;
      el.style.zIndex = `${total - Math.round(dist)}`;
    });

    return unsub;
  }, [index, offset, total, isNearby]);

  return (
    <div
      ref={ref}
      className="absolute rounded-2xl overflow-hidden shadow-2xl"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        visibility: "hidden",
      }}
    >
      {/* Optimization 1: only mount Image when card is nearby */}
      {isNearby ? (
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          className="object-cover pointer-events-none"
          sizes={`${CARD_WIDTH}px`}
          draggable={false}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 30px rgba(0,0,0,0.15)" }}
      />
    </div>
  );
}
