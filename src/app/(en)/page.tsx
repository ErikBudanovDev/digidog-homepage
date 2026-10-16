import type { Metadata } from "next";
import HomePageClient from "@/app/client-pages/HomePageClient";
import en from "@/translations/english.json";

export const metadata: Metadata = {
  title: en.seo.home.title,
  description: en.seo.home.description,
  alternates: { canonical: "/", languages: { "en": "/", "de": "/de", "x-default": "/" } },
  keywords: ["immersive 3D development", "VR development", "AR development", "WebXR", "3D world AI", "website redesign", "Erik Budanov"],
  openGraph: {
    title: en.seo.home.ogTitle,
    description: en.seo.home.ogDescription,
    type: "website",
    url: "/",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: en.seo.home.ogTitle, description: en.seo.home.ogDescription },
};

export default function Page() {
  return <HomePageClient />;
}
