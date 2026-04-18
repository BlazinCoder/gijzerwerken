"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ParallaxImage from "@/components/ui/ParallaxImage";

const WORKSHOP_IMAGES = [
  { src: "/images/portfolio/gieter-sculptuur-1.jpg", alt: "Gieter sculptuur" },
  { src: "/images/portfolio/flamingo-honda.jpg", alt: "Flamingo sculptuur" },
  { src: "/images/portfolio/uil-sculptuur.jpg", alt: "Uil sculptuur" },
  { src: "/images/portfolio/vuurkorf-geometrisch.jpg", alt: "Geometrische vuurkorf" },
];

const FACTS = [
  { target: 50, suffix: "+", label: "Kunstwerken" },
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
              "Al van jongs af aan gefascineerd door materiaal en vorm, begon Gijs Gonlag met het bewerken van metaal in een kleine werkplaats in Schiedam. Wat begon als een hobby groeide uit tot een passie — en uiteindelijk tot een ambacht. Met niets meer dan oud ijzer, een lasapparaat en een onuitputtelijk geduld creëert hij sculpturen die rauw én verfijnd tegelijk zijn.",
              "Elk kunstwerk begint met materiaal dat anderen weggooien. Gerecycled staal, verweerde buizen, vergeten machineonderdelen — Gijs ziet er schoonheid in waar anderen afval zien. Dat is de kern van zijn werk: nieuwe betekenis geven aan wat al een leven achter zich heeft. Duurzaamheid is geen marketingterm, het is de basis van elke creatie.",
              "Vanuit zijn werkplaats aan de Maashaven werkt Gijs in stilte aan sculpturen, bloemen van metaal, vuurkorven en maatwerk meubels. Elk stuk is volledig met de hand gemaakt — geen mallen, geen massaproductie. Alleen vakmanschap, eerlijk materiaal en oog voor detail. Het resultaat: unieke objecten die een verhaal vertellen en een leven lang meegaan.",
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
