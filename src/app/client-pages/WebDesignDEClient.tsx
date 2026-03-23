"use client";
import WebDesignPage from "@/components/pages/WebDesignPage";
import { I18nProvider } from "@/i18n/i18n-context";

export default function WebDesignDEClient() {
  return <I18nProvider initialLocale="DE"><WebDesignPage /></I18nProvider>;
}
