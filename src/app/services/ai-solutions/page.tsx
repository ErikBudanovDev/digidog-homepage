import type { Metadata } from "next";
import AiSolutionsPageClient from "../../client-pages/AiSolutionsPageClient";
import en from "../../../translations/english.json";

export const metadata: Metadata = {
  title: en.seo.aiSolutions.title,
  description: en.seo.aiSolutions.description,
  alternates: { canonical: "/services/ai-solutions" },
  keywords: ["custom AI solutions", "AI development agency", "machine learning development", "NLP development", "LLM integration", "KI Beratung"],
  openGraph: { title: en.seo.aiSolutions.ogTitle, description: en.seo.aiSolutions.ogDescription, type: "website" },
  twitter: { card: "summary_large_image", title: en.seo.aiSolutions.ogTitle, description: en.seo.aiSolutions.ogDescription },
};

const serviceSchema = {
  "@context": "https://schema.org", "@type": "Service",
  name: "Custom AI Solutions & Machine Learning",
  provider: { "@type": "Organization", name: "Digidog", url: "https://digidog.org" },
  description: "Custom AI development including ML models, NLP, computer vision, and LLM integration.",
  serviceType: "AI Development",
  areaServed: [{ "@type": "Country", name: "Germany" }, { "@type": "Country", name: "United States" }, { "@type": "Country", name: "Austria" }],
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What types of AI solutions do you build?", acceptedAnswer: { "@type": "Answer", text: "ML models for classification/prediction, NLP for text analysis, computer vision, LLM-powered apps using Claude and GPT, and predictive analytics dashboards." }},
    { "@type": "Question", name: "Do I need a large dataset?", acceptedAnswer: { "@type": "Answer", text: "Not necessarily. Modern LLMs deliver value with minimal data through few-shot prompting. For custom ML, we need a few hundred labeled examples minimum." }},
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AiSolutionsPageClient />
    </>
  );
}
