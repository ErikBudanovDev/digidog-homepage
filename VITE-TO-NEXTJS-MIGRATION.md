# Vite → Next.js Migration Plan

> **Goal:** Move ALL components from the parent Vite project (`../src/`) into the Next.js project (`nextjs-app/src/`), eliminating the dual-project architecture.
> **After migration:** The `@` alias resolves within `nextjs-app/src/` instead of `../src/`. The parent Vite project becomes unused.

---

## CRITICAL RULES

1. **Do NOT delete the parent Vite project** — keep it as a backup until migration is verified.
2. **Work one phase at a time.** Verify `npm run dev` compiles after each phase.
3. **All components use `"use client"` directive** since they use React hooks, motion, etc.
4. **Keep the `react-router` shim** at `src/shims/react-router.tsx` — all migrated components still import from `react-router`.
5. **Keep the `figma:asset/` webpack plugin** in `next.config.ts` — migrated components still use `figma:asset/` imports.
6. **The `figma-assets/` directory in `public/`** must contain the actual images. If assets are missing, the figma:asset imports will resolve to broken `/figma-assets/HASH` paths.

---

## CURRENT ARCHITECTURE

```
DigidogNewHomepage/
├── src/                          ← PARENT VITE PROJECT (source of truth for components)
│   ├── app/
│   │   ├── pages/                ← 12 page components (HomePage, AboutPage, etc.)
│   │   ├── components/           ← Shared components (Navbar, Footer, HeroSection, etc.)
│   │   │   ├── ui/               ← UI primitives (brand.ts, buttons, cards, hero-layout, section, etc.)
│   │   │   └── figma/            ← ImageWithFallback
│   │   └── i18n/                 ← I18n context + locale files (de.ts, en.ts, tr.ts)
│   └── imports/                  ← Figma-generated SVG components + markdown content
│
└── nextjs-app/                   ← NEXT.JS PROJECT
    ├── src/
    │   ├── app/                  ← Next.js App Router pages (page.tsx with metadata)
    │   │   └── client-pages/     ← Thin "use client" wrappers importing from @/ (parent Vite)
    │   ├── components/           ← I18nWrapper only
    │   ├── shims/                ← react-router shim
    │   └── translations/         ← JSON translation files
    └── next.config.ts            ← Webpack config with @ → ../src alias
```

## TARGET ARCHITECTURE

```
nextjs-app/
├── src/
│   ├── app/                      ← Next.js App Router pages
│   │   ├── page.tsx              ← Metadata + direct component import (no wrapper needed)
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── services/*/page.tsx
│   │   ├── blog/page.tsx
│   │   └── ...
│   ├── components/               ← ALL components moved here
│   │   ├── pages/                ← Full page components (HomePage, AboutPage, etc.)
│   │   ├── ui/                   ← UI primitives
│   │   ├── figma/                ← ImageWithFallback
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ContactCTA.tsx
│   │   ├── CtaBanner.tsx
│   │   ├── CosmicElements.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── Girl3D.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── ReviewsSection.tsx
│   │   ├── TrustedPartners.tsx
│   │   ├── BlogSection.tsx
│   │   ├── SEO.tsx
│   │   └── I18nWrapper.tsx
│   ├── imports/                  ← Figma SVG components + markdown
│   ├── i18n/                     ← I18n context + locale files
│   ├── shims/                    ← react-router shim (keep as-is)
│   └── translations/             ← JSON translation files (keep as-is)
└── next.config.ts                ← Simplified: @ → ./src (no more ../src)
```

---

## PHASE 1: Copy files into Next.js project

### 1a. Copy components
```bash
# From nextjs-app/ directory:
cp -r ../src/app/components/* src/components/
```

This copies: Navbar.tsx, Footer.tsx, HeroSection.tsx, ServicesSection.tsx, ContactCTA.tsx, CtaBanner.tsx, CosmicElements.tsx, ScrollReveal.tsx, Girl3D.tsx, PortfolioSection.tsx, ReviewsSection.tsx, TrustedPartners.tsx, BlogSection.tsx, SEO.tsx, figma/, ui/

### 1b. Copy page components
```bash
mkdir -p src/components/pages
cp ../src/app/pages/*.tsx src/components/pages/
```

### 1c. Copy i18n
```bash
cp -r ../src/app/i18n src/i18n
```

### 1d. Copy imports (Figma SVGs + markdown)
```bash
cp -r ../src/imports src/imports
```

### 1e. Verify all files are present
```bash
ls src/components/         # Should have ~15 .tsx files + ui/ + figma/
ls src/components/pages/   # Should have 12 page .tsx files
ls src/i18n/               # Should have i18n-context.tsx + locales/
ls src/imports/            # Should have SVG .tsx/.ts files + .md files
```

---

## PHASE 2: Update the @ alias in next.config.ts

Change the webpack alias from `../src` to `./src`:

```ts
// BEFORE:
config.resolve.alias["@"] = path.resolve(__dirname, "../src");

// AFTER:
config.resolve.alias["@"] = path.resolve(__dirname, "src");
```

Also update the CosmicElements replacement path:
```ts
// BEFORE:
/[\\/]app[\\/]components[\\/]CosmicElements$/

// AFTER - may need adjustment based on new path
```

---

## PHASE 3: Fix all import paths in migrated files

### Import path changes needed:

Every migrated component currently uses imports relative to the parent Vite project structure. They need to be updated to the new structure.

**Components (src/components/*.tsx):**
```
BEFORE: import { Navbar } from "../components/Navbar"
AFTER:  import { Navbar } from "./Navbar"  (or "@/components/Navbar")

BEFORE: import { colors, fonts } from "./ui/brand"
AFTER:  import { colors, fonts } from "./ui/brand"  (same — these are relative within components/)

BEFORE: import { useTranslation } from "../i18n/i18n-context"
AFTER:  import { useTranslation } from "@/i18n/i18n-context"

BEFORE: import enT from "../../../nextjs-app/src/translations/english.json"
AFTER:  import enT from "@/translations/english.json"

BEFORE: import deT from "../../../nextjs-app/src/translations/german.json"
AFTER:  import deT from "@/translations/german.json"

BEFORE: import enPf from "../../../nextjs-app/src/translations/portfolio/english.json"
AFTER:  import enPf from "@/translations/portfolio/english.json"

BEFORE: import dePf from "../../../nextjs-app/src/translations/portfolio/german.json"
AFTER:  import dePf from "@/translations/portfolio/german.json"

BEFORE: import enPg from "../../../nextjs-app/src/translations/pages/english.json"
AFTER:  import enPg from "@/translations/pages/english.json"

BEFORE: import dePg from "../../../nextjs-app/src/translations/pages/german.json"
AFTER:  import dePg from "@/translations/pages/german.json"
```

**Page components (src/components/pages/*.tsx):**
```
BEFORE: import { Navbar } from "../components/Navbar"
AFTER:  import { Navbar } from "@/components/Navbar"

BEFORE: import { colors, fonts } from "../components/ui/brand"
AFTER:  import { colors, fonts } from "@/components/ui/brand"

BEFORE: import svgPaths from "../../imports/svg-ly9usgqlzn"
AFTER:  import svgPaths from "@/imports/svg-ly9usgqlzn"

BEFORE: import { useTranslation } from "../i18n/i18n-context"
AFTER:  import { useTranslation } from "@/i18n/i18n-context"
```

**I18n context (src/i18n/i18n-context.tsx):**
```
BEFORE: import { de } from "./locales/de"  (should be fine — relative)
AFTER:  (same)
```

**I18nWrapper (src/components/I18nWrapper.tsx):**
```
BEFORE: import { I18nProvider } from "@/app/i18n/i18n-context"
AFTER:  import { I18nProvider } from "@/i18n/i18n-context"
```

### Bulk find-and-replace strategy:

Use these sed commands from the `nextjs-app/` directory:

```bash
# Fix translation JSON imports (components)
find src/components -name "*.tsx" -exec sed -i '' \
  's|from "../../../nextjs-app/src/translations/|from "@/translations/|g' {} +

# Fix i18n imports
find src/components -name "*.tsx" -exec sed -i '' \
  's|from "../i18n/i18n-context"|from "@/i18n/i18n-context"|g' {} +

# Fix page imports referencing ../components/
find src/components/pages -name "*.tsx" -exec sed -i '' \
  's|from "../components/|from "@/components/|g' {} +

# Fix imports referencing ../../imports/
find src/components/pages -name "*.tsx" -exec sed -i '' \
  's|from "../../imports/|from "@/imports/|g' {} +
```

---

## PHASE 4: Update client-page wrappers (or remove them)

The `src/app/client-pages/` wrappers currently import from `@/app/pages/`. After migration, they should import from `@/components/pages/`:

```
BEFORE: import HomePage from "@/app/pages/HomePage"
AFTER:  import HomePage from "@/components/pages/HomePage"
```

OR better — remove the client-page wrappers entirely and import directly in page.tsx:

```tsx
// src/app/page.tsx
import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";

export const metadata: Metadata = { ... };

export default function Page() {
  return <HomePage />;
}
```

Since all page components already have `"use client"` behavior (hooks, motion, etc.), they need a `"use client"` boundary. You can either:
- Keep the wrapper files but update the import path
- Or add `"use client"` to each page component and import directly

**Recommended: Keep wrappers, just update the import path.** It's safer.

```bash
find src/app/client-pages -name "*.tsx" -exec sed -i '' \
  's|from "@/app/pages/|from "@/components/pages/|g' {} +
```

---

## PHASE 5: Add "use client" to all migrated components

Every component that uses React hooks, motion, browser APIs, or event handlers needs `"use client"` at the top. Add it to every file in:
- `src/components/*.tsx` (all of them)
- `src/components/pages/*.tsx` (all of them)
- `src/components/ui/*.tsx` (all that use hooks)
- `src/i18n/i18n-context.tsx` (already has it from I18nWrapper)

```bash
# Add "use client" to all .tsx files that don't already have it
for f in src/components/*.tsx src/components/pages/*.tsx src/components/ui/hero-layout.tsx src/components/ui/buttons.tsx src/components/ui/cards.tsx src/components/ui/section.tsx; do
  if ! head -5 "$f" | grep -q '"use client"'; then
    sed -i '' '1i\
"use client";\
' "$f"
  fi
done
```

**IMPORTANT:** Pure data files like `brand.ts`, `utils.ts` do NOT need `"use client"`. Only files with React hooks/components.

---

## PHASE 6: Verify and fix

1. Run `npm run dev` and check for compilation errors
2. Fix any remaining import paths
3. Test every page in the browser
4. Verify language switching works
5. Verify all translations load correctly

---

## PHASE 7: Clean up (AFTER full verification)

1. Remove `src/app/client-pages/` directory (if wrappers were inlined)
2. Update `next.config.ts` to remove the `transpilePackages` and any parent-project-specific config
3. Consider removing the `react-router` shim by refactoring to use `next/navigation` directly (future task)
4. Consider removing `figma:asset/` imports by replacing with standard `next/image` + local files (future task)

---

## Execution Order

1. Phase 1 (copy files) — terminal commands
2. Phase 2 (update alias) — edit next.config.ts
3. Phase 3 (fix imports) — bulk sed + manual fixes
4. Phase 4 (update wrappers) — bulk sed
5. Phase 5 (add "use client") — bulk script
6. Phase 6 (verify) — manual testing
7. Phase 7 (cleanup) — only after everything works

**Estimate:** 1-2 hours for Cursor to execute, with manual verification between phases.
