# Portfolio Enhancement: Nav, Animations, Resume & WCAG

## Overview

Enhance the existing portfolio with a modern floating pill navigation bar (inspired by aelysa.ai), a new resume page, microinteractions/animations on all interactive elements, a contact form in the footer with icon-based social links, and a WCAG 2.2 AA compliance pass.

## Scope

1. **Floating pill nav bar** — replace current Nav with centered floating pill design + placeholder geometric logo + "Resume" CTA button
2. **Resume page** — new `/resume` route with PDF embed and download button
3. **Microinteractions** — AnimatedButton component, nav link animations, enhanced card hovers, icon hovers, scroll reveal blur transition
4. **Footer redesign** — contact form + icon-based social links
5. **WCAG 2.2 AA pass** — contrast, focus management, semantics, motion, form accessibility, skip link

---

## 1. Floating Pill Nav Bar

### Layout
- Fixed position, centered horizontally with `max-w-3xl` and horizontal margin
- Pill shape: fully rounded (`rounded-full`), `bg-surface/80` with `backdrop-blur-lg`
- Subtle border: `border border-white/5`
- Always visually distinct (no transparent-to-solid transition)
- On scroll past 50px: gains `shadow-lg shadow-black/20` for depth

### Content (left to right)
- **Logo:** ~32px violet geometric diamond shape (SVG), links to `/`
- **Nav links (centered):** Work | About — evenly spaced
  - Default: `text-secondary`
  - Hover: `text-primary` with underline slide-in from left animation
  - Active page: underlined in accent color
- **CTA button (right):** "Resume" — filled accent pill button linking to `/resume`
  - Uses AnimatedButton component (magnetic hover + scale + glow)

### Mobile
- Pill shrinks to logo + hamburger button
- Full-screen overlay menu on open
- Large centered links with staggered fade-in
- Hamburger morphs to X on open
- Focus trapped inside open menu, returns to hamburger on close

---

## 2. AnimatedButton Component

Shared component used for nav CTA, contact form submit, and any future CTAs.

### Props
```ts
interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;        // renders as Link if provided
  onClick?: () => void; // renders as button if provided
  variant?: "filled" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: React.ReactNode;
}
```

### Animations
- **Magnetic hover:** button shifts position toward cursor within ~40px radius
- **Scale + glow:** hover scales to 1.05, gains `shadow-lg shadow-accent/30`
- **Press feedback:** click scales to 0.97 then springs back (Framer Motion spring)
- **Ripple effect:** radial gradient expands from click point, fades out

All animations disabled when `prefers-reduced-motion: reduce`.

---

## 3. Microinteractions on Existing Elements

### Nav link hover
- Underline slides in from left on hover, slides out to right on leave
- CSS `::after` pseudo-element with `scaleX` transform

### Case study cards
- Keep existing scale(1.02) + glow
- Add: subtle parallax shift on mouse move (image area shifts opposite to cursor, ~3px range)
- Category tag slides in from left on hover

### Footer social icons
- Scale to 1.2 on hover
- Color transitions to accent
- Subtle 5deg rotation

### Scroll reveal enhancement
- Add `blur-sm` to `blur-0` transition alongside existing fade-up
- Applied in existing ScrollReveal component

---

## 4. Footer Redesign

### Contact Form Section
- Sits above the bottom bar, separated by divider
- Heading: "Get in Touch" (display font)
- Subtext: "Have a project in mind? Let's chat." (text-secondary)
- Fields (stacked vertically):
  - Name — `<input type="text">` with visible `<label>`
  - Email — `<input type="email">` with visible `<label>`
  - Message — `<textarea>` with visible `<label>`
- Field styling: `bg-surface` background, `border border-surface-light`, `rounded-xl`, accent border on focus
- Submit: AnimatedButton with "Send Message"
- Client-side only — no backend. On submit:
  - Button morphs to checkmark animation
  - Success message: "Thanks! I'll be in touch." via `aria-live="polite"` region
  - Form resets after 3 seconds

### Validation
- Required fields: all three
- Email format validation
- Error states: red border + error message below field with `role="alert"` and `aria-describedby`
- Focus moves to first errored field on submit

### Bottom Bar
- Left: "Designed & built by Jamie"
- Right: SVG icons for LinkedIn, Dribbble, Email (no text labels)
- Each icon has `aria-label` for accessibility
- Hover: scale 1.2 + accent color fill + 5deg rotation

### Responsive
- Form fields full-width on mobile
- Bottom bar stacks centered on mobile

---

## 5. Resume Page

### Route
`/resume`

### Layout
- `pt-28` to clear floating nav
- Centered content: `max-w-4xl`
- Heading: "Resume" (display font)
- Subtitle: "Download or view my full resume below" (text-secondary)
- Download button: AnimatedButton with "Download PDF" + download icon
- PDF embed: `<object>` element displaying `/resume.pdf`
  - Styled: rounded corners, surface border, aspect ratio ~letter (8.5:11)
  - `title` attribute for screen readers
  - Fallback: link to download if embed fails
- Placeholder state: when no PDF exists, shows styled card with "[Upload your resume PDF to public/resume.pdf]"

### Mobile
- Download button prominently displayed
- Note: "View on desktop for inline preview" below the embed area
- PDF embed hidden on small screens (`hidden md:block`), download button always visible

### Metadata
- Title: "Resume | Jamie"
- Description: "View or download Jamie's resume"

---

## 6. WCAG 2.2 AA Compliance

### Color Contrast
- text-primary (#FAFAFA) on base (#0D0D0D): 19.4:1 — passes
- text-secondary (#A0A0A0) on base (#0D0D0D): 9.4:1 — passes
- accent (#8B5CF6) on base (#0D0D0D): 4.6:1 — passes for large text (18px+ bold or 24px+)
- For small accent text: use accent-light (#A78BFA): 6.1:1 — passes
- Form error text: use a red that meets 4.5:1 on surface (#1A1A1A)

### Focus Management
- All interactive elements have visible `focus-visible` rings (accent color, 2px, 2px offset)
- Mobile menu: focus trap when open, return focus to trigger on close
- Contact form: focus moves to first errored field on validation failure
- Skip-to-content link: first focusable element in DOM, visually hidden until focused, jumps to `<main>`

### Semantic HTML
- `<nav aria-label="Main navigation">` on the nav bar
- `<form aria-label="Contact form">` with proper `<label>` for each field
- `aria-required="true"` on required form fields
- Error messages linked via `aria-describedby`
- Success message via `aria-live="polite"` region
- Resume PDF `<object>` has `title` attribute
- Proper heading hierarchy maintained across all pages

### Motion
- All Framer Motion animations check `prefers-reduced-motion`
- Magnetic hover, ripple, parallax — all disabled when reduced motion preferred
- Existing `globals.css` rule covers CSS-based animations
- AnimatedButton falls back to simple hover color change when motion reduced

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `components/Nav.tsx` | Rewrite | Floating pill nav with logo and CTA |
| `components/AnimatedButton.tsx` | Create | Shared animated button component |
| `components/Footer.tsx` | Rewrite | Contact form + icon social links |
| `components/ContactForm.tsx` | Create | Contact form with validation |
| `components/ScrollReveal.tsx` | Modify | Add blur transition |
| `components/CaseStudyCard.tsx` | Modify | Add parallax + tag slide |
| `app/resume/page.tsx` | Create | Resume page with PDF embed |
| `app/layout.tsx` | Modify | Add skip-to-content link |
| `app/globals.css` | Modify | Skip link styles, form error styles |
| `public/resume.pdf` | Placeholder | User uploads their PDF here |
