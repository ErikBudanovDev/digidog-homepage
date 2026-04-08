"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  DollarSign,
  Timer,
  Bot,
  Users,
  BarChart3,
  Headphones,
  Shield,
  Clock,
} from "lucide-react";
import { colors, fonts } from "@/components/ui/brand";
import { openBookingModal } from "@/components/ui/buttons";

/* ─────────────────────────────────────────────
 * ANALYTICS
 * ───────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const gtag = (...args: unknown[]) => {
  const w = window as any;
  if (w.dataLayer) w.dataLayer.push(...args);
};

function trackCTA(ctaName: string, location: string) {
  gtag({
    event: "cta_click",
    cta_name: ctaName,
    cta_location: location,
    page: "/ai-integration/ads",
  });
}

function useScrollDepth() {
  useEffect(() => {
    const milestones = [25, 50, 75, 90];
    const fired = new Set<number>();
    const handle = () => {
      const pct = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      milestones.forEach((m) => {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          gtag({ event: "scroll_depth", scroll_percentage: m, page: "/ai-integration/ads" });
        }
      });
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);
}

/* ─────────────────────────────────────────────
 * CTA BUTTON
 * ───────────────────────────────────────────── */

function CTAButton({
  children,
  location,
  size = "lg",
}: {
  children: React.ReactNode;
  location: string;
  size?: "lg" | "md";
}) {
  return (
    <motion.button
      onClick={() => {
        trackCTA("book_ai_audit", location);
        openBookingModal();
      }}
      className="cursor-pointer inline-flex items-center justify-center gap-2.5 rounded-xl text-white transition-all"
      style={{
        fontFamily: fonts.display,
        fontWeight: 700,
        background: colors.green,
        padding: size === "lg" ? "18px 36px" : "14px 28px",
        fontSize: size === "lg" ? "18px" : "15px",
        boxShadow: `0 4px 20px ${colors.green}40`,
      }}
      whileHover={{ scale: 1.03, boxShadow: `0 6px 30px ${colors.green}60` }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <ArrowRight size={size === "lg" ? 20 : 16} />
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
 * HERO
 * ───────────────────────────────────────────── */

function Hero() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden pt-8 pb-12"
      style={{ background: colors.gradientCosmic }}
    >
      {/* Subtle glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.4), rgba(168,85,247,0.2), transparent 70%)" }}
      />

      <div className="relative z-10 max-w-[680px] mx-auto px-5 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
          >
            <Bot size={20} className="text-white" />
          </div>
          <span
            className="text-white text-[18px]"
            style={{ fontFamily: fonts.heading, fontWeight: 700 }}
          >
            Digidog
          </span>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[34px] md:text-[52px] leading-[1.08] mb-5"
          style={{ fontFamily: fonts.heading, fontWeight: 700 }}
        >
          <span className="text-white">We Build AI Systems That </span>
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #52bd94 0%, #06b6d4 100%)" }}
          >
            Increase Your Revenue
          </span>
          <span className="text-white"> and </span>
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #a78bfa 0%, #38bdf8 100%)" }}
          >
            Cut Your Costs
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[16px] md:text-[18px] leading-[1.7] mb-8 max-w-[540px] mx-auto"
          style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}
        >
          Automated sales pipelines, operational intelligence, and CRM integration
          — built for service businesses in <span className="text-white font-semibold">30 days or less</span>.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <CTAButton location="hero">Get Your Free AI Audit</CTAButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[13px]"
          style={{ fontFamily: fonts.body, color: "rgba(255,255,255,0.35)" }}
        >
          30-minute call · No obligation · Custom action plan
        </motion.p>

        {/* KPI row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10 pt-8 border-t border-white/[0.08]"
        >
          {[
            { icon: Zap, value: "30–60%", label: "Repetitive work automated" },
            { icon: DollarSign, value: "40%", label: "Average cost reduction" },
            { icon: Timer, value: "30 days", label: "From audit to launch" },
          ].map((kpi, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <kpi.icon size={18} style={{ color: "rgba(255,255,255,0.5)" }} />
              </div>
              <div className="text-left">
                <span
                  className="block text-white text-[20px]"
                  style={{ fontFamily: fonts.heading, fontWeight: 700, lineHeight: 1.2 }}
                >
                  {kpi.value}
                </span>
                <span
                  className="block text-[12px]"
                  style={{ fontFamily: fonts.body, color: "rgba(255,255,255,0.4)", lineHeight: 1.3 }}
                >
                  {kpi.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * SOCIAL PROOF — Case Study
 * ───────────────────────────────────────────── */

function ProofSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-[680px] mx-auto px-5">
        {/* Section label */}
        <div className="text-center mb-10">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-[12px] tracking-wider uppercase mb-4"
            style={{
              fontFamily: fonts.body,
              fontWeight: 600,
              color: colors.blue,
              background: `${colors.blue}08`,
              border: `1px solid ${colors.blue}15`,
            }}
          >
            Real Results
          </span>
          <h2
            className="text-[26px] md:text-[34px] leading-[1.2]"
            style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
          >
            What AI Integration Actually Looks Like
          </h2>
        </div>

        {/* Case study card */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-8"
          style={{ background: "#f8fafc", border: "1px solid #e5e7eb" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: colors.green }}
            />
            <span
              className="text-[12px] tracking-wider uppercase"
              style={{ fontFamily: fonts.body, fontWeight: 700, color: colors.green }}
            >
              Client Case Study
            </span>
          </div>

          <h3
            className="text-[20px] md:text-[22px] mb-3"
            style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
          >
            Multi-City Tour Operator — AI Operations System
          </h3>

          <p
            className="text-[15px] leading-[1.7] mb-6"
            style={{ fontFamily: fonts.body, color: colors.textMuted }}
          >
            A European tour company running operations across 4 cities needed to unify
            booking management, guide scheduling, revenue reporting, customer support, and
            marketing analytics. We connected all systems into one AI interface.
          </p>

          {/* Results grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { value: "70%", label: "Daily operations automated", color: colors.green },
              { value: "3 weeks", label: "Full deployment time", color: colors.blue },
              { value: "6 systems", label: "Connected to one AI", color: "#8B5CF6" },
              { value: "40+ hrs/mo", label: "Manager time saved", color: "#F59E0B" },
            ].map((r, i) => (
              <div
                key={i}
                className="rounded-xl px-4 py-3"
                style={{ background: `${r.color}08`, border: `1px solid ${r.color}18` }}
              >
                <span
                  className="block text-[22px]"
                  style={{ fontFamily: fonts.heading, fontWeight: 700, color: r.color }}
                >
                  {r.value}
                </span>
                <span
                  className="block text-[12px]"
                  style={{ fontFamily: fonts.body, color: colors.textMuted }}
                >
                  {r.label}
                </span>
              </div>
            ))}
          </div>

          {/* What was connected */}
          <div className="flex flex-wrap gap-2">
            {["Google Ads", "GA4 Analytics", "Booking System", "CRM", "Email", "Task Management"].map((sys) => (
              <span
                key={sys}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px]"
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 500,
                  color: colors.textMuted,
                  background: "white",
                  border: "1px solid #e5e7eb",
                }}
              >
                <CheckCircle2 size={12} style={{ color: colors.green }} />
                {sys}
              </span>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="flex items-start gap-4 px-2">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-gray-100">
            <img
              src="/figma-assets/c28a01d5ca35b1e207da7537c250359543a3aa75.png"
              alt="Erik Budanov"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p
              className="text-[14px] leading-[1.6] italic mb-1"
              style={{ fontFamily: fonts.body, color: colors.textMuted }}
            >
              &ldquo;We went from checking 6 dashboards every morning to asking one AI assistant.
              Revenue reporting, booking management, guide scheduling — all in one conversation.&rdquo;
            </p>
            <p>
              <span
                className="text-[13px]"
                style={{ fontFamily: fonts.body, fontWeight: 600, color: colors.textDark }}
              >
                Erik Budanov
              </span>
              <span className="text-[12px]" style={{ fontFamily: fonts.body, color: colors.textMuted }}>
                {" "}— Founder, Be Original Tours
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * WHAT YOU GET IN THE AUDIT
 * ───────────────────────────────────────────── */

function AuditSection() {
  return (
    <section
      className="py-16 md:py-20"
      style={{ background: colors.navyDeep }}
    >
      <div className="max-w-[680px] mx-auto px-5">
        <div className="text-center mb-10">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-[12px] tracking-wider uppercase mb-4"
            style={{
              fontFamily: fonts.body,
              fontWeight: 600,
              color: "#38bdf8",
              background: "rgba(56,189,248,0.08)",
              border: "1px solid rgba(56,189,248,0.15)",
            }}
          >
            What You Get
          </span>
          <h2
            className="text-white text-[26px] md:text-[34px] leading-[1.2] mb-3"
            style={{ fontFamily: fonts.heading, fontWeight: 700 }}
          >
            Your Free AI Automation Audit
          </h2>
          <p
            className="text-[15px] max-w-[480px] mx-auto"
            style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}
          >
            A 30-minute call where we analyze your business and show you exactly what can be automated.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              icon: BarChart3,
              title: "Revenue Leak Analysis",
              desc: "We identify where you're losing leads, missing follow-ups, or wasting time on manual processes.",
              color: colors.green,
            },
            {
              icon: Zap,
              title: "Automation Opportunity Map",
              desc: "A clear breakdown of which tasks, workflows, and data pipelines can be automated with AI.",
              color: colors.blue,
            },
            {
              icon: Users,
              title: "Custom AI System Blueprint",
              desc: "A specific plan for your business — what gets connected, what gets automated, and the expected timeline.",
              color: "#8B5CF6",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4 p-5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                >
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <div>
                  <h3
                    className="text-white text-[16px] mb-1"
                    style={{ fontFamily: fonts.heading, fontWeight: 600 }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.6]"
                    style={{ fontFamily: fonts.body, color: "rgba(255,255,255,0.5)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <CTAButton location="audit_section">Get Your Free AI Audit</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * WHO WE HELP
 * ───────────────────────────────────────────── */

function WhoSection() {
  const industries = [
    "Digital Agencies",
    "Logistics Companies",
    "Recruitment Firms",
    "Real Estate Brokerages",
    "Tour & Travel Operators",
    "Professional Services",
    "Home Care Providers",
    "Managed IT Providers",
  ];

  return (
    <section className="bg-white py-14 md:py-18">
      <div className="max-w-[680px] mx-auto px-5 text-center">
        <h2
          className="text-[22px] md:text-[28px] leading-[1.2] mb-6"
          style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
        >
          Built for Service Businesses With 10–200 Employees
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {industries.map((ind) => (
            <span
              key={ind}
              className="px-4 py-2 rounded-full text-[13px]"
              style={{
                fontFamily: fonts.body,
                fontWeight: 500,
                color: colors.textDark,
                background: "#f1f5f9",
                border: "1px solid #e2e8f0",
              }}
            >
              {ind}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * SIMPLE PROCESS
 * ───────────────────────────────────────────── */

function ProcessSection() {
  return (
    <section className="bg-white py-14 md:py-18 border-t border-gray-100">
      <div className="max-w-[680px] mx-auto px-5">
        <h2
          className="text-center text-[22px] md:text-[28px] leading-[1.2] mb-10"
          style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
        >
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: "1", title: "Audit", desc: "We map your workflows, tools, and data sources.", color: colors.blue },
            { num: "2", title: "Build", desc: "We connect your systems into one AI interface.", color: "#8B5CF6" },
            { num: "3", title: "Automate", desc: "Your team works faster with AI handling the rest.", color: colors.green },
          ].map((step) => (
            <div key={step.num} className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: `${step.color}10`, border: `2px solid ${step.color}25` }}
              >
                <span
                  className="text-[18px]"
                  style={{ fontFamily: fonts.heading, fontWeight: 700, color: step.color }}
                >
                  {step.num}
                </span>
              </div>
              <h3
                className="text-[17px] mb-1"
                style={{ fontFamily: fonts.heading, fontWeight: 600, color: colors.textDark }}
              >
                {step.title}
              </h3>
              <p
                className="text-[14px] leading-[1.6]"
                style={{ fontFamily: fonts.body, color: colors.textMuted }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * FINAL CTA
 * ───────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section
      className="py-16 md:py-24"
      style={{ background: colors.gradientCosmic }}
    >
      <div className="max-w-[600px] mx-auto px-5 text-center">
        <h2
          className="text-white text-[28px] md:text-[40px] leading-[1.15] mb-4"
          style={{ fontFamily: fonts.heading, fontWeight: 700 }}
        >
          Stop Losing Revenue to{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #52bd94, #06b6d4)" }}
          >
            Manual Operations
          </span>
        </h2>
        <p
          className="text-[15px] md:text-[16px] mb-3 max-w-[460px] mx-auto"
          style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}
        >
          Book a free 30-minute AI audit. We&apos;ll show you exactly what can
          be automated — and build it for you.
        </p>
        <p
          className="text-[13px] mb-8"
          style={{ fontFamily: fonts.body, color: "rgba(245,158,11,0.7)" }}
        >
          We take on 3 new clients per month
        </p>

        <CTAButton location="final_cta">Book Your Free AI Audit</CTAButton>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 pt-6 border-t border-white/[0.06]">
          {[
            { icon: Shield, label: "No obligation" },
            { icon: Clock, label: "30 minutes" },
            { icon: Zap, label: "Custom action plan" },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <t.icon size={14} style={{ color: "rgba(255,255,255,0.35)" }} />
              <span
                className="text-[12px]"
                style={{ fontFamily: fonts.body, color: "rgba(255,255,255,0.4)" }}
              >
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * STICKY MOBILE BAR
 * ───────────────────────────────────────────── */

function StickyBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "rgba(10,22,40,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "12px 16px",
      }}
    >
      <button
        onClick={() => { trackCTA("book_ai_audit", "sticky_bar"); openBookingModal(); }}
        className="w-full py-3 rounded-xl text-white text-[15px] cursor-pointer"
        style={{ fontFamily: fonts.display, fontWeight: 700, background: colors.green }}
      >
        Get Your Free AI Audit →
      </button>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
 * PAGE
 * ───────────────────────────────────────────── */

export default function AdsLandingPage() {
  useScrollDepth();

  return (
    <div className="min-h-screen">
      <StickyBar />
      <Hero />
      <ProofSection />
      <AuditSection />
      <WhoSection />
      <ProcessSection />
      <FinalCTA />
    </div>
  );
}
