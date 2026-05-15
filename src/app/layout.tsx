import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ForgeSparks from "@/components/three/ForgeSparks";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gijzerwerken.com"),
  title: {
    default: "Gijzerwerken — Upcycled Metaalkunst uit Schiedam",
    template: "%s | Gijzerwerken",
  },
  description:
    "Gijzerwerken maakt unieke sculpturen, metalen bloemen en maatwerk meubels van gerecycled staal en koper. Handgemaakt door Gijs Gonlag in Schiedam.",
  keywords: [
    "metaalkunst",
    "upcycled kunst",
    "stalen sculpturen",
    "metalen bloemen",
    "koperen tulpen",
    "cortenstaal",
    "maatwerk meubels",
    "smeedwerk",
    "Schiedam",
    "Gijs Gonlag",
    "Gijzerwerken",
    "industrieel design",
    "metaalbewerking",
    "handgemaakt",
    "recycled metaal",
  ],
  authors: [{ name: "Gijs Gonlag" }],
  creator: "Gijzerwerken",
  openGraph: {
    title: "Gijzerwerken — Upcycled Metaalkunst uit Schiedam",
    description:
      "Sculpturen, bloemen en maatwerk van oud ijzer door Gijs Gonlag uit Schiedam",
    url: "https://gijzerwerken.com",
    siteName: "Gijzerwerken",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gijzerwerken — Upcycled Metaalkunst door Gijs Gonlag",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gijzerwerken — Upcycled Metaalkunst uit Schiedam",
    description:
      "Sculpturen, bloemen en maatwerk van oud ijzer door Gijs Gonlag uit Schiedam",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://gijzerwerken.com",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-inter antialiased bg-iron-900 text-cream">
        <ForgeSparks />
        <Navbar />
        <main className="relative z-[1]">{children}</main>
        <div className="relative z-[1]">
          <Footer />
        </div>
      </body>
    </html>
  );
}
