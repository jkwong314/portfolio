import Hero from "@/components/Hero";
import CaseStudyCard from "@/components/CaseStudyCard";
import ScrollReveal from "@/components/ScrollReveal";
import VibeProjects from "@/components/VibeProjects";
import { caseStudies } from "@/data/caseStudies";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="work" className="px-6 md:px-12" style={{ paddingTop: "clamp(5rem, 10vw, 9rem)", paddingBottom: "clamp(5rem, 10vw, 9rem)" }}>
        {/* Section header — editorial style */}
        <ScrollReveal>
          <div className="mb-16 flex items-end justify-between border-b border-surface-light pb-8">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">
                Selected Work
              </p>
              <h2
                className="font-display font-black leading-none tracking-tight text-text-primary"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
              >
                Case Studies
              </h2>
            </div>
            <p className="hidden text-sm text-text-muted md:block">
              {caseStudies.length} Projects
            </p>
          </div>
        </ScrollReveal>

        {/* Editorial grid */}
        <div className="flex flex-col gap-4">
          {/* Row 1: featured large + tall */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ScrollReveal delay={0.05}>
              <CaseStudyCard study={caseStudies[0]} size="compact" index={1} />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <CaseStudyCard study={caseStudies[1]} size="compact" index={2} />
            </ScrollReveal>
          </div>

        </div>
      </section>

      <VibeProjects />
    </>
  );
}
