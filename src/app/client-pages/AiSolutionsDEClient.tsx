"use client";
import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import AiSolutionsPage from "@/components/pages/AiSolutionsPage";

export default function AiSolutionsDEClient() {
  const { setLocale } = useTranslation();
  useEffect(() => {
    setLocale("DE");
    return () => setLocale("EN");
  }, [setLocale]);
  return <AiSolutionsPage />;
}
