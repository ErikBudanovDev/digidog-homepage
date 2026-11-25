# Daily log (marketing agent)

One entry per morning run: date, data seen, task done, links. Read the last entries before picking today's task so it is not repeated.

## 2026-11-24
- Data: Chrome / Search Console not reachable from the cloud run; Ahrefs has no digidog.org project (only Be Original Tours sites). No GSC numbers today.
- Found: **digidog.org is down for visitors.** DNS (Hostinger nameservers, SOA serial 2026112105 → zone changed 2026-11-21) points the apex to Hostinger IPs (77.37.x, 179.61.x, 148.135.x) and www to `www.digidog.org.cdn.hstgr.net`. Hostinger serves a Let's Encrypt cert that expired 2026-04-18 → browsers show a certificate error. Vercel `get_domain_config`: misconfigured, recommends A @ → 76.76.21.21, CNAME www → cname.vercel-dns.com. Vercel deployment itself is fine (digidog-homepage.vercel.app = 200).
- Task (c, technical): diagnosed the outage, sent Erik the fix. No content changes today — they could not be verified live and Google cannot crawl the site until DNS is fixed.
- Next run: re-check `curl https://digidog.org/` (200 + valid cert). If fixed: request indexing for home, /services/ai-integration, /de/dienstleistungen/ki-integration; then check GSC for crawl/coverage errors since 2026-11-21.

## 2026-11-25
- Data: digidog.org is back up. DNS now A @ → 76.76.21.21 (Vercel), www → cname.vercel-dns.com; `curl https://digidog.org/` = 200 from Vercel. Search Console still not reachable from the cloud run (no Chrome), Ahrefs has no digidog.org project → no GSC numbers again.
- Task (b, new EN+DE post from real work): "Google Ads MCP Server: Connect Claude to Google Ads and GA4 (Real Case)" — Be Original Tours case (51-tool MCP server, MCC view, €18,099 duplicate ad spend, 6,850 reviews / 12 cities, 76 bookings / 148 guests screenshot). Official Google Ads + GA4 MCP servers compared, FAQ schema, hreflang pair, llms.txt, links from the "What is MCP" posts (EN+DE). New cover from our own screenshot.
  - EN: https://digidog.org/blog/google-ads-mcp-server-claude
  - DE: https://digidog.org/de/blog/google-ads-mcp-server-claude-verbinden
- Mobile (iPhone 13): no page overflow; DE table header shortened to fit.
- Next run: request indexing for both URLs + home if GSC reachable; check coverage errors from the 2026-11-21…24 outage. Rotation next: (d) LinkedIn drafts — the Google Ads post is a good first LinkedIn post.
