/* ─────────────────────────────────────────────
 * Client wrapper for PrivacyPage
 * ───────────────────────────────────────────── */
"use client";

import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import PrivacyPage from "@/components/pages/PrivacyPage";

export default function PrivacyPageClient() {
  const { setLocale } = useTranslation();
  
  useEffect(() => {
    setLocale("EN");
  }, [setLocale]);
  
  return <PrivacyPage />;
}
