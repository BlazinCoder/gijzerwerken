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
    id: "koperen-tulpenboeket",
    title: "Koperen Tulpenboeket",
    category: "bloemen",
    description:
      "Boeket van handgevormde tulpen in koper en RVS, gepresenteerd in een gesmede vaas. Elke tulp is uniek gevormd uit plaatkoper.",
    imageSrc: "/images/portfolio/tulpenboeket.jpg",
    featured: true,
    material: "Koper & RVS",
  },
  {
    id: "stalen-zonnebloem",
    title: "Stalen Zonnebloem",
    category: "bloemen",
    description:
      "Levensgrote zonnebloem van staal met gehamerd bloemhart. De bladeren zijn individueel gesmeed en gepolijst voor een warm, gouden glans.",
    imageSrc: "/images/portfolio/zonnebloem.jpg",
    featured: true,
    material: "Gesmeed staal",
  },
  {
    id: "zwevende-gieter",
    title: "Zwevende Gieter",
    category: "sculpturen",
    description:
      "Tuinsculptuur van een zwevende gieter, opgehangen aan een onzichtbare ketting. Het water wordt gesuggereerd door gelaste kettingschakels.",
    imageSrc: "/images/portfolio/gieter.jpg",
    featured: true,
    material: "Staal & ketting",
  },
  {
    id: "honda-zwaan",
    title: "Honda Zwaan",
    category: "sculpturen",
    description:
      "Zwaan gemaakt van een oude Honda-motortank als lijf en een zware motorketting als sierlijke nek. Upcycling in zijn puurste vorm.",
    imageSrc: "/images/portfolio/honda-zwaan.jpg",
    featured: true,
    material: "Honda-motortank & motorketting",
  },
  {
    id: "roos-moederdag",
    title: "Roos voor Moederdag",
    category: "bloemen",
    description:
      "Grote cortenstaal roos op stalen voet, gemaakt als cadeau voor Moederdag. De roestbruine patina geeft een warme, organische uitstraling.",
    imageSrc: "/images/portfolio/roos-moederdag.jpg",
    featured: false,
    material: "Cortenstaal",
  },
  {
    id: "waratah-bloem",
    title: "Waratah Bloem",
    category: "bloemen",
    description:
      "Kleurrijke metalen waratah met felrode krullen en groene kelkbladeren. Geïnspireerd op de Australische waratah, volledig van gelast staal.",
    imageSrc: "/images/portfolio/waratah.jpg",
    featured: false,
    material: "Gelast staal, gepoedercoat",
  },
  {
    id: "industriele-eettafel",
    title: "Industriële Eettafel",
    category: "maatwerk",
    description:
      "Eettafel met stalen frame en gebrand houten blad. Het hout is met de Japanse shou sugi ban techniek behandeld voor een unieke textuur.",
    imageSrc: "/images/portfolio/eettafel.jpg",
    featured: false,
    material: "Staal & gebrand hout (shou sugi ban)",
  },
  {
    id: "deur-staal-glas-hout",
    title: "Deur van Staal, Glas en Hout",
    category: "maatwerk",
    description:
      "Op maat gemaakte pivotdeur met stalen frame, glas en massief hout. Geometrische indeling combineert transparantie met warmte.",
    imageSrc: "/images/portfolio/deur.jpg",
    featured: false,
    material: "Staal, glas & massief hout",
  },
  {
    id: "rvs-schoorsteenkap",
    title: "Schoorsteenkap",
    category: "maatwerk",
    description:
      "Op maat gemaakte schoorsteenkap van RVS met een gesmede klavertje als bekroning. De gebogen daklijn houdt regen weg en geeft het huis een ambachtelijke kroon.",
    imageSrc: "/images/portfolio/schoorsteenkap.jpg",
    featured: false,
    material: "RVS & gesmeed staal",
  },
  {
    id: "boomstam-bartafel",
    title: "Boomstam Bartafel",
    category: "maatwerk",
    description:
      "Bartafel set van massieve boomstammen met stalen voetsteunen. Elk stuk hout is uniek en de stalen details zijn handgesmeed.",
    imageSrc: "/images/portfolio/bartafel.jpg",
    featured: false,
    material: "Massieve boomstam & staal",
  },
  {
    id: "stalen-trap-wandplanken",
    title: "Stalen Trap & Wandplanken",
    category: "maatwerk",
    description:
      "Bibliotheektrap met rail-systeem en bijpassende wandplanken, volledig van zwart staal met houten accenten.",
    imageSrc: "/images/portfolio/trap-wandplanken.jpg",
    featured: false,
    material: "Zwart staal & hout",
  },
  {
    id: "wijnrek-staal-hout",
    title: "Wijnrek Staal & Hout",
    category: "maatwerk",
    description:
      "Wijnrek met gegolfde stalen houders in een houten frame. Plaats voor tientallen flessen, compact en stijlvol.",
    imageSrc: "/images/portfolio/wijnrek.jpg",
    featured: false,
    material: "Staal & hout",
  },
  {
    id: "gesmede-roos-zwart",
    title: "Gesmede Roos Zwart",
    category: "bloemen",
    description:
      "Elegante zwart gesmede roos met steel en bladeren. Tijdloos cadeau, hier gefotografeerd tussen verse bloemen op een feesttafel.",
    imageSrc: "/images/portfolio/roos-zwart.jpg",
    featured: false,
    material: "Zwart gesmeed staal",
  },
  {
    id: "handgemaakte-smoker",
    title: "Handgemaakte Smoker",
    category: "vuurkorven",
    description:
      "Volledig handgemaakte offset smoker met moersleutel als handvat, thermometer en apart vuurdeur. Gebouwd om jarenlang mee te gaan.",
    imageSrc: "/images/portfolio/smoker.jpg",
    featured: false,
    material: "Staal",
  },
  {
    id: "industriele-barkrukken",
    title: "Industriële Barkrukken",
    category: "maatwerk",
    description:
      "Set bijzettafels met Z-vormig stalen onderstel en gebrand houten blad. Industrieel design dat in elk interieur past.",
    imageSrc: "/images/portfolio/barkrukken.jpg",
    featured: false,
    material: "Staal & gebrand hout",
  },
];
