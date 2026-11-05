import type { Locale } from "./i18n-context";

export const routes: Record<Locale, Record<string, string>> = {
  EN: {
    home: "/",
    aiSolutions: "/services/ai-integration",
    aiIntegration: "/services/ai-integration",
    webDesign: "/services/ai-integration",
    customSoftware: "/services/ai-integration",
    portfolio: "/portfolio",
    about: "/about",
    contact: "/contact",
    blog: "/blog",
    imprint: "/imprint",
    privacy: "/privacy",
    terms: "/terms",
  },
  DE: {
    home: "/de",
    aiSolutions: "/de/dienstleistungen/ki-integration",
    aiIntegration: "/de/dienstleistungen/ki-integration",
    webDesign: "/de/dienstleistungen/ki-integration",
    customSoftware: "/de/dienstleistungen/ki-integration",
    portfolio: "/de/portfolio",
    about: "/de/ueber-uns",
    contact: "/de/kontakt",
    blog: "/de/blog",
    imprint: "/de/impressum",
    privacy: "/de/datenschutz",
    terms: "/de/agb",
  },
  TR: {
    home: "/",
    aiSolutions: "/services/ai-integration",
    aiIntegration: "/services/ai-integration",
    webDesign: "/services/ai-integration",
    customSoftware: "/services/ai-integration",
    portfolio: "/portfolio",
    about: "/about",
    contact: "/contact",
    blog: "/blog",
    imprint: "/imprint",
    privacy: "/privacy",
    terms: "/terms",
  },
};

export function getLocalizedRoute(key: string, locale: Locale = "EN"): string {
  return routes[locale][key] || routes.EN[key] || "/";
}

export function useLocalizedRoutes() {
  // This will be implemented when needed in components
  // For now, components can import getLocalizedRoute directly
  return routes;
}
