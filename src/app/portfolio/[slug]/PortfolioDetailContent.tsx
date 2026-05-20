"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  CATEGORY_LABELS,
  portfolioItems,
  type PortfolioItem,
} from "@/data/portfolio";
import PortfolioCard from "@/components/ui/PortfolioCard";
import SectionHeader from "@/components/ui/SectionHeader";

const APPLE_EASE = [0.25, 0.46, 0.45, 0.94] as const;

interface PortfolioDetailContentProps {
  item: PortfolioItem;
}

function pickRelated(current: PortfolioItem, max = 3): PortfolioItem[] {
  const sameCategory = portfolioItems.filter(
    (i) => i.id !== current.id && i.category === current.category,
  );
  if (sameCategory.length >= max) return sameCategory.slice(0, max);
  const others = portfolioItems.filter(
    (i) => i.id !== current.id && i.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, max);
}

export default function PortfolioDetailContent({ item }: PortfolioDetailContentProps) {
  const images = useMemo(
    () => (item.images && item.images.length > 0 ? item.images : [item.imageSrc]),
    [item.images, item.imageSrc],
  );
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgError, setImgError] = useState(false);
  const related = useMemo(() => pickRelated(item, 3), [item]);

  useEffect(() => {
    setActiveIdx(0);
    setImgError(false);
  }, [item.id]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (images.length <= 1) return;
      if (e.key === "ArrowRight") {
        setActiveIdx((i) => (i + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setActiveIdx((i) => (i - 1 + images.length) % images.length);
      }
    },
    [images.length],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const contactHref = `/contact?onderwerp=Maatwerk&stuk=${encodeURIComponent(item.title)}`;

  return (
    <main className="min-h-screen bg-iron-900 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-sm uppercase tracking-widest text-copper hover:text-copper-light transition-colors"
        >
          ← Terug naar portfolio
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Foto-sectie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: APPLE_EASE }}
          >
            <div className="overflow-hidden rounded-lg ring-1 ring-iron-700 bg-iron-800">
              <AnimatePresence mode="wait">
                {imgError ? (
                  <div className="h-[60vh] w-full bg-gradient-to-br from-iron-700 via-iron-800 to-copper-dark" />
                ) : (
                  <motion.img
                    key={images[activeIdx]}
                    src={images[activeIdx]}
                    alt={`${item.title} — foto ${activeIdx + 1} van ${images.length}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mx-auto max-h-[70vh] w-full object-contain"
                    onError={() => setImgError(true)}
                  />
                )}
              </AnimatePresence>
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {images.map((src, idx) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`Toon foto ${idx + 1}`}
                    className={`h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-md transition-all ${
                      idx === activeIdx
                        ? "ring-2 ring-copper"
                        : "ring-1 ring-iron-700 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info-sectie */}
          <div className="flex flex-col">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: APPLE_EASE }}
              className="font-playfair text-3xl md:text-4xl lg:text-5xl text-cream"
            >
              {item.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: APPLE_EASE }}
              className="mt-4"
            >
              <span className="inline-block rounded-full border border-copper/30 bg-copper/10 px-4 py-1 text-sm text-copper">
                {CATEGORY_LABELS[item.category]}
              </span>
            </motion.div>

            {item.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.26, ease: APPLE_EASE }}
                className="mt-6 max-w-prose text-base md:text-lg leading-relaxed text-cream/80"
              >
                {item.description}
              </motion.p>
            )}

            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease: APPLE_EASE }}
              className="mt-8 space-y-3"
            >
              <div>
                <dt className="text-xs uppercase tracking-widest text-copper">
                  Materiaal
                </dt>
                <dd className="mt-1 text-sm text-cream/70">{item.material}</dd>
              </div>
              {item.dimensions && (
                <div>
                  <dt className="text-xs uppercase tracking-widest text-copper">
                    Afmetingen
                  </dt>
                  <dd className="mt-1 text-sm text-cream/70">{item.dimensions}</dd>
                </div>
              )}
            </motion.dl>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: APPLE_EASE }}
              className="mt-10"
            >
              <Link
                href={contactHref}
                className="inline-flex items-center rounded-lg bg-copper px-6 py-3 font-semibold text-iron-900 transition-colors hover:bg-copper-light"
              >
                Interesse? Neem contact op →
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Meer werk */}
        {related.length > 0 && (
          <section className="mt-24 md:mt-32">
            <SectionHeader title="Meer werk" centered={false} />
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((rel) => (
                <div key={rel.id} className="aspect-square">
                  <PortfolioCard item={rel} linkToDetail />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
