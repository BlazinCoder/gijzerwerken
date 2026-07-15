import type { Metadata } from "next";
import { Suspense } from "react";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Gijzerwerken voor maatwerk metaalkunst, sculpturen of meubels. Gevestigd in Schiedam, werkzaam door heel Nederland.",
  alternates: {
    canonical: "https://gijzerwerken.com/contact",
  },
  openGraph: {
    title: "Contact | Gijzerwerken",
    description:
      "Neem contact op voor maatwerk of een bezoek aan de werkplaats.",
    url: "https://gijzerwerken.com/contact",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact opnemen met Gijzerwerken in Schiedam",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Gijzerwerken",
  description:
    "Upcycled metaalkunst, sculpturen, metalen bloemen en maatwerk meubels door Gijs Gonlag",
  url: "https://gijzerwerken.com",
  image: "https://gijzerwerken.com/og-image.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Schiedam",
    addressRegion: "Zuid-Holland",
    addressCountry: "NL",
  },
  email: "info@gijzerwerken.com",
  sameAs: ["https://www.instagram.com/gijzerwerken"],
  priceRange: "€€",
};

function ContactFallback() {
  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
      <div className="lg:col-span-3 space-y-4">
        <div className="h-10 w-full rounded bg-iron-800 animate-pulse" />
        <div className="h-10 w-full rounded bg-iron-800 animate-pulse" />
        <div className="h-32 w-full rounded bg-iron-800 animate-pulse" />
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="h-6 w-3/4 rounded bg-iron-800 animate-pulse" />
        <div className="h-6 w-2/3 rounded bg-iron-800 animate-pulse" />
        <div className="h-6 w-1/2 rounded bg-iron-800 animate-pulse" />
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="font-playfair text-3xl md:text-5xl text-cream">
              Contact
            </h1>
            <div className="w-16 h-0.5 bg-copper mt-4 mx-auto" />
            <p className="mt-4 text-cream/70 text-lg max-w-2xl mx-auto">
              Neem gerust contact op — we denken graag mee
            </p>
          </div>
          <Suspense fallback={<ContactFallback />}>
            <ContactContent />
          </Suspense>
        </div>
      </div>
    </>
  );
}
