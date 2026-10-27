import type { Metadata } from "next";
import AiIntegrationPageClient from "@/app/client-pages/AiIntegrationPageClient";
import en from "@/translations/english.json";

export const metadata: Metadata = {
  title: en.seo.aiIntegration.title,
  description: en.seo.aiIntegration.description,
  alternates: { canonical: "/services/ai-integration", languages: { "en": "/services/ai-integration", "de": "/de/dienstleistungen/ki-integration", "x-default": "/services/ai-integration" } },
  keywords: ["AI integration services", "AI consultant", "AI consulting for business", "Claude integration", "Claude consulting", "AI agents for business", "MCP server development", "CRM AI integration"],
  openGraph: { title: en.seo.aiIntegration.ogTitle, description: en.seo.aiIntegration.ogDescription, type: "website", url: "/services/ai-integration", images: [{ url: "/og-default.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: en.seo.aiIntegration.ogTitle, description: en.seo.aiIntegration.ogDescription },
};

const serviceSchema = {
  "@context": "https://schema.org", "@type": "Service",
  name: "AI Integration Services & Claude Consulting",
  provider: { "@type": "Organization", name: "Digidog", url: "https://digidog.org" },
  description: "AI automation consulting and implementation for mid-size companies.",
  serviceType: "AI Consulting",
  areaServed: [{ "@type": "Country", name: "United States" }, { "@type": "Country", name: "United Kingdom" }, { "@type": "Country", name: "Germany" }, { "@type": "Country", name: "Austria" }, { "@type": "Country", name: "Switzerland" }],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AiIntegrationPageClient />
    </>
  );
}
