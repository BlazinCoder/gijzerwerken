import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Het portfolio van Gijzerwerken: handgemaakte stalen sculpturen, koperen tulpen, cortenstaal rozen, industriële meubels en maatwerk smeedwerk uit Schiedam.",
  alternates: {
    canonical: "https://gijzerwerken.com/portfolio",
  },
  openGraph: {
    title: "Portfolio | Gijzerwerken",
    description:
      "Upcycled metaalkunst uit Schiedam. Sculpturen, bloemen en maatwerk.",
    url: "https://gijzerwerken.com/portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Gijzerwerken — Upcycled Metaalkunst",
      },
    ],
  },
};

const galleryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Portfolio Gijzerwerken",
  description: "Handgemaakte metaalkunst, sculpturen en maatwerk meubels",
  url: "https://gijzerwerken.com/portfolio",
  author: {
    "@type": "Person",
    name: "Gijs Gonlag",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />
      <PortfolioContent />
    </>
  );
}
