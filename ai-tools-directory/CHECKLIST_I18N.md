# Bilingual Build Verification Checklist

1) Routing
- /ar and /en home pages load with correct direction (RTL vs LTR).
- Language switcher preserves the path when switching locales.

2) Categories & Filters
- /ar/categories and /en/categories show localized names; links pass canonical slug to /search.
- /ar/search and /en/search labels are localized; API params (category, pricing, has_api, language, sort) are identical.

3) SEO
- robots.txt -> sitemap-index.xml -> sitemap-ar.xml, sitemap-en.xml are reachable.
- Layout metadata contains alternates.languages for hreflang and correct canonical per locale.
- JSON-LD on home (WebSite/SearchAction) and tool pages (SoftwareApplication) uses locale-specific URLs.

4) Admin & Submit
- /ar/admin/submissions and /en/admin/submissions list items and actions work.
- /ar/submit-tool and /en/submit-tool validate and POST to /api/submissions.

5) Deployment
- Replace example.com with the real domain.
- Verify caching headers on API and Rich Results for both locales.
