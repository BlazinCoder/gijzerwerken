"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactForm from "@/components/ui/ContactForm";

const INFO_ITEMS = [
  {
    label: "Locatie",
    value: "Schiedam, Zuid-Holland",
    sub: "Op afspraak te bezoeken",
    icon: (
      <svg
        className="h-5 w-5 text-copper"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
  },
  {
    label: "E-mail",
    value: "info@gijzerwerken.com",
    href: "mailto:info@gijzerwerken.com",
    icon: (
      <svg
        className="h-5 w-5 text-copper"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@gijzerwerken",
    href: "https://instagram.com/gijzerwerken",
    external: true,
    icon: (
      <svg
        className="h-5 w-5 text-copper"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
        />
      </svg>
    ),
  },
] as const;

export default function ContactContent() {
  const searchParams = useSearchParams();
  const onderwerp = searchParams.get("onderwerp") ?? undefined;
  const stuk = searchParams.get("stuk");
  const defaultBericht = stuk
    ? `Ik heb een vraag over: ${stuk}`
    : undefined;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Contact"
          subtitle="Neem gerust contact op — we denken graag mee"
          centered
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form column */}
          <div className="lg:col-span-3">
            <ContactForm
              defaultOnderwerp={onderwerp}
              defaultBericht={defaultBericht}
            />
          </div>

          {/* Info column */}
          <div className="lg:col-span-2">
            {INFO_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="mb-8 flex items-start gap-4"
              >
                <div className="mt-1 flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-cream/50">
                    {item.label}
                  </p>
                  {"href" in item && item.href ? (
                    <a
                      href={item.href}
                      {...("external" in item && item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="mt-1 block text-cream/80 transition-colors duration-300 hover:text-copper"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <>
                      <p className="mt-1 text-cream/80">{item.value}</p>
                      {"sub" in item && item.sub && (
                        <p className="text-sm text-cream/40">{item.sub}</p>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Werkplaats foto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-4 aspect-video overflow-hidden rounded-lg border border-iron-700/30 bg-iron-800"
            >
              <img
                src="/images/portfolio/gijs-marktkraam.jpg"
                alt="Gijs bij de werkplaats"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
