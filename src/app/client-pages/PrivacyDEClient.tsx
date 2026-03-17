"use client";
import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import PrivacyPage from "@/components/pages/PrivacyPage";

export default function PrivacyDEClient() {
  const { setLocale } = useTranslation();
  useEffect(() => {
    setLocale("DE");
    return () => setLocale("EN");
  }, [setLocale]);
  return <PrivacyPage />;
}
