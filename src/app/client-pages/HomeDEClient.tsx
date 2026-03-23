"use client";
import HomePage from "@/components/pages/HomePage";
import { I18nProvider } from "@/i18n/i18n-context";

export default function HomeDEClient() {
  return <I18nProvider initialLocale="DE"><HomePage /></I18nProvider>;
}
