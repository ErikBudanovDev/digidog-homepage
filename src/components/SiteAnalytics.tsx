"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const GTM_ID = "GTM-N8F2BQ4";
const GA_ID = "G-W5JP198XEE";
const localPreview = process.env.NEXT_PUBLIC_LOCAL_PREVIEW === "true";

// Public review pages do not participate in campaign measurement.
export function SiteAnalytics() {
  const pathname = usePathname();
  if (pathname === "/campaigns/workflow-pilot-a" || pathname === "/campaigns/workflow-pilot-b") return null;
  return <>
        {/* GTM noscript fallback */}
        {!localPreview && <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>}


        {/* Google Tag Manager */}
        {!localPreview && <>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        {/* GA4 */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>

        </>}
  </>;
}
