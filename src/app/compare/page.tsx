import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Hero from "@/components/Hero";
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

const livePairs = data.pair_filter.pairs;

const plannedPairs = [
  "abmatic-vs-hubspot",
  "abmatic-vs-marketo",
  "demandbase-vs-terminus",
  "6sense-vs-bombora",
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Compare" },
        ]}
      />
      <h1>Compare</h1>
      <p className="lede">
        Head-to-head comparisons for the platforms actually making B2B
        marketers' 2026 shortlists. Each page pulls pricing bands, time-to-value,
        standout features, and module coverage from public product
        documentation, G2, and customer-reported figures. Where Abmatic AI is on
        the page, we disclose the bias up-front and show our work.
      </p>

      <Hero
        src="/images/hero/compare.jpg"
        alt="Two overlapping data visualizations on a dark background, suggesting a side-by-side comparison"
        credit={{ name: "William Iven", url: "https://unsplash.com/@firmbee" }}
      />

      <h2>Live comparisons</h2>
      <div className="cat-cards">
        {livePairs.map((slug) => {
          const parsed = parsePair(slug);
          if (!parsed) return null;
          const a = nameOf(parsed.a);
          const b = nameOf(parsed.b);
          return (
            <a key={slug} className="cat-card" href={`/compare/${slug}/`}>
              <span className="tag">Comparison</span>
              <h3>{a} vs {b}</h3>
              <p>
                Pricing, time-to-value, standout features, and module coverage
                for {a} and {b} in 2026.
              </p>
            </a>
          );
        })}
      </div>

      <h2>Coming soon</h2>
      <div className="cat-cards">
        {plannedPairs.map((slug) => {
          const parsed = parsePair(slug);
          if (!parsed) return null;
          const a = parsed.a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          const b = parsed.b.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          return (
            <div key={slug} className="cat-card planned" aria-disabled="true">
              <span className="tag">Comparison</span>
              <span className="planned-badge">Planned</span>
              <h3>{a} vs {b}</h3>
              <p>Shortlisting both? This comparison is on the publish queue.</p>
            </div>
          );
        })}
      </div>

      <p>
        <small>
          Looking for a broader roundup instead of a 1:1? See our{" "}
          <a href="/alternatives-to/">alternatives guides</a>.
        </small>
      </p>
    </>
  );
}
