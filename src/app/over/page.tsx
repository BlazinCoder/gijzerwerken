import type { Metadata } from "next";
import OverContent from "./OverContent";

export const metadata: Metadata = {
  title: "Over Gijs Gonlag",
  description:
    "Leer Gijs Gonlag kennen: metaalkunstenaar en ambachtsman uit Schiedam. Van oud ijzer tot kunstwerk — elk stuk vertelt een verhaal.",
  alternates: {
    canonical: "https://gijzerwerken.com/over",
  },
  openGraph: {
    title: "Over Gijs Gonlag | Gijzerwerken",
    description:
      "Het verhaal van Gijs Gonlag, metaalkunstenaar uit Schiedam.",
    url: "https://gijzerwerken.com/over",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gijs Gonlag — Metaalkunstenaar uit Schiedam",
      },
    ],
  },
};

export default function OverPage() {
  return <OverContent />;
}
