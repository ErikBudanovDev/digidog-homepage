#!/usr/bin/env python3
"""Fix the orphaned blog: nav + footer Blog links, DE routes, locale-aware homepage blog cards,
and cross-links from the 3 indexed MCP guides to the never-crawled Claude Skills post."""
import pathlib, sys
R = pathlib.Path(".")
EDITS = [
 # 1. DE routes: blog was pointing to the EN blog
 (R/"src/i18n/routes.ts",
  '    contact: "/de/kontakt",\n    blog: "/blog",',
  '    contact: "/de/kontakt",\n    blog: "/de/blog",'),

 # 2. Navbar: add Blog between AI Operations and About
 (R/"src/components/Navbar.tsx",
  '    { href: getLocalizedRoute("aiIntegration", locale), label: pt.nav.aiOperations },\n',
  '    { href: getLocalizedRoute("aiIntegration", locale), label: pt.nav.aiOperations },\n    { href: getLocalizedRoute("blog", locale), label: pt.nav.blog },\n'),

 # 3. Footer quick links: add Blog
 (R/"src/components/Footer.tsx",
  '    { label: pt.footer.portfolio, href: getLocalizedRoute("portfolio", locale) },\n    { label: pt.footer.services',
  '    { label: pt.footer.portfolio, href: getLocalizedRoute("portfolio", locale) },\n    { label: pt.nav.blog, href: getLocalizedRoute("blog", locale) },\n    { label: pt.footer.services'),

 # 4. BlogCard: honour an explicit href (needed for /de/blog/... links)
 (R/"src/components/ui/cards.tsx",
  '  tag: string;\n  slug?: string;\n}\n\nexport function BlogCard(',
  '  tag: string;\n  slug?: string;\n  /** Explicit link target; overrides the default /blog/{slug} */\n  href?: string;\n}\n\nexport function BlogCard('),
 (R/"src/components/ui/cards.tsx",
  '    <a href={post.slug ? `/blog/${post.slug}` : "/blog"} className="block">',
  '    <a href={post.href ?? (post.slug ? `/blog/${post.slug}` : "/blog")} className="block">'),
 (R/"src/components/ui/cards.tsx",
  '          href={post.slug ? `/blog/${post.slug}` : "/blog"}\n          color={colors.textBlueLink}',
  '          href={post.href ?? (post.slug ? `/blog/${post.slug}` : "/blog")}\n          color={colors.textBlueLink}'),
]

# 5. BlogSection: full rewrite of the data-selection half (locale-aware, curated + newest fallback)
BS = R/"src/components/BlogSection.tsx"
bs = BS.read_text()
start = bs.index('import { blogPosts as allBlogPosts } from "@/lib/blog-data";')
end = bs.index('const SECTION_HEADING')
new_head = '''import { blogPosts } from "@/lib/blog-data";
import { blogPostsDE } from "@/lib/blog-data-de";
import { useTranslation } from "@/i18n/i18n-context";
import { getLocalizedRoute } from "@/i18n/routes";

/**
 * Curated homepage picks per locale. Newest-by-date fills any gap, so a new
 * post surfaces here automatically until it is curated in or out.
 * Keep the freshest / not-yet-indexed posts here: the homepage is the
 * strongest internal link on the site and Googlebot follows it first.
 */
const FEATURED: Record<string, string[]> = {
  EN: [
    "claude-skills-vs-mcp-servers",
    "vibe-coding-vps-build-deploy-app-with-ai",
    "replace-saas-with-ai-vps",
  ],
  DE: [
    "vibe-coding-deutschland-anleitung",
    "claude-skills-vs-mcp-server",
    "ki-automatisierung-mittelstand",
  ],
};

function getFeaturedPosts(locale: string): BlogCardData[] {
  const isDE = locale === "DE";
  const source = isDE ? blogPostsDE : blogPosts;
  const base = isDE ? "/de/blog" : "/blog";
  const picks = FEATURED[isDE ? "DE" : "EN"];

  const byDate = [...source].sort((a, b) => (a.date < b.date ? 1 : -1));
  const ordered = [
    ...picks.map((s) => source.find((p) => p.slug === s)).filter(Boolean),
    ...byDate,
  ] as typeof source;

  const seen = new Set<string>();
  const out: BlogCardData[] = [];
  for (const post of ordered) {
    if (out.length >= 3) break;
    if (seen.has(post.slug)) continue;
    seen.add(post.slug);
    out.push({
      title: post.title,
      description: post.excerpt,
      image: post.image,
      tag: post.tag,
      slug: post.slug,
      href: `${base}/${post.slug}`,
    });
  }
  return out;
}

'''
bs = bs[:start] + new_head + bs[end:]
# heading + "all posts" link
bs = bs.replace('''const SECTION_HEADING: Record<string, string> = {
  EN: "Explore our world of ideas",
  DE: "Entdecken Sie unsere Ideenwelt",
};''', '''const SECTION_HEADING: Record<string, string> = {
  EN: "MCP guides, AI operations & self-hosting",
  DE: "MCP-Guides, KI-Operations & Self-Hosting",
};
const ALL_POSTS: Record<string, string> = {
  EN: "All articles",
  DE: "Alle Artikel",
};''')
bs = bs.replace('''        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              index={index}
              isInView={cardsInView}
            />
          ))}
        </div>''', '''        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              index={index}
              isInView={cardsInView}
            />
          ))}
        </div>

        {/* Link to the blog index — the index itself was an orphan page before this */}
        <div className="text-center mt-10">
          <a
            href={getLocalizedRoute("blog", locale)}
            className="inline-block text-white/80 hover:text-white underline underline-offset-4 text-[15px]"
          >
            {ALL_POSTS[locale] || ALL_POSTS.EN} →
          </a>
        </div>''')
assert 'blogPostsDE' in bs and 'ALL_POSTS[locale]' in bs and 'enBlog' not in bs and 'deBlog' not in bs

# 6. Cross-links: indexed MCP guides -> Claude Skills (EN + DE), inserted before the closing CTA
EN_XL = ("\n\n**Related guides:** [Claude Skills vs MCP Servers — when to use which](/blog/claude-skills-vs-mcp-servers) · "
         "[Slack MCP Server setup](/blog/slack-mcp-server-setup-guide) · "
         "[Supabase MCP Server setup](/blog/supabase-mcp-server-setup-guide) · "
         "[Playwright MCP Server setup](/blog/playwright-mcp-server-complete-guide)\n\n")
DE_XL = ("\n\n**Weiterführende Anleitungen:** [Claude Skills vs. MCP-Server — wann was?](/de/blog/claude-skills-vs-mcp-server) · "
         "[Slack MCP Server einrichten](/de/blog/slack-mcp-server-einrichten) · "
         "[Supabase MCP Server einrichten](/de/blog/supabase-mcp-server-einrichten) · "
         "[Playwright MCP Server Anleitung](/de/blog/playwright-mcp-server-anleitung) · "
         "[Vibe Coding: der deutsche Leitfaden](/de/blog/vibe-coding-deutschland-anleitung)\n\n")
CTA_ANCHORS = [
 (R/"src/lib/blog-data.ts", "If you're exploring MCP for your business, we build custom integrations from strategy to production — see our [AI Integration service]", EN_XL),
 (R/"src/lib/blog-data.ts", "See the full picture in our [AI Integration service](/services/ai-integration), or [book a free consultation](https://calendly.com/erik-budanov/beratungsgespraech) to explore what MCP can do for your team.", EN_XL),
 (R/"src/lib/blog-data.ts", "If you want help building a custom Supabase MCP server for your specific use case", EN_XL),
 (R/"src/lib/blog-data-de.ts", "Wenn Sie MCP für Ihr Unternehmen erkunden möchten, entwickeln wir maßgeschneiderte Integrationen von der Strategie bis zur Produktion — sehen Sie unsere", DE_XL),
 (R/"src/lib/blog-data-de.ts", "Slack MCP ist eine von Dutzenden MCP-Integrationen, die wir für mittelständische Unternehmen entwickeln.", DE_XL),
 (R/"src/lib/blog-data-de.ts", "Wenn Sie Hilfe beim Aufbau eines benutzerdefinierten Supabase MCP Servers benötigen", DE_XL),
]

cache = {}
bad = []
for path, old, new in EDITS:
    t = cache.setdefault(path, path.read_text())
    if t.count(old) != 1: bad.append(f"{path}: {t.count(old)}x {old[:60]!r}")
for path, anchor, _ in CTA_ANCHORS:
    t = cache.setdefault(path, path.read_text())
    if t.count(anchor) != 1: bad.append(f"{path}: {t.count(anchor)}x {anchor[:60]!r}")
if bad:
    print("ABORT:\n  " + "\n  ".join(bad)); sys.exit(1)

for path, old, new in EDITS:
    cache[path] = cache[path].replace(old, new)
for path, anchor, xl in CTA_ANCHORS:
    # strip the paragraph break that precedes the CTA so we don't double it
    cache[path] = cache[path].replace(anchor, xl.lstrip("\n") + anchor)
cache[BS] = bs
for p, t in cache.items():
    p.write_text(t); print("wrote", p)
