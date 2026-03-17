/* ─────────────────────────────────────────────
 * Client wrapper for AiIntegrationPage
 * ───────────────────────────────────────────── */
"use client";

import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import AiIntegrationPage from "@/components/pages/AiIntegrationPage";

export default function AiIntegrationPageClient() {
  const { setLocale } = useTranslation();
  
  useEffect(() => {
    setLocale("EN");
  }, [setLocale]);
  
  return <AiIntegrationPage />;
}
