import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";

interface ProjectNavProps {
  currentSlug: string;
}

export default function ProjectNav({ currentSlug }: ProjectNavProps) {
  const currentIndex = caseStudies.findIndex((cs) => cs.slug === currentSlug);
  const prev = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const next =
    currentIndex < caseStudies.length - 1
      ? caseStudies[currentIndex + 1]
      : null;

  return (
    <nav className="border-t border-surface-light" aria-label="Project navigation">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="group flex flex-col"
          >
            <span className="text-xs uppercase tracking-wider text-text-secondary">
              Previous
            </span>
            <span className="mt-1 font-display text-lg font-semibold text-text-primary group-hover:text-accent group-hover:underline group-hover:underline-offset-4 transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href="/#work"
          className="text-sm text-text-secondary hover:text-accent hover:underline hover:underline-offset-4 transition-colors"
        >
          All Projects
        </Link>

        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col sm:text-right"
          >
            <span className="text-xs uppercase tracking-wider text-text-secondary">
              Next
            </span>
            <span className="mt-1 font-display text-lg font-semibold text-text-primary group-hover:text-accent group-hover:underline group-hover:underline-offset-4 transition-colors">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
