import type { Metadata } from "next";
import HomeIntro from "./HomeIntro";

export const metadata: Metadata = {
  title: "Gijzerwerken — Upcycled Metaalkunst",
  description:
    "Sculpturen, bloemen en maatwerk van gerecycled ijzer door Gijs Gonlag uit Schiedam. Van schroot tot kunstwerk.",
  openGraph: {
    title: "Gijzerwerken — Upcycled Metaalkunst",
    description:
      "Upcycled metaalkunst door Gijs Gonlag. Van schroot tot kunstwerk.",
  },
};

export default function Home() {
  return <HomeIntro />;
}
