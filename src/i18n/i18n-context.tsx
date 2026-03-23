/* ─────────────────────────────────────────────
 * i18n CONTEXT — centralised language switching
 *
 * Locale is derived from the URL pathname via
 * Next.js usePathname() — works during both SSG
 * and client-side navigation.
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

export function I18nProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPath(pathname);
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
        /* no-op — locale is now derived from the URL path */
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
