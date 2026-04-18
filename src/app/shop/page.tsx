import type { Metadata } from "next";
import ShopContent from "./ShopContent";

export const metadata: Metadata = {
  title: "Shop — Gijzerwerken",
  description:
    "Handgemaakte kunstwerken van gerecycled ijzer. Elk stuk uniek, volledig met de hand gemaakt door Gijs Gonlag.",
  openGraph: {
    title: "Shop — Gijzerwerken",
    description: "Unieke metaalkunst — handgemaakt, elk stuk een verhaal.",
  },
};

export default function ShopPage() {
  return <ShopContent />;
}
