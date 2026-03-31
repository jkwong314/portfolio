"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "./ThemeProvider";

type State = "default" | "hover" | "press";

export default function CustomCursor() {
  const [state, setState] = useState<State>("default");
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 220, damping: 22 });
  const y = useSpring(my, { stiffness: 220, damping: 22 });

  const setS = useCallback((s: State) => setState(s), []);

  useEffect(() => {
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    setIsMobile(!hasPointer);
    if (!hasPointer) return;

    const onMove  = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    const onDown  = () => setS("press");
    const onUp    = () => setState(s => s === "press" ? "default" : s);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const SELECTOR = "a, button, [role='button'], input, textarea, select";
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.matches && t.matches(SELECTOR)) setS("hover");
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.matches && t.matches(SELECTOR))
        setState(s => s !== "press" ? "default" : s);
    };

    window.addEventListener("mousemove",  onMove, { passive: true });
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    document.addEventListener("pointerover",  onOver);
    document.addEventListener("pointerout",   onOut);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("pointerover",  onOver);
      document.removeEventListener("pointerout",   onOut);
    };
  }, [mx, my, setS]);

  const { theme } = useTheme();
  if (isMobile) return null;

  const isDark = theme === "dark";
  const size        = state === "press" ? 14 : state === "hover" ? 30 : 22;
  const borderColor = state === "hover"  ? (isDark ? "#A78BFA" : "#6D28D9")
                    : state === "press"  ? (isDark ? "#C9A84C" : "#92670A")
                    : isDark ? "rgba(245,245,240,0.5)" : "rgba(24,24,27,0.4)";
  const bgColor     = state === "press"  ? (isDark ? "rgba(201,168,76,0.12)" : "rgba(146,103,10,0.1)")
                    : state === "hover"  ? (isDark ? "rgba(167,139,250,0.08)" : "rgba(109,40,217,0.08)")
                    : "transparent";

  return (
    <>
      <style jsx global>{`* { cursor: none !important; }`}</style>

      {/*
        Ping wrapper — positions using spring values, CSS animation does the ring expansion.
        Visible only when hovering canvas (default state). Zero JS animation cost.
      */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{ x, y }}
        aria-hidden="true"
      >
        <span
          className="cursor-ping"
          style={{
            opacity: state === "default" && !hidden ? 1 : 0,
            // Pause the animation when not in default mode so it restarts fresh
            animationPlayState: state === "default" && !hidden ? "running" : "paused",
            transition: "opacity 0.2s",
          }}
        />
      </motion.div>

      {/* Main cursor ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          borderStyle: "solid",
        }}
        animate={{
          width:           size,
          height:          size,
          borderWidth:     1.5,
          borderColor,
          backgroundColor: bgColor,
          opacity:         hidden ? 0 : 1,
        }}
        transition={{
          width:       { type: "spring", stiffness: 380, damping: 24 },
          height:      { type: "spring", stiffness: 380, damping: 24 },
          borderColor: { duration: 0.18 },
          opacity:     { duration: 0.15 },
          default:     { duration: 0.2 },
        }}
      />
    </>
  );
}
