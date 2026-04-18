"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { PortfolioItem, Category } from "@/data/portfolio";

const CATEGORY_GRADIENTS: Record<Category, string> = {
  sculpturen: "from-iron-700 via-iron-800 to-copper-dark",
  bloemen: "from-copper via-copper-light to-ember-glow",
  maatwerk: "from-iron-800 via-iron-700 to-iron-600",
  vuurkorven: "from-rust via-rust-light to-ember",
};

interface PortfolioCardProps {
  item: PortfolioItem;
  onClick: () => void;
}

export default function PortfolioCard({ item, onClick }: PortfolioCardProps) {
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image with gradient fallback */}
        {imgError ? (
          <div
            className={`aspect-[3/4] bg-gradient-to-br ${CATEGORY_GRADIENTS[item.category]}`}
          />
        ) : (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="aspect-[3/4] w-full object-cover"
            onError={() => setImgError(true)}
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-iron-900/90 via-iron-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
