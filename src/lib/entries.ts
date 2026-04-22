import type { SearchEntry } from "@/components/SearchBar";

/**
 * Canonical catalog of all learn.abmatic.ai entries.
 *
 * Every new article / stub / category page should register here. Used by:
 * - home search grid
 * - category pages
 * - RelatedArticles component (via cluster matching)
 * - sitemap generation (secondary: primary sitemap still in src/app/sitemap.ts)
 * - editorial ArticleCard (reads author/date/readMinutes/image/category)
 */

export type Entry = SearchEntry & {
  slug: string;
  cluster: string;
  status: "live" | "stub" | "coming-soon";
  readingMinutes?: number;
  publishedAt: string;
  heroImage?: string;

  // v2 editorial fields — optional with sensible defaults in selectors/components.
  // These are ADDITIVE. Draft-promotion agents may append new entries without
  // setting them; ArticleCard and selectors will fall back.
  author?: string;
  updatedAt?: string;
  readMinutes?: number;       // v2 name; falls back to `readingMinutes`
  image?: string;             // v2 name; falls back to `heroImage`
  category?: string;          // v2 name; falls back to `tag`
  featured?: boolean;         // true → eligible for home FeaturedHero
};

const DEFAULT_AUTHOR = "Abmatic AI editorial";
const DEFAULT_DATE = "2026-04-22";
const DEFAULT_READ = 8;
const PLACEHOLDER_IMAGE = "/images/hero/home.jpg";

/** Return the best-available display fields for an entry. */
export function cardFields(e: Entry) {
  return {
    href: e.href,
    title: e.title,
    summary: e.summary,
    category: e.category ?? e.tag,
    image: e.image ?? e.heroImage ?? PLACEHOLDER_IMAGE,
    author: e.author ?? DEFAULT_AUTHOR,
    publishedAt: e.publishedAt ?? DEFAULT_DATE,
    readMinutes: e.readMinutes ?? e.readingMinutes ?? DEFAULT_READ,
    status: e.status,
  };
}

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
    heroImage: "/images/hero/sixsense-alts.jpg",
    keywords: ["6sense", "demandbase", "mutiny", "abm", "intent data", "alternatives"],
    author: "Abmatic AI editorial",
    featured: true,
  },
  {
    slug: "alternatives-to-mutiny",
    href: "/alternatives-to/mutiny/",
    title: "10 Mutiny Alternatives for 2026",
    summary:
      "Beyond landing-page personalization. Two tiers of Mutiny alternatives: direct CRO swaps and full-stack ABM platforms for teams wanting pipeline, not just variants.",
    tag: "Alternatives",
    cluster: "mutiny",
    status: "live",
    readingMinutes: 13,
    publishedAt: "2026-04-22",
    heroImage: "/images/hero/alternatives.jpg",
    keywords: ["mutiny", "personalization", "unbounce", "instapage", "ab tasty", "insider", "alternatives"],
    author: "Abmatic AI editorial",
  },
  {
    slug: "alternatives-to-clearbit",
    href: "/alternatives-to/clearbit/",
    title: "10 Clearbit Alternatives for 2026",
    summary:
      "Post-Breeze replacement paths covering both enrichment AND Reveal. Apollo, ZoomInfo, Cognism, Warmly, RB2B, and more, bucketed by which Clearbit job you used.",
    tag: "Alternatives",
    cluster: "clearbit",
    status: "live",
    readingMinutes: 13,
    publishedAt: "2026-04-22",
    heroImage: "/images/hero/best-abm.jpg",
    keywords: ["clearbit", "breeze", "enrichment", "reveal", "apollo", "zoominfo", "alternatives"],
    author: "Abmatic AI editorial",
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
    heroImage: "/images/hero/agentic.jpg",
    keywords: ["agentic", "ai agents", "autonomous", "copilot", "marketing ai"],
    author: "Abmatic AI editorial",
  },
  {
    slug: "glossary/intent-data",
    href: "/glossary/intent-data/",
    title: "What Is Intent Data?",
    summary:
      "Behavioral and contextual signals that indicate a company is actively evaluating. First vs third-party, common sources, and how B2B teams activate it.",
    tag: "Glossary",
    cluster: "intent-data",
    status: "live",
    readingMinutes: 10,
    publishedAt: "2026-04-22",
    heroImage: "/images/hero/intent-data.jpg",
    keywords: ["intent data", "first party", "third party", "bombora", "g2 intent", "signals"],
    author: "Abmatic AI editorial",
  },
  {
    slug: "glossary/account-based-marketing",
    href: "/glossary/account-based-marketing/",
    title: "What Is Account-Based Marketing?",
    summary:
      "A B2B strategy that treats target accounts as markets of one. Tactics, measurement, and how autonomous agents run ABM end-to-end in 2026.",
    tag: "Glossary",
    cluster: "abm",
    status: "live",
    readingMinutes: 11,
    publishedAt: "2026-04-22",
    heroImage: "/images/hero/abm.jpg",
    keywords: ["abm", "account based marketing", "one to one", "one to many", "target accounts"],
    author: "Abmatic AI editorial",
  },
  {
    slug: "best-abm-platforms-2026",
    href: "/best-abm-platforms-2026/",
    title: "Best ABM Platforms for 2026",
    summary:
      "A reasoned, buyer-first comparison of Abmatic AI, Demandbase, 6sense, Mutiny, Warmly, RB2B and more. Ranked by stack fit, not revenue share.",
    tag: "Roundup",
    cluster: "best-of",
    status: "live",
    readingMinutes: 16,
    publishedAt: "2026-04-22",
    heroImage: "/images/hero/best-abm.jpg",
    keywords: ["best abm", "abm platforms", "ranked", "comparison", "roundup"],
    author: "Abmatic AI editorial",
  },
];

export const liveEntries = entries.filter((e) => e.status === "live");
export const stubEntries = entries.filter((e) => e.status === "stub");

/** Entries in a given category (by tag or explicit `category` field). */
export function entriesByCategory(cat: string): Entry[] {
  const needle = cat.toLowerCase();
  return entries.filter(
    (e) => (e.category ?? e.tag).toLowerCase() === needle
  );
}

/** Entries whose slug starts with a prefix (e.g. "glossary/"). */
export function entriesBySlugPrefix(prefix: string): Entry[] {
  return entries.filter((e) => e.slug.startsWith(prefix));
}

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

/** Home hero — explicit `featured: true` wins, else first live entry. */
export function featuredEntry(): Entry {
  return entries.find((e) => e.featured && e.status === "live") ?? liveEntries[0] ?? entries[0];
}

/** Format an ISO date as "Apr 22, 2026" — static-export-safe, no locale surprises. */
export function formatDate(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? "T12:00:00Z" : ""));
  if (isNaN(d.getTime())) return iso;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}
