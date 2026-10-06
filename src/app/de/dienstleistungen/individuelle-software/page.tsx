import { Metadata } from "next";
import CustomSoftwareDEClient from "@/app/client-pages/CustomSoftwareDEClient";

export const metadata: Metadata = {
  title: "Individuelle Software & MVP-Entwicklung",
  description:
    "Individuelle Webanwendungen, MVPs und Integrationen für konkrete Geschäftsprozesse. Klarer Umfang und direkte technische Verantwortung mit Erik Budanov.",
  alternates: {
    canonical: "/de/dienstleistungen/individuelle-software",
    languages: {
      "de": "/de/dienstleistungen/individuelle-software",
      "en": "/services/custom-software",
      "x-default": "/services/custom-software",
    },
  },
  openGraph: {
    title: "Individuelle Software & MVP-Entwicklung",
    description:
      "Individuelle Webanwendungen, MVPs und Integrationen für konkrete Geschäftsprozesse. Klarer Umfang und direkte technische Verantwortung mit Erik Budanov.",
    url: "/de/dienstleistungen/individuelle-software",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function CustomSoftwarePageDE() {
  return <CustomSoftwareDEClient />;
}
