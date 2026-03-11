/* ─────────────────────────────────────────────
 * Client wrapper for PortfolioPage
 *
 * Wraps in Suspense because useSearchParams
 * requires it in Next.js App Router.
 * ───────────────────────────────────────────── */
"use client";

import { Suspense } from "react";
import PortfolioPage from "@/components/pages/PortfolioPage";

function PortfolioInner() {
  return <PortfolioPage />;
}

export default function PortfolioPageClient() {
  return (
    <Suspense>
      <PortfolioInner />
    </Suspense>
  );
}
