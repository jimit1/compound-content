import type { Metadata } from "next";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "What Is Agentic Marketing? AI Agents That Run Campaigns",
  description:
    "Agentic marketing is the use of autonomous AI agents to plan, execute, and optimize marketing campaigns. Framework, examples, and what's real vs hype.",
  alternates: { canonical: "https://learn.abmatic.ai/glossary/agentic-marketing" },
  keywords: ["agentic marketing", "what is agentic ai in marketing", "ai marketing agents", "agentic ai for abm", "generative vs agentic ai marketing"],
  openGraph: {
    title: "What Is Agentic Marketing?",
    description:
      "The shift from AI copilots to autonomous AI agents that run marketing campaigns.",
    url: "https://learn.abmatic.ai/glossary/agentic-marketing",
    type: "article",
    publishedTime: "2026-04-22",
    modifiedTime: "2026-04-22",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Agentic Marketing?",
    description:
      "Autonomous AI agents that plan, execute, and optimize campaigns — not AI copilots.",
  },
};

export default function Page() {
  return (
    <article className="prose has-dropcap">
      <Content />
    </article>
  );
}
