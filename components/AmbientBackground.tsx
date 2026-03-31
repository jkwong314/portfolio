"use client";

import { useTheme } from "@/components/ThemeProvider";

/**
 * Fixed-position ambient gradient layer — always covers the viewport
 * regardless of scroll position, so no section seams or background lines appear.
 */
export default function AmbientBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
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
  );
}
