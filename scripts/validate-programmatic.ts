#!/usr/bin/env ts-node
/**
 * validate-programmatic.ts
 *
 * Build-time quality gate for programmatic SEO pages.
 *
 * Run AFTER `next build && next export`. Scans `out/compare/*` (the static
 * export output), and fails the build if any page violates the quality bar
 * documented in docs/PROGRAMMATIC_SEO_PLAN.md §3.
 *
 * Checks:
 *   1. Each rendered page has >=1,500 words of body prose.
 *   2. No page has >70% trigram (shingled) overlap with any sibling.
 *   3. Each page has Article + FAQPage + BreadcrumbList JSON-LD blocks.
 *   4. No em dash ("—") in body prose.
 *   5. All CTA links absolute (https://abmatic.ai/...).
 *
 * Usage:
 *   npx ts-node scripts/validate-programmatic.ts
 *   (or) node --loader ts-node/esm scripts/validate-programmatic.ts
 *
 * Exit 0 = pass. Exit 1 = fail with printed violation list.
 */

import { readdirSync, readFileSync, existsSync, statSync } from "fs";
import { join } from "path";

const COMPARE_DIR = join(process.cwd(), "out", "compare");
const WORD_FLOOR = 1500;
const OVERLAP_CEILING = 0.7;
const REQUIRED_SCHEMAS = ["Article", "FAQPage", "BreadcrumbList"];

type PageRecord = {
  slug: string;
  htmlPath: string;
  bodyText: string;
  wordCount: number;
  shingles: Set<string>;
  schemas: string[];
  violations: string[];
};

function stripHtml(html: string): string {
  // Remove <script>, <style>, and all <...> tags, then collapse whitespace.
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(text: string): number {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function trigramShingles(text: string): Set<string> {
  const tokens = text.toLowerCase().split(/\s+/).filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i < tokens.length - 2; i++) {
    out.add(tokens[i] + " " + tokens[i + 1] + " " + tokens[i + 2]);
  }
  return out;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  const union = a.size + b.size - inter;
  return inter / union;
}

function extractSchemaTypes(html: string): string[] {
  const found: string[] = [];
  const scriptRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      const json = JSON.parse(match[1]);
      if (json["@type"]) found.push(json["@type"]);
    } catch {
      // Ignore malformed blocks; they will fail schema validation separately.
    }
  }
  return found;
}

function findIndexHtmlFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const entries = readdirSync(dir);
  const out: string[] = [];
  for (const entry of entries) {
    const p = join(dir, entry);
    const stat = statSync(p);
    if (stat.isDirectory()) {
      const idx = join(p, "index.html");
      if (existsSync(idx)) out.push(idx);
    }
  }
  return out;
}

function main(): void {
  if (!existsSync(COMPARE_DIR)) {
    console.error(
      `[validate-programmatic] FAIL: ${COMPARE_DIR} does not exist. ` +
        `Run \`next build\` first so the static export lands in out/.`
    );
    process.exit(1);
  }

  const htmlFiles = findIndexHtmlFiles(COMPARE_DIR);
  if (htmlFiles.length === 0) {
    console.error(
      "[validate-programmatic] FAIL: no compare/<slug>/index.html pages found in out/."
    );
    process.exit(1);
  }

  const pages: PageRecord[] = htmlFiles.map((htmlPath) => {
    const html = readFileSync(htmlPath, "utf8");
    const bodyText = stripHtml(html);
    const wc = wordCount(bodyText);
    const shingles = trigramShingles(bodyText);
    const schemas = extractSchemaTypes(html);
    const slug = htmlPath
      .replace(COMPARE_DIR, "")
      .replace(/\/index\.html$/, "")
      .replace(/^\//, "");
    return {
      slug,
      htmlPath,
      bodyText,
      wordCount: wc,
      shingles,
      schemas,
      violations: [],
    };
  });

  // -- Per-page checks ------------------------------------------------
  for (const p of pages) {
    if (p.wordCount < WORD_FLOOR) {
      p.violations.push(
        `word count ${p.wordCount} < ${WORD_FLOOR} floor`
      );
    }

    const missingSchemas = REQUIRED_SCHEMAS.filter(
      (t) => !p.schemas.includes(t)
    );
    if (missingSchemas.length > 0) {
      p.violations.push(
        `missing required JSON-LD schemas: ${missingSchemas.join(", ")}`
      );
    }

    // Em-dash ban in body prose.
    if (p.bodyText.includes("—")) {
      p.violations.push("body contains em dash (U+2014) — banned per style rule");
    }

    // CTA absolute-URL check: look for any relative href pointing at /demo
    // that should have been absolute to abmatic.ai.
    const relDemoMatches = readFileSync(p.htmlPath, "utf8").match(
      /href="\/demo[^"]*"/g
    );
    if (relDemoMatches && relDemoMatches.length > 0) {
      p.violations.push(
        `found ${relDemoMatches.length} relative /demo link(s); all demo CTAs must be absolute https://abmatic.ai/demo`
      );
    }
  }

  // -- Pairwise duplicate-overlap check -------------------------------
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const overlap = jaccard(pages[i].shingles, pages[j].shingles);
      if (overlap > OVERLAP_CEILING) {
        const msg = `duplicate-overlap ${(overlap * 100).toFixed(1)}% with sibling /${pages[j].slug}/ (ceiling ${OVERLAP_CEILING * 100}%)`;
        pages[i].violations.push(msg);
        pages[j].violations.push(
          `duplicate-overlap ${(overlap * 100).toFixed(1)}% with sibling /${pages[i].slug}/ (ceiling ${OVERLAP_CEILING * 100}%)`
        );
      }
    }
  }

  // -- Report ---------------------------------------------------------
  const failing = pages.filter((p) => p.violations.length > 0);
  console.log(
    `[validate-programmatic] scanned ${pages.length} /compare/ pages; ${failing.length} failing`
  );
  for (const p of pages) {
    const status = p.violations.length === 0 ? "OK" : "FAIL";
    console.log(
      `  [${status}] /compare/${p.slug}/  words=${p.wordCount}  schemas=${p.schemas.join("+") || "none"}`
    );
    for (const v of p.violations) {
      console.log(`        - ${v}`);
    }
  }

  if (failing.length > 0) {
    console.error(
      `[validate-programmatic] FAIL: ${failing.length} page(s) violated the quality bar. See PROGRAMMATIC_SEO_PLAN.md §3.`
    );
    process.exit(1);
  }
  console.log("[validate-programmatic] PASS: all pages cleared the quality bar.");
}

main();
