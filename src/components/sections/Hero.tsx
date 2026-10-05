"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import type { BurstRequest } from "@/components/three/SparkParticles";
import HeroEmbers from "@/components/three/HeroEmbers";

const SparkParticles = dynamic(
  () => import("@/components/three/SparkParticles"),
  { ssr: false }
);

const INTRO_BURST_AT_MS = 700; // het logo staat (scale-in 0,2 s + 1,0 s, visueel klaar rond 0,7 s)
const INTRO_BURST_COUNT = 70;
const HOVER_BURST_COUNT = 35;
const BURST_COOLDOWN_MS = 2000;

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
  const [isDesktop, setIsDesktop] = useState(false);
  const [burst, setBurst] = useState<BurstRequest | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lastHoverBurstRef = useRef(-Infinity);

  useEffect(() => {
    setIsDesktop(
      window.matchMedia("(min-width: 768px) and (hover: hover)").matches
    );
  }, []);

  const fireBurst = useCallback((count: number) => {
    const now = performance.now();
    setBurst((prev) => ({ id: (prev?.id ?? 0) + 1, count, at: now }));
  }, []);

  // Intro: één rustige vonkenregen zodra het logo staat (alleen desktop met WebGL)
  useEffect(() => {
    if (!isDesktop || prefersReduced) return;
    const t = setTimeout(() => fireBurst(INTRO_BURST_COUNT), INTRO_BURST_AT_MS);
    return () => clearTimeout(t);
  }, [isDesktop, prefersReduced, fireBurst]);

  // Alleen een echte muis: een tik op touch doet niets
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !isDesktop) return;
    setIsHovered(true);
    // Cooldown tussen hover-bursts; de intro telt niet mee, anders kan de
    // hover-burst vóór de doorsturing (2 s) nooit afgaan
    const now = performance.now();
    if (!prefersReduced && now - lastHoverBurstRef.current >= BURST_COOLDOWN_MS) {
      lastHoverBurstRef.current = now;
      fireBurst(HOVER_BURST_COUNT);
    }
  };
  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setIsHovered(false);
  };

  return (
    <section className="relative h-[100svh] flex items-center justify-center overflow-hidden bg-iron-900">
      {/* Three.js vonken — alleen desktop met muis */}
      {!prefersReduced && isDesktop && (
        <SparkParticles burst={burst} originRef={logoRef} />
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={scaleInVariants}>
          {/* Logo — hover alleen met een echte muis */}
          <div
            ref={logoRef}
            className="relative inline-block"
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          >
            {/* Koperen gloed achter het logo — ademt rustig, stil bij reduced motion */}
            <motion.div
              className="absolute top-1/2 left-1/2 pointer-events-none rounded-full"
              style={{
                // x/y via Framer: een Tailwind-translate verdwijnt onder Framer's inline transform
                x: "-50%",
                y: "-50%",
                width: "150%",
                height: "150%",
                background:
                  "radial-gradient(circle, rgba(196,122,42,0.25) 0%, rgba(196,122,42,0.08) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
              animate={
                prefersReduced
                  ? { opacity: 0.7 }
                  : { scale: [1, 1.04, 1], opacity: isHovered ? 1 : 0.7 }
              }
              transition={{
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.4, ease: APPLE_EASE },
              }}
            />

            {/* CSS-vonken (touch) en statische gloeipunten (reduced motion) */}
            <HeroEmbers />

            {/* Logo — bij hover iets groter en warmer */}
            <motion.img
              src="/images/logo-white.png"
              alt="Gijzerwerken - Upcycled Metaalkunst Logo"
              className="h-24 sm:h-32 md:h-40 lg:h-56 w-auto mx-auto relative"
              animate={{
                scale: isHovered ? 1.06 : 1,
                filter: isHovered
                  ? "brightness(1.12) drop-shadow(0 0 14px rgba(196,122,42,0.45))"
                  : "brightness(1) drop-shadow(0 0 0px rgba(196,122,42,0))",
              }}
              transition={{ duration: 0.4, ease: APPLE_EASE }}
            />
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
    </section>
  );
}
