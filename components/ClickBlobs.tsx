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

// pink, purple, blue, teal, yellow
const DARK_GRADIENTS = [
  "radial-gradient(circle, rgba(236,72,153,0.88) 0%, rgba(236,72,153,0.42) 18%, rgba(236,72,153,0.1) 40%, transparent 75%)",  // pink
  "radial-gradient(circle, rgba(124,58,237,0.85) 0%, rgba(124,58,237,0.38) 18%, rgba(124,58,237,0.09) 40%, transparent 75%)", // purple
  "radial-gradient(circle, rgba(59,130,246,0.85) 0%, rgba(59,130,246,0.4) 18%, rgba(59,130,246,0.1) 40%, transparent 75%)",   // blue
  "radial-gradient(circle, rgba(20,184,166,0.85) 0%, rgba(20,184,166,0.38) 18%, rgba(20,184,166,0.09) 40%, transparent 75%)", // teal
  "radial-gradient(circle, rgba(251,191,36,0.85) 0%, rgba(251,191,36,0.4) 18%, rgba(251,191,36,0.1) 40%, transparent 75%)",   // yellow
];

// Light mode — pink, purple, blue, teal, yellow
const LIGHT_GRADIENTS = [
  "radial-gradient(circle, rgba(255,80,160,0.55) 0%, rgba(255,120,190,0.28) 20%, rgba(255,170,215,0.08) 45%, transparent 75%)",  // pink
  "radial-gradient(circle, rgba(160,100,255,0.55) 0%, rgba(190,145,255,0.28) 20%, rgba(215,185,255,0.08) 45%, transparent 75%)", // purple
  "radial-gradient(circle, rgba(80,140,255,0.55) 0%, rgba(120,175,255,0.28) 20%, rgba(165,205,255,0.08) 45%, transparent 75%)",  // blue
  "radial-gradient(circle, rgba(0,210,190,0.5) 0%, rgba(60,225,210,0.25) 20%, rgba(120,240,225,0.07) 45%, transparent 75%)",    // teal
  "radial-gradient(circle, rgba(255,200,30,0.55) 0%, rgba(255,218,100,0.28) 20%, rgba(255,232,155,0.08) 45%, transparent 75%)", // yellow
];

let counter = 0;
const MAX_BLOBS = 8;
const BLOB_LIFETIME = 800;
const TRAIL_SPACING = 40;

// Ambient blob config
const AMBIENT_SIZES = [120, 200, 480];
const AMBIENT_LIFETIME = 3000;
const AMBIENT_INTERVAL_MIN = 1600;
const AMBIENT_INTERVAL_MAX = 3200;

interface Props {
  boundaryRef: React.RefObject<HTMLElement | null>;
}

export default function ClickBlobs({ boundaryRef }: Props) {
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [ambientBlobs, setAmbientBlobs] = useState<Blob[]>([]);
  const [isPointer, setIsPointer] = useState(false);
  const { theme } = useTheme();
  const isDown = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const accumulated = useRef(0);
  const ambientGradIdx = useRef(0);
  const ambientSizeIdx = useRef(0);

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

  // Ambient blobs — auto-spawn at random positions in the hero section
  useEffect(() => {
    const pool = theme === "dark" ? DARK_GRADIENTS : LIGHT_GRADIENTS;
    let timerId: ReturnType<typeof setTimeout>;

    const spawn = () => {
      const el = boundaryRef.current;
      if (el) {
        const xPct = 5 + Math.random() * 90;
        const yPct = 5 + Math.random() * 90;
        const gradient = pool[ambientGradIdx.current % pool.length];
        const size = AMBIENT_SIZES[ambientSizeIdx.current % AMBIENT_SIZES.length];
        ambientGradIdx.current += 1;
        ambientSizeIdx.current += 1;
        const id = counter++;

        setAmbientBlobs((prev) => [...prev, { id, x: xPct, y: yPct, gradient, size }]);
        setTimeout(() => setAmbientBlobs((prev) => prev.filter((b) => b.id !== id)), AMBIENT_LIFETIME);
      }
      const delay = AMBIENT_INTERVAL_MIN + Math.random() * (AMBIENT_INTERVAL_MAX - AMBIENT_INTERVAL_MIN);
      timerId = setTimeout(spawn, delay);
    };

    const initialDelay = AMBIENT_INTERVAL_MIN + Math.random() * (AMBIENT_INTERVAL_MAX - AMBIENT_INTERVAL_MIN);
    timerId = setTimeout(spawn, initialDelay);
    return () => clearTimeout(timerId);
  }, [boundaryRef, theme]);

  if (!isPointer) return null;

  return (
    <>
    {/* Ambient blobs — absolute within hero section */}
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {ambientBlobs.map((blob) => (
          <motion.div
            key={blob.id}
            className="absolute rounded-full"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: blob.size,
              height: blob.size,
              marginLeft: -blob.size / 2,
              marginTop: -blob.size / 2,
              background: blob.gradient,
              mixBlendMode: "screen",
              willChange: "opacity",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.85, scale: 1, transition: { duration: 0.9, ease: "easeOut" } }}
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.7, ease: "easeIn" } }}
          />
        ))}
      </AnimatePresence>
    </div>

    {/* Click blobs — fixed, viewport-relative */}
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
              mixBlendMode: "screen",
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
    </>
  );
}
