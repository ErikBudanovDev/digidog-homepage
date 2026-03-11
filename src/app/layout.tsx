import type { Metadata } from "next";
import "./globals.css";
import { I18nWrapper } from "../components/I18nWrapper";

/* ─────────────────────────────────────────────
 * Root Layout — wraps every page with shared
 * providers and global meta tags for SEO.
 * ───────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL("https://digidog.org"),
  title: {
    default: "Digidog – AI Automation & Web Development Agency",
    template: "%s | Digidog",
  },
  description:
    "AI consulting and full-stack web development agency for mid-size companies. Custom AI automations, websites, and software that drive growth.",
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
  description: "AI Consulting & Full-Stack Web Development Agency",
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>
        <I18nWrapper>{children}</I18nWrapper>
      </body>
    </html>
  );
}
