/* ─────────────────────────────────────────────
 * Client wrapper for ImprintPage
 * ───────────────────────────────────────────── */
"use client";

import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import ImprintPage from "@/components/pages/ImprintPage";

export default function ImprintPageClient() {
  const { setLocale } = useTranslation();
  
  useEffect(() => {
    setLocale("EN");
  }, [setLocale]);
  
  return <ImprintPage />;
}
