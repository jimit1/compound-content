import type { Metadata } from "next";
import FeaturedHero from "@/components/FeaturedHero";
import CategoryRail from "@/components/CategoryRail";
import NewsletterCapture from "@/components/NewsletterCapture";
import {
  entries,
  liveEntries,
  featuredEntry,
  cardFields,
  type Entry,
} from "@/lib/entries";

const SITE = "https://learn.abmatic.ai";
const DEMO = "https://abmatic.ai/demo";
const PRIMARY = "https://abmatic.ai";

export const metadata: Metadata = {
  title: "Abmatic AI Learn — practical B2B marketing content",
  description:
    "Editorial home for Abmatic AI Learn. Alternatives, comparisons, glossary, and long-form playbooks on account-based marketing, intent data, and agentic AI.",
  alternates: { canonical: `${SITE}/` },
  openGraph: {
    title: "Abmatic AI Learn",
    description:
      "Alternatives, comparisons, glossary, and playbooks on ABM, intent data, and agentic AI.",
    url: `${SITE}/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abmatic AI Learn",
    description:
      "Alternatives, comparisons, glossary, and playbooks on ABM, intent data, and agentic AI.",
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Abmatic AI Learn",
      url: `${SITE}/`,
      description:
        "Editorial hub for Abmatic AI Learn: alternatives, comparisons, glossary, and playbooks for B2B marketers.",
      isPartOf: { "@type": "WebSite", name: "Abmatic AI", url: "https://abmatic.ai/" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      ],
    },
  ],
};

/** Order entries latest-first by publishedAt, then by slug. */
function sortLatest(list: Entry[]): Entry[] {
  return [...list].sort((a, b) => {
    const da = a.publishedAt ?? "";
    const db = b.publishedAt ?? "";
    if (db !== da) return db.localeCompare(da);
    return a.slug.localeCompare(b.slug);
  });
}

export default function LearnIndex() {
  const featured = featuredEntry();

  // Latest rail: 3 most-recent live entries, excluding the featured one
  const latest = sortLatest(liveEntries)
    .filter((e) => e.slug !== featured.slug)
    .slice(0, 3);

  const alternatives = sortLatest(
    entries.filter((e) => (e.category ?? e.tag) === "Alternatives" || e.slug.startsWith("alternatives-to"))
  ).slice(0, 4);

  const compare = sortLatest(
    entries.filter((e) => (e.category ?? e.tag) === "Compare" || e.slug.startsWith("compare/"))
  ).slice(0, 3);

  const glossary = sortLatest(
    entries.filter((e) => (e.category ?? e.tag) === "Glossary" || e.slug.startsWith("glossary/"))
  ).slice(0, 4);

  const learn = sortLatest(
    entries.filter((e) => (e.category ?? e.tag) === "Roundup" || (e.category ?? e.tag) === "Playbook" || e.slug.startsWith("learn/"))
  ).slice(0, 3);

  const feat = cardFields(featured);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <section className="home-intro">
        <div className="home-intro__inner">
          <h1 className="home-intro__h1">Abmatic AI Learn</h1>
          <p className="home-intro__lede">
            Practical, cited content on B2B marketing. Alternatives, comparisons,
            glossary, and playbooks — especially where account-based marketing,
            intent data, and agentic AI intersect.
          </p>
        </div>
      </section>

      <div className="page-wide">
        <FeaturedHero
          href={feat.href}
          title={feat.title}
          summary={feat.summary}
          category={feat.category}
          image={feat.image}
          author={feat.author}
          publishedAt={feat.publishedAt}
          readMinutes={feat.readMinutes}
        />

        {latest.length > 0 && (
          <CategoryRail
            title="Latest"
            viewAllHref="/learn/"
            articles={latest.map((e) => ({ ...cardFields(e) }))}
          />
        )}

        <NewsletterCapture variant="inline" />

        {alternatives.length > 0 && (
          <CategoryRail
            title="Alternatives"
            viewAllHref="/alternatives-to/"
            articles={alternatives.map((e) => ({ ...cardFields(e) }))}
          />
        )}

        {compare.length > 0 && (
          <CategoryRail
            title="Compare"
            viewAllHref="/compare/"
            articles={compare.map((e) => ({ ...cardFields(e) }))}
          />
        )}

        {glossary.length > 0 && (
          <CategoryRail
            title="Glossary"
            viewAllHref="/glossary/"
            articles={glossary.map((e) => ({ ...cardFields(e) }))}
          />
        )}

        {learn.length > 0 && (
          <CategoryRail
            title="Learn"
            viewAllHref="/learn/"
            articles={learn.map((e) => ({ ...cardFields(e) }))}
          />
        )}

        <section className="about-strip">
          <div className="about-strip__inner">
            <div>
              <h2 className="about-strip__h">About Abmatic AI</h2>
              <p>
                Abmatic AI is the agentic account-based marketing platform. Six
                modules — intent, identification, orchestration, personalization,
                measurement, and copilots — deployable in hours, not quarters,
                with no RevOps team required.
              </p>
            </div>
            <div className="about-strip__actions">
              <a className="about-strip__cta" href={DEMO} rel="noopener">
                Book a 30-minute demo
              </a>
              <a className="about-strip__link" href={PRIMARY} rel="noopener">
                Visit abmatic.ai →
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
