"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { ProcessStep } from "@/data/portfolio";
import SectionHeader from "@/components/ui/SectionHeader";

interface MaakProcesProps {
  steps: ProcessStep[];
}

function ProcesFoto({
  src,
  alt,
  paired,
}: {
  src: string;
  alt: string;
  paired: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-lg">
      {imgError ? (
        <div className="aspect-[3/4] w-full bg-iron-800" />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={
            paired ? "aspect-[3/4] w-full object-cover" : "h-auto w-full"
          }
          onError={() => setImgError(true)}
        />
      )}
      {/* Randen lossen op in de iron-900 achtergrond — inset shadow, geen mask (Safari) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 55px 20px #0a0a0a" }}
      />
    </div>
  );
}

function MaakProcesStap({
  step,
  index,
  reduced,
}: {
  step: ProcessStep;
  index: number;
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.45"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  const paired = step.images.length > 1;

  return (
    <motion.div ref={ref} style={reduced ? undefined : { opacity, y }}>
      <div
        className={
          paired
            ? "grid grid-cols-1 gap-6 md:grid-cols-2"
            : "mx-auto max-w-xl"
        }
      >
        {step.images.map((src, i) => (
          <ProcesFoto
            key={src}
            src={src}
            alt={
              paired ? `${step.caption} — foto ${i + 1}` : step.caption
            }
            paired={paired}
          />
        ))}
      </div>
      <div className="mt-6 text-center">
        <span className="font-playfair text-sm tracking-[0.3em] text-copper">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="mx-auto mt-2 max-w-md text-base md:text-lg leading-relaxed text-cream/80">
          {step.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function MaakProces({ steps }: MaakProcesProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end center"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section>
      <SectionHeader title="Het maakproces" centered={false} />
      <div ref={lineRef} className="relative mx-auto mt-16 max-w-3xl">
        {/* Background line */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-iron-700"
        />
        {/* Animated foreground line */}
        <motion.div
          aria-hidden
          style={{ scaleY: reduced ? 1 : lineScaleY, transformOrigin: "top" }}
          className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-copper shadow-[0_0_8px_rgba(196,122,42,0.6)]"
        />
        {/* Steps */}
        <div className="relative space-y-32 md:space-y-48">
          {steps.map((step, i) => (
            <MaakProcesStap
              key={step.images[0]}
              step={step}
              index={i}
              reduced={!!reduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
