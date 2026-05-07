export const CATEGORIES = ["sculpturen", "bloemen", "maatwerk"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  sculpturen: "Sculpturen",
  bloemen: "Bloemen",
  maatwerk: "Maatwerk",
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
  // Optional gallery — when present, images[0] must equal imageSrc.
  images?: string[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "koperen-tulpenboeket",
    title: "Koperen Tulpenboeket",
    category: "bloemen",
    description:
      "Metalen tulpen gemaakt van gerecycled RVS en koper. Een boeket dat blijft. De koperen stelen zullen met de tijd groen verkleuren door oxidatie, waardoor elke bloem langzaam verandert. Handgemaakt uit hergebruikte materialen.",
    imageSrc: "/images/portfolio/tulpenboeket.jpg",
    featured: true,
    material: "Koper & RVS",
    images: [
      "/images/portfolio/tulpenboeket.jpg",
      "/images/portfolio/tulpenboeket-2.jpg",
      "/images/portfolio/tulpenboeket-3.jpg",
      "/images/portfolio/tulpenboeket-4.jpg",
    ],
  },
  {
    id: "stalen-zonnebloem",
    title: "Stalen Zonnebloem",
    category: "bloemen",
    description:
      "Uit gerecycled staal groeide deze zonnebloem. Elk blad met de hand gebogen, gevormd door vuur, met een eigen karakter. De kern zwart gebrand, zoals de zaden van een echte zonnebloem. Het idee werd geboren in Australië, tijdens een gesprek met een kunstenares die zonnebloemen schilderde — wat ooit restmateriaal was, kreeg zo een nieuw leven. Nu staat ze in een oude Nederlandse melkbus uit 1956: een herinnering aan vroeger, gecombineerd met iets dat nooit verwelkt. Een bloem van tijd, vuur en aandacht.",
    imageSrc: "/images/portfolio/zonnebloem.jpg",
    featured: true,
    material: "Gesmeed staal",
    images: [
      "/images/portfolio/zonnebloem.jpg",
      "/images/portfolio/zonnebloem-2.jpg",
      "/images/portfolio/zonnebloem-3.jpg",
      "/images/portfolio/zonnebloem-4.jpg",
      "/images/portfolio/zonnebloem-5.jpg",
      "/images/portfolio/zonnebloem-6.jpg",
      "/images/portfolio/zonnebloem-7.jpg",
    ],
  },
  {
    id: "zwevende-gieter",
    title: "Zwevende Gieter",
    category: "sculpturen",
    description:
      "Tijdens mijn rondreis door Nieuw-Zeeland heb ik dit kunstwerk gemaakt van gerecycled materiaal, met dank aan Burkes Pass Vintage Store. Een zwevende gieter waarbij het water wordt gesuggereerd door gelaste kettingschakels.",
    imageSrc: "/images/portfolio/gieter.jpg",
    featured: true,
    material: "Staal & ketting",
    images: [
      "/images/portfolio/gieter.jpg",
    ],
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
    images: [
      "/images/portfolio/honda-zwaan.jpg",
    ],
  },
  {
    id: "roos-moederdag",
    title: "Roos voor Moederdag",
    category: "bloemen",
    description:
      "Met de hand geknipt en gevormd. Verhit en daarna verbogen tot de perfecte vorm. Cortenstaal roos op stalen voet — de roestbruine patina geeft een warme, organische uitstraling.",
    imageSrc: "/images/portfolio/roos-moederdag.jpg",
    featured: false,
    material: "Cortenstaal",
    images: [
      "/images/portfolio/roos-moederdag.jpg",
    ],
  },
  {
    id: "waratah-bloem",
    title: "Waratah Bloem",
    category: "bloemen",
    description:
      "Deze waratah is veel te vinden in de growers-gebieden van Tasmanië. De bloem staat voor de wildernis van het eiland. Volledig van gelast staal, met felrode krullen en groene kelkbladeren.",
    imageSrc: "/images/portfolio/waratah.jpg",
    featured: false,
    material: "Gelast staal, gepoedercoat",
    images: [
      "/images/portfolio/waratah.jpg",
      "/images/portfolio/waratah-2.jpg",
      "/images/portfolio/waratah-3.jpg",
    ],
  },
  {
    id: "industriele-eettafel",
    title: "Industriële Eettafel",
    category: "maatwerk",
    description:
      "Een multifunctionele tafel gemaakt voor 4 tot 10 personen. Stalen frame en gebrand houten bladen, behandeld met de Japanse shou sugi ban techniek voor een unieke textuur.",
    imageSrc: "/images/portfolio/eettafel.jpg",
    featured: false,
    material: "Staal & gebrand hout (shou sugi ban)",
    images: [
      "/images/portfolio/eettafel.jpg",
      "/images/portfolio/eettafel-2.jpg",
    ],
  },
  {
    id: "deur-staal-glas-hout",
    title: "Deur van Staal, Glas en Hout",
    category: "maatwerk",
    description:
      "Een zelf ontworpen deur met staal, hout en glas — super uniek. Geometrische indeling combineert transparantie met warmte.",
    imageSrc: "/images/portfolio/deur.jpg",
    featured: false,
    material: "Staal, glas & massief hout",
    images: [
      "/images/portfolio/deur.jpg",
      "/images/portfolio/deur-2.jpg",
    ],
  },
  {
    id: "rvs-schoorsteenkap",
    title: "Stalen Schoorsteenkap",
    category: "maatwerk",
    description:
      "Deze schoorsteen heb ik in mijn eigen dorp Kethel mogen plaatsen — een van de mooiste daken van het dorp. Op maat gemaakte schoorsteenkap van staal met een gesmede klavertje als bekroning.",
    imageSrc: "/images/portfolio/schoorsteenkap.jpg",
    featured: false,
    material: "Staal & gesmeed staal",
    images: [
      "/images/portfolio/schoorsteenkap.jpg",
      "/images/portfolio/schoorsteenkap-2.jpg",
      "/images/portfolio/schoorsteenkap-3.jpg",
      "/images/portfolio/schoorsteenkap-4.jpg",
    ],
  },
  {
    id: "boomstam-bartafel",
    title: "Boomstam Barkrukken",
    category: "maatwerk",
    description:
      "Aanpassingen aan oudere meubels om het zitten meer comfort te geven. Barkruk-set van massieve boomstammen, voorzien van handgesmede stalen voetsteunen.",
    imageSrc: "/images/portfolio/bartafel.jpg",
    featured: false,
    material: "Massieve boomstam & staal",
    images: [
      "/images/portfolio/bartafel.jpg",
      "/images/portfolio/bartafel-2.jpg",
      "/images/portfolio/bartafel-3.jpg",
      "/images/portfolio/bartafel-4.jpg",
    ],
  },
  {
    id: "stalen-trap-wandplanken",
    title: "Stalen Trap & Wandplanken",
    category: "maatwerk",
    description:
      "Een industriële ladder die praktisch is en er ook nog eens goed uitziet als aankleding voor je huis. Volledig van zwart staal met bijpassende wandplanken en houten accenten.",
    imageSrc: "/images/portfolio/trap-wandplanken.jpg",
    featured: false,
    material: "Zwart staal & hout",
    images: [
      "/images/portfolio/trap-wandplanken.jpg",
      "/images/portfolio/trap-wandplanken-2.jpg",
      "/images/portfolio/trap-wandplanken-3.jpg",
    ],
  },
  {
    id: "wijnrek-staal-hout",
    title: "Wijnrek Staal & Hout",
    category: "maatwerk",
    description:
      "Een sierlijk wijnrek, op maat gemaakt om precies tussen de muren te passen. Geschikt voor zowel smalle als brede flessen, met gegolfde stalen houders in een houten frame.",
    imageSrc: "/images/portfolio/wijnrek.jpg",
    featured: false,
    material: "Staal & hout",
    images: [
      "/images/portfolio/wijnrek.jpg",
      "/images/portfolio/wijnrek-2.jpg",
    ],
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
    images: [
      "/images/portfolio/roos-zwart.jpg",
    ],
  },
  {
    id: "handgemaakte-smoker",
    title: "Handgemaakte Smoker",
    category: "maatwerk",
    description:
      "Een robuuste American smoker BBQ, gemaakt voor eigen gebruik met een industrieel tintje. Offset smoker met moersleutel als handvat, thermometer en aparte vuurdeur — gebouwd om jarenlang mee te gaan.",
    imageSrc: "/images/portfolio/smoker.jpg",
    featured: false,
    material: "Staal",
    images: [
      "/images/portfolio/smoker.jpg",
    ],
  },
  {
    id: "industriele-barkrukken",
    title: "Industriële Barkrukken",
    category: "maatwerk",
    description:
      "Moderne barkrukken met Z-vormig stalen onderstel, afgewerkt met gebrande houten zittingen. Industrieel design dat in elk interieur past.",
    imageSrc: "/images/portfolio/barkrukken.jpg",
    featured: false,
    material: "Staal & gebrand hout",
    images: [
      "/images/portfolio/barkrukken.jpg",
    ],
  },
];
