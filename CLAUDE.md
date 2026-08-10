# Gijzerwerken.com

## Wat is dit
Portfoliowebsite voor Gijs Gonlag, metaalkunstenaar uit Schiedam. Upcycled metaalkunst: sculpturen van oud ijzer, metalen bloemen, dierensculpturen, en maatwerk staal-hout meubels.

## Tech stack
- **Frontend:** Next.js 14 (App Router, static export)
- **Taal:** TypeScript strict
- **Styling:** Tailwind CSS v3
- **Animaties:** Framer Motion
- **3D/Particles:** Three.js via @react-three/fiber v8 + @react-three/drei v9
- **Hosting:** Cloudflare Pages (static)
- **Contactformulier:** Formspree (placeholder endpoint, swap `xyzplaceholder`)
- **Geen backend, geen CMS, geen database**
- **Taal website:** Nederlands

## Deployment

### Cloudflare Pages
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Node.js version:** 18
- Push naar `main` → automatische deploy
- 404.html wordt automatisch geserved door Cloudflare Pages

### Lokaal testen
```bash
npm run build
npx serve out
```

## Design Tokens

### Kleuren (altijd dark mode, geen Tailwind dark: variants)
- `iron-900`: #0a0a0a (basis achtergrond)
- `iron-800`: #1a1a1a (footer, cards)
- `iron-700`: #2a2a2a (borders, subtiel)
- `iron-600`: #3a3a3a (hover states)
- `copper`: #c47a2a (primair accent)
- `copper-light`: #e8a849 (hover, highlights)
- `copper-dark`: #9a5f1e (shadows)
- `rust`: #8b3a2a (warm accent)
- `ember`: #e8a849 (glow effecten)
- `ember-glow`: #f5c96b (particles, licht)
- `cream`: #f5f0eb (body tekst)

### Typografie
- **Koppen:** Playfair Display (serif) via `font-playfair`
- **Body:** Inter (sans) via `font-inter`
- Beide geladen via `next/font/google` met `display: 'swap'`

### Textuur
- Noise overlay via inline SVG feTurbulence filter in CSS (geen apart bestand)

## Mappenstructuur
```
src/
├── app/
│   ├── layout.tsx            # Root layout met fonts, navbar, footer
│   ├── template.tsx          # Page transition wrapper (fade + glow)
│   ├── page.tsx              # Homepage (Hero + Uitgelicht werk)
│   ├── not-found.tsx         # Custom 404 pagina
│   ├── icon.svg              # Favicon (GG monogram)
│   ├── globals.css           # Design tokens, noise, scrollbar
│   ├── portfolio/
│   │   ├── page.tsx          # Server component met metadata
│   │   └── PortfolioContent.tsx  # Client: filters, grid, lightbox
│   ├── over/
│   │   ├── page.tsx          # Server component met metadata
│   │   └── OverContent.tsx   # Client: biografie, werkplaats, feiten
│   ├── proces/
│   │   ├── page.tsx          # Server component met metadata
│   │   └── ProcesContent.tsx # Client: tijdlijn
│   ├── shop/
│   │   ├── page.tsx          # Server component met metadata
│   │   └── ShopContent.tsx   # Client: productgrid
│   └── contact/
│       ├── page.tsx          # Server component met metadata + JSON-LD
│       └── ContactContent.tsx # Client: formulier + info
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Sticky, transparant→solid+blur bij scroll
│   │   └── Footer.tsx        # Logo, Instagram, copyright
│   ├── sections/
│   │   ├── Hero.tsx          # Fullscreen met particles (reduced-motion: geen particles)
│   │   ├── FeaturedWork.tsx  # Uitgelicht werk sectie (homepage)
│   │   └── MaakProces.tsx    # Scroll-gekoppeld maakproces-verhaal op detailpagina (optioneel per item)
│   ├── ui/
│   │   ├── PageTransition.tsx # Fade-in + copper glow overlay
│   │   ├── PortfolioCard.tsx # Card met 3D tilt, hover overlay
│   │   ├── Lightbox.tsx      # Fullscreen viewer met keyboard nav
│   │   ├── SectionHeader.tsx # Herbruikbare sectie-titel met copper underline
│   │   ├── AnimatedCounter.tsx # Telt op bij scroll-into-view
│   │   ├── ParallaxImage.tsx # Gradient placeholder met parallax
│   │   ├── ShopCard.tsx      # Productkaart met prijs, hover zoom
│   │   └── ContactForm.tsx   # Formulier met validatie, Formspree submit
│   └── three/
│       └── SparkParticles.tsx # R3F 3-laags vonken (near/mid/far + muis-interactie)
├── data/
│   ├── portfolio.ts          # PortfolioItem type + demo data + categorieën
│   └── shop.ts               # ShopItem type + demo data + formatPrice
└── public/
    ├── robots.txt
    └── sitemap.xml
```

## Conventies
- Componenten: PascalCase, functioneel, geen class components
- Imports: `@/*` alias (naar src/)
- Three.js componenten: altijd `dynamic()` met `ssr: false`
- Altijd dark mode — geen `dark:` Tailwind variants
- Body scroll lock via `body.menu-open` class (hergebruikt door Navbar + Lightbox)
- Static export: `output: 'export'` in next.config.mjs
- Portfolio data in `src/data/portfolio.ts` — single source of truth
- Shop data in `src/data/shop.ts` — importeert Category uit portfolio.ts
- Prijsformattering: `Intl.NumberFormat('nl-NL')` via `formatPrice` uit shop.ts
- `useSearchParams` altijd in `Suspense` wrapper
- Alle foto-slots zijn gevuld; gradient alleen als onError fallback bij ontbrekende afbeelding
- 3D tilt via useRef + directe DOM mutatie (geen React state op mousemove)
- `next/navigation` gebruiken (niet `next/router`)
- Page metadata via server component wrappers (page.tsx = server, *Content.tsx = client)
- Alle animaties respecteren `prefers-reduced-motion`
## SEO
- Per-pagina unieke `title` + `description` + OpenGraph tags
- Root layout: `metadataBase` voor absolute OG URL resolutie
- Contact pagina: LocalBusiness JSON-LD schema
- `public/robots.txt` + `public/sitemap.xml` (handmatig, 6 pagina's)
- Favicon: SVG in `src/app/icon.svg`

## Beslissingen log
- **2026-04-18:** R3F v8 + drei v9 gekozen (v9 vereist React 19, wij gebruiken React 18)
- **2026-04-18:** Tailwind v3 bewust (niet v4) — voorkomt CSS var() issues
- **2026-04-18:** Noise texture via inline SVG, geen apart bestand
- **2026-04-18:** Fonts met display: 'swap' voor betere performance
- **2026-04-18:** Sprint 2 — Portfolio met AnimatePresence mode="popLayout" voor filter transitions
- **2026-04-18:** Lightbox z-[60] boven Navbar z-50
- **2026-04-18:** Sprint 3 — AnimatedCounter met tabular-nums + min-width
- **2026-04-18:** Sprint 3 — ParallaxImage disabled op mobiel via matchMedia
- **2026-04-18:** Sprint 3 — Tijdlijn scroll-driven lijn via useScroll scaleY
- **2026-04-18:** Sprint 4 — Shop hergebruikt Category type uit portfolio.ts
- **2026-04-18:** Sprint 4 — ContactForm met Formspree placeholder endpoint
- **2026-04-18:** Sprint 4 — Contact page split: server component (Suspense) + client component
- **2026-04-18:** Sprint 5 — Page transitions via template.tsx (fade-in only, geen AnimatePresence exit)
- **2026-04-18:** Sprint 5 — Glow overlay bij transitions is essentieel (maskeert unmount/mount flash)
- **2026-04-18:** GlowCursor verwijderd — custom cursors verwarrend op portfolio-sites, standaard browser cursor beter voor UX
- **2026-04-18:** Sprint 5 — SparkParticles 3-laags (near/mid/far) voor diepte + muis-afstoting
- **2026-04-18:** Sprint 5 — prefers-reduced-motion: particles render null, tilt disabled, counter instant
- **2026-04-18:** Sprint 5 — SEO server/client split op alle pagina's (metadata export in server component)
- **2026-04-18:** Sprint 8 — Alle foto-slots gevuld, REAL_IMAGES set verwijderd → onError fallback pattern
- **2026-04-18:** Sprint 8 — ParallaxImage uitgebreid met imageSrc prop
- **2026-04-18:** Sprint 8 — ProcesContent tijdlijn toont foto's via imageSrc veld
- **2026-05-07:** Formspree form ID `mwvynbyl` geactiveerd, contactformulier live op `info@gijzerwerken.com`
- **2026-06-09:** Maakproces-sectie via optioneel `process?: ProcessStep[]` veld op PortfolioItem (eerste: koperen-tulpenboeket, 9 stappen / 12 foto's in `public/images/proces/tulp/`). Puur scroll-gekoppeld (useScroll + useTransform, geen timers), foto-randen lossen op via inset box-shadow #0a0a0a (geen CSS mask — Safari), foto's in paren krijgen aspect-[3/4] object-cover voor uitlijning. Conversie: `scripts/convert-tulp-proces.py` (HEIC→JPEG, exif_transpose verplicht voor iPhone-foto's, langste zijde 1600px, q85, geen vignet)
- **2026-06-10:** `gridCell?: "wide" | "tall"` override op PortfolioItem (getGridConfig, vóór index-fallback, alleen featured bloemen): object-cover kan niet uitzoomen, dus foto-oriëntatie moet de celvorm matchen. Tulpenboeket (staand) → tall-cel, zonnebloem (liggend) → wide-cel; daarvoor toonden ze maar ~30% van het beeld. Data niet herordenen om dit te fixen — FeaturedWork pakt de eerste 3 featured items.
- **2026-06-09:** Per-foto crop-focus via `cardPosition?: string` (CSS object-position) op PortfolioItem, toegepast in PortfolioCard. Nodig omdat de bento-grid (auto-rows 260px, wisselende spans) met object-cover standaard vanuit het midden cropt — onderwerpen vielen uit het frame (tulpenboeket in brede cel toonde alleen stelen, ridderspoor-spits afgesneden, roos-zwart zit op x≈82%). 10 van 16 items hebben een waarde; FeaturedWork cropt niet (natuurlijke hoogte), dus daar geen effect.
- **2026-06-09:** Verkocht-label via `isSold?: boolean` op PortfolioItem (eerste: stalen-zonnebloem). Chip zit in PortfolioCard zelf (verschijnt dus overal: grid, FeaturedWork, Meer-werk-related) en staat **linksboven** — de preview/lightbox-knop bezet rechtsboven. Stijl `bg-rust/90` (rust = verkocht-kleur), foto niet gedimd. Detailpagina bij isSold: chip naast categorie-pill + CTA wordt maatwerk-uitnodiging ("Informeer naar de mogelijkheden →", zelfde contactHref). Klaproos volgt later ook met isSold.
- **2026-06-09:** Maakproces ridderspoor (8 foto- + 2 videostappen). ProcessStep uitgebreid: `images` nu optioneel, `video?: { src; poster }` erbij — een stap heeft het één óf het ander. Video's als "levende foto's": muted/loop/playsInline/preload="none", spelen alleen in beeld via `useInView` (amount 0.4), `v.muted = true` expliciet via property (iOS-autoplay), reduced-motion → controls + geen autoplay, onError → poster via ProcesFoto. iPhone-HEVC → H.264 MP4 via ffmpeg (`-an -crf 23 -pix_fmt yuv420p -movflags +faststart`, scale -2:1280) want HEVC speelt niet in Chrome/Android; video's in `public/videos/proces/ridderspoor/`. Conversie: `scripts/convert-ridderspoor-proces.py` (find_src accepteert ook .JPG/.jpg/.jpeg)

- **2026-07-15:** Musa Basjoo foto-fix (4ce7bee): hoofdfoto was verkeerd (werkplaats-shot van losse koperen bladeren op tafel) → nu frontaal volledig stuk in koperen melkbus 4385. Galerij bleek grotendeels verkeerd gelabeld/werkplaats-shots. Echte studiofoto-set (5 sources in ~/Downloads, allemaal Jul-13 20:xx-sessie): **a04a8cf0.JPG=hoofd (frontaal melkbus tight)**, **e2d0cdb0.JPG=volledig (wijder+rook)**, **a804837a.JPG=bovenaanzicht (hoge hoek+vloerschaduw)**, **751dec8a.JPG=blad (studio close-up enkel blad)**. ⚠️ De originele IMG_0547/IMG_0388/IMG_9054-mapping was FOUT: dat zijn werkplaats/grondstof-shots (bladeren-op-tafel / koperplaten / roestige melkbus-vóór), GEEN studiofoto's — niet gebruiken. Geen aparte bladkroon-foto bestaat → `musa-basjoo-bladkroon.jpg` verwijderd, images-array 5→4. Zelfde conversie-conventie (exif_transpose, langste zijde 1600px q85; bronnen waren al ~1100-1450px dus geen upscale).
- **2026-07-15:** Musa Basjoo toegevoegd (4d76909, tag `musa-basjoo`): nieuw item vooraan in portfolioItems (= spotlight via isNew, ridderspoor/klaproos-conventie), niet verkocht, 5 galerijfoto's (hoofd=frontaal in melkbus, dan bovenaanzicht/bladkroon/blad/volledig). Géén maakproces (geen procesfoto's beschikbaar). Spotlight verplaatst: `isNew` weggehaald bij Anthurium → Musa is nu het enige isNew-item. **Eerste item met foto's in een subfolder** (`public/images/portfolio/musa-basjoo/` i.p.v. flat) — beschrijvende bestandsnamen op verzoek. Conversie via `scratchpad/convert_musa.py`: 3× HEIC→JPEG + 2× JPG re-save, allemaal geresized naar tulp/ridderspoor-conventie (langste zijde 1600px, q85, exif_transpose verplicht) — bronbestanden waren 4032px/3MB, te groot voor de statische site. `material: "Koper"`, geen `dimensions`-veld (bestaat niet in het type; ~200cm staat in de description). Sitemap +1 (23→24), priority 0.7 net als alle andere portfolio-pagina's.
- **2026-06-10:** Klaproos toegevoegd (021fbda, tag `klaproos`): nieuw item vooraan in portfolioItems (= spotlight via isNew, ridderspoor-conventie), isSold, 3 galerijfoto's (hoofdfoto=tuinfoto, 2e=video-still uit finale-video op 2s via ffmpeg→zelfde python-enhancement), maakproces 5 stappen (2 foto's + 3 video's, lasposter op 3.8s mét lichtboog). Korte video's ≤1.5MB: lasvideo (vonken=hoge entropie) had crf 28 nodig i.p.v. 23. **Ridderspoor kreeg `gridCell: "tall"`** — door de klaproos op index 0 schoof hij naar de wide-fallback-cel (index 1) en zou als staande foto ~30% tonen (zelfde bug als tulp/zonnebloem eerder). NewestWork (spotlight) heeft eigen markup → eigen Verkocht-chip-span (zelfde stijl als PortfolioCard, linksboven). Homepage is inmiddels HomeIntro zonder FeaturedWork — featured-volgorde raakt de homepage niet meer.

- **2026-08-10:** Paua toegevoegd (RVS schelp 150×120cm, tag `checkpoint-voor-paua` als rollback-punt): **eerste sculptuur met maakproces** (5 fotostappen in `public/images/proces/paua/stap-1..5.jpg`, geen video's). Item staat vóór honda-zwaan in de array — bewust **niet** vooraan: alle `featured: true`-items zijn bloemen op index 0-5, en `getGridConfig` gebruikt index alléén in de `bloemen && featured`-tak, dus invoegen op index 6 laat de bento-grid van de bloemen ongemoeid. `featured: false` + `category: "sculpturen"` → normale `col-span-1 row-span-1`-cel, bloemen blijven visueel dominant. **Beschikbaar** (was festivalopdracht, festival voorbij): geen `isSold`, dus CTA blijft "Interesse? Neem contact op →". `isNew` niet gezet — Musa Basjoo blijft het spotlight-item. Eerste item dat `dimensions` gebruikt (`"150 × 120 cm"`, rendert in detail-`<dl>` + Lightbox); het veld bestond al maar was nergens gevuld. Galerijfoto's flat in `public/images/portfolio/` (musa-basjoo-subfolder blijft de uitzondering). Conversie: `scripts/convert-paua.py`, zelfde conventie (exif_transpose, langste zijde 1600px, q85, enhance 1.15/1.05/1.20/1.30); `find_src` uitgebreid met een kale `" 2"`-suffixvariant voor macOS-duplicaten. `IMG_1502` is bewust dubbel gebruikt: galerij `paua-5.jpg` én processtap 1 (de echte schelp = de inspiratie). Sitemap 24→25.

## Openstaande taken
- ~~Portfolio grid met filterbare categorieën~~ (Sprint 2)
- ~~Over Gijs pagina~~ (Sprint 3)
- ~~Het Proces pagina~~ (Sprint 3)
- ~~Shop pagina~~ (Sprint 4)
- ~~Contact pagina~~ (Sprint 4)
- ~~SEO optimalisatie~~ (Sprint 5)
- ~~Custom cursor + page transitions + scroll-animaties~~ (Sprint 5)
- ~~Cloudflare Pages deployment config~~ (Sprint 5)
- ~~Afbeeldingen toevoegen~~ (Sprint 8 — alle slots gevuld met AI-foto's)
- ~~Formspree endpoint activeren (swap `xyzplaceholder`)~~ (2026-05-07)
