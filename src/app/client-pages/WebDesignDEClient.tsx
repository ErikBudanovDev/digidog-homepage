/* ─────────────────────────────────────────────
 * German Web Design Page — same design, German locale
 * ───────────────────────────────────────────── */
"use client";

import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import WebDesignPage from "@/components/pages/WebDesignPage";

export default function WebDesignDEClient() {
  const { setLocale } = useTranslation();

  useEffect(() => {
    setLocale("DE");
    return () => setLocale("EN");
  }, [setLocale]);

  return <WebDesignPage />;
}
