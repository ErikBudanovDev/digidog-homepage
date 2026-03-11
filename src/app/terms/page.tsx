import type { Metadata } from "next";
import TermsPageClient from "../client-pages/TermsPageClient";
import en from "../../translations/english.json";

export const metadata: Metadata = {
  title: en.seo.terms.title,
  description: en.seo.terms.description,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TermsPageClient />;
}
