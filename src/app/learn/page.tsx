import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Hero from "@/components/Hero";

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

type Entry = {
  href: string;
  tag: string;
  title: string;
  summary: string;
  planned?: boolean;
};

const entries: Entry[] = [
  {
    href: "/best-abm-platforms-2026/",
    tag: "Roundup",
    title: "Best ABM Platforms for 2026",
    summary:
      "A reasoned, buyer-first comparison of the best account-based marketing platforms for 2026. Pricing bands, time-to-value, standout features, and a decision framework.",
  },
  {
    href: "/learn/agentic-ai-for-marketing/",
    tag: "Pillar",
    title: "The 2026 Guide to Agentic AI in Marketing",
    summary:
      "The flagship deep-dive: what counts as agentic, where it works, where it fails, and how to deploy it responsibly.",
    planned: true,
  },
  {
    href: "/learn/abm-playbook-2026/",
    tag: "Playbook",
    title: "The Complete ABM Playbook for 2026",
    summary:
      "5,000 words on building an ABM program end-to-end: ICP, tiering, tactics, measurement, and stack.",
    planned: true,
  },
  {
    href: "/learn/how-to-use-intent-data/",
    tag: "Playbook",
    title: "How to Use Intent Data",
    summary:
      "A practical guide to turning first-party + third-party signals into routed actions, not a dusty dashboard.",
    planned: true,
  },
  {
    href: "/learn/how-to-measure-abm-roi/",
    tag: "Playbook",
    title: "How to Measure ABM ROI",
    summary:
      "Multi-touch attribution, pipeline velocity, and the metrics that actually survive an executive review.",
    planned: true,
  },
  {
    href: "/learn/migrate-from-6sense/",
    tag: "Migration",
    title: "Migrating from 6sense",
    summary:
      "Field notes from teams who moved off 6sense: what to export, what to rebuild, how to run in parallel.",
    planned: true,
  },
];

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

export default function LearnPlaybooksIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Learn" },
        ]}
      />
      <h1>Learn</h1>
      <p className="lede">
        Long-form playbooks on the parts of B2B marketing that actually move
        pipeline: account-based strategy, intent-data activation, agentic
        deployment, and the measurement that survives an executive review. Each
        playbook is written to be finished, not skimmed — expect 3,000 to 5,000
        words of structure you can lift straight into your own program.
      </p>

      <Hero
        src="/images/hero/learn.jpg"
        alt="Notebook, pen, and coffee on a clean desk, suggesting focused long-form work"
        credit={{ name: "Firmbee.com", url: "https://unsplash.com/@firmbee" }}
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
          Need quick definitions instead of deep dives? See the{" "}
          <a href="/glossary/">glossary</a>. Comparing specific vendors? See{" "}
          <a href="/compare/">compare</a> and <a href="/alternatives-to/">alternatives</a>.
        </small>
      </p>
    </>
  );
}
