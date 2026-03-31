"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import ClickBlobs from "@/components/ClickBlobs";
import { useTheme } from "@/components/ThemeProvider";

const STATEMENT = {
  text: "Design that moves people forward.",
  accentLine1: "Crafted with intention,",
  accentLine2: "one click at a time.",
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const shouldReduceMotion = useReducedMotion();

  const gradient = isDark
    ? "linear-gradient(135deg, #A78BFA 0%, #C9A84C 100%)"
    : "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)";

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[75vh] flex-col justify-center px-6 py-20 md:min-h-screen md:px-12 md:py-32"
    >
      <ClickBlobs boundaryRef={sectionRef} />

      {/* ── Dot grid texture ── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 40%, transparent 25%, black 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 40%, transparent 25%, black 75%)",
          opacity: isDark ? 0.35 : 0.5,
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">

        {/* ── SECONDARY: frosted credential chip + role + company ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2.5"
        >
          {/* Name chip with live availability pulse */}
          <div
            className="flex items-center gap-2 rounded-full border border-text-muted/40 bg-surface px-3.5 py-1.5"
            aria-label="Jamie — available"
          >
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-text-primary">
              Jamie
            </span>
          </div>

          <span className="h-4 w-px bg-surface-light" aria-hidden="true" />

          <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
            Product Designer
          </span>

          <span className="text-text-muted" aria-hidden="true">·</span>

          <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
            ALDO Group
          </span>
        </motion.div>

        {/* ── PRIMARY: statement ── */}
        <div className="mb-12">
          <motion.h1
            className="font-display font-black leading-[1.08]"
            style={{ letterSpacing: "-0.035em" }}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="block text-text-primary font-light"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", marginBottom: "1.25rem" }}
            >
              {STATEMENT.text}
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: gradient,
                fontSize: "clamp(3.5rem, 7.5vw, 6.5rem)",
                lineHeight: 1.05,
              }}
            >
              {STATEMENT.accentLine1}
              <br />
              {STATEMENT.accentLine2}
            </motion.span>
          </motion.h1>
        </div>

        {/* ── CTAs ── */}
        <motion.div
          className="flex items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <Link
            href="/#work"
            className="group flex items-center gap-3 rounded-sm text-sm uppercase tracking-[0.2em] text-text-primary transition-colors hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            <span>View Work</span>
            <span
              className="block h-px w-8 bg-current transition-all duration-300 group-hover:w-16"
              aria-hidden="true"
            />
          </Link>
          <span className="h-4 w-px bg-surface-light" aria-hidden="true" />
          <Link
            href="/about"
            className="rounded-sm text-sm uppercase tracking-[0.2em] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            About Me
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator — aria-hidden, purely decorative */}
      <motion.div
        className="absolute bottom-8 right-6 flex flex-col items-center gap-3 md:right-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-hidden="true"
      >
        <span
          className="text-[10px] uppercase tracking-[0.3em] text-text-secondary"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <motion.div
          className="h-12 w-px bg-gradient-to-b from-accent to-transparent"
          animate={shouldReduceMotion ? {} : { scaleY: [1, 0, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
