import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Hero from "@/components/Hero";

const SITE = "https://learn.abmatic.ai";

export const metadata: Metadata = {
  title: "Alternatives guides — ABM and intent platforms",
  description:
    "Honest, vendor-by-vendor alternative guides for the most-shortlisted ABM and intent-data platforms in 2026. Pricing bands, time-to-value, and standout features.",
  alternates: { canonical: `${SITE}/alternatives-to/` },
  openGraph: {
    title: "Alternatives guides | Abmatic AI Learn",
    description:
      "Vendor-by-vendor alternative roundups for ABM and intent-data platforms in 2026.",
    url: `${SITE}/alternatives-to/`,
    type: "website",
  },
};

type Entry = {
  href: string;
  tag: string;
  title: string;
  summary: string;
  planned?: boolean;
};

const entries: Entry[] = [
  {
    href: "/alternatives-to-6sense/",
    tag: "Live",
    title: "Best 6sense Alternatives for 2026",
    summary:
      "Ten reasoned alternatives to 6sense, ranked by time-to-value. Abmatic AI, Demandbase, Mutiny, Warmly, RB2B, and more.",
  },
  {
    href: "/alternatives-to/demandbase/",
    tag: "Demandbase",
    title: "Demandbase Alternatives for 2026",
    summary:
      "Side-by-side replacement options for Demandbase, with honest takes on where each alternative actually fits.",
    planned: true,
  },
  {
    href: "/alternatives-to/mutiny/",
    tag: "Mutiny",
    title: "Mutiny Alternatives for 2026",
    summary:
      "Beyond landing-page personalization: ten credible replacements for Mutiny across unified and specialist platforms.",
    planned: true,
  },
  {
    href: "/alternatives-to/warmly/",
    tag: "Warmly",
    title: "Warmly Alternatives for 2026",
    summary:
      "From visitor-ID to full ABM: alternatives for teams evaluating Warmly as their primary signal engine.",
    planned: true,
  },
  {
    href: "/alternatives-to/clearbit/",
    tag: "Clearbit",
    title: "Clearbit (HubSpot Breeze) Alternatives for 2026",
    summary:
      "Post-rebrand replacement paths for Clearbit enrichment users who need more than in-CRM reveal.",
    planned: true,
  },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Alternatives guides — Abmatic AI Learn",
      url: `${SITE}/alternatives-to/`,
      description:
        "Honest, vendor-by-vendor alternative guides for the most-shortlisted ABM and intent-data platforms in 2026.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Alternatives", item: `${SITE}/alternatives-to/` },
      ],
    },
  ],
};

export default function AlternativesIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Alternatives" },
        ]}
      />
      <h1>Alternatives Guides</h1>
      <p className="lede">
        If you are leaving an ABM or intent platform because it is too expensive,
        too slow to deploy, or requires a team you do not have, the right
        alternative is almost never the second-most-expensive platform in the
        category. These guides compare the credible replacements, vendor by
        vendor, with pricing bands and time-to-value that you can actually use in
        a shortlist conversation. Every guide discloses Abmatic AI's bias
        up-front and is written against public product documentation.
      </p>

      <Hero
        src="/images/hero/alternatives.jpg"
        alt="Abstract analytics dashboard with multiple charts, suggesting side-by-side vendor evaluation"
        credit={{ name: "Luke Chesser", url: "https://unsplash.com/@lukechesser" }}
      />

      <div className="cat-cards">
        {entries.map((e) =>
          e.planned ? (
            <div key={e.href} className="cat-card planned" aria-disabled="true">
              <span className="tag">{e.tag}</span>
              <span className="planned-badge">Planned</span>
              <h3>{e.title}</h3>
              <p>{e.summary}</p>
            </div>
          ) : (
            <a key={e.href} className="cat-card" href={e.href}>
              <span className="tag">{e.tag}</span>
              <h3>{e.title}</h3>
              <p>{e.summary}</p>
            </a>
          )
        )}
      </div>

      <p>
        <small>
          Need a 1:1 comparison instead of a roundup? See the{" "}
          <a href="/compare/">comparison pages</a>. Need to understand the
          underlying terminology? See the <a href="/glossary/">glossary</a>.
        </small>
      </p>
    </>
  );
}
