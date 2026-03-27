/* ─────────────────────────────────────────────
 * Blog Listing Client (DE) — German version
 * ───────────────────────────────────────────── */
"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { BlogPost } from "@/lib/blog-data";

export default function BlogListingDEClient({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B1B34] via-[#142B50] to-[#1B3A5C] pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4">
            Einblicke &amp; Fallstudien
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            KI, Webentwicklung &amp;<br />Software-Engineering Blog
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Praxisnahe Leitfäden, echte Fallstudien und Experteneinblicke zu KI-Automatisierung,
            Webentwicklung und individueller Software — geschrieben für Entscheider im Mittelstand.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/de/blog/${post.slug}`}
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
                  <span>{new Date(post.date).toLocaleDateString("de-DE", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
