import type { MetadataRoute } from "next";
import vendorsData from "@/data/vendors.json";

export const dynamic = "force-static";

type VendorsFile = { pair_filter: { pairs: string[] } };
const data = vendorsData as unknown as VendorsFile;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://learn.abmatic.ai";
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/alternatives-to/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/compare/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/glossary/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/learn/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/alternatives-to-6sense/`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/glossary/agentic-marketing/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/glossary/intent-data/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/glossary/account-based-marketing/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/best-abm-platforms-2026/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const compareEntries: MetadataRoute.Sitemap = data.pair_filter.pairs.map((slug) => ({
    url: `${base}/compare/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticEntries, ...compareEntries];
}
