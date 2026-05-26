import { Metadata } from "next";
import HomeDEClient from "@/app/client-pages/HomeDEClient";

export const metadata: Metadata = {
  title: "KI-Operations-Systeme für den Mittelstand",
  description:
    "Wir ersetzen aufgeblähte SaaS-Stacks durch KI-gestützte Operations-Systeme. Automatisierte Workflows, eigene Infrastruktur, planbare Kosten — gebaut für mittelständische Unternehmen.",
  alternates: {
    canonical: "/de",
    languages: {
      "de": "/de",
      "en": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "KI-Operations-Systeme für den Mittelstand | Digidog",
    description:
      "Wir ersetzen aufgeblähte SaaS-Stacks durch KI-gestützte Operations-Systeme. Automatisierte Workflows, eigene Infrastruktur, planbare Kosten.",
    url: "/de",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function HomePageDE() {
  return <HomeDEClient />;
}
