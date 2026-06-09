export const CATEGORIES = ["sculpturen", "bloemen", "maatwerk"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  sculpturen: "Sculpturen",
  bloemen: "Bloemen",
  maatwerk: "Maatwerk",
};

export type ProcessStep = {
  caption: string; // bijschrift onder de foto('s) of video
  images?: string[]; // 1 t/m 2 paden, bv "/images/proces/tulp/tulp-01.jpg"
  video?: { src: string; poster: string }; // óf een video (muted loop, "levende foto")
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
  isNew?: boolean;
  isSold?: boolean;
  // CSS object-position voor de kaart-crop — zet het onderwerp centraal in het frame.
  cardPosition?: string;
  // Optional making-of story, rendered on the detail page when present.
  process?: ProcessStep[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "ridderspoor",
    title: "Ridderspoor",
    category: "bloemen",
    description:
      "De bloemblaadjes zijn gemaakt van RVS en de steel van koper. Door beide materialen bloot te stellen aan atmosferische en natuurlijke elementen zijn het diepe blauw in de bloem en de groene tinten in de steel ontstaan. Dit proces is bewust versneld, waardoor de natuur zelf onderdeel werd van het uiteindelijke werk.",
    imageSrc: "/images/portfolio/ridderspoor.jpg",
    featured: true,
    cardPosition: "50% 30%",
    isNew: true,
    material: "Staal & koper",
    images: [
      "/images/portfolio/ridderspoor.jpg",
      "/images/portfolio/ridderspoor-2.jpg",
      "/images/portfolio/ridderspoor-3.jpg",
      "/images/portfolio/ridderspoor-4.jpg",
    ],
    process: [
      {
        caption:
          "Uit RVS-plaat worden schijfjes gesneden, elk ingeknipt tot bloemblaadjes.",
        images: ["/images/proces/ridderspoor/ridderspoor-01.jpg"],
      },
      {
        caption:
          "Met de plaatschaar wordt elk schijfje blaadje voor blaadje gevormd.",
        images: ["/images/proces/ridderspoor/ridderspoor-02.jpg"],
      },
      {
        caption: "Tientallen bloempjes, stuk voor stuk met de hand gevouwen.",
        images: ["/images/proces/ridderspoor/ridderspoor-03.jpg"],
      },
      {
        caption:
          "Dan krijgt het staal zijn kleur: door het te verhitten wordt de oxidatie versneld en ontstaat het diepe blauw.",
        video: {
          src: "/videos/proces/ridderspoor/ridderspoor-vid-01.mp4",
          poster: "/images/proces/ridderspoor/ridderspoor-vid-01-poster.jpg",
        },
      },
      {
        caption: "De eerste bloempjes vinden hun plek op de steel.",
        images: ["/images/proces/ridderspoor/ridderspoor-04.jpg"],
      },
      {
        caption: "Bloem voor bloem groeit de tros tot één volle ridderspoor.",
        images: ["/images/proces/ridderspoor/ridderspoor-05.jpg"],
      },
      {
        caption:
          "De bladeren worden uit koper getekend, gesneden en van nerven voorzien.",
        images: [
          "/images/proces/ridderspoor/ridderspoor-06.jpg",
          "/images/proces/ridderspoor/ridderspoor-07.jpg",
        ],
      },
      {
        caption: "Alles komt samen — het koper nog blank.",
        images: ["/images/proces/ridderspoor/ridderspoor-08.jpg"],
      },
      {
        caption:
          "Tot weer en wind hun werk doen: het koper kleurt langzaam groen, het staal houdt zijn diepe blauw. Een bloem die alleen maar mooier wordt.",
        video: {
          src: "/videos/proces/ridderspoor/ridderspoor-vid-02.mp4",
          poster: "/images/proces/ridderspoor/ridderspoor-vid-02-poster.jpg",
        },
      },
    ],
  },
  {
    id: "koperen-tulpenboeket",
    title: "Koperen Tulpenboeket",
    category: "bloemen",
    description:
      "Metalen tulpen gemaakt van gerecycled RVS en koper. Een boeket dat blijft. De koperen stelen zullen met de tijd groen verkleuren door oxidatie, waardoor elke bloem langzaam verandert. Handgemaakt uit hergebruikte materialen.",
    imageSrc: "/images/portfolio/tulpenboeket.jpg",
    featured: true,
    cardPosition: "50% 14%",
    material: "Koper & RVS",
    images: [
      "/images/portfolio/tulpenboeket.jpg",
      "/images/portfolio/tulpenboeket-2.jpg",
      "/images/portfolio/tulpenboeket-3.jpg",
      "/images/portfolio/tulpenboeket-4.jpg",
    ],
    process: [
      {
        caption: "Het begint met ruw plaatstaal en koper.",
        images: ["/images/proces/tulp/tulp-01.jpg"],
      },
      {
        caption: "Elk blad wordt met de hand afgetekend en uit het staal gesneden.",
        images: ["/images/proces/tulp/tulp-02.jpg"],
      },
      {
        caption:
          "Stuk voor stuk worden de blaadjes uit de plaat bevrijd en in vorm gehamerd.",
        images: ["/images/proces/tulp/tulp-03.jpg", "/images/proces/tulp/tulp-04.jpg"],
      },
      {
        caption:
          "De koperen stelen worden op maat gemaakt, ingesneden en met de hand gebogen.",
        images: ["/images/proces/tulp/tulp-05.jpg", "/images/proces/tulp/tulp-06.jpg"],
      },
      {
        caption: "Uit koper groeien de bladeren.",
        images: ["/images/proces/tulp/tulp-07.jpg"],
      },
      {
        caption: "De blaadjes worden rond het hart gelast tot één bloem.",
        images: ["/images/proces/tulp/tulp-08.jpg"],
      },
      {
        caption: "De eerste tulp staat, en bloem voor bloem groeit het boeket.",
        images: ["/images/proces/tulp/tulp-09.jpg", "/images/proces/tulp/tulp-10.jpg"],
      },
      {
        caption:
          "Tot slot wordt elk oppervlak met de borstel opgeschuurd tot het zacht oplicht.",
        images: ["/images/proces/tulp/tulp-11.jpg"],
      },
      {
        caption: "Het eindresultaat: een boeket dat nooit verwelkt.",
        images: ["/images/proces/tulp/tulp-12.jpg"],
      },
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
    isSold: true,
    cardPosition: "58% 50%",
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
    id: "honda-zwaan",
    title: "Honda Zwaan",
    category: "sculpturen",
    description:
      "Zwaan gemaakt van een oude Honda-motortank als lijf en een zware motorketting als sierlijke nek. Upcycling in zijn puurste vorm.",
    imageSrc: "/images/portfolio/honda-zwaan.jpg",
    cardPosition: "50% 30%",
    featured: false,
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
    cardPosition: "50% 35%",
    featured: false,
    material: "Cortenstaal",
    images: [
      "/images/portfolio/roos-moederdag.jpg",
    ],
  },
  {
    id: "zwevende-gieter",
    title: "Zwevende Gieter",
    category: "sculpturen",
    description:
      "Tijdens mijn rondreis door Nieuw-Zeeland heb ik dit kunstwerk gemaakt van gerecycled materiaal, met dank aan Burkes Pass Vintage Store. Een zwevende gieter waarbij het water wordt gesuggereerd door gelaste kettingschakels.",
    imageSrc: "/images/portfolio/gieter.jpg",
    cardPosition: "50% 35%",
    featured: false,
    material: "Staal & ketting",
    images: [
      "/images/portfolio/gieter.jpg",
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
    id: "gesmede-roos-zwart",
    title: "Gesmede Roos Zwart",
    category: "bloemen",
    description:
      "Elegante zwart gesmede roos met steel en bladeren. Tijdloos cadeau, hier gefotografeerd tussen verse bloemen op een feesttafel.",
    imageSrc: "/images/portfolio/roos-zwart.jpg",
    cardPosition: "82% 42%",
    featured: false,
    material: "Zwart gesmeed staal",
    images: [
      "/images/portfolio/roos-zwart.jpg",
    ],
  },
  {
    id: "industriele-eettafel",
    title: "Industriële Eettafel",
    category: "maatwerk",
    description:
      "Een multifunctionele tafel gemaakt voor 4 tot 10 personen. Stalen frame en gebrand houten bladen, om het een robuuste look te geven.",
    imageSrc: "/images/portfolio/eettafel.jpg",
    featured: false,
    material: "Staal & gebrand hout",
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
    cardPosition: "50% 35%",
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
    cardPosition: "50% 25%",
    featured: false,
    material: "Staal & hout",
    images: [
      "/images/portfolio/wijnrek.jpg",
      "/images/portfolio/wijnrek-2.jpg",
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
    cardPosition: "50% 40%",
    featured: false,
    material: "Staal & gebrand hout",
    images: [
      "/images/portfolio/barkrukken.jpg",
    ],
  },
  {
    id: "rvs-schoorsteenkap",
    title: "Stalen Schoorsteenkap",
    category: "maatwerk",
    description:
      "Deze schoorsteen heb ik in mijn eigen dorp Kethel mogen plaatsen — een van de mooiste daken van het dorp. Op maat gemaakte schoorsteenkap van staal met een Shamrock als bekroning.",
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
];

export function getPortfolioItemBySlug(slug: string): PortfolioItem | undefined {
  return portfolioItems.find((item) => item.id === slug);
}

export function getAllPortfolioSlugs(): string[] {
  return portfolioItems.map((item) => item.id);
}
