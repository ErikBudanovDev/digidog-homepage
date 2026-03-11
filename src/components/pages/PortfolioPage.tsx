import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Layers, Globe, Brain, Code2, Rocket } from "lucide-react";
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
  OrbitDot,
} from "@/components/CosmicElements";
import { colors, fonts, transitions, layout } from "@/components/ui/brand";
import { SectionBadge, SectionHeading } from "@/components/ui/section";
import { HeroLayout } from "@/components/ui/hero-layout";
import { ProjectCard } from "@/components/ui/cards";
import { projects } from "@/components/PortfolioSection";
import portfolioHeroImage from "figma:asset/3ddf1a828262e42cebdf9dd204d93f3c3c999f84.png";
import { SEO } from "@/components/SEO";
import { useTranslation } from "@/i18n/i18n-context";
import enPf from "@/translations/portfolio/english.json";
import dePf from "@/translations/portfolio/german.json";

/* ─────────────────────────────────────────────
 * FILTER TABS
 * ───────────────────────────────────────────── */

type FilterKey = "all" | "web" | "ai" | "software";

interface FilterTab {
  key: FilterKey;
  label: string;
  icon: React.ReactNode;
}

// Default filter tabs (overridden with translations inside PortfolioPage)
const defaultFilterTabs: FilterTab[] = [
  { key: "all", label: "All Projects", icon: <Layers size={18} /> },
  { key: "web", label: "Web Development", icon: <Globe size={18} /> },
  { key: "ai", label: "AI Integration", icon: <Brain size={18} /> },
  { key: "software", label: "Custom Software", icon: <Code2 size={18} /> },
];

/* ─────────────────────────────────────────────
 * HERO BACKGROUND
 * ───────────────────────────────────────────── */

function HeroBackground() {
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

      <StarField count={35} color="rgba(255,255,255,0.7)" />
      <ShootingStar delay={1} />
      <ShootingStar delay={4.5} />

      <motion.div
        className="absolute hidden lg:block"
        style={{ top: "12%", right: "6%" }}
        animate={{ x: [0, -12, 0], y: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Spaceship size={100} style={{ opacity: 0.4 }} />
      </motion.div>
      <motion.div
        className="absolute hidden md:block"
        style={{ bottom: "18%", left: "4%" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Planet size={55} color="#6C63FF" />
      </motion.div>
      <motion.div
        className="absolute"
        style={{ top: "30%", left: "8%" }}
        animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <StarShape size={16} color="rgba(0,183,255,0.5)" />
      </motion.div>
      <div className="absolute hidden lg:block" style={{ top: "65%", right: "15%" }}>
        <OrbitDot orbitSize={45} dotSize={5} color={colors.cyan} duration={7} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * STATS BAR
 * ───────────────────────────────────────────── */

function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  const webCount = projects.filter((p) => p.category === "web").length;
  const aiCount = projects.filter((p) => p.category === "ai").length;
  const softwareCount = projects.filter((p) => p.category === "software").length;

  const { locale: statsLocale } = useTranslation();
  const spf = statsLocale === "DE" ? dePf : enPf;
  const stats = [
    { value: projects.length, label: spf.page.statsTotalProjects },
    { value: webCount, label: spf.page.statsWebDevelopment },
    { value: aiCount, label: spf.page.statsAiIntegration },
    { value: softwareCount, label: spf.page.statsCustomSoftware },
  ];

  return (
    <section
      className="relative py-10"
      style={{
        background: colors.navy,
        borderBottom: `1px solid ${colors.borderLight}`,
      }}
    >
      <div ref={ref} className={layout.container}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: transitions.smooth }}
              className="text-center"
            >
              <div
                className="text-[36px] md:text-[44px]"
                style={{
                  fontFamily: fonts.heading,
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #ffffff 0%, #7aa2f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </div>
              <p
                className="text-[13px] md:text-[14px] mt-1"
                style={{ fontFamily: fonts.body, color: colors.textSlate }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * FILTER TABS COMPONENT
 * ───────────────────────────────────────────── */

function FilterTabBar({
  active,
  onChange,
  counts,
  tabs,
}: {
  active: FilterKey;
  onChange: (key: FilterKey) => void;
  counts: Record<FilterKey, number>;
  tabs: FilterTab[];
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-14">
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className="relative flex items-center gap-2.5 px-5 py-3 rounded-full cursor-pointer transition-all duration-300"
            style={{
              fontFamily: fonts.display,
              fontWeight: isActive ? 700 : 500,
              fontSize: 14,
              color: isActive ? "#ffffff" : colors.textMuted,
              background: isActive
                ? `linear-gradient(135deg, ${colors.blue}, ${colors.cyan})`
                : "#f1f5f9",
              border: isActive ? "none" : "1px solid #e2e8f0",
              boxShadow: isActive
                ? "0 4px 20px rgba(0,87,255,0.3)"
                : "none",
            }}
          >
            <span
              style={{
                color: isActive ? "#ffffff" : colors.textMuted,
                display: "flex",
                alignItems: "center",
              }}
            >
              {tab.icon}
            </span>
            <span>{tab.label}</span>
            <span
              className="inline-flex items-center justify-center min-w-[22px] h-[22px] rounded-full text-[11px] px-1.5"
              style={{
                fontFamily: fonts.display,
                fontWeight: 700,
                color: isActive ? colors.blue : "#ffffff",
                background: isActive ? "rgba(255,255,255,0.9)" : colors.textMuted,
              }}
            >
              {counts[tab.key]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
 * PROJECTS GRID
 * ───────────────────────────────────────────── */

function ProjectsGrid({ filter }: { filter: FilterKey }) {
  const { locale } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div ref={ref}>
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: transitions.smooth }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug || project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: transitions.smooth,
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p
            className="text-[18px]"
            style={{ fontFamily: fonts.body, color: colors.textMuted }}
          >
            {locale === "DE" ? dePf.page.noProjects : enPf.page.noProjects}
          </p>
        </motion.div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
 * PORTFOLIO INDEX PAGE
 * ───────────────────────────────────────────── */

export default function PortfolioPage() {
  const { locale } = useTranslation();
  const pf = locale === "DE" ? dePf : enPf;

  const filterTabs: FilterTab[] = [
    { key: "all", label: pf.page.filterAll, icon: <Layers size={18} /> },
    { key: "web", label: pf.page.filterWeb, icon: <Globe size={18} /> },
    { key: "ai", label: pf.page.filterAi, icon: <Brain size={18} /> },
    { key: "software", label: pf.page.filterSoftware, icon: <Code2 size={18} /> },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get("filter") as FilterKey | null;
  const [filter, setFilter] = useState<FilterKey>(
    filterParam && ["all", "web", "ai", "software"].includes(filterParam)
      ? filterParam
      : "all"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync filter state when URL params change (e.g. from navbar)
  useEffect(() => {
    const f = searchParams.get("filter") as FilterKey | null;
    if (f && ["all", "web", "ai", "software"].includes(f)) {
      setFilter(f);
    }
  }, [searchParams]);

  const handleFilterChange = (key: FilterKey) => {
    setFilter(key);
    if (key === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ filter: key });
    }
  };

  const counts: Record<FilterKey, number> = {
    all: projects.length,
    web: projects.filter((p) => p.category === "web").length,
    ai: projects.filter((p) => p.category === "ai").length,
    software: projects.filter((p) => p.category === "software").length,
  };

  return (
    <div className="min-h-screen" style={{ background: colors.navy }}>
            <SEO
        title="Portfolio - Web Development & AI Project Examples"
        description="Explore our portfolio of web development, AI integration, and custom software projects. Real case studies with measurable results from our work with mid-size companies."
        canonical="/portfolio"
      />
      <Navbar />

      {/* ── Hero ── */}
      <HeroLayout
        id="portfolio-hero"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Portfolio", color: colors.green },
        ]}
        badge="Portfolio"
        badgeContent={pf.page.heroBadge}
        title={
          <>
            {pf.page.heroTitle.split('\n')[0]}<br />
            {pf.page.heroTitle.split('\n')[1]}
          </>
        }
        titleGradient="linear-gradient(90deg, #ffffff 0%, #C1D7FF 100%)"
        description={pf.page.heroDescription}
        backgroundElements={<HeroBackground />}
        minHeight="min-h-[55vh]"
        rightContent={
          <motion.div
            className="hidden lg:block relative w-[500px] h-[220px] shrink-0"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: transitions.smooth }}
          >
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Rocket
                  size={140}
                  strokeWidth={1.2}
                  style={{
                    color: colors.cyan,
                    filter: `drop-shadow(0 0 30px ${colors.cyan}80) drop-shadow(0 0 60px ${colors.blue}40)`,
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        }
        splitAlign="center"
      />

      {/* ── Stats Bar ── */}
      <StatsBar />

      {/* ── Filter + Project Grid ── */}
      <section
        className="relative py-16 md:py-24"
        style={{ background: colors.white }}
      >
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(196,224,254,0) 0%, rgba(196,224,254,0.3) 30%, rgba(196,224,254,0) 70%)",
          }}
        />

        {/* Floating cosmic decorations */}
        <motion.div
          className="absolute hidden lg:block z-[1]"
          style={{ top: "3%", right: "2%" }}
          animate={{ rotate: 360, scale: [1, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <StarShape size={14} color={`${colors.blue}20`} />
        </motion.div>
        <motion.div
          className="absolute hidden lg:block z-[1]"
          style={{ bottom: "8%", left: "1%" }}
          animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Spaceship size={55} style={{ opacity: 0.1 }} />
        </motion.div>

        <div className={`${layout.container} relative z-10`}>
          {/* Section heading */}
          <div className="text-center mb-12">
            <ScrollReveal>
              <SectionBadge variant="light" className="mb-6">
                {pf.page.sectionBadge}
              </SectionBadge>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionHeading
                theme="light"
                subtitle={pf.page.sectionSubtitle}
              >
                {pf.page.sectionTitle}
              </SectionHeading>
            </ScrollReveal>
          </div>

          {/* Filter Tabs */}
          <ScrollReveal delay={0.15}>
            <FilterTabBar active={filter} onChange={handleFilterChange} counts={counts} tabs={filterTabs} />
          </ScrollReveal>

          {/* Grid */}
          <ProjectsGrid filter={filter} />
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <ContactCTA />

      <Footer />
    </div>
  );
}