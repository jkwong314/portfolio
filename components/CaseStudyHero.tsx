"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { CaseStudy } from "@/data/types";

interface CaseStudyHeroProps {
  study: CaseStudy;
}

export default function CaseStudyHero({ study }: CaseStudyHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section ref={sectionRef} className="relative">
      {/* Hero image with parallax */}
      <div className="relative h-[50vh] w-full overflow-hidden md:h-[60vh]">
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY, scale: 1.15 }}
        >
          <Image
            src={study.heroImage}
            alt={study.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-surface-light/30 to-accent-hot/10" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full bg-gradient-to-t from-base via-base/80 to-transparent px-6 pb-12 pt-32">
          <div className="mx-auto max-w-4xl">
            <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-sm font-medium text-accent">
              {study.category}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl">
              {study.title}
            </h1>
            <p className="mt-3 text-lg text-text-secondary md:text-xl">
              {study.subtitle}
            </p>

            {/* Metadata row */}
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-text-secondary">
              <div>
                <span className="block text-xs uppercase tracking-wider text-text-secondary/60">
                  Role
                </span>
                <span className="mt-1 block text-text-primary">
                  {study.role}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-text-secondary/60">
                  Timeline
                </span>
                <span className="mt-1 block text-text-primary">
                  {study.timeline}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-text-secondary/60">
                  Year
                </span>
                <span className="mt-1 block text-text-primary">
                  {study.year}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
