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
import NewestWork from "@/components/sections/NewestWork";

type FilterCategory = Category | "all";

const FILTER_OPTIONS: { value: FilterCategory; label: string }[] = [
  { value: "all", label: "Alles" },
  ...CATEGORIES.map((cat) => ({
    value: cat as FilterCategory,
    label: CATEGORY_LABELS[cat],
  })),
];

type GridConfig = { classes: string; isLarge: boolean };

const GRID_PATTERNS: Record<number, GridConfig> = {
  0: { classes: "col-span-2 row-span-1 md:col-span-2 md:row-span-2 min-h-[280px] md:min-h-0", isLarge: true },
  1: { classes: "md:mt-6", isLarge: false },
  2: { classes: "md:row-span-2", isLarge: true },
  4: { classes: "md:col-span-2", isLarge: true },
  5: { classes: "md:mt-4", isLarge: false },
  7: { classes: "md:row-span-2", isLarge: true },
  8: { classes: "md:mt-6", isLarge: false },
  9: { classes: "md:col-span-2", isLarge: true },
};

function getGridConfig(index: number): GridConfig {
  return GRID_PATTERNS[index] ?? { classes: "", isLarge: false };
}

function QuoteCard() {
  return (
    <motion.div
      className="col-span-1 row-span-1 min-h-[200px] md:min-h-0 flex h-full flex-col items-center justify-center rounded-lg border border-iron-700 bg-iron-800 p-8 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="mb-4 text-copper"
        aria-hidden="true"
      >
        <path
          d="M12 2L14.4 8.4L21 10L16 14.4L17.2 21L12 17.6L6.8 21L8 14.4L3 10L9.6 8.4L12 2Z"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>
      <p className="font-playfair text-lg italic leading-relaxed text-cream/90 md:text-xl">
        &ldquo;Elk stuk oud ijzer heeft een verhaal — ik geef het een nieuw hoofdstuk&rdquo;
      </p>
      <span className="mt-3 text-xs uppercase tracking-widest text-copper/70">
        — Gijs Gonlag
      </span>
    </motion.div>
  );
}

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

      {/* Nieuwste werk spotlight */}
      <NewestWork />

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

      {/* Portfolio grid — bento variatie */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-dense gap-3 md:gap-5 max-w-7xl mx-auto md:auto-rows-[260px]">
        <AnimatePresence mode="popLayout">
          {filteredItems.flatMap((item, index) => {
            const cfg = getGridConfig(index);
            const elements = [
              <motion.div
                key={item.id}
                className={`col-span-1 row-span-1 min-h-[200px] md:min-h-0 ${cfg.classes}`}
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
                  isLarge={cfg.isLarge}
                  onClick={() => setLightboxIndex(index)}
                />
              </motion.div>,
            ];
            if (index === 6 && filteredItems.length > 7) {
              elements.push(<QuoteCard key="quote-card" />);
            }
            return elements;
          })}
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
