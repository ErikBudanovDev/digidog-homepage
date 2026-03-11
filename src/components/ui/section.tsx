/* ─────────────────────────────────────────────────────
 * REUSABLE SECTION-LEVEL COMPONENTS
 * ───────────────────────────────────────────────────── */

import { colors, fonts, layout } from "./brand";

/* ── Section Container (max-width + padding) ── */
export function SectionContainer({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "footer" | "header";
}) {
  return (
    <Tag className={`${layout.container} ${className}`}>{children}</Tag>
  );
}

/* ── Section Badge / Pill Label ── */
export type BadgeVariant = "light" | "dark" | "outline";

export function SectionBadge({
  children,
  variant = "light",
  className = "",
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  const base = "inline-block px-5 py-1.5 rounded-full text-[14px] tracking-[2px] uppercase";

  const variants: Record<BadgeVariant, { className: string; style: React.CSSProperties }> = {
    /* Blue gradient pill on white sections (Portfolio, Reviews) */
    light: {
      className: `${base} text-[${colors.textBlueDark}]`,
      style: {
        fontFamily: fonts.display,
        fontWeight: 700,
        color: colors.textBlueDark,
        background: colors.gradientBadgeLight,
      },
    },
    /* Subtle border pill on dark sections (Services) */
    dark: {
      className: `${base} border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm`,
      style: {
        fontFamily: fonts.body,
        fontWeight: 600,
        color: colors.textBlueLight,
        fontSize: 13,
        letterSpacing: "2.5px",
      },
    },
    /* Outline style for misc use */
    outline: {
      className: `${base} border border-current/20 bg-transparent`,
      style: {
        fontFamily: fonts.display,
        fontWeight: 600,
        color: colors.textBlueLink,
      },
    },
  };

  const v = variants[variant];

  return (
    <div className={`${v.className} ${className}`} style={v.style}>
      {variant === "dark" ? (
        <span className="inline-flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: colors.blue }}
          />
          {children}
        </span>
      ) : (
        children
      )}
    </div>
  );
}

/* ── Section Heading ── */
export type HeadingTheme = "light" | "dark";

export function SectionHeading({
  children,
  subtitle,
  theme = "light",
  className = "",
}: {
  children: React.ReactNode;
  subtitle?: React.ReactNode;
  theme?: HeadingTheme;
  className?: string;
}) {
  const headingColor = theme === "dark" ? "text-white" : `text-[${colors.textDark}]`;

  return (
    <div className={className}>
      <h2
        className={`${headingColor} text-[32px] md:text-[44px] leading-[1.3]`}
        style={{
          fontFamily: theme === "dark" ? fonts.heading : fonts.ui,
          fontWeight: 700,
          color: theme === "dark" ? undefined : colors.textDark,
        }}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className="mt-4 max-w-[700px] mx-auto text-[16px] md:text-[17px] leading-[1.7]"
          style={{
            fontFamily: fonts.body,
            color: theme === "dark" ? colors.textSubtle : colors.textMuted,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
