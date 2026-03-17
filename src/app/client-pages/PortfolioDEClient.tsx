"use client";
import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import PortfolioPage from "@/components/pages/PortfolioPage";

export default function PortfolioDEClient() {
  const { setLocale } = useTranslation();
  useEffect(() => {
    setLocale("DE");
    return () => setLocale("EN");
  }, [setLocale]);
  return <PortfolioPage />;
}
