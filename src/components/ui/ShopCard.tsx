"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ShopItem } from "@/data/shop";
import { formatPrice } from "@/data/shop";
import type { Category } from "@/data/portfolio";

const CATEGORY_GRADIENTS: Record<Category, string> = {
  sculpturen: "from-iron-700 via-iron-800 to-copper-dark",
  bloemen: "from-copper via-copper-light to-ember-glow",
  maatwerk: "from-iron-800 via-iron-700 to-iron-600",
  vuurkorven: "from-rust via-rust-light to-ember",
};

interface ShopCardProps {
  item: ShopItem;
}

export default function ShopCard({ item }: ShopCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={item.available ? "" : "opacity-60"}
    >
      <div className="group relative overflow-hidden rounded-lg bg-iron-800 border border-iron-700/30">
        {/* Image / gradient placeholder */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {imgError ? (
            <div
              className={`h-full w-full bg-gradient-to-br ${CATEGORY_GRADIENTS[item.category]} transition-transform duration-500 group-hover:scale-105`}
            />
          ) : (
            <img
              src={item.imageSrc}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          )}

          {/* Uitverkocht badge */}
          {!item.available && (
            <span className="absolute top-3 right-3 rounded-full bg-rust px-3 py-1 text-xs tracking-widest uppercase text-cream">
              Uitverkocht
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-playfair text-lg text-cream">{item.title}</h3>
          <p className="mt-1 text-xs tracking-widest uppercase text-cream/50">
            {item.material}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="font-playfair text-xl text-copper">
              {formatPrice(item.price)}
            </span>

            {item.available ? (
              <Link
                href={`/contact?onderwerp=${encodeURIComponent("Vraag over een kunstwerk")}&stuk=${encodeURIComponent(item.title)}`}
                className="text-sm tracking-widest uppercase text-cream/70 transition-colors duration-300 hover:text-copper"
              >
                Informeer
              </Link>
            ) : (
              <span className="text-sm text-cream/30">Niet beschikbaar</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
