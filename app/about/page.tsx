import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Jamie",
  description:
    "UX/UI and product designer passionate about making interfaces fully accessible to every user.",
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
    text: "York/Sheridan BDes Honours graduate",
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
    text: "Designing at ALDO Group since 2021",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    text: "Dreams of traveling while doing what I love",
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
    text: "Fueled by nail art, shopping, and Netflix binges",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
    text: "Listening to 88Rising, NIKI, Dean & IU on repeat",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
    text: "Valorant, League of Legends & Monster Hunter World player",
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
                I&apos;m a UX/UI and product designer with a passion for making
                interfaces fully accessible to every kind of user. With a Bachelor
                of Design (Honours) from the York/Sheridan joint program, I bring a
                human-centred approach to crafting designs that prioritize user needs
                and seamless experiences.
              </p>
              <p>
                There is a certain fulfillment that comes from executing an idea from
                conception to completion, and the design process is always an exciting
                journey. I&apos;m currently honing my proficiency in UX research
                methodologies and expanding my knowledge of user-centred design — always
                focusing on discovering and resolving the needs and wants of real users.
              </p>
              <p>
                Today, as a UX/UI Designer at ALDO Group, I spearhead design efforts
                across brands including Aldo, Call It Spring, Globo, and Sperry —
                increasing design efficiency by 300% through the transition to Figma
                and development of a headless design system. I&apos;m proficient in
                Figma, Framer, Sketch, and the Adobe Creative Cloud suite.
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
                Accessibility isn&apos;t a checklist item at the end of my process —
                it&apos;s the foundation. I believe that truly great design is
                universal: it works for the power user navigating with keyboard
                shortcuts and the first-time user relying on a screen reader. My
                goal is to assess and provide design solutions that always ensure
                the highest usability for any kind of user.
              </p>
              <p>
                I will always be finding new opportunities to showcase my highest
                efforts and make a difference in any given environment. I&apos;m
                flexible, I excel in both interpersonal and intrapersonal skills,
                and I&apos;m open to all types of design opportunities. It is my
                wish to become a part of the new generation of UX/UI designers and
                create the next world-changing design concept.
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
