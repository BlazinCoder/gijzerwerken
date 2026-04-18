import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio — Gijzerwerken",
  description:
    "Bekijk het portfolio van Gijzerwerken: sculpturen, metalen bloemen, vuurkorven en maatwerk meubels van gerecycled ijzer.",
  openGraph: {
    title: "Portfolio — Gijzerwerken",
    description:
      "Upcycled metaalkunst uit Schiedam. Sculpturen, bloemen, vuurkorven en maatwerk.",
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
