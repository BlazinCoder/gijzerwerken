"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReduced = useReducedMotion();
  const duration = prefersReduced ? 0 : 0.4;

  return (
    <div className="relative">
      {/* Copper glow overlay — masks the flash between unmount/mount */}
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.6, ease: "easeOut" }}
        className="fixed inset-0 pointer-events-none z-[55]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(196,122,42,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
