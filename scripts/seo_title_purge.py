#!/usr/bin/env python3
"""One-pass fix: purge agency-era SEO titles, kill double suffixes, add 301s for dead legacy URLs.
Every replacement must match exactly once, otherwise the script aborts before writing anything."""
import pathlib, sys

R = pathlib.Path(".")
EN = R/"src/translations/english.json"
DE = R/"src/translations/german.json"
NX = R/"next.config.ts"

EDITS = [
 # ─── english.json ───────────────────────────────────────────────
 (EN, '"title": "AI Integration & Automation Agency",',
      '"title": "AI Integration & MCP Automation for Service Businesses",'),
 (EN, '"description": "AI Operations Systems for service businesses. We replace bloated SaaS stacks with AI-operated tools on infrastructure you own. From $1,200/month to $210.",',
      '"description": "We wire your CRM, email, support, and operations into one AI system with custom MCP servers, on infrastructure you own. 30-60% of repetitive work automated.",'),
 (EN, '"ogTitle": "AI Integration & Automation Agency | Digidog",',
      '"ogTitle": "AI Integration & MCP Automation | Digidog",'),
 (EN, '"title": "Custom AI Solutions & Machine Learning Development Agency",',
      '"title": "Custom AI Systems: LLM, ML & Predictive Analytics",'),
 (EN, '"description": "Custom AI development agency: machine learning models, NLP, computer vision, predictive analytics, and LLM integration for mid-size companies.",',
      '"description": "Custom AI built for how your business runs: LLM integration, machine learning, NLP, and predictive analytics, deployed on your own stack instead of rented per seat.",'),
 (EN, '"title": "Web & Infrastructure",',
      '"title": "Websites & Infrastructure You Own: Next.js, VPS, WordPress",'),
 (EN, '"description": "Custom web design, WordPress development, and full-stack solutions for mid-size companies. High-performance websites with React, Next.js, and WordPress.",',
      '"description": "High-performance websites on Next.js or WordPress, hosted on infrastructure you control. No vendor lock-in, no surprise price hikes, maintenance included.",'),
 (EN, '"ogTitle": "Web Design & WordPress Development Agency | Digidog",',
      '"ogTitle": "Websites & Infrastructure You Own | Digidog",'),
 (EN, '"title": "Custom Software Development Agency | Internal Tools & SaaS",',
      '"title": "Custom Software That Replaces Your SaaS Stack",'),
 (EN, '"description": "Custom software development for mid-size companies. Internal tools, API integrations, SaaS platforms, dashboards, and database architecture.",',
      '"description": "Internal tools, dashboards, API integrations, and SaaS replacements built for mid-size companies, usually shipped in 4-8 weeks, on infrastructure you own.",'),
 (EN, '"ogTitle": "Custom Software Development Agency | Digidog",',
      '"ogTitle": "Custom Software That Replaces SaaS | Digidog",'),
 (EN, '"title": "About Digidog | AI Consulting & Web Development Team",',
      '"title": "About DigiDog: Erik Budanov & the AI Operations Team",'),
 (EN, '"description": "The story behind Digidog. From $1,200/month SaaS to $210 on our own AI stack — and the AI Operations Systems we now build for service businesses."',
      '"description": "The story behind DigiDog: from $1,200/month in SaaS to $210 on our own AI stack, and the AI Operations Systems we now build for service businesses."'),
 (EN, '"title": "Contact Us | Free AI & Web Development Consultation",',
      '"title": "Contact DigiDog: Book a Free AI Operations Audit",'),
 (EN, '"description": "Get in touch with Digidog for a free consultation on AI automation, web development, or custom software. We respond within 24 hours."',
      '"description": "Book a free AI Operations Audit. We map your SaaS stack, show what an owned AI system replaces, and what it costs. We reply within 24 hours."'),
 (EN, '"title": "Portfolio | AI Automation & Web Development Case Studies",',
      '"title": "Case Studies: AI Operations Systems in Production",'),
 (EN, '"description": "Real case studies from our AI automation, web development, and custom software projects with measurable results."',
      '"description": "Real AI Operations Systems shipped for service businesses: SaaS replaced, workflows automated, infrastructure owned, with the numbers to show for it."'),
 (EN, '"title": "Blog — AI Automation, Web Development & Software Insights",',
      '"title": "Blog: MCP Guides, AI Operations & Self-Hosting",'),
 (EN, '"description": "Expert articles on AI automation, web development, custom software, and digital strategy for mid-size companies."',
      '"description": "MCP server setup guides, AI operations playbooks, and self-hosting how-tos for teams replacing SaaS with systems they own."'),

 # ─── german.json ────────────────────────────────────────────────
 (DE, '"title": "KI-Operations-Systeme für Dienstleister | Digidog",',
      '"title": "KI-Operations-Systeme für Dienstleister",'),
 (DE, '"title": "KI-Integration & Automatisierung",',
      '"title": "KI-Integration & MCP-Automatisierung für Dienstleister",'),
 (DE, '"description": "KI-Agentur für den Mittelstand. Wir automatisieren 30-60% Ihrer repetitiven Arbeit durch KI-Workflows, CRM-Integration, MCP-Server und Prozessautomatisierung.",',
      '"description": "Wir verbinden CRM, E-Mail, Support und Betrieb zu einem KI-System mit eigenen MCP-Servern, auf Infrastruktur, die Ihnen gehört. 30-60 % repetitiver Arbeit automatisiert.",'),
 (DE, '"ogTitle": "KI Agentur | KI-Automatisierung & Beratung | Digidog",',
      '"ogTitle": "KI-Integration & MCP-Automatisierung | Digidog",'),
 (DE, '"title": "Webdesign & Webentwicklung Agentur",',
      '"title": "Websites & Infrastruktur, die Ihnen gehören",'),
 (DE, '"description": "Webdesign-Agentur und WordPress-Entwicklung für den Mittelstand. Responsive, performante Websites mit React, Next.js und WordPress. Wartung & Support inklusive.",',
      '"description": "Performante Websites mit Next.js oder WordPress auf Infrastruktur, die Sie kontrollieren. Kein Vendor-Lock-in, keine Preiserhöhungen, Wartung inklusive.",'),
 (DE, '"ogTitle": "Webdesign & WordPress Agentur | Digidog",',
      '"ogTitle": "Websites & Infrastruktur, die Ihnen gehören | Digidog",'),
 (DE, '"description": "Lernen Sie das Digidog-Team kennen. KI-Beratung und Webentwicklung für mittelständische Unternehmen seit 2021."',
      '"description": "Die Geschichte hinter DigiDog: von 1.200 € SaaS im Monat auf 210 € mit eigenem KI-Stack, und die KI-Operations-Systeme, die wir heute für Dienstleister bauen."'),
 (DE, '"title": "Kontakt — Kostenlose Erstberatung",',
      '"title": "Kontakt: Kostenloses KI-Operations-Audit buchen",'),
 (DE, '"description": "Kontaktieren Sie Digidog für eine kostenlose Beratung zu KI-Automatisierung, Webentwicklung oder Individualsoftware. Antwort innerhalb von 24 Stunden."',
      '"description": "Buchen Sie ein kostenloses KI-Operations-Audit. Wir analysieren Ihren SaaS-Stack und zeigen, was ein eigenes KI-System ersetzt und was es kostet. Antwort in 24 Stunden."'),
 (DE, '"title": "Portfolio — Unsere Projekte",',
      '"title": "Fallstudien: KI-Operations-Systeme im Einsatz",'),
 (DE, '"description": "Echte Fallstudien aus unseren KI-Automatisierungs-, Webentwicklungs- und Softwareprojekten mit messbaren Ergebnissen."',
      '"description": "Echte KI-Operations-Systeme, die wir für Dienstleister gebaut haben: SaaS ersetzt, Workflows automatisiert, Infrastruktur im eigenen Besitz, mit Zahlen."'),
 (DE, '"title": "Blog — KI, Web & Software Insights",',
      '"title": "Blog: MCP-Anleitungen, KI-Operations & Self-Hosting",'),
 (DE, '"description": "Fachartikel zu KI-Automatisierung, Webentwicklung, Individualsoftware und Digitalstrategie für mittelständische Unternehmen."',
      '"description": "MCP-Server-Anleitungen, KI-Operations-Playbooks und Self-Hosting-Guides für Teams, die SaaS durch eigene Systeme ersetzen."'),

 # ─── hardcoded page metadata (double-suffix + agency wording) ──
 (R/"src/app/de/ueber-uns/page.tsx",
      'title: "Über uns — Das DigiDog Team | DigiDog",\n  description:',
      'title: "Über DigiDog: Erik Budanov & das KI-Operations-Team",\n  description:'),
 (R/"src/app/de/blog/page.tsx",
      'title: "Blog — KI-Automatisierung, Webentwicklung & Software | Digidog",',
      'title: "Blog: MCP-Anleitungen, KI-Operations & Self-Hosting",'),
 (R/"src/app/(en)/ai-integration/page.tsx",
      'title: "AI Integration for Business | Don\'t Stay Behind | Digidog",',
      'title: "AI Integration for Business: Don\'t Stay Behind",'),
 (R/"src/app/(en)/ai-integration/ads/page.tsx",
      'title: "Free AI Automation Audit | Digidog",',
      'title: "Free AI Automation Audit",'),

 # ─── next.config.ts: 301s for the 24 legacy URLs still 404ing in GA ──
 (NX,
  '      { source: "/de/projects/:slug/", destination: "/de/portfolio", permanent: true },\n    ];',
  '''      { source: "/de/projects/:slug/", destination: "/de/portfolio", permanent: true },

      // === GA legacy 404s — Sept 18, 2026 (still receiving hits from old index/backlinks) ===
      { source: "/en/home-01", destination: "/", permanent: true },
      { source: "/en/services", destination: "/services/ai-integration", permanent: true },
      { source: "/en/services/", destination: "/services/ai-integration", permanent: true },
      { source: "/services-it", destination: "/services/custom-software", permanent: true },
      { source: "/digitaloutsourcing", destination: "/services/custom-software", permanent: true },
      { source: "/en/digitaloutsourcing", destination: "/services/custom-software", permanent: true },
      { source: "/digital-consulting", destination: "/services/ai-solutions", permanent: true },
      { source: "/en/digital-consulting", destination: "/services/ai-solutions", permanent: true },
      { source: "/en/digital-marketing", destination: "/services/ai-solutions", permanent: true },
      { source: "/seo-sea-analytics", destination: "/services/web-design", permanent: true },
      { source: "/website-pflege-und-support-losungen", destination: "/de/dienstleistungen/webdesign", permanent: true },
      { source: "/marketing-fuer-kieferorthopaedie", destination: "/de/dienstleistungen/ki-loesungen", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/data-privacy", destination: "/privacy", permanent: true },
      { source: "/de/data-privacy", destination: "/de/datenschutz", permanent: true },
      { source: "/agb", destination: "/terms", permanent: true },
      { source: "/pricing", destination: "/contact", permanent: true },
      { source: "/en/general-terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/en/en-terms-of-service", destination: "/terms", permanent: true },
      { source: "/case-studies/:slug", destination: "/portfolio", permanent: true },
      { source: "/en/portfolio/:slug", destination: "/portfolio", permanent: true },
      { source: "/en/portfolio/:slug/", destination: "/portfolio", permanent: true },
      { source: "/en/5-core-elements-in-website-creation", destination: "/blog/website-redesign-complete-guide", permanent: true },
      { source: "/en/right-people-do-the-right-job-en", destination: "/blog", permanent: true },
      { source: "/en/website-dot-convert-en", destination: "/blog/website-redesign-complete-guide", permanent: true },
      { source: "/the-gold-rush-of-the-ai-era-navigating-the-ai-marketplace-and-marketing-landscape", destination: "/blog", permanent: true },
      // Catch-all for any remaining old /en/* WordPress URL (must stay LAST)
      { source: "/en/:path*", destination: "/", permanent: true },
    ];'''),
]

# dry-run: verify every match is unique before touching disk
bad = []
cache = {}
for path, old, new in EDITS:
    txt = cache.setdefault(path, path.read_text())
    n = txt.count(old)
    if n != 1:
        bad.append(f"{path}: {n} matches for {old[:70]!r}")
if bad:
    print("ABORT — non-unique matches:\n  " + "\n  ".join(bad)); sys.exit(1)

for path, old, new in EDITS:
    cache[path] = cache[path].replace(old, new)
for path, txt in cache.items():
    path.write_text(txt)
    print("wrote", path)
print(f"{len(EDITS)} edits applied across {len(cache)} files")
