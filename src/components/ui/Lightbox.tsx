"use client";

import { useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import type { PortfolioItem, Category } from "@/data/portfolio";

const CATEGORY_GRADIENTS: Record<Category, string> = {
  sculpturen: "from-iron-700 via-iron-800 to-copper-dark",
  bloemen: "from-copper via-copper-light to-ember-glow",
  maatwerk: "from-iron-800 via-iron-700 to-iron-600",
  vuurkorven: "from-rust via-rust-light to-ember",
};

interface LightboxProps {
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const item = items[currentIndex];
  const [imgError, setImgError] = useState(false);
  const hasPrev = items.length > 1;
  const hasNext = items.length > 1;

  // Reset imgError when navigating to a different item
  useEffect(() => {
    setImgError(false);
  }, [currentIndex]);

  const goPrev = useCallback(() => {
    onNavigate(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  }, [currentIndex, items.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation + body scroll lock
  useEffect(() => {
    document.body.classList.add("menu-open");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, goPrev, goNext]);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-iron-900/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Content container — stop propagation to prevent close on content click */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col gap-6 px-6 md:flex-row md:items-center md:gap-10"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 right-4 z-10 text-2xl text-cream/50 transition-colors hover:text-cream md:right-0"
          aria-label="Sluiten"
        >
          &times;
        </button>

        {/* Image area */}
        <div className="relative flex shrink-0 items-center justify-center md:w-[60%]">
          {/* Prev arrow */}
          {hasPrev && (
            <button
              onClick={goPrev}
              className="absolute -left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-iron-800/80 text-xl text-cream/60 transition-colors hover:text-cream md:-left-12"
              aria-label="Vorige"
            >
              &#8249;
            </button>
          )}

          {/* Image with gradient fallback */}
          {imgError ? (
            <div
              className={`aspect-[3/4] w-full max-w-lg rounded-lg bg-gradient-to-br ${CATEGORY_GRADIENTS[item.category]}`}
            />
          ) : (
            <img
              src={item.imageSrc}
              alt={item.title}
              className="aspect-[3/4] w-full max-w-lg rounded-lg object-cover"
              onError={() => setImgError(true)}
            />
          )}

          {/* Next arrow */}
          {hasNext && (
            <button
              onClick={goNext}
              className="absolute -right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-iron-800/80 text-xl text-cream/60 transition-colors hover:text-cream md:-right-12"
              aria-label="Volgende"
            >
              &#8250;
            </button>
          )}
        </div>

        {/* Metadata panel */}
        <div className="flex flex-col gap-4 md:w-[40%]">
          <h2 className="font-playfair text-2xl text-cream md:text-3xl">
            {item.title}
          </h2>
          <p className="text-sm leading-relaxed text-cream/70">
            {item.description}
          </p>
          <div className="flex flex-col gap-1">
            <span className="text-xs tracking-widest uppercase text-cream/50">
              {item.material}
            </span>
            {item.dimensions && (
              <span className="text-xs tracking-widest uppercase text-cream/40">
                {item.dimensions}
              </span>
            )}
          </div>

          {/* Counter */}
          <span className="mt-2 text-xs text-cream/30">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
