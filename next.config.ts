import type { NextConfig } from "next";
import path from "path";
import fs from "fs";
// webpack types available at build time via next

// Virtual modules directory for figma:asset imports
// Use a directory outside .next so it works on Vercel builds
const virtualDir = path.resolve(__dirname, 'node_modules/.cache/figma-virtual-modules');
if (!fs.existsSync(virtualDir)) {
  fs.mkdirSync(virtualDir, { recursive: true });
}

const nextConfig: NextConfig = {
  /* ─────────────────────────────────────────────
   * 301 Redirects — Old WordPress URLs → New Next.js routes
   * Preserves SEO equity from indexed pages
   * ───────────────────────────────────────────── */
  async redirects() {
    return [
      // === Core Pages ===
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/uber-uns", destination: "/about", permanent: true },
      { source: "/uber-uns/", destination: "/about", permanent: true },
      { source: "/contact/", destination: "/contact", permanent: true },
      { source: "/impressum", destination: "/imprint", permanent: true },
      { source: "/impressum/", destination: "/imprint", permanent: true },
      { source: "/datenschutz", destination: "/privacy", permanent: true },
      { source: "/datenschutz/", destination: "/privacy", permanent: true },

      // === Service Pages ===
      { source: "/web-development-and-implementation", destination: "/services/web-design", permanent: true },
      { source: "/web-development-and-implementation/", destination: "/services/web-design", permanent: true },
      { source: "/website-development", destination: "/services/web-design", permanent: true },
      { source: "/website-development/", destination: "/services/web-design", permanent: true },
      { source: "/website-development-it", destination: "/services/web-design", permanent: true },
      { source: "/website-development-it/", destination: "/services/web-design", permanent: true },
      { source: "/app-development", destination: "/services/custom-software", permanent: true },
      { source: "/app-development/", destination: "/services/custom-software", permanent: true },
      { source: "/website-care-and-support-solutions", destination: "/services/web-design", permanent: true },
      { source: "/website-care-and-support-solutions/", destination: "/services/web-design", permanent: true },
      { source: "/seo-and-content-marketing", destination: "/services/web-design", permanent: true },
      { source: "/seo-and-content-marketing/", destination: "/services/web-design", permanent: true },
      { source: "/suchmaschinenoptimierung-und-content-marketing", destination: "/services/web-design", permanent: true },
      { source: "/suchmaschinenoptimierung-und-content-marketing/", destination: "/services/web-design", permanent: true },
      { source: "/webentwicklung-und-implementation", destination: "/services/web-design", permanent: true },
      { source: "/webentwicklung-und-implementation/", destination: "/services/web-design", permanent: true },

      // === Portfolio / Projects ===
      { source: "/en/projects/:slug", destination: "/portfolio", permanent: true },
      { source: "/en/projects/:slug/", destination: "/portfolio", permanent: true },
      { source: "/projects/:slug", destination: "/portfolio", permanent: true },
      { source: "/projects/:slug/", destination: "/portfolio", permanent: true },
      { source: "/projekte/:slug", destination: "/portfolio", permanent: true },
      { source: "/projekte/:slug/", destination: "/portfolio", permanent: true },

      // === Blog (old WP blog paths) ===
      { source: "/en/blog/:slug", destination: "/blog", permanent: true },
      { source: "/en/blog/:slug/", destination: "/blog", permanent: true },

      // === Language prefixed pages ===
      // /de and /de/ redirects REMOVED — real German routes now exist
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/", destination: "/", permanent: true },
      { source: "/en/about-us", destination: "/about", permanent: true },
      { source: "/en/about-us/", destination: "/about", permanent: true },
      { source: "/en/contact", destination: "/contact", permanent: true },
      { source: "/en/contact/", destination: "/contact", permanent: true },

      // === Old WordPress trailing slashes catch-all ===
      { source: "/wp-admin", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/feed/", destination: "/", permanent: true },

      // === Old EN service pages (no redirect existed) ===
      { source: "/ai-automation-and-integration", destination: "/services/ai-solutions", permanent: true },
      { source: "/ai-automation-and-integration/", destination: "/services/ai-solutions", permanent: true },
      { source: "/marketing-for-orthodontists", destination: "/services/ai-solutions", permanent: true },
      { source: "/marketing-for-orthodontists/", destination: "/services/ai-solutions", permanent: true },
      { source: "/saas-solutions", destination: "/services/custom-software", permanent: true },
      { source: "/saas-solutions/", destination: "/services/custom-software", permanent: true },

      // === Old DE service pages (root-level, no /de prefix) ===
      { source: "/ki-automatisierung-und-integration", destination: "/de/dienstleistungen/ki-loesungen", permanent: true },
      { source: "/ki-automatisierung-und-integration/", destination: "/de/dienstleistungen/ki-loesungen", permanent: true },
      { source: "/marketing-fuer-kieferorthopaeden", destination: "/de/dienstleistungen/ki-loesungen", permanent: true },
      { source: "/marketing-fuer-kieferorthopaeden/", destination: "/de/dienstleistungen/ki-loesungen", permanent: true },
      { source: "/saas-loesungen", destination: "/de/dienstleistungen/individuelle-software", permanent: true },
      { source: "/saas-loesungen/", destination: "/de/dienstleistungen/individuelle-software", permanent: true },
      { source: "/app-entwicklung", destination: "/de/dienstleistungen/individuelle-software", permanent: true },
      { source: "/app-entwicklung/", destination: "/de/dienstleistungen/individuelle-software", permanent: true },
      { source: "/webseitenpflege-und-support", destination: "/de/dienstleistungen/webdesign", permanent: true },
      { source: "/webseitenpflege-und-support/", destination: "/de/dienstleistungen/webdesign", permanent: true },

      // === Old /de prefix pages ===
      { source: "/de/uber-uns", destination: "/de/ueber-uns", permanent: true },
      { source: "/de/uber-uns/", destination: "/de/ueber-uns", permanent: true },
      { source: "/de/ki-automatisierung-und-integration", destination: "/de/dienstleistungen/ki-loesungen", permanent: true },
      { source: "/de/ki-automatisierung-und-integration/", destination: "/de/dienstleistungen/ki-loesungen", permanent: true },
      { source: "/de/saas-loesungen", destination: "/de/dienstleistungen/individuelle-software", permanent: true },
      { source: "/de/saas-loesungen/", destination: "/de/dienstleistungen/individuelle-software", permanent: true },
      { source: "/de/marketing-fuer-kieferorthopaeden", destination: "/de/dienstleistungen/ki-loesungen", permanent: true },
      { source: "/de/marketing-fuer-kieferorthopaeden/", destination: "/de/dienstleistungen/ki-loesungen", permanent: true },
      { source: "/de/app-entwicklung", destination: "/de/dienstleistungen/individuelle-software", permanent: true },
      { source: "/de/app-entwicklung/", destination: "/de/dienstleistungen/individuelle-software", permanent: true },
      { source: "/de/webseitenpflege-und-support", destination: "/de/dienstleistungen/webdesign", permanent: true },
      { source: "/de/webseitenpflege-und-support/", destination: "/de/dienstleistungen/webdesign", permanent: true },
      { source: "/de/webentwicklung-und-implementation", destination: "/de/dienstleistungen/webdesign", permanent: true },
      { source: "/de/webentwicklung-und-implementation/", destination: "/de/dienstleistungen/webdesign", permanent: true },
      { source: "/de/suchmaschinenoptimierung-und-content-marketing", destination: "/de/dienstleistungen/webdesign", permanent: true },
      { source: "/de/suchmaschinenoptimierung-und-content-marketing/", destination: "/de/dienstleistungen/webdesign", permanent: true },

      // === Old /en prefix service pages ===
      { source: "/en/saas-solutions", destination: "/services/custom-software", permanent: true },
      { source: "/en/saas-solutions/", destination: "/services/custom-software", permanent: true },
      { source: "/en/ai-automation-and-integration", destination: "/services/ai-solutions", permanent: true },
      { source: "/en/ai-automation-and-integration/", destination: "/services/ai-solutions", permanent: true },
      { source: "/en/marketing-for-orthodontists", destination: "/services/ai-solutions", permanent: true },
      { source: "/en/marketing-for-orthodontists/", destination: "/services/ai-solutions", permanent: true },
      { source: "/en/app-development", destination: "/services/custom-software", permanent: true },
      { source: "/en/app-development/", destination: "/services/custom-software", permanent: true },
      { source: "/en/website-care-and-support-solutions", destination: "/services/web-design", permanent: true },
      { source: "/en/website-care-and-support-solutions/", destination: "/services/web-design", permanent: true },

      // === Old WP blog posts (root-level slugs) ===
      { source: "/artificial-intelligence-in-marketing", destination: "/blog", permanent: true },
      { source: "/artificial-intelligence-in-marketing/", destination: "/blog", permanent: true },
      { source: "/artificial-intelligence-in-marketing-2", destination: "/blog", permanent: true },
      { source: "/artificial-intelligence-in-marketing-2/", destination: "/blog", permanent: true },
      { source: "/the-ai-gold-rush", destination: "/blog", permanent: true },
      { source: "/the-ai-gold-rush/", destination: "/blog", permanent: true },
      { source: "/how-to-build-a-website", destination: "/blog", permanent: true },
      { source: "/how-to-build-a-website/", destination: "/blog", permanent: true },
      { source: "/seo-success-factors", destination: "/blog", permanent: true },
      { source: "/seo-success-factors/", destination: "/blog", permanent: true },
      { source: "/kunstliche-intelligenz-im-marketing", destination: "/blog", permanent: true },
      { source: "/kunstliche-intelligenz-im-marketing/", destination: "/blog", permanent: true },
      { source: "/ki-goldrausch", destination: "/blog", permanent: true },
      { source: "/ki-goldrausch/", destination: "/blog", permanent: true },
      { source: "/wie-kann-man-eine-website-erstellen", destination: "/blog", permanent: true },
      { source: "/wie-kann-man-eine-website-erstellen/", destination: "/blog", permanent: true },

      // === WP categories, tags, authors ===
      { source: "/category/:slug", destination: "/blog", permanent: true },
      { source: "/category/:slug/", destination: "/blog", permanent: true },
      { source: "/tag/:slug", destination: "/blog", permanent: true },
      { source: "/tag/:slug/", destination: "/blog", permanent: true },
      { source: "/author/:slug", destination: "/about", permanent: true },
      { source: "/author/:slug/", destination: "/about", permanent: true },

      // === GSC 404 Fixes — March 27, 2026 ===
      // Old EN prefix pages
      { source: "/en/homepage", destination: "/", permanent: true },
      { source: "/en/imprint", destination: "/imprint", permanent: true },
      { source: "/en/imprint/", destination: "/imprint", permanent: true },
      { source: "/en/data-privacy-2", destination: "/privacy", permanent: true },
      { source: "/en/data-privacy-2/", destination: "/privacy", permanent: true },
      // Old DE prefix pages
      { source: "/de/home", destination: "/de", permanent: true },
      { source: "/de/home/", destination: "/de", permanent: true },
      { source: "/de/seo-sea-analytik", destination: "/de/dienstleistungen/webdesign", permanent: true },
      { source: "/de/seo-sea-analytik/", destination: "/de/dienstleistungen/webdesign", permanent: true },
      { source: "/de/category/blog", destination: "/de/blog", permanent: true },
      { source: "/de/category/blog/", destination: "/de/blog", permanent: true },
      // REMOVED: /de/portfolio redirect — real German portfolio page now exists
      // REMOVED: /de/agb redirect — real German AGB page now exists
      // REMOVED: /de/dienstleistungen/ki-integration redirect — real German KI landing page now exists for Google Ads
      // Miscellaneous EN 404s
      { source: "/our-portfolio", destination: "/portfolio", permanent: true },
      { source: "/our-portfolio/", destination: "/portfolio", permanent: true },
      { source: "/feedback/scale-one", destination: "/", permanent: true },
      { source: "/feedback/scale-one/", destination: "/", permanent: true },
      // REMOVED: /ai-integration redirect — real AI Integration landing page exists at /ai-integration
      { source: "/your-full-service-digital-agency", destination: "/blog", permanent: true },
      { source: "/your-full-service-digital-agency/", destination: "/blog", permanent: true },
      { source: "/why-seo-is-essential-for-your-business-success", destination: "/blog", permanent: true },
      { source: "/why-seo-is-essential-for-your-business-success/", destination: "/blog", permanent: true },

      // === WP system URLs ===
      { source: "/wp-content/:path*", destination: "/", permanent: true },
      { source: "/wp-includes/:path*", destination: "/", permanent: true },
      { source: "/wp-json/:path*", destination: "/", permanent: true },

      // ═══════════════════════════════════════════════════════════════════
      // === GSC audit 2026-04-23 — legacy URLs still indexed in Search Console
      // Verified against blog-data.ts, blog-data-de.ts, and src/app routes.
      // Source-of-truth: anything in GSC that isn't a live Next.js route and
      // isn't already redirected above.
      // ═══════════════════════════════════════════════════════════════════

      // English legacy pages → closest live equivalent
      { source: "/blog-en", destination: "/blog", permanent: true },
      { source: "/blog-en/", destination: "/blog", permanent: true },
      { source: "/data-privacy-2", destination: "/privacy", permanent: true },
      { source: "/data-privacy-2/", destination: "/privacy", permanent: true },
      { source: "/ai-automation", destination: "/ai-integration", permanent: true },
      { source: "/ai-automation/", destination: "/ai-integration", permanent: true },
      { source: "/how-to-start-building-a-website", destination: "/blog", permanent: true },
      { source: "/how-to-start-building-a-website/", destination: "/blog", permanent: true },

      // Stale English blog slug no longer in blog-data.ts (296 impressions / pos 75.9)
      { source: "/blog/case-study-orthodontist-website-seo", destination: "/blog", permanent: true },
      { source: "/blog/case-study-orthodontist-website-seo/", destination: "/blog", permanent: true },

      // German legacy pages → closest live DE equivalent
      { source: "/de/homepage-deutsch", destination: "/de", permanent: true },
      { source: "/de/homepage-deutsch/", destination: "/de", permanent: true },
      { source: "/de/marketing-fuer-kieferorthopaedie", destination: "/de/dienstleistungen/ki-loesungen", permanent: true },
      { source: "/de/marketing-fuer-kieferorthopaedie/", destination: "/de/dienstleistungen/ki-loesungen", permanent: true },
      { source: "/de/ai-automatisierung", destination: "/de/dienstleistungen/ki-loesungen", permanent: true },
      { source: "/de/ai-automatisierung/", destination: "/de/dienstleistungen/ki-loesungen", permanent: true },
      { source: "/de/unser-portfolio", destination: "/de/portfolio", permanent: true },
      { source: "/de/unser-portfolio/", destination: "/de/portfolio", permanent: true },
      { source: "/de/web-design-und-implementierung", destination: "/de/dienstleistungen/webdesign", permanent: true },
      { source: "/de/web-design-und-implementierung/", destination: "/de/dienstleistungen/webdesign", permanent: true },
      { source: "/de/kunstliche-intelligenz-im-marketing-anwendungen-und-vorteile", destination: "/de/blog", permanent: true },
      { source: "/de/kunstliche-intelligenz-im-marketing-anwendungen-und-vorteile/", destination: "/de/blog", permanent: true },

      // /de/projects/:slug — 8+ old WP project pages still indexed in GSC
      // (karine-babajanyan, cibaria-italiana, kalami, kelso-well, monte, mpa-online, sofies-kosmetik, technik-hoffmann)
      { source: "/de/projects/:slug", destination: "/de/portfolio", permanent: true },
      { source: "/de/projects/:slug/", destination: "/de/portfolio", permanent: true },
    ];
  },

  /* ─────────────────────────────────────────────
   * Transpile components imported from the parent
   * Vite project's src/ directory so Next.js can
   * process JSX / TS files that live outside this
   * project root.
   * ───────────────────────────────────────────── */
  transpilePackages: [],

  /* Allow external images from any domain (Figma CDN, Unsplash, etc.) */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },

  webpack(config) {
    // Allow importing .svg files as raw strings (matches Vite assetsInclude)
    config.module.rules.push({
      test: /\.svg$/,
      type: "asset/source",
    });

    // Ensure parent src/ files resolve npm deps from our node_modules
    config.resolve.modules = [
      path.resolve(__dirname, "node_modules"),
      "node_modules",
    ];

    // Alias @ to the parent project's src/ directory
    config.resolve.alias["@"] = path.resolve(__dirname, "src");

    // Shim react-router so existing components resolve to our Next.js adapter
    config.resolve.alias["react-router"] = path.resolve(
      __dirname,
      "src/shims/react-router.tsx"
    );

    // Intercept CosmicElements imports to use client-only wrapper
    const webpack = require("webpack");
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /[\\/]components[\\/]CosmicElements$/,
        path.resolve(__dirname, "src/components/ClientOnlyCosmicElements.tsx")
      )
    );

    // Handle figma:asset imports - create .mjs virtual modules
    // (.mjs is always treated as ESM by webpack, works on both server and client)
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^figma:asset\//,
        (resource: any) => {
          const hash = resource.request.replace('figma:asset/', '');
          const publicPath = `/figma-assets/${hash}`;
          const hashWithoutExt = hash.replace(/\.\w+$/, '');
          const modulePath = path.join(virtualDir, `${hashWithoutExt}.mjs`);
          
          // Write .mjs file with ESM export default
          if (!fs.existsSync(modulePath)) {
            fs.writeFileSync(modulePath, `export default ${JSON.stringify(publicPath)};\n`);
          }
          
          resource.request = modulePath;
        }
      )
    );

    return config;
  },
};

export default nextConfig;
