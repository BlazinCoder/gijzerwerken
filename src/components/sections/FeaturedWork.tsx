"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioItems } from "@/data/portfolio";
import PortfolioCard from "@/components/ui/PortfolioCard";
import { useRouter } from "next/navigation";

export default function FeaturedWork() {
  const router = useRouter();

  const featuredItems = useMemo(
    () => portfolioItems.filter((item) => item.featured).slice(0, 4),
    []
  );

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-playfair text-3xl md:text-5xl text-cream">
            Uitgelicht werk
          </h2>
          <div className="w-16 h-0.5 bg-copper mx-auto mt-4" />
        </motion.div>

        {/* Featured grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <PortfolioCard
                item={item}
                onClick={() =>
                  router.push(`/portfolio?categorie=${item.category}`)
                }
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-copper transition-colors hover:text-copper-light"
          >
            Bekijk alle werken
            <span>&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
