import type { Metadata } from "next";
import AiIntegrationPageClient from "../../client-pages/AiIntegrationPageClient";
import en from "../../../translations/english.json";

export const metadata: Metadata = {
  title: en.seo.aiIntegration.title,
  description: en.seo.aiIntegration.description,
  alternates: { canonical: "/services/ai-integration" },
  keywords: ["AI automation agency", "AI integration consulting", "AI workflow automation", "MCP server development", "CRM AI integration"],
  openGraph: { title: en.seo.aiIntegration.ogTitle, description: en.seo.aiIntegration.ogDescription, type: "website" },
  twitter: { card: "summary_large_image", title: en.seo.aiIntegration.ogTitle, description: en.seo.aiIntegration.ogDescription },
};

const serviceSchema = {
  "@context": "https://schema.org", "@type": "Service",
  name: "AI Integration & Workflow Automation",
  provider: { "@type": "Organization", name: "Digidog", url: "https://digidog.org" },
  description: "AI automation consulting and implementation for mid-size companies.",
  serviceType: "AI Consulting",
  areaServed: [{ "@type": "Country", name: "Germany" }, { "@type": "Country", name: "United States" }, { "@type": "Country", name: "Austria" }],
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is AI automation and how can it help my business?", acceptedAnswer: { "@type": "Answer", text: "AI automation handles repetitive tasks like lead qualification, data entry, email responses, and CRM updates. For mid-size companies, this saves 30-60% of time on manual processes, with ROI in 3-4 months." }},
    { "@type": "Question", name: "What is an MCP server?", acceptedAnswer: { "@type": "Answer", text: "MCP (Model Context Protocol) lets AI assistants connect to your business tools — CRM, email, databases, project management. It turns AI from a chatbot into an operational team member." }},
    { "@type": "Question", name: "How much does AI automation cost?", acceptedAnswer: { "@type": "Answer", text: "Typical projects cost €10,000-€25,000 for implementation, €300-€800/month maintenance. Payback is usually 2-4 months." }},
    { "@type": "Question", name: "How long does implementation take?", acceptedAnswer: { "@type": "Answer", text: "A pilot deploys in 2-4 weeks. Full implementation across multiple workflows takes 2-3 months." }},
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AiIntegrationPageClient />
    </>
  );
}
