"use client";
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

const claudeIcon = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&q=80";
const aiHubIcon = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&q=80";
const slackIcon = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&q=80";
const caseStudy1Image = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1080&q=80";

/* ─────────────────────────────────────────────
 * DATA
 * ───────────────────────────────────────────── */

const hubNodes = [
  { label: "CRM", icon: Users, angle: 0, color: "#3B82F6" },
  { label: "Email", icon: Mail, angle: 51, color: "#8B5CF6" },
  { label: "Support", icon: Headphones, angle: 103, color: "#EC4899" },
  { label: "Analytics", icon: BarChart3, angle: 154, color: "#10B981" },
  { label: "Tasks", icon: ListChecks, angle: 206, color: "#F59E0B" },
  { label: "Finance", icon: DollarSign, angle: 257, color: "#06B6D4" },
  { label: "Operations", icon: Workflow, angle: 309, color: "#EF4444" },
];

const exampleQuestions = [
  "How much revenue did we generate this week?",
  "Which clients need follow-up?",
  "What tasks are still pending?",
  "What tasks were done for this project?",
  "Which marketing campaigns generated leads?",
  "Are there unresolved customer tickets?",
];

const corePoints = [
  { text: "No more switching between platforms", icon: Link2 },
  { text: "No manual reporting", icon: FileText },
  { text: "Real-time business visibility", icon: Eye },
  { text: "AI-powered operations", icon: Cpu },
];

const painPoints = [
  "CRM systems",
  "Marketing dashboards",
  "Support tickets",
  "Project management tools",
  "Emails",
  "Financial reports",
];

const integrationSystems = [
  { icon: Users, label: "CRM systems", color: "#3B82F6" },
  { icon: Headphones, label: "Support tickets", color: "#EC4899" },
  { icon: Mail, label: "Email communication", color: "#8B5CF6" },
  { icon: ListChecks, label: "Task management platforms", color: "#F59E0B" },
  { icon: BarChart3, label: "Marketing analytics", color: "#10B981" },
  { icon: DollarSign, label: "Financial reporting", color: "#06B6D4" },
  { icon: Database, label: "Internal databases", color: "#EF4444" },
];

const aiCapabilities = [
  "Generate reports",
  "Track performance",
  "Manage clients",
  "Automate tasks",
  "Monitor operations",
];

const caseStudies = [
  {
    title: "AI Operations System for Be Original Tours",
    subtitle: "Tour Operations",
    description:
      "Tour operations fully integrated with AI. Managers can ask the system about weekly revenue, customer complaints, tour performance, and website traffic.",
    queries: [
      "Create a main task to integrate the design of the project",
      "Check which client invoices are still unpaid",
      "What tasks are still pending for the Berlin tour?",
      "Summarize last week's tour performance",
      "Which campaigns generated the most bookings?",
      "Are there unresolved customer complaints?",
    ],
    outcome: "Centralized operational intelligence",
    color: "#3B82F6",
    image: caseStudy1Image,
  },
  {
    title: "AI CRM Account Manager",
    subtitle: "Sales & CRM",
    description:
      "AI acts as an account manager — creating clients, managing deals, updating pipelines, tracking communication, generating follow-ups, and monitoring emails.",
    queries: [
      "Create a new client profile for Acme Corp",
      "Move the Johnson deal to negotiation stage",
      "Draft a follow-up email for pending proposals",
      "Which deals haven't been updated this week?",
      "Show all communication with client XYZ",
    ],
    outcome: "Sales teams spend less time updating systems and more time closing deals",
    color: "#8B5CF6",
    mcpUrl: "https://mcp-crm.digidog-services.com/mcp",
    image:
      "https://images.unsplash.com/photo-1645102270210-e47d263db8c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2NvdW50YW50JTIwQUklMjBkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBsYXB0b3B8ZW58MXx8fHwxNzcyOTU5MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "AI Service Desk for a Digital Agency",
    subtitle: "Client Coordination",
    description:
      "AI coordinates client requests across Email, Asana, development environments, and CRM — reading emails, creating tasks, routing projects, and tracking completion.",
    queries: [
      "Create an Asana task from the latest client email",
      "Route the new landing page request to development",
      "What projects are waiting for client approval?",
      "Track completion status of all active projects",
    ],
    outcome: "70-80% of operational coordination automated",
    color: "#10B981",
    image:
      "https://images.unsplash.com/photo-1758873271824-a3216c80d1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYWdlbmN5JTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzcyOTUzMzczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const processSteps: {
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  details?: string;
  bullets?: string[];
  icon: typeof Search;
  accent: string;
}[] = [
  {
    number: "01",
    title: "AI Opportunity Deep Dive",
    shortTitle: "Deep Dive",
    description:
      "We start with a deep operational audit of your business. This includes understanding your workflows, data sources, internal systems, and decision processes.",
    details:
      "We talk with stakeholders and identify where AI can create the most value by automating tasks, connecting data, and simplifying operations. The goal is to understand how your business actually runs before introducing AI.",
    icon: Search,
    accent: "#3B82F6",
  },
  {
    number: "02",
    title: "AI Architecture Design",
    shortTitle: "Architecture",
    description:
      "Once we understand your business processes, we design the AI system architecture. This defines how AI will connect to your tools, databases, and operational workflows.",
    details:
      "We plan how your systems will be integrated into a unified AI layer and determine which data sources will become part of the AI environment. This creates the blueprint for your AI-powered operational system.",
    icon: Workflow,
    accent: "#8B5CF6",
  },
  {
    number: "03",
    title: "MCP Integration (AI Foundation)",
    shortTitle: "MCP Layer",
    description:
      "We build the first operational AI layer — your Model Context Protocol (MCP). This connects your core systems, databases, and tools into a single AI environment.",
    details:
      "The MCP acts as the bridge between AI and your business infrastructure. At this stage, the AI can already access and understand key parts of your business data.",
    icon: Plug,
    accent: "#06B6D4",
  },
  {
    number: "04",
    title: "MVP AI Business Interface",
    shortTitle: "MVP Launch",
    description:
      "Once the MCP is in place, we launch a Minimum Viable AI System (MVP). This integrates one part of your business into the AI interface so you can immediately start interacting with it.",
    bullets: [
      "Generate reports through chat",
      "Access operational data instantly",
      "Monitor performance metrics",
      "Ask questions about your business",
    ],
    details:
      "This allows your team to experience AI integration early and shape how the system evolves.",
    icon: Bot,
    accent: "#10B981",
  },
  {
    number: "05",
    title: "Progressive AI Integration",
    shortTitle: "Scale Up",
    description:
      "After the MVP launch, we continue expanding the AI system by integrating more business functions. Each new integration increases the capabilities of your AI system.",
    bullets: [
      "CRM",
      "Support tickets",
      "Marketing analytics",
      "Task management",
      "Financial reporting",
      "Operational data",
    ],
    icon: RefreshCcw,
    accent: "#F59E0B",
  },
];

const outcomes = [
  { icon: Eye, label: "Centralized operational visibility" },
  { icon: Zap, label: "Faster decision making" },
  { icon: HandMetal, label: "Less manual work" },
  { icon: FileText, label: "Automated reporting" },
  { icon: Link2, label: "Connected business systems" },
];

const businessTypes = [
  { icon: Briefcase, label: "Digital Agencies", desc: "Automate client workflows, project routing & reporting" },
  { icon: Headphones, label: "Customer Support Centers", desc: "AI-powered ticket triage, responses & escalation" },
  { icon: Truck, label: "Logistics Companies", desc: "Route optimization, shipment tracking & dispatch AI" },
  { icon: Heart, label: "Home Care / Senior Care", desc: "Scheduling, caregiver matching & compliance tracking" },
  { icon: Users, label: "Recruitment Agencies", desc: "Candidate screening, outreach & pipeline management" },
  { icon: Building2, label: "Real Estate Brokerages", desc: "Lead nurturing, listing management & market analysis" },
  { icon: Scale, label: "Professional Services", desc: "Document automation, billing & client communication" },
  { icon: Globe, label: "Tour Operators & Travel", desc: "Booking management, itinerary planning & guest comms" },
  { icon: Cpu, label: "Managed IT Providers", desc: "Incident response, monitoring alerts & SLA tracking" },
  { icon: Home, label: "Property Management", desc: "Tenant communication, maintenance requests & leasing" },
];

/* ─────────────────────────────────────────────
 * HERO — "Talk to Your Business With AI"
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
                  Talk to Your
                </span>
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #a78bfa 0%, #06b6d4 100%)" }}
                >
                  Business
                </span>{" "}
                <span className="text-white">With AI</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p
                className="text-[17px] md:text-[19px] leading-[1.7] mb-8 max-w-[520px]"
                style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}
              >
                Integrate your operations, data, and workflows into your{" "}
                <span className="text-white">Claude or GPT Chat</span>.{" "}
                Access reports, automate tasks, manage operations, and
                make decisions through natural conversation.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <PrimaryButton onClick={() => openBookingModal()}>
                  Book Free Strategy Call
                </PrimaryButton>
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white text-[17px] hover:border-white/40 hover:bg-white/5 transition-all cursor-pointer"
                  style={{ fontFamily: fonts.display, fontWeight: 600 }}
                >
                  Explore Services
                  <ArrowRight size={18} />
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.45}>
              <div className="flex flex-wrap gap-6 md:gap-10 mt-10 pt-8 border-t border-white/[0.08]">
                {[
                  { icon: Zap, value: "30–60%", label: "Repetitive work automated" },
                  { icon: DollarSign, value: "40%", label: "Average cost reduction" },
                  { icon: Timer, value: "3x", label: "Faster operations" },
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
            <div className="relative hidden lg:block">
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
                    AI connects all your business systems into one intelligent interface
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

function CoreIdeaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-[0.06]"
        style={{ background: `radial-gradient(circle, ${colors.purple}, transparent 70%)` }}
      />

      <SectionContainer className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <ScrollReveal>
              <SectionBadge variant="light" className="mb-6">
                The Core Idea
              </SectionBadge>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2
                className="text-[32px] md:text-[44px] leading-[1.2] mb-5"
                style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
              >
                Your Entire Business.{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(135deg, ${colors.blue}, ${colors.purple})` }}
                >
                  One AI Conversation.
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p
                className="text-[16px] md:text-[17px] leading-[1.7] mb-8"
                style={{ fontFamily: fonts.body, color: colors.textMuted }}
              >
                AI connects your business tools and data sources into one intelligent system.
                Instead of opening dashboards and switching between platforms, you simply ask.
                The AI retrieves the information from your systems instantly.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {corePoints.map((pt) => {
                  const Icon = pt.icon;
                  return (
                    <div
                      key={pt.text}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <Icon size={18} style={{ color: colors.blue }} className="shrink-0" />
                      <span className="text-[14px]" style={{ fontFamily: fonts.body, color: colors.textDark }}>
                        {pt.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Chat-style question examples */}
          <div ref={ref}>
            <div className="space-y-3">
              {exampleQuestions.map((q, i) => (
                <motion.div
                  key={q}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: transitions.smooth }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${colors.blue}15, ${colors.purple}10)`,
                      border: `1px solid ${colors.blue}20`,
                    }}
                  >
                    <MessageSquare size={14} style={{ color: colors.blue }} />
                  </div>
                  <div
                    className="px-5 py-3.5 rounded-2xl rounded-tl-md flex-1"
                    style={{
                      background: `linear-gradient(135deg, ${colors.blue}08, ${colors.purple}05)`,
                      border: `1px solid ${colors.blue}15`,
                    }}
                  >
                    <p className="text-[15px]" style={{ fontFamily: fonts.body, color: colors.textDark }}>
                      "{q}"
                    </p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-4 pl-11"
              >
                <div
                  className="px-5 py-3.5 rounded-2xl rounded-tl-md inline-block"
                  style={{
                    background: `linear-gradient(135deg, ${colors.blue}, ${colors.purple})`,
                  }}
                >
                  <p className="text-[14px] text-white" style={{ fontFamily: fonts.body }}>
                    AI retrieves answers from your connected systems instantly.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * 3. THE PROBLEM
 * ───────────────────────────────────────────── */

function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    null
  );
}

/* ─────────────────────────────────────────────
 * 4. WHAT AI INTEGRATION DOES
 * ───────────────────────────────────────────── */

/* Orbiting app data for WhatWeDoSection */
const orbitApps = [
  {
    label: "Asana",
    color: "#F06A6A",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="16" r="5" fill="#F06A6A" />
        <circle cx="4.5" cy="8" r="4.5" fill="#F06A6A" />
        <circle cx="19.5" cy="8" r="4.5" fill="#F06A6A" />
      </svg>
    ),
  },
  {
    label: "HubSpot",
    color: "#FF7A59",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="16" cy="8" r="3.5" stroke="#FF7A59" strokeWidth="2" fill="none" />
        <circle cx="8" cy="16" r="3.5" stroke="#FF7A59" strokeWidth="2" fill="none" />
        <line x1="11" y1="13.5" x2="13" y2="10.5" stroke="#FF7A59" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Gmail",
    color: "#EA4335",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="#EA4335" strokeWidth="1.8" fill="none" />
        <path d="M2 7l10 6 10-6" stroke="#EA4335" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Sheets",
    color: "#0F9D58",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="2" width="18" height="20" rx="2" stroke="#0F9D58" strokeWidth="1.8" fill="none" />
        <line x1="3" y1="8" x2="21" y2="8" stroke="#0F9D58" strokeWidth="1.2" />
        <line x1="3" y1="13" x2="21" y2="13" stroke="#0F9D58" strokeWidth="1.2" />
        <line x1="10" y1="2" x2="10" y2="22" stroke="#0F9D58" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    label: "Ahrefs",
    color: "#1B6AE0",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#1B6AE0" strokeWidth="1.8" fill="none" />
        <path d="M8 16 L12 6 L16 16" stroke="#1B6AE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="9.5" y1="13" x2="14.5" y2="13" stroke="#1B6AE0" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Slack",
    color: "#E01E5A",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
        <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
        <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.163 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
        <path d="M15.163 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.163 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.315A2.528 2.528 0 0 1 24 15.163a2.528 2.528 0 0 1-2.522 2.523h-6.315z" fill="#ECB22E"/>
      </svg>
    ),
  },
  {
    label: "Jira",
    color: "#0052CC",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2 L22 12 L12 22 L7 17 L12 12 L7 7 Z" fill="#0052CC" />
        <path d="M12 2 L2 12 L7 17 L12 12 L7 7 Z" fill="#2684FF" />
      </svg>
    ),
  },
  {
    label: "Notion",
    color: "#FFFFFF",
    icon: (
      <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
        <path d="M6.017 4.313l55.333-4.087c6.797-.583 8.543-.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277-1.553 6.807-6.99 7.193L24.467 99.967c-4.08.193-6.023-.39-8.16-3.113L3.3 79.94c-2.333-3.113-3.3-5.443-3.3-8.167V11.113c0-3.497 1.553-6.413 6.017-6.8z" fill="#fff"/>
        <path d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257-3.89c5.433-.387 6.99-2.917 6.99-7.193V20.64c0-2.21-.82-2.837-3.443-4.733L75.35 3.57C71.873.88 69.657.303 63.997.503L61.35.227zM27.89 19.837c-5.16.3-6.33.367-9.277-1.87L11.46 12.063c-.78-.78-.39-1.75 1.36-1.943l51.443-3.693c4.08-.387 6.22.97 7.773 2.14l8.737 6.217c.39.193 1.36 1.36.193 1.36l-53.077 3.5v.193zM22.477 87.243V32.05c0-2.333.78-3.5 2.917-3.693l58.397-3.307c2.14-.193 3.11.97 3.11 3.307v54.807c0 2.333-1.36 4.083-3.883 4.28L27.327 90.74c-2.527.193-4.85-.58-4.85-3.497zm54.807-51.5c.39 1.75 0 3.5-1.75 3.693l-2.723.583v40.617c-2.337 1.167-4.467 1.943-6.217 1.943-2.913 0-3.69-.97-5.83-3.5L42.143 50.333v26.043l5.833 1.167s0 3.5-4.857 3.5l-13.39.78c-.39-.78 0-2.723 1.357-3.11l3.497-.97V42.143l-4.857-.39c-.39-1.75.583-4.277 3.3-4.47l14.357-.97 19.42 29.537V40.59l-4.857-.583c-.39-2.14 1.167-3.693 3.107-3.89l13.59-.393z" fill="#000"/>
      </svg>
    ),
  },
];

const aiChatResponse = [
  { label: "Revenue Growth", value: "+23%", color: "#10B981" },
  { label: "New Clients Acquired", value: "17", color: "#3B82F6" },
  { label: "Tasks Completed", value: "342", color: "#8B5CF6" },
  { label: "Customer Satisfaction", value: "94%", color: "#F59E0B" },
];

function WhatWeDoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const [chatPhase, setChatPhase] = useState<"idle" | "typing" | "sent" | "pulling" | "aiTyping" | "aiDone">("idle");
  const userMessage = "What goals did we achieve last quarter?";
  const [typedChars, setTypedChars] = useState(0);
  const [pulledSources, setPulledSources] = useState<number>(0);

  const dataSources = [
    { name: "HubSpot CRM", color: "#FF7A59" },
    { name: "Google Sheets", color: "#0F9D58" },
    { name: "Asana", color: "#F06A6A" },
    { name: "Ahrefs", color: "#1B6AE0" },
  ];

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setChatPhase("typing"), 800);
    return () => clearTimeout(t1);
  }, [inView]);

  useEffect(() => {
    if (chatPhase !== "typing") return;
    if (typedChars >= userMessage.length) {
      const t = setTimeout(() => setChatPhase("sent"), 400);
      return () => clearTimeout(t);
    }
    const speed = 35 + Math.random() * 30;
    const t = setTimeout(() => setTypedChars((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [chatPhase, typedChars]);

  useEffect(() => {
    if (chatPhase !== "sent") return;
    const t = setTimeout(() => setChatPhase("pulling"), 500);
    return () => clearTimeout(t);
  }, [chatPhase]);

  useEffect(() => {
    if (chatPhase !== "pulling") return;
    if (pulledSources >= dataSources.length) {
      const t = setTimeout(() => setChatPhase("aiTyping"), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPulledSources((s) => s + 1), 700);
    return () => clearTimeout(t);
  }, [chatPhase, pulledSources]);

  useEffect(() => {
    if (chatPhase !== "aiTyping") return;
    const t = setTimeout(() => setChatPhase("aiDone"), 1000);
    return () => clearTimeout(t);
  }, [chatPhase]);

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: colors.navyDeep }}
    >
      <StarField count={25} color="rgba(255,255,255,0.3)" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-15"
        style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.4), rgba(168,85,247,0.2), transparent 70%)" }}
      />

      <SectionContainer className="relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionBadge variant="dark" className="mb-6">
              What We Do
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-white text-[32px] md:text-[44px] leading-[1.2] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700 }}
            >
              An AI That{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${colors.blue}, ${colors.cyan})` }}
              >
                Understands
              </span>{" "}
              Your Business
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="text-[16px] md:text-[17px] max-w-[600px] mx-auto leading-[1.7]"
              style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}
            >
              All your tools orbit around one intelligent AI. Ask it anything about your business and get real answers.
            </p>
          </ScrollReveal>
        </div>

        {/* Orbit + Chat Interactive */}
        <div ref={ref} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Orbital animation */}
          <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] shrink-0 mx-auto lg:mx-0">
            {/* Orbit ring */}
            <div
              className="absolute inset-4 md:inset-6 rounded-full"
              style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
            />
            <div
              className="absolute inset-12 md:inset-16 rounded-full"
              style={{ border: "1px dashed rgba(255,255,255,0.06)" }}
            />

            {/* Center: Claude logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0 0 40px rgba(245,158,11,0.3), 0 0 80px rgba(245,158,11,0.1)",
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src={aiHubIcon} alt="AI Hub" className="w-full h-full object-cover" />
              </motion.div>
            </div>

            {/* Orbiting apps */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {orbitApps.map((app, i) => {
                const angle = (i / orbitApps.length) * 360;
                const rad = (angle * Math.PI) / 180;
                const radius = 42;
                const x = 50 + radius * Math.cos(rad);
                const y = 50 + radius * Math.sin(rad);
                return (
                  <motion.div
                    key={app.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    {/* Counter-rotate so icons stay upright */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      className="flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-11 h-11 md:w-13 md:h-13 rounded-xl flex items-center justify-center backdrop-blur-sm"
                        style={{
                          background: `linear-gradient(135deg, ${app.color}30, ${app.color}15)`,
                          border: `1px solid ${app.color}50`,
                          boxShadow: `0 0 16px ${app.color}20`,
                        }}
                      >
                        {app.icon}
                      </div>
                      <span
                        className="text-[10px] md:text-[11px] whitespace-nowrap"
                        style={{ fontFamily: fonts.body, color: "rgba(255,255,255,0.5)" }}
                      >
                        {app.label}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Connection lines — pulsing */}
            {orbitApps.map((app, i) => {
              const angle = (i / orbitApps.length) * 360;
              const rad = (angle * Math.PI) / 180;
              const endX = 50 + 42 * Math.cos(rad);
              const endY = 50 + 42 * Math.sin(rad);
              return (
                <motion.div
                  key={`line-${app.label}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: "1px",
                    height: `${42}%`,
                    transformOrigin: "0 0",
                    transform: `rotate(${angle - 90}deg)`,
                    background: `linear-gradient(to bottom, ${app.color}30, transparent)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: [0.2, 0.5, 0.2] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              );
            })}
          </div>

          {/* Right: Chat interface */}
          <div className="flex-1 max-w-[500px] w-full">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Chat header */}
              <div
                className="px-5 py-3 flex items-center gap-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                  <img src={aiHubIcon} alt="AI Hub" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span
                    className="text-white text-[14px] block"
                    style={{ fontFamily: fonts.body, fontWeight: 600 }}
                  >
                    AI Business Assistant
                  </span>
                  <span className="text-[11px] flex items-center gap-1.5" style={{ color: "#10B981" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Online
                  </span>
                </div>
              </div>

              {/* Chat messages */}
              <div className="px-5 py-6 min-h-[280px] flex flex-col justify-end gap-4">
                <AnimatePresence>
                  {/* User message */}
                  {(chatPhase === "typing" || chatPhase === "sent" || chatPhase === "pulling" || chatPhase === "aiTyping" || chatPhase === "aiDone") && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end"
                    >
                      <div
                        className="rounded-2xl rounded-br-sm px-4 py-3 max-w-[85%]"
                        style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)" }}
                      >
                        <p className="text-white text-[14px]" style={{ fontFamily: fonts.body }}>
                          {chatPhase === "typing"
                            ? userMessage.slice(0, typedChars)
                            : userMessage}
                          {chatPhase === "typing" && (
                            <motion.span
                              className="inline-block w-[2px] h-[14px] bg-white/80 ml-0.5 align-middle"
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                            />
                          )}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Pulling data from sources */}
                  {(chatPhase === "pulling" || chatPhase === "aiTyping" || chatPhase === "aiDone") && (
                    <motion.div
                      key="pulling"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div
                        className="rounded-2xl rounded-bl-sm px-4 py-3 max-w-[90%]"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <p
                          className="text-[12px] mb-2.5 flex items-center gap-1.5"
                          style={{ fontFamily: fonts.body, color: "rgba(255,255,255,0.4)" }}
                        >
                          <Search size={12} />
                          Pulling data from your connected tools...
                        </p>
                        <div className="space-y-1.5">
                          {dataSources.map((src, i) => (
                            <motion.div
                              key={src.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={i < pulledSources ? { opacity: 1, x: 0 } : { opacity: 0.15, x: 0 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md"
                              style={{
                                background: i < pulledSources ? `${src.color}15` : "rgba(255,255,255,0.02)",
                                border: `1px solid ${i < pulledSources ? `${src.color}35` : "rgba(255,255,255,0.05)"}`,
                              }}
                            >
                              <motion.div
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ background: i < pulledSources ? src.color : "rgba(255,255,255,0.2)" }}
                                animate={i < pulledSources ? { scale: [1, 1.4, 1] } : {}}
                                transition={{ duration: 0.3 }}
                              />
                              <span
                                className="text-[12px]"
                                style={{
                                  fontFamily: fonts.body,
                                  color: i < pulledSources ? src.color : "rgba(255,255,255,0.25)",
                                  fontWeight: i < pulledSources ? 500 : 400,
                                }}
                              >
                                {src.name}
                              </span>
                              {i < pulledSources && (
                                <motion.span
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="ml-auto"
                                >
                                  <CheckCircle2 size={12} style={{ color: src.color }} />
                                </motion.span>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* AI typing indicator */}
                  {chatPhase === "aiTyping" && (
                    <motion.div
                      key="ai-typing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div
                        className="rounded-2xl rounded-bl-sm px-4 py-3"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <div className="flex gap-1.5 py-1">
                          {[0, 1, 2].map((d) => (
                            <motion.div
                              key={d}
                              className="w-2 h-2 rounded-full bg-white/40"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* AI response */}
                  {chatPhase === "aiDone" && (
                    <motion.div
                      key="ai-response"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex justify-start"
                    >
                      <div
                        className="rounded-2xl rounded-bl-sm px-4 py-4 max-w-[90%]"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <p
                          className="text-[13px] mb-3"
                          style={{ fontFamily: fonts.body, color: "rgba(255,255,255,0.7)" }}
                        >
                          Here are your Q4 results across all connected platforms:
                        </p>
                        <div className="grid grid-cols-2 gap-2.5">
                          {aiChatResponse.map((item, i) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              className="rounded-lg px-3 py-2.5"
                              style={{
                                background: `${item.color}12`,
                                border: `1px solid ${item.color}30`,
                              }}
                            >
                              <span
                                className="text-[20px] block"
                                style={{ fontFamily: fonts.heading, fontWeight: 700, color: item.color }}
                              >
                                {item.value}
                              </span>
                              <span
                                className="text-[11px] block"
                                style={{ fontFamily: fonts.body, color: "rgba(255,255,255,0.5)" }}
                              >
                                {item.label}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                        <p
                          className="text-[12px] mt-3 flex items-center gap-1.5"
                          style={{ fontFamily: fonts.body, color: "#10B981" }}
                        >
                          <CheckCircle2 size={13} />
                          Data pulled from HubSpot, Asana, Google Sheets & Ahrefs
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Chat input bar */}
              <div
                className="px-5 py-3 flex items-center gap-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="flex-1 rounded-xl px-4 py-2.5 text-[13px]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: fonts.body,
                  }}
                >
                  Ask about your business...
                </div>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)" }}
                >
                  <ArrowRight size={16} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * 5. CASE STUDIES
 * ───────────────────────────────────────────── */

function CaseStudiesSection() {
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
              Real Business Examples
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-white text-[32px] md:text-[48px] leading-[1.15] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700 }}
            >
              Real Businesses{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #10B981, #06b6d4)" }}
              >
                Running on AI Systems
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="text-[16px] md:text-[17px] max-w-[540px] mx-auto leading-[1.7]"
              style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}
            >
              See how businesses across industries use AI to transform their daily operations.
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
                          AI retrieves answers from your connected systems instantly.
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
                              Try it out
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
                                MCP Server URL
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
                                        Copied!
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={15} />
                                      <span className="text-[12px]" style={{ fontFamily: fonts.body, fontWeight: 600 }}>
                                        Copy
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
              Want to see how AI can transform your business?
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
              Discuss Your Use Case
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

function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const [activeStep, setActiveStep] = useState(0);

  /* auto-advance every 6s */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const step = processSteps[activeStep];
  const StepIcon = step.icon;

  return (
    <section className="relative bg-white py-20 md:py-32 overflow-hidden">
      {/* subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(${colors.blue} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <SectionContainer className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
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
              How Your Business Becomes{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${colors.blue}, ${colors.cyan})` }}
              >
                AI-Powered
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="text-[16px] leading-[1.7] max-w-[560px] mx-auto"
              style={{ fontFamily: fonts.body, color: colors.textMuted }}
            >
              A proven five-phase process that transforms your operations step by step — from audit to fully connected AI.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Horizontal stepper (desktop) / accordion (mobile) ── */}
        <div ref={ref}>
          {/* --- Desktop timeline bar --- */}
          <div className="hidden md:block relative mb-16">
            {/* base connector line */}
            <div className="absolute top-6 left-0 right-0 h-[2px]" style={{ background: `${colors.blue}12` }} />
            {/* animated progress fill */}
            <motion.div
              className="absolute top-6 left-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, ${processSteps[0].accent}, ${step.accent})` }}
              animate={{ width: `${(activeStep / (processSteps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            <div className="relative flex justify-between">
              {processSteps.map((s, i) => {
                const NodeIcon = s.icon;
                const isActive = i === activeStep;
                const isPast = i < activeStep;
                return (
                  <button
                    key={s.number}
                    onClick={() => setActiveStep(i)}
                    className="flex flex-col items-center gap-3 cursor-pointer group relative"
                    style={{ width: "20%" }}
                  >
                    {/* node circle */}
                    <motion.div
                      className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isActive || isPast
                          ? `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)`
                          : "#f1f5f9",
                        border: isActive || isPast ? "none" : "2px solid #e2e8f0",
                        boxShadow: isActive
                          ? `0 0 20px ${s.accent}30, 0 4px 12px ${s.accent}20`
                          : isPast
                            ? `0 2px 8px ${s.accent}18`
                            : "none",
                      }}
                      animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <NodeIcon size={20} style={{ color: isActive || isPast ? "#fff" : "#94a3b8" }} />
                    </motion.div>

                    {/* label */}
                    <div className="text-center">
                      <span
                        className="block text-[11px] tracking-wider uppercase mb-0.5 transition-colors duration-300"
                        style={{ fontFamily: fonts.body, fontWeight: 600, color: isActive || isPast ? s.accent : "#94a3b8" }}
                      >
                        Step {s.number}
                      </span>
                      <span
                        className="block text-[13px] transition-colors duration-300"
                        style={{ fontFamily: fonts.heading, fontWeight: 600, color: isActive || isPast ? colors.textDark : "#64748b" }}
                      >
                        {s.shortTitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* --- Desktop content panel --- */}
          <div className="hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: transitions.smooth }}
                className="relative rounded-3xl p-10 md:p-12"
                style={{
                  background: `linear-gradient(135deg, ${step.accent}06, ${step.accent}03)`,
                  border: `1px solid ${step.accent}15`,
                }}
              >
                {/* top accent glow */}
                <div
                  className="absolute -top-px left-1/2 -translate-x-1/2 h-[2px] w-32 rounded-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)` }}
                />

                <div className="flex gap-10 items-start">
                  {/* icon block */}
                  <div className="shrink-0">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${step.accent}15, ${step.accent}08)`,
                        border: `1px solid ${step.accent}25`,
                      }}
                    >
                      <StepIcon size={32} style={{ color: step.accent }} />
                    </div>
                    <div
                      className="text-center mt-3 text-[12px] tracking-wider uppercase"
                      style={{ fontFamily: fonts.body, fontWeight: 700, color: step.accent }}
                    >
                      Phase {step.number}
                    </div>
                  </div>

                  {/* text content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-[24px] md:text-[28px] mb-4"
                      style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-[15px] leading-[1.8] max-w-[600px] mb-4"
                      style={{ fontFamily: fonts.body, color: colors.textMuted }}
                    >
                      {step.description}
                    </p>

                    {step.bullets && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {step.bullets.map((b, bi) => (
                          <motion.span
                            key={b}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: bi * 0.06 }}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px]"
                            style={{
                              fontFamily: fonts.body,
                              fontWeight: 500,
                              color: step.accent,
                              background: `${step.accent}08`,
                              border: `1px solid ${step.accent}18`,
                            }}
                          >
                            <CheckCircle2 size={14} style={{ color: step.accent }} />
                            {b}
                          </motion.span>
                        ))}
                      </div>
                    )}

                    {step.details && (
                      <p
                        className="text-[14px] leading-[1.8] max-w-[600px]"
                        style={{ fontFamily: fonts.body, color: `${colors.textMuted}99` }}
                      >
                        {step.details}
                      </p>
                    )}
                  </div>
                </div>

                {/* pagination dots */}
                <div className="flex justify-center gap-2 mt-10">
                  {processSteps.map((_, i) => (
                    <button key={i} onClick={() => setActiveStep(i)} className="cursor-pointer">
                      <motion.div
                        className="rounded-full"
                        animate={{
                          width: i === activeStep ? 24 : 8,
                          height: 8,
                          background: i === activeStep ? step.accent : `${colors.textMuted}30`,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- Mobile: accordion cards --- */}
          <div className="md:hidden space-y-4">
            {processSteps.map((s, i) => {
              const MobileIcon = s.icon;
              const isOpen = i === activeStep;
              return (
                <motion.div
                  key={s.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <button
                    onClick={() => setActiveStep(i)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer"
                    style={{
                      background: isOpen ? `${s.accent}08` : "transparent",
                      border: `1px solid ${isOpen ? s.accent + "25" : "#e2e8f020"}`,
                    }}
                  >
                    <div
                      className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: isOpen
                          ? `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)`
                          : `${s.accent}10`,
                      }}
                    >
                      <MobileIcon size={18} style={{ color: isOpen ? "#fff" : s.accent }} />
                    </div>
                    <div className="flex-1 text-left">
                      <span
                        className="text-[11px] tracking-wider uppercase"
                        style={{ fontFamily: fonts.body, fontWeight: 600, color: s.accent }}
                      >
                        Step {s.number}
                      </span>
                      <h3
                        className="text-[16px]"
                        style={{
                          fontFamily: fonts.heading,
                          fontWeight: 600,
                          color: isOpen ? colors.textDark : "#64748b",
                        }}
                      >
                        {s.shortTitle}
                      </h3>
                    </div>
                    <ChevronRight
                      size={18}
                      className="transition-transform duration-300"
                      style={{
                        color: isOpen ? s.accent : "#94a3b8",
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-2">
                          <h4
                            className="text-[17px] mb-2"
                            style={{ fontFamily: fonts.heading, fontWeight: 600, color: colors.textDark }}
                          >
                            {s.title}
                          </h4>
                          <p
                            className="text-[14px] leading-[1.7] mb-3"
                            style={{ fontFamily: fonts.body, color: colors.textMuted }}
                          >
                            {s.description}
                          </p>
                          {s.bullets && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {s.bullets.map((b) => (
                                <span
                                  key={b}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px]"
                                  style={{
                                    fontFamily: fonts.body,
                                    fontWeight: 500,
                                    color: s.accent,
                                    background: `${s.accent}08`,
                                    border: `1px solid ${s.accent}15`,
                                  }}
                                >
                                  <CheckCircle2 size={12} style={{ color: s.accent }} />
                                  {b}
                                </span>
                              ))}
                            </div>
                          )}
                          {s.details && (
                            <p
                              className="text-[13px] leading-[1.7]"
                              style={{ fontFamily: fonts.body, color: `${colors.textMuted}99` }}
                            >
                              {s.details}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * 7. WHAT BUSINESSES GAIN
 * ───────────────────────────────────────────── */

function OutcomesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    null
  );
}

/* ─────────────────────────────────────────────
 * 8. TYPES OF BUSINESSES
 * ───────────────────────────────────────────── */

function BusinessTypesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  /* alternate accent colours per card */
  const accents = [
    "#3B82F6", "#8B5CF6", "#06B6D4", "#EC4899", "#F59E0B",
    "#10B981", "#6366F1", "#0EA5E9", "#EF4444", "#14B8A6",
  ];

  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      {/* subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(${colors.blue}30 1px, transparent 1px), linear-gradient(90deg, ${colors.blue}30 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <SectionContainer className="relative z-10">
        <div className="text-center mb-14 md:mb-18">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">
              Who We Help
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-[32px] md:text-[44px] leading-[1.2] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
            >
              Types of Businesses{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${colors.blue}, ${colors.purple})` }}
              >
                We Help
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="text-[16px] md:text-[17px] max-w-[580px] mx-auto leading-[1.7]"
              style={{ fontFamily: fonts.body, color: colors.textMuted }}
            >
              Any company with clients, data, operations, and workflows can benefit from AI integration.
            </p>
          </ScrollReveal>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {businessTypes.map((bt, i) => {
            const Icon = bt.icon;
            const accent = accents[i % accents.length];
            return (
              <motion.div
                key={bt.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.06, ease: transitions.smooth }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl p-5 cursor-default transition-all duration-300"
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                }}
              >
                {/* hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${accent}06, ${accent}03)`,
                    border: `1px solid ${accent}25`,
                    borderRadius: "1rem",
                  }}
                />

                <div className="relative z-10">
                  {/* icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                    style={{
                      background: `${accent}10`,
                      border: `1px solid ${accent}18`,
                    }}
                  >
                    <Icon
                      size={20}
                      className="transition-colors duration-300"
                      style={{ color: accent }}
                    />
                  </div>

                  {/* title */}
                  <h3
                    className="text-[15px] mb-1.5"
                    style={{ fontFamily: fonts.heading, fontWeight: 600, color: colors.textDark }}
                  >
                    {bt.label}
                  </h3>

                  {/* description */}
                  <p
                    className="text-[13px] leading-[1.6]"
                    style={{ fontFamily: fonts.body, color: colors.textMuted }}
                  >
                    {bt.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * 9. FINAL CTA
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
                Don't Struggle With What & How to Automate —{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #38bdf8, #a78bfa)" }}
                >
                  Leave It to the Experts
                </span>
              </h2>
              <p
                className="text-white/60 text-[16px] md:text-[17px] mb-8 max-w-[550px] mx-auto"
                style={{ fontFamily: fonts.body }}
              >
                We handle the complexity so you can focus on running your business. Book a consultation and let us build your AI-powered operations.
              </p>
              <PrimaryButton onClick={() => openBookingModal()}>
                Book AI Integration Call
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
      <Navbar />
      <HeroSection />
      <CoreIdeaSection />
      <WhatWeDoSection />
      <CaseStudiesSection />
      <ProcessSection />
      <OutcomesSection />
      <CtaBanner />
      <BusinessTypesSection />
      <ProblemSection />
      <ContactCTA />
      <Footer />
    </div>
  );
}
