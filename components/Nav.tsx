"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

function Logo() {
  return (
    <Link href="/" aria-label="Jamie — Home" className="flex items-center gap-2.5 group">
      {/* Diamond mark */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-500 group-hover:rotate-90"
      >
        <rect
          x="9"
          y="1"
          width="11.3"
          height="11.3"
          rx="2"
          transform="rotate(45 9 1)"
          fill="#C9A84C"
        />
      </svg>
      {/* Wordmark */}
      <span
        className="font-display font-black text-text-primary leading-none tracking-tight transition-colors duration-300 group-hover:text-gold"
        style={{ fontSize: "1.1rem", letterSpacing: "-0.04em" }}
      >
        JK
      </span>
    </Link>
  );
}

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!mobileOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    first?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5">
      <motion.div
        className="flex w-full max-w-2xl items-center justify-between rounded-2xl px-5 py-3"
        animate={{
          backgroundColor: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg-default)",
          borderColor: scrolled ? "var(--nav-border-scrolled)" : "var(--nav-border-default)",
          boxShadow: scrolled ? "var(--nav-shadow-scrolled)" : "var(--nav-shadow-default)",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid transparent",
        }}
      >
        {/* Logo */}
        <Logo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2.5 text-sm font-medium transition-colors duration-200 rounded-lg ${
                isActive(link.href)
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary hover:underline hover:underline-offset-4"
              }`}
            >
              {/* Sliding background pill for active state */}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-active-bg"
                  className="absolute inset-0 rounded-lg bg-surface-light"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Desktop right — theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <AnimatedButton href="/resume" variant="filled">
            Resume
          </AnimatedButton>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            ref={hamburgerRef}
            className="flex flex-col items-center justify-center gap-1.5 min-w-[44px] min-h-[44px] p-3 rounded-lg hover:bg-surface-light transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              className="block h-px w-5 bg-text-primary origin-center"
              animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="block h-px w-5 bg-text-primary"
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px w-5 bg-text-primary origin-center"
              animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </button>
        </div>
      </motion.div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-base/97 md:hidden"
            style={{ backdropFilter: "blur(24px)" }}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 p-2 text-text-secondary hover:text-text-primary transition-colors"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Gold diamond at top */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="6" y="0.5" width="7.8" height="7.8" rx="1.5" transform="rotate(45 6 0.5)" fill="#C9A84C" opacity="0.6" />
              </svg>
            </div>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  className="font-display font-black text-text-primary hover:text-gold transition-colors duration-200"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", letterSpacing: "-0.04em" }}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + navLinks.length * 0.08 }}
            >
              <AnimatedButton href="/resume" variant="filled" className="text-base px-8 py-3">
                Resume
              </AnimatedButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
