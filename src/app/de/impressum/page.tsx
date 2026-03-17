import { Metadata } from "next";
import ImprintDEClient from "@/app/client-pages/ImprintDEClient";

export const metadata: Metadata = {
  title: "Impressum | DigiDog",
  description: "Impressum der DigiDog LLC gemäß § 5 TMG.",
  alternates: {
    canonical: "/de/impressum",
  },
  openGraph: {
    title: "Impressum | DigiDog",
    description: "Impressum der DigiDog LLC gemäß § 5 TMG.",
    url: "/de/impressum",
    locale: "de_DE",
  },
};

export default function ImprintPageDE() {
  return <ImprintDEClient />;
}
