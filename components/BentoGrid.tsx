"use client";

import { useRef, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export interface BentoItem {
  icon: React.ReactNode;
  text: string;
  size?: "sm" | "md" | "lg";
}

function BentoCard({
  item,
  index,
}: {
  item: BentoItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    },
    [prefersReduced],
  );

  const sizeClasses =
    item.size === "lg"
      ? "sm:col-span-2 sm:row-span-2"
      : item.size === "md"
        ? "sm:col-span-2"
        : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={sizeClasses}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative h-full overflow-hidden rounded-xl border border-surface-light bg-surface p-6 transition-all duration-300 hover:border-accent/30 hover:scale-[1.02] hover:shadow-lg"
        style={
          {
            "--tw-shadow-color": "var(--color-accent-glow)",
            "--mouse-x": "50%",
            "--mouse-y": "50%",
          } as React.CSSProperties
        }
      >
        {/* Spotlight radial gradient on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(280px circle at var(--mouse-x) var(--mouse-y), var(--color-accent-glow), transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-center">
          <div className="text-text-muted transition-colors duration-300 group-hover:text-accent-light">
            {item.icon}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {item.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoGrid({ items }: { items: BentoItem[] }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <BentoCard key={i} item={item} index={i} />
      ))}
    </div>
  );
}
