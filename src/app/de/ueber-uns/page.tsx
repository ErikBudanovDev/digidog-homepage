import de from "@/translations/german.json";
import { Metadata } from "next";
import AboutDEClient from "@/app/client-pages/AboutDEClient";

export const metadata: Metadata = {
  title: de.seo.about.title,
  description: de.seo.about.description,
  alternates: {
    canonical: "/de/ueber-uns",
    languages: {
      "de": "/de/ueber-uns",
      "en": "/about",
      "x-default": "/about",
    },
  },
  openGraph: {
    title: de.seo.about.title,
    description: de.seo.about.description,
    url: "/de/ueber-uns",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function AboutPageDE() {
  return <AboutDEClient />;
}
