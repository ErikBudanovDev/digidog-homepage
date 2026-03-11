/* ─────────────────────────────────────────────
 * Figma Asset Loader - Webpack Loader
 *
 * This is a webpack loader that handles figma:asset imports.
 * It extracts the hash from the import path and returns
 * a module that exports the public URL.
 * ───────────────────────────────────────────── */

module.exports = function(source) {
  // Extract hash from the resource query or path
  // The resource path will be like: figma-asset-loader.js?hash=xxx.png
  const hash = this.resourceQuery ? this.resourceQuery.replace('?hash=', '') : '';
  
  if (!hash) {
    // Fallback: return transparent PNG data URI
    return `module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";\nmodule.exports.default = module.exports;`;
  }
  
  const publicPath = `/figma-assets/${hash}`;
  return `module.exports = ${JSON.stringify(publicPath)};\nmodule.exports.default = ${JSON.stringify(publicPath)};`;
};
