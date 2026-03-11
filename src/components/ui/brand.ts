/* ─────────────────────────────────────────────────────
 * BRAND TOKENS
 * Single source of truth for all branding values.
 * Import from here instead of hardcoding hex values.
 * ───────────────────────────────────────────────────── */

/* ── Color palette ── */
export const colors = {
  /* Primaries */
  navy: "#02033d",
  navyDeep: "#0a1628",
  blue: "#0057ff",
  cyan: "#00B7FF",
  teal: "#06b6d4",
  green: "#52bd94",
  greenHover: "#45a882",
  purple: "#a855f7",
  magenta: "#DC43F4",

  /* Gradients (as CSS strings) */
  gradientCosmic:
    "linear-gradient(180deg, #0c1a3a 0%, #1a1250 40%, #251663 70%, #1a1250 100%)",
  gradientBadgeLight:
    "linear-gradient(95deg, #C4E0FD 0%, #5EADFF 100%)",
  gradientHeroText:
    "linear-gradient(90deg, #ffffff 0%, #C1D7FF 100%)",
  gradientServicesAccent:
    "linear-gradient(135deg, #0057ff, #a855f7, #06b6d4)",

  /* Text */
  textDark: "#484964",
  textMuted: "#756e6e",
  textSubtle: "#64748b",
  textSlate: "#94a3b8",
  textSlateLighter: "#cbd5e1",
  textBlueLight: "#7aa2f7",
  textBlueDark: "#003294",
  textBlueLink: "#0057ff",

  /* Backgrounds */
  white: "#ffffff",
  cardDark: "#0f1d35",
  cardDarkOverlay: "rgba(15, 29, 53, 0.95)",
  overlayBlack60: "rgba(0, 0, 0, 0.6)",

  /* Borders */
  borderLight: "rgba(255, 255, 255, 0.08)",
  borderLighter: "rgba(255, 255, 255, 0.10)",
  borderSubtle: "rgba(255, 255, 255, 0.06)",
  borderGray: "#d8dde6",
} as const;

/* ── Font stacks ── */
export const fonts = {
  heading: "'Syne', 'Inter', sans-serif",
  body: "'DM Sans', 'Roboto', sans-serif",
  display: "'Roboto', sans-serif",
  ui: "'Inter', sans-serif",
} as const;

/* ── Layout constants ── */
export const layout = {
  maxWidth: "max-w-[1296px]",
  containerPadding: "px-6 lg:px-20",
  /** Combined Tailwind classes for the standard section container */
  container: "max-w-[1296px] mx-auto px-6 lg:px-20",
} as const;

/* ── Shared transition / animation presets ── */
export const transitions = {
  /** Standard spring-y ease curve for motion elements */
  smooth: [0.25, 0.1, 0.25, 1] as const,
  /** Snappier entrance curve */
  snappy: [0.22, 1, 0.36, 1] as const,
} as const;

/* ── Carousel nav button gradient ── */
export const carouselNavGradient =
  "radial-gradient(circle, #0C1952 0%, #182880 100%)" as const;

/* ── Portfolio card gradient background (data-url SVG) ── */
export const portfolioCardGradientBg = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 700 380' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(35 19 -35 19 350 190)'><stop stop-color='rgba(165,239,255,0.2)' offset='0'/><stop stop-color='rgba(236,183,210,0.043)' offset='0.7708'/><stop stop-color='rgba(70,144,213,0)' offset='1'/></radialGradient></defs></svg>")` as const;
