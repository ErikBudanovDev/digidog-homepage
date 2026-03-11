/* ─────────────────────────────────────────────────────
 * REUSABLE BUTTON & LINK COMPONENTS
 * ───────────────────────────────────────────────────── */

import { forwardRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { colors, fonts, carouselNavGradient } from "./brand";

/** Dispatch custom event to open the booking modal in ContactCTA */
export function openBookingModal() {
  window.dispatchEvent(new CustomEvent("open-booking-modal"));
}

/* ── Primary CTA Button (green) ── */
export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, className = "", style, ...props }, ref) => (
    <motion.button
      ref={ref}
      className={`inline-block bg-[${colors.green}] text-white px-8 py-4 rounded-xl text-[17px] hover:bg-[${colors.greenHover}] transition-colors cursor-pointer ${className}`}
      style={{
        fontFamily: fonts.display,
        fontWeight: 600,
        backgroundColor: colors.green,
        ...style,
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      {...(props as any)}
    >
      {children}
    </motion.button>
  )
);
PrimaryButton.displayName = "PrimaryButton";

/* ── Link with arrow / chevron ── */
export interface LinkWithArrowProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  /** "arrow" for ArrowRight, "chevron" for ChevronRight */
  icon?: "arrow" | "chevron";
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function LinkWithArrow({
  href = "#",
  children,
  className = "",
  icon = "chevron",
  color = colors.textBlueLink,
  onClick,
}: LinkWithArrowProps) {
  const IconComp = icon === "arrow" ? ArrowRight : ChevronRight;

  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center gap-2 text-[15px] hover:gap-3 transition-all ${className}`}
      style={{
        fontFamily: fonts.display,
        fontWeight: 700,
        color,
      }}
    >
      {children}
      <IconComp size={icon === "arrow" ? 15 : 16} />
    </a>
  );
}

/* ── Carousel Nav Button (round, dark gradient) ── */
export interface CarouselNavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}

export function CarouselNavButton({
  direction,
  onClick,
  className = "",
}: CarouselNavButtonProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <motion.button
      onClick={onClick}
      className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${className}`}
      style={{ background: carouselNavGradient }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: direction === "prev" ? 10 : -10 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Icon size={20} className="text-white" />
    </motion.button>
  );
}

/* ── Portfolio Figma Arrow Icon ── */
export function ArrowIcon({ color = colors.textBlueLink }: { color?: string }) {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M8.112 1L12.85 5.738M12.85 5.738L8.112 10.477M12.85 5.738L1.004 5.739"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}