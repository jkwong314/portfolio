import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Jamie",
  description:
    "From fine arts to digital product design — learn about my journey and passion for accessible design.",
};

const funFacts = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
    text: "[Placeholder] Studied oil painting for 6 years before touching a screen",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
        <path d="M8 2.5A10 10 0 0 0 2.5 8" />
        <path d="M16 2.5A10 10 0 0 1 21.5 8" />
        <path d="M8 21.5A10 10 0 0 1 2.5 16" />
        <path d="M16 21.5A10 10 0 0 0 21.5 16" />
      </svg>
    ),
    text: "[Placeholder] Certified in WCAG accessibility guidelines",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    text: "[Placeholder] Have designed for users in 12 countries",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" x2="6" y1="2" y2="4" />
        <line x1="10" x2="10" y1="2" y2="4" />
        <line x1="14" x2="14" y1="2" y2="4" />
      </svg>
    ),
    text: "[Placeholder] Fueled by oat milk lattes",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
    text: "[Placeholder] Currently reading: Inclusive Design Patterns",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
    text: "[Placeholder] Weekend hiker and landscape photographer",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28">
      {/* Hero / Intro */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <ScrollReveal>
          <h1
            className="font-display font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", letterSpacing: "-0.04em" }}
          >
            <span className="bg-gradient-to-r from-accent-light via-gold to-accent bg-clip-text text-transparent">
              The Story So Far
            </span>
          </h1>
        </ScrollReveal>

        <div className="mt-12 flex flex-col gap-12 md:flex-row md:items-start">
          {/* Photo placeholder */}
          <ScrollReveal delay={0.1} className="flex-shrink-0">
            <div
              className="relative h-72 w-72 overflow-hidden rounded-2xl md:h-80 md:w-80"
              style={{
                background: "linear-gradient(135deg, var(--color-accent-glow) 0%, var(--color-surface-light) 50%, var(--color-gold-glow) 100%)",
                boxShadow: "0 0 60px var(--color-accent-glow)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(circle at 30% 40%, var(--color-accent-glow) 0%, transparent 60%)" }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-sm text-text-muted">
                [Your photo here]
              </span>
            </div>
          </ScrollReveal>

          {/* Intro text */}
          <ScrollReveal delay={0.2} className="flex-1">
            <div className="space-y-6 text-lg leading-relaxed text-text-secondary">
              <p>
                [Placeholder] My journey into design started far from a screen — it
                started with charcoal on paper, paint on canvas, and hours spent
                studying how light, form, and composition shape the way we see the
                world. I studied fine arts for years, developing an intuition for
                visual storytelling that I carry into every digital product I touch.
              </p>
              <p>
                [Placeholder] The transition to digital wasn&apos;t a departure from art — it
                was an evolution. I realized that the same principles of hierarchy,
                contrast, rhythm, and balance that make a painting compelling are
                exactly what make a digital experience feel effortless. Product
                design became my medium for creating work that doesn&apos;t just hang on
                a wall — it lives in people&apos;s hands and solves real problems.
              </p>
              <p>
                [Placeholder] Today, as a UX/UI Designer at ALDO Group, I bring that
                artist&apos;s eye to every interaction, every flow, every pixel. I
                believe the best design is invisible — it just works, for everyone.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-surface py-16">
        <ScrollReveal>
          <blockquote className="mx-auto max-w-3xl px-6 text-center font-display text-2xl font-medium italic text-accent-light md:text-3xl">
            &ldquo;Design is not just what it looks like — it&apos;s how it works, and
            who it works for.&rdquo;
          </blockquote>
        </ScrollReveal>
      </section>

      {/* Accessible Design Passion */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl" style={{ letterSpacing: "-0.03em" }}>
            Design For Everyone
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-8 md:p-10">
            <div className="space-y-6 text-lg leading-relaxed text-text-secondary">
              <p>
                [Placeholder] Accessibility isn&apos;t a checklist item at the end of my
                process — it&apos;s the foundation. I believe that truly great design is
                universal: it works for the power user navigating with keyboard
                shortcuts and the first-time user relying on a screen reader. It
                works in bright sunlight and in dark mode. It works for people who
                think differently, move differently, and see differently.
              </p>
              <p>
                [Placeholder] This conviction comes from a simple truth I learned
                early: when you design for the edges, you improve the experience
                for everyone in the middle. Curb cuts help wheelchair users, but
                they also help parents with strollers, travelers with luggage, and
                delivery workers with carts. The same principle applies to digital
                design — accessible design is better design, period.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Fun Facts */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl" style={{ letterSpacing: "-0.03em" }}>
            Fun Facts
          </h2>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {funFacts.map((fact, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="group rounded-xl bg-surface p-6 transition-all duration-300 hover:bg-surface-light border border-surface-light hover:border-accent/30 hover:shadow-lg"
                style={{ "--tw-shadow-color": "var(--color-accent-glow)" } as React.CSSProperties}
              >
                <div className="text-text-muted transition-colors duration-300 group-hover:text-accent-light">
                  {fact.icon}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{fact.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
