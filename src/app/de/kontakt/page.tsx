import { Metadata } from "next";
import ContactDEClient from "@/app/client-pages/ContactDEClient";

export const metadata: Metadata = {
  title: "Kontakt — Kostenloses Erstgespräch buchen | DigiDog",
  description:
    "Nehmen Sie Kontakt auf für ein kostenloses 30-minütiges Erstgespräch. Wir besprechen Ihre Anforderungen und zeigen Ihnen, wie wir helfen können.",
  alternates: {
    canonical: "/de/kontakt",
    languages: {
      "de": "/de/kontakt",
      "en": "/contact",
    },
  },
  openGraph: {
    title: "Kontakt — Kostenloses Erstgespräch buchen | DigiDog",
    description:
      "Nehmen Sie Kontakt auf für ein kostenloses 30-minütiges Erstgespräch. Wir besprechen Ihre Anforderungen und zeigen Ihnen, wie wir helfen können.",
    url: "/de/kontakt",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function ContactPageDE() {
  return <ContactDEClient />;
}
