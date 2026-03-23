"use client";
import AiIntegrationPage from "@/components/pages/AiIntegrationPage";
import { I18nProvider } from "@/i18n/i18n-context";

export default function AiIntegrationDEClient() {
  return <I18nProvider initialLocale="DE"><AiIntegrationPage /></I18nProvider>;
}
