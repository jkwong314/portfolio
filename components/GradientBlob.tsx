"use client";

import { motion } from "framer-motion";

interface GradientBlobProps {
  className?: string;
}

export default function GradientBlob({ className = "" }: GradientBlobProps) {
  return (
    <div
      className={`pointer-events-none absolute overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Primary blob */}
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(167,139,250,0.15) 40%, transparent 70%)",
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary blob */}
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.25) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)",
          left: "200px",
          top: "100px",
        }}
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Tertiary blob */}
      <motion.div
        className="absolute h-[350px] w-[350px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)",
          right: "0",
          top: "50px",
        }}
        animate={{
          x: [0, 50, -80, 0],
          y: [0, -60, 80, 0],
          scale: [1, 1.1, 0.85, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
