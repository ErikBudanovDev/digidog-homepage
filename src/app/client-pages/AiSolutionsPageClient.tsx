/* ─────────────────────────────────────────────
 * Client wrapper for AiSolutionsPage
 * ───────────────────────────────────────────── */
"use client";

import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import AiSolutionsPage from "@/components/pages/AiSolutionsPage";

export default function AiSolutionsPageClient() {
  const { setLocale } = useTranslation();
  
  useEffect(() => {
    setLocale("EN");
  }, [setLocale]);
  
  return <AiSolutionsPage />;
}
