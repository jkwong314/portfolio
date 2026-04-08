"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useMotionValue, useSpring, animate } from "framer-motion";
import Image from "next/image";

// ── 50 placeholder images (portrait ratio) ────────────────────────────────
const IMAGES = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  src: `https://picsum.photos/seed/album${i + 1}/480/640`,
  alt: `Photo ${i + 1}`,
}));

const CARD_WIDTH = 320;
const CARD_HEIGHT = 440;
const CARD_GAP = 72;
const VISIBLE_RANGE = 5;

export default function AlbumPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);

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
      setCenterIdx(0);
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
      setCenterIdx(clamped);
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
    <div className="relative flex flex-col bg-[#0a0a0a]" style={{ minHeight: "100vh" }}>
      {/* Glow edges — purple → pink gradient on both sides */}
      <div
        className="pointer-events-none fixed top-0 left-0 h-full z-20"
        style={{
          width: "clamp(160px, 22vw, 400px)",
          background:
            "radial-gradient(ellipse 100% 45% at 0% 30%, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0.1) 50%, transparent 85%), " +
            "radial-gradient(ellipse 100% 45% at 0% 70%, rgba(236,72,153,0.28) 0%, rgba(236,72,153,0.08) 50%, transparent 85%)",
        }}
      />
      <div
        className="pointer-events-none fixed top-0 right-0 h-full z-20"
        style={{
          width: "clamp(160px, 22vw, 400px)",
          background:
            "radial-gradient(ellipse 100% 45% at 100% 30%, rgba(236,72,153,0.35) 0%, rgba(236,72,153,0.1) 50%, transparent 85%), " +
            "radial-gradient(ellipse 100% 45% at 100% 70%, rgba(124,58,237,0.28) 0%, rgba(124,58,237,0.08) 50%, transparent 85%)",
        }}
      />

      {/* Title */}
      <div className="pt-52 pb-2 text-center">
        <h1
          className="font-display font-black text-white/90 leading-tight"
          style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", letterSpacing: "-0.04em" }}
        >
          A life in frames
        </h1>
        <p className="mt-2 text-sm text-white/35 tracking-wide">
          Drag or use arrow keys to browse
        </p>
      </div>

      {/* Carousel viewport */}
      <div
        ref={containerRef}
        className="relative cursor-grab items-center justify-center overflow-hidden active:cursor-grabbing select-none flex"
        style={{ perspective: "1200px", height: "clamp(480px, 60vh, 640px)" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
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

      {/* Pagination */}
      <div className="flex flex-col items-center gap-3 py-6">
        {/* Counter */}
        <span className="text-sm tabular-nums text-white/50 font-medium tracking-wider">
          <span className="text-white/90">{String(centerIdx + 1).padStart(2, "0")}</span>
          <span className="mx-1.5 text-white/25">/</span>
          {String(IMAGES.length).padStart(2, "0")}
        </span>

        {/* Progress bar */}
        <div className="relative h-0.5 w-48 overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${((centerIdx + 1) / IMAGES.length) * 100}%`,
              background: "linear-gradient(to right, #A78BFA, #C9A84C)",
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
                    ? "linear-gradient(135deg, #A78BFA, #C9A84C)"
                    : "rgba(255,255,255,0.6)",
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

// ── Individual card ────────────────────────────────────────────────────────
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const unsub = offset.on("change", (val) => {
      const pos = index * CARD_GAP + val;
      const normalized = pos / CARD_GAP;
      const dist = Math.abs(normalized);

      if (dist > VISIBLE_RANGE + 1.5) {
        el.style.visibility = "hidden";
        return;
      }
      el.style.visibility = "visible";

      const rotateY = normalized * -12;
      const translateX = normalized * CARD_GAP;
      const translateZ = -dist * 60;
      const scale = 1 - dist * 0.065;
      const opacity = Math.max(0, 1 - dist * 0.12);

      el.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${Math.max(0.5, scale)})`;
      el.style.opacity = `${opacity}`;
      el.style.zIndex = `${total - Math.round(dist)}`;
    });

    return unsub;
  }, [index, offset, total]);

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
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover pointer-events-none"
        sizes={`${CARD_WIDTH}px`}
        draggable={false}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 30px rgba(0,0,0,0.15)" }}
      />
    </div>
  );
}
