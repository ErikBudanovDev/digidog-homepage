import type { Metadata } from "next";
import Script from "next/script";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import "./globals.css";




/* ─────────────────────────────────────────────
 * Root Layout — wraps every page with shared
 * providers and global meta tags for SEO.
 * ───────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL("https://digidog.org"),
  title: {
    default: "Website Redesigns & Product Engineering | DigiDog",
    template: "%s | Digidog",
  },
  description:
    "Website redesigns, MVPs and integrations with independent product engineer Erik Budanov. Direct senior ownership, supported by AI agents.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Digidog",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digidog",
  url: "https://digidog.org",
  logo: "https://digidog.org/wp-content/uploads/2024/02/Digidog-Mark-Black@4x-e1709122020974.png",
  description: "Independent product engineering by Erik Budanov: website redesigns, MVPs and integrations.",
  founder: { "@type": "Person", name: "Erik Budanov" },
  sameAs: [
    "https://www.facebook.com/digidog.agency/",
    "https://www.instagram.com/digidog_agency/",
    "https://www.linkedin.com/company/digidog-agency",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@digidog.org",
    telephone: "+43-664-93020594",
    contactType: "sales",
    availableLanguage: ["English", "German"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>
        {children}
        <SiteAnalytics />

        {/* Calendly widget */}
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
