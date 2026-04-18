/**
 * Generate static Open Graph image (1200x630) as PNG.
 * Uses satori (JSX → SVG) + sharp (SVG → PNG).
 *
 * Run: node scripts/generate-og-image.mjs
 * Output: public/og-image.png
 */

import satori from "satori";
import sharp from "sharp";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Fetch Playfair Display Bold from Google Fonts
async function fetchFont() {
  const url =
    "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQ.ttf";
  const res = await fetch(url);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const fontData = await fetchFont();

  const WIDTH = 1200;
  const HEIGHT = 630;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          position: "relative",
          overflow: "hidden",
        },
        children: [
          // Top-left copper vignette
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-100px",
                left: "-100px",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(196,122,42,0.12) 0%, transparent 70%)",
              },
            },
          },
          // Bottom-right copper vignette
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "-100px",
                right: "-100px",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(196,122,42,0.10) 0%, transparent 70%)",
              },
            },
          },
          // GG Monogram
          {
            type: "div",
            props: {
              style: {
                fontSize: "160px",
                fontFamily: "Playfair Display",
                fontWeight: 700,
                color: "#c47a2a",
                letterSpacing: "0.05em",
                lineHeight: 1,
              },
              children: "GG",
            },
          },
          // Thin copper line separator
          {
            type: "div",
            props: {
              style: {
                width: "120px",
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, #c47a2a, transparent)",
                margin: "24px 0",
              },
            },
          },
          // GIJZERWERKEN title
          {
            type: "div",
            props: {
              style: {
                fontSize: "42px",
                fontFamily: "Playfair Display",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "0.25em",
                lineHeight: 1,
              },
              children: "GIJZERWERKEN",
            },
          },
          // Subtitle
          {
            type: "div",
            props: {
              style: {
                fontSize: "20px",
                fontFamily: "Playfair Display",
                fontWeight: 400,
                color: "#f5f0eb",
                letterSpacing: "0.1em",
                marginTop: "16px",
                opacity: 0.8,
              },
              children: "Upcycled Metaalkunst  \u2022  Schiedam",
            },
          },
        ],
      },
    },
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: "Playfair Display",
          data: fontData,
          weight: 700,
          style: "normal",
        },
        {
          name: "Playfair Display",
          data: fontData,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  const outPath = join(root, "public", "og-image.png");
  writeFileSync(outPath, png);
  console.log(`\u2713 OG image generated: ${outPath} (${png.length} bytes)`);
}

main().catch((err) => {
  console.error("Failed to generate OG image:", err);
  process.exit(1);
});
