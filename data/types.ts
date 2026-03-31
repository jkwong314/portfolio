export type CaseStudyTemplate = "deep-dive" | "focused" | "visual";

export interface CaseStudySection {
  type:
    | "text"
    | "image"
    | "image-grid"
    | "stat-block"
    | "pull-quote"
    | "before-after"
    | "text-image";
  heading?: string;
  body?: string;
  images?: string[];
  caption?: string;
  stats?: { value: string; label: string }[];
  quote?: string;
  layout?: "left" | "right" | "full";
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  heroImage: string;
  category: string;
  year: string;
  role: string;
  timeline: string;
  template: CaseStudyTemplate;
  sections: CaseStudySection[];
}
