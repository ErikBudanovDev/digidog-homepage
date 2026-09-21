#!/usr/bin/env python3
"""Remove 9 placeholder portfolio projects (fake clients, stock images) and 301 their URLs."""
import json, pathlib, re, sys
FAKE = ["techvision-dashboard","bold-ideas","bella-cucina","fitpulse-app","smartassist-chatbot",
        "smarthome-iot","luxe-mode","logitrack-warehouse","mediconnect-praxis"]
R = pathlib.Path(".")

# 1. portfolio-meta.ts — one line per project
p = R/"src/lib/portfolio-meta.ts"; s = p.read_text()
for slug in FAKE:
    lines = [l for l in s.split("\n") if f'slug: "{slug}"' in l]
    assert len(lines) == 1, (slug, len(lines))
    s = s.replace(lines[0] + "\n", "")
p.write_text(s)

# 2. PortfolioSection.tsx — remove the whole object literal around each slug
p = R/"src/components/PortfolioSection.tsx"; s = p.read_text()
for slug in FAKE:
    i = s.index(f'slug: "{slug}"')
    depth, a = 0, i
    while True:                      # walk back to the opening brace of this element
        a -= 1
        if s[a] == "}": depth += 1
        elif s[a] == "{":
            if depth == 0: break
            depth -= 1
    depth, b = 0, a
    while True:                      # walk forward to its closing brace
        b += 1
        if s[b] == "{": depth += 1
        elif s[b] == "}":
            if depth == 0: break
            depth -= 1
    b += 1
    if s[b] == ",": b += 1
    line_start = s.rfind("\n", 0, a) + 1
    s = s[:line_start] + s[b:].lstrip(" ").lstrip("\n") if s[line_start:a].strip() == "" else s[:a] + s[b:]
    assert f'slug: "{slug}"' not in s
p.write_text(s)

# 3. translation files
for f in ["src/translations/portfolio/english.json", "src/translations/portfolio/german.json"]:
    p = R/f; d = json.loads(p.read_text())
    for slug in FAKE: d["projects"].pop(slug)
    p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n")

# 4. 301s
p = R/"next.config.ts"; s = p.read_text()
anchor = '      // Catch-all for any remaining old /en/* WordPress URL (must stay LAST)'
assert s.count(anchor) == 1
block = "      // === Placeholder portfolio projects removed — Sept 21, 2026 ===\n" + "".join(
    f'      {{ source: "/portfolio/{x}", destination: "/portfolio", permanent: true }},\n' for x in FAKE)
p.write_text(s.replace(anchor, block + anchor))
print("removed", len(FAKE), "placeholder projects")
