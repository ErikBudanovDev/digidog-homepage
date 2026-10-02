import de from "@/translations/german.json";
import { Metadata } from "next";
import ContactDEClient from "@/app/client-pages/ContactDEClient";

export const metadata: Metadata = {
  title: de.seo.contact.title,
  description: de.seo.contact.description,
  alternates: {
    canonical: "/de/kontakt",
    languages: {
      "de": "/de/kontakt",
      "en": "/contact",
      "x-default": "/contact",
    },
  },
  openGraph: {
    title: de.seo.contact.title,
    description: de.seo.contact.description,
    url: "/de/kontakt",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function ContactPageDE() {
  return <ContactDEClient />;
}
