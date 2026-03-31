import { notFound } from "next/navigation";
import { getCaseStudy, getAllSlugs } from "@/data/caseStudies";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudySection from "@/components/CaseStudySection";
import ProjectNav from "@/components/ProjectNav";
import SilhouetteCaseStudy from "@/components/SilhouetteCaseStudy";
import type { Metadata } from "next";

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

  return (
    <article>
      <CaseStudyHero study={study} />

      <div className="px-6">
        {study.sections.map((section, i) => (
          <CaseStudySection key={i} section={section} />
        ))}
      </div>

      <ProjectNav currentSlug={study.slug} />
    </article>
  );
}
