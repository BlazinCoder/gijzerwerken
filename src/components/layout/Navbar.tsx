"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const APPLE_EASE = [0.25, 0.46, 0.45, 0.94] as const;

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/over", label: "Over Gijs" },
  { href: "/proces", label: "Het Proces" },
  { href: "/contact", label: "Contact" },
];

const menuContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: APPLE_EASE },
  },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <>
      <nav
        className="navbar-safe-area navbar-gpu-layer fixed top-0 left-0 right-0 z-50 bg-iron-900 border-b border-iron-700/50"
      >
        {/* Safe area cover — altijd opaque, dekt de notch/Dynamic-Island-zone af.
            Zit ín de <nav> (zelfde stacking context als z-50) → geen z-index-oorlog met
            Framer Motion page-transitions. Absolute → volgt de fixed navbar. Geen transitie:
            moet altijd instant #0a0a0a zijn. */}
        <div
          className="absolute top-0 left-0 right-0 bg-iron-900"
          style={{ height: "env(safe-area-inset-top, 0px)" }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 py-3 sm:py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="block">
            <img
              src="/images/logo-white.png"
              alt="Gijzerwerken - Upcycled Metaalkunst Logo"
              className="h-16 sm:h-20 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
                      isActive
                        ? "text-copper-light drop-shadow-[0_0_8px_rgba(232,168,73,0.6)]"
                        : "text-cream/70 hover:text-copper"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Hamburger button */}
          <button
            className="md:hidden relative w-11 h-11 flex flex-col justify-center items-center gap-1.5 z-[60]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block w-6 h-0.5 bg-cream origin-center"
              animate={
                prefersReduced
                  ? {}
                  : menuOpen
                  ? { rotate: 45, y: 4 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3, ease: APPLE_EASE }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-cream"
              animate={
                prefersReduced ? {} : menuOpen ? { opacity: 0 } : { opacity: 1 }
              }
              transition={{ duration: 0.2, ease: APPLE_EASE }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-cream origin-center"
              animate={
                prefersReduced
                  ? {}
                  : menuOpen
                  ? { rotate: -45, y: -4 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3, ease: APPLE_EASE }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu — buiten <nav> zodat fixed inset-0 viewport-relatief is */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: APPLE_EASE }}
            style={{ backgroundColor: "#0a0a0a" }}
            className="md:hidden fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Menu sluiten"
              className="absolute top-[calc(env(safe-area-inset-top)+1.5rem)] right-6 w-11 h-11 flex items-center justify-center text-cream text-3xl leading-none"
            >
              ×
            </button>

            <motion.div
              className="w-full flex flex-col items-center gap-2"
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    variants={menuItemVariants}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`block w-full text-center py-4 text-xl tracking-[0.15em] uppercase transition-colors duration-300 active:scale-[0.97] ${
                        isActive
                          ? "text-copper-light drop-shadow-[0_0_8px_rgba(232,168,73,0.6)]"
                          : "text-cream/90 hover:text-copper"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
