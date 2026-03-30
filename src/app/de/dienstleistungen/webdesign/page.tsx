import { Metadata } from "next";
import WebDesignDEClient from "@/app/client-pages/WebDesignDEClient";

export const metadata: Metadata = {
  title: "Webdesign Agentur — Professionelle Websites & Webentwicklung | DigiDog",
  description:
    "Ihre Webdesign Agentur: Maßgeschneiderte Websites, moderne Webentwicklung mit React & Next.js, UX/UI Design und SEO-Optimierung. Kostenloses Erstgespräch.",
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
    title: "Webdesign Agentur — Professionelle Websites & Webentwicklung | DigiDog",
    description:
      "Ihre Webdesign Agentur: Maßgeschneiderte Websites, moderne Webentwicklung mit React & Next.js, UX/UI Design und SEO-Optimierung. Kostenloses Erstgespräch.",
    url: "/de/dienstleistungen/webdesign",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function WebDesignPageDE() {
  return <WebDesignDEClient />;
}
