/* ─────────────────────────────────────────────
 * Client wrapper for HomePage
 * ───────────────────────────────────────────── */
"use client";

import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import HomePage from "@/components/pages/HomePage";

export default function HomePageClient() {
  const { setLocale } = useTranslation();
  
  useEffect(() => {
    setLocale("EN");
  }, [setLocale]);
  
  return <HomePage />;
}
