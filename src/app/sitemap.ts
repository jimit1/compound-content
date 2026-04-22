import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://learn.abmatic.ai";
  const now = new Date();
  return [
    { url: `${base}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${base}/alternatives-to-6sense`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/glossary/agentic-marketing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
