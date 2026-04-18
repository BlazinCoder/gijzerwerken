"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import ForgeSparks from "@/components/three/ForgeSparks";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  gradient: string;
  imageSrc?: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Inspiratie & Ontwerp",
    description:
      "Elk project begint met een idee — soms van een klant, soms van een toevallige vondst op de sloop. Gijs schetst het ontwerp op papier, bepaalt de verhoudingen en kiest welke materialen het verhaal het beste vertellen.",
    gradient: "from-iron-700 via-iron-800 to-copper-dark",
    imageSrc: "/images/portfolio/eettafel-industrieel.jpg",
  },
  {
    number: "02",
    title: "Materiaal Verzamelen",
    description:
      "Op zoek naar het juiste materiaal bezoekt Gijs sloopterreinen, recyclingbedrijven en oude fabrieken. Elk stuk metaal heeft een eigen karakter — roestpatronen, buigingen en texturen die het verhaal van het kunstwerk vormen.",
    gradient: "from-copper-dark via-iron-700 to-iron-800",
    imageSrc: "/images/portfolio/vuurkorf-draak.jpg",
  },
  {
    number: "03",
    title: "Vormen & Lassen",
    description:
      "Met slijptol, pers en lasapparaat worden de losse onderdelen samengevoegd tot een geheel. Dit is waar het echte vakwerk zit: millimeter voor millimeter wordt het ontwerp werkelijkheid. Elke las wordt met de hand gezet.",
    gradient: "from-iron-800 via-iron-700 to-iron-600",
    imageSrc: "/images/portfolio/stier-abstract.jpg",
  },
  {
    number: "04",
    title: "Afwerking & Patina",
    description:
      "Na het vormen volgt de afwerking. Sommige stukken worden gepolijst voor een strak resultaat, andere worden bewust ruw gelaten of behandeld met een patina. De afwerking bepaalt het karakter — industrieel, elegant of verweerd.",
    gradient: "from-rust via-copper-dark to-iron-800",
    imageSrc: "/images/portfolio/stalen-roos.jpg",
  },
  {
    number: "05",
    title: "Het Eindresultaat",
    description:
      "Na dagen of weken werk staat het kunstwerk er. Klaar om een plek te krijgen in een huis, tuin of openbare ruimte. Elk stuk is uniek, volledig met de hand gemaakt, en vertelt het verhaal van het materiaal waaruit het is geboren.",
    gradient: "from-copper-dark via-iron-800 to-iron-700",
    imageSrc: "/images/portfolio/zonnebloem.jpg",
  },
];

function TimelineStep({
  step,
  index,
}: {
  step: ProcessStep;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative pb-16 last:pb-0">
      {/* Dot — mobiel links, desktop midden */}
      <motion.div
        initial={{ backgroundColor: "#2a2a2a", scale: 0.5 }}
        whileInView={{ backgroundColor: "#c47a2a", scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4 }}
        className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-4 h-4 rounded-full border-2 border-iron-900 z-10"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="ml-12 md:ml-0 md:grid md:grid-cols-2 md:gap-12"
      >
        {/* Image */}
        <div
          className={`rounded-lg aspect-[4/3] overflow-hidden mb-6 md:mb-0 ${
            isEven ? "md:order-1" : "md:order-2"
          }`}
        >
          {step.imageSrc ? (
            <img
              src={step.imageSrc}
              alt={step.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${step.gradient}`} />
          )}
        </div>

        {/* Text */}
        <div
          className={`${isEven ? "md:order-2 md:text-left" : "md:order-1 md:text-right"}`}
        >
          <span className="font-playfair text-6xl text-copper/20 leading-none">
            {step.number}
          </span>
          <h3 className="font-playfair text-2xl md:text-3xl text-cream mt-2">
            {step.title}
          </h3>
          <p className="text-cream/70 leading-relaxed mt-3 max-w-prose">
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProcesContent() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative min-h-screen" style={{ zIndex: 1 }}>
      <ForgeSparks />
      {/* Header */}
      <section className="pt-32 pb-12 px-6">
        <SectionHeader
          title="Het Proces"
          subtitle="Van rauw materiaal tot kunstwerk — elke stap met de hand"
        />
      </section>

      {/* Timeline */}
      <section className="px-6 py-16">
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Background line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-iron-700" />

          {/* Animated foreground line */}
          <motion.div
            style={{ scaleY: lineScaleY, transformOrigin: "top" }}
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-copper shadow-[0_0_8px_rgba(196,122,42,0.6)]"
          />

          {/* Steps */}
          {PROCESS_STEPS.map((step, i) => (
            <TimelineStep key={step.number} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl text-cream">
            Eigen idee?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-6 text-sm tracking-widest uppercase text-copper hover:text-copper-light transition-colors"
          >
            Neem contact op
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
