"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { PortfolioItem, Category } from "@/data/portfolio";

const APPLE_EASE = [0.25, 0.46, 0.45, 0.94] as const;

const CATEGORY_GRADIENTS: Record<Category, string> = {
  sculpturen: "from-iron-700 via-iron-800 to-copper-dark",
  bloemen: "from-copper via-copper-light to-ember-glow",
  maatwerk: "from-iron-800 via-iron-700 to-iron-600",
};

interface LightboxProps {
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  initialPhotoIndex?: number;
}

export default function Lightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
  initialPhotoIndex = 0,
}: LightboxProps) {
  const item = items[currentIndex];
  const [imgError, setImgError] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(initialPhotoIndex);
  const [lensVisible, setLensVisible] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, bgX: 0, bgY: 0, bgW: 0, bgH: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  const LENS_SIZE = 200;
  const ZOOM = 3;

  const photos =
    item?.images && item.images.length > 0 ? item.images : item ? [item.imageSrc] : [];
  const hasMultiplePhotos = photos.length > 1;
  const activePhoto = photos[photoIndex];
  const hasMultipleItems = items.length > 1;

  // Reset photo state when navigating to a different portfolio item
  useEffect(() => {
    setPhotoIndex(0);
    setImgError(false);
    setLensVisible(false);
  }, [currentIndex]);

  // Reset image-error + lens when photo within item changes
  useEffect(() => {
    setImgError(false);
    setLensVisible(false);
  }, [photoIndex]);

  const goItemPrev = useCallback(() => {
    onNavigate(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  }, [currentIndex, items.length, onNavigate]);

  const goItemNext = useCallback(() => {
    onNavigate(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, items.length, onNavigate]);

  const goPhotoPrev = useCallback(() => {
    setPhotoIndex((i) => (i === 0 ? photos.length - 1 : i - 1));
  }, [photos.length]);

  const goPhotoNext = useCallback(() => {
    setPhotoIndex((i) => (i === photos.length - 1 ? 0 : i + 1));
  }, [photos.length]);

  // Keyboard navigation + body scroll lock
  useEffect(() => {
    document.body.classList.add("menu-open");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        if (e.shiftKey) {
          goItemPrev();
        } else if (hasMultiplePhotos) {
          goPhotoPrev();
        } else {
          goItemPrev();
        }
        return;
      }
      if (e.key === "ArrowRight") {
        if (e.shiftKey) {
          goItemNext();
        } else if (hasMultiplePhotos) {
          goPhotoNext();
        } else {
          goItemNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, goItemPrev, goItemNext, goPhotoPrev, goPhotoNext, hasMultiplePhotos]);

  if (!item) return null;

  const fadeDuration = reducedMotion ? 0 : 0.3;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: APPLE_EASE }}
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-iron-900/95 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: APPLE_EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-8 flex w-full max-w-6xl flex-col gap-6 px-6 md:gap-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 right-4 z-10 text-3xl text-cream/50 transition-colors hover:text-cream md:right-0"
          aria-label="Sluiten"
        >
          &times;
        </button>

        {/* Main content row: photo column + metadata column */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
          {/* Photo column */}
          <div className="flex flex-col gap-3 md:w-[60%]">
            <div className="relative flex items-center justify-center">
              {/* Photo prev (within item) */}
              {hasMultiplePhotos && (
                <button
                  onClick={goPhotoPrev}
                  className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-iron-900/50 text-xl text-cream/70 transition-colors hover:bg-iron-900/80 hover:text-cream"
                  aria-label="Vorige foto"
                >
                  &#8249;
                </button>
              )}

              <div className="relative flex h-[50vh] w-full items-center justify-center md:h-[70vh]">
                {imgError ? (
                  <div
                    className={`h-full w-full rounded-lg bg-gradient-to-br ${CATEGORY_GRADIENTS[item.category]}`}
                  />
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activePhoto}
                      ref={imgRef}
                      src={activePhoto}
                      alt={item.title}
                      loading="eager"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: fadeDuration, ease: APPLE_EASE }}
                      onMouseEnter={() => setLensVisible(true)}
                      onMouseLeave={() => setLensVisible(false)}
                      onMouseMove={(e) => {
                        const el = e.currentTarget;
                        const rect = el.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const bgW = rect.width * ZOOM;
                        const bgH = rect.height * ZOOM;
                        const bgX = -(x * ZOOM - LENS_SIZE / 2);
                        const bgY = -(y * ZOOM - LENS_SIZE / 2);
                        setLensPos({ x, y, bgX, bgY, bgW, bgH });
                      }}
                      className="max-h-full max-w-full rounded-lg object-contain md:cursor-crosshair"
                      onError={() => setImgError(true)}
                    />
                  </AnimatePresence>
                )}
                {!imgError && lensVisible && !reducedMotion && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute hidden rounded-full border-2 border-copper/60 shadow-2xl md:block"
                    style={{
                      width: LENS_SIZE,
                      height: LENS_SIZE,
                      left: (imgRef.current?.offsetLeft ?? 0) + lensPos.x - LENS_SIZE / 2,
                      top: (imgRef.current?.offsetTop ?? 0) + lensPos.y - LENS_SIZE / 2,
                      backgroundImage: `url(${activePhoto})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: `${lensPos.bgW}px ${lensPos.bgH}px`,
                      backgroundPosition: `${lensPos.bgX}px ${lensPos.bgY}px`,
                    }}
                  />
                )}
              </div>

              {/* Photo next (within item) */}
              {hasMultiplePhotos && (
                <button
                  onClick={goPhotoNext}
                  className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-iron-900/50 text-xl text-cream/70 transition-colors hover:bg-iron-900/80 hover:text-cream"
                  aria-label="Volgende foto"
                >
                  &#8250;
                </button>
              )}
            </div>

            {/* Thumbnail strip */}
            {hasMultiplePhotos && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {photos.map((src, i) => {
                  const isActive = i === photoIndex;
                  return (
                    <button
                      key={src}
                      onClick={() => setPhotoIndex(i)}
                      className={`flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                        isActive
                          ? "border-copper"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`Foto ${i + 1} van ${photos.length}`}
                      aria-current={isActive}
                    >
                      <img
                        src={src}
                        alt={`${item.title} - foto ${i + 1}`}
                        className="h-16 w-16 object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Metadata panel */}
          <div className="flex flex-col gap-4 md:w-[40%]">
            <h2 className="font-playfair text-2xl text-cream md:text-3xl">
              {item.title}
            </h2>
            <p className="text-sm leading-relaxed text-cream/80 md:text-base">
              {item.description}
            </p>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-copper">
                {item.material}
              </span>
              {item.dimensions && (
                <span className="text-xs uppercase tracking-widest text-cream/40">
                  {item.dimensions}
                </span>
              )}
            </div>

            {hasMultiplePhotos && (
              <span className="text-xs uppercase tracking-wider text-cream/40">
                Foto {photoIndex + 1} / {photos.length}
              </span>
            )}
          </div>
        </div>

        {/* Item navigation (between portfolio items) */}
        {hasMultipleItems && (
          <div className="flex items-center justify-between gap-4 border-t border-iron-700 pt-4 text-sm text-cream/60 md:justify-center md:gap-12">
            <button
              onClick={goItemPrev}
              className="flex items-center gap-2 transition-colors hover:text-cream"
              aria-label="Vorig werk"
            >
              <span aria-hidden="true">&larr;</span>
              <span>Vorig werk</span>
            </button>
            <span className="text-xs uppercase tracking-wider text-cream/30">
              {currentIndex + 1} / {items.length}
            </span>
            <button
              onClick={goItemNext}
              className="flex items-center gap-2 transition-colors hover:text-cream"
              aria-label="Volgend werk"
            >
              <span>Volgend werk</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
