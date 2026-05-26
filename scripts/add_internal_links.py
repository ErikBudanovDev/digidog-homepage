#!/usr/bin/env python3
"""Batch-add internal service-page links to existing blog CTAs."""
import sys, pathlib

REPO = pathlib.Path("/Users/erik/Desktop/Projects/Digidog/digidog-homepage/src/lib")

EDITS = [
    ("blog-data.ts",
     "Ready to see how much time your team could save? [Book a free AI audit](https://calendly.com/erik-budanov/beratungsgespraech).",
     "Ready to see how much time your team could save? See our [AI Solutions service](/services/ai-solutions) for the menu, or [book a free AI audit](https://calendly.com/erik-budanov/beratungsgespraech) for your specific stack."),
    ("blog-data.ts",
     "Want to explore MCP for your business? [Talk to our team](https://calendly.com/erik-budanov/beratungsgespraech) — we've been building MCP integrations since the protocol launched.",
     "Want to explore MCP for your business? See how we approach it in our [AI Integration service](/services/ai-integration), or [talk to our team](https://calendly.com/erik-budanov/beratungsgespraech) — we've been building MCP integrations since the protocol launched."),
    ("blog-data.ts",
     "[Let's map your tech stack together.](https://calendly.com/erik-budanov/beratungsgespraech)",
     "See how we structure [website builds end-to-end](/services/web-design), or [let's map your tech stack together](https://calendly.com/erik-budanov/beratungsgespraech)."),
    ("blog-data.ts",
     "[Book a free consultation](https://calendly.com/erik-budanov/beratungsgespraech) to explore what MCP can do for your team.",
     "See the full picture in our [AI Integration service](/services/ai-integration), or [book a free consultation](https://calendly.com/erik-budanov/beratungsgespraech) to explore what MCP can do for your team."),
    ("blog-data.ts",
     "[Book a free website audit →](https://calendly.com/erik-budanov/beratungsgespraech)",
     "See how we approach [website redesigns end-to-end](/services/web-design), or [book a free website audit →](https://calendly.com/erik-budanov/beratungsgespraech)"),
    ("blog-data.ts",
     "If you want help building a custom Supabase MCP server for your specific use case, or connecting it with other tools in your stack, [book a free consultation](https://calendly.com/erik-budanov/beratungsgespraech). We specialize in exactly this kind of AI integration for mid-size companies.",
     "If you want help building a custom Supabase MCP server for your specific use case, or connecting it with other tools in your stack, see our [AI Integration service](/services/ai-integration) or [book a free consultation](https://calendly.com/erik-budanov/beratungsgespraech). We specialize in exactly this kind of AI integration for mid-size companies."),
    ("blog-data.ts",
     "If you want help mapping which parts of your stack are replaceable with Skills + MCP (and which still need real software), [book a free AI Operations Audit](https://calendly.com/erik-budanov/beratungsgespraech). We'll go through your current tools and show you exactly where the cost can come out.",
     "If you want help mapping which parts of your stack are replaceable with Skills + MCP (and which still need real software), see our [AI Integration service](/services/ai-integration) for what we ship end-to-end, or [book a free AI Operations Audit](https://calendly.com/erik-budanov/beratungsgespraech). We'll go through your current tools and show you exactly where the cost can come out."),
    ("blog-data.ts",
     "*At Digidog, we help companies build and deploy AI-powered applications on their own infrastructure. Whether you need a custom tool, an internal dashboard, or a complete SaaS product — we can take you from idea to production in days, not months. [Book a free strategy call](https://calendly.com/erik-budanov/beratungsgespraech) and tell us what you want to build.*",
     "*At Digidog, we help companies build and deploy AI-powered applications on their own infrastructure. Whether you need a custom tool, an internal dashboard, or a complete SaaS product — we can take you from idea to production in days, not months. See our [Custom Software service](/services/custom-software), or [book a free strategy call](https://calendly.com/erik-budanov/beratungsgespraech) and tell us what you want to build.*"),
    ("blog-data.ts",
     "*We help companies replace $2K-10K/month SaaS stacks with custom AI operations systems — usually in 4-8 weeks. The result: lower costs, full data ownership, and a system that actually fits how your business works. [Book a free AI infrastructure audit](https://calendly.com/erik-budanov/beratungsgespraech) to see what's replaceable in your stack.*",
     "*We help companies replace $2K-10K/month SaaS stacks with custom AI operations systems — usually in 4-8 weeks. The result: lower costs, full data ownership, and a system that actually fits how your business works. See our [AI Solutions service](/services/ai-solutions), or [book a free AI infrastructure audit](https://calendly.com/erik-budanov/beratungsgespraech) to see what's replaceable in your stack.*"),
    ("blog-data-de.ts",
     "Wenn Sie MCP für Ihr Unternehmen erkunden möchten, entwickeln wir maßgeschneiderte Integrationen von der Strategie bis zur Produktion. [Kostenloses Beratungsgespräch buchen](/contact).",
     "Wenn Sie MCP für Ihr Unternehmen erkunden möchten, entwickeln wir maßgeschneiderte Integrationen von der Strategie bis zur Produktion — sehen Sie unsere [KI-Integration-Dienstleistung](/de/dienstleistungen/ki-integration) oder [buchen Sie ein kostenloses Beratungsgespräch](https://calendly.com/erik-budanov/beratungsgespraech)."),
    ("blog-data-de.ts",
     "Slack MCP ist eine von Dutzenden MCP-Integrationen, die wir für mittelständische Unternehmen entwickeln. [Kostenloses Beratungsgespräch buchen](/contact) um zu erkunden, was MCP für Ihr Team leisten kann.",
     "Slack MCP ist eine von Dutzenden MCP-Integrationen, die wir für mittelständische Unternehmen entwickeln. Sehen Sie unsere [KI-Integration-Dienstleistung](/de/dienstleistungen/ki-integration) oder [buchen Sie ein kostenloses Beratungsgespräch](https://calendly.com/erik-budanov/beratungsgespraech) um zu erkunden, was MCP für Ihr Team leisten kann."),
    ("blog-data-de.ts",
     "Wenn Sie Hilfe beim Aufbau eines benutzerdefinierten Supabase MCP Servers benötigen, [buchen Sie ein kostenloses Beratungsgespräch](/contact).",
     "Wenn Sie Hilfe beim Aufbau eines benutzerdefinierten Supabase MCP Servers benötigen, sehen Sie unsere [KI-Integration-Dienstleistung](/de/dienstleistungen/ki-integration) oder [buchen Sie ein kostenloses Beratungsgespräch](https://calendly.com/erik-budanov/beratungsgespraech)."),
    ("blog-data-de.ts",
     "Wenn du mit Vibe Coding startest und stecken bleibst, oder ein konkretes Projekt im Kopf hast und nicht weißt, wie du anfangen sollst: [Buche ein kostenloses KI-Operations-Audit](https://calendly.com/erik-budanov/beratungsgespraech). Wir gehen mit dir durch deinen Use Case und zeigen, wie weit du allein kommen kannst — und wo es sich lohnt, mit uns zusammenzuarbeiten.",
     "Wenn du mit Vibe Coding startest und stecken bleibst, oder ein konkretes Projekt im Kopf hast und nicht weißt, wie du anfangen sollst: Schau dir unsere [Individuelle Software-Dienstleistung](/de/dienstleistungen/individuelle-software) an, oder [buche ein kostenloses KI-Operations-Audit](https://calendly.com/erik-budanov/beratungsgespraech). Wir gehen mit dir durch deinen Use Case und zeigen, wie weit du allein kommen kannst — und wo es sich lohnt, mit uns zusammenzuarbeiten."),
    ("blog-data-de.ts",
     "Wenn du Hilfe dabei brauchst zu identifizieren, welche Teile deines Stacks durch Skills + MCP ersetzbar sind, [buche ein kostenloses KI-Operations-Audit](https://calendly.com/erik-budanov/beratungsgespraech).",
     "Wenn du Hilfe dabei brauchst zu identifizieren, welche Teile deines Stacks durch Skills + MCP ersetzbar sind, schau dir unsere [KI-Integration-Dienstleistung](/de/dienstleistungen/ki-integration) an, oder [buche ein kostenloses KI-Operations-Audit](https://calendly.com/erik-budanov/beratungsgespraech)."),
]

ok = 0; fail = 0
for fname, old, new in EDITS:
    path = REPO / fname
    txt = path.read_text()
    n = txt.count(old)
    if n != 1:
        print(f"FAIL [{fname}] expected 1 match, found {n}: {old[:60]}")
        fail += 1
        continue
    path.write_text(txt.replace(old, new))
    print(f"OK   [{fname}] {old[:60]}")
    ok += 1

print(f"Result: {ok} applied, {fail} failed")
sys.exit(0 if fail == 0 else 1)
