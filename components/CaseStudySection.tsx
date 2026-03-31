"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import type { CaseStudySection as SectionType } from "@/data/types";

interface Props {
  section: SectionType;
  id?: string;
}

function SectionImage({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={`rounded-xl bg-gradient-to-br from-surface-light to-surface ${className}`}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 to-accent-light/5" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover rounded-xl ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
    />
  );
}

function TextBlock({ section }: Props) {
  return (
    <div className="mx-auto max-w-4xl">
      {section.heading && (
        <h2 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
          {section.heading}
        </h2>
      )}
      {section.body && (
        <p className="mt-4 text-lg leading-relaxed text-text-secondary">
          {section.body}
        </p>
      )}
    </div>
  );
}

function ImageBlock({ section }: Props) {
  const imageSrc = section.images?.[0];
  return (
    <div className="mx-auto max-w-5xl">
      {section.heading && (
        <h2 className="mx-auto mb-6 max-w-4xl font-display text-2xl font-bold text-text-primary md:text-3xl">
          {section.heading}
        </h2>
      )}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <SectionImage src={imageSrc} alt={section.heading || "Case study image"} />
      </div>
      {section.caption && (
        <p className="mt-3 text-center text-sm text-text-secondary">
          {section.caption}
        </p>
      )}
    </div>
  );
}

function ImageGridBlock({ section }: Props) {
  return (
    <div className="mx-auto max-w-5xl">
      {section.heading && (
        <h2 className="mb-4 font-display text-2xl font-bold text-text-primary md:text-3xl">
          {section.heading}
        </h2>
      )}
      {section.body && (
        <p className="mb-6 text-lg leading-relaxed text-text-secondary">
          {section.body}
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(section.images || []).map((img, i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
            <SectionImage src={img} alt={`${section.heading || "Gallery"} ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatBlock({ section }: Props) {
  return (
    <div className="mx-auto max-w-4xl">
      {section.heading && (
        <h2 className="mb-8 text-center font-display text-2xl font-bold text-text-primary md:text-3xl">
          {section.heading}
        </h2>
      )}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {(section.stats || []).map((stat, i) => (
          <div key={i} className="text-center rounded-xl bg-surface border border-surface-light p-6 hover:border-accent/30 transition-colors">
            <span className="block font-display text-4xl font-bold bg-gradient-to-r from-accent to-accent-hot bg-clip-text text-transparent md:text-5xl">
              {stat.value}
            </span>
            <span className="mt-2 block text-sm text-text-secondary">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PullQuote({ section }: Props) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <blockquote className="font-display text-2xl font-medium italic text-accent-light md:text-3xl">
        &ldquo;{section.quote}&rdquo;
      </blockquote>
    </div>
  );
}

function BeforeAfter({ section }: Props) {
  const images = section.images || [];
  return (
    <div className="mx-auto max-w-5xl">
      {section.heading && (
        <h2 className="mb-6 font-display text-2xl font-bold text-text-primary md:text-3xl">
          {section.heading}
        </h2>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <span className="mb-2 block text-sm font-medium text-text-secondary">
            Before
          </span>
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <SectionImage src={images[0]} alt="Before" />
          </div>
        </div>
        <div>
          <span className="mb-2 block text-sm font-medium text-text-secondary">
            After
          </span>
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <SectionImage src={images[1] || images[0]} alt="After" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TextImage({ section }: Props) {
  const isRight = section.layout !== "left";
  const imageSrc = section.images?.[0];
  return (
    <div className="mx-auto max-w-5xl">
      <div
        className={`flex flex-col gap-8 md:flex-row md:items-center ${
          isRight ? "" : "md:flex-row-reverse"
        }`}
      >
        <div className="flex-1">
          {section.heading && (
            <h2 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
              {section.heading}
            </h2>
          )}
          {section.body && (
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
              {section.body}
            </p>
          )}
        </div>
        <div className="flex-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <SectionImage src={imageSrc} alt={section.heading || "Section image"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudySection({ section, id }: Props) {
  const renderers: Record<string, React.FC<Props>> = {
    text: TextBlock,
    image: ImageBlock,
    "image-grid": ImageGridBlock,
    "stat-block": StatBlock,
    "pull-quote": PullQuote,
    "before-after": BeforeAfter,
    "text-image": TextImage,
  };

  const Renderer = renderers[section.type];
  if (!Renderer) return null;

  return (
    <ScrollReveal>
      <div id={id} className="py-12 md:py-16" style={id ? { scrollMarginTop: "80px" } : undefined}>
        <Renderer section={section} />
      </div>
    </ScrollReveal>
  );
}
