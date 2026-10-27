/* ─────────────────────────────────────────────
 * Blog Post Client (DE) — German version
 * German CTA text, DE date formatting
 * ───────────────────────────────────────────── */
"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { BlogPost } from "@/lib/blog-data";
import { markdownToHtml, VideoWithChapters } from "./BlogPostClient";

export default function BlogPostDEClient({ post }: { post: BlogPost }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B1B34] via-[#142B50] to-[#1B3A5C] pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/de/blog"
            className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors mb-6 inline-block"
          >
            ← Zurück zum Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-cyan-400 bg-white/10 px-3 py-1 rounded-full">
              {post.tag}
            </span>
            <span className="text-xs text-white/50">{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("de-DE", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </section>

      {/* Featured video (with chapters) or image */}
      {post.video?.youtubeId ? (
        <VideoWithChapters video={post.video} label="Kapitel" />
      ) : (
        <div className="max-w-4xl mx-auto px-6 -mt-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-xl shadow-lg aspect-[2/1] object-cover"
          />
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <style>{`
          .blog-content h2 { font-size: 1.75rem; font-weight: 700; color: #111827; margin-top: 3rem; margin-bottom: 1rem; line-height: 1.3; }
          .blog-content h3 { font-size: 1.35rem; font-weight: 600; color: #1f2937; margin-top: 2rem; margin-bottom: 0.75rem; line-height: 1.4; }
          .blog-content p { color: #4b5563; line-height: 1.8; margin-bottom: 1.25rem; font-size: 1.05rem; }
          .blog-content strong { color: #111827; }
          .blog-content a { color: #2563eb; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
          .blog-content a:hover { border-bottom-color: #2563eb; }
          .blog-content ul { margin: 1rem 0 1.5rem 1.5rem; list-style: disc; }
          .blog-content li { color: #4b5563; line-height: 1.8; margin-bottom: 0.5rem; font-size: 1.05rem; }
          .blog-content .code-block { background: #0f172a; border-radius: 0.75rem; padding: 1.25rem 1.5rem; margin: 1.5rem 0; overflow-x: auto; }
          .blog-content .code-block code { color: #e2e8f0; font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; font-size: 0.875rem; line-height: 1.7; white-space: pre; }
          .blog-content .inline-code { background: #f1f5f9; color: #0f172a; padding: 0.15rem 0.4rem; border-radius: 0.3rem; font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; font-size: 0.9em; border: 1px solid #e2e8f0; }
          .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; border-radius: 0.5rem; overflow: hidden; }
          .blog-content th { background: #f8fafc; padding: 0.75rem 1rem; text-align: left; font-weight: 600; color: #1f2937; border: 1px solid #e5e7eb; font-size: 0.95rem; }
          .blog-content td { padding: 0.75rem 1rem; border: 1px solid #e5e7eb; color: #4b5563; font-size: 0.95rem; }
          .blog-content tr:nth-child(even) td { background: #f9fafb; }
          .blog-content ol { margin: 1rem 0 1.5rem 1.5rem; list-style: decimal; }
          .blog-content figure { margin: 2rem 0; }
          .blog-content figure img { width: 100%; border-radius: 0.75rem; border: 1px solid #e5e7eb; box-shadow: 0 4px 16px rgba(15,23,42,0.08); }
          .blog-content figcaption { margin-top: 0.6rem; font-size: 0.9rem; color: #6b7280; text-align: center; }
          @media (max-width: 640px) { .blog-content table { display: block; overflow-x: auto; } }
        `}</style>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />
      </article>

      {/* CTA — German */}
      <section className="bg-gradient-to-r from-[#0B1B34] to-[#1B3A5C] py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Bereit, das in die Praxis umzusetzen?
          </h2>
          <p className="text-white/70 mb-8">
            Vereinbaren Sie ein kostenloses Erstgespräch und lassen Sie uns besprechen, wie wir Ihrem Unternehmen helfen können.
          </p>
          <a
            href="https://calendly.com/erik-budanov/beratungsgespraech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
          >
            Kostenloses Erstgespräch buchen →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
