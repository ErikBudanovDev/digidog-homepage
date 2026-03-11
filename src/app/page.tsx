import type { Metadata } from "next";
import HomePageClient from "./client-pages/HomePageClient";
import en from "../translations/english.json";

export const metadata: Metadata = {
  title: en.seo.home.title,
  description: en.seo.home.description,
  alternates: { canonical: "/" },
  keywords: ["AI automation agency", "AI consulting agency", "web development agency", "KI Agentur", "custom AI workflows", "MCP integration"],
  openGraph: {
    title: en.seo.home.ogTitle,
    description: en.seo.home.ogDescription,
    type: "website",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: en.seo.home.ogTitle, description: en.seo.home.ogDescription },
};

export default function Page() {
  return <HomePageClient />;
}
