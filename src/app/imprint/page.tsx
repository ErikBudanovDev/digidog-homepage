import type { Metadata } from "next";
import ImprintPageClient from "../client-pages/ImprintPageClient";
import en from "../../translations/english.json";

export const metadata: Metadata = {
  title: en.seo.imprint.title,
  description: en.seo.imprint.description,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ImprintPageClient />;
}
