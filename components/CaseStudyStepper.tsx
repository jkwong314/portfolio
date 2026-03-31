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

// Fixed dot container size — connector margin is derived from this
const DOT_BOX = 10; // px, the invisible wrapper that contains the animated dot
const CONNECTOR_H = 22; // px

export default function CaseStudyStepper({ steps }: Props) {
  const [activeId, setActiveId] = useState<string>(steps[0]?.id ?? "");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (steps.length === 0) return;

    const visible = new Set<string>();

    const updateActive = () => {
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
          <div key={step.id} className="flex flex-col items-end">
            {/* ── Row: label + dot ── */}
            <button
              onClick={() => scrollTo(step.id)}
              className="flex cursor-pointer items-center gap-3"
              style={{ height: `${DOT_BOX}px` }}
              aria-label={`Go to ${step.label}`}
              aria-current={isActive ? "true" : undefined}
            >
              {/* Label — always visible, opacity carries the state */}
              <motion.span
                className="max-w-[160px] truncate text-right font-body text-[11px] uppercase tracking-[0.16em]"
                animate={{
                  opacity: isActive ? 1 : hovered ? 0.7 : 0.45,
                  fontWeight: isActive ? 600 : 400,
                }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  color: isActive
                    ? "var(--color-text-primary)"
                    : "var(--color-text-secondary)",
                  pointerEvents: "none",
                }}
              >
                {step.label}
              </motion.span>

              {/* Dot — fixed container keeps connector alignment stable */}
              <div
                style={{
                  width: DOT_BOX,
                  height: DOT_BOX,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <motion.div
                  className="rounded-full"
                  animate={{
                    width: isActive ? 9 : 5,
                    height: isActive ? 9 : 5,
                    backgroundColor: isActive
                      ? "var(--color-accent-light)"
                      : hovered
                        ? "var(--color-text-secondary)"
                        : "var(--color-text-muted)",
                    boxShadow: isActive
                      ? "0 0 10px var(--color-accent-glow)"
                      : "none",
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>
            </button>

            {/* ── Connector line — separate from button, aligned to dot center ── */}
            {!isLast && (
              <motion.div
                style={{
                  width: 1,
                  height: CONNECTOR_H,
                  // marginRight = half of DOT_BOX - half of 1px line = 4.5px
                  marginRight: DOT_BOX / 2 - 0.5,
                }}
                animate={{
                  backgroundColor: isActive
                    ? "var(--color-accent-light)"
                    : "var(--color-surface-light)",
                  opacity: isActive ? 0.5 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
