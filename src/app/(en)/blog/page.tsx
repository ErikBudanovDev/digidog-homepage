/* ─────────────────────────────────────────────
 * Blog Listing Page — Server component for SEO metadata
 * ───────────────────────────────────────────── */
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-data";
import BlogListingClient from "@/app/client-pages/BlogListingClient";

export const metadata: Metadata = {
  title: "Blog — AI Automation, Web Development & Software Insights",
  description:
    "Expert articles on AI automation, web development, custom software, and digital strategy for mid-size companies. Practical guides, case studies, and industry insights by Digidog.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return <BlogListingClient posts={blogPosts} />;
}
