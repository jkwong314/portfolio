import ScrollReveal from "@/components/ScrollReveal";
import FlipWords from "@/components/FlipWords";
import ParallaxImage from "@/components/ParallaxImage";
import Timeline from "@/components/Timeline";
import type { TimelineItem } from "@/components/Timeline";
import BentoGrid from "@/components/BentoGrid";
import type { BentoItem } from "@/components/BentoGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Jamie",
  description:
    "UX/UI and product designer passionate about making interfaces fully accessible to every user.",
};

const careerTimeline: TimelineItem[] = [
  {
    year: "Sep 2024 – Present",
    title: "UX/UI Designer",
    company: "ALDO Group",
    description:
      "Spearheading UX/UI projects for Aldo, Call It Spring, Globo, and Sperry. Increased design efficiency by 300% through Figma migration and a headless design system. Led the design of a B2B expense management platform for internal teams.",
  },
  {
    year: "Jun 2022 – Sep 2024",
    title: "Associate UX/UI Designer",
    company: "ALDO Group",
    description:
      "Built component libraries and design token systems. Prototyped end-to-end feature experiences for user testing using Framer, Principle, and UXPin. Collaborated with PMs and engineers on final design implementations.",
  },
  {
    year: "Jul 2022 – Oct 2022",
    title: "Design Consultant",
    company: "Rally Cry",
    description:
      "Led design optimizations for the Rally Cry platform with a focus on user accessibility. Created visual graphics for brand promotion and designed content connecting eSports gaming communities.",
  },
  {
    year: "Jul 2021 – Jun 2022",
    title: "UX/UI Design Intern",
    company: "ALDO Group",
    description:
      "Tackled UX solutions for all company brand eCommerce sites. Built the brand style guide and components library on Sketch. Composed a UX Playbook and conducted user testing sessions.",
  },
  {
    year: "Jan 2021 – Aug 2021",
    title: "Creative & Website Designer",
    company: "YES Cafe",
    description:
      "Conceptualized a comprehensive UI/UX design strategy for online food ordering and event booking on Square CMS. Built brand assets and conducted weekly UI testing and refinements.",
  },
  {
    year: "Sep 2016 – Sep 2020",
    title: "Freelance Graphic Designer",
    company: "Self-Employed",
    description:
      "Designed commissioned pieces for clients in the GTA area, including work for non-profit organizations and custom card templates for BHP (Business with Higher Purpose).",
  },
];

const funFacts: BentoItem[] = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      </svg>
    ),
    text: "Lifelong maker — never afraid to get my hands dirty to see a project through to the end",
    size: "lg",
    image: "/images/about-design.jpg",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
    text: "Newest hobby — vibe coding and building things I never thought I could ship",
    size: "sm",
    image: "/images/about-bouldering.jpg",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    text: "Listening to Trivecta, Seven Lions, aespa & Jennie on repeat",
    size: "sm",
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
    text: "Early 2000s karaoke queen — my go-to strategy for team bonding",
    size: "md",
    image: "/images/about-karaoke.jpg",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M12 12h.01" />
        <path d="M17 12h.01" />
        <path d="M7 12h.01" />
      </svg>
    ),
    text: "Teamfight Tactics, Hearthstone & Super Auto Pets player",
    size: "sm",
    image: "/images/about-gaming.jpg",
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
    size: "sm",
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
            <span className="text-text-primary">I am a </span>
            <FlipWords words={["designer", "creator", "builder", "maker"]} />
          </h1>
        </ScrollReveal>

        <div className="mt-12 flex flex-col gap-12 md:flex-row md:items-start">
          {/* Photo placeholder */}
          <ScrollReveal delay={0.1} className="flex-shrink-0">
            <ParallaxImage
              src="/images/about-portrait.jpg"
              alt="Jamie Kwong"
              sizes="(max-width: 768px) 288px, 320px"
              priority
              className="relative h-72 w-72 rounded-2xl md:h-80 md:w-80"
              containerStyle={{ boxShadow: "0 0 60px var(--color-accent-glow)" }}
            />
          </ScrollReveal>

          {/* Intro text */}
          <ScrollReveal delay={0.2} className="flex-1">
            <div className="space-y-6 text-lg leading-relaxed text-text-secondary">
              <p>
                I&apos;m a multifaceted product designer who believes that the best
                solutions are born at the intersection of empathy and data. My
                mission is simple: to create all-inclusive designs that make users
                feel seen, heard, and valued.
              </p>
              <p>
                I treat every design challenge like a bouldering route — analyzing
                the problem, testing the grip, and finding the most efficient path
                to the goal. Whether I&apos;m crafting a complex user flow or a
                hands-on DIY project, I lead with curiosity and a drive to deliver
                holistic end-to-end experiences.
              </p>
              <p>
                With a Bachelor of Design (Honours) from the York/Sheridan joint
                program, I bring a human-centred approach to every product I touch —
                currently as a UX/UI Designer at ALDO Group, where I&apos;ve
                increased design efficiency by 300% through Figma migration and
                the development of a headless design system.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-surface py-16">
        <ScrollReveal>
          <blockquote className="mx-auto max-w-3xl px-6 text-center font-display text-2xl font-medium italic text-accent-light md:text-3xl">
            &ldquo;The best solutions are born at the intersection of empathy and
            data — design that makes users feel seen, heard, and valued.&rdquo;
          </blockquote>
        </ScrollReveal>
      </section>

      {/* Career Journey Timeline */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl" style={{ letterSpacing: "-0.03em" }}>
            The Journey
          </h2>
          <p className="mt-3 text-text-secondary">
            From freelance roots to leading design at a global brand.
          </p>
        </ScrollReveal>

        <div className="mt-12 ml-2.5">
          <Timeline items={careerTimeline} />
        </div>
      </section>

      {/* Design Philosophy */}
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
                I&apos;m always finding new opportunities to make a difference in
                any given environment. I&apos;m proficient in Figma, Framer,
                Sketch, Principle, UXPin, and the Adobe Creative Suite — and I
                bring that same flexibility to collaboration, excelling across
                cross-functional teams with PMs, engineers, and stakeholders.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Fun Facts — Bento Grid */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl" style={{ letterSpacing: "-0.03em" }}>
            Beyond the Pixels
          </h2>
          <p className="mt-3 text-text-secondary">
            A few things you won&apos;t find on my resume.
          </p>
        </ScrollReveal>

        <BentoGrid items={funFacts} />
      </section>
    </div>
  );
}
