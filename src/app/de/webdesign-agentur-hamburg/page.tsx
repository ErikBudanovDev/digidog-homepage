/* ─────────────────────────────────────────────
 * /de/webdesign-agentur-hamburg — German Web Design page
 * Same design as /services/web-design, German locale
 * Target: "webdesign agentur hamburg" (KD 0, 600 vol)
 * ───────────────────────────────────────────── */
import type { Metadata } from "next";
import WebDesignDEClient from "../../client-pages/WebDesignDEClient";

export const metadata: Metadata = {
  title: "Webdesign Agentur Hamburg — Professionelle Websites & Webentwicklung",
  description:
    "Ihre Webdesign Agentur für Hamburg: Maßgeschneiderte Websites, moderne Webentwicklung mit React & Next.js, UX/UI Design und SEO-Optimierung. Kostenloses Erstgespräch.",
  alternates: {
    canonical: "/de/webdesign-agentur-hamburg",
    languages: { de: "/de/webdesign-agentur-hamburg", en: "/services/web-design" },
  },
  keywords: ["webdesign agentur hamburg", "webdesign hamburg", "webentwicklung hamburg", "website erstellen hamburg", "webagentur hamburg"],
  openGraph: {
    title: "Webdesign Agentur Hamburg — DigiDog",
    description: "Professionelle Websites und Webentwicklung für Unternehmen in Hamburg. React, Next.js, UX/UI Design.",
    type: "website",
    locale: "de_DE",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DigiDog — Webdesign Agentur Hamburg",
  description: "Professionelle Webdesign Agentur für Hamburg. Maßgeschneiderte Websites mit React, Next.js und modernen Technologien.",
  url: "https://digidog.org/de/webdesign-agentur-hamburg",
  areaServed: { "@type": "City", name: "Hamburg", "@id": "https://www.wikidata.org/wiki/Q1055" },
  serviceType: ["Webdesign", "Webentwicklung", "UX/UI Design", "SEO"],
  priceRange: "€€",
  availableLanguage: ["de", "en"],
  parentOrganization: { "@type": "Organization", name: "DigiDog", url: "https://digidog.org" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Was kostet eine professionelle Website in Hamburg?", acceptedAnswer: { "@type": "Answer", text: "Ab 3.000 € für eine Unternehmenswebsite. Komplexe E-Commerce- oder Web-App-Projekte ab 15.000 €. Transparente Festpreise nach kostenlosem Erstgespräch." }},
    { "@type": "Question", name: "Wie lange dauert die Entwicklung?", acceptedAnswer: { "@type": "Answer", text: "Landing Page: 2-3 Wochen. Firmenwebsite: 4-8 Wochen. Komplexe Web-Apps: 3-6 Monate." }},
    { "@type": "Question", name: "Welche Technologien setzt ihr ein?", acceptedAnswer: { "@type": "Answer", text: "React, Next.js, TypeScript, Tailwind CSS, WordPress, Node.js, PostgreSQL und weitere moderne Technologien." }},
    { "@type": "Question", name: "Bietet ihr auch Wartung an?", acceptedAnswer: { "@type": "Answer", text: "Ja — Sicherheitsupdates, Performance-Monitoring, Content-Updates. Flexibel ohne Vertragsbindung." }},
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WebDesignDEClient />
    </>
  );
}
