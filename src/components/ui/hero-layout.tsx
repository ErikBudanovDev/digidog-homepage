import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import {
  StarField,
  ShootingStar,
  Spaceship,
  Planet,
  StarShape,
  OrbitDot,
} from "../CosmicElements";
import { colors, fonts, transitions } from "./brand";
import { SectionContainer, SectionBadge } from "./section";

/* ── Types ── */

export interface BreadcrumbItem {
  label: string;
  /** If provided, the breadcrumb is a clickable link that navigates to this path */
  path?: string;
  /** Accent color for the final (active) breadcrumb. Defaults to colors.green */
  color?: string;
}

export interface HeroLayoutProps {
  /** Section HTML id attribute */
  id?: string;
  /** Breadcrumb trail rendered above the badge */
  breadcrumbs?: BreadcrumbItem[];
  /** Badge text shown above the title */
  badge?: string;
  /** Badge content as ReactNode (for icons + text). Overrides `badge` if provided */
  badgeContent?: React.ReactNode;
  /** Headline — can include <br /> or JSX */
  title: React.ReactNode;
  /** Custom gradient for the title. Defaults to colors.gradientHeroText */
  titleGradient?: string;
  /** Override the title font family. Defaults to fonts.heading */
  titleFont?: string;
  /** Override the title font weight. Defaults to 700 */
  titleWeight?: number;
  /** Override the title leading class. Defaults to "leading-[1.12]" */
  titleLeading?: string;
  /** Override the title bottom margin class. Defaults to "mb-6" */
  titleMarginBottom?: string;
  /** Optional subtitle paragraph below the title */
  description?: React.ReactNode;
  /** Override description className */
  descriptionClassName?: string;
  /** Override description inline style */
  descriptionStyle?: React.CSSProperties;
  /** CTA buttons / links rendered below the description */
  actions?: React.ReactNode;
  /** Margin-top class for actions wrapper. Defaults to "mt-10" */
  actionsMarginTop?: string;
  /** Tailwind min-height classes. Default: "min-h-[600px] lg:min-h-[720px]" */
  minHeight?: string;
  /** Tailwind padding classes for the inner SectionContainer. Default: "py-[140px] lg:py-[180px]" */
  padding?: string;
  /** Max-width class for the content column. Default: "max-w-[720px]" */
  contentMaxWidth?: string;
  /** Replace the default cosmic background with custom elements */
  backgroundElements?: React.ReactNode;
  /** Extra className for the outer <section> */
  className?: string;
  /** Align content: "left" (default) or "center" */
  align?: "left" | "center";
  /** Optional right-side content (e.g. hero image). Enables a two-column split layout. */
  rightContent?: React.ReactNode;
  /**
   * When `rightContent` is used, controls the vertical alignment of the
   * flex container: "start" | "center" (default: "start")
   */
  splitAlign?: "start" | "center";
}

/* ── Default Cosmic Background ── */

function DefaultCosmicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient blobs */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#285B8D] rounded-full opacity-20 blur-[200px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-[#543365] rounded-full opacity-15 blur-[200px]"
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] rounded-full opacity-10 blur-[200px]"
        style={{ background: colors.green }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[30%] w-[500px] h-[500px] rounded-full opacity-8 blur-[200px]"
        style={{ background: colors.magenta }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cosmic decorations */}
      <StarField count={30} color="rgba(255,255,255,0.7)" />
      <ShootingStar delay={1} style={{ top: "15%", left: "10%", transform: "rotate(-15deg)" }} />
      <ShootingStar delay={4} duration={1.2} style={{ top: "35%", left: "50%", transform: "rotate(-20deg)" }} />

      <motion.div
        className="absolute hidden lg:block"
        style={{ top: "12%", right: "8%" }}
        animate={{ x: [0, -15, 0], y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Spaceship size={110} />
      </motion.div>

      <motion.div
        className="absolute hidden md:block"
        style={{ bottom: "18%", left: "3%" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Planet size={50} color="#6C63FF" />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ top: "25%", left: "5%" }}
        animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <StarShape size={16} color="rgba(0,183,255,0.6)" />
      </motion.div>
      <motion.div
        className="absolute"
        style={{ top: "60%", right: "12%" }}
        animate={{ rotate: [0, -180, -360], scale: [1, 0.8, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <StarShape size={12} color="rgba(255,255,255,0.5)" />
      </motion.div>

      <div className="absolute hidden lg:block" style={{ top: "65%", left: "15%" }}>
        <OrbitDot orbitSize={50} dotSize={5} color={colors.cyan} duration={6} />
      </div>
    </div>
  );
}

/* ── HeroLayout Component ── */

export function HeroLayout({
  id,
  breadcrumbs,
  badge,
  badgeContent,
  title,
  titleGradient,
  titleFont,
  titleWeight,
  titleLeading = "leading-[1.12]",
  titleMarginBottom = "mb-6",
  description,
  descriptionClassName,
  descriptionStyle,
  actions,
  actionsMarginTop = "mt-10",
  minHeight = "min-h-[600px] lg:min-h-[720px]",
  padding = "py-[140px] lg:py-[180px]",
  contentMaxWidth = "max-w-[720px]",
  backgroundElements,
  className = "",
  align = "left",
  rightContent,
  splitAlign = "start",
}: HeroLayoutProps) {
  const navigate = useNavigate();
  const textAlign = align === "center" ? "text-center" : "text-left";
  const itemsAlign = align === "center" ? "justify-center" : "";
  const centerAuto = align === "center" ? "mx-auto" : "";

  const defaultDescClassName = `text-[16px] md:text-[18px] leading-[1.7] max-w-[600px] ${centerAuto}`;
  const defaultDescStyle: React.CSSProperties = { fontFamily: fonts.body, color: colors.textSlate };

  /* ── Text column (shared by both layouts) ── */
  const textColumn = (
    <div className={`${rightContent ? "flex-1" : ""} ${contentMaxWidth} ${textAlign} ${centerAuto}`}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <motion.div
          className={`flex items-center gap-2 mb-8 ${itemsAlign}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: transitions.smooth }}
        >
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight size={14} className="text-white/30" />}
                {crumb.path && !isLast ? (
                  <button
                    onClick={() => navigate(crumb.path!)}
                    className="text-white/50 text-[14px] hover:text-white/80 transition-colors cursor-pointer"
                    style={{ fontFamily: fonts.body }}
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span
                    className="text-[14px]"
                    style={{
                      fontFamily: fonts.body,
                      color: isLast ? (crumb.color ?? colors.green) : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </motion.div>
      )}

      {/* Badge */}
      {(badge || badgeContent) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: transitions.smooth }}
        >
          <SectionBadge variant="dark" className="mb-6">
            {badgeContent ?? badge}
          </SectionBadge>
        </motion.div>
      )}

      {/* Title */}
      <motion.h1
        className={`${textAlign} text-[36px] md:text-[48px] lg:text-[56px] ${titleLeading} ${titleMarginBottom}`}
        style={{
          fontFamily: titleFont ?? fonts.heading,
          fontWeight: titleWeight ?? 700,
          background: titleGradient ?? colors.gradientHeroText,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: transitions.smooth }}
      >
        {title}
      </motion.h1>

      {/* Description */}
      {description && (
        <motion.p
          className={descriptionClassName ?? defaultDescClassName}
          style={descriptionStyle ?? defaultDescStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: transitions.smooth }}
        >
          {description}
        </motion.p>
      )}

      {/* Actions */}
      {actions && (
        <motion.div
          className={`flex flex-wrap gap-4 ${actionsMarginTop} ${itemsAlign}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: transitions.smooth }}
        >
          {actions}
        </motion.div>
      )}
    </div>
  );

  /* ── Split layout (with rightContent) ── */
  if (rightContent) {
    const flexAlign = splitAlign === "center" ? "items-center" : "items-start";
    return (
      <section
        id={id}
        className={`relative ${minHeight} overflow-hidden ${className}`}
        style={{ background: colors.navy }}
      >
        {backgroundElements ?? <DefaultCosmicBackground />}

        <div
          className={`relative z-10 max-w-[1296px] mx-auto ${padding} flex flex-col lg:flex-row ${flexAlign} gap-12`}
        >
          {textColumn}
          {rightContent}
        </div>
      </section>
    );
  }

  /* ── Single-column layout ── */
  return (
    <section
      id={id}
      className={`relative ${minHeight} overflow-hidden flex items-center ${className}`}
      style={{ background: colors.navy }}
    >
      {backgroundElements ?? <DefaultCosmicBackground />}

      <div className={`relative z-10 max-w-[1296px] mx-auto w-full ${padding}`}>
        {textColumn}
      </div>
    </section>
  );
}