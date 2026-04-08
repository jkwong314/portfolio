"use client";

import { useTheme } from "@/components/ThemeProvider";

/**
 * Fixed-position ambient gradient layer — always covers the viewport
 * regardless of scroll position, so no section seams or background lines appear.
 * Also renders subtle left/right edge glows globally.
 */
export default function AmbientBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const edgeMask =
    "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)";

  return (
    <>
      {/* Corner/quadrant ambient gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: isDark
            ? [
                "radial-gradient(ellipse 60% 55% at -5% -8%,  rgba(124,58,237,0.22) 0%, transparent 70%)",
                "radial-gradient(ellipse 55% 50% at 108% 108%, rgba(201,168,76,0.18) 0%, transparent 70%)",
                "radial-gradient(ellipse 45% 42% at 95% 38%,  rgba(6,182,212,0.10) 0%, transparent 70%)",
                "radial-gradient(ellipse 42% 36% at 8%  80%,  rgba(236,72,153,0.09) 0%, transparent 70%)",
              ].join(", ")
            : [
                "radial-gradient(ellipse 60% 55% at -5% -8%,  rgba(109,40,217,0.10) 0%, transparent 70%)",
                "radial-gradient(ellipse 55% 50% at 108% 108%, rgba(146,103,10,0.08) 0%, transparent 70%)",
                "radial-gradient(ellipse 45% 42% at 95% 38%,  rgba(6,182,212,0.06) 0%, transparent 70%)",
                "radial-gradient(ellipse 42% 36% at 8%  80%,  rgba(236,72,153,0.05) 0%, transparent 70%)",
              ].join(", "),
        }}
      />

      {/* Left edge glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 h-full"
        style={{
          width: "clamp(100px, 16vw, 260px)",
          background: isDark
            ? [
                "radial-gradient(ellipse 100% 38% at 0% 32%, rgba(124,58,237,0.16) 0%, transparent 80%)",
                "radial-gradient(ellipse 100% 38% at 0% 68%, rgba(236,72,153,0.12) 0%, transparent 80%)",
              ].join(", ")
            : [
                "radial-gradient(ellipse 100% 38% at 0% 32%, rgba(109,40,217,0.07) 0%, transparent 80%)",
                "radial-gradient(ellipse 100% 38% at 0% 68%, rgba(236,72,153,0.05) 0%, transparent 80%)",
              ].join(", "),
          maskImage: edgeMask,
          WebkitMaskImage: edgeMask,
        }}
      />

      {/* Right edge glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-0 z-0 h-full"
        style={{
          width: "clamp(100px, 16vw, 260px)",
          background: isDark
            ? [
                "radial-gradient(ellipse 100% 38% at 100% 32%, rgba(236,72,153,0.16) 0%, transparent 80%)",
                "radial-gradient(ellipse 100% 38% at 100% 68%, rgba(124,58,237,0.12) 0%, transparent 80%)",
              ].join(", ")
            : [
                "radial-gradient(ellipse 100% 38% at 100% 32%, rgba(236,72,153,0.07) 0%, transparent 80%)",
                "radial-gradient(ellipse 100% 38% at 100% 68%, rgba(109,40,217,0.05) 0%, transparent 80%)",
              ].join(", "),
          maskImage: edgeMask,
          WebkitMaskImage: edgeMask,
        }}
      />
    </>
  );
}
