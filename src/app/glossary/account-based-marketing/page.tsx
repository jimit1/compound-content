import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Is Account-Based Marketing (ABM)?",
  description:
    "Account-based marketing explained: definition, how ABM differs from demand gen, one-to-one vs one-to-many, and how modern agentic platforms run ABM. Full page this week.",
  alternates: {
    canonical: "https://learn.abmatic.ai/glossary/account-based-marketing/",
  },
  openGraph: {
    title: "What Is Account-Based Marketing? | Abmatic AI",
    description:
      "The definitive glossary entry for ABM: tiers, tactics, and how autonomous AI agents run account-based campaigns end-to-end.",
    url: "https://learn.abmatic.ai/glossary/account-based-marketing/",
    type: "article",
  },
};

export default function AbmStub() {
  return (
    <>
      <h1>What Is Account-Based Marketing (ABM)?</h1>
      <p>
        <strong>
          Account-based marketing is a B2B go-to-market strategy that treats individual
          target accounts as markets of one, coordinating marketing and sales to engage
          a defined list of companies instead of a broad audience of leads.
        </strong>
      </p>
      <p>
        The full glossary entry, including one-to-one vs one-to-few vs one-to-many ABM,
        canonical tactics, how ABM differs from demand generation, measurement, and
        how modern agentic platforms run ABM end-to-end, is publishing this week.
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
          See how Abmatic AI runs ABM — 30 minute demo
        </a>
      </p>
      <hr />
      <p>
        <small>
          Related: <a href="/alternatives-to-6sense/">Best 6sense Alternatives for 2026</a>{" "}
          · <a href="/glossary/agentic-marketing/">What Is Agentic Marketing?</a>
        </small>
      </p>
    </>
  );
}
