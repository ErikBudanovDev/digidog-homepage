/* ─────────────────────────────────────────────
 * Client wrapper for CustomSoftwarePage
 * ───────────────────────────────────────────── */
"use client";

import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import CustomSoftwarePage from "@/components/pages/CustomSoftwarePage";

export default function CustomSoftwarePageClient() {
  const { setLocale } = useTranslation();
  
  useEffect(() => {
    setLocale("EN");
  }, [setLocale]);
  
  return <CustomSoftwarePage />;
}
