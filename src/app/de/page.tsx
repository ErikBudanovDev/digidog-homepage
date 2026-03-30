import { Metadata } from "next";
import HomeDEClient from "@/app/client-pages/HomeDEClient";

export const metadata: Metadata = {
  title: "DigiDog — KI-Automatisierung & Webentwicklung Agentur",
  description:
    "KI-Beratung und Full-Stack Webentwicklung für mittelständische Unternehmen. Maßgeschneiderte KI-Automatisierungen, Websites und Software.",
  alternates: {
    canonical: "/de",
    languages: {
      "de": "/de",
      "en": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "DigiDog — KI-Automatisierung & Webentwicklung Agentur",
    description:
      "KI-Beratung und Full-Stack Webentwicklung für mittelständische Unternehmen. Maßgeschneiderte KI-Automatisierungen, Websites und Software.",
    url: "/de",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function HomePageDE() {
  return <HomeDEClient />;
}
