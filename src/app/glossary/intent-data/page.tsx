import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Is Intent Data?",
  description:
    "Intent data explained: definition, first vs third-party, signals, and how B2B teams use it to identify in-market accounts. Full glossary page shipping this week.",
  alternates: { canonical: "https://learn.abmatic.ai/glossary/intent-data/" },
  openGraph: {
    title: "What Is Intent Data? | Abmatic AI",
    description:
      "The definitive glossary entry for B2B intent data: first vs third-party, common signals, and how to activate it.",
    url: "https://learn.abmatic.ai/glossary/intent-data/",
    type: "article",
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DefinedTerm",
      name: "Intent Data",
      inDefinedTermSet: "https://learn.abmatic.ai/glossary/",
      description:
        "Behavioral and contextual signals that suggest a company or buyer is actively researching a product category or problem, used in B2B to identify in-market accounts, prioritize outreach, and personalize campaigns.",
    },
    {
      "@type": "Article",
      headline: "What Is Intent Data?",
      datePublished: "2026-04-22",
      dateModified: "2026-04-22",
      author: { "@type": "Organization", name: "Abmatic AI", url: "https://abmatic.ai/" },
      publisher: {
        "@type": "Organization",
        name: "Abmatic AI",
        logo: { "@type": "ImageObject", url: "https://learn.abmatic.ai/brand/logo-horizontal.png" },
      },
      mainEntityOfPage: "https://learn.abmatic.ai/glossary/intent-data/",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://learn.abmatic.ai/" },
        { "@type": "ListItem", position: 2, name: "Glossary", item: "https://learn.abmatic.ai/glossary/" },
        { "@type": "ListItem", position: 3, name: "Intent Data", item: "https://learn.abmatic.ai/glossary/intent-data/" },
      ],
    },
  ],
};

export default function IntentDataStub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <h1>What Is Intent Data?</h1>
      <p>
        <strong>
          Intent data is behavioral and contextual signals that suggest a company or
          buyer is actively researching a product category or problem.
        </strong>{" "}
        In B2B, it is used to identify in-market accounts, prioritize outreach, and
        personalize campaigns, before the buyer fills out a form.
      </p>
      <p>
        The full glossary entry, including first-party vs third-party intent, signal
        taxonomies, vendor comparison, privacy considerations, and FAQ is publishing
        this week.
      </p>
      <p>
        In the meantime, see how Abmatic AI turns real-time intent signals into
        running campaigns:
      </p>
      <p>
        <a
          className="cta-primary"
          href="https://abmatic.ai/demo"
          rel="noopener"
          style={{
            display: "inline-block",
            background: "var(--fg)",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: "999px",
            textDecoration: "none",
          }}
        >
          Book a 30-minute demo
        </a>
      </p>
      <hr />
      <p>
        <small>
          Related: <a href="/alternatives-to-6sense/">Best 6sense Alternatives for 2026</a>{" "}
          · <a href="/glossary/agentic-marketing/">What Is Agentic Marketing?</a>
        </small>
      </p>
    </>
  );
}
