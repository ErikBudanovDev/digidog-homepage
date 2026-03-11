/* ─────────────────────────────────────────────
 * Blog Post Detail Page — SSG with generateStaticParams
 * ───────────────────────────────────────────── */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "../blog-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  /* Simple markdown-ish rendering: split by ## for sections */
  const sections = post.content.split(/\n## /).filter(Boolean);

  /* JSON-LD Article schema */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Digidog",
      url: "https://digidog.org",
    },
    datePublished: post.date,
    mainEntityOfPage: `https://digidog.org/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B1B34] via-[#142B50] to-[#1B3A5C] pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors mb-6 inline-block"
          >
            ← Back to Blog
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
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-xl shadow-lg aspect-[2/1] object-cover"
        />
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        <div
          className="prose prose-lg prose-gray max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-strong:text-gray-900
            prose-a:text-[#2E75B6] prose-a:no-underline hover:prose-a:underline
            prose-table:border-collapse prose-th:bg-gray-50 prose-th:p-3 prose-td:p-3 prose-td:border prose-th:border
            prose-li:text-gray-600"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />
      </article>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#0B1B34] to-[#1B3A5C] py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to put this into practice?
          </h2>
          <p className="text-white/70 mb-8">
            Book a free consultation and let&apos;s discuss how we can help your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
          >
            Book a Free Consultation →
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ─── Minimal markdown → HTML converter ─── */
function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^\| (.+) \|$/gm, (match) => {
      const cells = match.split("|").filter(Boolean).map((c) => c.trim());
      return "<tr>" + cells.map((c) => `<td>${c}</td>`).join("") + "</tr>";
    })
    .replace(/^\|[-| ]+\|$/gm, "")
    .replace(/(<tr>.*<\/tr>\n?)+/g, (m) => {
      const rows = m.trim().split("\n");
      const header = rows[0]?.replace(/<td>/g, "<th>").replace(/<\/td>/g, "</th>");
      const body = rows.slice(1).join("\n");
      return `<table><thead>${header}</thead><tbody>${body}</tbody></table>`;
    })
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/^(?!<[hultap])(.+)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "")
    .replace(/<p>(<[hultap])/g, "$1")
    .replace(/(<\/[hultap][^>]*>)<\/p>/g, "$1");
}
