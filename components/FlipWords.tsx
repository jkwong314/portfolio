"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface FlipWordsProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function FlipWords({
  words,
  interval = 3000,
  className = "",
}: FlipWordsProps) {
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLSpanElement>(null);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % words.length);
  }, [words.length]);

  useEffect(() => {
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [next, interval]);

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap ${className}`}
      style={{ minWidth: "2ch" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={
            prefersReduced
              ? { opacity: 1 }
              : { opacity: 0, y: 12, filter: "blur(6px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={
            prefersReduced
              ? { opacity: 0 }
              : { opacity: 0, y: -12, filter: "blur(6px)" }
          }
          transition={{
            duration: prefersReduced ? 0 : 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block bg-gradient-to-r from-accent-light via-gold to-accent bg-clip-text text-transparent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
