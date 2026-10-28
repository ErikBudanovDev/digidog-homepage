import { Metadata } from "next";
import AiIntegrationDEClient from "@/app/client-pages/AiIntegrationDEClient";

export const metadata: Metadata = {
  title: "KI-Beratung & KI-Integration für Unternehmen",
  description:
    "KI-Agentur für Unternehmen in Deutschland, Österreich und der Schweiz: Claude, KI-Agenten und MCP, verbunden mit CRM, E-Mail, Buchungen und Analytics. Echte Projekte, kostenloser KI-Prozess-Check.",
  keywords: ["KI-Beratung", "KI-Agentur", "KI-Integration", "KI für Unternehmen", "KI-Agenten", "Claude Integration", "KI-Beratung Österreich", "MCP-Server"],
  alternates: {
    canonical: "/de/dienstleistungen/ki-integration",
    languages: {
      "de": "/de/dienstleistungen/ki-integration",
      "en": "/services/ai-integration",
      "x-default": "/services/ai-integration",
    },
  },
  openGraph: {
    title: "KI-Beratung & KI-Integration für Unternehmen | DigiDog",
    description:
      "KI-Agentur für Unternehmen in Deutschland, Österreich und der Schweiz: Claude, KI-Agenten und MCP, verbunden mit CRM, E-Mail, Buchungen und Analytics. Echte Projekte, kostenloser KI-Prozess-Check.",
    url: "/de/dienstleistungen/ki-integration",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function AiIntegrationPageDE() {
  return <AiIntegrationDEClient />;
}
