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
      "Upcycled metaalkunst door Gijs Gonlag. Van schroot tot kunstwerk.",
    siteName: "Gijzerwerken",
    locale: "nl_NL",
    type: "website",
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
