/* ─────────────────────────────────────────────
 * /de/webdesign-agentur-berlin — SSR page
 * Target keyword: "webdesign agentur berlin" (KD 6, 1300 vol)
 * ───────────────────────────────────────────── */
import type { Metadata } from "next";
import WebDesignDEClient from "../../client-pages/WebDesignDEClient";

export const metadata: Metadata = {
  title: "Webdesign Agentur Berlin — Professionelle Websites & Webentwicklung | DigiDog",
  description:
    "Ihre Webdesign Agentur in Berlin: Maßgeschneiderte Websites, moderne Webentwicklung mit React & Next.js, UX/UI Design und SEO. Kostenlose Erstberatung.",
  alternates: {
    canonical: "/de/webdesign-agentur-berlin",
    languages: {
      "de": "/de/webdesign-agentur-berlin",
      "en": "/services/web-design",
    },
  },
  openGraph: {
    title: "Webdesign Agentur Berlin — DigiDog",
    description: "Professionelle Websites und Webentwicklung für Unternehmen in Berlin. React, Next.js, UX/UI Design.",
    type: "website",
    locale: "de_DE",
  },
};

const berlinConfig = {
  city: "Berlin",
  citySlug: "berlin",
  heroTitle: "Webdesign Agentur Berlin — Websites, die verkaufen",
  heroSubtitle:
    "Wir gestalten und entwickeln professionelle Websites für Unternehmen in Berlin. Modernes Design, schnelle Ladezeiten und messbare Ergebnisse — von der Beratung bis zum Launch.",
  introText:
    "Berlin ist Deutschlands Startup-Hauptstadt und ein hart umkämpfter Markt. Ihr Unternehmen braucht mehr als eine hübsche Website — Sie brauchen eine digitale Plattform, die Besucher in Kunden verwandelt. Als Webdesign Agentur mit Fokus auf Berlin kombinieren wir modernes Design mit modernster Technologie. Ob Startup im Prenzlauer Berg, Agentur in Kreuzberg oder Mittelständler in Charlottenburg: Wir entwickeln Websites, die Ihre Zielgruppe ansprechen und Ihre Geschäftsziele erreichen. Mit React, Next.js und KI-gestützten Workflows liefern wir schneller und effizienter als traditionelle Agenturen — ohne Kompromisse bei der Qualität.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DigiDog — Webdesign Agentur Berlin",
  description: "Professionelle Webdesign Agentur in Berlin. Maßgeschneiderte Websites mit React, Next.js und modernen Technologien.",
  url: "https://www.digidog.org/de/webdesign-agentur-berlin",
  areaServed: { "@type": "City", name: "Berlin", "@id": "https://www.wikidata.org/wiki/Q64" },
  serviceType: ["Webdesign", "Webentwicklung", "UX/UI Design", "SEO"],
  priceRange: "€€",
  availableLanguage: ["de", "en"],
  parentOrganization: {
    "@type": "Organization",
    name: "DigiDog",
    url: "https://www.digidog.org",
  },
};

export default function WebdesignAgenturBerlinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebDesignDEClient config={berlinConfig} />
    </>
  );
}
