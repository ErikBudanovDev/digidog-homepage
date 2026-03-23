"use client";
import AboutPage from "@/components/pages/AboutPage";
import { I18nProvider } from "@/i18n/i18n-context";

export default function AboutDEClient() {
  return <I18nProvider initialLocale="DE"><AboutPage /></I18nProvider>;
}
