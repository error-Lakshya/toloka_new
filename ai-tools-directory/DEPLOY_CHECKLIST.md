# Deployment Checklist (English-only site)

1) Pre-deploy
- Choose final domain (see domains_suggestions.md) and register it.
- Update .env.production with:
  - SITE_URL=https://<your-domain>
  - DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>?schema=public
- Replace placeholder example.com in:
  - public/sitemap.xml
  - public/robots.txt
  - app/layout.tsx (openGraph.url, alternates.canonical)
  - app/page.tsx JSON-LD target/urls
  - app/(tools)/[slug]/page.tsx JSON-LD url

2) Vercel project setup
- Create a new Vercel project and import the repository (GitHub/GitLab/Bitbucket) or upload.
- Set Environment Variables in Vercel:
  - SITE_URL
  - DATABASE_URL
- Link your domain in Vercel (Dashboard -> Domains) and follow DNS setup (see DNS_GUIDE.md).

3) Build & deploy
- Verify build scripts in package.json: `next build`, `next start` are standard.
- Trigger a production deployment.
- Ensure Node version >= 18 in Vercel (Default is fine).

4) Post-deploy smoke tests
- Visit /, /categories, /search, /submit-tool, /admin/submissions.
- Submit a sample tool and confirm it appears in /admin/submissions.
- Approve a submission and verify it publishes and shows in /search.
- Test API caching headers on /api/tools (Cache-Control present).

5) SEO & analytics
- Confirm sitemap and robots are accessible at your domain.
- Validate JSON-LD via Rich Results Test.
- (Optional) Add analytics envs and scripts if needed.

6) Performance & scaling
- Seed initial data (e.g., node scripts/import_tools.js /mnt/data/tools_batch1.json).
- Monitor query performance; add Postgres extensions (unaccent/pg_trgm) if available.

7) Troubleshooting
- DNS propagation can take up to 24–48 hours.
- If canonical or JSON-LD still show example.com, rebuild after updating SITE_URL and files.
