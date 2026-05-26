# DigiDog — Product Marketing Context

Read this first when running marketing skills. Captures everything a skill would
otherwise ask the user. Skills should only ask follow-up questions about facts
not covered here.

Last updated: 2026-05-26 (Erik Budanov, founder)

---

## What we are

**DigiDog** is an AI Operations Systems company. We replace bloated SaaS stacks
with custom AI-powered tools running on infrastructure the client owns.

We are **not** a web design agency, marketing agency, AI consulting firm, or
chatbot builder — and the site copy must never drift back into that language.
The full "Identity B purge" in April 2026 removed agency framing site-wide; if
any new copy reads as "we offer X services," it is off-positioning.

We are a practitioner shop, not a service vendor. One founder + a small team
ships end-to-end systems.

---

## Positioning statement

> Mid-size service businesses are spending $1,200–$10,000/month on stitched-together
> SaaS — CRMs, automation tools, dashboards, marketing platforms. We rebuild that
> entire stack as one AI Operations System running on infrastructure you own.
> Result: $1,200/month → $210/month, and you own the IP.

Hero metric the site keeps coming back to: **$1,200 → $210**. Real numbers from
DigiDog's own internal stack (we are our own first case study).

---

## Founder

**Erik Budanov** — Founder & AI Systems Architect.
Based in Yerevan, Armenia. Previously built and ran SaaS-stack-heavy systems
for clients across Berlin, Vienna, and the Caucasus. Pivoted DigiDog in 2025
when Claude + MCP made the SaaS-replacement thesis operationally viable.

Erik is the only public face of the brand. Author byline on every blog post.
Speaks English (native-fluent) and basic German for Mittelstand-facing content.

Team: Vlad (developer), Suren (content/dev), Samvel.

---

## Ideal Customer Profile

| Dimension          | Target                                                              |
|--------------------|---------------------------------------------------------------------|
| Company size       | 5–50 employees                                                      |
| SaaS spend         | $1,000–$10,000/month, often growing                                 |
| Industry           | Service businesses: tour operators, training providers, agencies,   |
|                    | clinics, professional services, specialty trades                    |
| Geo                | DACH (Germany/Austria/Switzerland) primary, EU + US secondary       |
| Pain               | Stack sprawl, vendor lock-in, rising SaaS bills, integration debt   |
| Buying trigger     | New annual SaaS renewal, M&A, founder/operator change, growth wall  |
| Disqualifiers      | Pure SaaS shops (we replace them), <5 people (too small to need it),|
|                    | enterprises with internal teams (no consulting angle)                |

Active clients to recall in examples: Original Berlin Tours (OBT),
Activated Insights/CareAcademy, Greenventory, MedPers/Berit Schulen,
Aurum Atelier, Protoform.mx.

---

## What we sell — three pillars

1. **Replace SaaS** — audit the stack, identify what AI + MCP can absorb,
   migrate to owned infrastructure. Outcome: hard $/month savings + IP ownership.
2. **Automate Operations** — workflows, internal tools, custom dashboards,
   inbox/CRM automation. Outcome: 25–40 hours/week of repetitive work removed.
3. **Own Your Systems** — VPS hosting, MCP gateways, custom apps on Next.js +
   Postgres. Outcome: no vendor lock-in, no surprise price hikes.

Lead CTA across the site: **"Get Your AI Operations Audit."**
Calendly: https://calendly.com/erik-budanov/beratungsgespraech

---

## Voice & tone

- **Practitioner, not consultant.** Show the actual cost numbers, the actual
  stack. We are technical and we don't apologize for it.
- **Skeptical of hype.** AI-disruption framing is fine, but never breathless.
  No "revolutionize," no "game-changer," no emoji bullet lists.
- **Direct.** Short sentences. Real numbers. Specific tools.
- **First-person plural ("we") for the company, first-person singular ("I") for
  Erik on the blog.** Don't mix.
- **No agency words.** Never "we offer," "our services," "engagement,"
  "deliverables," "synergies," "leverage" (as a verb), "solutions" (as a noun).
- **DE voice:** Sie-Form for business, klare Sprache, no Buzzwords like
  "Lösung", "Synergien", "ganzheitlich". Specific Mittelstand vocabulary
  (Geschäftsführer, Mitarbeiter, Standort) over abstractions.

---

## Site facts (so skills don't have to crawl)

| Property          | Value                                                          |
|-------------------|----------------------------------------------------------------|
| Primary domain    | https://digidog.org                                            |
| Stack             | Next.js 15 App Router, TypeScript, Tailwind, Vercel            |
| CMS               | None — content lives in /src/lib/blog-data.ts and blog-data-de.ts |
| Locales           | EN (default at /) and DE (at /de)                              |
| Sitemap           | /sitemap.xml — auto-generated                                   |
| Robots            | /robots.txt — permissive to all AI bots, blocks /api and /_next |
| Schema            | Organization (every page), Article (blog), FAQPage (when faqs present), no BreadcrumbList yet |
| Analytics         | GTM (GTM-N8F2BQ4) + GA4 (G-W5JP198XEE)                         |
| Calendly          | erik-budanov/beratungsgespraech                                 |

### Service pages

| EN URL                                | DE URL                                                    |
|---------------------------------------|-----------------------------------------------------------|
| /services/ai-integration              | /de/dienstleistungen/ki-integration                       |
| /services/ai-solutions                | /de/dienstleistungen/ki-loesungen                         |
| /services/web-design                  | /de/dienstleistungen/webdesign                            |
| /services/custom-software             | /de/dienstleistungen/individuelle-software                |

Programmatic city pages: /de/webdesign-agentur-berlin, /de/webdesign-agentur-hamburg.
(Note: the URL slug uses "agentur" for search-volume reasons; the page copy uses
the new positioning.)

---

## SEO state (as of 2026-05-26)

### Working

- robots.txt permissive, all AI bots allowed
- sitemap auto-updates, 68 URLs
- hreflang on homepage, service pages, blog index, blog posts (added today)
- Article + FAQPage + Organization schema rendering correctly
- HTTPS site-wide, canonicals everywhere

### Recent wins

- Three blog posts shipped today: Playwright MCP title rewrite, Claude Skills
  vs MCP Servers (EN+DE), Vibe Coding DE 2,500-word pillar (18K monthly searches,
  KD 15).
- AI-SEO Phases B + C applied: Quick answer blocks, FAQ sections, FAQ schema,
  cited statistics + expert quotes on Claude Skills post.

### Highest-impact open work

1. Apply Phase C deep-treatment to Playwright MCP + Vibe Coding DE posts.
2. Re-authenticate the GSC MCP (OAuth token expired — Google Testing-mode 7-day limit).
3. Build more programmatic city pages (Berlin, Hamburg only so far).
4. Internal linking pass: blog → service pages.

---

## GEO / AI-SEO patterns we apply

Per Princeton KDD 2024 GEO research (summarized in ai-seo skill):

- Citation sources: +40% AI visibility
- Statistics with attribution: +37%
- Expert quotations: +30%
- Keyword stuffing: -10%

Every new pillar post should hit at least two of: cited sources, statistics
with attribution, expert quotes. Every post should have a Quick answer /
Kurzantwort block in the first 200 words and a FAQ section + FAQPage schema.

---

## Infrastructure references (for build/automation skills)

- Repo: github.com/ErikBudanovDev/digidog-homepage (master branch, public)
- Vercel: project prj_HsW0npvix5hpL0z2RmHH6wnldrnR, team team_4e2b4vQ9u3dfT5j3bPSGnPA7
- VPS: 148.230.105.113 — Postgres (appdb), GSC MCP, FinTel MCP, CRM MCP, WP Gateway
- GSC MCP: gsc-mcp.digidog-services.com (28 tools), currently locked on expired OAuth refresh

---

## What this file is NOT

- Not a brand book. Not a style guide for designers.
- Not a sales playbook. Not a service catalog.
- Not a competitor analysis.
- Not a content calendar.

Each of those, if needed, lives in its own file. This file is the minimum
context a marketing or SEO skill needs to skip questions and get to work.
