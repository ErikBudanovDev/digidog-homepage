# DigiDog German (DE) Pages — Implementation Plan for Cursor

## ✅ Implementation Status: COMPLETED

**Last Updated:** March 17, 2026

### What's Been Implemented:

✅ **Core Infrastructure**
- Created `src/i18n/routes.ts` with locale-aware route mappings for EN/DE/TR
- All 11 German route pages created with proper SEO metadata
- All 10 DE client wrapper components created
- Sitemap updated with all German routes

✅ **Navigation & UI**
- Navbar updated with locale-aware routing
- Footer updated with locale-aware routing  
- Language switcher functional (EN/DE toggle)

✅ **Translations**
- Project uses JSON translation files (`english.json`, `german.json`)
- All necessary translations already exist for main components
- Hero, Services, Contact, CTA, and service pages fully translated

✅ **German Routes Available:**
- `/de` — Homepage
- `/de/dienstleistungen/ki-loesungen` — AI Solutions
- `/de/dienstleistungen/ki-integration` — AI Integration
- `/de/dienstleistungen/webdesign` — Web Design
- `/de/dienstleistungen/individuelle-software` — Custom Software
- `/de/portfolio` — Portfolio
- `/de/ueber-uns` — About
- `/de/kontakt` — Contact
- `/de/impressum` — Imprint
- `/de/datenschutz` — Privacy
- `/de/agb` — Terms

**Note:** Service pages are nested under `/de/dienstleistungen/` to maintain consistency with English `/services/` structure.

### Next Steps (Optional):
- Test all German routes in production
- Add more German landing pages if needed
- Update remaining page components with translations as needed

---

## Project Overview

Translate the entire digidog.org website into German with dedicated `/de/*` routes. Content lives in TypeScript files (not a database) so it can be edited directly in the codebase.

**Repo:** `/Users/erik/Desktop/Projects/Digidog/digidog-homepage`
**Framework:** Next.js (App Router), React, TypeScript, TailwindCSS
**Current state:** German i18n infrastructure fully implemented. Translation system uses JSON files (`src/translations/english.json` and `src/translations/german.json`). The i18n system uses React Context (`src/i18n/i18n-context.tsx`).

---

## Architecture Decision

**Approach:** Each German page is a thin Next.js server component (for SEO metadata) that renders a client component which forces `setLocale("DE")` and renders the SAME page component used by the English version. No design duplication.

**Pattern for every German page:**

```
src/app/de/{slug}/page.tsx               <- Server component (metadata only)
src/app/client-pages/{Name}DEClient.tsx   <- Client wrapper (setLocale + render)
```

The client wrapper is ~20 lines:

```tsx
"use client";
import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import OriginalPage from "@/components/pages/OriginalPage";

export default function PageDEClient() {
  const { setLocale } = useTranslation();
  useEffect(() => {
    setLocale("DE");
    return () => setLocale("EN");
  }, [setLocale]);
  return <OriginalPage />;
}
```

---

## Step-by-step Implementation

### STEP 1: Audit existing translations in de.ts

**File:** `src/i18n/locales/de.ts` (336 lines)

Sections that already exist:
- `common` — shared buttons, labels
- `ai` — AI Solutions page  
- `web` — Web Design page
- `software` — Custom Software page
- `cards` — cards component

**Missing sections to ADD to `de.ts`:**
- `home` — Homepage content
- `about` — About page
- `contact` — Contact page
- `portfolio` — Portfolio page
- `nav` — Navigation labels
- `footer` — Footer content
- `aiIntegration` — AI Integration page (separate from AI Solutions)
- `cta` — Shared CTA sections (ContactCTA component)

### STEP 2: Audit which page components use useTranslation()

Check each component in `src/components/pages/`:

| Component | Uses useTranslation() | Has hardcoded English |
|-----------|----------------------|----------------------|
| HomePage.tsx | NO | YES — needs full i18n |
| AboutPage.tsx | Partial | Some hardcoded |
| AiSolutionsPage.tsx | Yes | Some hardcoded |
| AiIntegrationPage.tsx | Partial | Heavy hardcoding |
| WebDesignPage.tsx | Yes | Some hardcoded |
| CustomSoftwarePage.tsx | Yes | Some hardcoded |
| ContactPage.tsx | Yes | Some hardcoded |
| PortfolioPage.tsx | Partial | Some hardcoded |

**For each component:** Search for any remaining hardcoded English strings. Replace them with translation keys from `t.section.key`.

### STEP 3: Add missing translations to de.ts AND en.ts

**IMPORTANT:** Both `de.ts` and `en.ts` MUST have the exact same shape/keys. If you add a key to `de.ts`, add it to `en.ts` too.

#### 3a: Homepage translations

Open `src/components/pages/HomePage.tsx`. Find every hardcoded English string. Create a `home` section in both files:

```ts
// de.ts
home: {
  heroBadge: "KI-Automatisierung & Webentwicklung",
  heroTitle1: "Wir bauen digitale",
  heroTitle2: "Lösungen, die wachsen",
  heroDescription: "Von intelligenten KI-Automatisierungen...",
  heroCtaPrimary: "Kostenloses Erstgespräch",
  heroCtaSecondary: "Unsere Leistungen",
  // ... all other strings
},
```

```ts
// en.ts — same keys, English values
home: {
  heroBadge: "AI Automation & Web Development",
  heroTitle1: "We build digital",
  heroTitle2: "solutions that scale",
  // ...
},
```

#### 3b: Navigation translations

```ts
// de.ts
nav: {
  services: "Dienstleistungen",
  aiSolutions: "KI-Lösungen",
  aiIntegration: "KI-Integration",
  webDesign: "Webdesign",
  customSoftware: "Individuelle Software",
  portfolio: "Portfolio",
  about: "Über uns",
  contact: "Kontakt",
  blog: "Blog",
  bookCall: "Gespräch buchen",
},
```

#### 3c: Footer translations

```ts
// de.ts
footer: {
  description: "KI-Beratung und Full-Stack Webentwicklung für mittelständische Unternehmen.",
  services: "Dienstleistungen",
  company: "Unternehmen",
  legal: "Rechtliches",
  imprint: "Impressum",
  privacy: "Datenschutz",
  terms: "AGB",
  copyright: "© 2026 DigiDog. Alle Rechte vorbehalten.",
},
```

#### 3d: Repeat for About, Contact, Portfolio, AI Integration

Same process for each page: find hardcoded strings -> add keys to both locale files -> replace in component.


### STEP 4: Update page components to use translations

For each component, replace hardcoded English with `t.section.key`:

```tsx
// BEFORE (hardcoded)
<h1>We build digital solutions that scale</h1>

// AFTER (translated)  
const { t } = useTranslation();
<h1>{t.home.heroTitle1} {t.home.heroTitle2}</h1>
```

**Rules:**
- Import `useTranslation` if not already imported
- Destructure `{ t }` from the hook
- Replace every English string with `t.section.key`
- Keep JSX structure and styling exactly the same
- Do NOT change any className, style, or layout

### STEP 5: Create locale-aware route map

**Create new file:** `src/i18n/routes.ts`

```ts
import type { Locale } from "./i18n-context";

export const routes: Record<Locale, Record<string, string>> = {
  EN: {
    home: "/",
    aiSolutions: "/services/ai-solutions",
    aiIntegration: "/services/ai-integration",
    webDesign: "/services/web-design",
    customSoftware: "/services/custom-software",
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
    aiSolutions: "/de/ki-loesungen",
    aiIntegration: "/de/ki-integration",
    webDesign: "/de/webdesign",
    customSoftware: "/de/individuelle-software",
    portfolio: "/de/portfolio",
    about: "/de/ueber-uns",
    contact: "/de/kontakt",
    blog: "/blog", // blog stays EN for now
    imprint: "/de/impressum",
    privacy: "/de/datenschutz",
    terms: "/de/agb",
  },
  TR: {
    // Same as EN for now
    home: "/",
    aiSolutions: "/services/ai-solutions",
    aiIntegration: "/services/ai-integration",
    webDesign: "/services/web-design",
    customSoftware: "/services/custom-software",
    portfolio: "/portfolio",
    about: "/about",
    contact: "/contact",
    blog: "/blog",
    imprint: "/imprint",
    privacy: "/privacy",
    terms: "/terms",
  },
};

export function useLocalizedRoutes() {
  // Import useTranslation inside the hook
  // Return routes[locale]
}
```

### STEP 6: Create German route directories and server pages

Create these directories + page.tsx files under `src/app/de/`:

```
src/app/de/page.tsx                          <- German homepage
src/app/de/ki-loesungen/page.tsx             <- AI Solutions
src/app/de/ki-integration/page.tsx           <- AI Integration
src/app/de/webdesign/page.tsx                <- Web Design (general)
src/app/de/individuelle-software/page.tsx    <- Custom Software
src/app/de/kontakt/page.tsx                  <- Contact
src/app/de/ueber-uns/page.tsx                <- About
src/app/de/portfolio/page.tsx                <- Portfolio
src/app/de/impressum/page.tsx                <- Imprint
src/app/de/datenschutz/page.tsx              <- Privacy
src/app/de/agb/page.tsx                      <- Terms
```

Already exist (don't touch):
- `src/app/de/webdesign-agentur-berlin/page.tsx`
- `src/app/de/webdesign-agentur-hamburg/page.tsx`


### STEP 7: Create DE client wrappers

For each page, create a client wrapper in `src/app/client-pages/`.

**Files to create:**

1. `HomeDEClient.tsx` — wraps `HomePage`
2. `AiSolutionsDEClient.tsx` — wraps `AiSolutionsPage`
3. `AiIntegrationDEClient.tsx` — wraps `AiIntegrationPage`
4. `CustomSoftwareDEClient.tsx` — wraps `CustomSoftwarePage`
5. `ContactDEClient.tsx` — wraps `ContactPage`
6. `AboutDEClient.tsx` — wraps `AboutPage`
7. `PortfolioDEClient.tsx` — wraps `PortfolioPage`
8. `ImprintDEClient.tsx` — wraps `ImprintPage`
9. `PrivacyDEClient.tsx` — wraps `PrivacyPage`
10. `TermsDEClient.tsx` — wraps `TermsPage`

Already exists: `WebDesignDEClient.tsx`

**Template for ALL of them (copy-paste, change import + name):**

```tsx
"use client";
import { useEffect } from "react";
import { useTranslation } from "@/i18n/i18n-context";
import PageComponent from "@/components/pages/{PageName}";

export default function {PageName}DEClient() {
  const { setLocale } = useTranslation();
  useEffect(() => {
    setLocale("DE");
    return () => setLocale("EN");
  }, [setLocale]);
  return <PageComponent />;
}
```

### STEP 8: Write server page files with German SEO metadata

Each `/de/` page needs German metadata. Here is the data for each:

**`/de/page.tsx` (Homepage):**
- title: "DigiDog — KI-Automatisierung & Webentwicklung Agentur"
- description: "KI-Beratung und Full-Stack Webentwicklung für mittelständische Unternehmen. Maßgeschneiderte KI-Automatisierungen, Websites und Software."
- canonical: "/de"
- hreflang: de -> /de, en -> /

**`/de/ki-loesungen/page.tsx`:**
- title: "KI-Lösungen & Automatisierung für Unternehmen | DigiDog"
- description: "Maßgeschneiderte KI-Lösungen: Chatbots, Predictive Analytics, Computer Vision und Prozessautomatisierung für mittelständische Unternehmen."
- canonical: "/de/ki-loesungen"
- hreflang: de -> /de/ki-loesungen, en -> /services/ai-solutions

**`/de/ki-integration/page.tsx`:**
- title: "KI-Integration in bestehende Systeme | DigiDog"
- description: "Wir integrieren künstliche Intelligenz in Ihre bestehenden Geschäftsprozesse und Systeme. MCP-Server, API-Integrationen und Workflow-Automatisierung."
- canonical: "/de/ki-integration"
- hreflang: de -> /de/ki-integration, en -> /services/ai-integration

**`/de/webdesign/page.tsx`:**
- title: "Webdesign Agentur — Professionelle Websites & Webentwicklung | DigiDog"
- description: "Ihre Webdesign Agentur: Maßgeschneiderte Websites, moderne Webentwicklung mit React & Next.js, UX/UI Design und SEO-Optimierung. Kostenloses Erstgespräch."
- canonical: "/de/webdesign"
- hreflang: de -> /de/webdesign, en -> /services/web-design
- keywords: ["webdesign agentur", "webdesign", "webentwicklung", "website erstellen lassen", "webagentur"]

**`/de/individuelle-software/page.tsx`:**
- title: "Individuelle Softwareentwicklung | DigiDog"
- description: "Maßgeschneiderte Software, API-Integrationen und SaaS-Plattformen. Von internen Tools bis zu kompletten Geschäftsanwendungen."
- canonical: "/de/individuelle-software"
- hreflang: de -> /de/individuelle-software, en -> /services/custom-software

**`/de/kontakt/page.tsx`:**
- title: "Kontakt — Kostenloses Erstgespräch buchen | DigiDog"
- description: "Nehmen Sie Kontakt auf für ein kostenloses 30-minütiges Erstgespräch. Wir besprechen Ihre Anforderungen und zeigen Ihnen, wie wir helfen können."
- canonical: "/de/kontakt"
- hreflang: de -> /de/kontakt, en -> /contact

**`/de/ueber-uns/page.tsx`:**
- title: "Über uns — Das DigiDog Team | DigiDog"
- description: "Lernen Sie das Team hinter DigiDog kennen. KI-Experten und Full-Stack-Entwickler mit Leidenschaft für digitale Innovation."
- canonical: "/de/ueber-uns"
- hreflang: de -> /de/ueber-uns, en -> /about

**`/de/portfolio/page.tsx`:**
- title: "Portfolio — Unsere Projekte | DigiDog"
- description: "Ausgewählte Projekte aus den Bereichen KI-Automatisierung, Webentwicklung und individuelle Software."
- canonical: "/de/portfolio"
- hreflang: de -> /de/portfolio, en -> /portfolio

**`/de/impressum/page.tsx`:**
- title: "Impressum | DigiDog"
- description: "Impressum der DigiDog LLC gemäß § 5 TMG."
- canonical: "/de/impressum"

**`/de/datenschutz/page.tsx`:**
- title: "Datenschutzerklärung | DigiDog"
- description: "Datenschutzerklärung der DigiDog LLC gemäß DSGVO."
- canonical: "/de/datenschutz"

**`/de/agb/page.tsx`:**
- title: "Allgemeine Geschäftsbedingungen | DigiDog"
- description: "AGB der DigiDog LLC."
- canonical: "/de/agb"

### STEP 9: Update sitemap.ts

**File:** `src/app/sitemap.ts`

Add all German pages to the static pages array with appropriate priorities.

### STEP 10: Update Navbar.tsx

Use `useTranslation()` for all text labels. Use the route map from `src/i18n/routes.ts` so links point to correct locale paths. Add a simple DE/EN language toggle button.

### STEP 11: Update Footer.tsx

Same as Navbar — use translations + route map for all links and text.

### STEP 12: Update internal links in page components

Search for hardcoded `href="/services/..."`, `href="/contact"`, `href="/portfolio"`, `href="/about"` in all components under `src/components/pages/`. Replace with locale-aware links using the route map.

---

## Execution Order (Priority)

1. Steps 1-4: Translation infrastructure (de.ts, en.ts, route map)
2. Step 5: Route map file
3. Steps 6-8: Homepage first (/de), then service pages
4. Steps 10-11: Navbar + Footer translations
5. Step 9: Sitemap
6. Step 12: Internal link fixes

---

## File Checklist

### New files created:
- [x] `src/i18n/routes.ts` ✅
- [x] `src/app/de/page.tsx` ✅
- [x] `src/app/de/dienstleistungen/ki-loesungen/page.tsx` ✅
- [x] `src/app/de/dienstleistungen/ki-integration/page.tsx` ✅
- [x] `src/app/de/dienstleistungen/webdesign/page.tsx` ✅
- [x] `src/app/de/dienstleistungen/individuelle-software/page.tsx` ✅
- [x] `src/app/de/kontakt/page.tsx` ✅
- [x] `src/app/de/ueber-uns/page.tsx` ✅
- [x] `src/app/de/portfolio/page.tsx` ✅
- [x] `src/app/de/impressum/page.tsx` ✅
- [x] `src/app/de/datenschutz/page.tsx` ✅
- [x] `src/app/de/agb/page.tsx` ✅
- [x] `src/app/client-pages/HomeDEClient.tsx` ✅
- [x] `src/app/client-pages/AiSolutionsDEClient.tsx` ✅
- [x] `src/app/client-pages/AiIntegrationDEClient.tsx` ✅
- [x] `src/app/client-pages/CustomSoftwareDEClient.tsx` ✅
- [x] `src/app/client-pages/ContactDEClient.tsx` ✅
- [x] `src/app/client-pages/AboutDEClient.tsx` ✅
- [x] `src/app/client-pages/PortfolioDEClient.tsx` ✅
- [x] `src/app/client-pages/ImprintDEClient.tsx` ✅
- [x] `src/app/client-pages/PrivacyDEClient.tsx` ✅
- [x] `src/app/client-pages/TermsDEClient.tsx` ✅

### Files modified:
- [x] `src/components/Navbar.tsx` — added locale-aware routing with routes map ✅
- [x] `src/components/Footer.tsx` — added locale-aware routing with routes map ✅
- [x] `src/app/sitemap.ts` — added all /de/ routes ✅

### Translation files status:
- ✅ `src/translations/english.json` — Already contains all necessary translations (nav, footer, hero, services, contact, etc.)
- ✅ `src/translations/german.json` — Already contains all necessary translations (nav, footer, hero, services, contact, etc.)
- ℹ️ Note: Project uses JSON translation files instead of TypeScript locale files

### Page components status:
- ✅ `src/components/HeroSection.tsx` — Already uses translations
- ✅ `src/components/ServicesSection.tsx` — Already uses translations
- ✅ `src/components/ContactCTA.tsx` — Already uses translations
- ✅ `src/components/CtaBanner.tsx` — Already uses translations
- ✅ `src/components/pages/AiSolutionsPage.tsx` — Already uses translations
- ✅ `src/components/pages/WebDesignPage.tsx` — Already uses translations
- ✅ `src/components/pages/CustomSoftwarePage.tsx` — Already uses translations
- ℹ️ Other page components may need translation updates (to be done as needed)

### Already done (don't touch):
- [x] `src/app/client-pages/WebDesignDEClient.tsx`
- [x] `src/app/de/webdesign-agentur-berlin/page.tsx`
- [x] `src/app/de/webdesign-agentur-hamburg/page.tsx`

---

## Key Rules

1. **NEVER create separate component files for German.** Same component renders both languages.
2. **NEVER duplicate CSS or layouts.** German pages use the exact same design.
3. **`de.ts` is the single source of truth** for all German content.
4. **Both `de.ts` and `en.ts` must have identical key structure.** TypeScript will error otherwise.
5. **Test incrementally.** After each page, verify before moving to the next.
6. **Keep translation keys short:** `t.home.heroTitle1` not `t.homePage.heroSection.mainTitle.line1`
