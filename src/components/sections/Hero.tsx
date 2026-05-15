"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const SparkParticles = dynamic(
  () => import("@/components/three/SparkParticles"),
  { ssr: false }
);

const APPLE_EASE = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: APPLE_EASE },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: APPLE_EASE },
  },
};

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [initialBurst, setInitialBurst] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsDesktop(
      window.matchMedia("(min-width: 768px) and (hover: hover)").matches
    );
  }, []);

  // Fire initial burst on mount for spectaculaire eerste indruk
  useEffect(() => {
    const t = setTimeout(() => setInitialBurst(true), 300);
    const t2 = setTimeout(() => setInitialBurst(false), 600);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  // Auto-reset for touch devices
  useEffect(() => {
    if (isHovered) {
      timeoutRef.current = setTimeout(() => setIsHovered(false), 1500);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(false);
  };
  const handleTouchStart = () => setIsHovered(true);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-iron-900">
      {/* Three.js spark particles background — desktop only */}
      {!prefersReduced && isDesktop && (
        <SparkParticles burst={isHovered || initialBurst} />
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={scaleInVariants}>
          {/* Logo container with hover effects */}
          <div
            className="relative inline-block cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
          >
            {/* Ambient copper glow behind logo — always visible, pulses */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
              style={{
                width: "150%",
                height: "150%",
                background:
                  "radial-gradient(circle, rgba(196,122,42,0.25) 0%, rgba(196,122,42,0.08) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
              animate={{
                scale: isHovered ? [1.1, 1.2, 1.1] : [1, 1.08, 1],
                opacity: isHovered ? 1 : 0.7,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Glow ring behind logo — intensifies on hover */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow: isHovered
                  ? "0 0 40px 10px rgba(232,168,73,0.3), 0 0 80px 20px rgba(196,122,42,0.15)"
                  : "0 0 0px 0px rgba(232,168,73,0)",
                transition: "box-shadow 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
            />

            {/* Logo with zoom + heat glow — responsive sizing */}
            <motion.img
              src="/images/logo-white.png"
              alt="Gijzerwerken - Upcycled Metaalkunst Logo"
              className="h-24 sm:h-32 md:h-40 lg:h-56 w-auto mx-auto relative"
              animate={{
                scale: isHovered ? 1.3 : 1,
                filter: isHovered
                  ? "brightness(1.5) drop-shadow(0 0 20px rgba(196,122,42,0.8))"
                  : "brightness(1) drop-shadow(0 0 0px rgba(196,122,42,0))",
              }}
              transition={{ duration: 0.4, ease: APPLE_EASE }}
            />

            {/* Flash overlay — "anvil strike" */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-amber-400/30 pointer-events-none rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, times: [0, 0.3, 1] }}
                />
              )}
            </AnimatePresence>

            {/* Anvil silhouette */}
            <AnimatePresence>
              {isHovered && (
                <motion.svg
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
                  width="80"
                  height="40"
                  viewBox="0 0 80 40"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: APPLE_EASE }}
                >
                  <rect x="5" y="2" width="70" height="8" rx="2" fill="#2a2a2a" stroke="#c47a2a" strokeWidth="1" />
                  <path d="M10,10 H70 L65,35 H15 Z" fill="#2a2a2a" stroke="#c47a2a" strokeWidth="1" />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Title + subtitle — staggered fade-up */}
        <motion.h1
          className="font-playfair text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.15em] uppercase text-cream mt-6"
          variants={fadeUpVariants}
        >
          GIJZERWERKEN
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg tracking-normal text-copper-light mt-3 opacity-80"
          variants={fadeUpVariants}
        >
          Upcycled metaalkunst uit Schiedam
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4, ease: APPLE_EASE }}
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-cream/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
