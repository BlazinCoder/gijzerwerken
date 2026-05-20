import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CATEGORY_LABELS,
  getAllPortfolioSlugs,
  getPortfolioItemBySlug,
  type PortfolioItem,
} from "@/data/portfolio";
import PortfolioDetailContent from "./PortfolioDetailContent";

const SITE_URL = "https://gijzerwerken.com";

export function generateStaticParams() {
  return getAllPortfolioSlugs().map((slug) => ({ slug }));
}

function buildDescription(item: PortfolioItem): string {
  if (item.description) {
    const trimmed = item.description.trim();
    return trimmed.length > 140 ? `${trimmed.slice(0, 140)}…` : trimmed;
  }
  return `${item.title}: ${CATEGORY_LABELS[item.category]} van gerecycled metaal door Gijs Gonlag, metaalkunstenaar uit Schiedam.`;
}

function absoluteImage(path: string): string {
  return `${SITE_URL}${path}`;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);
  if (!item) return {};

  const description = buildDescription(item);
  const title = `${item.title} — ${CATEGORY_LABELS[item.category]}`;
  const canonical = `${SITE_URL}/portfolio/${slug}`;
  const ogImage = absoluteImage(
    (item.images && item.images[0]) || item.imageSrc,
  );

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${item.title} | Gijzerwerken`,
      description,
      url: canonical,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | Gijzerwerken`,
      description,
      images: [ogImage],
    },
  };
}

export default async function PortfolioDetailPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);
  if (!item) notFound();

  const images = item.images && item.images.length > 0 ? item.images : [item.imageSrc];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.description,
    image: images.map(absoluteImage),
    creator: {
      "@type": "Person",
      name: "Gijs Gonlag",
      url: SITE_URL,
    },
    material: item.material,
    genre: CATEGORY_LABELS[item.category],
    url: `${SITE_URL}/portfolio/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioDetailContent item={item} />
    </>
  );
}
