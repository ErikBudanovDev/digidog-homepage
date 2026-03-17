import { Metadata } from "next";
import AiSolutionsDEClient from "@/app/client-pages/AiSolutionsDEClient";

export const metadata: Metadata = {
  title: "KI-Lösungen & Automatisierung für Unternehmen | DigiDog",
  description:
    "Maßgeschneiderte KI-Lösungen: Chatbots, Predictive Analytics, Computer Vision und Prozessautomatisierung für mittelständische Unternehmen.",
  alternates: {
    canonical: "/de/dienstleistungen/ki-loesungen",
    languages: {
      "de": "/de/dienstleistungen/ki-loesungen",
      "en": "/services/ai-solutions",
    },
  },
  openGraph: {
    title: "KI-Lösungen & Automatisierung für Unternehmen | DigiDog",
    description:
      "Maßgeschneiderte KI-Lösungen: Chatbots, Predictive Analytics, Computer Vision und Prozessautomatisierung für mittelständische Unternehmen.",
    url: "/de/dienstleistungen/ki-loesungen",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function AiSolutionsPageDE() {
  return <AiSolutionsDEClient />;
}
