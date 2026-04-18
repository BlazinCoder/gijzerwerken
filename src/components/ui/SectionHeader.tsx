"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={centered ? "text-center" : ""}
    >
      <h2 className="font-playfair text-3xl md:text-5xl text-cream">
        {title}
      </h2>
      <div
        className={`w-16 h-0.5 bg-copper mt-4 ${centered ? "mx-auto" : ""}`}
      />
      {subtitle && (
        <p
          className={`mt-4 text-cream/70 text-lg max-w-2xl ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
