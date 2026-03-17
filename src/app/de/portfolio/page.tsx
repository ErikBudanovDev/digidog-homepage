import { Metadata } from "next";
import PortfolioDEClient from "@/app/client-pages/PortfolioDEClient";

export const metadata: Metadata = {
  title: "Portfolio — Unsere Projekte | DigiDog",
  description:
    "Ausgewählte Projekte aus den Bereichen KI-Automatisierung, Webentwicklung und individuelle Software.",
  alternates: {
    canonical: "/de/portfolio",
    languages: {
      "de": "/de/portfolio",
      "en": "/portfolio",
    },
  },
  openGraph: {
    title: "Portfolio — Unsere Projekte | DigiDog",
    description:
      "Ausgewählte Projekte aus den Bereichen KI-Automatisierung, Webentwicklung und individuelle Software.",
    url: "/de/portfolio",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function PortfolioPageDE() {
  return <PortfolioDEClient />;
}
