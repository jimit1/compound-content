import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abmatic Learn — practical B2B marketing content",
  description:
    "Honest, cited, and practical content on account-based marketing, intent data, agentic marketing, and the B2B growth stack.",
  alternates: { canonical: "https://learn.abmatic.ai/learn" },
};

type Entry = {
  href: string;
  tag: string;
  title: string;
  summary: string;
};

const pages: Entry[] = [
  {
    href: "/alternatives-to-6sense",
    tag: "Comparison",
    title: "Best 6sense Alternatives for 2026",
    summary:
      "Ten alternatives to 6sense compared on price, time-to-value, and standout features. For teams that need ABM results in weeks, not quarters.",
  },
  {
    href: "/glossary/agentic-marketing",
    tag: "Glossary",
    title: "What Is Agentic Marketing?",
    summary:
      "The shift from AI copilots to autonomous AI agents that run marketing campaigns. Definition, framework, and what it looks like in production.",
  },
];

export default function LearnIndex() {
  return (
    <>
      <h1>Abmatic Learn</h1>
      <p>
        Practical, cited content on B2B marketing — especially where account-based marketing,
        intent data, and agentic AI intersect. Written by Abmatic's team and the Compound
        autonomous growth agency.
      </p>
      <div className="index-grid">
        {pages.map((p) => (
          <a key={p.href} className="index-card" href={p.href}>
            <span className="tag">{p.tag}</span>
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
          </a>
        ))}
      </div>
      <p>
        <small>More pages shipping weekly. For the full Abmatic platform, visit{" "}
        <a href="https://abmatic.ai/">abmatic.ai</a>.</small>
      </p>
    </>
  );
}
