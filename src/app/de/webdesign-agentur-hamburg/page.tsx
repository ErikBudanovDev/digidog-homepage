/* ─────────────────────────────────────────────
 * /de/webdesign-agentur-hamburg — SSR page
 * Target keyword: "webdesign agentur hamburg" (KD 0, 600 vol)
 * ───────────────────────────────────────────── */
import type { Metadata } from "next";
import WebDesignDEClient from "../../client-pages/WebDesignDEClient";

export const metadata: Metadata = {
  title: "Webdesign Agentur Hamburg — Professionelle Websites & Webentwicklung | DigiDog",
  description:
    "Ihre Webdesign Agentur für Hamburg: Maßgeschneiderte Websites, moderne Webentwicklung mit React & Next.js, UX/UI Design und SEO. Kostenlose Erstberatung.",
  alternates: {
    canonical: "/de/webdesign-agentur-hamburg",
    languages: {
      "de": "/de/webdesign-agentur-hamburg",
      "en": "/services/web-design",
    },
  },
  openGraph: {
    title: "Webdesign Agentur Hamburg — DigiDog",
    description: "Professionelle Websites und Webentwicklung für Unternehmen in Hamburg. React, Next.js, UX/UI Design.",
    type: "website",
    locale: "de_DE",
  },
};

const hamburgConfig = {
  city: "Hamburg",
  citySlug: "hamburg",
  heroTitle: "Webdesign Agentur Hamburg — Websites, die überzeugen",
  heroSubtitle:
    "Professionelle Webentwicklung für Hamburger Unternehmen. Modernes Design, schnelle Performance und eine klare Strategie — von der ersten Idee bis zum Go-Live.",
  introText:
    "Hamburg ist eine der wichtigsten Wirtschaftsmetropolen Europas — und Ihr digitaler Auftritt muss diesem Anspruch gerecht werden. Als Webdesign Agentur mit Fokus auf den Hamburger Markt entwickeln wir Websites, die nicht nur gut aussehen, sondern messbare Geschäftsergebnisse liefern. Ob Logistikunternehmen in der HafenCity, E-Commerce-Firma in Altona oder Beratungsunternehmen in der Innenstadt: Wir verstehen die Anforderungen verschiedener Branchen und entwickeln digitale Lösungen, die Ihre Zielgruppe begeistern. Mit modernen Technologien wie React und Next.js setzen wir auf Performance, Sicherheit und Skalierbarkeit — genau das, was Hamburger Unternehmen von einer professionellen Webdesign Agentur erwarten.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DigiDog — Webdesign Agentur Hamburg",
  description: "Professionelle Webdesign Agentur für Hamburg. Maßgeschneiderte Websites mit React, Next.js und modernen Technologien.",
  url: "https://www.digidog.org/de/webdesign-agentur-hamburg",
  areaServed: { "@type": "City", name: "Hamburg", "@id": "https://www.wikidata.org/wiki/Q1055" },
  serviceType: ["Webdesign", "Webentwicklung", "UX/UI Design", "SEO"],
  priceRange: "€€",
  availableLanguage: ["de", "en"],
  parentOrganization: {
    "@type": "Organization",
    name: "DigiDog",
    url: "https://www.digidog.org",
  },
};

export default function WebdesignAgenturHamburgPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebDesignDEClient config={hamburgConfig} />
    </>
  );
}
