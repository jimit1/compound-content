# DEPLOY.md — go-live checklist

**Two things Jimit does once; everything else is automatic from now on.**

## Step 1 — Connect Vercel (2 minutes)

1. Open https://vercel.com/new
2. Click **Import Git Repository** → find `jimit1/compound-content` → Import.
3. Leave framework = Next.js, root = `/`, build command = `npm run build`. Click **Deploy**.
4. First deploy will land at something like `compound-content-abc123.vercel.app` in ~60 seconds.

## Step 2 — Custom domain (90 seconds)

1. In the deployed project → **Settings** → **Domains**.
2. Add `learn.abmatic.ai`.
3. Vercel will show: "Add a CNAME: `cname.vercel-dns.com`".
4. Run (this is the only DNS change needed):

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id Z018915120SS4GXKKGC92 \
  --change-batch '{
    "Comment": "learn.abmatic.ai -> Vercel (Compound content)",
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "learn.abmatic.ai",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [{"Value": "cname.vercel-dns.com"}]
      }
    }]
  }'
```

5. Wait 1–5 minutes for Vercel's SSL provisioning.
6. Open `https://learn.abmatic.ai/alternatives-to-6sense` — should render.

## From then on

Any push to `main` in `jimit1/compound-content` auto-deploys. That's the pipeline.

## What we ship first

After domain lives:

1. `GET /alternatives-to-6sense` — primary attack page
2. `GET /glossary/agentic-marketing` — category creation anchor
3. Submit both to Google Search Console URL Inspection
4. Add both URLs to `abmatic.ai/sitemap.xml` (one manual edit in HubSpot, or via Cloudflare Worker)
5. Add internal links from top blog posts to these URLs (Technical SEO ticket)

## Monitoring

- Vercel analytics shows traffic
- Abmatic deanonymization pixel (`clients.abmatic.ai/AkX9vu5KLybU.js`) is live on every page — visitors tracked into Abmatic's main attribution
- Google Search Console shows impressions/clicks (once verified)
