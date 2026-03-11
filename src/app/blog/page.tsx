/* ─────────────────────────────────────────────
 * Blog Listing Page
 * ───────────────────────────────────────────── */
import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "./blog-data";

export const metadata: Metadata = {
  title: "Blog — AI Automation, Web Development & Software Insights",
  description:
    "Expert articles on AI automation, web development, custom software, and digital strategy for mid-size companies. Practical guides, case studies, and industry insights by Digidog.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B1B34] via-[#142B50] to-[#1B3A5C] pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4">
            Insights & Case Studies
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            AI, Web Development &<br />Software Engineering Blog
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Practical guides, real case studies, and expert insights on AI automation,
            web development, and custom software — written for decision-makers at mid-size companies.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full">
                    {post.tag}
                  </span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2E75B6] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
