import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        iron: {
          900: "#0a0a0a",
          800: "#1a1a1a",
          700: "#2a2a2a",
          600: "#3a3a3a",
          500: "#4a4a4a",
        },
        copper: {
          DEFAULT: "#c47a2a",
          light: "#e8a849",
          dark: "#9a5f1e",
        },
        rust: {
          DEFAULT: "#8b3a2a",
          light: "#a54d3c",
        },
        ember: {
          DEFAULT: "#e8a849",
          glow: "#f5c96b",
        },
        cream: "#f5f0eb",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)"],
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
export default config;
