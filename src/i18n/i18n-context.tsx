/* ─────────────────────────────────────────────
 * i18n CONTEXT — centralised language switching
 *
 * Locale is determined in two ways:
 * 1. Server-side: passed as `initialLocale` prop from page.tsx
 * 2. Client-side fallback: derived from pathname via usePathname()
 *
 * The server prop is the primary mechanism that ensures
 * SSG produces correct locale content in static HTML.
 * ───────────────────────────────────────────── */
"use client";

import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
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

/** Derive locale from the current pathname */
function localeFromPath(pathname: string): Locale {
  if (pathname.startsWith("/de")) return "DE";
  if (pathname.startsWith("/tr")) return "TR";
  return "EN";
}

interface I18nContextValue {
  locale: Locale;
  t: TranslationBundle;
  /** @deprecated — locale is now path-driven; only kept for edge cases */
  setLocale: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: ReactNode;
  /** Server-determined locale — takes priority over pathname detection */
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const pathname = usePathname() ?? "/";
  const locale = initialLocale ?? localeFromPath(pathname);
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
        /* no-op — locale is now derived from URL path or server prop */
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
