import React from "react";

type RelatedItem = {
  href: string;
  title: string;
  tag: string;
  summary?: string;
};

/**
 * Static related-articles mapping. Keyed by `currentSlug` OR `cluster`.
 * A currentSlug entry wins over a cluster entry when both exist.
 *
 * Anchored to /Users/jimabmatic.ai/compound/artifacts/competitive/cluster_map.md:
 * - Cluster 1 (6sense) — alternatives-to-6sense
 * - Cluster 4 (Agentic AI) — agentic-marketing
 * - Cluster 5 (Intent data) — intent-data
 * - Cluster 6 (ABM playbook) — account-based-marketing
 *
 * Keep these links inside the hub (learn.abmatic.ai) only — stubs OK.
 */
const LIBRARY: Record<string, RelatedItem> = {
  "alternatives-to-6sense": {
    href: "/alternatives-to-6sense/",
    title: "Best 6sense Alternatives for 2026",
    tag: "Alternatives",
    summary: "Ten reasoned alternatives to 6sense, ranked by time-to-value.",
  },
  "agentic-marketing": {
    href: "/glossary/agentic-marketing/",
    title: "What Is Agentic Marketing?",
    tag: "Glossary",
    summary: "The shift from AI copilots to autonomous AI agents that run campaigns.",
  },
  "intent-data": {
    href: "/glossary/intent-data/",
    title: "What Is Intent Data?",
    tag: "Glossary",
    summary: "First vs third-party intent, signal taxonomies, and how to activate it.",
  },
  "account-based-marketing": {
    href: "/glossary/account-based-marketing/",
    title: "What Is Account-Based Marketing?",
    tag: "Glossary",
    summary: "ABM defined, tiers, tactics, and how agentic platforms run it end-to-end.",
  },
  "best-abm-platforms-2026": {
    href: "/best-abm-platforms-2026/",
    title: "Best ABM Platforms for 2026",
    tag: "Roundup",
    summary: "Abmatic AI, Demandbase, 6sense, Mutiny, Warmly, and more — reasoned.",
  },
};

const MAPPING: Record<string, string[]> = {
  // Per-article explicit wiring
  "alternatives-to-6sense": ["agentic-marketing", "intent-data", "best-abm-platforms-2026"],
  "agentic-marketing": ["alternatives-to-6sense", "intent-data", "account-based-marketing"],
  "intent-data": ["alternatives-to-6sense", "agentic-marketing", "account-based-marketing"],
  "account-based-marketing": ["alternatives-to-6sense", "intent-data", "agentic-marketing"],
  "best-abm-platforms-2026": [
    "alternatives-to-6sense",
    "agentic-marketing",
    "account-based-marketing",
  ],
  // Cluster fallbacks
  "cluster:6sense": ["alternatives-to-6sense", "agentic-marketing", "intent-data"],
  "cluster:glossary": [
    "agentic-marketing",
    "intent-data",
    "account-based-marketing",
  ],
  "cluster:agentic-marketing": [
    "agentic-marketing",
    "alternatives-to-6sense",
    "best-abm-platforms-2026",
  ],
};

type Props = {
  currentSlug?: string;
  cluster?: string;
  heading?: string;
};

export default function RelatedArticles({
  currentSlug,
  cluster,
  heading = "Related reading",
}: Props) {
  const key =
    (currentSlug && MAPPING[currentSlug]) ||
    (cluster && MAPPING[`cluster:${cluster}`]) ||
    MAPPING["cluster:glossary"];

  const items = key
    .filter((slug) => slug !== currentSlug)
    .slice(0, 3)
    .map((slug) => LIBRARY[slug])
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <aside className="related" aria-labelledby="related-heading">
      <h3 id="related-heading">{heading}</h3>
      <div className="related-grid">
        {items.map((item) => (
          <a key={item.href} className="related-card" href={item.href}>
            <span className="tag">{item.tag}</span>
            <strong>{item.title}</strong>
            {item.summary && <span className="summary">{item.summary}</span>}
          </a>
        ))}
      </div>
    </aside>
  );
}
