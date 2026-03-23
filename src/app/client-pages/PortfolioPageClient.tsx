"use client";
import { Suspense } from "react";
import PortfolioPage from "@/components/pages/PortfolioPage";
export default function PortfolioPageClient() {
  return <Suspense><PortfolioPage /></Suspense>;
}
