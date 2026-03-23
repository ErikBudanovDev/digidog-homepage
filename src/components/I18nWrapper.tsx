/* ─────────────────────────────────────────────
 * Client-side I18n wrapper
 *
 * Re-uses the existing I18nProvider from the
 * parent Vite project. Marked "use client" so
 * it can use React context / state.
 * ───────────────────────────────────────────── */
"use client";

import { I18nProvider, type Locale } from "@/i18n/i18n-context";

export function I18nWrapper({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale?: Locale;
}) {
  return <I18nProvider initialLocale={locale}>{children}</I18nProvider>;
}
