"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "filled" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: React.ReactNode;
  target?: string;
  rel?: string;
  download?: string;
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = "filled",
  className = "",
  type = "button",
  disabled = false,
  icon,
  target,
  rel,
  download,
}: AnimatedButtonProps) {
  const isFilled = variant === "filled";

  const content = (
    <motion.div
      className={`relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl text-sm font-medium select-none transition-colors duration-200 ${
        disabled ? "pointer-events-none opacity-40" : "cursor-pointer"
      } ${
        isFilled
          ? "bg-accent text-white border border-accent/20 hover:bg-[#6D28D9] active:bg-[#5B21B6]"
          : "bg-transparent text-accent-light border border-accent/50 hover:bg-accent/20 hover:border-accent/70 active:bg-accent/30"
      } ${className}`}
      style={{
        paddingLeft: "1.375rem",
        paddingRight: "1.375rem",
        paddingTop: "0.6rem",
        paddingBottom: "0.6rem",
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={disabled ? undefined : onClick}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    if (target || download) {
      return (
        <a href={href} target={target} rel={rel} download={download} className="inline-block">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className="inline-block">
      {content}
    </button>
  );
}
