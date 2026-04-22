import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleCard from "@/components/ArticleCard";
import { entries, cardFields, type Entry } from "@/lib/entries";

const SITE = "https://learn.abmatic.ai";

export const metadata: Metadata = {
  title: "Learn — long-form B2B marketing playbooks",
  description:
    "Multi-thousand-word playbooks on ABM strategy, intent-data activation, agentic deployment, and pipeline measurement. No filler, cited sources, useful frameworks.",
  alternates: { canonical: `${SITE}/learn/` },
  openGraph: {
    title: "Learn — B2B marketing playbooks | Abmatic AI",
    description:
      "Long-form playbooks on ABM, intent data, and agentic marketing from the Abmatic AI team.",
    url: `${SITE}/learn/`,
    type: "website",
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Learn — Abmatic AI playbooks",
      url: `${SITE}/learn/`,
      description:
        "Long-form B2B marketing playbooks from the Abmatic AI team. ABM strategy, intent data, agentic deployment, and pipeline measurement.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Learn", item: `${SITE}/learn/` },
      ],
    },
  ],
};

function sortLatest(list: Entry[]): Entry[] {
  return [...list].sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export default function LearnPlaybooksIndex() {
  // Learn surface = Roundups, Playbooks, and anything slugged under /learn/
  const articles = sortLatest(
    entries.filter((e) => {
      if (e.status === "coming-soon") return false;
      const cat = (e.category ?? e.tag).toLowerCase();
      return (
        cat === "roundup" ||
        cat === "playbook" ||
        cat === "pillar" ||
        cat === "migration" ||
        e.slug.startsWith("learn/") ||
        e.slug === "best-abm-platforms-2026"
      );
    })
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />
      <section className="category-hero">
        <div className="category-hero__inner">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Learn" }]} />
          <h1 className="category-hero__h1">Learn</h1>
          <p className="category-hero__lede">
            Long-form playbooks on the parts of B2B marketing that move
            pipeline: account-based strategy, intent-data activation, agentic
            deployment, and measurement that survives an executive review. Each
            playbook is built to be finished, not skimmed.
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
          Need quick definitions instead of deep dives? See the{" "}
          <a href="/glossary/">glossary</a>. Comparing specific vendors? See{" "}
          <a href="/compare/">compare</a> and <a href="/alternatives-to/">alternatives</a>.
        </p>
      </div>
    </>
  );
}
