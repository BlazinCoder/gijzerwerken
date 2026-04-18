# Gijzerwerken.com

Portfoliowebsite voor **Gijs Gonlag**, metaalkunstenaar uit Schiedam. Upcycled metaalkunst: sculpturen van oud ijzer, metalen bloemen, dierensculpturen en maatwerk staal-hout meubels.

## Tech stack

- **Framework:** Next.js 14 (App Router, static export)
- **Taal:** TypeScript strict
- **Styling:** Tailwind CSS v3
- **Animaties:** Framer Motion
- **3D/Particles:** Three.js via React Three Fiber v8 + drei v9
- **Hosting:** Cloudflare Pages

## Vereisten

- Node.js 18 of hoger
- npm

## Installatie

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## Build

```bash
npm run build
```

Genereert een statische export in de `/out/` directory.

## Deployment (Cloudflare Pages)

1. Koppel je GitHub repository aan Cloudflare Pages
2. Configuratie:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node.js version:** 18
3. Push naar `main` branch triggert automatische deploy

## Projectstructuur

```
src/
  app/          Pagina's (Next.js App Router)
  components/   Herbruikbare componenten
  data/         Portfolio en shop data
public/         Statische bestanden (robots.txt, sitemap.xml)
```

## Pagina's

| Route       | Beschrijving                          |
|-------------|---------------------------------------|
| `/`         | Homepage met hero en uitgelicht werk  |
| `/portfolio`| Filterbaar portfolio grid + lightbox  |
| `/over`     | Biografie en werkplaats               |
| `/proces`   | Visueel 5-stappen werkproces          |
| `/shop`     | Productcatalogus met prijzen          |
| `/contact`  | Contactformulier + bedrijfsinfo       |
