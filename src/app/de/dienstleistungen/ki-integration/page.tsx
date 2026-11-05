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

export default function AiIntegrationPageDE() {
  return <AiIntegrationDEClient />;
}
