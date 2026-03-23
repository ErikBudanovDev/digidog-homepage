"use client";
import ContactPage from "@/components/pages/ContactPage";
import { I18nProvider } from "@/i18n/i18n-context";

export default function ContactDEClient() {
  return <I18nProvider initialLocale="DE"><ContactPage /></I18nProvider>;
}
