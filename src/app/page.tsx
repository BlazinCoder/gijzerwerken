import type { Metadata } from "next";
import HomeIntro from "./HomeIntro";

export const metadata: Metadata = {
  title: "Gijzerwerken — Upcycled Metaalkunst",
  description:
    "Sculpturen, bloemen en maatwerk van gerecycled ijzer door Gijs Gonlag uit Schiedam. Van schroot tot kunstwerk.",
  openGraph: {
    title: "Gijzerwerken — Upcycled Metaalkunst",
    description:
      "Sculpturen, bloemen en maatwerk van oud ijzer door Gijs Gonlag uit Schiedam",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gijzerwerken — Upcycled Metaalkunst door Gijs Gonlag",
      },
    ],
  },
};

export default function Home() {
  return <HomeIntro />;
}
