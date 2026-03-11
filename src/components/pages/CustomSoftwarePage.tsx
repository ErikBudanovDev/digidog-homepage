import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, useInView } from "motion/react";
import {
  Blocks,
  Check,
  ArrowRight,
  Database,
  Plug,
  BarChart3,
  Cog,
  Rocket,
  Shield,
  RefreshCw,
  GitBranch,
  Terminal,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";
import { TrustedPartners } from "@/components/TrustedPartners";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  StarField,
  ShootingStar,
  Spaceship,
  Planet,
  StarShape,
} from "@/components/CosmicElements";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

import { colors, fonts, transitions, portfolioCardGradientBg } from "@/components/ui/brand";
import { PrimaryButton, ArrowIcon, LinkWithArrow, openBookingModal } from "@/components/ui/buttons";
import { SectionContainer, SectionBadge, SectionHeading } from "@/components/ui/section";
import { HeroLayout } from "@/components/ui/hero-layout";
import svgPaths from "@/imports/svg-ly9usgqlzn";
import { SEO, serviceSchema } from "@/components/SEO";
import { useTranslation } from "@/i18n/i18n-context";

/* ─────────────────────────────────────────────
 * DATA
 * ───────────────────────────────────────────── */

const deliverables = [
  {
    icon: Terminal,
    title: "Custom Software",
    text: "Tailored applications built precisely for your business logic and workflows.",
  },
  {
    icon: Plug,
    title: "API & System Integration",
    text: "Seamless connection to third-party systems, CRMs, ERPs, and existing infrastructure.",
  },
  {
    icon: Cog,
    title: "Workflow Automation",
    text: "Automation of recurring processes — from data reconciliation to complex business rules.",
  },
  {
    icon: BarChart3,
    title: "Dashboards & Reporting",
    text: "Real-time dashboards and reporting systems for data-driven decisions at all levels.",
  },
  {
    icon: Rocket,
    title: "SaaS & MVP Development",
    text: "From concept to market-ready product — rapid prototypes and scalable SaaS platforms.",
  },
  {
    icon: Database,
    title: "Database Architecture",
    text: "Performant, scalable database designs — from SQL and NoSQL to real-time databases.",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    text: "Enterprise security, role-based access control, and GDPR-compliant data management.",
  },
  {
    icon: RefreshCw,
    title: "Maintenance & Evolution",
    text: "Continuous development, monitoring, and technical support for long-term success.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Requirements",
    text: "In-depth analysis of your business processes, bottlenecks, and technical requirements.",
  },
  {
    number: "02",
    title: "Architecture & Planning",
    text: "Technical architecture, data modeling, and detailed project planning with clear milestones.",
  },
  {
    number: "03",
    title: "Agile Development",
    text: "Iterative development in sprints with regular demos and close feedback loops.",
  },
  {
    number: "04",
    title: "Integration & QA",
    text: "System integration, automated testing, security audits, and staging deployments.",
  },
  {
    number: "05",
    title: "Launch & Scaling",
    text: "Go-live, performance monitoring, and continuous optimization for growing demands.",
  },
];

const techStack = [
  "Node.js",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "GraphQL",
  "REST APIs",
  "Supabase",
  "Prisma",
  "RabbitMQ",
  "Terraform",
  "GitHub Actions",
];

const portfolioProjects = [
  {
    title: "Enterprise ERP Integration",
    description:
      "Complete integration of a legacy ERP system with modern cloud services — including real-time data synchronization and custom API layer.",
    image:
      "https://images.unsplash.com/photo-1558550087-a6911654de2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBUEklMjBpbnRlZ3JhdGlvbiUyMGNsb3VkJTIwcGxhdGZvcm18ZW58MXx8fHwxNzcyMjcxMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["API Integration", "Cloud", "Enterprise"],
  },
  {
    title: "Logistics Management Platform",
    description:
      "Custom logistics platform with real-time tracking, automatic route optimization, and integrated warehouse management.",
    image:
      "https://images.unsplash.com/photo-1760952851538-17a59f691efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvcmtmbG93JTIwYXV0b21hdGlvbiUyMHN5c3RlbXxlbnwxfHx8fDE3NzIyNzExMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Full-Stack", "Automation", "Dashboard"],
  },
  {
    title: "Custom CRM for Sales",
    description:
      "Industry-specific CRM system with pipeline management, lead scoring, and seamless email integration.",
    image:
      "https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnByaXNlJTIwZGFzaGJvYXJkJTIwQ1JNJTIwc29mdHdhcmV8ZW58MXx8fHwxNzcyMjcxMTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["CRM", "SaaS", "Node.js"],
  },
  {
    title: "DevOps & CI/CD Pipeline",
    description:
      "Automated deployment pipeline with infrastructure-as-code, container orchestration, and comprehensive monitoring.",
    image:
      "https://images.unsplash.com/photo-1548544027-1a96c4c24c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjBpbmZyYXN0cnVjdHVyZSUyMG1pY3Jvc2VydmljZXN8ZW58MXx8fHwxNzcyMjcxMTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["DevOps", "Docker", "Kubernetes"],
  },
];

/* ─────────────────────────────────────────────
 * HERO BACKGROUND
 * ───────────────────────────────────────────── */

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Figma decorative star cluster (top-right) */}
      <div
        className="absolute mix-blend-soft-light opacity-60"
        style={{ top: "80%", right: "-19%", bottom: "-35%", left: "70%" }}
      >
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 954.816 379.109">
          <g style={{ mixBlendMode: "soft-light" }}>
            <path d={svgPaths.p361adb00} fill="white" />
            <path d={svgPaths.p21d74300} fill="white" />
            <path d={svgPaths.p2a163200} fill="white" />
            <path d={svgPaths.p25da73f0} fill="white" />
            <path d={svgPaths.p16156a40} fill="white" />
            <path d={svgPaths.p21648000} fill="white" />
            <path d={svgPaths.p26a90800} fill="white" />
            <path d={svgPaths.p1a0f7580} fill="white" />
            <path d={svgPaths.p3f4ee580} fill="white" />
            <path d={svgPaths.p17b1f80} fill="white" />
            <path d={svgPaths.p3f345e40} fill="white" />
            <path d={svgPaths.p187c1200} fill="white" />
            <path d={svgPaths.p342cf5f0} fill="white" />
            <path d={svgPaths.pac18500} fill="white" />
            <path d={svgPaths.p286e9d00} fill="white" />
            <path d={svgPaths.p31556600} fill="white" />
            <path d={svgPaths.p23120f00} fill="white" />
            <path d={svgPaths.p936c00} fill="white" />
            <path d={svgPaths.p15896500} fill="white" />
            <path d={svgPaths.p320dfb00} fill="white" />
            <path d={svgPaths.p3b5b8800} fill="white" />
            <path d={svgPaths.p2c1e8240} fill="white" />
            <path d={svgPaths.pf102a80} fill="white" />
            <path d={svgPaths.p126e0200} fill="white" />
            <path d={svgPaths.p3ad25d00} fill="white" />
            <path d={svgPaths.p15a26500} fill="white" />
            <path d={svgPaths.p26d39940} fill="white" />
            <path d={svgPaths.p7cf1780} fill="white" />
            <path d={svgPaths.p34a47580} fill="white" />
            <path d={svgPaths.p2df6aa00} fill="white" />
          </g>
        </svg>
      </div>

      {/* Small star cluster (right) */}
      <div
        className="absolute mix-blend-soft-light opacity-60"
        style={{ top: "38%", right: "-11%", bottom: "34%", left: "101%" }}
      >
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 205.407 192.741">
          <g style={{ mixBlendMode: "soft-light" }}>
            <path d={svgPaths.p27b0fb00} fill="#E4E0D8" />
            <path d={svgPaths.p320bf300} fill="#E4E0D8" />
            <path d={svgPaths.p3df264c0} fill="#E4E0D8" />
            <path d={svgPaths.p694c100} fill="#E4E0D8" />
            <path d={svgPaths.p10a7a7c0} fill="#E4E0D8" />
            <path d={svgPaths.p2c646c00} fill="#E4E0D8" />
            <path d={svgPaths.p203d800} fill="#E4E0D8" />
            <path d={svgPaths.p26db5a00} fill="#E4E0D8" />
            <path d={svgPaths.p33a37d80} fill="#E4E0D8" />
            <path d={svgPaths.p238acd80} fill="#E4E0D8" />
            <path d={svgPaths.pdf51600} fill="#E4E0D8" />
            <path d={svgPaths.p277d4880} fill="#E4E0D8" />
            <path d={svgPaths.p9a8680} fill="#E4E0D8" />
            <path d={svgPaths.p2e186800} fill="#E4E0D8" />
            <path d={svgPaths.pda4d000} fill="#E4E0D8" />
            <path d={svgPaths.p3e1ab900} fill="#E4E0D8" />
            <path d={svgPaths.p1806bd00} fill="#E4E0D8" />
            <path d={svgPaths.p14377c00} fill="#E4E0D8" />
            <path d={svgPaths.p217f0c00} fill="#E4E0D8" />
            <path d={svgPaths.p285adb00} fill="#E4E0D8" />
          </g>
        </svg>
      </div>

      {/* Gradient glow (bottom-right) */}
      <div
        className="absolute mix-blend-screen opacity-60"
        style={{ top: "34%", right: "-22%", bottom: "19%", left: "94%" }}
      >
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 533.508 323.575">
          <g style={{ mixBlendMode: "screen" }}>
            <path d={svgPaths.p20fd4500} fill="url(#cs_gradient_1)" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="cs_gradient_1" x1="266.765" x2="266.765" y1="323.544" y2="-0.798">
              <stop stopColor="#135195" />
              <stop offset="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Teal glow (center-right) */}
      <div className="absolute opacity-40" style={{ top: "25%", left: "48%", width: "50%", height: "75%" }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1753 1551">
          <g filter="url(#cs_teal_glow)">
            <ellipse cx="877" cy="776" rx="480" ry="350" fill="#0E9AA7" opacity="0.4" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1551" id="cs_teal_glow" width="1753" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1" stdDeviation="200" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Green glow (bottom-right) */}
      <motion.div
        className="absolute opacity-10"
        style={{ top: "70%", left: "60%", width: "40%", height: "60%" }}
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 800">
          <g filter="url(#cs_green_glow)">
            <ellipse cx="500" cy="400" rx="300" ry="200" fill="#10B981" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="800" id="cs_green_glow" width="1000" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1" stdDeviation="200" />
            </filter>
          </defs>
        </svg>
      </motion.div>

      {/* Cyan glow (bottom) */}
      <motion.div
        className="absolute opacity-10"
        style={{ top: "80%", left: "30%", width: "50%", height: "60%" }}
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 800">
          <g filter="url(#cs_cyan_glow)">
            <ellipse cx="500" cy="400" rx="350" ry="220" fill="#06b6d4" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="800" id="cs_cyan_glow" width="1000" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1" stdDeviation="200" />
            </filter>
          </defs>
        </svg>
      </motion.div>

      <StarField count={60} color="rgba(255,255,255,0.7)" />

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "15%", right: "8%", width: 120, height: 120,
          background: "radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <ShootingStar delay={2} style={{ top: "20%", left: "15%", transform: "rotate(-15deg)" }} />
      <ShootingStar delay={6} duration={1.3} style={{ top: "45%", left: "55%", transform: "rotate(-22deg)" }} />

      <motion.div
        className="absolute hidden lg:block"
        style={{ top: "8%", right: "6%" }}
        animate={{ x: [0, -12, 0], y: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Spaceship size={90} />
      </motion.div>

      <motion.div
        className="absolute hidden md:block"
        style={{ bottom: "15%", left: "4%" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Planet size={40} color={colors.teal} ringColor="rgba(6,182,212,0.3)" />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ top: "30%", left: "3%" }}
        animate={{ rotate: 360, scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <StarShape size={14} color="rgba(6,182,212,0.5)" />
      </motion.div>
      <motion.div
        className="absolute hidden md:block"
        style={{ top: "55%", right: "10%" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <StarShape size={10} color="rgba(255,255,255,0.4)" />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * SECTIONS
 * ───────────────────────────────────────────── */

function ServiceHero() {
  const { t } = useTranslation();
  return (
    <HeroLayout
      backgroundElements={<HeroBackground />}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: t.software.breadcrumbService, path: "/" },
        { label: t.software.breadcrumbPage, color: colors.teal },
      ]}
      badgeContent={
        <>
          <Blocks size={14} className="inline mr-1.5 -mt-0.5" />
          {t.software.heroBadge}
        </>
      }
      titleGradient="linear-gradient(90deg, #ffffff 0%, #99f6e4 100%)"
      title={
        <>
          {t.software.heroTitle1}
          <br />
          {t.software.heroTitle2}
        </>
      }
      description={t.software.heroDescription}
      actions={
        <>
          <PrimaryButton
            onClick={() => openBookingModal()}
          >
            {t.software.heroCtaPrimary}
          </PrimaryButton>
          <a
            href="#deliverables"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#deliverables")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white text-[17px] hover:border-white/40 hover:bg-white/5 transition-all cursor-pointer"
            style={{ fontFamily: fonts.display, fontWeight: 600 }}
          >
            {t.software.heroCtaSecondary}
            <ArrowRight size={18} />
          </a>
        </>
      }
      splitAlign="center"
      rightContent={
        <motion.div
          className="flex-1 hidden lg:flex justify-center items-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: transitions.smooth }}
        >
          <div className="relative w-full max-w-[520px]">
            <div
              className="absolute -inset-4 rounded-2xl opacity-30 blur-2xl"
              style={{ background: "linear-gradient(135deg, #06b6d4, #10b981)" }}
            />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1767817099805-d79e31fb968c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGNvZGUlMjBwcm9ncmFtbWluZyUyMHNjcmVlbiUyMGRhcmt8ZW58MXx8fHwxNzcyNjE3ODc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Custom software development"
              className="relative rounded-2xl w-full h-auto shadow-2xl border border-white/10"
            />
          </div>
        </motion.div>
      }
    />
  );
}

/* ── Deliverables Grid ── */
function DeliverablesSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      id="deliverables"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: colors.navyDeep }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse, rgba(6,182,212,0.25), transparent 70%)",
        }}
      />

      <SectionContainer className="relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionBadge variant="dark" className="mb-6">
              {t.software.deliverablesBadge}
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-white text-[32px] md:text-[44px] leading-[1.2] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700 }}
            >
              {t.software.deliverablesTitle1}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #10b981)" }}
              >
                {t.software.deliverablesTitle2}
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="text-[16px] md:text-[17px] max-w-[560px] mx-auto leading-[1.7]"
              style={{ fontFamily: fonts.body, color: colors.textSubtle }}
            >
              From requirements analysis to architecture to
              go-live — we deliver software that truly works.
            </p>
          </ScrollReveal>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {deliverables.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: transitions.smooth }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300 cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${colors.teal}20, ${colors.teal}08)`,
                    border: `1px solid ${colors.teal}25`,
                  }}
                >
                  <Icon size={22} style={{ color: colors.teal }} strokeWidth={1.8} />
                </div>
                <h3
                  className="text-white text-[17px] mb-2"
                  style={{ fontFamily: fonts.heading, fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[14px] leading-[1.65]"
                  style={{ fontFamily: fonts.body, color: colors.textSlate }}
                >
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ── Single showcase row ── */
function ShowcaseRow({
  item,
  isLast,
}: {
  item: { title: string; text: string; bullets: string[]; image: string; reverse: boolean };
  isLast: boolean;
}) {
  const rowRef = useRef(null);
  const rowInView = useInView(rowRef, { once: true, margin: "-80px 0px" });

  return (
    <div
      ref={rowRef}
      className={`flex flex-col ${
        item.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center gap-12 lg:gap-16 ${!isLast ? "mb-20 md:mb-28" : ""}`}
    >
      <motion.div
        className="flex-1 w-full max-w-[560px]"
        initial={{ opacity: 0, x: item.reverse ? 40 : -40 }}
        animate={rowInView ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.7, ease: transitions.smooth }}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
          <ImageWithFallback
            src={item.image}
            alt={item.title}
            className="w-full aspect-[4/3] object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.08), transparent 60%)" }}
          />
        </div>
      </motion.div>
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: item.reverse ? -40 : 40 }}
        animate={rowInView ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.7, delay: 0.15, ease: transitions.smooth }}
      >
        <h3
          className="text-[26px] md:text-[32px] leading-[1.25] mb-4"
          style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
        >
          {item.title}
        </h3>
        <p
          className="text-[16px] leading-[1.7] mb-6"
          style={{ fontFamily: fonts.body, color: colors.textMuted }}
        >
          {item.text}
        </p>
        <ul className="space-y-3">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${colors.teal}15`, border: `1px solid ${colors.teal}30` }}
              >
                <Check size={11} strokeWidth={3} style={{ color: colors.teal }} />
              </div>
              <span className="text-[15px]" style={{ fontFamily: fonts.body, color: colors.textDark }}>
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/* ── Visual Showcase ── */
function ShowcaseSection() {
  const { t } = useTranslation();
  const showcases = [
    {
      title: "Connecting Systems Seamlessly",
      text: "Your existing tools — CRM, ERP, accounting, email — often work in isolation. We create a unified data bridge that synchronizes all systems.",
      bullets: [
        "REST & GraphQL API development",
        "Bidirectional data synchronization",
        "Webhooks and event-driven architecture",
      ],
      image:
        "https://images.unsplash.com/photo-1558550087-a6911654de2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBUEklMjBpbnRlZ3JhdGlvbiUyMGNsb3VkJTIwcGxhdGZvcm18ZW58MXx8fHwxNzcyMjcxMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      reverse: false,
    },
    {
      title: "Automating Processes",
      text: "Manual data entry, document processing, and recurring workflows cost time and money. Our automation solutions eliminate bottlenecks.",
      bullets: [
        "Workflow orchestration and task queues",
        "Automatic data validation and cleansing",
        "Rule-based and AI-powered decisions",
      ],
      image:
        "https://images.unsplash.com/photo-1760952851538-17a59f691efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvcmtmbG93JTIwYXV0b21hdGlvbiUyMHN5c3RlbXxlbnwxfHx8fDE3NzIyNzExMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      reverse: true,
    },
    {
      title: "Scalable Architectures",
      text: "From microservices and container orchestration to cloud-native deployments — we build software that grows with your business.",
      bullets: [
        "Microservice and event-driven architecture",
        "Container deployments with Docker & Kubernetes",
        "Auto-scaling and load balancing",
      ],
      image:
        "https://images.unsplash.com/photo-1548544027-1a96c4c24c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjBpbmZyYXN0cnVjdHVyZSUyMG1pY3Jvc2VydmljZXN8ZW58MXx8fHwxNzcyMjcxMTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      reverse: false,
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <SectionContainer>
        {showcases.map((item, idx) => (
          <ShowcaseRow key={item.title} item={item} isLast={idx === showcases.length - 1} />
        ))}
      </SectionContainer>
    </section>
  );
}

/* ── Process Section ── */
function ProcessSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: colors.navy }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/15 rounded-full"
            style={{ left: `${(i * 7.1) % 100}%`, top: `${(i * 5.3) % 100}%` }}
            animate={{ y: [0, -15, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          />
        ))}
      </div>

      <SectionContainer className="relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionBadge variant="dark" className="mb-6">{t.software.processBadge}</SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading theme="dark" subtitle="Five proven steps for successful software projects.">
              From Idea to{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #10b981)" }}>
                Finished System
              </span>
            </SectionHeading>
          </ScrollReveal>
        </div>

        <div ref={ref} className="relative">
          <div className="hidden lg:block absolute top-[36px] left-[10%] right-[10%] h-[2px] bg-white/[0.08]" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: transitions.smooth }}
                className="text-center relative"
              >
                <div className="relative mx-auto w-[72px] h-[72px] mb-5">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${colors.teal}30, transparent)`,
                      border: `2px solid ${colors.teal}40`,
                    }}
                  />
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[20px]"
                    style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.teal }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="text-white text-[17px] mb-2" style={{ fontFamily: fonts.heading, fontWeight: 600 }}>
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.6]" style={{ fontFamily: fonts.body, color: colors.textSlate }}>
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ── Floating dev icons for TechStack background ── */
const floatingDevIcons: {
  label: string;
  color: string;
  svgPath: string;
  x: string;
  y: string;
  size: number;
  dur: number;
  delay: number;
  drift: number;
}[] = [
  { label: "Server", color: "#06b6d4", svgPath: "M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Zm0 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4ZM6 7h.01M6 17h.01", x: "5%", y: "12%", size: 36, dur: 9, delay: 0, drift: 8 },
  { label: "GitBranch", color: "#F97316", svgPath: "M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2", x: "90%", y: "18%", size: 34, dur: 11, delay: 1, drift: -7 },
  { label: "Database", color: "#10B981", svgPath: "M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4M4 12c0 2.21 3.58 4 8 4s8-1.79 8-4", x: "92%", y: "65%", size: 32, dur: 10, delay: 2, drift: 6 },
  { label: "Container", color: "#2563EB", svgPath: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z", x: "3%", y: "72%", size: 30, dur: 12, delay: 0.5, drift: -5 },
  { label: "Bolt", color: "#EAB308", svgPath: "M13 10V3L4 14h7v7l9-11h-7Z", x: "45%", y: "5%", size: 26, dur: 7, delay: 0.8, drift: 6 },
  { label: "Shield", color: "#8B5CF6", svgPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", x: "78%", y: "85%", size: 28, dur: 13, delay: 1.5, drift: -8 },
  { label: "Terminal", color: "#06b6d4", svgPath: "m4 17 6-6-6-6m8 14h8", x: "15%", y: "88%", size: 30, dur: 8, delay: 3, drift: 7 },
  { label: "Cloud", color: "#818CF8", svgPath: "M6.5 20a4.49 4.49 0 0 1-.42-8.96A6.5 6.5 0 0 1 18.5 12h.5a3.5 3.5 0 0 1 0 7H6.5Z", x: "62%", y: "90%", size: 34, dur: 14, delay: 2.5, drift: -4 },
  { label: "Cog", color: "#f43f5e", svgPath: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-3a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z", x: "24%", y: "6%", size: 28, dur: 10, delay: 3.5, drift: 9 },
  { label: "Code", color: "#0EA5E9", svgPath: "m7 8-4 4 4 4m10-8 4 4-4 4M14 4l-4 16", x: "72%", y: "8%", size: 32, dur: 11, delay: 4, drift: -6 },
];

/* ── Tech Stack ── */
function TechStackSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">
      {/* Floating dev icons background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[140px] opacity-[0.06]"
          style={{ background: `radial-gradient(ellipse, ${colors.teal}, ${colors.green}40, transparent 70%)` }}
        />

        {floatingDevIcons.map((icon) => (
          <motion.div
            key={icon.label}
            className="absolute hidden md:flex items-center justify-center"
            style={{ left: icon.x, top: icon.y, width: icon.size, height: icon.size }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.04, 0.1, 0.04],
              y: [0, -14, 0],
              x: [0, icon.drift, 0],
            }}
            transition={{ duration: icon.dur, repeat: Infinity, delay: icon.delay, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={icon.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d={icon.svgPath} />
            </svg>
          </motion.div>
        ))}

        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute hidden lg:block rounded-full"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              left: `${(i * 4.3 + 3) % 96}%`,
              top: `${(i * 3.7 + 6) % 92}%`,
              background: [colors.teal, colors.green, colors.blue, "#F97316"][i % 4],
            }}
            animate={{ opacity: [0.03, 0.09, 0.03], scale: [1, 1.5, 1] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
          />
        ))}
      </div>

      <SectionContainer className="relative z-10">
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">{t.software.techBadge}</SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading
              theme="light"
              subtitle="We rely on proven backend technologies and cloud infrastructure for robust, maintainable systems."
            >
              Our Tech Stack
            </SectionHeading>
          </ScrollReveal>
        </div>

        <div ref={ref} className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-[700px] mx-auto">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: transitions.smooth }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="px-5 py-2.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:border-teal-300 hover:shadow-md transition-all cursor-default"
              style={{ fontFamily: fonts.display, fontWeight: 600, color: colors.textDark, fontSize: 14 }}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ── Portfolio Section ── */
function PortfolioShowcase() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const navigate = useNavigate();

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(204,251,241,0) 0%, rgba(204,251,241,0.2) 30%, rgba(204,251,241,0) 100%)",
      }}
    >
      <SectionContainer className="relative z-10">
        <div className="text-center mb-14">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">
              {t.software.portfolioBadge}
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading theme="light" subtitle={t.software.portfolioSubtitle}>
              {t.software.portfolioTitle}
            </SectionHeading>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-4">
              <LinkWithArrow
                href="/"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  navigate("/");
                  setTimeout(() => {
                    document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
                  }, 150);
                }}
              >
                View All Projects
              </LinkWithArrow>
            </div>
          </ScrollReveal>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: transitions.smooth }}
              className="group flex flex-col gap-5"
            >
              <div
                className="relative rounded-2xl w-full overflow-hidden"
                style={{ aspectRatio: "700 / 380", backgroundImage: portfolioCardGradientBg, backgroundSize: "cover" }}
              >
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                  style={{ border: "2px solid rgba(255,255,255,0.59)", boxShadow: "0px 4px 30px 0px rgba(0,0,0,0.1)" }}
                />
                <div
                  className="absolute left-1/2 rounded-lg overflow-hidden"
                  style={{
                    width: "82%", height: "79%", top: "50%", transform: "translate(-50%, -47%)",
                    boxShadow: "0px 0px 10px 0px rgba(165,171,192,0.3), 0px 2px 2px 0px rgba(165,171,192,0.6), 0px 4px 4px 0px rgba(165,171,192,0.6), 0px 16px 16px 0px rgba(165,171,192,0.6), 0px 32px 32px 0px rgba(165,171,192,0.6)",
                  }}
                >
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 px-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex px-3 py-1 rounded-full text-[12px]"
                    style={{
                      fontFamily: fonts.display, fontWeight: 600, color: colors.teal,
                      background: `${colors.teal}12`, border: `1px solid ${colors.teal}25`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="px-1">
                <h3
                  className="text-[20px] md:text-[22px] tracking-[-0.48px] mb-2"
                  style={{ fontFamily: fonts.display, fontWeight: 700, color: colors.textDark }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-[15px] md:text-[16px] leading-[1.6] mb-3"
                  style={{ fontFamily: fonts.display, color: colors.textMuted }}
                >
                  {project.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-4 text-[16px] hover:gap-5 transition-all"
                  style={{ fontFamily: fonts.display, fontWeight: 700, color: colors.teal }}
                >
                  View Project
                  <ArrowIcon />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ── Result / Outcome Banner ── */
function ResultBanner() {
  const { t } = useTranslation();
  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${colors.navyDeep}, ${colors.navy})` }}
    >
      <SectionContainer className="relative z-10">
        <ScrollReveal>
          <div
            className="rounded-2xl p-8 md:p-12 border"
            style={{
              background: `linear-gradient(135deg, ${colors.teal}08, ${colors.green}06, transparent)`,
              borderColor: `${colors.teal}20`,
            }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <h2
                  className="text-white text-[28px] md:text-[36px] leading-[1.25] mb-4"
                  style={{ fontFamily: fonts.heading, fontWeight: 700 }}
                >
                  {t.software.resultTitle}
                </h2>
                <p
                  className="text-[16px] md:text-[17px] leading-[1.7] mb-6"
                  style={{ fontFamily: fonts.body, color: colors.textSlate }}
                >
                  Efficient, connected systems that eliminate bottlenecks,
                  reduce manual work, and enable your growth —
                  with measurable results.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { value: "60%", label: "Less Manual Work" },
                    { value: "99.9%", label: "Uptime" },
                    { value: "5x", label: "Faster" },
                    { value: "100%", label: "Integrated" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div
                        className="text-[28px] md:text-[32px] mb-1"
                        style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.teal }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-[13px]" style={{ fontFamily: fonts.body, color: colors.textSlate }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="shrink-0">
                <PrimaryButton
                  onClick={() => openBookingModal()}
                >
                  {t.software.resultCta}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * PAGE
 * ───────────────────────────────────────────── */

export default function CustomSoftwarePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden scroll-smooth">
            <SEO
        title="Custom Software Development Agency"
        description="Custom software development for mid-size companies. From internal tools and API integrations to SaaS platforms and dashboards — we build software that connects your systems and scales your operations."
        canonical="/services/custom-software"
        schemaMarkup={serviceSchema("Custom Software Development", "Custom software development services including SaaS platforms, API integrations, dashboards, database architecture, and workflow automation.", "/services/custom-software")}
      />
      <Navbar />
      <ServiceHero />
      <TrustedPartners />
      <DeliverablesSection />
      <ShowcaseSection />
      <ProcessSection />
      <TechStackSection />
      <PortfolioShowcase />
      <ResultBanner />
      <ContactCTA />
      <Footer />
    </div>
  );
}