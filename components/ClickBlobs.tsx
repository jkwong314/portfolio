"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

interface Blob {
  id: number;
  x: number;
  y: number;
  gradient: string;
  size: number;
}

const DARK_GRADIENTS = [
  "radial-gradient(circle, rgba(0,185,178,0.85) 0%, rgba(0,185,178,0.5) 25%, rgba(0,185,178,0.18) 55%, rgba(0,185,178,0.04) 75%, transparent 90%)",
  "radial-gradient(circle, rgba(168,204,0,0.82) 0%, rgba(168,204,0,0.46) 25%, rgba(168,204,0,0.16) 55%, rgba(168,204,0,0.03) 75%, transparent 90%)",
  "radial-gradient(circle, rgba(249,115,22,0.85) 0%, rgba(249,115,22,0.5) 25%, rgba(249,115,22,0.18) 55%, rgba(249,115,22,0.04) 75%, transparent 90%)",
  "radial-gradient(circle, rgba(236,72,153,0.88) 0%, rgba(236,72,153,0.52) 25%, rgba(236,72,153,0.18) 55%, rgba(236,72,153,0.04) 75%, transparent 90%)",
  "radial-gradient(circle, rgba(124,58,237,0.85) 0%, rgba(124,58,237,0.48) 25%, rgba(124,58,237,0.16) 55%, rgba(124,58,237,0.03) 75%, transparent 90%)",
  "radial-gradient(circle, rgba(6,182,212,0.85) 0%, rgba(6,182,212,0.5) 25%, rgba(6,182,212,0.18) 55%, rgba(6,182,212,0.04) 75%, transparent 90%)",
  "radial-gradient(circle, rgba(201,168,76,0.88) 0%, rgba(201,168,76,0.52) 25%, rgba(201,168,76,0.18) 55%, rgba(201,168,76,0.04) 75%, transparent 90%)",
  "radial-gradient(circle, rgba(239,68,68,0.82) 0%, rgba(239,68,68,0.46) 25%, rgba(239,68,68,0.15) 55%, rgba(239,68,68,0.03) 75%, transparent 90%)",
  "radial-gradient(circle, rgba(34,197,94,0.8) 0%, rgba(34,197,94,0.44) 25%, rgba(34,197,94,0.14) 55%, rgba(34,197,94,0.03) 75%, transparent 90%)",
  "radial-gradient(circle, rgba(99,102,241,0.85) 0%, rgba(99,102,241,0.48) 25%, rgba(99,102,241,0.16) 55%, rgba(99,102,241,0.03) 75%, transparent 90%)",
  "radial-gradient(circle, rgba(251,191,36,0.85) 0%, rgba(251,191,36,0.5) 25%, rgba(251,191,36,0.17) 55%, rgba(251,191,36,0.04) 75%, transparent 90%)",
  "radial-gradient(circle, rgba(20,184,166,0.85) 0%, rgba(20,184,166,0.48) 25%, rgba(20,184,166,0.16) 55%, rgba(20,184,166,0.03) 75%, transparent 90%)",
];

// Light mode: vivid saturated colors + multiply blend so overlaps stay rich, not muddy
const LIGHT_GRADIENTS = [
  "radial-gradient(circle, rgba(255,45,120,0.72) 0%, rgba(255,45,120,0.38) 30%, rgba(255,45,120,0.1) 60%, transparent 85%)",
  "radial-gradient(circle, rgba(59,130,246,0.72) 0%, rgba(59,130,246,0.38) 30%, rgba(59,130,246,0.1) 60%, transparent 85%)",
  "radial-gradient(circle, rgba(0,210,255,0.68) 0%, rgba(0,210,255,0.34) 30%, rgba(0,210,255,0.09) 60%, transparent 85%)",
  "radial-gradient(circle, rgba(139,92,246,0.72) 0%, rgba(139,92,246,0.38) 30%, rgba(139,92,246,0.1) 60%, transparent 85%)",
  "radial-gradient(circle, rgba(255,100,40,0.72) 0%, rgba(255,100,40,0.38) 30%, rgba(255,100,40,0.1) 60%, transparent 85%)",
  "radial-gradient(circle, rgba(163,230,53,0.65) 0%, rgba(163,230,53,0.32) 30%, rgba(163,230,53,0.08) 60%, transparent 85%)",
  "radial-gradient(circle, rgba(251,191,36,0.72) 0%, rgba(251,191,36,0.38) 30%, rgba(251,191,36,0.1) 60%, transparent 85%)",
  "radial-gradient(circle, rgba(236,72,153,0.72) 0%, rgba(236,72,153,0.38) 30%, rgba(236,72,153,0.1) 60%, transparent 85%)",
  "radial-gradient(circle, rgba(16,185,129,0.65) 0%, rgba(16,185,129,0.32) 30%, rgba(16,185,129,0.08) 60%, transparent 85%)",
  "radial-gradient(circle, rgba(99,102,241,0.72) 0%, rgba(99,102,241,0.38) 30%, rgba(99,102,241,0.1) 60%, transparent 85%)",
  "radial-gradient(circle, rgba(245,158,11,0.72) 0%, rgba(245,158,11,0.38) 30%, rgba(245,158,11,0.1) 60%, transparent 85%)",
  "radial-gradient(circle, rgba(20,184,166,0.65) 0%, rgba(20,184,166,0.32) 30%, rgba(20,184,166,0.08) 60%, transparent 85%)",
];

let counter = 0;
const MAX_BLOBS = 8;
const BLOB_LIFETIME = 800;
const TRAIL_SPACING = 40;

interface Props {
  boundaryRef: React.RefObject<HTMLElement | null>;
}

export default function ClickBlobs({ boundaryRef }: Props) {
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [isPointer, setIsPointer] = useState(false);
  const { theme } = useTheme();
  const isDown = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const accumulated = useRef(0);

  useEffect(() => {
    setIsPointer(window.matchMedia("(pointer: fine)").matches);
  }, []);


  const isInBounds = useCallback((x: number, y: number) => {
    const el = boundaryRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }, [boundaryRef]);

  const spawnBlob = useCallback((x: number, y: number, sizeMult = 1) => {
    const pool = theme === "dark" ? DARK_GRADIENTS : LIGHT_GRADIENTS;
    const gradient = pool[Math.floor(Math.random() * pool.length)];
    const size = (120 + Math.random() * 100) * sizeMult;
    const blur = 0;
    const id = counter++;

    setBlobs((prev) => {
      const next = [...prev, { id, x, y, gradient, size }];
      return next.length > MAX_BLOBS ? next.slice(next.length - MAX_BLOBS) : next;
    });

    setTimeout(() => {
      setBlobs((prev) => prev.filter((b) => b.id !== id));
    }, BLOB_LIFETIME);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onDown = (e: MouseEvent) => {
      if (!isInBounds(e.clientX, e.clientY)) return;
      isDown.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
      accumulated.current = 0;
      spawnBlob(e.clientX, e.clientY);
    };

    const onMove = (e: MouseEvent) => {
      if (!isDown.current) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      accumulated.current += dist;

      while (accumulated.current >= TRAIL_SPACING) {
        accumulated.current -= TRAIL_SPACING;
        spawnBlob(e.clientX, e.clientY, 0.7);
      }

      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const onUp = () => {
      isDown.current = false;
      accumulated.current = 0;
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [spawnBlob, isInBounds]);

  if (!isPointer) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {blobs.map((blob) => (
          <motion.div
            key={blob.id}
            className="absolute rounded-full"
            style={{
              left: blob.x,
              top: blob.y,
              width: blob.size,
              height: blob.size,
              marginLeft: -blob.size / 2,
              marginTop: -blob.size / 2,
              background: blob.gradient,
              mixBlendMode: theme === "dark" ? "screen" : "multiply",
              willChange: "opacity",
            }}
            variants={{
              enter: {
                opacity: 1,
                scale: 1,
                transition: {
                  opacity: { duration: 0.35, ease: "easeOut" },
                  scale: { type: "spring", stiffness: 160, damping: 20 },
                },
              },
              exit: {
                opacity: 0,
                scale: 1.1,
                transition: {
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate="enter"
            exit="exit"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
