import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://gijzerwerken.com"),
  title: {
    default: "Gijzerwerken — Upcycled Metaalkunst",
    template: "%s",
  },
  description:
    "Upcycled metaalkunst door Gijs Gonlag uit Schiedam. Sculpturen van oud ijzer, metalen bloemen, dierensculpturen en maatwerk staal-hout meubels.",
  openGraph: {
    title: "Gijzerwerken — Upcycled Metaalkunst",
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
    title: "Gijzerwerken — Upcycled Metaalkunst",
    description:
      "Sculpturen, bloemen en maatwerk van oud ijzer door Gijs Gonlag uit Schiedam",
    images: ["/og-image.png"],
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
