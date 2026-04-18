import type { Metadata } from "next";
import ProcesContent from "./ProcesContent";

export const metadata: Metadata = {
  title: "Het Proces — Gijzerwerken",
  description:
    "Van rauw materiaal tot kunstwerk in vijf stappen. Ontdek hoe Gijs Gonlag upcycled metaalkunst creëert.",
  openGraph: {
    title: "Het Proces — Gijzerwerken",
    description:
      "Van rauw materiaal tot kunstwerk — het ambachtelijke proces achter Gijzerwerken.",
  },
};

export default function ProcesPage() {
  return <ProcesContent />;
}
