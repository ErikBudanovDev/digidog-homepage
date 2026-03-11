import type { NextConfig } from "next";
import path from "path";
import fs from "fs";
import type { Compiler } from "webpack";

// Virtual modules directory for figma:asset imports
// Use a directory outside .next so it works on Vercel builds
const virtualDir = path.resolve(__dirname, 'node_modules/.cache/figma-virtual-modules');
if (!fs.existsSync(virtualDir)) {
  fs.mkdirSync(virtualDir, { recursive: true });
}

const nextConfig: NextConfig = {
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
