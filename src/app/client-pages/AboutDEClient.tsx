"use client";
import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import AboutPage from "@/components/pages/AboutPage";

export default function AboutDEClient() {
  const { setLocale } = useTranslation();
  useEffect(() => {
    setLocale("DE");
    return () => setLocale("EN");
  }, [setLocale]);
  return <AboutPage />;
}
