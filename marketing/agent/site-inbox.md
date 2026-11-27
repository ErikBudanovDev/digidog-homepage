# Site inbox

Daily triage of emails about digidog.org (Search Console, Analytics, Vercel, Ahrefs, GitHub, domain and hosting).
Written by the Haiku triage task; solved by the "site issues" task. Technical facts only: no personal mail, no email addresses, no quotes longer than one line.

Line format:
`- DATE · SOURCE · LEVEL · thread:<gmail thread id> · what the mail says · URLs or numbers · status`

LEVEL: `act` (site broken, pages not indexed, build failed, limit reached) · `check` (warning, trend, new report) · `info` (monthly summary, tips, marketing).
status: `new` → `passed to solver` → `fixed DATE` / `no action` / `needs Erik`.

## Log

- 2026-11-26 · Search Console · act · thread:unknown · new reason "Blocked due to access forbidden (403)" · /en (crawled Nov 22) · fixed 2026-11-26 (redirects to /, validation started)
- 2026-11-26 · Search Console · act · thread:unknown · "Not found (404)" in sitemap report · 4 URLs (2 old WordPress URLs, 2 from the Nov 22–23 outage) · fixed 2026-11-26 (redirects added, validation started)
- 2026-11-26 · Vercel · check · thread:1a217ff19bdba5ee · Deployment Storage 100% of 10 GB on the free team, older deployments get deleted · — · fixed 2026-11-26 (builds skipped for marketing/outreach-only commits); duplicate project digidog-homepage-ugnv still to be deleted by Erik
- 2026-11-26 · Vercel · info · thread:1a21749bb6c56b38 · Deployment Storage 75% · — · no action (same issue as above)
