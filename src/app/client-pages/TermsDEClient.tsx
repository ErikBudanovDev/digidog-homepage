"use client";
import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import TermsPage from "@/components/pages/TermsPage";

export default function TermsDEClient() {
  const { setLocale } = useTranslation();
  useEffect(() => {
    setLocale("DE");
    return () => setLocale("EN");
  }, [setLocale]);
  return <TermsPage />;
}
