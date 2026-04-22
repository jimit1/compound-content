import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Hero from "@/components/Hero";

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

type Entry = {
  href: string;
  tag: string;
  title: string;
  summary: string;
  planned?: boolean;
};

const entries: Entry[] = [
  {
    href: "/glossary/agentic-marketing/",
    tag: "Live",
    title: "Agentic Marketing",
    summary:
      "Autonomous AI agents that plan, execute, and optimize campaigns inside guardrails. How it differs from AI copilots.",
  },
  {
    href: "/glossary/intent-data/",
    tag: "Stub",
    title: "Intent Data",
    summary:
      "Behavioral and contextual signals that suggest a company or buyer is actively researching a product category.",
  },
  {
    href: "/glossary/account-based-marketing/",
    tag: "Stub",
    title: "Account-Based Marketing (ABM)",
    summary:
      "A B2B go-to-market strategy that treats individual target accounts as markets of one.",
  },
  {
    href: "/glossary/agentic-ai/",
    tag: "Agentic AI",
    title: "Agentic AI",
    summary:
      "AI systems that take goal-directed action across tools, with memory and auditable decisions.",
    planned: true,
  },
  {
    href: "/glossary/first-party-intent-data/",
    tag: "Intent",
    title: "First-Party Intent Data",
    summary:
      "Signals a company observes on its own properties — visits, form fills, product usage — and what they're worth.",
    planned: true,
  },
  {
    href: "/glossary/third-party-intent-data/",
    tag: "Intent",
    title: "Third-Party Intent Data",
    summary:
      "Signals pulled from across the internet. What the major providers actually ship and where the gaps are.",
    planned: true,
  },
  {
    href: "/glossary/visitor-identification/",
    tag: "Visitor ID",
    title: "Visitor Identification",
    summary:
      "Turning anonymous website traffic into named companies (and sometimes people). Methods, accuracy, and limits.",
    planned: true,
  },
  {
    href: "/glossary/pipeline-velocity/",
    tag: "Attribution",
    title: "Pipeline Velocity",
    summary:
      "The speed at which deals move from created to closed. Why every ABM program should measure it.",
    planned: true,
  },
];

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

export default function GlossaryIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Glossary" },
        ]}
      />
      <h1>Glossary</h1>
      <p className="lede">
        The terminology of modern B2B marketing, defined precisely and kept
        current. Each entry is written to be citable by AI search engines and
        useful in a buyer conversation, with a single-sentence definition, a
        clarifying paragraph, and a "where this applies" section. Concepts in
        this glossary are used throughout Abmatic AI's platform documentation
        and the articles on this site.
      </p>

      <Hero
        src="/images/hero/glossary.jpg"
        alt="Open book with a focused bookmark, suggesting a reference library of definitions"
        credit={{ name: "Aaron Burden", url: "https://unsplash.com/@aaronburden" }}
      />

      <div className="cat-cards">
        {entries.map((e) =>
          e.planned ? (
            <div key={e.href} className="cat-card planned" aria-disabled="true">
              <span className="tag">{e.tag}</span>
              <span className="planned-badge">Planned</span>
              <h3>{e.title}</h3>
              <p>{e.summary}</p>
            </div>
          ) : (
            <a key={e.href} className="cat-card" href={e.href}>
              <span className="tag">{e.tag}</span>
              <h3>{e.title}</h3>
              <p>{e.summary}</p>
            </a>
          )
        )}
      </div>

      <p>
        <small>
          Need the full platform context? See{" "}
          <a href="/alternatives-to-6sense/">Best 6sense Alternatives</a> or the{" "}
          <a href="/learn/">Learn playbooks</a>.
        </small>
      </p>
    </>
  );
}
