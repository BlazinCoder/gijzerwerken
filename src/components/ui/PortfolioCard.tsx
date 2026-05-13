"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { PortfolioItem, Category } from "@/data/portfolio";

const CATEGORY_GRADIENTS: Record<Category, string> = {
  sculpturen: "from-iron-700 via-iron-800 to-copper-dark",
  bloemen: "from-copper via-copper-light to-ember-glow",
  maatwerk: "from-iron-800 via-iron-700 to-iron-600",
};

interface PortfolioCardProps {
  item: PortfolioItem;
  onClick: () => void;
  isLarge?: boolean;
}

export default function PortfolioCard({ item, onClick, isLarge = false }: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [enableTilt, setEnableTilt] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    setEnableTilt(!reduced && !touch);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
  }, [enableTilt]);

  const handleMouseLeave = useCallback(() => {
    if (!enableTilt) return;
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  }, [enableTilt]);

  const imageHoverClasses = isLarge
    ? "transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.01] group-hover:brightness-110"
    : "transition-transform duration-500 ease-out group-hover:scale-[1.05]";

  const overlayGradientClasses = isLarge
    ? "from-iron-900/0 via-iron-900/20 to-iron-900/70"
    : "from-iron-900/0 to-iron-900/60";

  const featuredRingClasses = item.featured
    ? "ring-1 ring-copper/20 hover:ring-copper/40 transition-shadow duration-500"
    : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative h-full cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 ease-out ${featuredRingClasses}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image with gradient fallback */}
        {imgError ? (
          <div
            className={`h-full w-full bg-gradient-to-br ${CATEGORY_GRADIENTS[item.category]} ${imageHoverClasses}`}
          />
        ) : (
          <img
            src={item.imageSrc}
            alt={item.title}
            loading="lazy"
            className={`h-full w-full object-cover ${imageHoverClasses}`}
            onError={() => setImgError(true)}
          />
        )}

        {/* Hover overlay */}
        <div className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t ${overlayGradientClasses} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}>
          {/* Amber glow */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              boxShadow: "inset 0 0 60px rgba(245, 201, 107, 0.08)",
            }}
          />

          {/* Text content */}
          <div className="relative p-5">
            <h3 className="font-playfair text-xl text-cream">{item.title}</h3>
            <p className="mt-1 text-xs tracking-widest uppercase text-cream/50">
              {item.material}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
