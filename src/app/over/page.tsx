import type { Metadata } from "next";
import OverContent from "./OverContent";

export const metadata: Metadata = {
  title: "Over Gijs — Gijzerwerken",
  description:
    "Metaalkunstenaar Gijs Gonlag uit Schiedam. Van oud ijzer tot unieke kunstwerken — het verhaal achter Gijzerwerken.",
  openGraph: {
    title: "Over Gijs — Gijzerwerken",
    description:
      "Het verhaal van Gijs Gonlag, metaalkunstenaar uit Schiedam.",
  },
};

export default function OverPage() {
  return <OverContent />;
}
