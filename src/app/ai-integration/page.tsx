import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Integration for Business | Talk to Your Business With AI | Digidog",
  description:
    "Integrate your CRM, email, support, analytics and operations into one AI conversation. Custom MCP integrations, AI automation, and intelligent business systems for mid-size companies.",
  keywords:
    "AI integration, MCP integration, AI automation agency, business AI, CRM AI integration, AI operations",
  robots: "index, follow",
  alternates: { canonical: "https://www.digidog.org/ai-integration" },
  openGraph: {
    title: "AI Integration for Business | Digidog",
    description:
      "Integrate your operations, data, and workflows into one AI conversation. Access reports, automate tasks, and manage operations through natural language.",
    url: "https://www.digidog.org/ai-integration",
    type: "website",
    images: [{ url: "https://www.digidog.org/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Integration for Business | Digidog",
    description:
      "Integrate your operations into one AI conversation. Custom MCP integrations for mid-size companies.",
    images: [{ url: "https://www.digidog.org/og-default.jpg", width: 1200, height: 630 }],
  },
};

export { default } from "./AiIntegrationPage";
