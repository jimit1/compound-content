import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://learn.abmatic.ai";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/alternatives-to-6sense/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/glossary/agentic-marketing/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/glossary/intent-data/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/glossary/account-based-marketing/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/best-abm-platforms-2026/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];
}
