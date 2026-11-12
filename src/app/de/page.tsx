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
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function HomePageDE() {
  return <HomeDEClient />;
}
