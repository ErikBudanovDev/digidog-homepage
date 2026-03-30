import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { projectsMeta } from "@/lib/portfolio-meta";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://digidog.org";
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    // English pages
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/services/ai-integration`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/ai-solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/web-design`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/custom-software`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/imprint`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    
    // German pages
    { url: `${baseUrl}/de`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/de/dienstleistungen/ki-loesungen`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/de/dienstleistungen/ki-integration`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/de/dienstleistungen/webdesign`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/de/dienstleistungen/individuelle-software`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/de/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/de/ueber-uns`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/de/kontakt`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/de/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/de/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/de/agb`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    
    // German landing pages
    { url: `${baseUrl}/de/webdesign-agentur-berlin`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/de/webdesign-agentur-hamburg`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const portfolioPages: MetadataRoute.Sitemap = projectsMeta.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...portfolioPages];
}
