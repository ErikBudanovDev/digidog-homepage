import Script from "next/script";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { Analytics } from "@vercel/analytics/next";
import { organizationJsonLd } from "./site-metadata";
import "./globals.css";

/* ─────────────────────────────────────────────
 * Root shell — <html>/<body> shared by the EN and
 * DE root layouts, so each locale sends the right
 * `lang` attribute in the server HTML.
 * ───────────────────────────────────────────── */
export function RootShell({ lang, children }: { lang: "en" | "de"; children: React.ReactNode }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        {children}
        <SiteAnalytics />
        <Analytics />

        {/* Calendly widget */}
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
