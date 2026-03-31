"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import ScrollReveal from "./ScrollReveal";

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308a10.174 10.174 0 004.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4a10.143 10.143 0 006.29 2.166c1.42 0 2.77-.29 4.006-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zm7.56-7.872c.282.386 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702A10.15 10.15 0 0012 1.756c-.653 0-1.29.07-1.907.182zm10.14 3.54c-.225.303-1.905 2.483-5.692 4.012.26.525.507 1.06.742 1.6.083.18.166.36.245.54 3.457-.436 6.887.27 7.23.34a10.138 10.138 0 00-2.525-6.49z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@jamie.design",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-light bg-base">
      {/* Contact Form Section */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-3 text-text-secondary">
              Have a project in mind? Let&apos;s chat.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10">
            <ContactForm />
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-surface-light">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-8 md:flex-row md:justify-between">
          <p className="text-sm text-text-secondary">
            Designed &amp; built by Jamie
          </p>
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  social.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="flex items-center justify-center min-w-[44px] min-h-[44px] text-text-secondary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-lg"
                aria-label={social.label}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <span aria-hidden="true">{social.icon}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
