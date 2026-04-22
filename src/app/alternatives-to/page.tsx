import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleCard from "@/components/ArticleCard";
import { entries, cardFields, type Entry } from "@/lib/entries";

const SITE = "https://learn.abmatic.ai";

export const metadata: Metadata = {
  title: "Alternatives guides — ABM and intent platforms",
  description:
    "Honest, vendor-by-vendor alternative guides for the most-shortlisted ABM and intent-data platforms in 2026. Pricing bands, time-to-value, and standout features.",
  alternates: { canonical: `${SITE}/alternatives-to/` },
  openGraph: {
    title: "Alternatives guides | Abmatic AI Learn",
    description:
      "Vendor-by-vendor alternative roundups for ABM and intent-data platforms in 2026.",
    url: `${SITE}/alternatives-to/`,
    type: "website",
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Alternatives guides — Abmatic AI Learn",
      url: `${SITE}/alternatives-to/`,
      description:
        "Honest, vendor-by-vendor alternative guides for the most-shortlisted ABM and intent-data platforms in 2026.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Alternatives", item: `${SITE}/alternatives-to/` },
      ],
    },
  ],
};

function sortLatest(list: Entry[]): Entry[] {
  return [...list].sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export default function AlternativesIndex() {
  const articles = sortLatest(
    entries.filter(
      (e) =>
        e.status !== "coming-soon" &&
        ((e.category ?? e.tag) === "Alternatives" ||
          e.slug.startsWith("alternatives-to"))
    )
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />
      <section className="category-hero">
        <div className="category-hero__inner">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Alternatives" }]}
          />
          <h1 className="category-hero__h1">Alternatives</h1>
          <p className="category-hero__lede">
            If you are leaving an ABM or intent platform because it is too
            expensive, too slow to deploy, or requires a team you do not have,
            the right alternative is almost never the second-most-expensive
            platform in the category. These guides compare the credible
            replacements, vendor by vendor, with pricing bands and time-to-value
            that you can actually use in a shortlist conversation.
          </p>
        </div>
      </section>

      <div className="page-wide">
        <div className="rail__grid">
          {articles.map((e, i) => (
            <ArticleCard key={e.href} {...cardFields(e)} priority={i < 3} />
          ))}
        </div>

        <p className="category-footnote">
          Need a 1:1 comparison instead of a roundup? See the{" "}
          <a href="/compare/">comparison pages</a>. Need to understand the
          underlying terminology? See the <a href="/glossary/">glossary</a>.
        </p>
      </div>
    </>
  );
}
