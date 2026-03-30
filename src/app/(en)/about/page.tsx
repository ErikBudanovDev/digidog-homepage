import type { Metadata } from "next";
import AboutPageClient from "@/app/client-pages/AboutPageClient";
import en from "@/translations/english.json";

export const metadata: Metadata = {
  title: en.seo.about.title,
  description: en.seo.about.description,
  alternates: { canonical: "/about", languages: { "en": "/about", "de": "/de/ueber-uns", "x-default": "/about" } },
  openGraph: { title: en.seo.about.title, description: en.seo.about.description, type: "website", url: "/about", images: [{ url: "/og-default.jpg", width: 1200, height: 630 }] },
};

export default function Page() {
  return <AboutPageClient />;
}
