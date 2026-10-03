import de from "@/translations/german.json";
import { Metadata } from "next";
import HomeDEClient from "@/app/client-pages/HomeDEClient";

export const metadata: Metadata = {
  title: de.seo.home.title,
  description: de.seo.home.description,
  alternates: {
    canonical: "/de",
    languages: {
      "de": "/de",
      "en": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: de.seo.home.title,
    description: de.seo.home.description,
    url: "/de",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function HomePageDE() {
  return <HomeDEClient />;
}
