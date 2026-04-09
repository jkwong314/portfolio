import { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "project-silhouette",
    title: "Project Silhouette",
    subtitle: "Architecting a headless design system for the ALDO Group portfolio — three brands unified, a fourth acquired in 93% less time.",
    thumbnail: "/images/case-study-1-thumb.jpg",
    heroImage: "/images/case-study-1-hero.jpg",
    category: "Design Systems",
    year: "2025",
    role: "Lead Designer",
    timeline: "Aug 2024 – Feb 2025",
    template: "deep-dive",
    sections: [],
  },
  {
    slug: "aldo-cart-redesign",
    title: "Reimagining the ALDO Cart",
    subtitle: "Optimizing a multi-brand e-commerce ecosystem for conversion and clarity — turning a 61.1% abandonment rate into a streamlined path to checkout.",
    thumbnail: "/images/case-study-2-thumb.jpg",
    heroImage: "/images/case-study-2-hero.jpg",
    category: "E-Commerce",
    year: "2025",
    role: "Lead Product Designer",
    timeline: "May 2023 – Oct 2025",
    template: "deep-dive",
    sections: [],
  },
  {
    slug: "onboarding-flow-redesign",
    title: "Onboarding Flow Redesign",
    subtitle: "Turning first-time users into power users in 5 minutes",
    thumbnail: "/images/case-study-3-thumb.jpg",
    heroImage: "/images/case-study-3-hero.jpg",
    category: "SaaS Product",
    year: "2024",
    role: "Product Designer",
    timeline: "8 weeks",
    template: "focused",
    sections: [
      {
        type: "text",
        heading: "Overview",
        body: "[Placeholder] The existing onboarding had a 35% completion rate and took an average of 12 minutes. Users were overwhelmed by feature explanations before they could see value. I redesigned it around a 'value-first' approach — getting users to their first success moment in under 2 minutes.",
      },
      {
        type: "text-image",
        heading: "Mapping the Drop-off",
        body: "[Placeholder] Analytics revealed three major drop-off points: account setup (too many required fields), workspace configuration (too many options), and the tutorial (too long, not interactive). I redesigned each around progressive disclosure — show only what's needed now, reveal the rest later.",
        images: ["/images/case-study-3-funnel.jpg"],
        layout: "right",
      },
      {
        type: "text-image",
        heading: "The Value-First Approach",
        body: "[Placeholder] Instead of explaining features, the new flow drops users into a pre-populated workspace where they can immediately interact with the product. Contextual tooltips replace the tutorial. Account details are collected after the user has experienced value, not before.",
        images: ["/images/case-study-3-flow.jpg"],
        layout: "left",
      },
      {
        type: "image",
        heading: "Final Screens",
        images: ["/images/case-study-3-final.jpg"],
        caption: "[Placeholder] The redesigned onboarding experience",
      },
      {
        type: "stat-block",
        heading: "Impact",
        stats: [
          { value: "72%", label: "Onboarding completion rate" },
          { value: "< 2 min", label: "Time to first value" },
          { value: "3x", label: "Day-7 retention improvement" },
        ],
      },
    ],
  },
  {
    slug: "brand-identity-digital-presence",
    title: "Brand Identity & Digital Presence",
    subtitle: "Crafting a visual language from the ground up",
    thumbnail: "/images/case-study-4-thumb.jpg",
    heroImage: "/images/case-study-4-hero.jpg",
    category: "Branding",
    year: "2023",
    role: "Lead Designer",
    timeline: "10 weeks",
    template: "visual",
    sections: [
      {
        type: "text",
        heading: "Brief Context",
        body: "[Placeholder] A health-tech startup needed a complete brand identity and web presence before their Series A fundraise. I designed the logo, color system, typography, illustration style, and a responsive marketing site — all grounded in accessibility and warmth.",
      },
      {
        type: "image",
        images: ["/images/case-study-4-brand-1.jpg"],
        caption: "[Placeholder] Logo exploration and final mark",
      },
      {
        type: "image",
        images: ["/images/case-study-4-brand-2.jpg"],
        caption: "[Placeholder] Color system and typography scale",
      },
      {
        type: "image",
        images: ["/images/case-study-4-brand-3.jpg"],
        caption: "[Placeholder] Illustration style and iconography",
      },
      {
        type: "image",
        images: ["/images/case-study-4-brand-4.jpg"],
        caption: "[Placeholder] Responsive marketing site — desktop and mobile",
      },
      {
        type: "stat-block",
        heading: "Outcome",
        stats: [
          { value: "$4.2M", label: "Series A raised post-launch" },
          { value: "100%", label: "WCAG AA compliance" },
        ],
      },
    ],
  },
  {
    slug: "accessibility-audit-redesign",
    title: "Accessibility Audit & Redesign",
    subtitle: "Making a government services portal usable for everyone",
    thumbnail: "/images/case-study-5-thumb.jpg",
    heroImage: "/images/case-study-5-hero.jpg",
    category: "Web App",
    year: "2023",
    role: "Accessibility Lead",
    timeline: "14 weeks",
    template: "visual",
    sections: [
      {
        type: "text",
        heading: "Brief Context",
        body: "[Placeholder] A government services portal serving 2M+ users had 47 WCAG violations and was functionally unusable with assistive technology. I led an accessibility audit and redesign that achieved full WCAG AA compliance while improving usability scores for all users, not just those with disabilities.",
      },
      {
        type: "image",
        images: ["/images/case-study-5-audit.jpg"],
        caption: "[Placeholder] Accessibility audit findings mapped by severity",
      },
      {
        type: "image",
        images: ["/images/case-study-5-before-after.jpg"],
        caption: "[Placeholder] Before and after — form redesign with proper labeling, contrast, and focus states",
      },
      {
        type: "image",
        images: ["/images/case-study-5-components.jpg"],
        caption: "[Placeholder] Accessible component patterns developed for the portal",
      },
      {
        type: "image",
        images: ["/images/case-study-5-testing.jpg"],
        caption: "[Placeholder] Usability testing sessions with assistive technology users",
      },
      {
        type: "stat-block",
        heading: "Outcome",
        stats: [
          { value: "0", label: "WCAG AA violations (down from 47)" },
          { value: "100%", label: "Screen reader task completion" },
          { value: "34%", label: "Faster task completion for all users" },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllSlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}
