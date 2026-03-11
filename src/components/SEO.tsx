"use client";

/**
 * SEO component — NO-OP in Next.js
 * 
 * In Next.js, all SEO metadata is handled by the `metadata` export
 * in each page.tsx file. This component exists only to prevent
 * import errors in page components that still reference it.
 */

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  schemaMarkup?: object;
}

const SITE_NAME = "Digidog";
const BASE_URL = "https://digidog.org";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`;

export function SEO(_props: SEOProps) {
  return null;
}

/* ─── Pre-built Schema Markup ─── */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digidog",
  url: "https://digidog.org",
  logo: "https://digidog.org/wp-content/uploads/2024/02/Digidog-Mark-Black@4x-e1709122020974.png",
  description: "AI Consulting & Full-Stack Web Development Agency",
  sameAs: [
    "https://www.facebook.com/digidog.agency/",
    "https://www.instagram.com/digidog_agency/",
    "https://www.linkedin.com/company/digidog-agency",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@digidog.org",
    contactType: "sales",
    availableLanguage: ["English", "German"],
  },
};

export function serviceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "Digidog",
      url: "https://digidog.org",
    },
    url: `https://digidog.org${url}`,
  };
}
