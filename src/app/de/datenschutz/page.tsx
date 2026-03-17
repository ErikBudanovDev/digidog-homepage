import { Metadata } from "next";
import PrivacyDEClient from "@/app/client-pages/PrivacyDEClient";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | DigiDog",
  description: "Datenschutzerklärung der DigiDog LLC gemäß DSGVO.",
  alternates: {
    canonical: "/de/datenschutz",
  },
  openGraph: {
    title: "Datenschutzerklärung | DigiDog",
    description: "Datenschutzerklärung der DigiDog LLC gemäß DSGVO.",
    url: "/de/datenschutz",
    locale: "de_DE",
  },
};

export default function PrivacyPageDE() {
  return <PrivacyDEClient />;
}
