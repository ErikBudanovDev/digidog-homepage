"use client";
import ImprintPage from "@/components/pages/ImprintPage";
import { I18nProvider } from "@/i18n/i18n-context";

export default function ImprintDEClient() {
  return <I18nProvider initialLocale="DE"><ImprintPage /></I18nProvider>;
}
