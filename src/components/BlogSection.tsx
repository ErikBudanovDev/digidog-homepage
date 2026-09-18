import { ScrollReveal } from "./ScrollReveal";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { colors } from "./ui/brand";
import { SectionContainer, SectionHeading } from "./ui/section";
import { BlogCard, type BlogCardData } from "./ui/cards";
import { blogPosts } from "@/lib/blog-data";
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

const SECTION_HEADING: Record<string, string> = {
  EN: "MCP guides, AI operations & self-hosting",
  DE: "MCP-Guides, KI-Operations & Self-Hosting",
};
const ALL_POSTS: Record<string, string> = {
  EN: "All articles",
  DE: "Alle Artikel",
};

export function BlogSection() {
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px 0px" });
  const { locale } = useTranslation();
  const posts = getFeaturedPosts(locale);

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: colors.navy }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-white rounded-full opacity-5 blur-[200px]" />
        <div className="absolute bottom-[-20%] right-[5%] w-[400px] h-[400px] bg-[#00C59B] rounded-full opacity-8 blur-[200px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#DC43F4] rounded-full opacity-5 blur-[200px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${(i * 5.3) % 100}%`,
              top: `${(i * 7.1) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <SectionContainer className="relative">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionHeading theme="dark">
              {SECTION_HEADING[locale] || SECTION_HEADING.EN}
            </SectionHeading>
          </ScrollReveal>
        </div>

        {/* Blog Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </SectionContainer>
    </section>
  );
}
