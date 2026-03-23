import { ScrollReveal } from "./ScrollReveal";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { colors } from "./ui/brand";
import { SectionContainer, SectionHeading } from "./ui/section";
import { BlogCard, type BlogCardData } from "./ui/cards";
import { blogPosts as allBlogPosts } from "@/lib/blog-data";
import { useTranslation } from "@/i18n/i18n-context";
import enBlog from "@/translations/blog/english.json";
import deBlog from "@/translations/blog/german.json";

/** Slugs to feature on the homepage (most recent / highest value) */
const FEATURED_SLUGS = [
  "playwright-mcp-server-complete-guide",
  "slack-mcp-server-setup-guide",
  "website-erstellen-lassen-kosten-ablauf-tipps",
];

/** Fallback featured slugs if the above aren't found */
const FALLBACK_SLUGS = [
  "ai-automation-for-mid-size-companies",
  "case-study-ai-automation-crm-integration",
  "what-is-mcp-model-context-protocol",
];

function getFeaturedPosts(locale: string): BlogCardData[] {
  const translations = (locale === "DE" ? deBlog : enBlog).posts as Record<string, any>;

  // Try featured slugs first, then fallbacks
  const slugsToTry = [...FEATURED_SLUGS, ...FALLBACK_SLUGS];
  const posts: BlogCardData[] = [];
  const seen = new Set<string>();

  for (const slug of slugsToTry) {
    if (posts.length >= 3) break;
    if (seen.has(slug)) continue;
    seen.add(slug);

    const post = allBlogPosts.find((p) => p.slug === slug);
    if (!post) continue;

    const t = translations[slug];
    posts.push({
      title: t?.title || post.title,
      description: t?.excerpt || t?.metaDescription || post.excerpt,
      image: post.image,
      tag: t?.tag || post.tag,
      slug: post.slug,
    });
  }

  // If still not enough, fill from the beginning of allBlogPosts
  for (const post of allBlogPosts) {
    if (posts.length >= 3) break;
    if (seen.has(post.slug)) continue;
    seen.add(post.slug);

    const t = translations[post.slug];
    posts.push({
      title: t?.title || post.title,
      description: t?.excerpt || t?.metaDescription || post.excerpt,
      image: post.image,
      tag: t?.tag || post.tag,
      slug: post.slug,
    });
  }

  return posts;
}

const SECTION_HEADING: Record<string, string> = {
  EN: "Explore our world of ideas",
  DE: "Entdecken Sie unsere Ideenwelt",
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
      </SectionContainer>
    </section>
  );
}
