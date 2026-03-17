/* ─────────────────────────────────────────────
 * Client wrapper for ContactPage
 * ───────────────────────────────────────────── */
"use client";

import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import ContactPage from "@/components/pages/ContactPage";

export default function ContactPageClient() {
  const { setLocale } = useTranslation();
  
  useEffect(() => {
    setLocale("EN");
  }, [setLocale]);
  
  return <ContactPage />;
}
