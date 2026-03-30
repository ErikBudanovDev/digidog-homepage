/* ─────────────────────────────────────────────
 * DE Blog Listing Page — /de/blog
 * ───────────────────────────────────────────── */
import type { Metadata } from "next";
import { blogPostsDE } from "@/lib/blog-data-de";
import BlogListingDEClient from "@/app/client-pages/BlogListingDEClient";

export const metadata: Metadata = {
  title: "Blog — KI-Automatisierung, Webentwicklung & Software | Digidog",
  description:
    "Expertenbeiträge zu KI-Automatisierung, Webentwicklung, individueller Software und digitaler Strategie für den Mittelstand. Praxisnahe Leitfäden, Fallstudien und Brancheneinblicke von Digidog.",
  alternates: {
    canonical: "/de/blog",
    languages: { "en": "/blog", "de": "/de/blog", "x-default": "/blog" },
  },
};

export default function DEBlogPage() {
  return <BlogListingDEClient posts={blogPostsDE} />;
}
