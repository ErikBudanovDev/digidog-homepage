"use client";
import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import CustomSoftwarePage from "@/components/pages/CustomSoftwarePage";

export default function CustomSoftwareDEClient() {
  const { setLocale } = useTranslation();
  useEffect(() => {
    setLocale("DE");
    return () => setLocale("EN");
  }, [setLocale]);
  return <CustomSoftwarePage />;
}
