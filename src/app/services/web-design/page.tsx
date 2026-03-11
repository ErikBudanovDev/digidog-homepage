import type { Metadata } from "next";
import WebDesignPageClient from "../../client-pages/WebDesignPageClient";
import en from "../../../translations/english.json";

export const metadata: Metadata = {
  title: en.seo.webDesign.title,
  description: en.seo.webDesign.description,
  alternates: { canonical: "/services/web-design" },
  keywords: ["web design agency", "WordPress development agency", "WordPress maintenance service", "full-stack web development", "Next.js development"],
  openGraph: { title: en.seo.webDesign.ogTitle, description: en.seo.webDesign.ogDescription, type: "website" },
  twitter: { card: "summary_large_image", title: en.seo.webDesign.ogTitle, description: en.seo.webDesign.ogDescription },
};

const serviceSchema = {
  "@context": "https://schema.org", "@type": "Service",
  name: "Web Design & WordPress Development",
  provider: { "@type": "Organization", name: "Digidog", url: "https://digidog.org" },
  description: "Custom web design, WordPress development, and full-stack solutions with responsive design, SEO, and ongoing maintenance.",
  serviceType: "Web Development",
  areaServed: [{ "@type": "Country", name: "Germany" }, { "@type": "Country", name: "United States" }, { "@type": "Country", name: "Austria" }],
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does a custom website cost?", acceptedAnswer: { "@type": "Answer", text: "€5,000-€15,000 for a company website, €15,000-€80,000 for e-commerce or web apps. We provide fixed-price quotes." }},
    { "@type": "Question", name: "Do you build WordPress websites?", acceptedAnswer: { "@type": "Answer", text: "Yes. Custom themes, plugins, performance optimization, and maintenance. Also headless WordPress with React/Next.js." }},
    { "@type": "Question", name: "How long does it take?", acceptedAnswer: { "@type": "Answer", text: "Landing page: 2-3 weeks. Company website: 4-8 weeks. Complex web apps: 3-6 months." }},
    { "@type": "Question", name: "Do you offer maintenance?", acceptedAnswer: { "@type": "Answer", text: "Yes — security updates, performance monitoring, content updates. On-demand, no retainer required." }},
    { "@type": "Question", name: "What technologies?", acceptedAnswer: { "@type": "Answer", text: "React, Next.js, TypeScript, Tailwind CSS, WordPress, WooCommerce, Node.js, PostgreSQL." }},
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WebDesignPageClient />
    </>
  );
}
