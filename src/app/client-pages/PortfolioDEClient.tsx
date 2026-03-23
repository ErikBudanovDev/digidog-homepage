"use client";
import { Suspense } from "react";
import PortfolioPage from "@/components/pages/PortfolioPage";
import { I18nProvider } from "@/i18n/i18n-context";

export default function PortfolioDEClient() {
  return (
    <I18nProvider initialLocale="DE">
      <Suspense>
        <PortfolioPage />
      </Suspense>
    </I18nProvider>
  );
}
