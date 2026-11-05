import type { Metadata } from "next";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://digidog.org/#org",
  name: "DigiDog",
  url: "https://digidog.org",
  logo: "https://digidog.org/images/digidog-logo-512.png",
  description:
    "DigiDog builds AI integrations and web platforms for service businesses: Claude, AI agents and MCP connected to the tools they already use.",
  founder: {
    "@type": "Person",
    "@id": "https://digidog.org/#erik",
    name: "Erik Budanov",
    url: "https://digidog.org/about",
    sameAs: ["https://www.upwork.com/freelancers/erikbudanov"],
  },
  sameAs: [
    "https://www.linkedin.com/company/digidog-agency",
    "https://www.instagram.com/digidog_agency/",
    "https://www.facebook.com/digidog.agency/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hey@digidog.org",
    telephone: "+43-664-93020594",
    contactType: "sales",
    availableLanguage: ["English", "German"],
  },
};

const shared: Metadata = {
  metadataBase: new URL("https://digidog.org"),
  openGraph: {
    type: "website",
    siteName: "DigiDog",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const metadataEN: Metadata = {
  ...shared,
  title: { default: "AI Integration & AI Agents for Business | DigiDog", template: "%s | DigiDog" },
  description:
    "Claude, AI agents and MCP connected to your CRM, bookings, email and analytics. AI integration by Erik Budanov for businesses in the US, UK and DACH.",
  openGraph: { ...shared.openGraph, locale: "en_US" },
};

export const metadataDE: Metadata = {
  ...shared,
  title: { default: "KI-Integration & KI-Agenten für Unternehmen | DigiDog", template: "%s | DigiDog" },
  description:
    "Claude, KI-Agenten und MCP, verbunden mit CRM, Buchungen, E-Mail und Analytics. KI-Integration von Erik Budanov für Unternehmen in Deutschland, Österreich und der Schweiz.",
  openGraph: { ...shared.openGraph, locale: "de_DE" },
};
