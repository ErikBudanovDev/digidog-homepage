import { Metadata } from "next";
import AboutDEClient from "@/app/client-pages/AboutDEClient";

export const metadata: Metadata = {
  title: "Über uns — Das DigiDog Team | DigiDog",
  description:
    "Lernen Sie das Team hinter DigiDog kennen. KI-Experten und Full-Stack-Entwickler mit Leidenschaft für digitale Innovation.",
  alternates: {
    canonical: "/de/ueber-uns",
    languages: {
      "de": "/de/ueber-uns",
      "en": "/about",
    },
  },
  openGraph: {
    title: "Über uns — Das DigiDog Team | DigiDog",
    description:
      "Lernen Sie das Team hinter DigiDog kennen. KI-Experten und Full-Stack-Entwickler mit Leidenschaft für digitale Innovation.",
    url: "/de/ueber-uns",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function AboutPageDE() {
  return <AboutDEClient />;
}
