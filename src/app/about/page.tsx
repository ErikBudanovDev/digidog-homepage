import type { Metadata } from "next";
import AboutPageClient from "../client-pages/AboutPageClient";
import en from "../../translations/english.json";

export const metadata: Metadata = {
  title: en.seo.about.title,
  description: en.seo.about.description,
  alternates: { canonical: "/about" },
  openGraph: { title: en.seo.about.title, description: en.seo.about.description, type: "website" },
};

export default function Page() {
  return <AboutPageClient />;
}
