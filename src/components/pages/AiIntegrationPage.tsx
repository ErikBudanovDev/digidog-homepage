import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Search,
  Workflow,
  Zap,
  Bot,
  Plug,
  Wrench,
  RefreshCcw,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  BarChart3,
  Mail,
  Headphones,
  ListChecks,
  DollarSign,
  Database,
  Eye,
  Timer,
  HandMetal,
  FileText,
  Link2,
  Briefcase,
  Globe,
  ShoppingCart,
  Building2,
  Users,
  Cpu,
  Truck,
  Heart,
  Home,
  Scale,
  Copy,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  StarField,
  ShootingStar,
  Spaceship,
  Planet,
  StarShape,
} from "@/components/CosmicElements";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { colors, fonts, transitions } from "@/components/ui/brand";
import { SectionContainer, SectionBadge } from "@/components/ui/section";
import { PrimaryButton, openBookingModal } from "@/components/ui/buttons";
import { SEO, serviceSchema } from "@/components/SEO";
import { AiAgentOffer } from "@/components/AiAgentOffer";
import { AiTrustSection } from "@/components/AiTrustSection";
import { ModelRotator, AiDashboardSection, ChangingWorldSection, TeamSection } from "@/components/AiPageV2";
import { useTranslation } from "@/i18n/i18n-context";
import { getLocalizedRoute } from "@/i18n/routes";
import _aiHubIcon from "figma:asset/4f2027a2c62d225b0ecf9eacbb0e13452dda79c0.png";
import _caseStudy1Image from "figma:asset/9ed0c7c0c8be419432fbd0b2078b09a0ca40e899.png";

/* Resolve figma asset imports — may be StaticImageData or plain string */
const aiHubIcon = typeof _aiHubIcon === "string" ? _aiHubIcon : (_aiHubIcon as { src: string }).src;
const caseStudy1Image = typeof _caseStudy1Image === "string" ? _caseStudy1Image : (_caseStudy1Image as { src: string }).src;

/* ─────────────────────────────────────────────
 * DATA — translation-aware helper type & factories
 * ───────────────────────────────────────────── */

type T = ReturnType<typeof useTranslation>["t"];

/* Hub node positions (icons & angles are locale-independent) */
function getHubNodes(t: T) {
  return [
    { label: t.aiIntegration.hubCrm, icon: Users, angle: 0, color: "#3B82F6" },
    { label: t.aiIntegration.hubEmail, icon: Mail, angle: 51, color: "#8B5CF6" },
    { label: t.aiIntegration.hubSupport, icon: Headphones, angle: 103, color: "#EC4899" },
    { label: t.aiIntegration.hubAnalytics, icon: BarChart3, angle: 154, color: "#10B981" },
    { label: t.aiIntegration.hubTasks, icon: ListChecks, angle: 206, color: "#F59E0B" },
    { label: t.aiIntegration.hubFinance, icon: DollarSign, angle: 257, color: "#06B6D4" },
    { label: t.aiIntegration.hubOperations, icon: Workflow, angle: 309, color: "#EF4444" },
  ];
}

function getExampleQuestions(t: T) {
  return [t.aiIntegration.eq1, t.aiIntegration.eq2, t.aiIntegration.eq3, t.aiIntegration.eq4, t.aiIntegration.eq5, t.aiIntegration.eq6];
}

function getCorePoints(t: T) {
  return [
    { text: t.aiIntegration.corePoint1, icon: Link2 },
    { text: t.aiIntegration.corePoint2, icon: FileText },
    { text: t.aiIntegration.corePoint3, icon: Eye },
    { text: t.aiIntegration.corePoint4, icon: Cpu },
  ];
}

function getCaseStudies(t: T) {
  return [
    {
      title: t.aiIntegration.cs1Title,
      subtitle: t.aiIntegration.cs1Subtitle,
      description: t.aiIntegration.cs1Description,
      queries: [t.aiIntegration.cs1Q1, t.aiIntegration.cs1Q2, t.aiIntegration.cs1Q3, t.aiIntegration.cs1Q4, t.aiIntegration.cs1Q5, t.aiIntegration.cs1Q6],
      outcome: t.aiIntegration.cs1Outcome,
      color: "#3B82F6",
      image: caseStudy1Image,
    },
    {
      title: t.aiIntegration.cs2Title,
      subtitle: t.aiIntegration.cs2Subtitle,
      description: t.aiIntegration.cs2Description,
      queries: [t.aiIntegration.cs2Q1, t.aiIntegration.cs2Q2, t.aiIntegration.cs2Q3, t.aiIntegration.cs2Q4, t.aiIntegration.cs2Q5],
      outcome: t.aiIntegration.cs2Outcome,
      color: "#8B5CF6",
      mcpUrl: "https://mcp-crm.digidog-services.com/mcp",
      image: "/figma-assets/aceaf579e31eebab925faabe40f3b9f4e46272d5.png",
    },
    {
      title: t.aiIntegration.cs3Title,
      subtitle: t.aiIntegration.cs3Subtitle,
      description: t.aiIntegration.cs3Description,
      queries: [t.aiIntegration.cs3Q1, t.aiIntegration.cs3Q2, t.aiIntegration.cs3Q3, t.aiIntegration.cs3Q4],
      outcome: t.aiIntegration.cs3Outcome,
      color: "#10B981",
      image: "/images/blog/covers/agent-desk.webp",
    },
  ];
}

function getProcessSteps(t: T) {
  return [
    {
      number: "01",
      title: t.aiIntegration.proc1Title,
      shortTitle: t.aiIntegration.proc1Short,
      description: t.aiIntegration.proc1Desc,
      details: t.aiIntegration.proc1Details,
      icon: Search,
      accent: "#3B82F6",
    },
    {
      number: "02",
      title: t.aiIntegration.proc2Title,
      shortTitle: t.aiIntegration.proc2Short,
      description: t.aiIntegration.proc2Desc,
      details: t.aiIntegration.proc2Details,
      icon: Workflow,
      accent: "#8B5CF6",
    },
    {
      number: "03",
      title: t.aiIntegration.proc3Title,
      shortTitle: t.aiIntegration.proc3Short,
      description: t.aiIntegration.proc3Desc,
      details: t.aiIntegration.proc3Details,
      icon: Plug,
      accent: "#06B6D4",
    },
    {
      number: "04",
      title: t.aiIntegration.proc4Title,
      shortTitle: t.aiIntegration.proc4Short,
      description: t.aiIntegration.proc4Desc,
      bullets: [t.aiIntegration.proc4Bullet1, t.aiIntegration.proc4Bullet2, t.aiIntegration.proc4Bullet3, t.aiIntegration.proc4Bullet4],
      details: t.aiIntegration.proc4Details,
      icon: Bot,
      accent: "#10B981",
    },
    {
      number: "05",
      title: t.aiIntegration.proc5Title,
      shortTitle: t.aiIntegration.proc5Short,
      description: t.aiIntegration.proc5Desc,
      bullets: [t.aiIntegration.proc5Bullet1, t.aiIntegration.proc5Bullet2, t.aiIntegration.proc5Bullet3, t.aiIntegration.proc5Bullet4, t.aiIntegration.proc5Bullet5, t.aiIntegration.proc5Bullet6],
      icon: RefreshCcw,
      accent: "#F59E0B",
    },
  ];
}

function getOutcomes(t: T) {
  return [
    { icon: Eye, label: t.aiIntegration.outcome1 },
    { icon: Zap, label: t.aiIntegration.outcome2 },
    { icon: HandMetal, label: t.aiIntegration.outcome3 },
    { icon: FileText, label: t.aiIntegration.outcome4 },
    { icon: Link2, label: t.aiIntegration.outcome5 },
  ];
}

function getBusinessTypes(t: T) {
  return [
    { icon: Briefcase, label: t.aiIntegration.bt1Label, desc: t.aiIntegration.bt1Desc },
    { icon: Headphones, label: t.aiIntegration.bt2Label, desc: t.aiIntegration.bt2Desc },
    { icon: Truck, label: t.aiIntegration.bt3Label, desc: t.aiIntegration.bt3Desc },
    { icon: Heart, label: t.aiIntegration.bt4Label, desc: t.aiIntegration.bt4Desc },
    { icon: Users, label: t.aiIntegration.bt5Label, desc: t.aiIntegration.bt5Desc },
    { icon: Building2, label: t.aiIntegration.bt6Label, desc: t.aiIntegration.bt6Desc },
    { icon: Scale, label: t.aiIntegration.bt7Label, desc: t.aiIntegration.bt7Desc },
    { icon: Globe, label: t.aiIntegration.bt8Label, desc: t.aiIntegration.bt8Desc },
    { icon: Cpu, label: t.aiIntegration.bt9Label, desc: t.aiIntegration.bt9Desc },
    { icon: Home, label: t.aiIntegration.bt10Label, desc: t.aiIntegration.bt10Desc },
  ];
}

/* ─────────────────────────────────────────────
 * HERO — "Talk to Your Business With AI"
 * ───────────────────────────────────────────── */

function HeroSection() {
  const { t, locale } = useTranslation();
  const hubNodes = getHubNodes(t);
  return (
    <section
      className="relative min-h-[100vh] flex items-center overflow-hidden pt-28 pb-20"
      style={{ background: colors.gradientCosmic }}
    >
      {/* Cosmic BG */}
      <div className="absolute inset-0 overflow-hidden">
        <StarField count={50} color="rgba(255,255,255,0.6)" />
        <ShootingStar delay={2} style={{ top: "18%", left: "10%", transform: "rotate(-15deg)" }} />
        <ShootingStar delay={7} duration={1.2} style={{ top: "55%", left: "60%", transform: "rotate(-20deg)" }} />

        <div
          className="absolute rounded-full pointer-events-none opacity-15"
          style={{
            top: "10%", right: "-5%", width: 600, height: 600,
            background: "radial-gradient(circle, rgba(56,189,248,0.4), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none opacity-12"
          style={{
            bottom: "-10%", left: "-5%", width: 500, height: 500,
            background: "radial-gradient(circle, rgba(168,85,247,0.35), transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <motion.div
          className="absolute hidden lg:block"
          style={{ top: "10%", right: "5%" }}
          animate={{ x: [0, -10, 0], y: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Spaceship size={85} />
        </motion.div>
        <motion.div
          className="absolute hidden md:block"
          style={{ bottom: "18%", left: "3%" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Planet size={42} color={colors.cyan} ringColor="rgba(0,183,255,0.3)" />
        </motion.div>
        <motion.div
          className="absolute"
          style={{ top: "35%", left: "6%" }}
          animate={{ rotate: 360, scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <StarShape size={16} color="rgba(168,85,247,0.5)" />
        </motion.div>
        <motion.div
          className="absolute hidden md:block"
          style={{ bottom: "35%", right: "12%" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <StarShape size={11} color="rgba(0,183,255,0.4)" />
        </motion.div>
      </div>

      <SectionContainer className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <ScrollReveal>
              <SectionBadge variant="dark" className="mb-6">
                {t.aiIntegration.heroBadge}
              </SectionBadge>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1
                className="text-[36px] md:text-[52px] lg:text-[60px] leading-[1.1] mb-6"
                style={{ fontFamily: fonts.heading, fontWeight: 700 }}
              >
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #ffffff 0%, #93c5fd 100%)" }}
                >
                  {t.aiIntegration.heroTitle1}
                </span>
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #a78bfa 0%, #06b6d4 100%)" }}
                >
                  {t.aiIntegration.heroTitle2}
                </span>{" "}
                <span className="text-white">{t.aiIntegration.heroTitle3}</span>{" "}
                <ModelRotator words={locale === "DE" ? ["Claude", "ChatGPT", "Grok", "lokaler KI"] : ["Claude", "ChatGPT", "Grok", "local AI"]} />
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p
                className="text-[17px] md:text-[19px] leading-[1.7] mb-8 max-w-[520px]"
                style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}
              >
                {t.aiIntegration.heroDescription}{" "}
                <span className="text-white">{t.aiIntegration.heroDescHighlight}</span>
                {t.aiIntegration.heroDescEnd}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <PrimaryButton onClick={() => openBookingModal()}>
                  {t.aiIntegration.heroCta}
                </PrimaryButton>
                <a
                  href={getLocalizedRoute("contact", locale)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white text-[17px] hover:border-white/40 hover:bg-white/5 transition-all cursor-pointer"
                  style={{ fontFamily: fonts.display, fontWeight: 600 }}
                >
                  {locale === "DE" ? "Nachricht senden" : "Send a Message"}
                  <Mail size={18} />
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.45}>
              <div className="flex flex-wrap gap-6 md:gap-10 mt-10 pt-8 border-t border-white/[0.08]">
                {[
                  { icon: Zap, value: t.aiIntegration.heroKpi1Value, label: t.aiIntegration.heroKpi1Label },
                  { icon: DollarSign, value: t.aiIntegration.heroKpi2Value, label: t.aiIntegration.heroKpi2Label },
                  { icon: Timer, value: t.aiIntegration.heroKpi3Value, label: t.aiIntegration.heroKpi3Label },
                ].map((kpi, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.10)",
                      }}
                    >
                      <kpi.icon size={18} style={{ color: "rgba(255,255,255,0.5)" }} />
                    </div>
                    <div>
                      <span
                        className="block text-white text-[20px] md:text-[22px]"
                        style={{ fontFamily: fonts.heading, fontWeight: 700, lineHeight: 1.2 }}
                      >
                        {kpi.value}
                      </span>
                      <span
                        className="block text-[13px]"
                        style={{ fontFamily: fonts.body, color: "rgba(255,255,255,0.45)", lineHeight: 1.3 }}
                      >
                        {kpi.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: AI Hub Diagram */}
          <ScrollReveal delay={0.2} direction="right">
            <div className="relative hidden lg:block mx-auto">
              {/* Electricity bolts behind the card */}
              <div className="absolute -inset-12 pointer-events-none z-0">
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(56,189,248,0.25) 0%, rgba(167,139,250,0.12) 40%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {[
                  { x: "-5%", y: "15%", color: "#38bdf8", size: 80 },
                  { x: "95%", y: "25%", color: "#a78bfa", size: 70 },
                  { x: "10%", y: "85%", color: "#06b6d4", size: 60 },
                  { x: "88%", y: "80%", color: "#8b5cf6", size: 75 },
                  { x: "50%", y: "-5%", color: "#38bdf8", size: 90 },
                  { x: "45%", y: "105%", color: "#a78bfa", size: 65 },
                ].map((orb, i) => (
                  <motion.div
                    key={`orb-${i}`}
                    className="absolute rounded-full"
                    style={{
                      left: orb.x, top: orb.y, width: orb.size, height: orb.size,
                      background: `radial-gradient(circle, ${orb.color}50, ${orb.color}20, transparent 70%)`,
                      filter: "blur(15px)", transform: "translate(-50%, -50%)",
                    }}
                    animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.3, 0.8] }}
                    transition={{ duration: 2 + i * 0.5, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}

                <motion.svg
                  className="absolute"
                  style={{ top: "-10%", left: "-8%", width: "120%", height: "120%" }}
                  viewBox="0 0 500 600" fill="none"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.path d="M80 50 L120 180 L90 190 L140 350 L100 360 L160 550" stroke="url(#bolt1)" strokeWidth="2.5" strokeLinecap="round" fill="none" filter="url(#glow1)" animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }} />
                  <motion.path d="M120 180 L190 250 L170 260 L210 340" stroke="url(#bolt1)" strokeWidth="1.8" strokeLinecap="round" fill="none" filter="url(#glow1)" animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.8, 0.8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3, repeatDelay: 1.5 }} />
                  <motion.path d="M140 350 L200 400 L180 410 L220 480" stroke="url(#bolt1)" strokeWidth="1.5" strokeLinecap="round" fill="none" filter="url(#glow1)" animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.7, 0.7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.6, repeatDelay: 2 }} />
                  <defs>
                    <linearGradient id="bolt1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
                      <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
                    </linearGradient>
                    <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                </motion.svg>

                <motion.svg
                  className="absolute"
                  style={{ top: "-5%", right: "-5%", width: "110%", height: "115%" }}
                  viewBox="0 0 500 600" fill="none"
                  animate={{ opacity: [0.3, 0.9, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                  <motion.path d="M420 30 L380 160 L410 170 L360 320 L400 330 L340 530" stroke="url(#bolt2)" strokeWidth="2.5" strokeLinecap="round" fill="none" filter="url(#glow2)" animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5, repeatDelay: 0.8 }} />
                  <motion.path d="M380 160 L310 230 L330 240 L280 320" stroke="url(#bolt2)" strokeWidth="1.8" strokeLinecap="round" fill="none" filter="url(#glow2)" animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.7, 0.7, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1, repeatDelay: 1.5 }} />
                  <defs>
                    <linearGradient id="bolt2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                </motion.svg>

                {[
                  { x: "12%", y: "25%", delay: 0 }, { x: "25%", y: "55%", delay: 0.4 },
                  { x: "88%", y: "22%", delay: 0.2 }, { x: "75%", y: "50%", delay: 0.7 },
                  { x: "70%", y: "85%", delay: 1.0 }, { x: "30%", y: "90%", delay: 0.6 },
                  { x: "50%", y: "10%", delay: 0.3 }, { x: "45%", y: "45%", delay: 0.9 },
                ].map((spark, i) => (
                  <motion.div
                    key={`spark-${i}`}
                    className="absolute rounded-full"
                    style={{
                      left: spark.x, top: spark.y,
                      width: i % 3 === 0 ? 6 : 4, height: i % 3 === 0 ? 6 : 4,
                      background: i % 3 === 0 ? "#ffffff" : i % 2 === 0 ? "#38bdf8" : "#a78bfa",
                      boxShadow: `0 0 ${i % 3 === 0 ? 16 : 12}px ${i % 3 === 0 ? 6 : 4}px ${i % 3 === 0 ? "rgba(255,255,255,0.7)" : i % 2 === 0 ? "rgba(56,189,248,0.6)" : "rgba(167,139,250,0.6)"}`,
                    }}
                    animate={{ opacity: [0, 1, 0], scale: [0.3, 1.8, 0.3] }}
                    transition={{ duration: 1.2, delay: spark.delay, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 + i * 0.2 }}
                  />
                ))}

                {[
                  { x: "20%", y: "40%", delay: 1 },
                  { x: "80%", y: "35%", delay: 2.5 },
                  { x: "50%", y: "95%", delay: 4 },
                ].map((flash, i) => (
                  <motion.div
                    key={`flash-${i}`}
                    className="absolute rounded-full"
                    style={{ left: flash.x, top: flash.y, width: 4, height: 4, background: "#ffffff", transform: "translate(-50%, -50%)" }}
                    animate={{
                      opacity: [0, 0, 1, 0, 0], scale: [1, 1, 4, 1, 1],
                      boxShadow: ["0 0 0px 0px rgba(255,255,255,0)", "0 0 0px 0px rgba(255,255,255,0)", "0 0 30px 15px rgba(255,255,255,0.5)", "0 0 0px 0px rgba(255,255,255,0)", "0 0 0px 0px rgba(255,255,255,0)"],
                    }}
                    transition={{ duration: 0.6, delay: flash.delay, repeat: Infinity, ease: "easeOut", repeatDelay: 4 + i * 1.5 }}
                  />
                ))}
              </div>

              {/* AI Hub Diagram Card */}
              <motion.div
                className="relative rounded-2xl overflow-hidden border border-white/10 z-10"
                style={{ background: "rgba(15,29,53,0.85)" }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="p-8">
                  <div className="relative w-[320px] h-[320px] mx-auto">
                    {/* Center AI node */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl flex items-center justify-center z-10"
                      style={{
                        background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                        boxShadow: "0 0 40px 10px rgba(59,130,246,0.3)",
                      }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Bot size={36} className="text-white" />
                    </motion.div>

                    {/* Connection lines + nodes */}
                    {hubNodes.map((node, i) => {
                      const rad = (node.angle * Math.PI) / 180;
                      const radius = 130;
                      const x = 160 + radius * Math.cos(rad);
                      const y = 160 + radius * Math.sin(rad);
                      const Icon = node.icon;
                      return (
                        <div key={node.label}>
                          {/* Connection line */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                            <motion.line
                              x1="160" y1="160" x2={x} y2={y}
                              stroke={node.color}
                              strokeWidth="1.5"
                              strokeDasharray="4 4"
                              strokeOpacity="0.4"
                              animate={{ strokeOpacity: [0.2, 0.5, 0.2] }}
                              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                            />
                          </svg>
                          {/* Node */}
                          <motion.div
                            className="absolute flex flex-col items-center gap-1.5"
                            style={{ left: x - 28, top: y - 28, zIndex: 5 }}
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <div
                              className="w-14 h-14 rounded-xl flex items-center justify-center"
                              style={{
                                background: `linear-gradient(135deg, ${node.color}30, ${node.color}10)`,
                                border: `1px solid ${node.color}50`,
                              }}
                            >
                              <Icon size={22} style={{ color: node.color }} />
                            </div>
                            <span
                              className="text-[11px] text-white/60 whitespace-nowrap"
                              style={{ fontFamily: fonts.body }}
                            >
                              {node.label}
                            </span>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>

                  <p
                    className="text-center text-white/50 text-[13px] mt-8"
                    style={{ fontFamily: fonts.body }}
                  >
                    {t.aiIntegration.heroHubCaption}
                  </p>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * 2. CORE IDEA — One AI Conversation
 * ───────────────────────────────────────────── */

function CaseStudiesSection() {
  const { t } = useTranslation();
  const caseStudies = getCaseStudies(t);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const [copiedMcp, setCopiedMcp] = useState(false);

  return (
    <section
      id="case-studies"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: colors.navyDeep }}
    >
      <StarField count={30} color="rgba(255,255,255,0.35)" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[200px] pointer-events-none opacity-10"
        style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.5), rgba(6,182,212,0.3), transparent 70%)" }}
      />

      <SectionContainer className="relative z-10">
        <div className="text-center mb-20">
          <ScrollReveal>
            <SectionBadge variant="dark" className="mb-6">
              {t.aiIntegration.csBadge}
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-white text-[32px] md:text-[48px] leading-[1.15] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700 }}
            >
              {t.aiIntegration.csTitle1}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #10B981, #06b6d4)" }}
              >
                {t.aiIntegration.csTitle2}
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="text-[16px] md:text-[17px] max-w-[540px] mx-auto leading-[1.7]"
              style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}
            >
              {t.aiIntegration.csDescription}
            </p>
          </ScrollReveal>
        </div>

        <div ref={ref} className="space-y-6">
          {caseStudies.map((cs, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <motion.div
                key={cs.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.18, ease: transitions.smooth }}
                className="group relative"
              >
                <div
                  className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]"
                  style={{ background: `linear-gradient(135deg, ${cs.color}40, transparent 50%, ${cs.color}20)` }}
                />
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="grid md:grid-cols-[340px_1fr] lg:grid-cols-[420px_1fr]"
                    style={isReversed ? { direction: "rtl" } : {}}
                  >
                    <div className="relative h-[240px] md:h-full overflow-hidden" style={{ direction: "ltr" }}>
                      <ImageWithFallback
                        src={cs.image}
                        alt={cs.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: isReversed
                            ? "linear-gradient(to left, rgba(10,22,40,0.85) 0%, transparent 60%)"
                            : "linear-gradient(to right, rgba(10,22,40,0.85) 0%, transparent 60%)",
                        }}
                      />
                      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                        <span
                          className="text-[64px] leading-none"
                          style={{
                            fontFamily: fonts.heading,
                            fontWeight: 800,
                            color: "transparent",
                            WebkitTextStroke: `1.5px ${cs.color}50`,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center" style={{ direction: "ltr" }}>
                      <motion.span
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] tracking-wide uppercase mb-4 w-fit"
                        style={{
                          fontFamily: fonts.body,
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          color: cs.color,
                          background: `${cs.color}10`,
                          border: `1px solid ${cs.color}30`,
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: cs.color }} />
                        {cs.subtitle}
                      </motion.span>

                      <h3
                        className="text-white text-[22px] md:text-[26px] leading-[1.25] mb-3"
                        style={{ fontFamily: fonts.heading, fontWeight: 700 }}
                      >
                        {cs.title}
                      </h3>

                      <p
                        className="text-[14px] md:text-[15px] leading-[1.75] mb-5"
                        style={{ fontFamily: fonts.body, color: "rgba(255,255,255,0.5)" }}
                      >
                        {cs.description}
                      </p>

                      <div className="flex flex-col gap-2 mb-6">
                        {cs.queries.map((q, qi) => (
                          <motion.div
                            key={q}
                            initial={{ opacity: 0, y: 8 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.18 + qi * 0.06 + 0.3 }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-default transition-all duration-300 hover:bg-white/[0.06]"
                            style={{
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            <MessageSquare
                              size={16}
                              style={{ color: cs.color, opacity: 0.7, flexShrink: 0 }}
                            />
                            <span
                              className="text-[13px]"
                              style={{
                                fontFamily: fonts.body,
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.6)",
                              }}
                            >
                              "{q}"
                            </span>
                          </motion.div>
                        ))}
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.4, delay: i * 0.18 + cs.queries.length * 0.06 + 0.3 }}
                          className="mt-1 px-5 py-3 rounded-xl text-center text-[12px]"
                          style={{
                            fontFamily: fonts.body,
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.85)",
                            background: `linear-gradient(135deg, ${cs.color}60, ${cs.color}30)`,
                          }}
                        >
                          {t.aiIntegration.csAnswerLine}
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.18 + 0.5 }}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                        style={{
                          background: `linear-gradient(135deg, ${cs.color}08, ${cs.color}04)`,
                          border: `1px solid ${cs.color}25`,
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${cs.color}18` }}
                        >
                          <CheckCircle2 size={15} style={{ color: cs.color }} />
                        </div>
                        <span
                          className="text-[13px] md:text-[14px]"
                          style={{ fontFamily: fonts.body, fontWeight: 500, color: cs.color }}
                        >
                          {cs.outcome}
                        </span>
                      </motion.div>

                      {cs.mcpUrl && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: i * 0.18 + 0.6 }}
                          className="mt-6"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div
                              className="w-2 h-2 rounded-full animate-pulse"
                              style={{ background: cs.color }}
                            />
                            <span
                              className="text-[13px] tracking-wider uppercase"
                              style={{ fontFamily: fonts.body, fontWeight: 700, color: cs.color }}
                            >
                              {t.aiIntegration.csTryItOut}
                            </span>
                          </div>
                          <div
                            className="rounded-2xl overflow-hidden"
                            style={{
                              background: `linear-gradient(135deg, ${cs.color}12, ${cs.color}06)`,
                              border: `1.5px solid ${cs.color}35`,
                              boxShadow: `0 0 30px ${cs.color}10, 0 4px 20px rgba(0,0,0,0.2)`,
                            }}
                          >
                            <div className="px-5 py-4">
                              <span
                                className="block text-[11px] uppercase tracking-wider mb-2"
                                style={{ fontFamily: fonts.body, fontWeight: 600, color: "rgba(255,255,255,0.35)" }}
                              >
                                {t.aiIntegration.csMcpServerUrl}
                              </span>
                              <div
                                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                                style={{
                                  background: "rgba(0,0,0,0.3)",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                }}
                              >
                                <code
                                  className="flex-1 text-[13px] md:text-[14px] text-white/80 truncate select-all"
                                  style={{ fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace" }}
                                >
                                  {cs.mcpUrl}
                                </code>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const url = cs.mcpUrl ?? "";
                                    const fallbackCopy = () => {
                                      const ta = document.createElement("textarea");
                                      ta.value = url;
                                      ta.style.position = "fixed";
                                      ta.style.opacity = "0";
                                      document.body.appendChild(ta);
                                      ta.select();
                                      document.execCommand("copy");
                                      document.body.removeChild(ta);
                                      setCopiedMcp(true);
                                      setTimeout(() => setCopiedMcp(false), 2500);
                                    };
                                    if (navigator.clipboard && navigator.clipboard.writeText) {
                                      navigator.clipboard.writeText(url).then(() => {
                                        setCopiedMcp(true);
                                        setTimeout(() => setCopiedMcp(false), 2500);
                                      }).catch(fallbackCopy);
                                    } else {
                                      fallbackCopy();
                                    }
                                  }}
                                  className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200"
                                  style={{
                                    background: copiedMcp ? "#10B98130" : `${cs.color}20`,
                                    border: `1px solid ${copiedMcp ? "#10B98150" : `${cs.color}40`}`,
                                    color: copiedMcp ? "#10B981" : cs.color,
                                  }}
                                >
                                  {copiedMcp ? (
                                    <>
                                      <Check size={15} />
                                      <span className="text-[12px]" style={{ fontFamily: fonts.body, fontWeight: 600 }}>
                                        {t.aiIntegration.csCopied}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={15} />
                                      <span className="text-[12px]" style={{ fontFamily: fonts.body, fontWeight: 600 }}>
                                        {t.aiIntegration.csCopy}
                                      </span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-14">
            <p
              className="text-[14px] mb-5"
              style={{ fontFamily: fonts.body, color: "rgba(255,255,255,0.4)" }}
            >
              {t.aiIntegration.csCta}
            </p>
            <button
              onClick={openBookingModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] transition-all duration-300 hover:gap-3 cursor-pointer"
              style={{
                fontFamily: fonts.body,
                fontWeight: 600,
                color: "#10B981",
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              {t.aiIntegration.csCtaButton}
              <ArrowRight size={16} />
            </button>
          </div>
        </ScrollReveal>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * 6. PROCESS
 * ───────────────────────────────────────────── */

function CtaBanner() {
  const { t, locale } = useTranslation();
  return (
    <section className="relative bg-white py-16 md:py-20">
      <SectionContainer>
        <ScrollReveal>
          <div
            className="relative rounded-3xl overflow-hidden px-8 md:px-16 py-14 md:py-20 text-center"
            style={{ background: colors.gradientCosmic }}
          >
            <StarField count={20} color="rgba(255,255,255,0.4)" />

            <div className="relative z-10">
              <h2
                className="text-white text-[28px] md:text-[40px] leading-[1.2] mb-4"
                style={{ fontFamily: fonts.heading, fontWeight: 700 }}
              >
                {t.aiIntegration.ctaTitle1}{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #38bdf8, #a78bfa)" }}
                >
                  {t.aiIntegration.ctaTitle2}
                </span>
              </h2>
              <p
                className="text-white/60 text-[16px] md:text-[17px] mb-8 max-w-[550px] mx-auto"
                style={{ fontFamily: fonts.body }}
              >
                {t.aiIntegration.ctaDescription}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <PrimaryButton onClick={() => openBookingModal()}>
                  {t.aiIntegration.ctaButton}
                </PrimaryButton>
                <a
                  href={getLocalizedRoute("contact", locale)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white text-[16px] hover:border-white/40 hover:bg-white/5 transition-all cursor-pointer"
                  style={{ fontFamily: fonts.display, fontWeight: 600 }}
                >
                  {locale === "DE" ? "Nachricht senden" : "Send a Message"}
                  <Mail size={18} />
                </a>
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
 * ────────────────────────��──────────────────── */

export default function AiIntegrationPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      <SEO
        title={t.aiIntegration.seoTitle}
        description={t.aiIntegration.seoDescription}
        canonical="/services/ai-integration"
        schemaMarkup={serviceSchema(t.aiIntegration.seoTitle, t.aiIntegration.seoDescription, "/services/ai-integration")}
      />
      <Navbar />
      <HeroSection />
      <AiDashboardSection />
      <CaseStudiesSection />
      <ChangingWorldSection />
      <TeamSection />
      <AiAgentOffer />
      <AiTrustSection />
      <CtaBanner />
      <Footer />
    </div>
  );
}
