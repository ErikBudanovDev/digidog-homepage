import { Metadata } from "next";
import TermsDEClient from "@/app/client-pages/TermsDEClient";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen | DigiDog",
  description: "AGB der DigiDog LLC.",
  alternates: {
    canonical: "/de/agb",
  },
  openGraph: {
    title: "Allgemeine Geschäftsbedingungen | DigiDog",
    description: "AGB der DigiDog LLC.",
    url: "/de/agb",
    locale: "de_DE",
  },
};

export default function TermsPageDE() {
  return <TermsDEClient />;
}
