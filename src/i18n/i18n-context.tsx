/* ─────────────────────────────────────────────
 * i18n CONTEXT — centralised language switching
 *
 * Locale is ALWAYS passed explicitly via the `locale` prop
 * from the nearest layout (de/layout.tsx or (en)/layout.tsx).
 *
 * No runtime pathname detection — this guarantees correct
 * locale during both SSG and client-side rendering.
 * ───────────────────────────────────────────── */
"use client";

import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import { de } from "./locales/de";
import { en } from "./locales/en";
import { tr } from "./locales/tr";

export type Locale = "DE" | "EN" | "TR";

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends object
      ? DeepStringify<T[K]>
      : T[K];
};
export type TranslationBundle = DeepStringify<typeof de>;

const bundles: Record<Locale, TranslationBundle> = {
  DE: de as TranslationBundle,
  EN: en,
  TR: tr as TranslationBundle,
};

interface I18nContextValue {
  locale: Locale;
  t: TranslationBundle;
  /** @deprecated — locale is prop-driven; kept for API compat */
  setLocale: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: ReactNode;
  /** Locale — must be provided by the layout or client wrapper */
  initialLocale: Locale;
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const locale: Locale = initialLocale;
  const t = bundles[locale];

  /* Keep <html lang> in sync at runtime */
  useEffect(() => {
    const lang = locale === "DE" ? "de" : locale === "TR" ? "tr" : "en";
    document.documentElement.lang = lang;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t,
      setLocale: () => {
        /* no-op — locale is prop-driven */
      },
    }),
    [locale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Hook — returns current locale and the full translation object `t` */
export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used inside <I18nProvider>");
  return ctx;
}
