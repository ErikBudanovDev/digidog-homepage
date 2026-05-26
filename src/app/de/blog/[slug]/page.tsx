/* ─────────────────────────────────────────────
 * DE Blog Post Page — /de/blog/[slug]
 * SSG with generateStaticParams from DE posts
 * ───────────────────────────────────────────── */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPostsDE, getBlogPostDE } from "@/lib/blog-data-de";
import BlogPostDEClient from "@/app/client-pages/BlogPostDEClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPostsDE.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostDE(slug);
  if (!post) return { title: "Beitrag nicht gefunden" };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `/de/blog/${post.slug}`,
      languages: { "de": `/de/blog/${post.slug}`, "x-default": `/de/blog/${post.slug}` },
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630 }],
      locale: "de_DE",
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function DEBlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostDE(slug);
  if (!post) notFound();

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
      url: "https://www.digidog.org",
    },
    inLanguage: "de",
    datePublished: post.date,
    mainEntityOfPage: `https://www.digidog.org/de/blog/${post.slug}`,
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "de",
    mainEntity: post.faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BlogPostDEClient post={post} />
    </>
  );
}
