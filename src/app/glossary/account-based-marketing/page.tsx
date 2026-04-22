import type { Metadata } from "next";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "What Is Account-Based Marketing (ABM)? A 2026 Definition + Playbook Starter",
  description:
    "ABM is a B2B strategy that treats accounts as the unit of revenue. Learn the definition, the three tiers, the 5 jobs of an ABM program, and the 2026 shift.",
  alternates: {
    canonical: "https://learn.abmatic.ai/glossary/account-based-marketing/",
  },
  keywords: [
    "what is account based marketing",
    "what is abm",
    "account based marketing definition",
    "abm meaning",
    "account based marketing explained",
    "abm vs marketing",
  ],
  openGraph: {
    title: "What Is Account-Based Marketing? | Abmatic AI",
    description:
      "ABM defined, three tiers, the 5 jobs, and how autonomous agents run account-based campaigns end-to-end in 2026.",
    url: "https://learn.abmatic.ai/glossary/account-based-marketing/",
    type: "article",
    publishedTime: "2026-04-22",
    modifiedTime: "2026-04-22",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Account-Based Marketing?",
    description:
      "ABM tiers, the 5 jobs, and the 2026 shift to agentic execution.",
  },
};

export default function Page() {
  return <Content />;
}
