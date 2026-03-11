# Digidog New Homepage — SEO & i18n Implementation Plan

> **Project:** `nextjs-app/` (Next.js 15.1 App Router)
> **Parent Vite project:** `../src/` (components import via `@` alias)
> **Translation files created:** `src/translations/english.json` and `src/translations/german.json`

## CRITICAL RULES

1. **DO NOT create a `[locale]` directory.** DO NOT install `next-intl`. DO NOT add middleware.
2. **DO NOT delete, move, or rename any files.**
3. **DO NOT modify `next.config.ts`.**
4. **Verify `npm run dev` compiles after EACH task.**
5. **Blog posts and portfolio pages are EXCLUDED from translation** — they keep their existing hardcoded content.
6. **The translation JSON files are at** `src/translations/english.json` and `src/translations/german.json`. The existing i18n context is at `../src/app/i18n/i18n-context.tsx` — the language is set via `useTranslation()` which returns `{ locale, setLocale, t }` where `locale` is `"EN"` or `"DE"`.

---

## HOW THE TRANSLATION SYSTEM WORKS

The project already has a client-side i18n system:

- **Provider:** `../src/app/i18n/i18n-context.tsx` exports `I18nProvider`, `useTranslation`
- **Locale files:** `../src/app/i18n/locales/de.ts`, `en.ts`, `tr.ts` (used by service detail page components)
- **Wrapper:** `nextjs-app/src/components/I18nWrapper.tsx` wraps the app in `<I18nProvider>`
- **Usage:** Any component calls `const { t, locale } = useTranslation()` to get translations

The NEW JSON files (`src/translations/english.json`, `src/translations/german.json`) contain:
- `seo.*` — page titles and descriptions for all pages (used in server-side `metadata` exports)
- `hero.*`, `nav.*`, `servicesSection.*`, `contactCta.*`, `ctaBanner.*`, `footer.*` — homepage UI strings
- `common.*` — shared strings

**The JSON files are for the NEXT.JS pages.** The existing `.ts` locale files continue to work for the Vite-imported service detail page components (`AiSolutionsPageClient`, `WebDesignPageClient`, etc.).

---

## TASK 1: Update all page.tsx metadata using the JSON translations

Since Next.js `metadata` exports are server-side and can't use React hooks, import the JSON directly:

```ts
import en from "../../translations/english.json";
// or for deeper paths:
import en from "../../../translations/english.json";
```

Note: The metadata is STATIC (server-rendered) and always uses English for SEO. The German SEO metadata in `german.json` is reserved for when we add URL-based i18n later. For now, just use the English JSON values to improve the metadata.

### Pattern for each page.tsx:
```ts
import en from "../../translations/english.json"; // adjust relative path

export const metadata: Metadata = {
  title: en.seo.home.title,
  description: en.seo.home.description,
  // ... etc
};
```

### Apply to these files (adjust import path depth per file location):

| File | SEO key | Import path |
|------|---------|-------------|
| `src/app/page.tsx` | `en.seo.home` | `../translations/english.json` |
| `src/app/services/ai-integration/page.tsx` | `en.seo.aiIntegration` | `../../../translations/english.json` |
| `src/app/services/ai-solutions/page.tsx` | `en.seo.aiSolutions` | `../../../translations/english.json` |
| `src/app/services/web-design/page.tsx` | `en.seo.webDesign` | `../../../translations/english.json` |
| `src/app/services/custom-software/page.tsx` | `en.seo.customSoftware` | `../../../translations/english.json` |
| `src/app/about/page.tsx` | `en.seo.about` | `../../translations/english.json` |
| `src/app/contact/page.tsx` | `en.seo.contact` | `../../translations/english.json` |
| `src/app/portfolio/page.tsx` | `en.seo.portfolio` | `../../translations/english.json` |
| `src/app/imprint/page.tsx` | `en.seo.imprint` | `../../translations/english.json` |
| `src/app/privacy/page.tsx` | `en.seo.privacy` | `../../translations/english.json` |
| `src/app/terms/page.tsx` | `en.seo.terms` | `../../translations/english.json` |

DO NOT modify blog pages (`src/app/blog/*`).

For pages that have `openGraph`, use `en.seo.xxx.ogTitle` and `en.seo.xxx.ogDescription` if those keys exist.

Also add `keywords` arrays and `twitter` cards to service pages and homepage (see english.json for the titles/descriptions, add relevant keywords from this list):
- Homepage: `["AI automation agency", "AI consulting agency", "web development agency", "KI Agentur"]`
- AI Integration: `["AI automation agency", "AI integration consulting", "MCP server development"]`
- AI Solutions: `["custom AI solutions", "machine learning development", "AI consulting"]`
- Web Design: `["web design agency", "WordPress development agency", "WordPress maintenance service"]`
- Custom Software: `["custom software development agency", "SaaS platform development"]`

---

## TASK 2: Add JSON-LD schemas to service pages and contact page

Add schema constants to each file and wrap the render in a fragment. See the full schema definitions in the earlier `DIGIDOG-SEO-PLAN.md` (already in the project).

**Pattern:**
```tsx
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SomePageClient />
    </>
  );
}
```

Each service page gets a `Service` schema + `FAQPage` schema. Contact page gets `LocalBusiness` schema. See `DIGIDOG-SEO-PLAN.md` for the exact JSON-LD objects.

---

## TASK 3: Enhance root layout schema

In `src/app/layout.tsx`, add `foundingDate`, `areaServed`, `knowsAbout` to the Organization schema, and add a second `WebSite` schema. See `DIGIDOG-SEO-PLAN.md` for details.

---

## TASK 4: Wire translation JSON into homepage components

These components are in `../src/app/components/` (parent Vite project). They currently have hardcoded English. Wire them to use the JSON via the existing `useTranslation` hook.

**Approach:** Since the existing `useTranslation` returns `{ t, locale }` where `t` comes from the `.ts` locale files, the cleanest approach is to:

1. Import both JSON files in each component
2. Use `locale` from `useTranslation()` to pick the right JSON
3. Access the page-specific keys from the JSON

```tsx
import { useTranslation } from "../i18n/i18n-context";
import enJson from "../../nextjs-app/src/translations/english.json";
import deJson from "../../nextjs-app/src/translations/german.json";

// Inside the component:
const { locale } = useTranslation();
const pageT = locale === "DE" ? deJson : enJson;
// Then use: pageT.hero.title1, pageT.nav.services, etc.
```

**IMPORTANT:** Check the import path. Components are in `../src/app/components/` and the JSON files are in `nextjs-app/src/translations/`. The relative path from components would be something like `../../../../nextjs-app/src/translations/english.json` — verify this resolves correctly or use the `@` alias if configured.

Alternatively, if the import path is too deep, add the JSON data to the existing `.ts` locale files by adding `hero`, `nav`, `servicesSection`, `contactCta`, `ctaBanner`, `footer` keys to `de.ts` and `en.ts`. This is simpler since those files are already imported via `useTranslation()`.

### Components to wire (in `../src/app/components/`):

**HeroSection.tsx:**
- Replace `"AI Agency That Rocks"` → `pageT.hero.title1`
- Replace `"Your Digital Presence"` → `pageT.hero.title2`
- Replace description string → `pageT.hero.description`
- Replace `"Book a consultation"` → `pageT.hero.cta`

**Navbar.tsx:**
- Add language switcher (Globe icon with EN/DE dropdown)
- Replace nav link labels with `pageT.nav.*`
- Replace service dropdown labels with `pageT.nav.*`
- Replace `"All Services"` → `pageT.nav.allServices`

**ServicesSection.tsx:**
- Replace section badge text → `pageT.servicesSection.badge`
- Replace `"What we "` + `"create"` → `pageT.servicesSection.title1` + `pageT.servicesSection.title2`
- Replace subtitle → `pageT.servicesSection.subtitle`
- Override service card titles/subtitles/results with `pageT.servicesSection.webTitle`, etc.
- Replace `"Learn more"` → `pageT.servicesSection.learnMore`

**Footer.tsx:**
- Replace section headers: `"Quick Links"`, `"Services"`, `"Legal"`, `"Contact"` → `pageT.footer.*`
- Replace link labels → `pageT.footer.*`
- Replace `"All rights reserved"` → `pageT.footer.rights`
- Replace tagline → `pageT.footer.tagline`

**ContactCTA.tsx:**
- Replace title → `pageT.contactCta.title`
- Replace subtitle → `pageT.contactCta.subtitle`
- Replace CTA text → `pageT.contactCta.cta`
- Replace form labels → `pageT.contactCta.formName`, etc.
- Replace `"Thank you!"` → `pageT.contactCta.thankYou`

**CtaBanner.tsx:**
- Replace title → `pageT.ctaBanner.title`
- Replace subtitle → `pageT.ctaBanner.subtitle`
- Replace CTA → `pageT.ctaBanner.cta`

---

## TASK 5: Add Related Posts + service cross-links to blog detail page

See `DIGIDOG-SEO-PLAN.md` Task 5 for the full implementation. This doesn't need translation — it stays in English.

---

## TASK 6: Update sitemap with DE alternate URLs

See `DIGIDOG-SEO-PLAN.md` Task 6.

---

## TASK 7: Create disavow file

Create `public/disavow.txt`:
```
# Digidog.org Backlink Disavow File
domain:seoflox.io
domain:rank-your.site
domain:rankyour.website
domain:seo-backlink.agency
domain:prolinkbox.com
domain:primeseo.xyz
```

---

## Execution Order

1. Task 1 (page metadata from JSON) → verify compiles
2. Task 3 (layout schema) → verify compiles
3. Task 2 (service + contact schemas) → verify compiles
4. Task 4 (wire components to translations) → one component at a time, verify after each
5. Task 5 (blog related posts) → verify compiles
6. Task 6 (sitemap) → verify compiles
7. Task 7 (disavow file) → trivial

**After ALL tasks, test language switching by clicking the language toggle in the Navbar.**
