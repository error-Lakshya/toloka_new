# i18n (Arabic + English) + SEO

- Arabic routes under `/ar/...` and English routes under `/en/...`.
- Language switcher in header toggles between locales while keeping the same path when possible.
- Dictionaries in `i18n/ar.ts` and `i18n/en.ts`.
- Per-locale metadata includes `alternates.languages` (hreflang) and canonical per locale.
- JSON-LD added to Home (WebSite/SearchAction) and Tool pages (SoftwareApplication) with locale-specific URLs.
- Sitemaps: `sitemap-index.xml` referencing `sitemap-ar.xml` and `sitemap-en.xml`; robots.txt points to the index.
- Replace `https://example.com` with the real domain after deployment.
