"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import Image from "next/image";

// ── 20 placeholder images (portrait ratio) ────────────────────────────────
const IMAGES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  src: `https://picsum.photos/seed/album${i + 1}/480/640`,
  alt: `Photo ${i + 1}`,
}));

const CARD_WIDTH = 320;
const CARD_HEIGHT = 440;
const CARD_GAP = 72;        // overlap spacing
const VISIBLE_RANGE = 5;    // cards visible on each side

export default function AlbumPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);

  // The raw offset in px — represents how far the strip has scrolled
  const rawOffset = useMotionValue(0);
  const offset = useSpring(rawOffset, { stiffness: 300, damping: 40 });

  // Track current center index for keyboard nav
  const [centerIdx, setCenterIdx] = useState(0);

  // Convert offset → center index
  const getCenter = useCallback(
    (off: number) => Math.round(-off / CARD_GAP),
    []
  );

  // Snap to nearest card
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
      // Clamp so we can't scroll past the edges (with some rubber-band)
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

  // ── Keyboard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") snapTo(centerIdx - 1);
      if (e.key === "ArrowRight") snapTo(centerIdx + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [centerIdx, snapTo]);

  // ── Wheel ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = rawOffset.get() - e.deltaX - e.deltaY * 0.5;
      const min = -(IMAGES.length - 1) * CARD_GAP;
      rawOffset.set(Math.max(min - 100, Math.min(100, next)));
      // Debounced snap
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
    <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
      {/* Header spacer for nav */}
      <div className="pt-32 pb-4 text-center">
        <h1
          className="font-display font-black text-white/90 leading-none"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em" }}
        >
          Album
        </h1>
        <p className="mt-3 text-sm text-white/40 tracking-wide">
          Drag or use arrow keys to browse
        </p>
      </div>

      {/* Carousel viewport */}
      <div
        ref={containerRef}
        className="relative flex flex-1 cursor-grab items-center justify-center overflow-hidden active:cursor-grabbing select-none"
        style={{ perspective: "1200px" }}
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

  // Subscribe to offset changes and update transforms imperatively for perf
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const unsub = offset.on("change", (val) => {
      const pos = index * CARD_GAP + val; // px from center
      const normalized = pos / CARD_GAP;  // card-units from center

      // Distance from center (0 = center)
      const dist = Math.abs(normalized);

      // Only render cards within visible range
      if (dist > VISIBLE_RANGE + 1.5) {
        el.style.visibility = "hidden";
        return;
      }
      el.style.visibility = "visible";

      // Transform calculations
      const rotateY = normalized * -12;                          // max ~60° at edges
      const translateX = normalized * CARD_GAP;                  // horizontal spread
      const translateZ = -dist * 60;                             // push sides back
      const scale = 1 - dist * 0.065;                           // shrink at edges
      const opacity = Math.max(0, 1 - dist * 0.12);             // dim at edges

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
      {/* Subtle edge vignette on cards */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.15)",
        }}
      />
    </div>
  );
}
