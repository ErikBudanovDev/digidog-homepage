import type { Metadata } from "next";
import PortfolioPageClient from "@/app/client-pages/PortfolioPageClient";
import en from "@/translations/english.json";

export const metadata: Metadata = {
  title: en.seo.portfolio.title,
  description: en.seo.portfolio.description,
  alternates: { canonical: "/portfolio", languages: { "en": "/portfolio", "de": "/de/portfolio", "x-default": "/portfolio" } },
  openGraph: { title: en.seo.portfolio.title, description: en.seo.portfolio.description, type: "website", url: "/portfolio", images: [{ url: "/og-default.jpg", width: 1200, height: 630 }] },
};

export default function Page() {
  return <PortfolioPageClient />;
}
