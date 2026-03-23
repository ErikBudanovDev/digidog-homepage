"use client";
import CustomSoftwarePage from "@/components/pages/CustomSoftwarePage";
import { I18nProvider } from "@/i18n/i18n-context";

export default function CustomSoftwareDEClient() {
  return <I18nProvider initialLocale="DE"><CustomSoftwarePage /></I18nProvider>;
}
