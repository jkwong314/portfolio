import { notFound } from "next/navigation";
import { getCaseStudy, getAllSlugs } from "@/data/caseStudies";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudySection from "@/components/CaseStudySection";
import CaseStudyStepper from "@/components/CaseStudyStepper";
import ProjectNav from "@/components/ProjectNav";
import SilhouetteCaseStudy from "@/components/SilhouetteCaseStudy";
import type { Metadata } from "next";

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title} | Jamie`,
    description: study.subtitle,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  if (study.slug === "project-silhouette") {
    return <SilhouetteCaseStudy />;
  }

  // Build stepper steps from sections that have headings
  const steps = study.sections
    .filter((s) => s.heading)
    .map((s) => ({ id: slugify(s.heading!), label: s.heading! }));

  return (
    <article>
      <CaseStudyHero study={study} />

      <div className="px-6">
        {study.sections.map((section, i) => (
          <CaseStudySection
            key={i}
            section={section}
            id={section.heading ? slugify(section.heading) : undefined}
          />
        ))}
      </div>

      <CaseStudyStepper steps={steps} />
      <ProjectNav currentSlug={study.slug} />
    </article>
  );
}
