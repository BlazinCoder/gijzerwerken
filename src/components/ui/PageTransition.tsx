"use client";

import { motion, useReducedMotion } from "framer-motion";

const APPLE_EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReduced = useReducedMotion();
  const duration = prefersReduced ? 0 : 0.4;

  return (
    <div className="relative">
      {/* Copper glow overlay — masks the flash between unmount/mount.
          Hidden on mobile to keep transitions clean and snappy. */}
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.6, ease: APPLE_EASE }}
        className="fixed inset-0 pointer-events-none z-[55] hidden md:block"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(196,122,42,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration, ease: APPLE_EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}
