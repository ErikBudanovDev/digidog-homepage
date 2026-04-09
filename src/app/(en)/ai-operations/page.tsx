import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Operations System — Replace SaaS, Automate Workflows, Own Your Infrastructure | Digidog",
  description:
    "We rebuild how your business operates using AI. Replace $1K–$10K/month in SaaS with an AI Operations System you own. For service businesses and agencies with 5–50 people.",
  keywords:
    "AI operations system, replace SaaS with AI, AI automation for business, AI infrastructure, MCP integration, business AI systems",
  robots: "index, follow",
  alternates: { canonical: "https://digidog.org/ai-operations" },
  openGraph: {
    title: "AI Operations System | Digidog",
    description:
      "From $1,200/month in SaaS to $210 — on AI systems you own. We build the same for service businesses and agencies.",
    url: "https://digidog.org/ai-operations",
    type: "website",
    images: [{ url: "https://digidog.org/og-default.jpg", width: 1200, height: 630 }],
  },
};

export { default } from "./AiOperationsPage";
