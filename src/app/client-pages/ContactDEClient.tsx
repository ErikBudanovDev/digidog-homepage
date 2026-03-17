"use client";
import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import ContactPage from "@/components/pages/ContactPage";

export default function ContactDEClient() {
  const { setLocale } = useTranslation();
  useEffect(() => {
    setLocale("DE");
    return () => setLocale("EN");
  }, [setLocale]);
  return <ContactPage />;
}
