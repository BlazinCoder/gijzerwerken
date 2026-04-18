"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const SparkParticles = dynamic(
  () => import("@/components/three/SparkParticles"),
  { ssr: false }
);

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [initialBurst, setInitialBurst] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      {/* Three.js spark particles background */}
      {!prefersReduced && <SparkParticles burst={isHovered || initialBurst} />}

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
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
                transition: "box-shadow 0.4s ease-out",
              }}
            />

            {/* Logo with zoom + heat glow — verdubbelde grootte */}
            <motion.img
              src="/images/logo-white.png"
              alt="Gijzerwerken"
              className="h-40 md:h-56 lg:h-64 w-auto mx-auto relative"
              animate={{
                scale: isHovered ? 1.3 : 1,
                filter: isHovered
                  ? "brightness(1.5) drop-shadow(0 0 20px rgba(196,122,42,0.8))"
                  : "brightness(1) drop-shadow(0 0 0px rgba(196,122,42,0))",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
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
                  transition={{ duration: 0.4 }}
                >
                  <rect x="5" y="2" width="70" height="8" rx="2" fill="#2a2a2a" stroke="#c47a2a" strokeWidth="1" />
                  <path d="M10,10 H70 L65,35 H15 Z" fill="#2a2a2a" stroke="#c47a2a" strokeWidth="1" />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Title + subtitle — snelle fade-in voor 2s hero window */}
        <motion.h1
          className="font-playfair text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] uppercase text-cream mt-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          GIJZERWERKEN
        </motion.h1>
        <motion.p
          className="text-base md:text-lg lg:text-xl tracking-normal text-copper-light mt-3 opacity-80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          Upcycled metaalkunst uit Schiedam
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-cream/30"
        >
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
