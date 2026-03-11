/* ─────────────────────────────────────────────
 * i18n CONTEXT — centralised language switching
 * ───────────────────────────────────────────── */
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { de } from "./locales/de";
import { en } from "./locales/en";
import { tr } from "./locales/tr";

export type Locale = "DE" | "EN" | "TR";

/* All locale bundles share the same shape */
export type TranslationBundle = typeof de;

const bundles: Record<Locale, TranslationBundle> = { DE: de, EN: en, TR: tr };

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: TranslationBundle;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("EN");

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: bundles[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

/** Hook — returns current locale, setter, and the full translation object `t` */
export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used inside <I18nProvider>");
  return ctx;
}
