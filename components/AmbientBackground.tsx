"use client";

import { useMemo, useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function AmbientBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Always call useMemo — hooks must not be called after conditional returns
  const edgeMask = useMemo(
    () => "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
    []
  );

  // On mobile, skip edge glows — fixed layers with complex gradients
  // cause compositing flashes during momentum scroll on iOS Safari
  if (isCoarse) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          transform: "translateZ(0)",
          backgroundImage: isDark
            ? "radial-gradient(ellipse 60% 55% at -5% -8%, rgba(124,58,237,0.22) 0%, transparent 70%), radial-gradient(ellipse 55% 50% at 108% 108%, rgba(201,168,76,0.18) 0%, transparent 70%)"
            : "radial-gradient(ellipse 60% 55% at -5% -8%, rgba(109,40,217,0.10) 0%, transparent 70%), radial-gradient(ellipse 55% 50% at 108% 108%, rgba(146,103,10,0.08) 0%, transparent 70%)",
        }}
      />
    );
  }

  return (
    <>
      {/* Corner/quadrant ambient gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          transform: "translateZ(0)",
          willChange: "opacity",
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
        className="pointer-events-none fixed left-0 top-0 z-20 h-full"
        style={{
          width: "clamp(160px, 22vw, 380px)",
          background: isDark
            ? [
                "radial-gradient(ellipse 100% 45% at 0% 30%, rgba(124,58,237,0.20) 0%, rgba(124,58,237,0.05) 55%, transparent 85%)",
                "radial-gradient(ellipse 100% 45% at 0% 70%, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0.04) 55%, transparent 85%)",
              ].join(", ")
            : [
                "radial-gradient(ellipse 100% 45% at 0% 30%, rgba(109,40,217,0.09) 0%, rgba(109,40,217,0.03) 55%, transparent 85%)",
                "radial-gradient(ellipse 100% 45% at 0% 70%, rgba(236,72,153,0.07) 0%, rgba(236,72,153,0.02) 55%, transparent 85%)",
              ].join(", "),
          maskImage: edgeMask,
          WebkitMaskImage: edgeMask,
          transform: "translateZ(0)",
          willChange: "opacity",
        }}
      />

      {/* Right edge glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-0 z-20 h-full"
        style={{
          width: "clamp(160px, 22vw, 380px)",
          background: isDark
            ? [
                "radial-gradient(ellipse 100% 45% at 100% 30%, rgba(236,72,153,0.20) 0%, rgba(236,72,153,0.05) 55%, transparent 85%)",
                "radial-gradient(ellipse 100% 45% at 100% 70%, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0.04) 55%, transparent 85%)",
              ].join(", ")
            : [
                "radial-gradient(ellipse 100% 45% at 100% 30%, rgba(236,72,153,0.09) 0%, rgba(236,72,153,0.03) 55%, transparent 85%)",
                "radial-gradient(ellipse 100% 45% at 100% 70%, rgba(109,40,217,0.07) 0%, rgba(109,40,217,0.02) 55%, transparent 85%)",
              ].join(", "),
          maskImage: edgeMask,
          WebkitMaskImage: edgeMask,
          transform: "translateZ(0)",
          willChange: "opacity",
        }}
      />
    </>
  );
}
