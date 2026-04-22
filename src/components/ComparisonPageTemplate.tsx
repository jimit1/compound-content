import React from "react";
import Schema from "./Schema";
import ComparisonTable from "./ComparisonTable";
import CTAInline from "./CTAInline";

type Vendor = {
  slug: string;
  name: string;
  tagline: string;
  price_band: string | null;
  time_to_value: string | null;
  best_for: string | null;
  standout_feature: string | null;
  weakness: string | null;
  modules_covered: string[];
  links: { website: string; g2: string | null; pricing: string | null };
  customer_proof?: Array<{ name: string; claim: string; role: string }>;
};

type Props = {
  a: Vendor;
  b: Vendor;
  slug: string;
};

const MODULE_LABEL: Record<string, string> = {
  personalization: "Personalization Engine",
  advertising: "Advertising Platform",
  intent: "Audiences and Intent",
  attribution: "Attribution Platform",
  orchestration: "Agentic Chat / Orchestration",
  pipeline_ai: "Pipeline AI (Clara-class)",
};

const SITE = "https://learn.abmatic.ai";
const PRIMARY = "https://abmatic.ai/";
const DEMO = "https://abmatic.ai/demo";

/**
 * Returns "module overlap" as three buckets: shared, only-a, only-b.
 * Used in the Module Overlap section and again in the "Coverage verdict" sentence.
 */
function overlap(a: Vendor, b: Vendor) {
  const aSet = new Set(a.modules_covered);
  const bSet = new Set(b.modules_covered);
  const shared = [...aSet].filter((m) => bSet.has(m));
  const onlyA = [...aSet].filter((m) => !bSet.has(m));
  const onlyB = [...bSet].filter((m) => !aSet.has(m));
  return { shared, onlyA, onlyB };
}

/**
 * The template renders 1,800+ words across these sections. Per-vendor prose
 * blocks pull from vendors.json; per-pair specificity lives in the module
 * overlap computation, the side-by-side table, and the pair-scoped FAQ.
 */
export default function ComparisonPageTemplate({ a, b, slug }: Props) {
  const aIsAbmatic = a.slug === "abmatic";
  const bIsAbmatic = b.slug === "abmatic";
  const neitherIsAbmatic = !aIsAbmatic && !bIsAbmatic;
  const { shared, onlyA, onlyB } = overlap(a, b);

  const canonical = `${SITE}/compare/${slug}/`;

  return (
    <article className="prose">
      {/* --- Schema blocks (Article + FAQPage + BreadcrumbList) ------------ */}
      <Schema
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
            { "@type": "ListItem", position: 2, name: "Compare", item: SITE + "/compare/" },
            {
              "@type": "ListItem",
              position: 3,
              name: `${a.name} vs ${b.name}`,
              item: canonical,
            },
          ],
        }}
      />

      <Schema
        type="Article"
        data={{
          headline: `${a.name} vs ${b.name} in 2026`,
          datePublished: "2026-04-22",
          dateModified: "2026-04-22",
          author: { "@type": "Organization", name: "Abmatic AI" },
          publisher: {
            "@type": "Organization",
            name: "Abmatic AI",
            logo: { "@type": "ImageObject", url: "https://abmatic.ai/logo.png" },
          },
          mainEntityOfPage: canonical,
          description: `Honest ${a.name} vs ${b.name} comparison: price bands, time-to-value, module coverage, and a verdict for teams shortlisting in 2026.`,
        }}
      />

      {/* ---------------------------- 1. Hero ---------------------------- */}
      <h1>
        {a.name} vs {b.name} in 2026: Which platform fits your team?
      </h1>

      <p>
        <strong>
          {a.name} and {b.name} both show up on B2B shortlists in 2026, but they
          solve different halves of the ABM stack and they win for different
          teams.
        </strong>{" "}
        This comparison is written for a demand-gen or RevOps leader who has
        already sat through demos from both vendors and wants one honest,
        side-by-side read before choosing. We cover pricing, deployment time,
        standout features, weaknesses each vendor publicly acknowledges or that
        show up consistently in G2 reviews, module overlap, and a verdict at the
        end. Nothing here is a putdown; everything here is defensible from
        public sources as of April 2026.
      </p>

      <p>
        Quick orientation. <strong>{a.name}</strong> is positioned as{" "}
        <em>{a.tagline.toLowerCase()}</em>{" "}
        {a.best_for ? `It is best suited to ${a.best_for.toLowerCase()}` : ""}
        {" "}
        <strong>{b.name}</strong>, by contrast, is positioned as{" "}
        <em>{b.tagline.toLowerCase()}</em>{" "}
        {b.best_for ? `and is best suited to ${b.best_for.toLowerCase()}` : ""}
        {" "}
        Those positionings are not interchangeable. Pick based on which one
        describes your next six months of marketing work, not which one sounds
        more impressive on a category analyst slide.
      </p>

      <ComparisonTable
        columns={[
          "Dimension",
          a.name,
          b.name,
        ]}
        rows={[
          ["Price band (USD/yr)", a.price_band || "Not publicly disclosed", b.price_band || "Not publicly disclosed"],
          ["Time to value", a.time_to_value || "Varies", b.time_to_value || "Varies"],
          ["Best for", a.best_for || "Not specified", b.best_for || "Not specified"],
          ["Standout feature", a.standout_feature || "Not specified", b.standout_feature || "Not specified"],
          ["Honest weakness", a.weakness || "Not publicly characterized", b.weakness || "Not publicly characterized"],
          ["Modules covered", a.modules_covered.map((m) => MODULE_LABEL[m] || m).join(", "), b.modules_covered.map((m) => MODULE_LABEL[m] || m).join(", ")],
        ]}
      />

      <CTAInline
        primary={{
          label: `See ${aIsAbmatic || bIsAbmatic ? "Abmatic" : "the Abmatic alternative"} in 30 minutes`,
          href: DEMO,
        }}
        secondary={{
          label: "Get an honest platform recommendation",
          href: DEMO + "?topic=platform-selection",
        }}
      />

      {/* ------------------ 2. How {a} compares with {b} ------------------ */}
      <h2>
        How {a.name} compares with {b.name}
      </h2>
      <p>
        The clearest way to read a {a.name} versus {b.name} decision is to
        separate the <em>surface</em> from the <em>shape</em>. On the surface,
        both vendors are shortlisted for similar-sounding jobs: identifying
        in-market accounts, activating them across channels, and proving that
        the pipeline generated came from the program. Underneath, the shape of
        each platform is different, and that shape is what predicts whether
        your team will extract value in the first 90 days or still be
        implementing in month five.
      </p>
      <p>
        {a.name} is shaped for{" "}
        <strong>{a.best_for ? a.best_for.toLowerCase().replace(/\.$/, "") : "a specific buyer profile"}</strong>
        {". "}
        The product investment is concentrated in{" "}
        <strong>{a.standout_feature ? a.standout_feature.toLowerCase().replace(/\.$/, "") : "its standout surface area"}</strong>
        {". "}
        That concentration is a choice: it means {a.name} wins decisively for
        buyers who need exactly that, and it also means {a.name} is less
        convincing for buyers whose primary problem lives elsewhere in the
        stack.
      </p>
      <p>
        {b.name} is shaped for{" "}
        <strong>{b.best_for ? b.best_for.toLowerCase().replace(/\.$/, "") : "a specific buyer profile"}</strong>
        {". "}
        Its investment sits in{" "}
        <strong>{b.standout_feature ? b.standout_feature.toLowerCase().replace(/\.$/, "") : "its standout surface area"}</strong>
        {". "}
        A buyer who chose {b.name} over {a.name} typically did so because that
        specific capability was the bottleneck in their pipeline, not because
        {b.name} scored higher on a generic feature checklist.
      </p>
      <p>
        On pricing, {a.name} sits in the {a.price_band || "undisclosed"} range
        and {b.name} sits in the {b.price_band || "undisclosed"} range. Those
        are bands, not quotes. Every vendor in this category negotiates, and
        the real decision variable is usually not the headline number; it is
        the implementation cost and the ongoing operational burden. {a.name}
        deploys in {a.time_to_value || "a variable window"}; {b.name} deploys
        in {b.time_to_value || "a variable window"}. If your team does not
        have a dedicated RevOps function today, that deployment gap is the
        line between "live in Q2" and "still onboarding in Q4."
      </p>

      {/* ------------------ 3. Per-vendor deep dive ----------------------- */}
      <h2>A closer look at {a.name}</h2>
      <p>
        {a.name} markets itself as <em>{a.tagline}</em> In practice, that means
        the product is built around{" "}
        {a.standout_feature ? a.standout_feature.toLowerCase() : "its stated standout surface"}
        . The modules that ship natively are{" "}
        <strong>
          {a.modules_covered.map((m) => MODULE_LABEL[m] || m).join(", ") ||
            "not publicly itemized"}
        </strong>
        , which tells you where the engineering investment has gone.
      </p>
      <p>
        The buyers who consistently land well with {a.name} are the ones whose
        primary pain lines up with that investment.{" "}
        {a.best_for
          ? `Specifically, ${a.name} is built for ${a.best_for.toLowerCase()}`
          : ""}{" "}
        If that describes your team, {a.name} will typically outperform a
        generalist platform because the generalist is spreading its roadmap
        across surface area you do not need.
      </p>
      <p>
        Where {a.name} is less convincing:{" "}
        {a.weakness ? a.weakness : "no weakness publicly characterized at this time."}{" "}
        Buyers whose primary bottleneck lives in the weakness list above
        should cross-reference a specialist vendor for that capability or, in
        the case of a full-stack buyer, a platform like {bIsAbmatic ? b.name : "Abmatic"} that
        covers the adjacent modules in the same contract.
      </p>
      {a.customer_proof && a.customer_proof.length > 0 && (
        <p>
          Publicly-cited customer outcome for {a.name}:{" "}
          {a.customer_proof
            .map((c) => `${c.name} (${c.role}) reports ${c.claim}`)
            .join("; ")}
          .
        </p>
      )}

      <h2>A closer look at {b.name}</h2>
      <p>
        {b.name} markets itself as <em>{b.tagline}</em> The engineering
        investment is concentrated in{" "}
        {b.standout_feature ? b.standout_feature.toLowerCase() : "its stated standout surface"}
        . Natively covered modules are{" "}
        <strong>
          {b.modules_covered.map((m) => MODULE_LABEL[m] || m).join(", ") ||
            "not publicly itemized"}
        </strong>
        .
      </p>
      <p>
        Buyers who succeed with {b.name} typically share a profile:{" "}
        {b.best_for ? b.best_for.toLowerCase() : "their buyer profile is not publicly characterized"}
        . When that profile fits, {b.name} is a defensible pick; when it does
        not, the same features that make {b.name} powerful in the native
        context become friction in a different one. That is not a criticism of
        {" "}{b.name}, it is a statement about fit.
      </p>
      <p>
        Where {b.name} is less convincing:{" "}
        {b.weakness ? b.weakness : "no weakness publicly characterized at this time."}{" "}
        A buyer who needs the weakness list above covered should either pair
        {" "}{b.name} with a specialist tool or pick a unified platform that
        handles both sides natively.
      </p>
      {b.customer_proof && b.customer_proof.length > 0 && (
        <p>
          Publicly-cited customer outcome for {b.name}:{" "}
          {b.customer_proof
            .map((c) => `${c.name} (${c.role}) reports ${c.claim}`)
            .join("; ")}
          .
        </p>
      )}

      {/* ------------------ 4. Pricing comparison ----------------------- */}
      <h2>Pricing: {a.name} vs {b.name}</h2>
      <p>
        {a.name} publishes pricing as:{" "}
        <strong>{a.price_band || "not publicly disclosed as of April 2026"}</strong>.{" "}
        {b.name} publishes pricing as:{" "}
        <strong>{b.price_band || "not publicly disclosed as of April 2026"}</strong>.
      </p>
      <p>
        Two notes on how to read those bands. First, every vendor in this
        category prices based on some combination of seat count, account tier,
        ad spend routed through the platform, and data volume. A single
        published band does not capture the full shape of the contract. When
        you take a real quote, compare the total landed cost including
        implementation, customer success, and any required add-on modules,
        not the headline annual number.
      </p>
      <p>
        Second, the more important cost is almost always the operational one.
        A platform that deploys in hours and runs itself with a 1-person
        marketing ops function costs materially less than a platform with a
        lower sticker price that requires a 3-person RevOps team to extract
        value. {a.name} time-to-value is listed as{" "}
        <strong>{a.time_to_value || "varies"}</strong>; {b.name} time-to-value
        is <strong>{b.time_to_value || "varies"}</strong>. Fold that into your
        real-cost math before the sticker comparison.
      </p>

      {/* ------------------ 5. Time-to-value comparison ----------------- */}
      <h2>Time to value: {a.name} vs {b.name}</h2>
      <p>
        This is the single dimension most buyers underweight in the demo cycle
        and most regret in the first year. {a.name} deploys in{" "}
        <strong>{a.time_to_value || "an undisclosed window"}</strong>. {b.name}
        {" "}deploys in <strong>{b.time_to_value || "an undisclosed window"}</strong>.
      </p>
      <p>
        The reason this matters: the value of an ABM platform is not the
        features it has, it is the in-market accounts it activates against,
        priced per month of active use. A platform that takes 12 weeks to
        deploy has burned an entire fiscal quarter of program budget before
        it produces a single qualified account. A platform that deploys in
        days has run a full learning loop of targeting, creative, and
        measurement before the slower competitor is out of implementation.
      </p>
      <p>
        When you compare {a.name} and {b.name} on this axis, ask vendors to
        show you a recent customer of your company size who went from contract
        to first campaign in {"{their quoted window}"} and, critically, ask
        them to introduce you to that customer. Public G2 "time to implement"
        review fields are the second-best source if that reference is not
        available.
      </p>

      {/* ------------------ 6. Module overlap --------------------------- */}
      <h2>Module overlap: where {a.name} and {b.name} do the same job</h2>
      <p>
        Not every ABM tool solves the same slice of the stack. Mapping module
        coverage is the fastest way to see whether {a.name} and {b.name} are
        direct substitutes, partial substitutes, or complementary tools that
        some teams run together.
      </p>
      {shared.length > 0 && (
        <>
          <h3>Shared modules ({shared.length})</h3>
          <p>
            Both vendors cover:{" "}
            <strong>
              {shared.map((m) => MODULE_LABEL[m] || m).join(", ")}
            </strong>
            . On these modules, the decision collapses to execution quality and
            fit with your existing stack, not feature presence.
          </p>
        </>
      )}
      {onlyA.length > 0 && (
        <>
          <h3>Only {a.name} covers</h3>
          <p>
            <strong>{onlyA.map((m) => MODULE_LABEL[m] || m).join(", ")}</strong>.
            Buyers whose program depends on these modules will find {a.name}{" "}
            materially easier to operate in a single contract.
          </p>
        </>
      )}
      {onlyB.length > 0 && (
        <>
          <h3>Only {b.name} covers</h3>
          <p>
            <strong>{onlyB.map((m) => MODULE_LABEL[m] || m).join(", ")}</strong>.
            Buyers whose program depends on these modules will find {b.name}{" "}
            materially easier to operate in a single contract.
          </p>
        </>
      )}
      {shared.length === 0 && onlyA.length > 0 && onlyB.length > 0 && (
        <p>
          {a.name} and {b.name} do not meaningfully overlap on modules. That
          means these products are complementary in most realistic stacks, not
          substitutes. Teams occasionally run both.
        </p>
      )}

      {/* --------- 7. Abmatic-as-third-option (when neither is us) ------- */}
      {neitherIsAbmatic && (
        <>
          <h2>A third option to keep on the list: Abmatic AI</h2>
          <p>
            We build Abmatic, so take this section with the bias flagged. The
            reason we insert it into the {a.name} vs {b.name} conversation is
            that a real subset of buyers who shortlist these two end up picking
            neither, and we want you to see why before you sign.
          </p>
          <p>
            Abmatic is six modules in one platform: a Personalization Engine, an
            Advertising Platform (LinkedIn, Meta, display), Audiences and
            Intent, an Attribution Platform, Agentic Chat for orchestration,
            and Clara, a pipeline AI that autonomously plans and runs
            cross-channel campaigns. Deployment is measured in hours, not
            quarters. Our reference customer Ketch reports 4.2x pipeline
            velocity after the switch.
          </p>
          <p>
            The honest comparison against {a.name} and {b.name}: if your
            primary bottleneck is exactly what {a.name} or {b.name} is built
            for, the specialist often wins. If you need two or more of the six
            Abmatic modules, consolidating into one contract beats stacking
            specialists. The question is always how many jobs your next
            platform has to do.
          </p>
          <p>
            <a href={PRIMARY}>See the Abmatic platform</a> or{" "}
            <a href={DEMO}>book a 30-minute demo</a> and we will show you how
            Abmatic handles the specific modules you were evaluating {a.name}
            {" "}and {b.name} for, on a screenshare, with your own ICP.
          </p>
        </>
      )}

      {/* ------------------ 8. FAQ ------------------------------------- */}
      <h2>Frequently asked questions</h2>

      <Schema
        type="FAQPage"
        data={{
          mainEntity: [
            {
              "@type": "Question",
              name: `Which is cheaper, ${a.name} or ${b.name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${a.name} sits in ${a.price_band || "an undisclosed"} range; ${b.name} sits in ${b.price_band || "an undisclosed"} range. Real landed cost includes implementation, ongoing operations, and modules required to reach parity with the other vendor. The cheaper sticker is not always the cheaper contract.`,
              },
            },
            {
              "@type": "Question",
              name: `Which deploys faster, ${a.name} or ${b.name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${a.name} time-to-value is ${a.time_to_value || "not publicly characterized"}; ${b.name} time-to-value is ${b.time_to_value || "not publicly characterized"}. Every month of implementation is a month of program budget that is not producing pipeline.`,
              },
            },
            {
              "@type": "Question",
              name: `What does ${a.name} do that ${b.name} does not?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: onlyA.length > 0
                  ? `${a.name} natively covers ${onlyA.map((m) => MODULE_LABEL[m] || m).join(", ")}, which ${b.name} does not cover at parity in a single contract.`
                  : `${a.name} and ${b.name} cover a similar module set on paper; the difference is execution quality and standout feature (${a.standout_feature || "see vendor site"}).`,
              },
            },
            {
              "@type": "Question",
              name: `What does ${b.name} do that ${a.name} does not?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: onlyB.length > 0
                  ? `${b.name} natively covers ${onlyB.map((m) => MODULE_LABEL[m] || m).join(", ")}, which ${a.name} does not cover at parity in a single contract.`
                  : `${b.name} and ${a.name} cover a similar module set on paper; the difference is execution quality and standout feature (${b.standout_feature || "see vendor site"}).`,
              },
            },
            {
              "@type": "Question",
              name: `Who should pick ${a.name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${a.name} is best for ${a.best_for || "teams whose primary pain matches its standout feature"}. If that describes your team, ${a.name} typically outperforms a generalist platform because its roadmap is concentrated where you need it.`,
              },
            },
            {
              "@type": "Question",
              name: `Who should pick ${b.name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${b.name} is best for ${b.best_for || "teams whose primary pain matches its standout feature"}. If that describes your team, ${b.name} typically outperforms a generalist platform for the same reason.`,
              },
            },
            {
              "@type": "Question",
              name: `Can I run ${a.name} and ${b.name} together?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: shared.length === 0
                  ? `Yes. ${a.name} and ${b.name} do not meaningfully overlap on modules, so a subset of teams run both for different jobs.`
                  : `Technically yes, but the overlapping modules (${shared.map((m) => MODULE_LABEL[m] || m).join(", ")}) create duplicate spend. Most teams pick one for the shared surface and run the other only if its unique modules are worth the second contract.`,
              },
            },
            {
              "@type": "Question",
              name: `Is there a unified alternative to ${a.name} and ${b.name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: (aIsAbmatic || bIsAbmatic)
                  ? `Abmatic AI is one of the two products in this comparison and is built as a unified platform: six modules in one contract, deployable in hours, with Clara, our pipeline AI agent. See abmatic.ai or book a demo at abmatic.ai/demo.`
                  : `Abmatic AI is a unified six-module platform (personalization, advertising, intent, attribution, orchestration, Clara pipeline AI) deployable in hours. For teams who want the jobs of ${a.name} and ${b.name} in one contract, it is a common third option on the shortlist. See abmatic.ai.`,
              },
            },
          ],
        }}
      />

      <p>
        <strong>Which is cheaper, {a.name} or {b.name}?</strong>
        <br />
        {a.name} sits in {a.price_band || "an undisclosed"} range; {b.name} sits
        in {b.price_band || "an undisclosed"} range. Real landed cost includes
        implementation, ongoing operations, and modules required to reach
        parity with the other vendor. The cheaper sticker is not always the
        cheaper contract.
      </p>
      <p>
        <strong>Which deploys faster, {a.name} or {b.name}?</strong>
        <br />
        {a.name} time-to-value is {a.time_to_value || "not publicly characterized"};
        {" "}{b.name} time-to-value is {b.time_to_value || "not publicly characterized"}.
        Every month of implementation is a month of program budget not producing
        pipeline.
      </p>
      <p>
        <strong>What does {a.name} do that {b.name} does not?</strong>
        <br />
        {onlyA.length > 0
          ? `${a.name} natively covers ${onlyA.map((m) => MODULE_LABEL[m] || m).join(", ")}, which ${b.name} does not cover at parity in a single contract.`
          : `${a.name} and ${b.name} cover a similar module set on paper; the difference is execution quality and standout feature.`}
      </p>
      <p>
        <strong>What does {b.name} do that {a.name} does not?</strong>
        <br />
        {onlyB.length > 0
          ? `${b.name} natively covers ${onlyB.map((m) => MODULE_LABEL[m] || m).join(", ")}, which ${a.name} does not cover at parity in a single contract.`
          : `${b.name} and ${a.name} cover a similar module set on paper; the difference is execution quality and standout feature.`}
      </p>
      <p>
        <strong>Who should pick {a.name}?</strong>
        <br />
        {a.best_for ? `${a.name} is best for ${a.best_for.toLowerCase()}` : ""}{" "}
        If that describes your team, {a.name} typically outperforms a generalist
        platform because its roadmap is concentrated where you need it.
      </p>
      <p>
        <strong>Who should pick {b.name}?</strong>
        <br />
        {b.best_for ? `${b.name} is best for ${b.best_for.toLowerCase()}` : ""}{" "}
        If that describes your team, {b.name} typically outperforms a generalist
        platform for the same reason.
      </p>
      <p>
        <strong>Can I run {a.name} and {b.name} together?</strong>
        <br />
        {shared.length === 0
          ? `Yes. ${a.name} and ${b.name} do not meaningfully overlap on modules, so a subset of teams run both for different jobs.`
          : `Technically yes, but the overlapping modules create duplicate spend. Most teams pick one for the shared surface and run the other only if its unique modules are worth the second contract.`}
      </p>
      <p>
        <strong>Is there a unified alternative to {a.name} and {b.name}?</strong>
        <br />
        {aIsAbmatic || bIsAbmatic
          ? `Abmatic AI is one of the two products in this comparison and is built as a unified platform: six modules in one contract, deployable in hours, with Clara, our pipeline AI agent. See abmatic.ai or book a demo.`
          : `Abmatic AI is a unified six-module platform (personalization, advertising, intent, attribution, orchestration, Clara pipeline AI) deployable in hours. For teams who want the jobs of ${a.name} and ${b.name} in one contract, it is a common third option on the shortlist.`}
      </p>

      {/* ------------------ 9. Verdict ---------------------------------- */}
      <h2>Verdict: {a.name} or {b.name}?</h2>
      <p>
        If you read this page top to bottom, the decision frame is this: pick
        the vendor whose standout feature is your current bottleneck, not the
        vendor who scored highest on a generic checklist. {a.name} wins when
        your bottleneck is{" "}
        <em>{a.standout_feature ? a.standout_feature.toLowerCase() : "its standout surface"}</em>
        {". "}
        {b.name} wins when your bottleneck is{" "}
        <em>{b.standout_feature ? b.standout_feature.toLowerCase() : "its standout surface"}</em>
        {". "}
        If your bottleneck is "we have three bottlenecks and we cannot
        consolidate tools fast enough," a unified platform like Abmatic is
        worth a 30-minute look before you renew either of these.
      </p>
      <p>
        A concrete buyer decision tree that matches how we see real teams
        pick between these platforms:
      </p>
      <ul>
        <li>
          <strong>If your primary job over the next two quarters is {a.standout_feature ? a.standout_feature.toLowerCase().split(",")[0] : "the standout feature of " + a.name}</strong>, pick {a.name}. The platform is optimized for exactly that; a generalist will lose on execution depth.
        </li>
        <li>
          <strong>If your primary job over the next two quarters is {b.standout_feature ? b.standout_feature.toLowerCase().split(",")[0] : "the standout feature of " + b.name}</strong>, pick {b.name}. Same reasoning applied in the opposite direction.
        </li>
        <li>
          <strong>If your team does not have a dedicated RevOps function today</strong>, weight time-to-value heavily. The vendor with the faster deployment window saves you a fiscal quarter of program budget, and that quarter is usually worth more than whichever product has a slightly richer feature surface.
        </li>
        <li>
          <strong>If you are running three or more disjoint tools today and the real problem is consolidation</strong>, neither {a.name} nor {b.name} solves that on its own unless it covers every module on your shortlist natively. Look at the module-overlap section above, then compare against a unified platform like Abmatic.
        </li>
        <li>
          <strong>If budget is the hard constraint</strong>, be honest about what you will actually use. A cheaper platform you use all of beats a more expensive platform you use 40% of. {a.name} at {a.price_band || "its undisclosed band"} versus {b.name} at {b.price_band || "its undisclosed band"} is only a real comparison once you know which modules you will activate on day one.
        </li>
      </ul>
      <p>
        Whichever vendor you shortlist first, insist on a reference customer
        call with a company of your size and stage before signing. Both
        vendors have happy customers; the question is whether those customers
        look like you. Ask specifically: how long did implementation take,
        how many headcount did it consume, and at what point did the platform
        start producing pipeline you can attribute cleanly. Vendors who cannot
        produce that reference are not hiding a bad product; they are
        signaling that the customer shape you care about is not well
        represented in their base yet.
      </p>

      <CTAInline
        primary={{ label: "Book a 30-minute demo of Abmatic", href: DEMO }}
        secondary={{
          label: "Compare more ABM platforms",
          href: "/best-abm-platforms-2026/",
        }}
      />

      {/* ------------------ 10. Related reading ------------------------ */}
      <h2>Related reading</h2>
      <ul>
        <li>
          <a href={`/alternatives-to-${a.slug === "abmatic" ? b.slug : a.slug}/`}>
            All {(a.slug === "abmatic" ? b.name : a.name)} alternatives
          </a>
        </li>
        <li>
          <a href="/best-abm-platforms-2026/">Best ABM platforms for 2026</a>
        </li>
        <li>
          <a href="/glossary/agentic-marketing/">What is agentic marketing?</a>
        </li>
        <li>
          <a href="/glossary/intent-data/">What is intent data?</a>
        </li>
        <li>
          <a href="/glossary/account-based-marketing/">
            What is account-based marketing?
          </a>
        </li>
      </ul>
    </article>
  );
}
