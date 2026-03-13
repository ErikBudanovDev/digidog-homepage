import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Integration for Business | Don't Stay Behind | Digidog",
  description:
    "Integrate your CRM, email, support, analytics and operations into one AI conversation. Custom MCP integrations, AI automation, and intelligent business systems for mid-size companies.",
  keywords:
    "AI integration, MCP integration, AI automation agency, business AI, CRM AI integration, AI operations",
  robots: "index, follow",
  alternates: { canonical: "https://www.digidog.org/ai-integration" },
  openGraph: {
    title: "Don't Stay Behind — AI Integration for Business | Digidog",
    description:
      "Your competitors are already using AI. We connect your CRM, email, support, and operations into one AI conversation. Don't stay behind.",
    url: "https://www.digidog.org/ai-integration",
    type: "website",
    images: [{ url: "https://www.digidog.org/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Don't Stay Behind — AI Integration for Business | Digidog",
    description:
      "Your competitors are already using AI. We connect your operations into one conversation. Don't stay behind.",
    images: [{ url: "https://www.digidog.org/og-default.jpg", width: 1200, height: 630 }],
  },
};

export { default } from "./AiIntegrationPage";
