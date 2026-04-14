"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

/* ── Project data ─────────────────────────────────────────────── */
interface VibeProject {
  id: number;
  name: string;
  url: string;
  href: string;
  tag: string;
  description: string;
  colors: [string, string, string];
  visualType: "screenshot" | "type" | "grid";
  screenshot?: string;
}

const projects: VibeProject[] = [
  {
    id: 1,
    name: "LogoForge",
    url: "logoforge-gamma.vercel.app",
    href: "https://logoforge-gamma.vercel.app/",
    tag: "Tool",
    description:
      "A parametric vector logo generator — tweak symmetry, layers, and color to generate production-ready SVG marks.",
    colors: ["#D4F53C", "#FF6B00", "#FFFFFF"],
    visualType: "screenshot",
    screenshot: "/images/vibe-logoforge.jpg",
  },
  {
    id: 2,
    name: "Type Crimes",
    url: "type-crimes.vercel.app",
    href: "#",
    tag: "Experiment",
    description:
      "A love letter to every typography rule you\u2019re not supposed to break.",
    colors: ["#A78BFA", "#F472B6", "#34D399"],
    visualType: "type",
  },
  {
    id: 3,
    name: "Grid Ritual",
    url: "grid-ritual.vercel.app",
    href: "#",
    tag: "Playground",
    description:
      "Infinite layout playgrounds. Tap into your inner grid obsessive.",
    colors: ["#38BDF8", "#818CF8", "#F0ABFC"],
    visualType: "grid",
  },
];

/* ── Visual content areas ─────────────────────────────────────── */
function ScreenshotVisual({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={src}
        alt={`${name} screenshot`}
        fill
        className="object-cover object-top"
        sizes="(max-width: 640px) 100vw, 33vw"
      />
    </div>
  );
}

function TypeVisual({ colors }: { colors: [string, string, string] }) {
  return (
    <div
      className="relative flex h-full w-full select-none items-center justify-center overflow-hidden"
      style={{ background: "#0d0d14" }}
    >
      <span
        className="absolute font-display font-black leading-none"
        style={{
          fontSize: "clamp(120px, 22vw, 200px)",
          color: colors[0],
          opacity: 0.12,
          bottom: "-12%",
          right: "-2%",
          letterSpacing: "-0.05em",
        }}
      >
        Aa
      </span>
      <div className="relative z-10 px-5 py-4 text-left w-full">
        <div
          className="font-display font-black leading-none mb-1"
          style={{ fontSize: "clamp(26px, 4vw, 38px)", color: colors[0], letterSpacing: "-0.04em" }}
        >
          Heading XL
        </div>
        <div
          className="font-body font-medium leading-tight mb-3"
          style={{ fontSize: "clamp(14px, 1.8vw, 17px)", color: colors[1], opacity: 0.9 }}
        >
          Subheading / Caption text
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {["Bold", "Regular", "Light"].map((w, i) => (
            <span
              key={w}
              className="rounded-full px-3 py-1 text-xs font-body"
              style={{
                background: `${colors[i]}22`,
                color: colors[i],
                border: `1px solid ${colors[i]}44`,
                fontWeight: i === 0 ? 700 : i === 1 ? 400 : 300,
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function GridVisual({ colors }: { colors: [string, string, string] }) {
  const highlighted: [number, number][] = [
    [0, 2], [1, 0], [1, 3], [2, 1], [2, 4], [3, 2], [0, 4], [3, 0],
  ];
  const COLS = 5;
  const ROWS = 4;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#0d0d14" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${colors[2]}18 1px, transparent 1px), linear-gradient(90deg, ${colors[2]}18 1px, transparent 1px)`,
          backgroundSize: `${100 / COLS}% ${100 / ROWS}%`,
        }}
      />
      {highlighted.map(([row, col], i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${(row / ROWS) * 100}%`,
            left: `${(col / COLS) * 100}%`,
            width: `${100 / COLS}%`,
            height: `${100 / ROWS}%`,
            background: colors[i % 3],
            opacity: 0.15 + (i % 3) * 0.08,
          }}
        />
      ))}
      <div
        className="absolute rounded-sm"
        style={{
          top: "25%",
          left: "20%",
          width: `${(2 / COLS) * 100}%`,
          height: `${(2 / ROWS) * 100}%`,
          background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
          opacity: 0.8,
        }}
      />
    </div>
  );
}

/* ── Browser Chrome Card ──────────────────────────────────────── */
function BrowserCard({
  project,
  isCoarse,
}: {
  project: VibeProject;
  isCoarse: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const canHover = !isCoarse && !shouldReduceMotion;
  const glowColor = project.colors[0];

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl overflow-hidden"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-surface-light)",
        textDecoration: "none",
      }}
      onMouseEnter={() => canHover && setHovered(true)}
      onMouseLeave={() => canHover && setHovered(false)}
      animate={
        canHover
          ? {
              y: hovered ? -8 : 0,
              scale: hovered ? 1.02 : 1,
              boxShadow: hovered
                ? `0 24px 60px -10px ${glowColor}40, 0 0 0 1px ${glowColor}30`
                : "0 2px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)",
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-3 px-4"
        style={{
          height: 38,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-[5px] shrink-0">
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{ width: 10, height: 10, background: c, opacity: 0.85 }}
            />
          ))}
        </div>

        {/* URL bar */}
        <div
          className="flex flex-1 items-center gap-2 rounded-md px-3"
          style={{
            height: 22,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <svg width="9" height="10" viewBox="0 0 9 10" fill="none" style={{ opacity: 0.4 }}>
            <rect x="1" y="4.5" width="7" height="5" rx="1" fill="currentColor" />
            <path d="M2.5 4.5V3a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
          <span
            className="font-body truncate"
            style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.02em" }}
          >
            {project.url}
          </span>
        </div>
      </div>

      {/* Visual content area — 16:9 aspect ratio */}
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        {project.visualType === "screenshot" && project.screenshot && (
          <ScreenshotVisual src={project.screenshot} name={project.name} />
        )}
        {project.visualType === "type" && <TypeVisual colors={project.colors} />}
        {project.visualType === "grid" && <GridVisual colors={project.colors} />}
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className="font-body font-semibold text-text-primary"
            style={{ fontSize: 15 }}
          >
            {project.name}
          </span>
          <span
            className="shrink-0 rounded-full px-2.5 py-0.5 font-body text-xs font-medium"
            style={{
              background: `${project.colors[0]}20`,
              color: project.colors[0],
              border: `1px solid ${project.colors[0]}35`,
            }}
          >
            {project.tag}
          </span>
        </div>
        <p className="font-body text-text-muted leading-snug" style={{ fontSize: 13 }}>
          {project.description}
        </p>

        <motion.div
          className="mt-4 flex items-center gap-1.5 font-body font-medium"
          style={{ fontSize: 12, color: project.colors[0] }}
          animate={{
            opacity: canHover ? (hovered ? 1 : 0.4) : 1,
            x: canHover ? (hovered ? 4 : 0) : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          Visit project
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </motion.a>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export default function VibeProjects() {
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <section
      className="px-6 md:px-12"
      style={{
        paddingTop: "clamp(4rem, 8vw, 7rem)",
        paddingBottom: "clamp(5rem, 10vw, 9rem)",
      }}
    >
      {/* Section header */}
      <ScrollReveal>
        <div className="mb-12 flex items-end justify-between border-b border-surface-light pb-8">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-accent-light">
              Built for Fun
            </p>
            <h2
              className="font-display font-black leading-none tracking-tight text-text-primary"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Passion Projects
            </h2>
          </div>
          <p className="hidden text-sm text-text-muted md:block">
            {projects.length} Projects
          </p>
        </div>
      </ScrollReveal>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {projects.map((project, idx) => (
          <ScrollReveal key={project.id} delay={idx * 0.1}>
            <BrowserCard project={project} isCoarse={isCoarse} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
