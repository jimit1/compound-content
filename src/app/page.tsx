import type { Metadata } from "next";
import Hero from "@/components/Hero";

const SITE = "https://learn.abmatic.ai";
const DEMO = "https://abmatic.ai/demo";

export const metadata: Metadata = {
  title: "Abmatic AI Learn — practical B2B marketing content",
  description:
    "A hub for honest, cited content on account-based marketing, intent data, agentic AI, and the B2B growth stack. Alternatives, comparisons, glossary, and playbooks.",
  alternates: { canonical: `${SITE}/` },
  openGraph: {
    title: "Abmatic AI Learn",
    description:
      "Alternatives, comparisons, glossary, and playbooks on ABM, intent data, and agentic AI.",
    url: `${SITE}/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abmatic AI Learn",
    description:
      "Alternatives, comparisons, glossary, and playbooks on ABM, intent data, and agentic AI.",
  },
};

type Latest = {
  href: string;
  tag: string;
  title: string;
  summary: string;
  stub?: boolean;
};

const LATEST: Latest[] = [
  {
    href: "/alternatives-to-6sense/",
    tag: "Alternatives",
    title: "Best 6sense Alternatives for 2026",
    summary:
      "Ten alternatives to 6sense compared on price, time-to-value, and standout features.",
  },
  {
    href: "/glossary/agentic-marketing/",
    tag: "Glossary",
    title: "What Is Agentic Marketing?",
    summary:
      "The shift from AI copilots to autonomous AI agents that run marketing campaigns.",
  },
  {
    href: "/best-abm-platforms-2026/",
    tag: "Roundup",
    title: "Best ABM Platforms for 2026",
    summary:
      "A reasoned, buyer-first comparison of the best account-based marketing platforms for 2026.",
    stub: true,
  },
  {
    href: "/glossary/intent-data/",
    tag: "Glossary",
    title: "What Is Intent Data?",
    summary:
      "Behavioral and contextual signals that suggest a company is actively researching a category.",
    stub: true,
  },
  {
    href: "/glossary/account-based-marketing/",
    tag: "Glossary",
    title: "What Is Account-Based Marketing?",
    summary:
      "A B2B go-to-market strategy that treats individual accounts as markets of one.",
    stub: true,
  },
];

const CATEGORIES = [
  { href: "/alternatives-to/", title: "Alternatives", blurb: "Vendor-by-vendor breakdowns" },
  { href: "/compare/", title: "Compare", blurb: "Side-by-side matchups" },
  { href: "/glossary/", title: "Glossary", blurb: "Definitions that cite" },
  { href: "/learn/", title: "Learn", blurb: "Long-form playbooks" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Abmatic AI Learn",
      url: `${SITE}/`,
      description:
        "Hub page for Abmatic AI Learn: alternatives, comparisons, glossary, and playbooks for B2B marketers.",
      isPartOf: { "@type": "WebSite", name: "Abmatic AI", url: "https://abmatic.ai/" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      ],
    },
  ],
};

export default function LearnIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />
      <h1>Abmatic AI Learn</h1>
      <p className="lede">
        Practical, cited content on B2B marketing. Written by Abmatic AI and the
        Compound autonomous growth agency — especially where account-based
        marketing, intent data, and agentic AI intersect.
      </p>

      <Hero
        src="/images/hero/home.jpg"
        alt="Abstract data dashboard visualization in blue tones, representing the analytical backbone of modern B2B marketing"
        credit={{ name: "Carlos Muza", url: "https://unsplash.com/@kmuza" }}
      />

      <div className="hub-categories">
        {CATEGORIES.map((c) => (
          <a key={c.href} className="hub-cat" href={c.href}>
            <strong>{c.title}</strong>
            <span>{c.blurb}</span>
          </a>
        ))}
      </div>

      <h2>Latest from Abmatic AI</h2>
      <div className="cat-cards">
        {LATEST.map((p) => (
          <a key={p.href} className={`cat-card${p.stub ? " planned" : ""}`} href={p.href}>
            <span className="tag">{p.tag}</span>
            {p.stub && <span className="planned-badge">Stub</span>}
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
          </a>
        ))}
      </div>

      <div className="hub-footer-cta">
        <h2>Get the Abmatic AI platform demo</h2>
        <p>Six modules in one platform. Deployable in hours. Zero RevOps team required.</p>
        <a className="cta-primary" href={DEMO} rel="noopener">
          Book a 30-minute demo
        </a>
      </div>
    </>
  );
}
