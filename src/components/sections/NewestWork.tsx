"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioItems } from "@/data/portfolio";
import Lightbox from "@/components/ui/Lightbox";

export default function NewestWork() {
  const reducedMotion = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [initialPhoto, setInitialPhoto] = useState(0);

  const newestItem = useMemo(
    () => portfolioItems.find((item) => item.isNew),
    []
  );

  if (!newestItem) return null;

  const photos =
    newestItem.images && newestItem.images.length > 0
      ? newestItem.images
      : [newestItem.imageSrc];

  const openLightbox = (photoIdx: number) => {
    setInitialPhoto(photoIdx);
    setLightboxOpen(true);
  };

  const fadeIn = reducedMotion
    ? { initial: false, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6 },
      };

  const slideLeft = reducedMotion
    ? { initial: false, animate: { opacity: 1, x: 0 } }
    : {
        initial: { opacity: 0, x: -30 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8 },
      };

  const slideRight = reducedMotion
    ? { initial: false, animate: { opacity: 1, x: 0 } }
    : {
        initial: { opacity: 0, x: 30 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, delay: 0.2 },
      };

  return (
    <section className="max-w-7xl mx-auto py-12 md:py-16">
      <motion.div {...fadeIn} className="flex items-center gap-2 mb-8">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 1l1.8 4.6L14.4 7 10.7 10l1.1 5L8 12.4 4.2 15l1.1-5L1.6 7l4.6-1.4L8 1z"
            fill="#c47a2a"
          />
        </svg>
        <span className="text-sm tracking-widest uppercase text-copper font-inter">
          Nieuwste werk
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 items-start">
        <motion.button
          {...slideLeft}
          type="button"
          onClick={() => openLightbox(0)}
          className="md:col-span-3 group relative overflow-hidden rounded-lg bg-iron-800 aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-copper"
          aria-label={`Open ${newestItem.title} in lightbox`}
        >
          <img
            src={newestItem.imageSrc}
            alt={newestItem.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </motion.button>

        <motion.div {...slideRight} className="md:col-span-2 flex flex-col">
          <h2 className="font-playfair text-3xl md:text-4xl text-cream">
            {newestItem.title}
          </h2>
          <p className="mt-2 text-sm tracking-widest uppercase text-copper">
            {newestItem.material}
          </p>
          <p className="mt-4 text-base text-cream/80 leading-relaxed">
            {newestItem.description}
          </p>

          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="mt-6 inline-flex items-center gap-2 text-sm tracking-widest uppercase text-copper transition-colors hover:text-copper-light self-start"
          >
            Bekijk details
            <span aria-hidden="true">&rarr;</span>
          </button>

          {photos.length > 1 && (
            <div className="mt-8 flex gap-3">
              {photos.slice(1).map((src, i) => {
                const photoIdx = i + 1;
                const thumbAnim = reducedMotion
                  ? { initial: false, animate: { opacity: 1 } }
                  : {
                      initial: { opacity: 0 },
                      whileInView: { opacity: 1 },
                      viewport: { once: true },
                      transition: { duration: 0.4, delay: 0.4 + i * 0.1 },
                    };
                return (
                  <motion.button
                    key={src}
                    {...thumbAnim}
                    type="button"
                    onClick={() => openLightbox(photoIdx)}
                    className="relative w-20 h-20 overflow-hidden rounded-md bg-iron-800 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-copper"
                    aria-label={`Open foto ${photoIdx + 1} van ${newestItem.title}`}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </motion.button>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      <div className="mt-12 md:mt-16 h-px bg-gradient-to-r from-transparent via-copper/40 to-transparent" />

      {lightboxOpen && (
        <Lightbox
          items={[newestItem]}
          currentIndex={0}
          initialPhotoIndex={initialPhoto}
          onClose={() => setLightboxOpen(false)}
          onNavigate={() => {
            /* single item; no inter-item nav */
          }}
        />
      )}
    </section>
  );
}
