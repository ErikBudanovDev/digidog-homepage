/* ─────────────────────────────────────────────
 * Client wrapper for PortfolioPage
 *
 * Wraps in Suspense because useSearchParams
 * requires it in Next.js App Router.
 * ───────────────────────────────────────────── */
"use client";

import { Suspense, useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import PortfolioPage from "@/components/pages/PortfolioPage";

function PortfolioInner() {
  return <PortfolioPage />;
}

export default function PortfolioPageClient() {
  const { setLocale } = useTranslation();
  
  useEffect(() => {
    setLocale("EN");
  }, [setLocale]);
  
  return (
    <Suspense>
      <PortfolioInner />
    </Suspense>
  );
}
