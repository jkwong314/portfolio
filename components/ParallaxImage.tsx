"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  containerStyle?: React.CSSProperties;
  priority?: boolean;
}

/**
 * An image that shifts slightly on scroll — overflow is hidden by the parent
 * container, creating a classic parallax crop effect.
 */
export default function ParallaxImage({
  src,
  alt,
  sizes,
  className = "",
  containerStyle,
  priority,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={containerStyle}>
      <motion.div className="absolute inset-[-10%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </motion.div>
    </div>
  );
}
