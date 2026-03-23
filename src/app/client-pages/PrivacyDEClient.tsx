"use client";
import PrivacyPage from "@/components/pages/PrivacyPage";
import { I18nProvider } from "@/i18n/i18n-context";

export default function PrivacyDEClient() {
  return <I18nProvider initialLocale="DE"><PrivacyPage /></I18nProvider>;
}
