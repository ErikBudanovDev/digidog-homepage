"use client";
import { Suspense } from "react";
import PortfolioPage from "@/components/pages/PortfolioPage";

function PortfolioInner() {
  return <PortfolioPage />;
}

export default function PortfolioDEClient() {
  return (
    <Suspense>
      <PortfolioInner />
    </Suspense>
  );
}
