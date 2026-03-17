/* ─────────────────────────────────────────────
 * Client wrapper for TermsPage
 * ───────────────────────────────────────────── */
"use client";

import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import TermsPage from "@/components/pages/TermsPage";

export default function TermsPageClient() {
  const { setLocale } = useTranslation();
  
  useEffect(() => {
    setLocale("EN");
  }, [setLocale]);
  
  return <TermsPage />;
}
