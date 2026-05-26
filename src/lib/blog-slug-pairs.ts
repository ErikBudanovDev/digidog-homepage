/**
 * EN ↔ DE blog slug pairs for hreflang alternates.
 *
 * Add new entries here whenever a post ships in both languages.
 * Posts without a pair simply omit hreflang for the other locale.
 */

export const EN_TO_DE: Record<string, string> = {
  "ai-automation-for-mid-size-companies": "ki-automatisierung-mittelstand",
  "what-is-mcp-model-context-protocol":   "was-ist-mcp-model-context-protocol",
  "website-erstellen-lassen-kosten-ablauf-tipps": "website-erstellen-lassen-kosten-ablauf-tipps",
  "custom-software-vs-off-the-shelf":     "individuelle-software-vs-standardsoftware",
  "playwright-mcp-server-complete-guide": "playwright-mcp-server-anleitung",
  "slack-mcp-server-setup-guide":         "slack-mcp-server-einrichten",
  "website-redesign-complete-guide":      "website-relaunch-leitfaden",
  "supabase-mcp-server-setup-guide":      "supabase-mcp-server-einrichten",
  "claude-skills-vs-mcp-servers":         "claude-skills-vs-mcp-server",
  "vibe-coding-vps-build-deploy-app-with-ai": "vibe-coding-deutschland-anleitung",
  // EN-only (no DE counterpart): replace-saas-with-ai-vps
};

// Auto-derived inverse — no need to hand-maintain twice.
export const DE_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(EN_TO_DE).map(([en, de]) => [de, en])
);

// DE-only posts (no EN counterpart):
// - fallstudie-ki-crm-automatisierung
// - fallstudie-kieferorthopaede-website-seo
