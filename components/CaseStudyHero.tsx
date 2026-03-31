import type { CaseStudy } from "@/data/types";

interface CaseStudyHeroProps {
  study: CaseStudy;
}

export default function CaseStudyHero({ study }: CaseStudyHeroProps) {
  return (
    <section className="relative">
      {/* Hero image placeholder */}
      <div className="h-[50vh] w-full bg-gradient-to-br from-accent/20 via-surface-light to-accent-hot/10 md:h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-accent-blue/10" />
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
