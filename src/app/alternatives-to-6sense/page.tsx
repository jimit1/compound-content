import type { Metadata } from "next";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Best 6sense Alternatives for 2026 — Cheaper, Faster, AI-Native ABM",
  description:
    "Compare 10 6sense alternatives side-by-side: price bands, time-to-value, and standout features. For teams that need ABM results in weeks, not quarters.",
  alternates: { canonical: "https://learn.abmatic.ai/alternatives-to-6sense" },
  keywords: ["6sense alternatives", "alternatives to 6sense", "cheaper than 6sense", "6sense competitors", "6sense vs"],
  openGraph: {
    title: "Best 6sense Alternatives for 2026 — Cheaper, Faster, AI-Native ABM",
    description:
      "Ten reasoned alternatives to 6sense for teams that need ABM in weeks, not quarters.",
    url: "https://learn.abmatic.ai/alternatives-to-6sense",
    type: "article",
    publishedTime: "2026-04-22",
    modifiedTime: "2026-04-22",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best 6sense Alternatives for 2026",
    description:
      "Ten reasoned alternatives to 6sense, including Abmatic (yes, we disclosed).",
  },
};

export default function Page() {
  return (
    <article className="prose has-dropcap">
      <Content />
    </article>
  );
}
