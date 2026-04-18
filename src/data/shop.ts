import type { Category } from "@/data/portfolio";

export interface ShopItem {
  id: string;
  title: string;
  category: Category;
  price: number;
  imageSrc: string;
  description: string;
  material: string;
  available: boolean;
}

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(price);

export const shopItems: ShopItem[] = [
  {
    id: "tulp-enkel",
    title: "Metalen Tulp Enkel",
    category: "bloemen",
    price: 85,
    imageSrc: "/images/portfolio/tulpen-vaas.png",
    description:
      "Handgesmede tulp op slanke staal stengel. Elk bloemblad is individueel gevormd en gelast.",
    material: "RVS & koper",
    available: true,
  },
  {
    id: "tulpen-boeket",
    title: "Tulpenboeket (5 stuks)",
    category: "bloemen",
    price: 275,
    imageSrc: "/images/portfolio/tulpen-vaas.png",
    description:
      "Vijf tulpen in verschillende stadia van bloei, samengebonden met een gesmede ring.",
    material: "RVS & koper",
    available: true,
  },
  {
    id: "roos-op-voet",
    title: "Roos op Voet",
    category: "bloemen",
    price: 95,
    imageSrc: "/images/portfolio/stalen-roos.jpg",
    description:
      "Enkele roos op een gewogen voetplaat. Ideaal als cadeau of decoratiestuk.",
    material: "Koper & messing",
    available: true,
  },
  {
    id: "mini-uiltje",
    title: "Mini Uiltje",
    category: "sculpturen",
    price: 145,
    imageSrc: "/images/portfolio/uil-sculptuur.jpg",
    description:
      "Kleine uil van gerecyclede boutjes en moertjes. Elk exemplaar is uniek door het gebruikte materiaal.",
    material: "Gerecycled staal",
    available: true,
  },
  {
    id: "stier-maquette",
    title: "Stier Maquette",
    category: "sculpturen",
    price: 350,
    imageSrc: "/images/portfolio/stier-abstract.jpg",
    description:
      "Schaalmodel van de Charging Bull. Handgesneden staalplaten op eikenhouten sokkel.",
    material: "Cortenstaal & eiken",
    available: false,
  },
  {
    id: "kandelaar-gedraaid",
    title: "Kandelaar Gedraaid",
    category: "maatwerk",
    price: 120,
    imageSrc: "/images/portfolio/eettafel-industrieel.jpg",
    description:
      "Driearmige kandelaar met gedraaide stelen. Past drie standaard dinerkaarsen.",
    material: "Gesmeed staal",
    available: true,
  },
  {
    id: "vuurkorf-botanisch",
    title: "Vuurkorf Botanisch",
    category: "vuurkorven",
    price: 295,
    imageSrc: "/images/portfolio/vuurkorf-draak.jpg",
    description:
      "Vuurkorf met uitgesneden bladmotieven. Het licht schijnt door de openingen voor een sfeervolle schaduwwerking.",
    material: "Cortenstaal 3mm",
    available: true,
  },
  {
    id: "vuurkorf-landschap",
    title: "Vuurkorf Landschap",
    category: "vuurkorven",
    price: 325,
    imageSrc: "/images/portfolio/vuurkorf-geometrisch.jpg",
    description:
      "Panoramische vuurkorf met Hollands landschap: molens, rietland en wolkenluchten.",
    material: "Cortenstaal 4mm",
    available: false,
  },
];
