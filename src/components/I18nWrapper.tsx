/* ─────────────────────────────────────────────
 * Client-side I18n wrapper
 *
 * Re-uses the existing I18nProvider from the
 * parent Vite project. Marked "use client" so
 * it can use React context / state.
 * ───────────────────────────────────────────── */
"use client";

import { I18nProvider } from "@/i18n/i18n-context";

export function I18nWrapper({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>;
}
