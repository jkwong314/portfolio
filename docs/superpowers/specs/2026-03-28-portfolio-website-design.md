# Jamie — Senior Product Designer Portfolio Website

## Overview

A bold, expressive portfolio website for Jamie, a UX/UI Designer at ALDO Group. The site positions Jamie as an impact-driven product designer who turns complex challenges into intuitive, accessible experiences. The visual tone is dark and premium with vivid purple/violet accents — reflecting a fine arts background brought into the digital space.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (scroll animations, page transitions)
- **Data:** Local TypeScript data file (no CMS)
- **Deployment:** TBD (Vercel recommended)

## Project Structure

```
app/
  layout.tsx            ← shared nav + footer, dark theme globals
  page.tsx              ← homepage
  work/
    [slug]/
      page.tsx          ← case study detail page (dynamic route)
  about/
    page.tsx            ← about me page
data/
  caseStudies.ts        ← array of case study objects
components/
  Nav.tsx
  Footer.tsx
  Hero.tsx
  CaseStudyCard.tsx
  CaseStudySection.tsx  ← reusable section blocks for detail pages
  TransitionWrapper.tsx ← Framer Motion page transitions
public/
  images/               ← case study thumbnails, hero assets, about photos
```

## Routes

| Path | Page |
|------|------|
| `/` | Homepage |
| `/work/[slug]` | Case study detail |
| `/about` | About me |

## Design System

### Color Palette

- **Base:** Dark charcoal (#0D0D0D or similar)
- **Surface:** Slightly lighter dark (#1A1A1A) for cards/sections
- **Text primary:** White (#FAFAFA)
- **Text secondary:** Muted gray (#A0A0A0)
- **Accent:** Vivid purple/violet (#8B5CF6) for highlights, hover states, gradients
- **Accent secondary:** Lighter violet (#A78BFA) for gradients and glows

### Typography

- Bold, expressive display font for headings (large scale)
- Clean sans-serif for body text
- Pull-quote style for highlighted statements (large accent-colored type)

### Motion

- Framer Motion page transitions (fade/slide between routes)
- Scroll-triggered fade-up animations (staggered for grids)
- Hover effects on cards (scale + purple glow/overlay)
- Subtle animated hero element (gradient orb, particle field, or abstract shape)

---

## Pages

### 1. Homepage

#### Nav Bar
- Fixed top position, transparent over hero
- Transitions to solid dark background on scroll
- Left: "Jamie" (logo/wordmark)
- Right: "Work" | "About"

#### Hero Section
- Full viewport height
- Dark background (#0D0D0D)
- Oversized display type: "Jamie" — with violet gradient or glow effect
- Subtitle: "UX/UI Designer at ALDO Group"
- Intro statement: "I turn complex challenges into intuitive, accessible experiences."
- Subtle animated background element in purple/violet tones
- Scroll indicator at bottom (animated down-arrow or "See my work")

#### Case Study Grid
- Section heading: "Selected Work"
- 5 cards in an asymmetric grid:
  - Row 1: large (60%) + medium (40%)
  - Row 2: medium (40%) + large (60%)
  - Row 3: full-width
- Each card displays:
  - Thumbnail image (placeholder)
  - Project title
  - Category tag (e.g. "Mobile App", "Web Platform")
- Hover: slight scale + purple overlay tint or border glow
- Cards link to `/work/[slug]`
- Staggered fade-up animation on scroll

#### Footer
- Dark, minimal
- Social links: LinkedIn, email, Dribbble/Behance
- Credit line: "Designed & built by Jamie"
- Shared across all pages via layout

---

### 2. Case Study Detail Page

Dynamic route `/work/[slug]` renders one of three templates based on the case study's `template` field.

#### Data Model

```ts
type CaseStudyTemplate = "deep-dive" | "focused" | "visual"

interface CaseStudySection {
  type: "text" | "image" | "image-grid" | "stat-block" | "pull-quote" | "before-after" | "text-image"
  heading?: string
  body?: string
  images?: string[]
  stats?: { value: string; label: string }[]
  quote?: string
  layout?: "left" | "right" | "full"
}

interface CaseStudy {
  slug: string
  title: string
  subtitle: string
  thumbnail: string
  heroImage: string
  category: string
  year: string
  role: string
  timeline: string
  template: CaseStudyTemplate
  sections: CaseStudySection[]
}
```

#### Template A: Deep-Dive (Case Study 1)

Full storytelling arc:

1. **Hero banner** — full-width image/color block, title, subtitle, role, timeline, category
2. **Overview** — brief paragraph on the problem and your role
3. **The Challenge** — problem context, who was affected, business stakes
4. **Research & Discovery** — methods, key findings, data callouts in large accent type
5. **Defining the Problem** — personas, journey maps, problem statements with artifact images
6. **Ideation & Exploration** — sketches, wireframes, early concepts in gallery grid
7. **Design & Iteration** — high-fidelity designs, before/after, key decisions. Full-bleed mockups.
8. **Usability Testing** — what was tested, findings, iteration based on feedback
9. **Final Design** — polished screens/flows, large showcase images
10. **Results & Impact** — metrics as large stat blocks (e.g. "40% increase in task completion")
11. **Reflection** — lessons learned, what you'd do differently

Sections alternate text-left/image-right and full-bleed visuals. Purple accent dividers between sections.

#### Template B: Focused Narrative (Case Studies 2-3)

Streamlined:

1. **Hero banner** — same structure as Template A
2. **Overview** — problem + role in 2-3 sentences
3. **Process Highlights** — 2-3 key moments, each as text + large image pair
4. **Solution** — final designs with brief context
5. **Impact** — results/metrics as stat blocks

#### Template C: Visual-Heavy (Case Studies 4-5)

Minimal text, maximum visuals:

1. **Hero banner** — same structure as Template A
2. **Brief context** — 3-4 sentences covering problem and role
3. **Visual showcase** — large full-bleed images in sequence with short captions
4. **Outcome** — one stat block or closing statement

#### Shared Across Templates
- "Next project" / "Previous project" navigation at bottom
- Back to work link
- Scroll animations on section entry
- All content is placeholder, clearly marked for swapping

---

### 3. About Me Page

#### Hero/Intro Section
- Dark background consistent with site
- Large heading (e.g. "The Story So Far")
- Photo placeholder positioned alongside intro text

#### Background Story
- 2-3 paragraphs covering the transition from traditional fine arts to digital design:
  - Roots in fine arts (painting, drawing, visual composition)
  - How those fundamentals translate to digital — layout, hierarchy, color theory, storytelling
  - Product design as the medium where art meets problem-solving
- Mix of body text and pull-quote callouts in large violet accent type
- Subtle visual divider or timeline element marking the transition

#### Accessible Design Passion
- Section heading: "Design For Everyone"
- 1-2 paragraphs on commitment to universal/accessible design:
  - Why accessibility matters personally
  - How it's integrated into the design process from the start (not an afterthought)
  - Great design is inclusive by default
- Accent-colored highlight block or sidebar to emphasize this as a core value

#### Fun Facts
- 4-6 fun fact items with small icons
- Styled as cards or horizontal strip to break vertical rhythm
- Lighter, playful tone — personality reveal
- All placeholder content for user to replace

---

## Placeholder Content

All 5 case studies will ship with placeholder content:

| # | Placeholder Title | Template | Category |
|---|-------------------|----------|----------|
| 1 | "Reimagining the Checkout Experience" | deep-dive | Mobile App |
| 2 | "Design System at Scale" | focused | Web Platform |
| 3 | "Onboarding Flow Redesign" | focused | SaaS Product |
| 4 | "Brand Identity & Digital Presence" | visual | Branding |
| 5 | "Accessibility Audit & Redesign" | visual | Web App |

Each includes clearly-marked placeholder text and image slots for easy replacement.

## Accessibility

- Semantic HTML throughout
- WCAG AA color contrast on dark backgrounds
- Focus-visible states for keyboard navigation
- Alt text placeholders for all images
- Reduced-motion media query to disable animations for users who prefer it
- Proper heading hierarchy (h1 > h2 > h3)

## Responsive Design

- Mobile-first approach
- Breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
- Case study grid stacks to single column on mobile
- Nav collapses to hamburger menu on mobile
- Hero text scales down appropriately
- Full-bleed images remain full-width across all breakpoints
