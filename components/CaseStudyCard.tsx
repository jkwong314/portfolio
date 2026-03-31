"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { CaseStudy } from "@/data/types";
import { useTheme } from "@/components/ThemeProvider";

interface CaseStudyCardProps {
  study: CaseStudy;
  size: "large" | "tall" | "square" | "medium" | "full";
  index?: number;
}

const aspectMap = {
  large: "aspect-[4/3] md:aspect-[16/9]",
  tall: "aspect-[4/3] md:aspect-[3/4]",
  square: "aspect-[4/3] md:aspect-square",
  medium: "aspect-[4/3]",
  full: "aspect-[4/3] md:aspect-[21/8]",
};

// Unique gradient per card — inline CSS so they always resolve regardless of Tailwind purging
const darkGradients = [
  "linear-gradient(135deg, rgba(76,29,149,0.4) 0%, #1C1C1C 50%, rgba(109,40,217,0.2) 100%)",
  "linear-gradient(135deg, rgba(41,37,36,0.6) 0%, #1C1C1C 50%, rgba(120,53,15,0.2) 100%)",
  "linear-gradient(135deg, rgba(30,27,75,0.4) 0%, #1C1C1C 50%, #111111 100%)",
  "linear-gradient(135deg, #111111 0%, #1C1C1C 100%)",
  "linear-gradient(135deg, rgba(39,39,42,0.4) 0%, #1C1C1C 50%, rgba(76,29,149,0.2) 100%)",
];
const lightGradients = [
  "linear-gradient(135deg, rgba(139,92,246,0.28) 0%, rgba(255,255,255,0.9) 55%, rgba(0,210,255,0.22) 100%)",
  "linear-gradient(135deg, rgba(255,45,120,0.26) 0%, rgba(255,255,255,0.9) 55%, rgba(255,100,40,0.22) 100%)",
  "linear-gradient(135deg, rgba(59,130,246,0.26) 0%, rgba(255,255,255,0.9) 55%, rgba(139,92,246,0.22) 100%)",
  "linear-gradient(135deg, rgba(16,185,129,0.22) 0%, rgba(255,255,255,0.92) 55%, rgba(0,210,255,0.18) 100%)",
  "linear-gradient(135deg, rgba(251,191,36,0.26) 0%, rgba(255,255,255,0.9) 55%, rgba(236,72,153,0.22) 100%)",
];

export default function CaseStudyCard({ study, size, index = 1 }: CaseStudyCardProps) {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const imgX = useMotionValue(0);
  const imgY = useMotionValue(0);
  const springImgX = useSpring(imgX, { stiffness: 150, damping: 30 });
  const springImgY = useSpring(imgY, { stiffness: 150, damping: 30 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (rafRef.current !== null) return;
      const cx = e.clientX;
      const cy = e.clientY;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        imgX.set(-(cx - (rect.left + rect.width / 2)) * 0.018);
        imgY.set(-(cy - (rect.top + rect.height / 2)) * 0.018);
      });
    },
    [imgX, imgY]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    imgX.set(0);
    imgY.set(0);
  }, [imgX, imgY]);

  const gradients = theme === "dark" ? darkGradients : lightGradients;
  const gradient = gradients[(index - 1) % gradients.length];

  return (
    <Link href={`/work/${study.slug}`} className="block h-full">
      <motion.article
        ref={cardRef}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-surface"
        data-cursor="view"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image area */}
        <div className={`${aspectMap[size]} relative w-full flex-shrink-0 overflow-hidden`}>
          <motion.div
            className="absolute inset-[-12px]"
            style={{ x: springImgX, y: springImgY }}
          >
            <Image
              src={study.thumbnail}
              alt={study.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0" style={{ background: gradient, opacity: 0.6 }} />
          </motion.div>

          {/* Index number — editorial touch */}
          <span
            className="absolute bottom-4 right-4 font-display text-6xl font-black leading-none text-text-primary/5"
            aria-hidden="true"
          >
            {String(index).padStart(2, "0")}
          </span>

          {/* Category tag */}
          <span className="absolute left-4 top-4 rounded-sm bg-base/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-text-secondary backdrop-blur-sm">
            {study.category}
          </span>

          {/* Hover overlay with arrow */}
          <div className="absolute inset-0 flex items-center justify-center bg-accent/0 transition-all duration-300 group-hover:bg-accent/8">
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-full border border-text-primary/20 bg-base/40 backdrop-blur-sm"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-primary rotate-45">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Card info */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-text-primary transition-colors group-hover:text-accent-light" style={{ letterSpacing: "-0.02em" }}>
              {study.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-text-secondary line-clamp-2">
              {study.subtitle}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-text-muted">{study.year}</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-gold">
              View Case Study →
            </span>
          </div>
        </div>

        {/* Bottom border accent on hover */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-gold transition-all duration-500 group-hover:w-full" />
      </motion.article>
    </Link>
  );
}
