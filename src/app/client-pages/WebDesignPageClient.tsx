/* ─────────────────────────────────────────────
 * Client wrapper for WebDesignPage
 * ───────────────────────────────────────────── */
"use client";

import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import WebDesignPage from "@/components/pages/WebDesignPage";

export default function WebDesignPageClient() {
  const { setLocale } = useTranslation();
  
  useEffect(() => {
    setLocale("EN");
  }, [setLocale]);
  
  return <WebDesignPage />;
}
