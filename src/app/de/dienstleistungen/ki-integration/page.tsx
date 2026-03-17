import { Metadata } from "next";
import AiIntegrationDEClient from "@/app/client-pages/AiIntegrationDEClient";

export const metadata: Metadata = {
  title: "KI-Integration in bestehende Systeme | DigiDog",
  description:
    "Wir integrieren künstliche Intelligenz in Ihre bestehenden Geschäftsprozesse und Systeme. MCP-Server, API-Integrationen und Workflow-Automatisierung.",
  alternates: {
    canonical: "/de/dienstleistungen/ki-integration",
    languages: {
      "de": "/de/dienstleistungen/ki-integration",
      "en": "/services/ai-integration",
    },
  },
  openGraph: {
    title: "KI-Integration in bestehende Systeme | DigiDog",
    description:
      "Wir integrieren künstliche Intelligenz in Ihre bestehenden Geschäftsprozesse und Systeme. MCP-Server, API-Integrationen und Workflow-Automatisierung.",
    url: "/de/dienstleistungen/ki-integration",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function AiIntegrationPageDE() {
  return <AiIntegrationDEClient />;
}
