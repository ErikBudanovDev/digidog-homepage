import { Metadata } from "next";
import AiIntegrationDEClient from "@/app/client-pages/AiIntegrationDEClient";

export const metadata: Metadata = {
  title: "KI-Integration für Unternehmen: Claude, MCP & KI-Agenten",
  description:
    "KI-Integration für Unternehmen in Deutschland, Österreich und der Schweiz: Claude, KI-Agenten und MCP, verbunden mit CRM, E-Mail, Buchungen und Analytics. Echte Projekte, kostenloser KI-Prozess-Check.",
  keywords: ["KI-Integration", "KI-Beratung", "KI für Unternehmen", "KI-Agenten", "Claude Integration", "KI-Beratung Österreich", "MCP-Server"],
  alternates: {
    canonical: "/de/dienstleistungen/ki-integration",
    languages: {
      "de": "/de/dienstleistungen/ki-integration",
      "en": "/services/ai-integration",
      "x-default": "/services/ai-integration",
    },
  },
  openGraph: {
    title: "KI-Integration für Unternehmen: Claude, MCP & KI-Agenten | DigiDog",
    description:
      "KI-Integration für Unternehmen in Deutschland, Österreich und der Schweiz: Claude, KI-Agenten und MCP, verbunden mit CRM, E-Mail, Buchungen und Analytics. Echte Projekte, kostenloser KI-Prozess-Check.",
    url: "/de/dienstleistungen/ki-integration",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "KI-Integration & KI-Agenten für Unternehmen",
  serviceType: "KI-Beratung und KI-Integration",
  inLanguage: "de",
  url: "https://digidog.org/de/dienstleistungen/ki-integration",
  provider: { "@id": "https://digidog.org/#org" },
  description: "Claude, KI-Agenten und MCP, verbunden mit CRM, E-Mail, Buchungen und Analytics. Kostenloser KI-Prozess-Check, Pilot zum Festpreis in 2 bis 3 Wochen.",
  areaServed: [
    { "@type": "Country", name: "Deutschland" },
    { "@type": "Country", name: "Österreich" },
    { "@type": "Country", name: "Schweiz" },
  ],
};

export default function AiIntegrationPageDE() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AiIntegrationDEClient />
    </>
  );
}
