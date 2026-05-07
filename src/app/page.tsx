import type { Metadata } from "next";
import HomeIntro from "./HomeIntro";

export const metadata: Metadata = {
  title: "Gijzerwerken — Upcycled Metaalkunst uit Schiedam",
  description:
    "Sculpturen, metalen bloemen en maatwerk meubels van gerecycled staal en koper. Handgemaakt door Gijs Gonlag in Schiedam — van schroot tot kunstwerk.",
  alternates: {
    canonical: "https://gijzerwerken.com",
  },
  openGraph: {
    title: "Gijzerwerken — Upcycled Metaalkunst uit Schiedam",
    description:
      "Sculpturen, bloemen en maatwerk van oud ijzer door Gijs Gonlag uit Schiedam",
    url: "https://gijzerwerken.com",
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
