import type { Metadata } from "next";
import CustomSoftwarePageClient from "../../client-pages/CustomSoftwarePageClient";
import en from "../../../translations/english.json";

export const metadata: Metadata = {
  title: en.seo.customSoftware.title,
  description: en.seo.customSoftware.description,
  alternates: { canonical: "/services/custom-software" },
  keywords: ["custom software development agency", "internal tools development", "SaaS platform development", "API integration"],
  openGraph: { title: en.seo.customSoftware.ogTitle, description: en.seo.customSoftware.ogDescription, type: "website" },
  twitter: { card: "summary_large_image", title: en.seo.customSoftware.ogTitle, description: en.seo.customSoftware.ogDescription },
};

const serviceSchema = {
  "@context": "https://schema.org", "@type": "Service",
  name: "Custom Software Development",
  provider: { "@type": "Organization", name: "Digidog", url: "https://www.digidog.org" },
  description: "Custom software for mid-size companies including internal tools, API integrations, SaaS platforms, and dashboards.",
  serviceType: "Software Development",
  areaServed: [{ "@type": "Country", name: "Germany" }, { "@type": "Country", name: "United States" }, { "@type": "Country", name: "Austria" }],
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "When should I build custom vs buy SaaS?", acceptedAnswer: { "@type": "Answer", text: "Build custom when workflows are unique, it's a competitive differentiator, or 3-5 year SaaS cost exceeds custom. Breakeven is typically 2.5-3 years." }},
    { "@type": "Question", name: "How much does custom software cost?", acceptedAnswer: { "@type": "Answer", text: "€15,000 for simple internal tools to €80,000+ for complex SaaS. We recommend starting with an MVP." }},
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CustomSoftwarePageClient />
    </>
  );
}
