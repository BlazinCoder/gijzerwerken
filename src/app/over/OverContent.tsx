"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ParallaxImage from "@/components/ui/ParallaxImage";

const WORKSHOP_IMAGES = [
  { src: "/images/portfolio/roos-moederdag.jpg", alt: "Cortenstaal roos" },
  { src: "/images/portfolio/smoker.jpg", alt: "Handgemaakte smoker" },
  { src: "/images/portfolio/eettafel.jpg", alt: "Industriële eettafel" },
  { src: "/images/portfolio/waratah.jpg", alt: "Waratah bloem" },
];

const FACTS = [
  { display: "2021", label: "Actief sinds" },
  { target: 100, suffix: "%", label: "Handgemaakt" },
  { label: "Gerecycled Materiaal" },
] as const;

export default function OverContent() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden rounded-lg aspect-[3/4]">
            <img
              src="/images/portfolio/gijs-marktkraam.jpg"
              alt="Gijs Gonlag bij zijn marktkraam"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-playfair text-4xl md:text-6xl text-cream">
              Gijs Gonlag
            </h1>
            <p className="text-sm tracking-widest uppercase text-copper mt-4">
              Metaalkunstenaar — Schiedam
            </p>
            <div className="w-16 h-0.5 bg-copper mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Verhaal */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <SectionHeader title="Het Verhaal" />
          <div className="mt-12 space-y-6">
            {[
              "Al van jongs af aan ben ik gefascineerd door materiaal, vorm en het maken met mijn handen. In een kleine werkplaats in Schiedam begon ik met het bewerken van metaal. Wat eerst begon als een hobby groeide langzaam uit tot een passie en uiteindelijk tot een ambacht. Met oud ijzer, gerecyclede metalen, een lasapparaat en veel geduld maak ik sculpturen die tegelijkertijd rauw, verfijnd en vol karakter zijn.",
              "Tijdens mijn eerste baan in de windmolens raakte ik steeds meer geïnteresseerd in lassen en metaalbewerking. Door jarenlang te oefenen groeide niet alleen mijn techniek, maar ook mijn vertrouwen. Inmiddels geloof ik dat bijna alles te maken is, zolang je blijft experimenteren en durft te creëren.",
              "De inspiratie voor mijn werk haal ik uit de wereld om mij heen. Tijdens reizen raakte ik gefascineerd door de vormen, structuren en kleuren van bloemen en planten. Die natuurlijke lijnen vertaal ik naar staal, koper en andere gerecyclede metalen. Zo ontstaat een combinatie van natuur en industrie: kwetsbare organische vormen gemaakt van sterke, gebruikte materialen.",
              "Met mijn werk wil ik laten zien dat afgedankte metalen nieuw leven kunnen krijgen. Elk object draagt sporen van een vorig bestaan, maar krijgt in een nieuwe vorm opnieuw betekenis. Vanuit Schiedam bouw ik stap voor stap aan een eigen stijl waarin vakmanschap, duurzaamheid en design samenkomen.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-cream/70 leading-relaxed"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Werkplaats */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="De Werkplaats" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {WORKSHOP_IMAGES.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ParallaxImage imageSrc={image.src} alt={image.alt} gradient="from-iron-700 via-iron-800 to-copper-dark" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feiten strip */}
      <section className="py-16 bg-iron-800/50 border-y border-iron-700/50">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-around gap-8">
          {FACTS.map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-playfair text-4xl md:text-5xl text-copper">
                {"target" in fact ? (
                  <AnimatedCounter
                    target={fact.target}
                    suffix={fact.suffix}
                  />
                ) : "display" in fact ? (
                  <span>{fact.display}</span>
                ) : (
                  <span>♻</span>
                )}
              </div>
              <p className="text-sm tracking-widest uppercase text-cream/50 mt-2">
                {fact.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-playfair text-2xl md:text-3xl text-cream">
            Volg het proces op Instagram
          </p>
          <a
            href="https://instagram.com/gijzerwerken"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-copper hover:text-copper-light transition-colors text-sm tracking-widest uppercase"
          >
            @gijzerwerken
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
          </a>
        </motion.div>
      </section>
    </div>
  );
}
