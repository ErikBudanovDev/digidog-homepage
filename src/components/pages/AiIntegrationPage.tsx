import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowRight,
  Search,
  Workflow,
  Zap,
  Bot,
  Plug,
  GraduationCap,
  Wrench,
  RefreshCcw,
  TrendingUp,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
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
import { colors, fonts, transitions } from "@/components/ui/brand";
import { SectionContainer, SectionBadge } from "@/components/ui/section";
import { PrimaryButton, openBookingModal } from "@/components/ui/buttons";
import { SEO, serviceSchema } from "@/components/SEO";

/* ─────────────────────────────────────────────
 * DATA
 * ───────────────────────────────────────────── */

const services = [
  {
    icon: Search,
    title: "AI Strategy & Roadmap",
    description:
      "We audit your company, identify high-impact AI opportunities, calculate ROI, and create a clear implementation roadmap.",
    deliverables: ["AI implementation plan", "Cost savings projections", "Automation map"],
    color: "#3B82F6",
  },
  {
    icon: Workflow,
    title: "Custom AI Workflows",
    description:
      "We build AI workflows that run real operations — from lead qualification to meeting summaries and support triage.",
    deliverables: ["End-to-end automation", "API integrations", "Internal dashboards"],
    color: "#8B5CF6",
  },
  {
    icon: Zap,
    title: "AI Automation",
    description:
      "Replace repetitive manual tasks with intelligent automation — invoice processing, data entry, report generation, and more.",
    deliverables: ["Saved labor hours", "Faster operations", "Fewer mistakes"],
    color: "#F59E0B",
  },
  {
    icon: Bot,
    title: "Custom AI Assistants",
    description:
      "AI trained on your business data — internal knowledge bots, sales assistants, HR helpers, and legal document analyzers.",
    deliverables: ["Company-specific intelligence", "CRM & SOP integration", "24/7 availability"],
    color: "#10B981",
  },
  {
    icon: Plug,
    title: "Software Integration",
    description:
      "Connect AI to your existing CRM, ERP, Slack, email, databases, and project management tools seamlessly.",
    deliverables: ["Integration engineering", "Automated ticket routing", "Smart responses"],
    color: "#06B6D4",
  },
  {
    icon: GraduationCap,
    title: "AI Team Training",
    description:
      "Workshops, internal AI playbooks, prompt libraries, and best practices to multiply your employees' productivity.",
    deliverables: ["Custom workshops", "Prompt libraries", "Best practices guide"],
    color: "#EC4899",
  },
  {
    icon: Wrench,
    title: "Custom AI Platforms",
    description:
      "Bespoke internal tools — AI document search, analytics dashboards, forecasting tools, and call analysis systems.",
    deliverables: ["Purpose-built software", "AI analytics", "Real-time insights"],
    color: "#EF4444",
  },
  {
    icon: RefreshCcw,
    title: "Ongoing AI Operations",
    description:
      "Continuous monitoring, retraining, prompt tuning, and cost optimization to keep your AI systems performing at their best.",
    deliverables: ["Performance monitoring", "Model retraining", "Cost optimization"],
    color: "#14B8A6",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Audit",
    description: "We analyze your business processes, identify bottlenecks, and pinpoint where AI delivers the most value.",
  },
  {
    number: "02",
    title: "Strategy & ROI Planning",
    description: "We create a prioritized AI roadmap with clear cost projections and expected returns for each initiative.",
  },
  {
    number: "03",
    title: "Build & Integrate",
    description: "Our engineers build custom AI systems and seamlessly integrate them into your existing software stack.",
  },
  {
    number: "04",
    title: "Train & Deploy",
    description: "We train your team, deploy the solutions, and ensure everything runs smoothly from day one.",
  },
  {
    number: "05",
    title: "Monitor & Optimize",
    description: "Continuous performance monitoring, A/B testing, and iterative improvements to maximize your AI ROI.",
  },
];

const workflowExamples = [
  {
    title: "Customer Support Automation",
    flow: ["Customer Email", "AI Reads & Classifies", "Updates CRM", "Assigns Ticket", "Drafts Response"],
    color: "#3B82F6",
  },
  {
    title: "Sales Lead Pipeline",
    flow: ["New Lead", "AI Qualification", "CRM Update", "Personalized Email", "Follow-up Schedule"],
    color: "#8B5CF6",
  },
  {
    title: "Meeting Intelligence",
    flow: ["Meeting Transcript", "AI Summary", "Action Items", "Task Creation", "Team Notification"],
    color: "#10B981",
  },
];

const stats = [
  { value: "30–60%", label: "Repetitive work automated", icon: Zap },
  { value: "40%", label: "Average cost reduction", icon: DollarSign },
  { value: "3x", label: "Faster operations", icon: Clock },
  { value: "95%", label: "Client satisfaction", icon: ShieldCheck },
];

const useCases = [
  {
    title: "Customer Support",
    result: "AI chatbot handling 70% of inquiries",
    image: "https://images.unsplash.com/photo-1764664281859-c5bd20adfbb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGF1dG9tYXRpb24lMjB3b3JrZmxvdyUyMGRpZ2l0YWx8ZW58MXx8fHwxNzcyODcxMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Marketing & Content",
    result: "AI content system saving 20+ hrs/week",
    image: "https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwc2NyZWVufGVufDF8fHx8MTc3Mjg0MzM0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Sales Automation",
    result: "AI lead qualification boosting conversions 35%",
    image: "https://images.unsplash.com/photo-1758518726775-70e538b0d46e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBzdHJhdGVneSUyMG1lZXRpbmclMjBtb2Rlcm58ZW58MXx8fHwxNzcyODE3NTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

/* ─────────────────────────────────────────────
 * HERO
 * ───────────────────────────────────────────── */

function HeroSection() {
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

        {/* Gradient glows */}
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

        {/* Floating decorations */}
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
                AI Integration Agency
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
                  We Automate
                </span>
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #a78bfa 0%, #06b6d4 100%)" }}
                >
                  30–60%
                </span>
                <br />
                <span className="text-white">of Your Repetitive Work</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p
                className="text-[17px] md:text-[19px] leading-[1.7] mb-8 max-w-[520px]"
                style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}
              >
                Everyone has access to AI tools. But building the{" "}
                <span className="text-white">systems that actually run your business</span>?
                That's where we come in. Think of AI like electricity —
                you still need engineers to build the system.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <PrimaryButton onClick={() => openBookingModal()}>
                  Book Free Strategy Call
                </PrimaryButton>
                <a
                  href="#services-grid"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#services-grid")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white text-[17px] hover:border-white/40 hover:bg-white/5 transition-all cursor-pointer"
                  style={{ fontFamily: fonts.display, fontWeight: 600 }}
                >
                  Explore Services
                  <ArrowRight size={18} />
                </a>
              </div>
            </ScrollReveal>

            {/* Trust bar */}
            <ScrollReveal delay={0.4}>
              <div className="mt-10 flex items-center gap-6 flex-wrap">
                {stats.slice(0, 3).map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        <Icon size={15} className="text-white/70" />
                      </div>
                      <div>
                        <span
                          className="text-white text-[16px] block leading-tight"
                          style={{ fontFamily: fonts.heading, fontWeight: 700 }}
                        >
                          {stat.value}
                        </span>
                        <span
                          className="text-white/40 text-[11px] block leading-tight"
                          style={{ fontFamily: fonts.body }}
                        >
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Electricity Analogy Visual */}
          <ScrollReveal delay={0.2} direction="right">
            <div className="relative hidden lg:block">
              {/* Electricity bolts behind the card */}
              <div className="absolute -inset-12 pointer-events-none z-0">
                {/* Main glow - brighter */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(56,189,248,0.25) 0%, rgba(167,139,250,0.12) 40%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Pulsing light orbs around card edges */}
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
                      left: orb.x,
                      top: orb.y,
                      width: orb.size,
                      height: orb.size,
                      background: `radial-gradient(circle, ${orb.color}50, ${orb.color}20, transparent 70%)`,
                      filter: "blur(15px)",
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      opacity: [0.3, 0.9, 0.3],
                      scale: [0.8, 1.3, 0.8],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      delay: i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                {/* Lightning bolt SVGs - stronger */}
                <motion.svg
                  className="absolute"
                  style={{ top: "-10%", left: "-8%", width: "120%", height: "120%" }}
                  viewBox="0 0 500 600"
                  fill="none"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Left bolt - main */}
                  <motion.path
                    d="M80 50 L120 180 L90 190 L140 350 L100 360 L160 550"
                    stroke="url(#bolt1)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#glow1)"
                    animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  />
                  {/* Branch 1 */}
                  <motion.path
                    d="M120 180 L190 250 L170 260 L210 340"
                    stroke="url(#bolt1)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#glow1)"
                    animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.8, 0.8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3, repeatDelay: 1.5 }}
                  />
                  {/* Branch 2 */}
                  <motion.path
                    d="M140 350 L200 400 L180 410 L220 480"
                    stroke="url(#bolt1)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#glow1)"
                    animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.7, 0.7, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.6, repeatDelay: 2 }}
                  />
                  <defs>
                    <linearGradient id="bolt1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
                      <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
                    </linearGradient>
                    <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </motion.svg>

                {/* Right side bolt - stronger */}
                <motion.svg
                  className="absolute"
                  style={{ top: "-5%", right: "-5%", width: "110%", height: "115%" }}
                  viewBox="0 0 500 600"
                  fill="none"
                  animate={{ opacity: [0.3, 0.9, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                  <motion.path
                    d="M420 30 L380 160 L410 170 L360 320 L400 330 L340 530"
                    stroke="url(#bolt2)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#glow2)"
                    animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5, repeatDelay: 0.8 }}
                  />
                  {/* Branch */}
                  <motion.path
                    d="M380 160 L310 230 L330 240 L280 320"
                    stroke="url(#bolt2)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#glow2)"
                    animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.7, 0.7, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1, repeatDelay: 1.5 }}
                  />
                  {/* Extra branch */}
                  <motion.path
                    d="M360 320 L300 380 L320 390 L280 460"
                    stroke="url(#bolt2)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#glow2)"
                    animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.6, 0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.3, repeatDelay: 2 }}
                  />
                  <defs>
                    <linearGradient id="bolt2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </motion.svg>

                {/* Center arc bolt (quick bright flash bolt) */}
                <motion.svg
                  className="absolute"
                  style={{ top: "-5%", left: "5%", width: "90%", height: "110%" }}
                  viewBox="0 0 400 600"
                  fill="none"
                  animate={{ opacity: [0, 0.7, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 2, repeatDelay: 3 }}
                >
                  <motion.path
                    d="M200 20 L180 120 L210 130 L170 260 L200 270 L160 420 L190 430 L170 560"
                    stroke="url(#bolt3)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#glow3)"
                    animate={{ pathLength: [0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut", delay: 2, repeatDelay: 3.7 }}
                  />
                  <defs>
                    <linearGradient id="bolt3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.8" />
                      <stop offset="70%" stopColor="#a78bfa" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                    </linearGradient>
                    <filter id="glow3" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </motion.svg>

                {/* Spark dots - bigger and brighter */}
                {[
                  { x: "12%", y: "25%", delay: 0 },
                  { x: "25%", y: "55%", delay: 0.4 },
                  { x: "88%", y: "22%", delay: 0.2 },
                  { x: "75%", y: "50%", delay: 0.7 },
                  { x: "70%", y: "85%", delay: 1.0 },
                  { x: "30%", y: "90%", delay: 0.6 },
                  { x: "50%", y: "10%", delay: 0.3 },
                  { x: "45%", y: "45%", delay: 0.9 },
                  { x: "55%", y: "75%", delay: 1.1 },
                  { x: "15%", y: "70%", delay: 0.5 },
                ].map((spark, i) => (
                  <motion.div
                    key={`spark-${i}`}
                    className="absolute rounded-full"
                    style={{
                      left: spark.x,
                      top: spark.y,
                      width: i % 3 === 0 ? 6 : 4,
                      height: i % 3 === 0 ? 6 : 4,
                      background: i % 3 === 0 ? "#ffffff" : i % 2 === 0 ? "#38bdf8" : "#a78bfa",
                      boxShadow: `0 0 ${i % 3 === 0 ? 16 : 12}px ${i % 3 === 0 ? 6 : 4}px ${
                        i % 3 === 0 ? "rgba(255,255,255,0.7)" : i % 2 === 0 ? "rgba(56,189,248,0.6)" : "rgba(167,139,250,0.6)"
                      }`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.3, 1.8, 0.3],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: spark.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1.5 + i * 0.2,
                    }}
                  />
                ))}

                {/* Electric arc flashes - quick bright bursts */}
                {[
                  { x: "20%", y: "40%", delay: 1 },
                  { x: "80%", y: "35%", delay: 2.5 },
                  { x: "50%", y: "95%", delay: 4 },
                ].map((flash, i) => (
                  <motion.div
                    key={`flash-${i}`}
                    className="absolute rounded-full"
                    style={{
                      left: flash.x,
                      top: flash.y,
                      width: 4,
                      height: 4,
                      background: "#ffffff",
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      opacity: [0, 0, 1, 0, 0],
                      scale: [1, 1, 4, 1, 1],
                      boxShadow: [
                        "0 0 0px 0px rgba(255,255,255,0)",
                        "0 0 0px 0px rgba(255,255,255,0)",
                        "0 0 30px 15px rgba(255,255,255,0.5)",
                        "0 0 0px 0px rgba(255,255,255,0)",
                        "0 0 0px 0px rgba(255,255,255,0)",
                      ],
                    }}
                    transition={{
                      duration: 0.6,
                      delay: flash.delay,
                      repeat: Infinity,
                      ease: "easeOut",
                      repeatDelay: 4 + i * 1.5,
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="relative rounded-2xl overflow-hidden border border-white/10 z-10"
                style={{ background: "rgba(15,29,53,0.8)" }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="p-8">
                  {/* Analogy card */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "linear-gradient(135deg, #F59E0B33, #F59E0B11)" }}
                    >
                      <Lightbulb size={24} style={{ color: "#F59E0B" }} />
                    </div>
                    <div>
                      <p
                        className="text-white text-[18px] mb-1"
                        style={{ fontFamily: fonts.heading, fontWeight: 600 }}
                      >
                        The Electricity Analogy
                      </p>
                      <p
                        className="text-white/50 text-[14px] leading-[1.6]"
                        style={{ fontFamily: fonts.body }}
                      >
                        Everyone can access electricity, but companies still hire
                        electricians and engineers to build the system.
                      </p>
                    </div>
                  </div>

                  {/* Comparison */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <span className="text-red-400 text-[14px]">&#x2717;</span>
                      <span
                        className="text-red-300 text-[14px] line-through"
                        style={{ fontFamily: fonts.body }}
                      >
                        "We implement AI"
                      </span>
                    </div>
                    {[
                      "We automate 30–60% of repetitive work using AI",
                      "We reduce operational costs using AI automation",
                      "We build AI systems that run parts of your business",
                    ].map((text) => (
                      <div
                        key={text}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                      >
                        <CheckCircle2 size={16} style={{ color: colors.green }} className="shrink-0" />
                        <span
                          className="text-emerald-200 text-[14px]"
                          style={{ fontFamily: fonts.body }}
                        >
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom tag */}
                  <div
                    className="mt-6 px-4 py-3 rounded-lg text-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(6,182,212,0.1))",
                      border: "1px solid rgba(168,85,247,0.15)",
                    }}
                  >
                    <p
                      className="text-white/70 text-[13px]"
                      style={{ fontFamily: fonts.body, fontWeight: 500 }}
                    >
                      Businesses pay for{" "}
                      <span className="text-white">problem solving</span>,{" "}
                      <span className="text-white">implementation</span>,{" "}
                      <span className="text-white">automation</span>,{" "}
                      <span className="text-white">integration</span> &{" "}
                      <span className="text-white">ROI</span> — not AI access.
                    </p>
                  </div>
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
 * STATS BAR
 * ───────────────────────────────────────────── */

function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="relative py-16 bg-white border-b border-gray-100">
      <SectionContainer>
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: transitions.smooth }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${colors.blue}15, ${colors.purple}10)`,
                    border: `1px solid ${colors.blue}20`,
                  }}
                >
                  <Icon size={24} style={{ color: colors.blue }} />
                </div>
                <p
                  className="text-[36px] md:text-[42px] leading-tight mb-1"
                  style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[14px]"
                  style={{ fontFamily: fonts.body, color: colors.textMuted }}
                >
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * 8 SERVICES GRID
 * ───────────────────────────────────────────── */

function ServicesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      id="services-grid"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: colors.navyDeep }}
    >
      {/* BG glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.3), transparent 70%)" }}
      />

      <SectionContainer className="relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionBadge variant="dark" className="mb-6">
              What We Offer
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-white text-[32px] md:text-[44px] leading-[1.2] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700 }}
            >
              8 Ways We{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #38bdf8, #a78bfa)" }}
              >
                Transform Your Business
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="text-[16px] md:text-[17px] max-w-[600px] mx-auto leading-[1.7]"
              style={{ fontFamily: fonts.body, color: colors.textSubtle }}
            >
              From initial strategy to ongoing optimization —
              we cover the full AI lifecycle so you can focus on growing your business.
            </p>
          </ScrollReveal>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07, ease: transitions.smooth }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${svc.color}22, ${svc.color}08)`,
                    border: `1px solid ${svc.color}30`,
                  }}
                >
                  <Icon size={22} style={{ color: svc.color }} strokeWidth={1.8} />
                </div>
                <h3
                  className="text-white text-[17px] mb-2"
                  style={{ fontFamily: fonts.heading, fontWeight: 600 }}
                >
                  {svc.title}
                </h3>
                <p
                  className="text-[13px] leading-[1.65] mb-4"
                  style={{ fontFamily: fonts.body, color: colors.textSlate }}
                >
                  {svc.description}
                </p>
                <ul className="space-y-1.5">
                  {svc.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2">
                      <CheckCircle2 size={12} style={{ color: svc.color }} className="shrink-0" />
                      <span
                        className="text-[12px]"
                        style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}
                      >
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * WORKFLOW EXAMPLES
 * ───────────────────────────────────────────── */

function WorkflowExamples() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-[0.06]"
        style={{ background: `radial-gradient(circle, ${colors.purple}, transparent 70%)` }}
      />

      <SectionContainer className="relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">
              Real Workflows
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-[32px] md:text-[44px] leading-[1.2] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
            >
              Working Systems,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${colors.blue}, ${colors.purple})` }}
              >
                Not Just Prompts
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="text-[16px] md:text-[17px] max-w-[580px] mx-auto leading-[1.7]"
              style={{ fontFamily: fonts.body, color: colors.textMuted }}
            >
              We connect your tools together into automated pipelines that handle real operations end-to-end.
            </p>
          </ScrollReveal>
        </div>

        <div ref={ref} className="space-y-6 max-w-[900px] mx-auto">
          {workflowExamples.map((wf, wi) => (
            <motion.div
              key={wf.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: wi * 0.15, ease: transitions.smooth }}
              className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-[0px_4px_30px_0px_rgba(0,0,0,0.04)] hover:shadow-[0px_8px_40px_0px_rgba(0,0,0,0.08)] transition-shadow"
            >
              <p
                className="text-[18px] mb-5"
                style={{ fontFamily: fonts.heading, fontWeight: 600, color: colors.textDark }}
              >
                {wf.title}
              </p>
              <div className="flex flex-wrap items-center gap-2 md:gap-0">
                {wf.flow.map((step, si) => (
                  <div key={step} className="flex items-center">
                    <motion.div
                      className="px-4 py-2.5 rounded-xl text-[13px] md:text-[14px] whitespace-nowrap"
                      style={{
                        fontFamily: fonts.body,
                        fontWeight: 500,
                        color: si === Math.floor(wf.flow.length / 2) ? "white" : colors.textDark,
                        background:
                          si === Math.floor(wf.flow.length / 2)
                            ? `linear-gradient(135deg, ${wf.color}, ${wf.color}CC)`
                            : `${wf.color}0A`,
                        border: `1px solid ${wf.color}${si === Math.floor(wf.flow.length / 2) ? "" : "20"}`,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: wi * 0.15 + si * 0.08 }}
                    >
                      {step}
                    </motion.div>
                    {si < wf.flow.length - 1 && (
                      <ChevronRight
                        size={16}
                        className="mx-1 shrink-0 hidden md:block"
                        style={{ color: `${wf.color}60` }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * USE CASES
 * ───────────────────────────────────────────── */

function UseCasesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: colors.navyDeep }}
    >
      <StarField count={25} color="rgba(255,255,255,0.4)" />

      <SectionContainer className="relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionBadge variant="dark" className="mb-6">
              Use Cases
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-white text-[32px] md:text-[44px] leading-[1.2] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700 }}
            >
              Where AI{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #10B981, #06b6d4)" }}
              >
                Actually Helps
              </span>
            </h2>
          </ScrollReveal>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: transitions.smooth }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-white/[0.15] transition-all duration-300"
            >
              <div className="h-[200px] overflow-hidden">
                <ImageWithFallback
                  src={uc.image}
                  alt={uc.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3
                  className="text-white text-[18px] mb-2"
                  style={{ fontFamily: fonts.heading, fontWeight: 600 }}
                >
                  {uc.title}
                </h3>
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} style={{ color: colors.green }} />
                  <span
                    className="text-[14px]"
                    style={{ fontFamily: fonts.body, color: colors.green }}
                  >
                    {uc.result}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * PROCESS TIMELINE
 * ───────────────────────────────────────────── */

function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <SectionContainer className="relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">
              Our Process
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-[32px] md:text-[44px] leading-[1.2] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
            >
              From Audit to{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${colors.blue}, ${colors.cyan})` }}
              >
                Automation
              </span>
            </h2>
          </ScrollReveal>
        </div>

        <div ref={ref} className="relative max-w-[800px] mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-10 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-cyan-500/20 hidden md:block" />

          <div className="space-y-8 md:space-y-10">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                className="flex gap-6 md:gap-8 items-start"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: transitions.smooth }}
              >
                {/* Number circle */}
                <div className="relative shrink-0">
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${colors.blue}12, ${colors.purple}08)`,
                      border: `1px solid ${colors.blue}20`,
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span
                      className="text-[22px] md:text-[26px]"
                      style={{
                        fontFamily: fonts.heading,
                        fontWeight: 700,
                        background: `linear-gradient(135deg, ${colors.blue}, ${colors.purple})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {step.number}
                    </span>
                  </motion.div>
                  {/* Dot on timeline line (desktop) */}
                  {i < processSteps.length - 1 && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-2 h-2 rounded-full hidden md:block"
                      style={{ background: colors.blue, boxShadow: `0 0 8px ${colors.blue}40` }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pt-2 md:pt-4">
                  <h3
                    className="text-[20px] md:text-[22px] mb-2"
                    style={{ fontFamily: fonts.heading, fontWeight: 600, color: colors.textDark }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[15px] leading-[1.7] max-w-[480px]"
                    style={{ fontFamily: fonts.body, color: colors.textMuted }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * REAL VALUE SECTION
 * ───────────────────────────────────────────── */

function RealValueSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const valueProps = [
    { label: "Problem Solving", description: "Identifying where AI creates the most business impact" },
    { label: "Implementation", description: "Building production-ready systems, not prototypes" },
    { label: "Automation", description: "Replacing hours of manual work with intelligent workflows" },
    { label: "Integration", description: "Connecting AI into the tools your team already uses" },
    { label: "ROI", description: "Measurable results and clear return on your investment" },
  ];

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a1628 0%, #0f1d35 50%, #0a1628 100%)",
      }}
    >
      <StarField count={15} color="rgba(255,255,255,0.3)" />

      <SectionContainer className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <ScrollReveal>
              <SectionBadge variant="dark" className="mb-6">
                The Real Value
              </SectionBadge>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2
                className="text-white text-[32px] md:text-[44px] leading-[1.2] mb-5"
                style={{ fontFamily: fonts.heading, fontWeight: 700 }}
              >
                We Sell{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #10B981, #38bdf8)" }}
                >
                  Productivity
                </span>
                <br />
                Not AI Access
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p
                className="text-[16px] md:text-[17px] leading-[1.7] mb-8"
                style={{ fontFamily: fonts.body, color: colors.textSubtle }}
              >
                Your business doesn't need another AI tool — it needs results.
                We deliver working automation systems that save time,
                reduce costs, and scale your operations.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <PrimaryButton onClick={() => openBookingModal()}>
                Start Your AI Journey
              </PrimaryButton>
            </ScrollReveal>
          </div>

          <div ref={ref} className="space-y-4">
            {valueProps.map((vp, i) => (
              <motion.div
                key={vp.label}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: transitions.smooth }}
                className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${colors.green}22, ${colors.green}08)`,
                    border: `1px solid ${colors.green}25`,
                  }}
                >
                  <span
                    className="text-[16px]"
                    style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.green }}
                  >
                    {i + 1}
                  </span>
                </div>
                <div>
                  <p
                    className="text-white text-[16px] mb-0.5"
                    style={{ fontFamily: fonts.heading, fontWeight: 600 }}
                  >
                    {vp.label}
                  </p>
                  <p
                    className="text-[14px] leading-[1.6]"
                    style={{ fontFamily: fonts.body, color: colors.textSlate }}
                  >
                    {vp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * TOOLS & TECHNOLOGIES
 * ───────────────────────────────────────────── */

function TechStackSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const tools = [
    "APIs", "Zapier", "Make.com", "Custom Scripts",
    "Python", "LangChain", "OpenAI", "Anthropic",
    "Slack", "CRM", "ERP", "Databases",
    "Docker", "AWS", "Dashboards", "Analytics",
  ];

  return (
    <section className="relative bg-white py-16 md:py-20 overflow-hidden">
      <SectionContainer className="relative z-10">
        <div className="text-center mb-12">
          <ScrollReveal>
            <p
              className="text-[14px] tracking-[2px] uppercase mb-3"
              style={{ fontFamily: fonts.body, fontWeight: 600, color: colors.textMuted }}
            >
              Tools We Work With
            </p>
          </ScrollReveal>
        </div>

        <div ref={ref} className="flex flex-wrap justify-center gap-3 max-w-[800px] mx-auto">
          {tools.map((tool, i) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="px-5 py-2.5 rounded-full text-[14px] border border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all cursor-default"
              style={{ fontFamily: fonts.body, fontWeight: 500, color: colors.textDark }}
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * FINAL CTA BANNER
 * ───────────────────────────────────────────── */

function CtaBanner() {
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
                Ready to Automate Your Business?
              </h2>
              <p
                className="text-white/60 text-[16px] md:text-[17px] mb-8 max-w-[500px] mx-auto"
                style={{ fontFamily: fonts.body }}
              >
                Book a free 30-minute strategy call. We'll identify your
                highest-impact AI opportunities and show you the ROI.
              </p>
              <PrimaryButton onClick={() => openBookingModal()}>
                Book Free Strategy Call
              </PrimaryButton>
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

export default function AiIntegrationPage() {
  return (
    <div className="min-h-screen">
            <SEO
        title="AI Integration & Workflow Automation Agency"
        description="We automate 30-60% of your repetitive work. AI integration consulting, custom AI workflows, business process automation, and intelligent tool integration for mid-size companies."
        canonical="/services/ai-integration"
        schemaMarkup={serviceSchema("AI Integration & Workflow Automation", "AI integration consulting and workflow automation services. We connect AI to your CRM, ERP, Slack, email, and project management tools.", "/services/ai-integration")}
      />
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ServicesGrid />
      <WorkflowExamples />
      <UseCasesSection />
      <ProcessSection />
      <RealValueSection />
      <TechStackSection />
      <CtaBanner />
      <ContactCTA />
      <Footer />
    </div>
  );
}