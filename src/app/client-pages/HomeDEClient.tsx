"use client";
import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import HomePage from "@/components/pages/HomePage";

export default function HomeDEClient() {
  const { setLocale } = useTranslation();
  useEffect(() => {
    setLocale("DE");
    return () => setLocale("EN");
  }, [setLocale]);
  return <HomePage />;
}
