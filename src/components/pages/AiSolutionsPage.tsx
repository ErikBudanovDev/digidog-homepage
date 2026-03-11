import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  Brain,
  Sparkles,
  TrendingUp,
  Zap,
  Target,
  MessageSquare,
  BarChart3,
  Camera,
  Workflow,
  Check,
  ExternalLink,
  Info,
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
  OrbitDot,
} from "@/components/CosmicElements";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { colors, fonts, transitions, layout, portfolioCardGradientBg } from "@/components/ui/brand";
import { SectionContainer, SectionBadge, SectionHeading } from "@/components/ui/section";
import { PrimaryButton, ArrowIcon, LinkWithArrow, openBookingModal } from "@/components/ui/buttons";
import { HeroLayout } from "@/components/ui/hero-layout";
import AiHeroGraphic from "@/imports/Group1000006705";
import svgPaths from "@/imports/svg-ly9usgqlzn";
import { SEO, serviceSchema } from "@/components/SEO";
import { useTranslation } from "@/i18n/i18n-context";

/* ─────────────────────────────────────────────
 * DATA
 * ───────────────────────────────────────────── */

const deliverables = [
  {
    icon: Brain,
    title: "Machine Learning Models",
    text: "Custom ML models for predictions, classification, and anomaly detection in your business data.",
  },
  {
    icon: MessageSquare,
    title: "NLP & Text Analysis",
    text: "Natural language processing for sentiment analysis, document classification, and automatic summarization.",
  },
  {
    icon: Camera,
    title: "Computer Vision",
    text: "Image analysis and recognition for quality control, visual search, and automated inspection processes.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    text: "Data-driven forecasts for revenue, customer behavior, and market trends — for informed business decisions.",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    text: "AI-powered automation of recurring tasks — from data collection to document processing.",
  },
  {
    icon: Zap,
    title: "LLM Integration",
    text: "Integration of GPT, Claude, and other LLMs into your existing systems and workflows.",
  },
  {
    icon: Target,
    title: "AI Security & Ethics",
    text: "Responsible AI development focused on data privacy, fairness, and transparency.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Analysis & Use Case",
    text: "Together we identify the AI use cases with the greatest business value for your company.",
  },
  {
    number: "02",
    title: "Data & Strategy",
    text: "We analyze your data sources, create a data strategy, and lay the foundation for your AI project.",
  },
  {
    number: "03",
    title: "Model Development",
    text: "Training and fine-tuning AI models tailored to your specific requirements and data.",
  },
  {
    number: "04",
    title: "Integration & Testing",
    text: "Seamless integration into your existing systems with comprehensive testing and validation.",
  },
  {
    number: "05",
    title: "Monitoring & Optimization",
    text: "Continuous monitoring of model performance and iterative improvement for optimal results.",
  },
];

const techStack = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "OpenAI API",
  "LangChain",
  "Hugging Face",
  "scikit-learn",
  "FastAPI",
  "Docker",
  "AWS SageMaker",
  "PostgreSQL",
  "Pinecone",
  "Redis",
  "Kubernetes",
];

const portfolioProjects = [
  {
    title: "AI Customer Service for FinTech",
    description:
      "Intelligent chatbot with GPT integration that automatically answers 70% of all customer inquiries and increases customer satisfaction by 35%.",
    image:
      "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGNoYXRib3QlMjBpbnRlcmZhY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzcyMjcwMzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["NLP", "Chatbot", "GPT"],
  },
  {
    title: "Predictive Maintenance Dashboard",
    description:
      "ML-based prediction system for machine failures in manufacturing with a 95% detection rate.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBkYXRhJTIwYW5hbHlzaXMlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzcyMjcwMzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Machine Learning", "IoT", "Dashboard"],
  },
  {
    title: "Visual Quality Control",
    description:
      "Computer vision system for automatic defect detection in production with real-time analysis and reporting.",
    image:
      "https://images.unsplash.com/photo-1695902173528-0b15104c4554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHZpc2lvbiUyMGRlZXAlMjBsZWFybmluZ3xlbnwxfHx8fDE3NzIxNjkxNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Computer Vision", "Deep Learning", "Automation"],
  },
  {
    title: "AI-Powered Business Intelligence",
    description:
      "Intelligent data analysis platform with natural language queries and automatic insights for management.",
    image:
      "https://images.unsplash.com/photo-1638866408990-1b5e583394d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHBvd2VyZWQlMjBidXNpbmVzcyUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NzIyNzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Analytics", "NLP", "Full-Stack"],
  },
];

/* ─────────────────────────────────────────────
 * HERO BACKGROUND — uses Figma-imported SVG decorations
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

      {/* Figma small star cluster (right) */}
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

      {/* Figma gradient glow (bottom-right) */}
      <div
        className="absolute mix-blend-screen opacity-60"
        style={{ top: "34%", right: "-22%", bottom: "19%", left: "94%" }}
      >
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 533.508 323.575">
          <g style={{ mixBlendMode: "screen" }}>
            <path d={svgPaths.p20fd4500} fill="url(#ai_gradient_1)" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="ai_gradient_1" x1="266.765" x2="266.765" y1="323.544" y2="-0.798">
              <stop stopColor="#135195" />
              <stop offset="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Blue glow (center-right) */}
      <div className="absolute opacity-40" style={{ top: "25%", left: "48%", width: "50%", height: "75%" }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1753 1551">
          <g filter="url(#ai_blue_glow)">
            <ellipse cx="877" cy="776" rx="480" ry="350" fill="#2E7ECE" opacity="0.4" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1551" id="ai_blue_glow" width="1753" x="0" y="0">
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
          <g filter="url(#ai_green_glow)">
            <ellipse cx="500" cy="400" rx="300" ry="200" fill="#00C59B" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="800" id="ai_green_glow" width="1000" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1" stdDeviation="200" />
            </filter>
          </defs>
        </svg>
      </motion.div>

      {/* Magenta glow (bottom) */}
      <motion.div
        className="absolute opacity-10"
        style={{ top: "80%", left: "30%", width: "50%", height: "60%" }}
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 800">
          <g filter="url(#ai_magenta_glow)">
            <ellipse cx="500" cy="400" rx="350" ry="220" fill="#DC43F4" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="800" id="ai_magenta_glow" width="1000" x="0" y="0">
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
          background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)",
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
        <Planet size={40} color={colors.purple} ringColor="rgba(168,85,247,0.3)" />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ top: "30%", left: "3%" }}
        animate={{ rotate: 360, scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <StarShape size={14} color="rgba(168,85,247,0.5)" />
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
        { label: t.ai.breadcrumbService, path: "/" },
        { label: t.ai.breadcrumbPage, color: colors.purple },
      ]}
      badgeContent={
        <>
          <Sparkles size={14} className="inline mr-1.5 -mt-0.5" />
          {t.ai.heroBadge}
        </>
      }
      titleGradient="linear-gradient(90deg, #ffffff 0%, #d8b4fe 100%)"
      title={
        <>
          {t.ai.heroTitle1}
          <br />
          {t.ai.heroTitle2}
        </>
      }
      description={t.ai.heroDescription}
      actions={
        <>
          <PrimaryButton
            onClick={() => openBookingModal()}
          >
            {t.ai.heroCtaPrimary}
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
            {t.ai.heroCtaSecondary}
            <ArrowRight size={18} />
          </a>
        </>
      }
      rightContent={
        <motion.div
          className="hidden lg:block relative w-[500px] h-[220px] shrink-0"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: transitions.smooth }}
        >
          <motion.div
            className="relative w-full h-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <AiHeroGraphic />
          </motion.div>
        </motion.div>
      }
      splitAlign="center"
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
          background: "radial-gradient(ellipse, rgba(168,85,247,0.25), transparent 70%)",
        }}
      />

      <SectionContainer className="relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionBadge variant="dark" className="mb-6">
              Our AI Services
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-white text-[32px] md:text-[44px] leading-[1.2] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700 }}
            >
              Intelligent Solutions{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #a855f7, #06b6d4)" }}
              >
                for Every Industry
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="text-[16px] md:text-[17px] max-w-[560px] mx-auto leading-[1.7]"
              style={{ fontFamily: fonts.body, color: colors.textSubtle }}
            >
              From strategy consulting and model development to
              integration — we guide you through every step of your AI journey.
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
                    background: `linear-gradient(135deg, ${colors.purple}20, ${colors.purple}08)`,
                    border: `1px solid ${colors.purple}25`,
                  }}
                >
                  <Icon size={22} style={{ color: colors.purple }} strokeWidth={1.8} />
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

/* ── AI Automation Flows Section ── */
function AutomationFlowsSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const inputNodes = [
    { icon: "📧", label: "Email", color: "#3B82F6" },
    { icon: "🗂️", label: "Database", color: "#8B5CF6" },
    { icon: "🌐", label: "API", color: "#06B6D4" },
    { icon: "📄", label: "Documents", color: "#10B981" },
  ];

  const agents = [
    { icon: Brain, label: "AI Agent", color: colors.purple },
    { icon: Sparkles, label: "NLP Engine", color: colors.cyan },
    { icon: Zap, label: "Automation", color: "#EAB308" },
  ];

  const outputNodes = [
    { icon: "📊", label: "Analytics", color: "#F59E0B" },
    { icon: "🔔", label: "Notifications", color: "#EF4444" },
    { icon: "💾", label: "Storage", color: "#8B5CF6" },
    { icon: "📱", label: "Apps", color: "#06B6D4" },
  ];

  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      {/* Background gradients */}
      <div
        className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-[0.08]"
        style={{ background: `radial-gradient(circle, ${colors.purple}, transparent 70%)` }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-[0.08]"
        style={{ background: `radial-gradient(circle, ${colors.cyan}, transparent 70%)` }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${(i * 5.2) % 100}%`,
              top: `${(i * 4.8) % 100}%`,
              background: [colors.purple, colors.cyan, colors.blue][i % 3],
            }}
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </div>

      <SectionContainer className="relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">
              Smart Automation
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-[32px] md:text-[44px] leading-[1.2] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
            >
              We Build Systems{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${colors.purple}, ${colors.cyan})` }}
              >
                That AI Can Use
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="text-[16px] md:text-[17px] max-w-[620px] mx-auto leading-[1.7]"
              style={{ fontFamily: fonts.body, color: colors.textMuted }}
            >
              Our AI agents automatically orchestrate complex workflows —
              from data collection and intelligent processing to
              action in your systems.
            </p>
          </ScrollReveal>
        </div>

        {/* Workflow Visualization */}
        <div ref={ref} className="relative max-w-[1100px] mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between gap-8">
            {/* Input Nodes (Left) */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: transitions.smooth }}
            >
              {inputNodes.map((node, i) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, x: -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: transitions.smooth }}
                  className="group relative"
                >
                  <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-pointer">
                    <span className="text-[24px]">{node.icon}</span>
                    <span
                      className="text-[15px] whitespace-nowrap"
                      style={{ fontFamily: fonts.display, fontWeight: 600, color: colors.textDark }}
                    >
                      {node.label}
                    </span>
                  </div>
                  {/* Connection line to agents */}
                  <motion.div
                    className="absolute top-1/2 -right-8 w-8 h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${node.color}, transparent)` }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  />
                  {/* Animated pulse */}
                  <motion.div
                    className="absolute top-1/2 -right-8 w-2 h-2 rounded-full -translate-y-1/2"
                    style={{ background: node.color, boxShadow: `0 0 10px ${node.color}` }}
                    animate={inView ? { x: [0, 32, 32], opacity: [0, 1, 0] } : {}}
                    transition={{ duration: 2, delay: 1 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* AI Agents (Center) */}
            <motion.div
              className="relative flex flex-col gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: transitions.smooth }}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-2xl blur-[40px] -z-10"
                style={{ background: `linear-gradient(135deg, ${colors.purple}30, ${colors.cyan}30)` }}
              />
              
              {agents.map((agent, i) => {
                const Icon = agent.icon;
                return (
                  <motion.div
                    key={agent.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: transitions.smooth }}
                    whileHover={{ scale: 1.05 }}
                    className="relative group"
                  >
                    <div
                      className="flex items-center gap-4 px-6 py-4 rounded-xl border-2 bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer"
                      style={{ borderColor: agent.color }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `${agent.color}15` }}
                      >
                        <Icon size={20} style={{ color: agent.color }} strokeWidth={2} />
                      </div>
                      <span
                        className="text-[16px] whitespace-nowrap"
                        style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
                      >
                        {agent.label}
                      </span>
                    </div>
                    {/* Pulse animation */}
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{ border: `2px solid ${agent.color}` }}
                      animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Output Nodes (Right) */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: transitions.smooth }}
            >
              {outputNodes.map((node, i) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: transitions.smooth }}
                  className="group relative"
                >
                  <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-pointer">
                    <span className="text-[24px]">{node.icon}</span>
                    <span
                      className="text-[15px] whitespace-nowrap"
                      style={{ fontFamily: fonts.display, fontWeight: 600, color: colors.textDark }}
                    >
                      {node.label}
                    </span>
                  </div>
                  {/* Connection line from agents */}
                  <motion.div
                    className="absolute top-1/2 -left-8 w-8 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${node.color})` }}
                    initial={{ scaleX: 0, originX: 1 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  />
                  {/* Animated pulse */}
                  <motion.div
                    className="absolute top-1/2 -left-8 w-2 h-2 rounded-full -translate-y-1/2"
                    style={{ background: node.color, boxShadow: `0 0 10px ${node.color}` }}
                    animate={inView ? { x: [0, -32, -32], opacity: [0, 1, 0] } : {}}
                    transition={{ duration: 2, delay: 1.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden flex flex-col items-center gap-8">
            {/* Input Nodes */}
            <motion.div
              className="grid grid-cols-2 gap-4 w-full max-w-[400px]"
              initial={{ opacity: 0, y: -30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: transitions.smooth }}
            >
              {inputNodes.map((node, i) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: transitions.smooth }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm"
                >
                  <span className="text-[20px]">{node.icon}</span>
                  <span
                    className="text-[14px]"
                    style={{ fontFamily: fonts.display, fontWeight: 600, color: colors.textDark }}
                  >
                    {node.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Connection arrow down */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={inView ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="w-[2px] h-8"
              style={{ background: `linear-gradient(180deg, ${colors.purple}, ${colors.cyan})` }}
            />

            {/* AI Agents */}
            <motion.div
              className="flex flex-col gap-3 w-full max-w-[320px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: transitions.smooth }}
            >
              {agents.map((agent, i) => {
                const Icon = agent.icon;
                return (
                  <div
                    key={agent.label}
                    className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 bg-white shadow-md"
                    style={{ borderColor: agent.color }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: `${agent.color}15` }}
                    >
                      <Icon size={18} style={{ color: agent.color }} strokeWidth={2} />
                    </div>
                    <span
                      className="text-[15px]"
                      style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
                    >
                      {agent.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* Connection arrow down */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={inView ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="w-[2px] h-8"
              style={{ background: `linear-gradient(180deg, ${colors.cyan}, ${colors.purple})` }}
            />

            {/* Output Nodes */}
            <motion.div
              className="grid grid-cols-2 gap-4 w-full max-w-[400px]"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8, ease: transitions.smooth }}
            >
              {outputNodes.map((node, i) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.1, ease: transitions.smooth }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm"
                >
                  <span className="text-[20px]">{node.icon}</span>
                  <span
                    className="text-[14px]"
                    style={{ fontFamily: fonts.display, fontWeight: 600, color: colors.textDark }}
                  >
                    {node.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Features list below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1, ease: transitions.smooth }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto"
        >
          {[
            {
              icon: Workflow,
              title: "Multi-Step Workflows",
              text: "Automatically orchestrate complex processes",
            },
            {
              icon: Zap,
              title: "Real-Time Processing",
              text: "Instant reaction to events and data",
            },
            {
              icon: Target,
              title: "Smart Decision Making",
              text: "AI-driven decisions at every step",
            },
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${colors.purple}15, ${colors.cyan}15)`,
                    border: `1px solid ${colors.purple}20`,
                  }}
                >
                  <Icon size={22} style={{ color: colors.purple }} strokeWidth={1.8} />
                </div>
                <h4
                  className="text-[16px] mb-2"
                  style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
                >
                  {feature.title}
                </h4>
                <p
                  className="text-[14px] leading-[1.6]"
                  style={{ fontFamily: fonts.body, color: colors.textMuted }}
                >
                  {feature.text}
                </p>
              </div>
            );
          })}
        </motion.div>
      </SectionContainer>
    </section>
  );
}

/* ── Intelligent Systems Showcase ── */
function IntelligentSystemsShowcase() {
  const { t } = useTranslation();
  const systems = [
    {
      icon: "💎",
      title: "Jewelry Design Automation",
      industry: "E-Commerce & Retail",
      description: "Automated workflow from customer inquiry to finished sketch with AI validation.",
      color: "#8B5CF6",
      steps: [
        { label: "Customer Inquiry", icon: MessageSquare, detail: "Email or form" },
        { label: "GPT Analysis", icon: Brain, detail: "Understand requirements" },
        { label: "Generate Sketch", icon: Sparkles, detail: "Create AI design" },
        { label: "Validation", icon: Target, detail: "Quality check" },
        { label: "Feedback Loop", icon: TrendingUp, detail: "Repeat if needed" },
      ],
      results: ["85% faster design time", "Automatic validation", "Customer satisfaction +40%"],
    },
    {
      icon: "💼",
      title: "Smart Job Matching",
      industry: "Freelancer Platform",
      description: "AI searches multiple job portals, analyzes fit, and automatically submits applications.",
      color: "#06B6D4",
      steps: [
        { label: "Job Scraping", icon: Workflow, detail: "Multiple sources" },
        { label: "AI Matching", icon: Brain, detail: "Skills analysis" },
        { label: "Proposal Generator", icon: Sparkles, detail: "Personalized" },
        { label: "Auto-Submit", icon: Zap, detail: "Send directly" },
        { label: "Tracking", icon: BarChart3, detail: "Measure success rate" },
      ],
      results: ["10x more applications", "75% matching accuracy", "Automated follow-ups"],
    },
    {
      icon: "🤖",
      title: "CRM MCP for Claude",
      industry: "Sales & Customer Success",
      description: "Claude integration enables natural language interaction with your CRM — manage accounts, contacts, and deals via chat.",
      color: "#10B981",
      steps: [
        { label: "Natural Language", icon: MessageSquare, detail: "Simple commands" },
        { label: "Claude MCP", icon: Brain, detail: "Intelligent interface" },
        { label: "CRM Actions", icon: Workflow, detail: "Accounts & Deals" },
        { label: "Real-Time Sync", icon: Zap, detail: "Instant updates" },
        { label: "Smart Insights", icon: BarChart3, detail: "AI analytics" },
      ],
      results: ["Natural CRM interaction", "50% faster updates", "Claude-powered Insights"],
    },
  ];

  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: colors.navyDeep }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20"
          style={{ background: `radial-gradient(circle, ${colors.purple}, transparent 70%)` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] opacity-20"
          style={{ background: `radial-gradient(circle, ${colors.cyan}, transparent 70%)` }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${(i * 3.7) % 100}%`,
              top: `${(i * 5.3) % 100}%`,
            }}
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
          />
        ))}
      </div>

      <SectionContainer className="relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionBadge variant="dark" className="mb-6">
              Success Stories
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-white text-[32px] md:text-[44px] leading-[1.2] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700 }}
            >
              Intelligent Systems{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${colors.purple}, ${colors.cyan})` }}
              >
                in Practice
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="text-[16px] md:text-[17px] max-w-[620px] mx-auto leading-[1.7]"
              style={{ fontFamily: fonts.body, color: colors.textSlate }}
            >
              Real AI solutions we've developed for our clients —
              from e-commerce to freelancer platforms.
            </p>
          </ScrollReveal>
        </div>

        <div className="space-y-12 md:space-y-16">
          {systems.map((system, sysIndex) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: "-100px 0px" });
            
            return (
              <motion.div
                key={system.title}
                ref={ref}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: transitions.smooth }}
                className="relative"
              >
                {/* Card container */}
                <div
                  className="relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 hover:border-white/20 transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${system.color}08, transparent)`,
                  }}
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-[32px] shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${system.color}20, ${system.color}10)`,
                        border: `2px solid ${system.color}40`,
                      }}
                    >
                      {system.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] mb-3"
                        style={{
                          fontFamily: fonts.display,
                          fontWeight: 600,
                          color: system.color,
                          background: `${system.color}15`,
                          border: `1px solid ${system.color}30`,
                        }}
                      >
                        {system.industry}
                      </div>
                      
                      <h3
                        className="text-white text-[24px] md:text-[28px] mb-3"
                        style={{ fontFamily: fonts.heading, fontWeight: 700 }}
                      >
                        {system.title}
                      </h3>
                      
                      <p
                        className="text-[15px] md:text-[16px] leading-[1.7] max-w-[700px]"
                        style={{ fontFamily: fonts.body, color: colors.textSlate }}
                      >
                        {system.description}
                      </p>
                    </div>
                  </div>

                  {/* Workflow Steps */}
                  <div className="mb-8">
                    <h4
                      className="text-white text-[16px] mb-6"
                      style={{ fontFamily: fonts.heading, fontWeight: 600 }}
                    >
                      Workflow
                    </h4>
                    
                    {/* Desktop flow */}
                    <div className="hidden md:flex items-center justify-between gap-3">
                      {system.steps.map((step, i) => {
                        const StepIcon = step.icon;
                        return (
                          <React.Fragment key={step.label}>
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={inView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: transitions.smooth }}
                              className="flex-1 group"
                            >
                              <div
                                className="relative rounded-xl border bg-white/[0.03] p-4 hover:bg-white/[0.05] transition-all"
                                style={{ borderColor: `${system.color}30` }}
                              >
                                <div
                                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 mx-auto"
                                  style={{ background: `${system.color}15` }}
                                >
                                  <StepIcon size={18} style={{ color: system.color }} strokeWidth={2} />
                                </div>
                                <div
                                  className="text-white text-[13px] mb-1 text-center"
                                  style={{ fontFamily: fonts.display, fontWeight: 600 }}
                                >
                                  {step.label}
                                </div>
                                <div
                                  className="text-[11px] text-center"
                                  style={{ fontFamily: fonts.body, color: colors.textSlate }}
                                >
                                  {step.detail}
                                </div>
                              </div>
                            </motion.div>
                            
                            {i < system.steps.length - 1 && (
                              <motion.div
                                initial={{ scaleX: 0 }}
                                animate={inView ? { scaleX: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                                className="flex items-center gap-1 shrink-0"
                                style={{ originX: 0 }}
                              >
                                <div className="w-6 h-[2px]" style={{ background: `${system.color}40` }} />
                                <ArrowRight size={14} style={{ color: `${system.color}60` }} />
                              </motion.div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {/* Mobile flow */}
                    <div className="md:hidden space-y-3">
                      {system.steps.map((step, i) => {
                        const StepIcon = step.icon;
                        return (
                          <div key={step.label} className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: `${system.color}15`, border: `1px solid ${system.color}30` }}
                            >
                              <StepIcon size={16} style={{ color: system.color }} strokeWidth={2} />
                            </div>
                            <div className="flex-1">
                              <div
                                className="text-white text-[14px] mb-0.5"
                                style={{ fontFamily: fonts.display, fontWeight: 600 }}
                              >
                                {step.label}
                              </div>
                              <div
                                className="text-[12px]"
                                style={{ fontFamily: fonts.body, color: colors.textSlate }}
                              >
                                {step.detail}
                              </div>
                            </div>
                            {i < system.steps.length - 1 && (
                              <ArrowRight size={14} className="shrink-0" style={{ color: `${system.color}40` }} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4
                      className="text-white text-[16px] mb-4"
                      style={{ fontFamily: fonts.heading, fontWeight: 600 }}
                    >
                      Results
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {system.results.map((result, i) => (
                        <motion.div
                          key={result}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: transitions.smooth }}
                          className="flex items-center gap-2 px-4 py-2 rounded-full"
                          style={{
                            background: `${system.color}10`,
                            border: `1px solid ${system.color}25`,
                          }}
                        >
                          <Check size={14} style={{ color: system.color }} strokeWidth={3} />
                          <span
                            className="text-[13px]"
                            style={{ fontFamily: fonts.display, fontWeight: 600, color: colors.textSubtle }}
                          >
                            {result}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Glow effect on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${system.color}15, transparent 70%)`,
                      filter: "blur(30px)",
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA at the bottom */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 text-center">
            <p
              className="text-[16px] mb-6"
              style={{ fontFamily: fonts.body, color: colors.textSlate }}
            >
              Ready for your own AI solution?
            </p>
            <PrimaryButton
              onClick={() => openBookingModal()}
            >
              Discuss Project
            </PrimaryButton>
          </div>
        </ScrollReveal>
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
            style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.08), transparent 60%)" }}
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
                style={{ background: `${colors.purple}15`, border: `1px solid ${colors.purple}30` }}
              >
                <Check size={11} strokeWidth={3} style={{ color: colors.purple }} />
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
      title: "AI That Understands Your Customers",
      text: "Our NLP solutions analyze customer inquiries, feedback, and documents in real time — delivering actionable insights to your team instantly.",
      bullets: [
        "Chatbots with natural dialogue understanding",
        "Automatic sentiment and intent analysis",
        "Multilingual processing (DE/EN/TR)",
      ],
      image:
        "https://images.unsplash.com/photo-1762330467572-5199bc772a20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwbGFuZ3VhZ2UlMjBwcm9jZXNzaW5nJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzIyNzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      reverse: false,
    },
    {
      title: "Turning Data into Decisions",
      text: "With predictive analytics and machine learning, we detect patterns in your data before they become obvious — enabling proactive business decisions.",
      bullets: [
        "Revenue and demand forecasting",
        "Customer segmentation and churn prediction",
        "Automatic anomaly detection",
      ],
      image:
        "https://images.unsplash.com/photo-1620203853151-496c7228306c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwcGlwZWxpbmUlMjBhdXRvbWF0aW9uJTIwd29ya2Zsb3d8ZW58MXx8fHwxNzcyMjcwMzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      reverse: true,
    },
    {
      title: "Seeing What Humans Miss",
      text: "Computer vision detects defects, classifies objects, and automates visual inspection processes — faster and more precise than any manual review.",
      bullets: [
        "Real-time image recognition and classification",
        "Quality control in production",
        "OCR and automatic document processing",
      ],
      image:
        "https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29yayUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzcyMjUwMDA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
            <SectionBadge variant="dark" className="mb-6">Our AI Process</SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading theme="dark" subtitle="Five proven steps for successful AI projects.">
              From Use Case to{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #a855f7, #06b6d4)" }}>
                AI Product
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
                      background: `linear-gradient(135deg, ${colors.purple}30, transparent)`,
                      border: `2px solid ${colors.purple}40`,
                    }}
                  />
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[20px]"
                    style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.purple }}
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

/* ── Floating AI icons for TechStack background ── */
const floatingAiIcons: {
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
  { label: "Brain", color: "#a855f7", svgPath: "M12 2a7 7 0 0 0-4.6 12.3A3 3 0 0 0 6 17v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a3 3 0 0 0-1.4-2.7A7 7 0 0 0 12 2Zm0 2a5 5 0 0 1 3.5 8.6l-.5.4V17H9v-4l-.5-.4A5 5 0 0 1 12 4Z", x: "5%", y: "12%", size: 38, dur: 9, delay: 0, drift: 8 },
  { label: "Python", color: "#3776AB", svgPath: "M12 2c-1.7 0-3 .5-3.9 1.3C7.3 4.1 7 5.2 7 6.3V8h5v1H6.3c-1.4 0-2.6.8-3 2.1-.5 1.5-.5 2.4 0 3.9.4 1.1 1.3 2 2.7 2H8v-2.3c0-1.6 1.4-3 3-3h5c1.3 0 2.3-1.1 2.3-2.4V6.3c0-1.2-.4-2.2-1.2-3C16.3 2.5 14.5 2 12 2Zm-1.6 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9ZM17 9v2.3c0 1.6-1.4 3-3 3h-5c-1.3 0-2.3 1.1-2.3 2.4v3c0 1.2 1.1 1.9 2.3 2.3 1.5.4 2.9.5 5 0 1.4-.3 2.3-1 2.3-2.3V18h-5v-1h7.3c1.4 0 1.9-.9 2.3-2.1.5-1.2.5-2.4 0-3.9-.3-.9-1-2-2.3-2H17Zm-3.4 8.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Z", x: "90%", y: "18%", size: 34, dur: 11, delay: 1, drift: -7 },
  { label: "Network", color: "#06b6d4", svgPath: "M12 2a3 3 0 0 0-2.83 4H6a3 3 0 1 0 0 2h3.17A3 3 0 0 0 12 10a3 3 0 0 0 2.83-2H18a3 3 0 1 0 0-2h-3.17A3 3 0 0 0 12 2Zm0 12a3 3 0 0 0-2.83 2H6a3 3 0 1 0 0 2h3.17A3 3 0 1 0 12 14Z", x: "92%", y: "65%", size: 32, dur: 10, delay: 2, drift: 6 },
  { label: "Data", color: "#10B981", svgPath: "M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4M4 12c0 2.21 3.58 4 8 4s8-1.79 8-4", x: "3%", y: "72%", size: 30, dur: 12, delay: 0.5, drift: -5 },
  { label: "Bolt", color: "#EAB308", svgPath: "M13 10V3L4 14h7v7l9-11h-7Z", x: "45%", y: "5%", size: 26, dur: 7, delay: 0.8, drift: 6 },
  { label: "Chart", color: "#f43f5e", svgPath: "M3 3v18h18M9 17V9m4 8V5m4 12v-4", x: "78%", y: "85%", size: 28, dur: 13, delay: 1.5, drift: -8 },
  { label: "Chip", color: "#8B5CF6", svgPath: "M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3M7 7h10v10H7z", x: "15%", y: "88%", size: 30, dur: 8, delay: 3, drift: 7 },
  { label: "Cloud", color: "#818CF8", svgPath: "M6.5 20a4.49 4.49 0 0 1-.42-8.96A6.5 6.5 0 0 1 18.5 12h.5a3.5 3.5 0 0 1 0 7H6.5Z", x: "62%", y: "90%", size: 34, dur: 14, delay: 2.5, drift: -4 },
  { label: "Lock", color: "#0EA5E9", svgPath: "M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Zm10-10V7a4 4 0 0 0-8 0v4h8Z", x: "24%", y: "6%", size: 28, dur: 10, delay: 3.5, drift: 9 },
  { label: "Code", color: "#2563EB", svgPath: "m7 8-4 4 4 4m10-8 4 4-4 4M14 4l-4 16", x: "72%", y: "8%", size: 32, dur: 11, delay: 4, drift: -6 },
];

/* ── Tech Stack ── */
function TechStackSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">
      {/* Floating AI icons background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[140px] opacity-[0.06]"
          style={{ background: `radial-gradient(ellipse, ${colors.purple}, ${colors.teal}40, transparent 70%)` }}
        />

        {floatingAiIcons.map((icon) => (
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
              background: [colors.purple, colors.teal, colors.blue, "#10B981"][i % 4],
            }}
            animate={{ opacity: [0.03, 0.09, 0.03], scale: [1, 1.5, 1] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
          />
        ))}
      </div>

      <SectionContainer className="relative z-10">
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">Technologies</SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading
              theme="light"
              subtitle="We rely on leading AI frameworks and cloud infrastructure for robust, scalable solutions."
            >
              Our AI Stack
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
              className="px-5 py-2.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:border-purple-300 hover:shadow-md transition-all cursor-default"
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
        background: "linear-gradient(180deg, rgba(233,213,255,0) 0%, rgba(233,213,255,0.25) 30%, rgba(233,213,255,0) 100%)",
      }}
    >
      <SectionContainer className="relative z-10">
        <div className="text-center mb-14">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">
              Featured AI Projects
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading theme="light" subtitle="A glimpse into our AI and machine learning projects.">
              Our AI Portfolio
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
                      fontFamily: fonts.display, fontWeight: 600, color: colors.purple,
                      background: `${colors.purple}12`, border: `1px solid ${colors.purple}25`,
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
                  style={{ fontFamily: fonts.display, fontWeight: 700, color: colors.purple }}
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
              background: `linear-gradient(135deg, ${colors.purple}08, ${colors.teal}06, transparent)`,
              borderColor: `${colors.purple}20`,
            }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <h2
                  className="text-white text-[28px] md:text-[36px] leading-[1.25] mb-4"
                  style={{ fontFamily: fonts.heading, fontWeight: 700 }}
                >
                  AI Results That Matter
                </h2>
                <p
                  className="text-[16px] md:text-[17px] leading-[1.7] mb-6"
                  style={{ fontFamily: fonts.body, color: colors.textSlate }}
                >
                  Our AI solutions deliver measurable results — from
                  reduced operating costs to accelerated
                  decision-making processes.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { value: "70%", label: "Automation" },
                    { value: "3x", label: "Faster Analysis" },
                    { value: "95%", label: "Accuracy" },
                    { value: "24/7", label: "Availability" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div
                        className="text-[28px] md:text-[32px] mb-1"
                        style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.purple }}
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
                  Start AI Project
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

export default function AiSolutionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden scroll-smooth">
            <SEO
        title="Custom AI Solutions & Machine Learning Development"
        description="Custom AI development services: machine learning models, NLP, computer vision, predictive analytics, and LLM integration. We build AI solutions that automate processes and accelerate growth."
        canonical="/services/ai-solutions"
        schemaMarkup={serviceSchema("AI Solutions & Machine Learning", "Custom AI and machine learning development including NLP, computer vision, predictive analytics, and large language model integration.", "/services/ai-solutions")}
      />
      <Navbar />
      <ServiceHero />
      <DeliverablesSection />
      <AutomationFlowsSection />
      <IntelligentSystemsShowcase />
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