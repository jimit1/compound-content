# compound-content

Live published content for Compound (Abmatic's autonomous growth agency).

- **Deploy target:** https://learn.abmatic.ai
- **Host:** Vercel (connects this GitHub repo; auto-deploy on push to `main`)
- **Content:** MDX files in `src/app/<slug>/page.mdx` (Next.js 15 app router)
- **Source drafts:** `jimit1/compound:artifacts/drafts/` — MDX drafts from Content Writer agent are promoted here when approved

## Live pages (as of 2026-04-22)

| Path | Target keyword | Variant | Status |
|---|---|---|---|
| `/learn` | (index) | — | Live |
| `/alternatives-to-6sense` | 6sense alternatives | A (professional) | Live |
| `/glossary/agentic-marketing` | agentic marketing / what is agentic AI in marketing | A (professional) | Live |

Variant B drafts (edgy) are parked in `src/app/_variants-b/` with `noindex` until A/B wiring is live.

## Local dev

```bash
npm install
npm run dev
# http://localhost:3000
```

## Deploy to Vercel

1. Sign in at [vercel.com](https://vercel.com) (Jimit's existing account).
2. "Import Git Repository" → pick `jimit1/compound-content`.
3. Framework preset: Next.js (auto-detected).
4. Deploy. First deploy lives at `compound-content-<hash>.vercel.app`.
5. Project Settings → Domains → add `learn.abmatic.ai`.
6. Vercel gives you a CNAME target (`cname.vercel-dns.com`). Add the CNAME in Route53 (see `jimit1/compound:docs/DNS_PLAN.md`).

## What every page includes (non-negotiable)

Every page ships with:

- Abmatic deanonymization pixel (`<script async src="https://clients.abmatic.ai/AkX9vu5KLybU.js"></script>`) in `<head>` via `src/app/layout.tsx`.
- Canonical tag, Open Graph, Twitter Card, JSON-LD schema (Article + FAQPage + ItemList/BreadcrumbList as applicable).
- Demo CTAs pointing at `https://abmatic.ai/demo`.

See `jimit1/compound:docs/PAGE_REQUIREMENTS.md` for the full quality bar.

## How new pages land here

1. Content Writer agent in `jimit1/compound` produces a draft in `artifacts/drafts/*.mdx`.
2. Jimit reviews + approves the draft.
3. Draft is moved here into `src/app/<slug>/page.mdx`, fronting custom component imports.
4. Commit → push to `main` → Vercel auto-deploys.
5. Submit to Google Search Console URL Inspection within 24h.
6. Add to `public/sitemap.xml` (auto-generated at build).
