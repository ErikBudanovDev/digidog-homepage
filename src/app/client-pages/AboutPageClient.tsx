/* ─────────────────────────────────────────────
 * Client wrapper for AboutPage
 * ───────────────────────────────────────────── */
"use client";

import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import AboutPage from "@/components/pages/AboutPage";

export default function AboutPageClient() {
  const { setLocale } = useTranslation();
  
  useEffect(() => {
    setLocale("EN");
  }, [setLocale]);
  
  return <AboutPage />;
}
