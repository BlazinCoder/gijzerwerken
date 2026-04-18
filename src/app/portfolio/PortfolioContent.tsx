"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  portfolioItems,
  CATEGORIES,
  CATEGORY_LABELS,
  type Category,
} from "@/data/portfolio";
import PortfolioCard from "@/components/ui/PortfolioCard";
import Lightbox from "@/components/ui/Lightbox";

type FilterCategory = Category | "all";

const FILTER_OPTIONS: { value: FilterCategory; label: string }[] = [
  { value: "all", label: "Alles" },
  ...CATEGORIES.map((cat) => ({
    value: cat as FilterCategory,
    label: CATEGORY_LABELS[cat],
  })),
];

export default function PortfolioContent() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(
    () =>
      activeCategory === "all"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  // Close lightbox when filter changes
  useEffect(() => {
    setLightboxIndex(null);
  }, [activeCategory]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      {/* Page header */}
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-playfair text-4xl md:text-6xl text-cream"
        >
          Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-sm tracking-widest uppercase text-cream/50 max-w-xl mx-auto"
        >
          Van ruwe grondstof tot verfijnd kunstwerk — elk stuk vertelt zijn eigen
          verhaal
        </motion.p>
      </div>

      {/* Filter pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 flex justify-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-2"
      >
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setActiveCategory(option.value)}
            className={`relative px-4 py-2 text-sm tracking-widest uppercase transition-colors duration-300 ${
              activeCategory === option.value
                ? "text-copper"
                : "text-cream/50 hover:text-cream/70"
            }`}
          >
            {activeCategory === option.value && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 rounded-full border border-copper/40 bg-copper/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Portfolio grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: Math.min(index * 0.08, 0.5),
              }}
            >
              <PortfolioCard
                item={item}
                onClick={() => setLightboxIndex(index)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filteredItems}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
