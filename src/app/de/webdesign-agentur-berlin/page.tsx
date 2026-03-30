/* ─────────────────────────────────────────────
 * /de/webdesign-agentur-berlin — German Web Design page
 * Same design as /services/web-design, German locale
 * Target: "webdesign agentur berlin" (KD 6, 1300 vol)
 * ───────────────────────────────────────────── */
import type { Metadata } from "next";
import WebDesignDEClient from "../../client-pages/WebDesignDEClient";

export const metadata: Metadata = {
  title: "Webdesign Agentur Berlin — Websites & Webentwicklung",
  description:
    "Ihre Webdesign Agentur in Berlin: Maßgeschneiderte Websites, moderne Webentwicklung mit React & Next.js, UX/UI Design und SEO-Optimierung. Kostenloses Erstgespräch.",
  alternates: {
    canonical: "/de/webdesign-agentur-berlin",
    languages: { de: "/de/webdesign-agentur-berlin", en: "/services/web-design" },
  },
  keywords: ["webdesign agentur berlin", "webdesign berlin", "webentwicklung berlin", "website erstellen berlin", "webagentur berlin"],
  openGraph: {
    title: "Webdesign Agentur Berlin — DigiDog",
    description: "Professionelle Websites und Webentwicklung für Unternehmen in Berlin. React, Next.js, UX/UI Design.",
    type: "website",
    locale: "de_DE",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DigiDog — Webdesign Agentur Berlin",
  description: "Professionelle Webdesign Agentur in Berlin. Maßgeschneiderte Websites mit React, Next.js und modernen Technologien.",
  url: "https://digidog.org/de/webdesign-agentur-berlin",
  image: "https://digidog.org/og-default.jpg",
  address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
  areaServed: { "@type": "City", name: "Berlin", "@id": "https://www.wikidata.org/wiki/Q64" },
  serviceType: ["Webdesign", "Webentwicklung", "UX/UI Design", "SEO"],
  priceRange: "€€",
  availableLanguage: ["de", "en"],
  parentOrganization: { "@type": "Organization", name: "DigiDog", url: "https://digidog.org" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Was kostet eine professionelle Website?", acceptedAnswer: { "@type": "Answer", text: "Ab 3.000 € für eine Unternehmenswebsite. Komplexe E-Commerce- oder Web-App-Projekte ab 15.000 €. Transparente Festpreise nach kostenlosem Erstgespräch." }},
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
