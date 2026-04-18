"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  gradient: string;
  imageSrc?: string;
  aspectRatio?: string;
  alt?: string;
  className?: string;
}

export default function ParallaxImage({
  gradient,
  imageSrc,
  aspectRatio = "aspect-[4/3]",
  alt = "",
  className = "",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enableParallax, setEnableParallax] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [15, -15]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setEnableParallax(false);
      return;
    }

    const mql = window.matchMedia("(min-width: 768px)");
    setEnableParallax(mql.matches);

    const handler = (e: MediaQueryListEvent) => setEnableParallax(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-lg ${aspectRatio} ${className}`}
    >
      <motion.div
        style={enableParallax ? { y } : undefined}
        className="w-full h-full scale-[1.1]"
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
        )}
      </motion.div>
    </div>
  );
}
