import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, useInView } from "motion/react";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Tag,
  Target,
  Zap,
  Building2,
  Images,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  StarField,
  ShootingStar,
  Spaceship,
  Planet,
  StarShape,
} from "@/components/CosmicElements";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

import {
  colors,
  fonts,
  transitions,
  layout,
  portfolioCardGradientBg,
} from "@/components/ui/brand";
import { PrimaryButton } from "@/components/ui/buttons";
import { SectionBadge, SectionHeading } from "@/components/ui/section";
import { HeroLayout } from "@/components/ui/hero-layout";
import { ProjectCard } from "@/components/ui/cards";
import { projects } from "@/components/PortfolioSection";
import { SEO } from "@/components/SEO";
import { useTranslation } from "@/i18n/i18n-context";
import enPf from "@/translations/portfolio/english.json";
import dePf from "@/translations/portfolio/german.json";

/* ─────────────────────────────────────────────
 * HERO BACKGROUND
 * ──────────────────────────────────────────── */

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <StarField count={30} color="rgba(255,255,255,0.7)" />
      <ShootingStar delay={1.5} />
      <ShootingStar delay={5} />
      <motion.div
        className="absolute"
        style={{ top: "15%", right: "8%" }}
        animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Spaceship size={60} style={{ opacity: 0.35 }} />
      </motion.div>
      <motion.div
        className="absolute"
        style={{ bottom: "20%", left: "5%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <Planet size={50} color={`${colors.cyan}30`} ringColor={`${colors.cyan}20`} />
      </motion.div>
      <motion.div
        className="absolute"
        style={{ top: "60%", right: "15%" }}
        animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <StarShape size={18} color={`${colors.purple}40`} />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,87,255,0.12) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
 * PROJECT IMAGE SHOWCASE
 * ───────────────────────────────────────────── */

function ProjectShowcase({ image, title }: { image: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="relative py-16 md:py-24" style={{ background: colors.navy }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <StarField count={20} color="rgba(255,255,255,0.4)" />
      </div>

      <div ref={ref} className={`${layout.container} relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: transitions.smooth }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            aspectRatio: "16 / 9",
            backgroundImage: portfolioCardGradientBg,
            backgroundSize: "cover",
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={{
              border: "2px solid rgba(255,255,255,0.15)",
              boxShadow: "0px 8px 60px 0px rgba(0,0,0,0.3)",
            }}
          />
          <div
            className="absolute rounded-xl overflow-hidden"
            style={{
              width: "90%",
              height: "85%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -48%)",
              boxShadow:
                "0px 0px 10px 0px rgba(165,171,192,0.3), 0px 4px 4px 0px rgba(165,171,192,0.4), 0px 16px 32px 0px rgba(165,171,192,0.3)",
            }}
          >
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * OVERVIEW SECTION
 * ───────────────────────────────────────────── */

function OverviewSection({
  overview,
  year,
  service,
  serviceLink,
  client,
}: {
  overview: string;
  year: number;
  service?: string;
  serviceLink?: string;
  client?: string;
}) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const { locale: ol } = useTranslation();
  const odt = (ol === "DE" ? dePf : enPf).detail;

  return (
    <section className="relative py-16 md:py-24" style={{ background: colors.white }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(196,224,254,0.15) 0%, rgba(196,224,254,0) 100%)",
        }}
      />
      <div ref={ref} className={`${layout.container} relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: transitions.smooth }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            {/* Main text */}
            <div>
              <ScrollReveal>
                <SectionBadge variant="light" className="mb-6">
                  {odt.overview}
                </SectionBadge>
              </ScrollReveal>
              <p
                className="text-[17px] md:text-[19px] leading-[1.8]"
                style={{ fontFamily: fonts.body, color: colors.textDark }}
              >
                {overview}
              </p>
            </div>

            {/* Sidebar metadata */}
            <div className="flex flex-col gap-6">
              {client && (
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <Building2 size={16} color={colors.blue} />
                    <span
                      className="text-[12px] uppercase tracking-[0.08em]"
                      style={{
                        fontFamily: fonts.display,
                        fontWeight: 700,
                        color: colors.textMuted,
                      }}
                    >
                      {odt.client}
                    </span>
                  </div>
                  <p
                    className="text-[16px]"
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 600,
                      color: colors.textDark,
                    }}
                  >
                    {client}
                  </p>
                </div>
              )}

              <div
                className="rounded-xl p-5"
                style={{
                  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Calendar size={16} color={colors.blue} />
                  <span
                    className="text-[12px] uppercase tracking-[0.08em]"
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      color: colors.textMuted,
                    }}
                  >
                    {odt.year}
                  </span>
                </div>
                <p
                  className="text-[16px]"
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 600,
                    color: colors.textDark,
                  }}
                >
                  {year}
                </p>
              </div>

              {service && (
                <button
                  onClick={() => serviceLink && navigate(serviceLink)}
                  className="rounded-xl p-5 text-left cursor-pointer hover:shadow-md transition-shadow"
                  style={{
                    background: `linear-gradient(135deg, ${colors.blue}08 0%, ${colors.blue}12 100%)`,
                    border: `1px solid ${colors.blue}20`,
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <Tag size={16} color={colors.blue} />
                    <span
                      className="text-[12px] uppercase tracking-[0.08em]"
                      style={{
                        fontFamily: fonts.display,
                        fontWeight: 700,
                        color: colors.textMuted,
                      }}
                    >
                      {odt.service}
                    </span>
                  </div>
                  <p
                    className="text-[16px]"
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 600,
                      color: colors.blue,
                    }}
                  >
                    {service}
                  </p>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * PROJECT GOAL SECTION
 * ───────────────────────────────────────────── */

function GoalSection({ goal }: { goal: string }) {
  const { locale: gl } = useTranslation();
  const gdt = (gl === "DE" ? dePf : enPf).detail;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      className="relative py-16 md:py-24"
      style={{ background: colors.navy }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <StarField count={15} color="rgba(255,255,255,0.3)" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,87,255,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div ref={ref} className={`${layout.container} relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: transitions.smooth }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <div
              className="flex items-center justify-center w-[56px] h-[56px] rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${colors.blue}20, ${colors.cyan}20)`,
                border: `1px solid ${colors.blue}30`,
              }}
            >
              <Target size={28} color={colors.cyan} />
            </div>
          </div>

          <ScrollReveal>
            <SectionBadge variant="dark" className="mb-6">
              {gdt.projectGoal}
            </SectionBadge>
          </ScrollReveal>

          <p
            className="text-[18px] md:text-[22px] leading-[1.7]"
            style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}
          >
            {goal}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * KEY IMPROVEMENTS SECTION
 * ───────────────────────────────────────────── */

function ImprovementsSection({ improvements }: { improvements: string[] }) {
  const { locale: il } = useTranslation();
  const idt = (il === "DE" ? dePf : enPf).detail;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section className="relative py-16 md:py-24" style={{ background: colors.white }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(196,224,254,0) 0%, rgba(196,224,254,0.25) 50%, rgba(196,224,254,0) 100%)",
        }}
      />

      <div ref={ref} className={`${layout.container} relative z-10`}>
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">
              {idt.implementedImprovements}
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading theme="light">
              {idt.improvements}
            </SectionHeading>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {improvements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: transitions.smooth,
              }}
              className="flex items-start gap-4 rounded-xl p-5"
              style={{
                background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center w-[32px] h-[32px] rounded-lg mt-0.5"
                style={{
                  background: `linear-gradient(135deg, ${colors.green}18, ${colors.cyan}18)`,
                }}
              >
                <Zap size={16} color={colors.green} />
              </div>
              <p
                className="text-[15px] md:text-[16px] leading-[1.6]"
                style={{ fontFamily: fonts.body, color: colors.textDark }}
              >
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * PROBLEM / SOLUTION SECTION
 * ───────────────────────────────────────────── */

function ProblemSolutionSection({
  problem,
  solution,
}: {
  problem: string;
  solution: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const { locale: pl } = useTranslation();
  const pdt = (pl === "DE" ? dePf : enPf).detail;

  return (
    <section className="relative py-16 md:py-24" style={{ background: colors.white }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(196,224,254,0) 0%, rgba(196,224,254,0.15) 50%, rgba(196,224,254,0) 100%)",
        }}
      />

      <div ref={ref} className={`${layout.container} relative z-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: transitions.smooth }}
            className="relative rounded-2xl p-8 md:p-10 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #fef2f2 0%, #fff1f2 50%, #fce7f3 100%)",
              border: "1px solid rgba(239,68,68,0.12)",
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-[4px]"
              style={{ background: "linear-gradient(90deg, #ef4444, #f97316)" }}
            />
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex items-center justify-center w-[48px] h-[48px] rounded-xl"
                style={{ background: "rgba(239,68,68,0.1)" }}
              >
                <AlertTriangle size={24} color="#ef4444" />
              </div>
              <div>
                <span
                  className="block text-[11px] uppercase tracking-[0.1em]"
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    color: "#ef4444",
                  }}
                >
                  {pdt.challenge}
                </span>
                <h3
                  className="text-[22px] md:text-[26px]"
                  style={{
                    fontFamily: fonts.heading,
                    fontWeight: 700,
                    color: "#991b1b",
                  }}
                >
                  The Problem
                </h3>
              </div>
            </div>
            <p
              className="text-[16px] md:text-[18px] leading-[1.7]"
              style={{ fontFamily: fonts.body, color: "#7f1d1d" }}
            >
              {problem}
            </p>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: transitions.smooth }}
            className="relative rounded-2xl p-8 md:p-10 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #ecfdf5 100%)",
              border: "1px solid rgba(82,189,148,0.15)",
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-[4px]"
              style={{
                background: `linear-gradient(90deg, ${colors.green}, ${colors.cyan})`,
              }}
            />
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex items-center justify-center w-[48px] h-[48px] rounded-xl"
                style={{ background: `${colors.green}18` }}
              >
                <CheckCircle2 size={24} color={colors.green} />
              </div>
              <div>
                <span
                  className="block text-[11px] uppercase tracking-[0.1em]"
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    color: colors.green,
                  }}
                >
                  Our Response
                </span>
                <h3
                  className="text-[22px] md:text-[26px]"
                  style={{
                    fontFamily: fonts.heading,
                    fontWeight: 700,
                    color: "#14532d",
                  }}
                >
                  {pdt.solution}
                </h3>
              </div>
            </div>
            <p
              className="text-[16px] md:text-[18px] leading-[1.7]"
              style={{ fontFamily: fonts.body, color: "#166534" }}
            >
              {solution}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * GALLERY SECTION
 * ───────────────────────────────────────────── */

function GallerySection({ gallery, title }: { gallery: string[]; title: string }) {
  const { locale: gal } = useTranslation();
  const galdt = (gal === "DE" ? dePf : enPf).detail;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="relative py-16 md:py-24" style={{ background: colors.white }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(196,224,254,0) 0%, rgba(196,224,254,0.2) 50%, rgba(196,224,254,0) 100%)",
        }}
      />

      <div ref={ref} className={`${layout.container} relative z-10`}>
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">
              <span className="flex items-center gap-2">
                <Images size={14} />
                {galdt.gallery}
              </span>
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading theme="light">
              More from
              <br />
              this project
            </SectionHeading>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: transitions.smooth,
              }}
              className="group relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: i === 2 ? "3 / 4" : "16 / 10",
                border: "1px solid #e2e8f0",
                boxShadow: "0px 4px 30px 0px rgba(0,0,0,0.06)",
              }}
            >
              <ImageWithFallback
                src={img}
                alt={`${title} screenshot ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * MORE PROJECTS
 * ───────────────────────────────────────────── */

function MoreProjects({ currentSlug }: { currentSlug: string }) {
  const { locale: ml } = useTranslation();
  const mdt = (ml === "DE" ? dePf : enPf).detail;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const others = projects.filter((p) => p.slug !== currentSlug).slice(0, 3);

  return (
    <section className="relative py-16 md:py-24" style={{ background: colors.white }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(196,224,254,0) 0%, rgba(196,224,254,0.35) 50%, rgba(196,224,254,0) 100%)",
        }}
      />

      <div ref={ref} className={`${layout.container} relative z-10`}>
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">
              {mdt.moreProjects}
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading theme="light">
              Discover more
              <br />
              of our work
            </SectionHeading>
          </ScrollReveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: transitions.smooth }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {others.map((project) => (
            <ProjectCard key={project.slug || project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * PROJECT DETAIL PAGE
 * ───────────────────────────────────────────── */

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { locale } = useTranslation();
  const pf = locale === "DE" ? dePf : enPf;
  const dt = pf.detail;

  const baseProject = projects.find((p) => p.slug === slug);
  // Overlay translated fields from JSON
  const projectTranslation = slug ? (pf.projects as Record<string, any>)[slug] : null;
  const project = baseProject && projectTranslation
    ? { ...baseProject, title: projectTranslation.title, description: projectTranslation.description, overview: projectTranslation.overview, goal: projectTranslation.goal, problem: projectTranslation.problem, solution: projectTranslation.solution, service: projectTranslation.service, client: projectTranslation.client }
    : baseProject;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  /* 404 */
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: colors.navy }}>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1
            className="text-white text-[32px] mb-4"
            style={{ fontFamily: fonts.heading, fontWeight: 700 }}
          >
            {dt.notFound}
          </h1>
          <p
            className="text-white/60 text-[16px] mb-8"
            style={{ fontFamily: fonts.body }}
          >
            {dt.notFoundSub}
          </p>
          <PrimaryButton onClick={() => navigate("/")}>
            {dt.backToHomepage}
          </PrimaryButton>
        </div>
        <Footer />
      </div>
    );
  }

  /* Prev / Next */
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen" style={{ background: colors.navy }}>
      <SEO
        title={`${project.title} - Case Study`}
        description={project.description || `${project.title} - A web development, AI integration, or custom software project by Digidog. See the full case study with results.`}
        canonical={`/portfolio/${slug}`}
      />
      <Navbar />

      {/* ── Hero ── */}
      <HeroLayout
        id="project-hero"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Portfolio", path: "/#portfolio" },
          { label: project.title, color: colors.green },
        ]}
        badge="Project"
        badgeContent={project.service || "Case Study"}
        title={project.title}
        titleGradient="linear-gradient(90deg, #ffffff 0%, #C1D7FF 100%)"
        description={project.description}
        backgroundElements={<HeroBackground />}
        minHeight="min-h-[60vh]"
      />

      {/* ── Project Image ── */}
      <ProjectShowcase image={project.image} title={project.title} />

      {/* ── Overview + Metadata Sidebar ── */}
      <OverviewSection
        overview={project.overview || project.description}
        year={project.year}
        service={project.service}
        serviceLink={project.link}
        client={project.client}
      />

      {/* ── Project Goal ── */}
      {project.goal && <GoalSection goal={project.goal} />}

      {/* ── Key Improvements ── */}
      {project.improvements && project.improvements.length > 0 && (
        <ImprovementsSection improvements={project.improvements} />
      )}

      {/* ── Problem & Solution ── */}
      {project.problem && project.solution && (
        <ProblemSolutionSection
          problem={project.problem}
          solution={project.solution}
        />
      )}

      {/* ── Gallery ── */}
      {project.gallery && project.gallery.length > 0 && (
        <GallerySection gallery={project.gallery} title={project.title} />
      )}

      {/* ── Prev / Next Navigation ── */}
      <section
        className="relative py-12"
        style={{
          background: colors.navy,
          borderTop: `1px solid ${colors.borderLight}`,
        }}
      >
        <div className={layout.container}>
          <div className="flex items-center justify-between">
            {prevProject ? (
              <button
                onClick={() => navigate(`/portfolio/${prevProject.slug}`)}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <ArrowLeft
                  size={20}
                  className="text-white/40 group-hover:text-white transition-colors"
                />
                <div className="text-left">
                  <span
                    className="block text-[12px] uppercase tracking-[0.08em] text-white/40"
                    style={{ fontFamily: fonts.display }}
                  >
                    Previous Project
                  </span>
                  <span
                    className="block text-[16px] text-white group-hover:text-white/80 transition-colors"
                    style={{ fontFamily: fonts.display, fontWeight: 600 }}
                  >
                    {prevProject.title}
                  </span>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextProject ? (
              <button
                onClick={() => navigate(`/portfolio/${nextProject.slug}`)}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="text-right">
                  <span
                    className="block text-[12px] uppercase tracking-[0.08em] text-white/40"
                    style={{ fontFamily: fonts.display }}
                  >
                    Next Project
                  </span>
                  <span
                    className="block text-[16px] text-white group-hover:text-white/80 transition-colors"
                    style={{ fontFamily: fonts.display, fontWeight: 600 }}
                  >
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight
                  size={20}
                  className="text-white/40 group-hover:text-white transition-colors"
                />
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* ── More Projects ── */}
      <MoreProjects currentSlug={slug || ""} />

      {/* ── Contact CTA ── */}
      <ContactCTA />

      <Footer />
    </div>
  );
}