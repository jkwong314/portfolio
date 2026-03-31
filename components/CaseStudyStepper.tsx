"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface StepperStep {
  id: string;
  label: string;
}

interface Props {
  steps: StepperStep[];
}

export default function CaseStudyStepper({ steps }: Props) {
  const [activeId, setActiveId] = useState<string>(steps[0]?.id ?? "");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (steps.length === 0) return;

    // Track which steps are currently intersecting
    const visible = new Set<string>();

    const updateActive = () => {
      // Pick the first step (in DOM order) that is currently visible
      const first = steps.find((s) => visible.has(s.id));
      if (first) setActiveId(first.id);
    };

    const observers: IntersectionObserver[] = [];

    steps.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible.add(id);
          } else {
            visible.delete(id);
          }
          updateActive();
        },
        // Section is "active" when its top portion is in the upper-middle of the viewport
        { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [steps]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (steps.length < 2) return null;

  return (
    <nav
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end xl:flex"
      aria-label="Case study sections"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {steps.map((step, i) => {
        const isActive = step.id === activeId;
        const isLast = i === steps.length - 1;

        return (
          <button
            key={step.id}
            onClick={() => scrollTo(step.id)}
            className="flex cursor-pointer items-center gap-3 py-0.5"
            aria-label={`Go to ${step.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Label — slides in on hover */}
            <motion.span
              className="max-w-[140px] truncate text-right font-body text-[10px] uppercase tracking-[0.18em]"
              animate={{
                opacity: hovered ? (isActive ? 1 : 0.45) : isActive ? 0.55 : 0,
                x: hovered ? 0 : 6,
              }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{
                color: isActive
                  ? "var(--color-accent-light)"
                  : "var(--color-text-muted)",
                pointerEvents: "none",
              }}
            >
              {step.label}
            </motion.span>

            {/* Dot + connector */}
            <div className="flex flex-col items-center">
              <motion.div
                className="rounded-full flex-shrink-0"
                animate={{
                  width: isActive ? 8 : 5,
                  height: isActive ? 8 : 5,
                  backgroundColor: isActive
                    ? "var(--color-accent-light)"
                    : hovered
                      ? "var(--color-text-secondary)"
                      : "var(--color-text-muted)",
                  boxShadow: isActive
                    ? "0 0 8px var(--color-accent-glow)"
                    : "none",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
              {!isLast && (
                <motion.div
                  className="w-px"
                  animate={{
                    backgroundColor: isActive
                      ? "var(--color-accent-light)"
                      : "var(--color-surface-light)",
                    opacity: isActive ? 0.4 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ height: 24 }}
                />
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
}
