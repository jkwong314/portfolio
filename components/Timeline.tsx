"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

function TimelineEntry({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-10 pb-12 last:pb-0 group"
    >
      {/* Dot */}
      <div
        className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center"
        style={{ transform: "translateX(-50%)" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.1 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-3 w-3 rounded-full border-2 border-accent bg-base transition-colors duration-300 group-hover:bg-accent group-hover:shadow-[0_0_12px_var(--color-accent-glow)]"
        />
      </div>

      {/* Content card */}
      <div className="rounded-xl border border-surface-light bg-surface p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-lg"
        style={{ "--tw-shadow-color": "var(--color-accent-glow)" } as React.CSSProperties}
      >
        <span className="inline-block rounded-full bg-accent/10 px-3 py-1 font-body text-xs font-medium tracking-wide text-accent-light">
          {item.year}
        </span>
        <h3 className="mt-2 font-display text-lg font-bold text-text-primary">
          {item.title}
        </h3>
        <p className="font-body text-sm font-medium text-gold">{item.company}</p>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.5"],
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative">
      {/* Track line (static background) */}
      <div
        className="absolute left-0 top-0 h-full w-px"
        style={{ background: "var(--color-surface-light)" }}
      />

      {/* Animated beam (fills on scroll) */}
      {!prefersReduced && (
        <motion.div
          className="absolute left-0 top-0 w-px origin-top"
          style={{
            height: beamHeight,
            background:
              "linear-gradient(to bottom, var(--color-accent), var(--color-gold))",
            boxShadow:
              "0 0 8px var(--color-accent-glow), 0 0 20px var(--color-accent-glow)",
          }}
        />
      )}

      {/* Entries */}
      {items.map((item, i) => (
        <TimelineEntry key={item.company + item.year} item={item} index={i} />
      ))}
    </div>
  );
}
