"use client";
import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import ImprintPage from "@/components/pages/ImprintPage";

export default function ImprintDEClient() {
  const { setLocale } = useTranslation();
  useEffect(() => {
    setLocale("DE");
    return () => setLocale("EN");
  }, [setLocale]);
  return <ImprintPage />;
}
