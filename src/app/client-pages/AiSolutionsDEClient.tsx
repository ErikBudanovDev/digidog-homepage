"use client";
import AiSolutionsPage from "@/components/pages/AiSolutionsPage";
import { I18nProvider } from "@/i18n/i18n-context";

export default function AiSolutionsDEClient() {
  return <I18nProvider initialLocale="DE"><AiSolutionsPage /></I18nProvider>;
}
