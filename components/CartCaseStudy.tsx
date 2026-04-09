"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import ProjectNav from "@/components/ProjectNav";

// ── Helpers ───────────────────────────────────────────────────────────────────

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
      initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-10 flex items-center gap-3">
      <span className="font-mono text-xs text-text-muted">{number}</span>
      <span className="h-px w-8 bg-surface-light" aria-hidden="true" />
      <span className="text-[10px] uppercase tracking-[0.28em] text-gold">{label}</span>
    </div>
  );
}

function CountUp({
  target,
  suffix = "",
  decimals = 0,
  duration = 1.5,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const pow = Math.pow(10, decimals);
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target * pow) / pow);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? val.toFixed(decimals) : val.toLocaleString()}
      {suffix}
    </span>
  );
}

// ── Funnel step ───────────────────────────────────────────────────────────────

function FunnelStep({
  step,
  label,
  display,
  connector,
  delay,
  isDark,
  isLast = false,
}: {
  step: number;
  label: string;
  display: string;
  connector?: string;
  delay: number;
  isDark: boolean;
  isLast?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref}>
      <motion.div
        className="rounded-2xl p-6"
        style={{
          background: isDark ? "rgba(28,28,28,0.8)" : "rgba(255,255,255,0.85)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em]"
          style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)" }}
        >
          Step {step}
        </div>
        <div
          className="font-display font-black leading-none"
          style={{
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            letterSpacing: "-0.04em",
            color: isDark ? "#F5F5F0" : "#18181B",
          }}
        >
          {display}
        </div>
        <div className="mt-2 text-sm text-text-secondary">{label}</div>
      </motion.div>

      {!isLast && connector && (
        <motion.div
          className="my-3 flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5, duration: 0.4 }}
        >
          <div className="h-5 w-px bg-surface-light" />
          <span
            className="rounded-full px-3 py-1 text-[10px] font-medium text-text-muted"
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
            }}
          >
            ↓ {connector}
          </span>
          <div className="h-5 w-px bg-surface-light" />
        </motion.div>
      )}
    </div>
  );
}

// ── Before / after row ────────────────────────────────────────────────────────

function MetricRow({
  metric,
  before,
  after,
  delay,
  isDark,
}: {
  metric: string;
  before: string;
  after: string;
  delay: number;
  isDark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="grid items-center gap-4 border-b py-5"
      style={{
        gridTemplateColumns: "1fr 110px 110px",
        borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
      }}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-sm text-text-secondary">{metric}</span>
      <span
        className="rounded-lg px-3 py-2 text-center text-sm font-medium"
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)",
        }}
      >
        {before}
      </span>
      <span
        className="rounded-lg px-3 py-2 text-center text-sm font-semibold"
        style={{
          background: isDark ? "rgba(167,139,250,0.15)" : "rgba(124,58,237,0.1)",
          color: isDark ? "#A78BFA" : "#6D28D9",
        }}
      >
        {after}
      </span>
    </motion.div>
  );
}

// ── Priority tier ─────────────────────────────────────────────────────────────

type TierKey = "MVP" | "Brand Favorites" | "Fast-Follows" | "Nice-to-Haves" | "Not Feasible";

const TIER_PALETTE: Record<TierKey, { bg: string; text: string; darkBg: string; darkText: string }> = {
  MVP:              { bg: "rgba(124,58,237,0.1)",  text: "#6D28D9", darkBg: "rgba(167,139,250,0.15)", darkText: "#A78BFA" },
  "Brand Favorites":{ bg: "rgba(201,168,76,0.12)", text: "#92670A", darkBg: "rgba(201,168,76,0.15)",  darkText: "#C9A84C" },
  "Fast-Follows":   { bg: "rgba(59,130,246,0.1)",  text: "#1D4ED8", darkBg: "rgba(96,165,250,0.15)",  darkText: "#60A5FA" },
  "Nice-to-Haves":  { bg: "rgba(16,185,129,0.1)",  text: "#065F46", darkBg: "rgba(52,211,153,0.12)",  darkText: "#34D399" },
  "Not Feasible":   { bg: "rgba(239,68,68,0.08)",  text: "#991B1B", darkBg: "rgba(252,165,165,0.1)",  darkText: "#FCA5A5" },
};

function PriorityTier({
  tier,
  items,
  delay,
  isDark,
}: {
  tier: TierKey;
  items: string[];
  delay: number;
  isDark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const c = TIER_PALETTE[tier];

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-3 rounded-2xl border p-5 md:flex-row md:items-center md:gap-6"
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
        background: isDark ? "rgba(17,17,17,0.6)" : "rgba(255,255,255,0.6)",
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="w-fit shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
        style={{
          background: isDark ? c.darkBg : c.bg,
          color: isDark ? c.darkText : c.text,
        }}
      >
        {tier}
      </span>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-lg border px-3 py-1.5 text-xs text-text-secondary"
            style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CartCaseStudy() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const accentGrad = isDark
    ? "linear-gradient(135deg, #C9A84C 0%, #A78BFA 100%)"
    : "linear-gradient(135deg, #92670A 0%, #7C3AED 100%)";

  return (
    <main className="min-h-screen pb-32">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-24 pt-32 md:px-12 md:pt-40">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage: isDark
              ? "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 70%)"
              : "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl">
          {/* Breadcrumb + category */}
          <Reveal>
            <div className="mb-8 flex items-center gap-3">
              <Link
                href="/#work"
                className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-text-primary"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Work
              </Link>
              <span className="text-text-muted/30" aria-hidden="true">·</span>
              <span
                className="rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-text-muted"
                style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
              >
                E-Commerce
              </span>
            </div>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.05}>
            <h1
              className="font-display font-black leading-[1.05] text-text-primary"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", letterSpacing: "-0.035em" }}
            >
              Reimagining the{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: accentGrad }}
              >
                ALDO Cart
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              A multi-brand e-commerce funnel was losing 61.1% of engaged shoppers at the cart. This is the story of how research, a shared design system, and ruthless prioritization turned that leak into a conversion engine.
            </p>
          </Reveal>

          {/* Meta pills */}
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { label: "Role", value: "Lead Product Designer" },
                { label: "Timeline", value: "May 2023 – Oct 2025" },
                { label: "Platform", value: "Shopify · 4 brands" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border px-4 py-2"
                  style={{
                    borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                    background: isDark ? "rgba(28,28,28,0.6)" : "rgba(255,255,255,0.6)",
                  }}
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-text-muted">{label}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-primary">{value}</span>
                </div>
              ))}
              {/* Live badge */}
              <div
                className="flex items-center gap-2 rounded-full border px-4 py-2"
                style={{
                  borderColor: isDark ? "rgba(52,211,153,0.3)" : "rgba(5,150,105,0.25)",
                  background: isDark ? "rgba(52,211,153,0.06)" : "rgba(5,150,105,0.04)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full"
                    style={{ background: isDark ? "#34D399" : "#10B981", opacity: 0.7 }}
                    animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: isDark ? "#34D399" : "#10B981" }} />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: isDark ? "#34D399" : "#059669" }}>
                  Live Oct 2025
                </span>
              </div>
            </div>
          </Reveal>

          {/* Hero stats row */}
          <Reveal delay={0.2}>
            <div
              className="mt-16 grid grid-cols-3 border-t"
              style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
            >
              {[
                { value: 61.1, suffix: "%", decimals: 1, label: "Initial cart abandonment" },
                { value: 1100000, suffix: "", decimals: 0, label: "Monthly session starts" },
                { value: 93, suffix: "%", decimals: 0, label: "Faster with Silhouette DS" },
              ].map(({ value, suffix, decimals, label }, i) => (
                <div
                  key={i}
                  className="pt-8 pr-6"
                  style={{ borderLeft: i > 0 ? `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` : "none", paddingLeft: i > 0 ? "1.5rem" : 0 }}
                >
                  <div
                    className="font-display font-black leading-none"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      letterSpacing: "-0.04em",
                      backgroundImage: accentGrad,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <CountUp target={value} suffix={suffix} decimals={decimals} duration={1.6} />
                  </div>
                  <div className="mt-2 text-xs text-text-muted">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 01 The Leaky Funnel ──────────────────────────────────────────────── */}
      <section
        id="the-leaky-funnel"
        className="px-6 py-24 md:px-12"
        style={{ background: isDark ? "rgba(17,17,17,0.5)" : "rgba(244,244,245,0.5)" }}
      >
        <div className="mx-auto max-w-5xl">
          <SectionLabel number="01" label="The Leaky Funnel" />

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            {/* Left: narrative + callout */}
            <div>
              <Reveal>
                <h2
                  className="font-display font-black leading-tight text-text-primary"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.03em" }}
                >
                  A critical gap between intent and action
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 text-base leading-relaxed text-text-secondary">
                  Quantitative data from May 2023 revealed a staggering drop-off in the purchase funnel. Despite over a million monthly sessions, fewer than 3% of users were ever reaching checkout — a systemic conversion problem hiding in plain sight.
                </p>
              </Reveal>

              {/* Abandonment callout */}
              <Reveal delay={0.16}>
                <div
                  className="mt-8 rounded-2xl p-7"
                  style={{
                    background: isDark
                      ? "linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(239,68,68,0.03) 100%)"
                      : "linear-gradient(135deg, rgba(239,68,68,0.07) 0%, rgba(239,68,68,0.01) 100%)",
                    border: `1px solid ${isDark ? "rgba(239,68,68,0.22)" : "rgba(239,68,68,0.15)"}`,
                  }}
                >
                  <div
                    className="font-display font-black leading-none"
                    style={{
                      fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
                      letterSpacing: "-0.04em",
                      color: isDark ? "#FCA5A5" : "#DC2626",
                    }}
                  >
                    61.1%
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-text-secondary">
                    Of users who added items to cart never started checkout — a{" "}
                    <span className="font-medium text-text-primary">Current State abandonment rate</span>{" "}
                    confirmed across all four brands.
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: funnel steps */}
            <div>
              <FunnelStep
                step={1}
                label="Session Starts"
                display="1.1M"
                connector="7.2% added to cart"
                delay={0.1}
                isDark={isDark}
              />
              <FunnelStep
                step={2}
                label="Added to Cart"
                display="79K"
                connector="39.2% started checkout"
                delay={0.22}
                isDark={isDark}
              />
              <FunnelStep
                step={3}
                label="Started Checkout"
                display="31K"
                delay={0.34}
                isDark={isDark}
                isLast
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 Voice of the Customer ────────────────────────────────────────── */}
      <section id="voice-of-the-customer" className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-5xl">
          <SectionLabel number="02" label="Voice of the Customer" />
          <Reveal>
            <h2
              className="mb-3 font-display font-black leading-tight text-text-primary"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.03em" }}
            >
              Why were users walking away?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mb-14 max-w-2xl text-base leading-relaxed text-text-secondary">
              VoC surveys, CS reports, and quarterly live user testing — screened for each brand's target consumer — surfaced three patterns that appeared consistently across all four storefronts.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Unintuitive Layout",
                body: "Users described the experience as \u201ccluttered.\u201d Key CTAs were buried or competing with secondary elements — the path to checkout was unclear at a glance.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="2" y="2" width="6" height="6" rx="1" />
                    <rect x="10" y="2" width="6" height="6" rx="1" />
                    <rect x="2" y="10" width="6" height="6" rx="1" />
                    <rect x="10" y="10" width="6" height="6" rx="1" />
                  </svg>
                ),
              },
              {
                number: "02",
                title: "Missing Core Features",
                body: "Market-standard functionality like \u201cSave for Later\u201d was absent. Users expected it, didn\u2019t find it, and left — often to a competitor who had it.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M3 9h12M9 3l6 6-6 6" />
                  </svg>
                ),
              },
              {
                number: "03",
                title: "Lack of Clarity",
                body: "Promotions without clear eligibility labeling made users feel \u201ctricked\u201d when discounts didn\u2019t apply. Trust eroded at the most critical moment in the funnel.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="9" cy="9" r="7" />
                    <path d="M9 6v4M9 12.5v.5" />
                  </svg>
                ),
              },
            ].map(({ number, title, body, icon }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <motion.div
                  className="flex h-full flex-col rounded-2xl p-6"
                  style={{
                    background: isDark ? "rgba(28,28,28,0.7)" : "rgba(255,255,255,0.85)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
                  }}
                  whileHover={{ y: -3, transition: { duration: 0.25 } }}
                >
                  <div
                    className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                      color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
                    }}
                  >
                    {icon}
                  </div>
                  <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted">
                    Pain Point {number}
                  </div>
                  <h3 className="mb-3 font-display text-lg font-black leading-tight text-text-primary">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 Research & Strategy ──────────────────────────────────────────── */}
      <section
        id="research-strategy"
        className="px-6 py-24 md:px-12"
        style={{ background: isDark ? "rgba(17,17,17,0.5)" : "rgba(244,244,245,0.5)" }}
      >
        <div className="mx-auto max-w-5xl">
          <SectionLabel number="03" label="Research & Strategy" />

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <Reveal>
                <h2
                  className="font-display font-black leading-tight text-text-primary"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.03em" }}
                >
                  Finding the gold standard — then building toward it
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 text-base leading-relaxed text-text-secondary">
                  Rather than guess at solutions, we initiated a structured discovery phase grounded in competitive intelligence, flow mapping, and system integration.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <ul className="mt-8 space-y-5">
                  {[
                    {
                      label: "Competitive Benchmarking",
                      body: "Analyzed 100+ global brands to identify gold-standard patterns in cart UI, promotion feedback loops, and checkout entry points.",
                    },
                    {
                      label: "Flow Redefinition",
                      body: "Redrew the complete user flow for our key demographics — ensuring a seamless, intuitive journey from product detail to checkout start.",
                    },
                    {
                      label: "System Integration",
                      body: "Leveraged the Silhouette Design System, eliminating component-scaffolding overhead and compressing the entire production timeline.",
                    },
                  ].map(({ label, body }) => (
                    <li key={label} className="flex gap-4">
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                        style={{ background: isDark ? "#A78BFA" : "#7C3AED" }}
                      />
                      <div>
                        <span className="text-sm font-semibold text-text-primary">{label} — </span>
                        <span className="text-sm text-text-secondary">{body}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="flex flex-col gap-5">
              {/* Big number */}
              <Reveal delay={0.1}>
                <div
                  className="rounded-2xl p-10 text-center"
                  style={{
                    background: isDark
                      ? "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(201,168,76,0.06) 100%)"
                      : "linear-gradient(135deg, rgba(124,58,237,0.07) 0%, rgba(201,168,76,0.04) 100%)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
                  }}
                >
                  <div
                    className="font-display font-black leading-none"
                    style={{
                      fontSize: "clamp(4rem, 7vw, 6rem)",
                      letterSpacing: "-0.04em",
                      backgroundImage: accentGrad,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    100+
                  </div>
                  <div className="mt-3 text-sm text-text-secondary">Global brands benchmarked</div>
                </div>
              </Reveal>

              {/* DS callout */}
              <Reveal delay={0.18}>
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: isDark ? "rgba(28,28,28,0.7)" : "rgba(255,255,255,0.85)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
                  }}
                >
                  <p className="text-sm leading-relaxed text-text-secondary">
                    <span className="font-semibold text-text-primary">Silhouette multiplier — </span>
                    By building on the headless design system architected for the ALDO Group portfolio, production time was reduced by{" "}
                    <span className="font-semibold" style={{ color: isDark ? "#A78BFA" : "#7C3AED" }}>93%</span>.
                    {" "}The entire team focused on UX logic — not component scaffolding.
                  </p>
                  <Link
                    href="/work/project-silhouette"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
                    style={{ color: isDark ? "#C9A84C" : "#92670A" }}
                  >
                    Read Project Silhouette
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="-rotate-45" aria-hidden="true">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 Iteration & Validation ───────────────────────────────────────── */}
      <section id="validation" className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-5xl">
          <SectionLabel number="04" label="Iteration & Validation" />

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <Reveal>
                <h2
                  className="font-display font-black leading-tight text-text-primary"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.03em" }}
                >
                  We didn't just design. We validated.
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 text-base leading-relaxed text-text-secondary">
                  Multiple rounds of high-fidelity prototyping and user testing — screened specifically for each brand's target consumer profile. Every session was driven by three core objectives.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <ul className="mt-8 space-y-4">
                  {[
                    "Evaluate visibility and accessibility of the Checkout CTA",
                    "Test clarity of new promotion eligibility labels",
                    "Measure success rate of the Save for Later feature",
                  ].map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{
                          background: isDark ? "rgba(167,139,250,0.15)" : "rgba(124,58,237,0.1)",
                          color: isDark ? "#A78BFA" : "#7C3AED",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-text-secondary">{obj}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Results table */}
            <div className="flex flex-col justify-center">
              <Reveal delay={0.1}>
                <div
                  className="grid items-center gap-4 pb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted"
                  style={{
                    gridTemplateColumns: "1fr 110px 110px",
                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                  }}
                >
                  <span>Metric</span>
                  <span className="text-center">Before</span>
                  <span className="text-center">After</span>
                </div>
              </Reveal>
              <MetricRow
                metric="Task Completion (Add to Cart)"
                before="72%"
                after="96%"
                delay={0.15}
                isDark={isDark}
              />
              <MetricRow
                metric="Clarity of Promotions"
                before="3 / 10"
                after="9 / 10"
                delay={0.24}
                isDark={isDark}
              />
              <MetricRow
                metric="Time to Checkout Start"
                before="45 sec"
                after="18 sec"
                delay={0.33}
                isDark={isDark}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 Stakeholder Alignment ─────────────────────────────────────────── */}
      <section
        id="prioritization"
        className="px-6 py-24 md:px-12"
        style={{ background: isDark ? "rgba(17,17,17,0.5)" : "rgba(244,244,245,0.5)" }}
      >
        <div className="mx-auto max-w-5xl">
          <SectionLabel number="05" label="Stakeholder Alignment" />
          <Reveal>
            <h2
              className="mb-3 font-display font-black leading-tight text-text-primary"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.03em" }}
            >
              From validation to roadmap
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mb-12 max-w-2xl text-base leading-relaxed text-text-secondary">
              Post-validation I led a cross-brand workshop with Brand Leads to align on a Feature Prioritization Matrix — balancing user needs against technical constraints during the Shopify platform migration.
            </p>
          </Reveal>

          <div className="flex flex-col gap-3">
            <PriorityTier
              tier="MVP"
              items={["Intuitive layout", "Clear promo eligibility labels", "Primary checkout CTA"]}
              delay={0.05}
              isDark={isDark}
            />
            <PriorityTier
              tier="Brand Favorites"
              items={["Brand-specific aesthetic accents", "Recommended for You carousels"]}
              delay={0.1}
              isDark={isDark}
            />
            <PriorityTier
              tier="Fast-Follows"
              items={["Cart holding (Save for Later)", "Estimated shipping calculator"]}
              delay={0.15}
              isDark={isDark}
            />
            <PriorityTier
              tier="Nice-to-Haves"
              items={["Gift messaging", "Loyalty point integration"]}
              delay={0.2}
              isDark={isDark}
            />
            <PriorityTier
              tier="Not Feasible"
              items={["Real-time inventory countdown — limited by legacy backend"]}
              delay={0.25}
              isDark={isDark}
            />
          </div>
        </div>
      </section>

      {/* ── 06 Launch & Results ──────────────────────────────────────────────── */}
      <section id="launch" className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-5xl">
          <SectionLabel number="06" label="Launch & Results" />

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <Reveal>
                <h2
                  className="font-display font-black leading-tight text-text-primary"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.03em" }}
                >
                  Live across all four brand sites
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 text-base leading-relaxed text-text-secondary">
                  Strategically timed to the 2025 Shopify platform migration, the redesigned cart launched in October 2025 across Aldo Shoes, Call It Spring, Sperry, and GH Bass — simultaneously.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  We're currently using heatmaps and A/B testing to monitor Save for Later adoption and validate that no new friction emerged during the platform migration.
                </p>
              </Reveal>

              {/* Live status */}
              <Reveal delay={0.2}>
                <div
                  className="mt-8 inline-flex items-center gap-3 rounded-full border px-5 py-3"
                  style={{
                    borderColor: isDark ? "rgba(52,211,153,0.3)" : "rgba(5,150,105,0.25)",
                    background: isDark ? "rgba(52,211,153,0.06)" : "rgba(5,150,105,0.04)",
                  }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <motion.span
                      className="absolute inline-flex h-full w-full rounded-full"
                      style={{ background: isDark ? "#34D399" : "#10B981", opacity: 0.7 }}
                      animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: isDark ? "#34D399" : "#10B981" }} />
                  </span>
                  <span className="text-sm font-semibold" style={{ color: isDark ? "#34D399" : "#059669" }}>
                    Live & Optimized — October 2025
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col gap-5">
              {/* Brand grid */}
              <Reveal delay={0.1}>
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: isDark ? "rgba(28,28,28,0.7)" : "rgba(255,255,255,0.85)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
                  }}
                >
                  <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                    Deployed across
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Aldo Shoes", color: isDark ? "#A78BFA" : "#7C3AED" },
                      { name: "Call It Spring", color: isDark ? "#C9A84C" : "#92670A" },
                      { name: "Sperry", color: isDark ? "#60A5FA" : "#2563EB" },
                      { name: "GH Bass", color: isDark ? "#34D399" : "#059669" },
                    ].map(({ name, color }, i) => (
                      <Reveal key={name} delay={0.15 + i * 0.06}>
                        <div
                          className="flex items-center gap-2.5 rounded-xl px-4 py-3"
                          style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                          <span className="text-sm font-medium text-text-secondary">{name}</span>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Next steps */}
              <Reveal delay={0.2}>
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: isDark ? "rgba(28,28,28,0.7)" : "rgba(255,255,255,0.85)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
                  }}
                >
                  <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                    What's next
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Heatmap analysis of Save for Later adoption rates",
                      "A/B testing post-Shopify migration to isolate conversion deltas",
                      "Ongoing abandonment rate monitoring across all four brands",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: isDark ? "#A78BFA" : "#7C3AED", opacity: 0.6 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing quote ────────────────────────────────────────────────────── */}
      <section className="px-6 py-28 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p
              className="font-display font-black leading-tight text-text-primary"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.03em" }}
            >
              "A design system isn't a deliverable.
              <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: accentGrad }}>
                It's a multiplier."
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-sm text-text-muted">
              The cart redesign succeeded because Silhouette gave us the time to focus on what actually mattered — the user.
            </p>
          </Reveal>
        </div>
      </section>

      <ProjectNav currentSlug="aldo-cart-redesign" />
    </main>
  );
}
