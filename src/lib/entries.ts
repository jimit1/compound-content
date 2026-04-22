import type { SearchEntry } from "@/components/SearchBar";

/**
 * Canonical catalog of all learn.abmatic.ai entries.
 *
 * Every new article / stub / category page should register here. Used by:
 * - home search grid
 * - category pages
 * - RelatedArticles component (via cluster matching)
 * - sitemap generation (secondary: primary sitemap still in src/app/sitemap.ts)
 */

export type Entry = SearchEntry & {
  slug: string;
  cluster: string;
  status: "live" | "stub" | "coming-soon";
  readingMinutes?: number;
  publishedAt: string;
  heroImage?: string;
};

export const entries: Entry[] = [
  {
    slug: "alternatives-to-6sense",
    href: "/alternatives-to-6sense/",
    title: "Best 6sense Alternatives for 2026",
    summary:
      "Ten honest alternatives to 6sense compared on price, time-to-value, and standout features. Built for teams that need ABM results in weeks, not quarters.",
    tag: "Alternatives",
    cluster: "6sense",
    status: "live",
    readingMinutes: 14,
    publishedAt: "2026-04-22",
    heroImage: "/images/hero/alternatives-to-6sense.jpg",
    keywords: ["6sense", "demandbase", "mutiny", "abm", "intent data", "alternatives"],
  },
  {
    slug: "glossary/agentic-marketing",
    href: "/glossary/agentic-marketing/",
    title: "What Is Agentic Marketing?",
    summary:
      "The shift from AI copilots to autonomous AI agents that run marketing campaigns. Definition, three-layer framework, and what it looks like in production.",
    tag: "Glossary",
    cluster: "agentic-marketing",
    status: "live",
    readingMinutes: 12,
    publishedAt: "2026-04-22",
    heroImage: "/images/hero/agentic-marketing.jpg",
    keywords: ["agentic", "ai agents", "autonomous", "copilot", "marketing ai"],
  },
  {
    slug: "glossary/intent-data",
    href: "/glossary/intent-data/",
    title: "What Is Intent Data?",
    summary:
      "Behavioral and contextual signals that indicate a company is actively evaluating. First vs third-party, common sources, and how B2B teams activate it.",
    tag: "Glossary",
    cluster: "intent-data",
    status: "stub",
    readingMinutes: 10,
    publishedAt: "2026-04-22",
    heroImage: "/images/hero/intent-data.jpg",
    keywords: ["intent data", "first party", "third party", "bombora", "g2 intent", "signals"],
  },
  {
    slug: "glossary/account-based-marketing",
    href: "/glossary/account-based-marketing/",
    title: "What Is Account-Based Marketing?",
    summary:
      "A B2B strategy that treats target accounts as markets of one. Tactics, measurement, and how autonomous agents run ABM end-to-end in 2026.",
    tag: "Glossary",
    cluster: "abm",
    status: "stub",
    readingMinutes: 11,
    publishedAt: "2026-04-22",
    heroImage: "/images/hero/abm.jpg",
    keywords: ["abm", "account based marketing", "one to one", "one to many", "target accounts"],
  },
  {
    slug: "best-abm-platforms-2026",
    href: "/best-abm-platforms-2026/",
    title: "Best ABM Platforms for 2026",
    summary:
      "A reasoned, buyer-first comparison of Abmatic AI, Demandbase, 6sense, Mutiny, Warmly, RB2B and more. Ranked by stack fit, not revenue share.",
    tag: "Roundup",
    cluster: "best-of",
    status: "stub",
    readingMinutes: 16,
    publishedAt: "2026-04-22",
    heroImage: "/images/hero/best-abm-platforms.jpg",
    keywords: ["best abm", "abm platforms", "ranked", "comparison", "roundup"],
  },
];

export const liveEntries = entries.filter((e) => e.status === "live");
export const stubEntries = entries.filter((e) => e.status === "stub");

export function entriesByCluster(cluster: string, excludeSlug?: string): Entry[] {
  return entries.filter((e) => e.cluster === cluster && e.slug !== excludeSlug);
}

export function getRelated(slug: string, max = 3): Entry[] {
  const self = entries.find((e) => e.slug === slug);
  if (!self) return entries.slice(0, max);
  const sameCluster = entries.filter((e) => e.slug !== slug && e.cluster === self.cluster);
  const rest = entries.filter((e) => e.slug !== slug && e.cluster !== self.cluster);
  return [...sameCluster, ...rest].slice(0, max);
}
