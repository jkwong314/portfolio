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
  const isLarge = size === "large";

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
        {/* ── Image ── */}
        <div className={`${aspectMap[size]} relative w-full flex-shrink-0 overflow-hidden`}>
          <motion.div
            className="absolute inset-[-12px]"
            style={{ x: springImgX, y: springImgY }}
          >
            <Image
              src={study.thumbnail}
              alt={study.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Lighter overlay so thumbnails actually show */}
            <div className="absolute inset-0" style={{ background: gradient, opacity: 0.28 }} />
          </motion.div>

          {/* Category pill */}
          <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-base/50 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-text-secondary backdrop-blur-md">
            {study.category}
          </span>

          {/* Ghost index — bottom right of image, decorative */}
          <span
            className="absolute bottom-3 right-4 font-display text-[5rem] font-black leading-none text-text-primary/[0.04] select-none"
            aria-hidden="true"
          >
            {String(index).padStart(2, "0")}
          </span>

          {/* Hover scrim + arrow */}
          <div className="absolute inset-0 flex items-center justify-center bg-accent/0 transition-all duration-300 group-hover:bg-base/20">
            <motion.div
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-base/50 backdrop-blur-sm"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="text-text-primary -rotate-45">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* ── Card body ── */}
        <div className="flex flex-1 flex-col gap-3 p-5">

          {/* Title + subtitle — primary hierarchy */}
          <div className="space-y-2">
            <h3
              className="font-display font-black leading-tight text-text-primary transition-colors duration-200 group-hover:text-accent-light"
              style={{
                fontSize: isLarge ? "clamp(1.25rem, 2vw, 1.6rem)" : "1.15rem",
                letterSpacing: "-0.025em",
              }}
            >
              {study.title}
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary/80 line-clamp-2">
              {study.subtitle}
            </p>
          </div>

          {/* Meta row — tertiary */}
          <div className="mt-auto flex items-center justify-between border-t border-surface-light pt-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-text-muted">{study.role}</span>
              <span className="text-text-muted/30" aria-hidden="true">·</span>
              <span className="text-xs text-text-muted">{study.year}</span>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              View
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="-rotate-45" aria-hidden="true">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

        {/* Bottom accent bar on hover */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-gold transition-all duration-500 group-hover:w-full" />
      </motion.article>
    </Link>
  );
}
