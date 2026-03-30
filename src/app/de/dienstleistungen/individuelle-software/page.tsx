import { Metadata } from "next";
import CustomSoftwareDEClient from "@/app/client-pages/CustomSoftwareDEClient";

export const metadata: Metadata = {
  title: "Individuelle Softwareentwicklung | DigiDog",
  description:
    "Maßgeschneiderte Software, API-Integrationen und SaaS-Plattformen. Von internen Tools bis zu kompletten Geschäftsanwendungen.",
  alternates: {
    canonical: "/de/dienstleistungen/individuelle-software",
    languages: {
      "de": "/de/dienstleistungen/individuelle-software",
      "en": "/services/custom-software",
      "x-default": "/services/custom-software",
    },
  },
  openGraph: {
    title: "Individuelle Softwareentwicklung | DigiDog",
    description:
      "Maßgeschneiderte Software, API-Integrationen und SaaS-Plattformen. Von internen Tools bis zu kompletten Geschäftsanwendungen.",
    url: "/de/dienstleistungen/individuelle-software",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function CustomSoftwarePageDE() {
  return <CustomSoftwareDEClient />;
}
