import type { Metadata } from "next";
import ProcesContent from "./ProcesContent";

export const metadata: Metadata = {
  title: "Het Proces",
  description:
    "Ontdek hoe Gijzerwerken werkt: van inspiratie en materiaal verzamelen tot smeden, lassen en het eindresultaat. Elk stuk is uniek handgemaakt.",
  alternates: {
    canonical: "https://gijzerwerken.com/proces",
  },
  openGraph: {
    title: "Het Proces | Gijzerwerken",
    description:
      "Van rauw materiaal tot kunstwerk — het ambachtelijke proces achter Gijzerwerken.",
    url: "https://gijzerwerken.com/proces",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Het ambachtelijke proces van Gijzerwerken",
      },
    ],
  },
};

export default function ProcesPage() {
  return <ProcesContent />;
}
