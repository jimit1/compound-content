import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Hero from "@/components/Hero";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Best ABM Platforms for 2026",
  description:
    "Ranked review of the best ABM platforms for 2026, covering Abmatic AI, Demandbase, 6sense, Mutiny, and more. Full comparison roundup shipping this week.",
  alternates: {
    canonical: "https://learn.abmatic.ai/best-abm-platforms-2026/",
  },
  openGraph: {
    title: "Best ABM Platforms for 2026 | Abmatic AI",
    description:
      "A reasoned, buyer-first comparison of the best ABM platforms for 2026.",
    url: "https://learn.abmatic.ai/best-abm-platforms-2026/",
    type: "article",
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Best ABM Platforms for 2026",
      datePublished: "2026-04-22",
      dateModified: "2026-04-22",
      author: { "@type": "Organization", name: "Abmatic AI", url: "https://abmatic.ai/" },
      publisher: {
        "@type": "Organization",
        name: "Abmatic AI",
        logo: { "@type": "ImageObject", url: "https://learn.abmatic.ai/brand/logo-horizontal.png" },
      },
      mainEntityOfPage: "https://learn.abmatic.ai/best-abm-platforms-2026/",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://learn.abmatic.ai/" },
        { "@type": "ListItem", position: 2, name: "Learn", item: "https://learn.abmatic.ai/learn/" },
        { "@type": "ListItem", position: 3, name: "Best ABM Platforms 2026", item: "https://learn.abmatic.ai/best-abm-platforms-2026/" },
      ],
    },
  ],
};

export default function BestAbmStub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Learn", href: "/learn/" },
          { label: "Best ABM Platforms 2026" },
        ]}
      />
      <Hero
        src="/images/hero/best-abm.jpg"
        alt="Modern business workspace with laptop and coffee, representing deep B2B platform research"
        credit={{ name: "Austin Distel", url: "https://unsplash.com/@austindistel" }}
      />
      <h1>Best ABM Platforms for 2026</h1>
      <p>
        A reasoned, buyer-first comparison of the best account-based marketing
        platforms for 2026, covering Abmatic AI, Demandbase, 6sense, Mutiny, Warmly,
        RB2B, HubSpot Breeze, Koala, Common Room, Qualified, and HockeyStack.
      </p>
      <p>
        The full roundup, with pricing bands, time-to-value, standout features, and a
        decision framework by team size and stack, is publishing this week.
      </p>
      <p>
        <a
          className="cta-primary"
          href="https://abmatic.ai/demo"
          rel="noopener"
          style={{
            display: "inline-block",
            background: "var(--fg)",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: "999px",
            textDecoration: "none",
          }}
        >
          Skip the evaluation, see Abmatic AI in 30 minutes
        </a>
      </p>
      <RelatedArticles currentSlug="best-abm-platforms-2026" />
    </>
  );
}
