import type { Metadata } from "next";
import { Suspense } from "react";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact — Gijzerwerken",
  description:
    "Neem contact op met Gijzerwerken voor maatwerk, vragen of een bezoek aan de werkplaats in Schiedam.",
  openGraph: {
    title: "Contact — Gijzerwerken",
    description:
      "Neem contact op voor maatwerk of een bezoek aan de werkplaats.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Gijzerwerken",
  description:
    "Upcycled metaalkunst door Gijs Gonlag — sculpturen, bloemen, vuurkorven en maatwerk meubels van gerecycled ijzer.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Schiedam",
    addressRegion: "Zuid-Holland",
    addressCountry: "NL",
  },
  url: "https://gijzerwerken.com",
  sameAs: ["https://instagram.com/gijzerwerken"],
};

function ContactFallback() {
  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="h-12 w-48 mx-auto rounded bg-iron-800 animate-pulse" />
        <div className="mt-4 h-4 w-64 mx-auto rounded bg-iron-800 animate-pulse" />
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
      <Suspense fallback={<ContactFallback />}>
        <ContactContent />
      </Suspense>
    </>
  );
}
