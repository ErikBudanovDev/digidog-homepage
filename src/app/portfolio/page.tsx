import type { Metadata } from "next";
import PortfolioPageClient from "../client-pages/PortfolioPageClient";
import en from "../../translations/english.json";

export const metadata: Metadata = {
  title: en.seo.portfolio.title,
  description: en.seo.portfolio.description,
  alternates: { canonical: "/portfolio" },
  openGraph: { title: en.seo.portfolio.title, description: en.seo.portfolio.description, type: "website" },
};

export default function Page() {
  return <PortfolioPageClient />;
}
