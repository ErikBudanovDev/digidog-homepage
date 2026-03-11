import type { Metadata } from "next";
import PrivacyPageClient from "../client-pages/PrivacyPageClient";
import en from "../../translations/english.json";

export const metadata: Metadata = {
  title: en.seo.privacy.title,
  description: en.seo.privacy.description,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PrivacyPageClient />;
}
