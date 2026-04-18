export const CATEGORIES = ["sculpturen", "bloemen", "maatwerk", "vuurkorven"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  sculpturen: "Sculpturen",
  bloemen: "Bloemen",
  maatwerk: "Maatwerk",
  vuurkorven: "Vuurkorven",
};

export interface PortfolioItem {
  id: string;
  title: string;
  category: Category;
  description: string;
  imageSrc: string;
  featured: boolean;
  dimensions?: string;
  material: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "uil-sculptuur",
    title: "De Nachtwaker",
    category: "sculpturen",
    description:
      "Levensgrote uil opgebouwd uit gerecyclede moersleutels en tandwielen. Elk onderdeel is met de hand gevormd en gelast tot een organisch geheel.",
    imageSrc: "/images/portfolio/uil-sculptuur.jpg",
    featured: true,
    dimensions: "85 × 40 × 35 cm",
    material: "Cortenstaal & gerecycled gereedschap",
  },
  {
    id: "stier-abstract",
    title: "Charging Bull",
    category: "sculpturen",
    description:
      "Abstracte stier in beweging, opgebouwd uit gestapelde staalplaten. De open structuur geeft het beeld lichtheid ondanks het zware materiaal.",
    imageSrc: "/images/portfolio/stier-abstract.jpg",
    featured: true,
    dimensions: "120 × 180 × 60 cm",
    material: "Cortenstaal",
  },
  {
    id: "tulpen-trio",
    title: "Tulpen Trio",
    category: "bloemen",
    description:
      "Drie metalen tulpen op slanke stelen, elk in een andere fase van bloei. De bladeren krullen naturalistisch door warmtebehandeling.",
    imageSrc: "/images/portfolio/tulpen-vaas.png",
    featured: true,
    dimensions: "150 × 45 × 45 cm",
    material: "RVS & koper",
  },
  {
    id: "roos-eeuwig",
    title: "Eeuwige Roos",
    category: "bloemen",
    description:
      "Handgesmede roos met gedetailleerde blaadjes. Elke bloemblad is individueel gevormd en samengevoegd tot een natuurgetrouwe compositie.",
    imageSrc: "/images/portfolio/stalen-roos.jpg",
    featured: false,
    dimensions: "60 × 25 × 25 cm",
    material: "Koper & messing",
  },
  {
    id: "zonnebloem-xl",
    title: "Zonnegroet",
    category: "bloemen",
    description:
      "Overmaatse zonnebloem van twee meter hoog. De kern bestaat uit honderden kleine boutjes die het zaadpatroon nabootsen.",
    imageSrc: "/images/portfolio/zonnebloem.jpg",
    featured: false,
    dimensions: "200 × 70 × 70 cm",
    material: "Cortenstaal & bouten",
  },
  {
    id: "eettafel-industrieel",
    title: "Tafel De Werkplaats",
    category: "maatwerk",
    description:
      "Industriële eettafel met massief eiken blad op een frame van I-balken. De verbindingen zijn zichtbaar gelast als designelement.",
    imageSrc: "/images/portfolio/eettafel-industrieel.jpg",
    featured: true,
    dimensions: "220 × 100 × 76 cm",
    material: "Staal & massief eiken",
  },
  {
    id: "kapstok-boom",
    title: "De Kapstokboom",
    category: "maatwerk",
    description:
      "Vrijstaande kapstok in de vorm van een kale boom. Takken dienen als haken, de voet is een gestileerde wortelstructuur.",
    imageSrc: "/images/portfolio/kapstok-boom.jpg",
    featured: false,
    dimensions: "190 × 80 × 80 cm",
    material: "Gesmeed staal",
  },
  {
    id: "vuurkorf-draak",
    title: "Drakenvuur",
    category: "vuurkorven",
    description:
      "Vuurkorf met uitgesneden drakensilhouet. Bij brandend vuur werpt de draak schaduwen in de tuin — een theatraal lichtspel.",
    imageSrc: "/images/portfolio/vuurkorf-draak.jpg",
    featured: false,
    dimensions: "60 × 60 × 80 cm",
    material: "Cortenstaal 3mm",
  },
  {
    id: "vuurkorf-geometrisch",
    title: "Geo Fire",
    category: "vuurkorven",
    description:
      "Geometrische vuurkorf met zeshoekig patroon. Het open ontwerp zorgt voor optimale luchtcirculatie en een spectaculair vlammenspel.",
    imageSrc: "/images/portfolio/vuurkorf-geometrisch.jpg",
    featured: false,
    dimensions: "55 × 55 × 70 cm",
    material: "Cortenstaal 4mm",
  },
  {
    id: "tuinhek-art",
    title: "Poort der Seizoenen",
    category: "maatwerk",
    description:
      "Dubbel tuinhek met in elk paneel een seizoen uitgebeeld in uitgesneden bladmotieven. Van lenteknoppen tot winterkale takken.",
    imageSrc: "/images/portfolio/tuinhek-art.jpg",
    featured: false,
    dimensions: "180 × 240 × 5 cm",
    material: "Cortenstaal & RVS scharnieren",
  },
];
