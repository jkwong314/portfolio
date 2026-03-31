"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { caseStudies } from "@/data/caseStudies";
import CaseStudyStepper from "@/components/CaseStudyStepper";

const SILHOUETTE_STEPS = [
  { id: "the-problem", label: "The Problem" },
  { id: "the-solution", label: "The Solution" },
  { id: "stress-test", label: "Stress Test" },
  { id: "manual-vs-headless", label: "Manual vs. Headless" },
  { id: "engineering-impact", label: "Engineering Impact" },
  { id: "key-takeaways", label: "Key Takeaways" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32, filter: "blur(4px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 32, filter: "blur(4px)" }
      }
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="font-mono text-xs text-text-muted">{number}</span>
      <span className="h-px w-8 bg-surface-light" aria-hidden="true" />
      <span className="text-[10px] uppercase tracking-[0.28em] text-gold">
        {label}
      </span>
    </div>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, to]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function BarComparison({
  metric,
  before,
  after,
  reduction,
  index,
  isDark,
}: {
  metric: string;
  before: { label: string; value: number; display: string };
  after: { label: string; value: number; display: string };
  reduction: string;
  index: number;
  isDark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const afterPct = `${((after.value / before.value) * 100).toFixed(1)}%`;

  return (
    <div
      ref={ref}
      className="grid items-center gap-6 md:grid-cols-[180px_1fr_90px]"
    >
      <div>
        <span className="mb-1 block text-[10px] uppercase tracking-[0.15em] text-text-muted">
          Metric
        </span>
        <span className="font-display text-base font-bold text-text-primary">
          {metric}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs text-text-muted">{before.label}</span>
            <span className="font-mono text-xs text-text-secondary">
              {before.display}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-light">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-red-500/50 to-orange-400/50"
              initial={{ width: 0 }}
              animate={inView ? { width: "100%" } : { width: 0 }}
              transition={{
                duration: 1.1,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs text-text-muted">{after.label}</span>
            <span className="font-mono text-xs text-text-secondary">
              {after.display}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-light">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: isDark
                  ? "linear-gradient(90deg, #7C3AED, #C9A84C)"
                  : "linear-gradient(90deg, #7C3AED, #EC4899)",
              }}
              initial={{ width: 0 }}
              animate={inView ? { width: afterPct } : { width: 0 }}
              transition={{
                duration: 1.1,
                delay: index * 0.08 + 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>
      </div>

      <div className="text-center md:text-right">
        <span className="font-display text-2xl font-black text-accent block leading-none">
          −{reduction}
        </span>
        <span className="mt-1 block text-[10px] uppercase tracking-[0.12em] text-text-muted">
          reduction
        </span>
      </div>
    </div>
  );
}

// ── Brand Tokens Showcase ─────────────────────────────────────────────────────

interface BrandToken {
  id: string;
  name: string;
  tagline: string;
  founded: string;
  colors: { hex: string; label: string }[];
  primaryColor: string;
  primaryText: string;
  accentColor: string;
  accentText: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  buttonRadius: string;
  cardRadius: string;
  fontFamily: string;
  fontName: string;
  buttonLabel: string;
  badgeLabel: string;
  dark: boolean;
}

const BRANDS: BrandToken[] = [
  {
    id: "aldo",
    name: "Aldo",
    tagline: "Purple · Premium · Precision",
    founded: "Original brand",
    colors: [
      { hex: "#3300AD", label: "Primary" },
      { hex: "#ffb8e4", label: "Branded" },
      { hex: "#f2efff", label: "Surface" },
      { hex: "#e3dcff", label: "Highlight" },
    ],
    primaryColor: "#3300AD",
    primaryText: "#ffffff",
    accentColor: "#ffb8e4",
    accentText: "#3300AD",
    cardBg: "#f2efff",
    textPrimary: "#0d0028",
    textSecondary: "#5b4a8a",
    buttonRadius: "9999px",
    cardRadius: "5px",
    fontFamily: "'Jost', system-ui, sans-serif",
    fontName: "Jost",
    buttonLabel: "Shop Now",
    badgeLabel: "New Season",
    dark: false,
  },
  {
    id: "cis",
    name: "Call It Spring",
    tagline: "Sharp · Minimal · Electric",
    founded: "Original brand",
    colors: [
      { hex: "#000000", label: "Primary" },
      { hex: "#daeb54", label: "Accent" },
      { hex: "#cedeff", label: "Custom" },
      { hex: "#f5f5f5", label: "Surface" },
    ],
    primaryColor: "#000000",
    primaryText: "#ffffff",
    accentColor: "#daeb54",
    accentText: "#000000",
    cardBg: "#ffffff",
    textPrimary: "#000000",
    textSecondary: "#555555",
    buttonRadius: "0px",
    cardRadius: "0px",
    fontFamily: "'Roboto', system-ui, sans-serif",
    fontName: "Roboto Flex",
    buttonLabel: "Shop Now",
    badgeLabel: "Trending",
    dark: false,
  },
  {
    id: "sperry",
    name: "Sperry",
    tagline: "Heritage · Maritime · Gold",
    founded: "Original brand",
    colors: [
      { hex: "#8f6300", label: "Primary" },
      { hex: "#071c2c", label: "Navy" },
      { hex: "#ffd3a6", label: "Custom" },
      { hex: "#1e3a50", label: "Surface" },
    ],
    primaryColor: "#8f6300",
    primaryText: "#ffffff",
    accentColor: "#ffd3a6",
    accentText: "#5c3d00",
    cardBg: "#071c2c",
    textPrimary: "#f5e6c8",
    textSecondary: "#a89270",
    buttonRadius: "9999px",
    cardRadius: "9999px",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontName: "Self Modern",
    buttonLabel: "Explore",
    badgeLabel: "Heritage",
    dark: true,
  },
  {
    id: "ghbass",
    name: "GH Bass",
    tagline: "Rugged · Earthy · American",
    founded: "Acquired 2025",
    colors: [
      { hex: "#c34d00", label: "Primary" },
      { hex: "#bbcbca", label: "Sage" },
      { hex: "#f5f0eb", label: "Warm BG" },
      { hex: "#ede5dc", label: "Surface" },
    ],
    primaryColor: "#c34d00",
    primaryText: "#ffffff",
    accentColor: "#bbcbca",
    accentText: "#2a2a2a",
    cardBg: "#f5f0eb",
    textPrimary: "#1a1a1a",
    textSecondary: "#5a4a3a",
    buttonRadius: "9999px",
    cardRadius: "9999px",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontName: "Besley",
    buttonLabel: "Discover",
    badgeLabel: "New Addition",
    dark: false,
  },
];

function BrandTokenCard({ brand, index }: { brand: BrandToken; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, rotate: index % 2 === 0 ? -0.8 : 0.8 }}
      animate={
        inView
          ? { opacity: 1, y: 0, rotate: 0 }
          : { opacity: 0, y: 48, rotate: index % 2 === 0 ? -0.8 : 0.8 }
      }
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden shadow-md"
      style={{
        backgroundColor: brand.cardBg,
        borderRadius: brand.cardRadius === "0px" ? "4px" : "16px",
      }}
    >
      {/* Primary colour top band */}
      <div className="h-1.5 w-full" style={{ backgroundColor: brand.primaryColor }} />

      <div className="p-6">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3
              className="leading-none truncate"
              style={{
                fontFamily: brand.fontFamily,
                color: brand.textPrimary,
                fontSize: "1.35rem",
                fontWeight: 800,
                letterSpacing: brand.buttonRadius === "0px" ? "0.02em" : "-0.02em",
              }}
            >
              {brand.name}
            </h3>
            <p
              className="mt-1.5 text-[8.5px] uppercase tracking-[0.18em]"
              style={{ color: brand.textSecondary, opacity: 0.7 }}
            >
              {brand.tagline}
            </p>
          </div>
          <span
            className="shrink-0 text-[7.5px] uppercase tracking-widest px-2 py-1 opacity-55 whitespace-nowrap"
            style={{
              color: brand.textSecondary,
              border: `1px solid ${brand.dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
              borderRadius: brand.buttonRadius === "0px" ? "0px" : "4px",
            }}
          >
            {brand.founded}
          </span>
        </div>

        {/* Colour tokens */}
        <div className="mb-5">
          <p
            className="mb-2.5 text-[8px] uppercase tracking-[0.22em]"
            style={{ color: brand.textSecondary, opacity: 0.5 }}
          >
            Colour Tokens
          </p>
          <div className="flex items-end gap-3">
            {brand.colors.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  style={{
                    backgroundColor: c.hex,
                    width: i === 0 ? "28px" : i === 1 ? "24px" : "20px",
                    height: i === 0 ? "28px" : i === 1 ? "24px" : "20px",
                    borderRadius: brand.buttonRadius === "0px" ? "2px" : "50%",
                    border:
                      brand.dark && (c.hex === "#1e3a50" || c.hex === "#071c2c")
                        ? "1px solid rgba(255,255,255,0.15)"
                        : !brand.dark &&
                          (c.hex === "#f2efff" ||
                            c.hex === "#f5f5f5" ||
                            c.hex === "#f5f0eb" ||
                            c.hex === "#ede5dc")
                        ? "1px solid rgba(0,0,0,0.08)"
                        : "none",
                  }}
                />
                <span
                  className="text-[6.5px] uppercase tracking-wide"
                  style={{ color: brand.textSecondary, opacity: 0.4 }}
                >
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Typography specimen */}
        <div
          className="mb-5 px-4 pt-3 pb-4"
          style={{
            backgroundColor: brand.dark ? "rgba(255,255,255,0.04)" : `${brand.primaryColor}0a`,
            borderRadius: brand.cardRadius === "0px" ? "2px" : "10px",
          }}
        >
          <p
            className="text-[8px] uppercase tracking-[0.2em] mb-2"
            style={{ color: brand.textSecondary, opacity: 0.45 }}
          >
            Type · {brand.fontName}
          </p>
          <p
            style={{
              fontFamily: brand.fontFamily,
              color: brand.textPrimary,
              fontSize: "2.75rem",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
            }}
          >
            Aa
          </p>
          <p
            className="mt-2"
            style={{
              fontFamily: brand.fontFamily,
              color: brand.textSecondary,
              fontSize: "0.6875rem",
              opacity: 0.55,
              letterSpacing: brand.buttonRadius === "0px" ? "0.04em" : "0",
            }}
          >
            The quick brown fox
          </p>
        </div>

        {/* Button specimens */}
        <div className="mb-4 flex flex-col gap-2">
          <p
            className="mb-0.5 text-[8px] uppercase tracking-[0.22em]"
            style={{ color: brand.textSecondary, opacity: 0.5 }}
          >
            Components
          </p>
          <button
            className="w-full py-2.5"
            style={{
              backgroundColor: brand.primaryColor,
              color: brand.primaryText,
              borderRadius: brand.buttonRadius,
              fontFamily: brand.fontFamily,
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: brand.buttonRadius === "0px" ? "0.12em" : "0.04em",
              textTransform: brand.buttonRadius === "0px" ? "uppercase" : "none",
              cursor: "default",
              border: "none",
            }}
          >
            {brand.buttonLabel}
          </button>
          <button
            className="w-full py-2.5"
            style={{
              backgroundColor: "transparent",
              color: brand.primaryColor,
              borderRadius: brand.buttonRadius,
              border: `1.5px solid ${brand.primaryColor}`,
              fontFamily: brand.fontFamily,
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: brand.buttonRadius === "0px" ? "0.12em" : "0.04em",
              textTransform: brand.buttonRadius === "0px" ? "uppercase" : "none",
              cursor: "default",
            }}
          >
            View All
          </button>
        </div>

        {/* Badge + radius token label */}
        <div className="flex items-center justify-between">
          <span
            style={{
              backgroundColor: brand.accentColor,
              color: brand.accentText,
              borderRadius: brand.buttonRadius,
              fontFamily: brand.fontFamily,
              letterSpacing: brand.buttonRadius === "0px" ? "0.08em" : "0",
              textTransform: brand.buttonRadius === "0px" ? "uppercase" : "none",
              fontSize: "0.625rem",
              fontWeight: 600,
              padding: "3px 10px",
            }}
          >
            {brand.badgeLabel}
          </span>
          <p
            className="text-[7.5px] uppercase tracking-wider"
            style={{ color: brand.textSecondary, opacity: 0.35 }}
          >
            r: {brand.buttonRadius === "0px" ? "0" : "pill"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function SilhouetteCaseStudy() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const gradient = isDark
    ? "linear-gradient(135deg, #A78BFA 0%, #C9A84C 100%)"
    : "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)";

  const currentIndex = caseStudies.findIndex(
    (cs) => cs.slug === "project-silhouette"
  );
  const next =
    currentIndex < caseStudies.length - 1
      ? caseStudies[currentIndex + 1]
      : null;

  return (
    <article className="overflow-hidden">
      {/* Brand fonts — scoped to this page */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600;700;800&display=swap');`}</style>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[90vh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:px-12">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute -right-16 bottom-1/3 h-[300px] w-[300px] rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, #C9A84C 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-px w-6 bg-gold" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
              Case Study · Design Systems · Systems Architecture
            </span>
          </motion.div>

          <div className="grid items-end gap-12 md:grid-cols-[3fr_2fr]">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display font-black leading-[0.92] tracking-tight text-text-primary"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                  letterSpacing: "-0.04em",
                }}
              >
                Project{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: gradient }}
                >
                  Silhouette.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary"
              >
                Architecting a headless design system that unified three brands
                — and scaled to a fourth acquisition in 93% less time.
              </motion.p>
            </div>

            {/* Key metrics */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid gap-3"
            >
              {[
                {
                  value: "−87%",
                  label: "Design Styling Time",
                  sub: "1,050h → 140h",
                },
                {
                  value: "−97%",
                  label: "Dev Styling Time",
                  sub: "1,329h → 37.5h",
                },
                {
                  value: "−97%",
                  label: "Dev Tickets",
                  sub: "69 tickets → 2",
                },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.45 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center justify-between rounded-xl bg-surface px-5 py-4"
                  style={{ border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)" }}
                >
                  <div>
                    <span className="block text-xs font-medium text-text-secondary">
                      {m.label}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-text-muted">
                      {m.sub}
                    </span>
                  </div>
                  <span className="font-display text-2xl font-black text-accent">
                    {m.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Meta strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-14 grid grid-cols-2 gap-6 border-t border-surface-light pt-10 md:grid-cols-4"
          >
            {[
              { label: "Role", value: "Lead Designer" },
              { label: "Timeline", value: "Aug 2024 – Feb 2025" },
              { label: "Scope", value: "Design System, Governance" },
              { label: "Impact", value: "4 Brands Unified" },
            ].map((m, i) => (
              <div key={i}>
                <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-text-muted">
                  {m.label}
                </span>
                <span className="block text-sm font-medium text-text-primary">
                  {m.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 01 THE PROBLEM ────────────────────────────────────────── */}
      <section id="the-problem" className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32" style={{ scrollMarginTop: "80px" }}>
        <Reveal>
          <SectionLabel number="01" label="The Problem" />
        </Reveal>
        <div className="grid items-start gap-16 md:grid-cols-2">
          <Reveal delay={0.05}>
            <h2
              className="font-display font-black leading-tight text-text-primary"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Three Brands.
              <br />
              Three Silos.
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: gradient }}
              >
                One Massive Problem.
              </span>
            </h2>
            <p className="mt-6 leading-relaxed text-text-secondary">
              Before 2024, the ALDO Group — spanning Aldo, Call It Spring, and
              Sperry — operated in a fragmented ecosystem. Every brand was an
              island, every update a manual exercise in patience.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M3 10h14M10 3l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "Tooling Debt",
                body: "Sketch required entirely separate component libraries for each brand. Three files. Three sources of truth. Zero consistency.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect
                      x="3"
                      y="3"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="11"
                      y="3"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="3"
                      y="11"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="11"
                      y="11"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                ),
                title: "The Maintenance Nightmare",
                body: "Updating a single global pattern meant opening three different files, manually tweaking styles, and hoping for consistency.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M6 3l-3 7h5l-2 7 8-9h-5l3-5H6z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "The Developer Gap",
                body: "Engineers were forced into manual styling for every brand, generating a massive backlog of UI bugs and CSS bloat.",
              },
            ].map((card, i) => (
              <Reveal key={i} delay={0.08 + i * 0.1}>
                <div
                  className="rounded-xl bg-surface p-5 transition-colors"
                  style={{ border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)" }}
                >
                  <span className="mb-3 block text-accent">{card.icon}</span>
                  <h3 className="mb-2 font-display font-bold text-text-primary">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {card.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 THE SOLUTION ───────────────────────────────────────── */}
      <section id="the-solution" className="border-y border-surface-light bg-surface py-24 md:py-32" style={{ scrollMarginTop: "80px" }}>
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal>
            <SectionLabel number="02" label="The Solution" />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mb-16">
              <blockquote
                className="font-display font-black leading-none text-text-primary"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  letterSpacing: "-0.04em",
                }}
              >
                "One Body.
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: gradient }}
                >
                  Infinite Heads."
                </span>
              </blockquote>
              <p className="mt-6 max-w-lg leading-relaxed text-text-secondary">
                From August 2024 to February 2025, I led the migration from
                Sketch to Figma, building{" "}
                <strong className="text-text-primary">Silhouette</strong> — a
                headless design system designed to power the entire ALDO Group
                portfolio.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                n: "①",
                title: "Figma Variables",
                body: 'Semantic tokens like action-primary-bg replace hard-coded colors. The token is the brand — swap the values, swap the brand. No rebuilding. No drift.',
              },
              {
                n: "②",
                title: "Figma Variants",
                body: "A single source of truth for component logic — all states, sizes, and icon configurations — shared and inherited across every brand.",
              },
              {
                n: "③",
                title: "The Headless Result",
                body: 'The "Head" (brand identity) swaps instantly. The "Body" (code and logic) stays identical across all four brands.',
              },
            ].map((pillar, i) => (
              <Reveal key={i} delay={0.1 + i * 0.12}>
                <div className="relative overflow-hidden rounded-xl border border-surface-light bg-base p-6 h-full">
                  <span
                    className="absolute right-4 top-3 font-display text-4xl font-black text-accent/10"
                    aria-hidden="true"
                  >
                    {pillar.n}
                  </span>
                  <h3 className="mb-3 font-display font-bold text-text-primary">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── Brand token visual showcase ── */}
          <Reveal delay={0.3}>
            <div className="mt-16 border-t border-surface-light pt-16">
              <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-gold">
                    Live Token Preview
                  </p>
                  <h3
                    className="font-display font-black leading-tight text-text-primary"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.03em" }}
                  >
                    Same System.{" "}
                    <span
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: gradient }}
                    >
                      Four Identities.
                    </span>
                  </h3>
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-text-secondary md:text-right">
                  One token layer. Swap the values — swap the brand.
                  Not a single component rebuilt.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {BRANDS.map((brand, i) => (
                  <BrandTokenCard key={brand.id} brand={brand} index={i} />
                ))}
              </div>

              {/* Token architecture callout */}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { token: "action-primary-bg", values: ["#3300AD", "#000000", "#8f6300", "#c34d00"], label: "CTA Color" },
                  { token: "shape-branded-radius", values: ["999px", "0px", "999px", "999px"], label: "Button Radius" },
                  { token: "typography-display-font", values: ["Jost", "Roboto Flex", "Self Modern", "Besley"], label: "Display Font", isText: true },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-xl border border-surface-light bg-base p-4"
                  >
                    <p className="mb-3 font-mono text-[9px] text-accent/70 tracking-wide">
                      {row.token}
                    </p>
                    <div className="flex items-center gap-2">
                      {row.values.map((v, j) =>
                        row.isText ? (
                          <span
                            key={j}
                            className="flex-1 rounded py-1 text-center font-mono text-[7px] text-text-muted"
                            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                          >
                            {v}
                          </span>
                        ) : (
                          <div
                            key={j}
                            className="flex-1 h-5 rounded-sm"
                            style={{ backgroundColor: v }}
                            title={v}
                          />
                        )
                      )}
                    </div>
                    <p className="mt-2 text-[8px] uppercase tracking-[0.15em] text-text-muted">
                      {row.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 03 THE STRESS TEST ────────────────────────────────────── */}
      <section id="stress-test" className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32" style={{ scrollMarginTop: "80px" }}>
        <Reveal>
          <SectionLabel number="03" label="The Ultimate Stress Test" />
        </Reveal>
        <div className="grid items-center gap-16 md:grid-cols-2">
          <Reveal delay={0.05}>
            <h2
              className="font-display font-black leading-tight text-text-primary"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.03em",
              }}
            >
              GH Bass: The Acquisition We Didn't Plan For.
            </h2>
            <p className="mt-6 leading-relaxed text-text-secondary">
              In Summer 2025, ALDO Group acquired a 4th brand: GH Bass. This
              was the moment Silhouette proved its worth — scaling to a brand we
              hadn't designed for, one we didn't even know was coming.
            </p>
            <p className="mt-4 leading-relaxed text-text-secondary">
              By simply mapping GH Bass's brand identity onto existing tokens,
              we delivered all design components in a fraction of the time a
              conventional launch would have required.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col items-center justify-center py-8">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <span
                  className="block font-display font-black bg-clip-text text-transparent leading-none"
                  style={{
                    fontSize: "clamp(6rem, 18vw, 11rem)",
                    backgroundImage: gradient,
                  }}
                >
                  <CountUp to={93} suffix="%" />
                </span>
                <p className="mt-5 text-sm uppercase tracking-[0.2em] text-text-muted">
                  Less time than previous
                  <br />
                  brand launches
                </p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 04 THE NUMBERS ────────────────────────────────────────── */}
      <section id="manual-vs-headless" className="border-y border-surface-light bg-surface py-24 md:py-32" style={{ scrollMarginTop: "80px" }}>
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal>
            <SectionLabel number="04" label="Manual vs. Headless" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="mb-4 font-display font-black leading-tight text-text-primary"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.03em",
              }}
            >
              The Numbers Don't Lie.
            </h2>
            <p className="mb-16 max-w-xl leading-relaxed text-text-secondary">
              The shift from a per-project workflow to a systemic one, measured
              across three critical metrics.
            </p>
          </Reveal>

          <div className="space-y-10">
            {[
              {
                metric: "Design Styling",
                before: {
                  label: "Sperry · Sketch · May 2024",
                  value: 1050,
                  display: "1,050 hrs",
                },
                after: {
                  label: "GH Bass · Silhouette · May 2025",
                  value: 140,
                  display: "140 hrs",
                },
                reduction: "87%",
              },
              {
                metric: "Dev Styling",
                before: {
                  label: "Sperry · Sketch · May 2024",
                  value: 1329,
                  display: "1,329 hrs",
                },
                after: {
                  label: "GH Bass · Silhouette · May 2025",
                  value: 37.5,
                  display: "37.5 hrs",
                },
                reduction: "97%",
              },
              {
                metric: "Dev Tickets",
                before: {
                  label: "Sperry · Sketch · May 2024",
                  value: 69,
                  display: "69 tickets",
                },
                after: {
                  label: "GH Bass · Silhouette · May 2025",
                  value: 2,
                  display: "2 tickets",
                },
                reduction: "97%",
              },
            ].map((row, i) => (
              <div key={i} className="pt-10 first:pt-0">
                <BarComparison {...row} index={i} isDark={isDark} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 ENGINEERING IMPACT ─────────────────────────────────── */}
      <section id="engineering-impact" className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32" style={{ scrollMarginTop: "80px" }}>
        <Reveal>
          <SectionLabel number="05" label="Engineering Impact & Governance" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="mb-16 font-display font-black leading-tight text-text-primary"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Beyond the Design File.
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Cleanup of Legacy Code",
              body: "With a unified token guide, the dev team began purging years of hand-rolled CSS, replacing chaos with standardized, predictable variables.",
              gradientFrom: "rgba(124,58,237,0.12)",
            },
            {
              title: "Global Updates at Scale",
              body: "Push a change — a corner radius, a shadow — across all four brands simultaneously, rather than hunting through 69 individual Jira tickets.",
              gradientFrom: "rgba(201,168,76,0.12)",
            },
            {
              title: "Design Governance",
              body: "Silhouette bridges design and code. We now control implementation — ensuring what we design is exactly what the user sees.",
              gradientFrom: "rgba(124,58,237,0.12)",
            },
          ].map((card, i) => (
            <Reveal key={i} delay={0.08 + i * 0.12}>
              <div
                className="relative h-full overflow-hidden rounded-xl bg-surface p-6 transition-colors"
                style={{
                  background: `radial-gradient(ellipse at top left, ${card.gradientFrom} 0%, transparent 60%)`,
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <div className="relative z-10">
                  <h3 className="mb-3 font-display text-lg font-bold text-text-primary">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {card.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 06 KEY TAKEAWAYS ──────────────────────────────────────── */}
      <section id="key-takeaways" className="border-y border-surface-light bg-surface py-24 md:py-32" style={{ scrollMarginTop: "80px" }}>
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal>
            <SectionLabel number="06" label="Key Takeaways" />
          </Reveal>
          <div>
            {[
              {
                n: "01",
                title: "Efficiency is the Best ROI",
                body: "Reducing a launch from 1,000+ hours to 140 hours isn't just better design — it's a massive financial saving for the organization.",
              },
              {
                n: "02",
                title: "Scalability over Fidelity",
                body: "By focusing on headless architecture first, we built a system that was ready for an acquisition we didn't even know was coming.",
              },
              {
                n: "03",
                title: "Governance through Tokens",
                body: "Tokens are the language that finally allowed Design and Engineering to speak the same dialect — and actually mean it.",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="grid items-start gap-6 py-10 md:grid-cols-[72px_1fr_2fr]">
                  <span
                    className="font-display text-5xl font-black leading-none text-text-primary/10"
                    aria-hidden="true"
                  >
                    {item.n}
                  </span>
                  <h3 className="pt-1 font-display text-lg font-bold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="pt-1 leading-relaxed text-text-secondary">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING QUOTE ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center md:px-12 md:py-32">
        <Reveal>
          <blockquote>
            <p
              className="font-display font-medium leading-relaxed text-text-secondary"
              style={{
                fontSize: "clamp(1.25rem, 3vw, 1.875rem)",
                letterSpacing: "-0.02em",
              }}
            >
              "Tokens are the language that finally allowed Design and
              Engineering to speak the same dialect."
            </p>
            <cite className="mt-6 block text-[10px] uppercase tracking-[0.28em] text-gold not-italic">
              Lead Product Designer · ALDO Group
            </cite>
          </blockquote>
        </Reveal>
      </section>

      {/* ── CTA / NEXT PROJECT ────────────────────────────────────── */}
      <section className="border-t border-surface-light bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between md:px-12">
          <Link
            href="/#work"
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            ← All Projects
          </Link>

          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-col sm:text-right"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                Next Case Study
              </span>
              <span className="mt-1 font-display text-lg font-bold text-text-primary transition-colors group-hover:text-accent">
                {next.title} →
              </span>
            </Link>
          )}
        </div>
      </section>

      <CaseStudyStepper steps={SILHOUETTE_STEPS} />
    </article>
  );
}
