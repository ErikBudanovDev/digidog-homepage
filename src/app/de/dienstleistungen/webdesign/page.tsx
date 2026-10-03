import de from "@/translations/german.json";
import { Metadata } from "next";
import WebDesignDEClient from "@/app/client-pages/WebDesignDEClient";

export const metadata: Metadata = {
  title: de.seo.webDesign.title,
  description: de.seo.webDesign.description,
  keywords: ["webdesign agentur", "webdesign", "webentwicklung", "website erstellen lassen", "webagentur"],
  alternates: {
    canonical: "/de/dienstleistungen/webdesign",
    languages: {
      "de": "/de/dienstleistungen/webdesign",
      "en": "/services/web-design",
      "x-default": "/services/web-design",
    },
  },
  openGraph: {
    title: de.seo.webDesign.title,
    description: de.seo.webDesign.description,
    url: "/de/dienstleistungen/webdesign",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function WebDesignPageDE() {
  return <WebDesignDEClient />;
}
