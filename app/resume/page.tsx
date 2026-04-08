import ScrollReveal from "@/components/ScrollReveal";
import AnimatedButton from "@/components/AnimatedButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Jamie",
  description: "View or download Jamie's resume.",
};

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function ResumePage() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <ScrollReveal>
          <h1 className="font-display text-5xl font-bold text-text-primary md:text-6xl">
            Resume
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            View or download my resume.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-4">
            <AnimatedButton
              href="/Jamie_Kwong_Resume_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="filled"
              icon={<ExternalIcon />}
            >
              View Full Screen
            </AnimatedButton>
            <AnimatedButton
              href="/Jamie_Kwong_Resume_2026.pdf"
              download="Jamie_Kwong_Resume_2026.pdf"
              variant="outline"
              icon={<DownloadIcon />}
            >
              Download PDF
            </AnimatedButton>
          </div>
        </ScrollReveal>

        {/* PDF preview */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 hidden md:block">
            <div className="overflow-hidden rounded-2xl border border-surface-light bg-surface">
              <object
                data="/Jamie_Kwong_Resume_2026.pdf"
                type="application/pdf"
                width="100%"
                className="h-[85vh] w-full"
                title="Jamie Kwong Resume 2026"
              >
                <div className="flex h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
                  <p className="text-text-secondary">
                    Unable to display PDF inline. Use the buttons above to view or download.
                  </p>
                </div>
              </object>
            </div>
          </div>

          <div className="mt-8 md:hidden">
            <div className="rounded-xl border border-surface-light bg-surface p-6 text-center">
              <p className="text-text-secondary">
                View on desktop for inline preview, or use the buttons above.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
