import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleCard from "@/components/ArticleCard";
import vendorsData from "@/data/vendors.json";

const SITE = "https://learn.abmatic.ai";

export const metadata: Metadata = {
  title: "Compare ABM platforms — side-by-side matchups",
  description:
    "1:1 comparisons between the most-shortlisted ABM, intent, and personalization platforms in 2026. Built from public pricing, G2, and customer-reported data.",
  alternates: { canonical: `${SITE}/compare/` },
  openGraph: {
    title: "Compare ABM platforms | Abmatic AI Learn",
    description:
      "Head-to-head comparisons of the platforms B2B marketers are actually shortlisting in 2026.",
    url: `${SITE}/compare/`,
    type: "website",
  },
};

type VendorsFile = {
  vendors: Array<{ slug: string; name: string }>;
  pair_filter: { pairs: string[] };
};

const data = vendorsData as unknown as VendorsFile;
const nameOf = (slug: string) =>
  data.vendors.find((v) => v.slug === slug)?.name ?? slug;

function parsePair(slug: string): { a: string; b: string } | null {
  const m = slug.match(/^(.+)-vs-(.+)$/);
  if (!m) return null;
  return { a: m[1], b: m[2] };
}

const COMPARE_IMAGES = [
  "/images/hero/compare.jpg",
  "/images/hero/best-abm.jpg",
  "/images/hero/alternatives.jpg",
  "/images/hero/agentic.jpg",
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Compare — Abmatic AI Learn",
      url: `${SITE}/compare/`,
      description:
        "Head-to-head comparisons of ABM, intent, and personalization platforms for 2026 shortlists.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE}/compare/` },
      ],
    },
  ],
};

export default function CompareIndex() {
  const livePairs = data.pair_filter.pairs;
  const cards = livePairs
    .map((slug, i) => {
      const parsed = parsePair(slug);
      if (!parsed) return null;
      const a = nameOf(parsed.a);
      const b = nameOf(parsed.b);
      return {
        href: `/compare/${slug}/`,
        title: `${a} vs ${b}`,
        summary: `Pricing, time-to-value, standout features, and module coverage for ${a} and ${b} in 2026.`,
        category: "Compare",
        image: COMPARE_IMAGES[i % COMPARE_IMAGES.length],
        author: "Abmatic AI editorial",
        publishedAt: "2026-04-22",
        readMinutes: 9,
      };
    })
    .filter(Boolean) as Array<React.ComponentProps<typeof ArticleCard>>;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />
      <section className="category-hero">
        <div className="category-hero__inner">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
          <h1 className="category-hero__h1">Compare</h1>
          <p className="category-hero__lede">
            Head-to-head comparisons for the platforms making B2B marketers'
            2026 shortlists. Each page pulls pricing bands, time-to-value,
            standout features, and module coverage from public product
            documentation, G2, and customer-reported figures. Where Abmatic AI
            is on the page, we disclose the bias up-front.
          </p>
        </div>
      </section>

      <div className="page-wide">
        <div className="rail__grid">
          {cards.map((c, i) => (
            <ArticleCard key={c.href} {...c} priority={i < 3} />
          ))}
        </div>

        <p className="category-footnote">
          Looking for a broader roundup instead of a 1:1? See our{" "}
          <a href="/alternatives-to/">alternatives guides</a>.
        </p>
      </div>
    </>
  );
}
