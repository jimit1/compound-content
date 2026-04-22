import type { Metadata } from "next";
import { notFound } from "next/navigation";
import vendorsData from "@/data/vendors.json";
import ComparisonPageTemplate from "@/components/ComparisonPageTemplate";

type Vendor = {
  slug: string;
  name: string;
  tagline: string;
  price_band: string | null;
  time_to_value: string | null;
  best_for: string | null;
  standout_feature: string | null;
  weakness: string | null;
  modules_covered: string[];
  links: { website: string; g2: string | null; pricing: string | null };
  customer_proof?: Array<{ name: string; claim: string; role: string }>;
  _todo?: string;
};

type VendorsFile = {
  _meta: Record<string, unknown>;
  vendors: Vendor[];
  pair_filter: { description: string; pairs: string[] };
};

const data = vendorsData as unknown as VendorsFile;

const SITE = "https://learn.abmatic.ai";

/**
 * Pairs are stored as `{a}-vs-{b}`. Abmatic always leads when present;
 * otherwise alphabetical. Parsing is the inverse of that rule.
 */
function parsePair(slug: string): { a: Vendor; b: Vendor } | null {
  if (!data.pair_filter.pairs.includes(slug)) return null;
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  const [, aSlug, bSlug] = match;
  const a = data.vendors.find((v) => v.slug === aSlug);
  const b = data.vendors.find((v) => v.slug === bSlug);
  if (!a || !b) return null;
  return { a, b };
}

export function generateStaticParams(): Array<{ slug: string }> {
  // Only pairs where BOTH vendor rows have enough verified data to render
  // safely. A row is "publishable" when at least 6 of the quality-bar fields
  // are non-null. This enforces the per-row data gate from PROGRAMMATIC_SEO_PLAN.md.
  const publishable = (v: Vendor) => {
    const fields = [
      v.price_band,
      v.time_to_value,
      v.best_for,
      v.standout_feature,
      v.weakness,
      v.modules_covered && v.modules_covered.length ? "ok" : null,
      v.tagline,
    ];
    return fields.filter(Boolean).length >= 6;
  };

  return data.pair_filter.pairs
    .map((slug) => {
      const parsed = parsePair(slug);
      if (!parsed) return null;
      if (!publishable(parsed.a) || !publishable(parsed.b)) return null;
      return { slug };
    })
    .filter((x): x is { slug: string } => x !== null);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parsePair(slug);
  if (!parsed) return {};
  const { a, b } = parsed;
  const title = `${a.name} vs ${b.name} in 2026: Honest Comparison`;
  const description =
    `Compare ${a.name} and ${b.name} across pricing, time-to-value, standout features, and module coverage. ` +
    `Written for teams shortlisting in 2026, with an honest take on where each vendor wins.`;
  const canonical = `${SITE}/compare/${slug}/`;
  return {
    title,
    description: description.length > 155 ? description.slice(0, 152) + "..." : description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 627, alt: `${a.name} vs ${b.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parsePair(slug);
  if (!parsed) notFound();
  return <ComparisonPageTemplate a={parsed.a} b={parsed.b} slug={slug} />;
}
