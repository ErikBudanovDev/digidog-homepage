"use client";
import TermsPage from "@/components/pages/TermsPage";
import { I18nProvider } from "@/i18n/i18n-context";

export default function TermsDEClient() {
  return <I18nProvider initialLocale="DE"><TermsPage /></I18nProvider>;
}
