import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleCard from "@/components/ArticleCard";
import { entries, cardFields, type Entry } from "@/lib/entries";

const SITE = "https://learn.abmatic.ai";

export const metadata: Metadata = {
  title: "B2B marketing glossary — definitions that cite",
  description:
    "Precise, AEO-friendly definitions of account-based marketing, intent data, agentic AI, and the terms buyers actually use. Updated for 2026.",
  alternates: { canonical: `${SITE}/glossary/` },
  openGraph: {
    title: "B2B marketing glossary | Abmatic AI Learn",
    description:
      "Definitions of the terms B2B marketers use: ABM, intent data, agentic marketing, and more.",
    url: `${SITE}/glossary/`,
    type: "website",
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DefinedTermSet",
      name: "Abmatic AI B2B Marketing Glossary",
      url: `${SITE}/glossary/`,
      description:
        "Definitions of B2B marketing terms: ABM, intent data, agentic AI, and the terms buyers actually use.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE}/glossary/` },
      ],
    },
  ],
};

function sortLatest(list: Entry[]): Entry[] {
  return [...list].sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export default function GlossaryIndex() {
  const articles = sortLatest(
    entries.filter(
      (e) =>
        e.status !== "coming-soon" &&
        ((e.category ?? e.tag) === "Glossary" || e.slug.startsWith("glossary/"))
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
            items={[{ label: "Home", href: "/" }, { label: "Glossary" }]}
          />
          <h1 className="category-hero__h1">Glossary</h1>
          <p className="category-hero__lede">
            The terminology of modern B2B marketing, defined precisely and kept
            current. Each entry is written to be citable by AI search engines
            and useful in a buyer conversation: a single-sentence definition, a
            clarifying paragraph, and a "where this applies" section.
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
          Need platform context? See{" "}
          <a href="/alternatives-to-6sense/">Best 6sense Alternatives</a> or the{" "}
          <a href="/learn/">Learn playbooks</a>.
        </p>
      </div>
    </>
  );
}
