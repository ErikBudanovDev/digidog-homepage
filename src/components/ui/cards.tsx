/* ─────────────────────────────────────────────────────
 * REUSABLE CARD COMPONENTS
 * ───────────────────────────────────────────────────── */

import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { colors, fonts, portfolioCardGradientBg } from "./brand";
import { ArrowIcon, LinkWithArrow } from "./buttons";
import { useTranslation } from "../../i18n/i18n-context";

/* ── Content Card (generic hover-lift card for Reviews, Blog, etc.) ── */
export type CardVariant = "light" | "dark";

export function ContentCard({
  children,
  variant = "light",
  index = 0,
  isInView = true,
  className = "",
}: {
  children: React.ReactNode;
  variant?: CardVariant;
  index?: number;
  isInView?: boolean;
  className?: string;
}) {
  const variants: Record<CardVariant, string> = {
    light:
      "bg-white border border-gray-100 rounded-2xl shadow-[0px_4px_30px_0px_rgba(0,0,0,0.06)] hover:shadow-[0px_8px_40px_0px_rgba(0,0,0,0.1)]",
    dark:
      "bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-sm hover:bg-white/10 rounded-2xl",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`${variants[variant]} transition-all duration-300 cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ── Blog Card (dark-themed card with image) ── */
export interface BlogCardData {
  title: string;
  description: string;
  image: string;
  tag: string;
}

export function BlogCard({
  post,
  index = 0,
  isInView = true,
}: {
  post: BlogCardData;
  index?: number;
  isInView?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <ContentCard variant="dark" index={index} isInView={isInView} className="group overflow-hidden">
      <div className="h-[200px] overflow-hidden">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <span
          className="inline-block px-3 py-1 rounded-full text-[12px] mb-3"
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            color: colors.green,
            background: `${colors.green}1A`,
          }}
        >
          {post.tag}
        </span>
        <h3
          className="text-white text-[18px] mb-2"
          style={{ fontFamily: fonts.display, fontWeight: 700 }}
        >
          {post.title}
        </h3>
        <p
          className="text-white/60 text-[14px] leading-[1.6] mb-4"
          style={{ fontFamily: fonts.display }}
        >
          {post.description}
        </p>
        <LinkWithArrow color={colors.textBlueLink} icon="chevron">
          {t.common.readMore}
        </LinkWithArrow>
      </div>
    </ContentCard>
  );
}

/* ── Review Card (light-themed) ── */
export interface ReviewCardData {
  name: string;
  role: string;
  rating: number;
  date: string;
  text: string;
  image: string;
  source: "Upwork" | "Google" | string;
  /** Optional project type label for Upwork reviews */
  project?: string;
}

export function ReviewCard({
  review,
  index = 0,
  isInView = true,
}: {
  review: ReviewCardData;
  index?: number;
  isInView?: boolean;
}) {
  const isUpwork = review.source === "Upwork";

  const upworkUrl = "https://www.upwork.com/agencies/1477959724143390720/";

  return (
    <a
      href={upworkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <ContentCard variant="light" index={index} isInView={isInView} className="p-6">
        {/* Source badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isUpwork ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.858-3.066 2.838-3.066 1.119 0 2.03.915 2.03 2.04 0 1.124-.912 2.037-2.03 2.037v.334zm0-5.746c-2.451 0-3.885 1.609-4.555 3.32-.978-1.467-1.717-3.236-2.15-4.726H9.543v5.873c0 1.065-.863 1.93-1.926 1.93-1.063 0-1.926-.865-1.926-1.93V6.006H3.377v5.873c0 2.185 1.782 3.973 3.962 3.973s3.962-1.788 3.962-3.973v-.983c.427.882.977 1.764 1.663 2.51l-1.412 6.636h2.37l1.02-4.804c1.1.699 2.356 1.12 3.62 1.12 2.368 0 4.293-1.932 4.293-4.307s-1.925-4.339-4.293-4.339z" fill="#14A800"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            <span
              className="text-[12px]"
              style={{ fontFamily: fonts.display, fontWeight: 600, color: isUpwork ? "#14A800" : colors.textMuted }}
            >
              {review.source}
            </span>
          </div>
          {review.project && (
            <span
              className="text-[11px] px-2 py-0.5 rounded-full"
              style={{
                fontFamily: fonts.display,
                color: colors.textMuted,
                background: "rgba(0,0,0,0.04)",
              }}
            >
              {review.project}
            </span>
          )}
        </div>

        {/* Stars & Date */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {Array.from({ length: review.rating }).map((_, i) => (
              <svg
                key={i}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={isUpwork ? "#14A800" : "#FFB800"}
                stroke={isUpwork ? "#14A800" : "#FFB800"}
                strokeWidth="2"
                className="inline-block"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span
            className="text-[12px]"
            style={{ fontFamily: fonts.display, color: colors.textMuted }}
          >
            {review.date}
          </span>
        </div>

        {/* Text */}
        <p
          className="text-[14px] leading-[1.7] mb-5"
          style={{ fontFamily: fonts.display, color: colors.textDark }}
        >
          &ldquo;{review.text}&rdquo;
        </p>

        {/* Footer: avatar + info */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <ImageWithFallback
              src={review.image}
              alt={review.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p
              className="text-[14px]"
              style={{
                fontFamily: fonts.display,
                fontWeight: 700,
                color: colors.textDark,
              }}
            >
              {review.name}
            </p>
            <p
              className="text-[12px]"
              style={{ fontFamily: fonts.display, color: colors.textMuted }}
            >
              {review.role}
            </p>
          </div>
        </div>
      </ContentCard>
    </a>
  );
}

/* ── Portfolio Project Card ── */
export interface ProjectCardData {
  title: string;
  description: string;
  image: string;
  year: number;
  /** Optional service tag shown as a pill below the image */
  service?: string;
  /** Filter category: "web" | "ai" | "software" */
  category?: "web" | "ai" | "software";
  /** Optional route to navigate on "View Project" click */
  link?: string;
  /** URL-friendly slug for the project detail page */
  slug?: string;
  /** The problem / challenge faced by the client */
  problem?: string;
  /** The solution DigiDog provided */
  solution?: string;
  /** Extended overview text for the detail page */
  overview?: string;
  /** The project goal / objective */
  goal?: string;
  /** Key improvements / features delivered */
  improvements?: string[];
  /** Client / company name */
  client?: string;
  /** Additional screenshots for the detail page */
  gallery?: string[];
}

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (project.slug) {
      navigate(`/portfolio/${project.slug}`);
    } else if (project.link) {
      navigate(project.link);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-6 select-none">
      {/* Gradient card with floating image */}
      <div
        className="relative rounded-2xl w-full overflow-hidden"
        style={{
          aspectRatio: "700 / 380",
          backgroundImage: portfolioCardGradientBg,
          backgroundSize: "cover",
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            border: "2px solid rgba(255,255,255,0.59)",
            boxShadow: "0px 4px 30px 0px rgba(0,0,0,0.1)",
          }}
        />
        <div
          className="absolute left-1/2 rounded-lg overflow-hidden"
          style={{
            width: "82%",
            height: "79%",
            top: "50%",
            transform: "translate(-50%, -47%)",
            boxShadow:
              "0px 0px 10px 0px rgba(165,171,192,0.3), 0px 2px 2px 0px rgba(165,171,192,0.6), 0px 4px 4px 0px rgba(165,171,192,0.6), 0px 16px 16px 0px rgba(165,171,192,0.6), 0px 32px 32px 0px rgba(165,171,192,0.6)",
          }}
        >
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text content below card */}
      <div className="flex flex-col gap-4 px-1">
        {/* Service tag */}
        {project.service && (
          <span
            className="inline-flex self-start px-3 py-1 rounded-full text-[12px]"
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              color: colors.blue,
              background: `${colors.blue}12`,
              border: `1px solid ${colors.blue}25`,
            }}
          >
            {project.service}
          </span>
        )}
        <h3
          className="text-[20px] md:text-[22px] tracking-[-0.48px]"
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            color: colors.textDark,
          }}
        >
          {project.title}
        </h3>
        <p
          className="text-[15px] md:text-[17px] leading-[1.6]"
          style={{ fontFamily: fonts.display, color: colors.textMuted }}
        >
          {project.description}
        </p>
        <a
          href={project.slug ? `/portfolio/${project.slug}` : project.link || "#"}
          onClick={handleLinkClick}
          className="inline-flex items-center gap-4 text-[16px] hover:gap-5 transition-all"
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            color: colors.textBlueLink,
          }}
        >
          {t.common.viewProject}
          <ArrowIcon />
        </a>
      </div>
    </div>
  );
}