"use client";
import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import AiIntegrationPage from "@/components/pages/AiIntegrationPage";

export default function AiIntegrationDEClient() {
  const { setLocale } = useTranslation();
  useEffect(() => {
    setLocale("DE");
    return () => setLocale("EN");
  }, [setLocale]);
  return <AiIntegrationPage />;
}
