"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { colors, fonts } from "@/components/ui/brand";
import { PrimaryButton, openBookingModal } from "@/components/ui/buttons";
import { SectionContainer } from "@/components/ui/section";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Clock,
  Database,
  Zap,
  Server,
  BarChart3,
  Users,
  X,
} from "lucide-react";

/* ─── Tracking ─── */
function trackCTA(ctaName: string, location: string) {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: "cta_click",
      cta_name: ctaName,
      cta_location: location,
      page: "/ai-integration",
    });
  }
}

function ScrollDepthTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const thresholds = [25, 50, 75, 100];
    const fired = new Set<number>();
    const onScroll = () => {
      const pct = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      for (const t of thresholds) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          (window as any).dataLayer?.push({
            event: "scroll_depth",
            scroll_percentage: t,
            page: "/ai-integration",
          });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}

function StickyMobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-[#0B1B34]/95 backdrop-blur-md border-t border-white/10 lg:hidden">
      <button
        onClick={() => {
          trackCTA("sticky_mobile_cta", "bottom_bar");
          openBookingModal();
        }}
        className="w-full py-3 rounded-full text-white font-bold text-[15px]"
        style={{ background: "linear-gradient(135deg, #00C59B, #00B4D8)", fontFamily: fonts.display }}
      >
        Get Your AI Operations Audit
      </button>
    </div>
  );
}

/* ─── Section wrapper with reveal ─── */
function RevealSection({
  children,
  className = "",
  dark = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-20 md:py-28 overflow-hidden ${className}`}
      style={{ background: dark ? colors.navy : "#ffffff" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════
 * 1. HERO — Problem + Transformation
 * ════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section
      className="relative min-h-[700px] lg:min-h-[800px] pt-[140px] lg:pt-[170px] pb-20 px-6 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #142B50 50%, #1B3A5C 100%)` }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <SectionContainer className="relative z-10">
        <div className="max-w-[780px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(0,197,155,0.12)", border: "1px solid rgba(0,197,155,0.25)" }}
          >
            <Zap size={14} className="text-[#00C59B]" />
            <span className="text-[13px] font-semibold text-[#00C59B]" style={{ fontFamily: fonts.display }}>
              AI Operations System
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[36px] md:text-[48px] lg:text-[56px] text-white leading-[1.1] mb-6"
            style={{ fontFamily: fonts.display, fontWeight: 900 }}
          >
            You&apos;re paying $1K–$10K/month{" "}
            <span className="text-white/40">for software your team barely uses</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[18px] lg:text-[20px] text-white/70 leading-[1.7] mb-10 max-w-[640px]"
            style={{ fontFamily: fonts.display }}
          >
            We replace your SaaS stack and manual workflows with an AI Operations System you own.
            One interface. Your infrastructure. Your data. Built in 4–8 weeks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <PrimaryButton
              onClick={() => {
                trackCTA("hero_audit_cta", "hero");
                openBookingModal();
              }}
            >
              Get Your AI Operations Audit
            </PrimaryButton>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[15px] transition-colors py-3"
              style={{ fontFamily: fonts.display, fontWeight: 600 }}
            >
              See how it works <ArrowRight size={16} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-white/10"
          >
            {[
              { icon: DollarSign, value: "$1,200 → $210", label: "Monthly SaaS cost replaced" },
              { icon: Clock, value: "25 hrs/week", label: "Manual work eliminated" },
              { icon: Zap, value: "4–8 weeks", label: "From audit to production" },
            ].map((m) => (
              <div key={m.value} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10">
                  <m.icon size={18} className="text-[#00C59B]" />
                </div>
                <div>
                  <span className="block text-white text-[17px] font-bold" style={{ fontFamily: fonts.display }}>
                    {m.value}
                  </span>
                  <span className="block text-white/40 text-[12px]" style={{ fontFamily: fonts.display }}>
                    {m.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ════════════════════════════════════════════
 * 2. WHAT BREAKS — Fear/urgency section
 * ════════════════════════════════════════════ */
function WhatBreaksSection() {
  const problems = [
    { icon: DollarSign, title: "Costs keep compounding", text: "Every seat, every tier upgrade, every new tool adds to a bill that only goes up. Most companies don\u2019t realize they\u2019re paying $2K\u2013$5K/month for features they never touch." },
    { icon: Clock, title: "Operations get slower", text: "Your team spends 2\u20133 hours daily switching between dashboards, copying data between tools, and doing work that an AI could handle in seconds." },
    { icon: Database, title: "Data stays locked in silos", text: "Customer data in Pipedrive, tasks in Asana, conversations in Slack, analytics in GA4. Nothing talks to anything. You can\u2019t answer basic questions about your business without opening 5 tabs." },
    { icon: AlertTriangle, title: "Competitors gain a structural advantage", text: "Every month you wait, companies that adopt AI-first operations get faster, leaner, and harder to compete with. This advantage compounds." },
  ];

  return (
    <RevealSection>
      <SectionContainer>
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-[13px] font-semibold mb-6" style={{ color: "#DC2626", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.15)", fontFamily: fonts.display }}>
            What happens if you do nothing
          </span>
          <h2 className="text-[32px] md:text-[40px] leading-[1.15] max-w-[600px] mx-auto" style={{ fontFamily: fonts.display, fontWeight: 800, color: colors.textDark }}>
            The longer you wait, the more it costs
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          {problems.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 rounded-2xl border border-red-100 bg-red-50/30">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-100 mb-4"><p.icon size={20} className="text-red-500" /></div>
              <h3 className="text-[18px] mb-2" style={{ fontFamily: fonts.display, fontWeight: 700, color: colors.textDark }}>{p.title}</h3>
              <p className="text-[15px] leading-[1.7] text-gray-600" style={{ fontFamily: fonts.display }}>{p.text}</p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </RevealSection>
  );
}

/* ════════════════════════════════════════════
 * 3. THE SHIFT — Before/After
 * ════════════════════════════════════════════ */
function TheShiftSection() {
  return (
    <RevealSection dark>
      <SectionContainer>
        <div className="max-w-[800px] mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-[13px] font-semibold mb-6" style={{ color: "#00C59B", background: "rgba(0,197,155,0.1)", border: "1px solid rgba(0,197,155,0.2)", fontFamily: fonts.display }}>
            The shift
          </span>
          <h2 className="text-[32px] md:text-[42px] text-white leading-[1.15] mb-6" style={{ fontFamily: fonts.display, fontWeight: 800 }}>
            An AI Operations System replaces your SaaS stack with tools you own
          </h2>
          <p className="text-[17px] text-white/60 leading-[1.7] mb-14 max-w-[640px] mx-auto" style={{ fontFamily: fonts.display }}>
            It connects your CRM, tasks, communication, email, and reporting into one AI-controlled workflow — running on your infrastructure, operated by AI, managed by you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-2 mb-6"><X size={20} className="text-red-400" /><span className="text-[15px] font-bold text-red-400" style={{ fontFamily: fonts.display }}>Before: The SaaS stack</span></div>
            <div className="space-y-4">
              {["8+ tools, $1,200+/month", "Data locked in separate silos", "2\u20133 hours daily switching dashboards", "Manual follow-ups and reporting", "Features you pay for but never use", "Vendor controls your roadmap"].map((item) => (
                <div key={item} className="flex items-start gap-3"><X size={16} className="text-red-400/60 mt-0.5 shrink-0" /><span className="text-[14px] text-white/50 leading-[1.6]" style={{ fontFamily: fonts.display }}>{item}</span></div>
              ))}
            </div>
          </div>
          <div className="p-8 rounded-2xl border border-[#00C59B]/20 bg-[#00C59B]/5">
            <div className="flex items-center gap-2 mb-6"><CheckCircle2 size={20} className="text-[#00C59B]" /><span className="text-[15px] font-bold text-[#00C59B]" style={{ fontFamily: fonts.display }}>After: AI Operations System</span></div>
            <div className="space-y-4">
              {["1 AI interface + your own server, ~$210/month", "One database \u2014 all your business data connected", "Ask a question, get the answer in seconds", "Automated lead follow-ups, reporting, task routing", "Every tool does exactly what you need \u2014 nothing more", "You own the code, the data, the infrastructure"].map((item) => (
                <div key={item} className="flex items-start gap-3"><CheckCircle2 size={16} className="text-[#00C59B]/70 mt-0.5 shrink-0" /><span className="text-[14px] text-white/70 leading-[1.6]" style={{ fontFamily: fonts.display }}>{item}</span></div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </RevealSection>
  );
}

/* ════════════════════════════════════════════
 * 4. WHAT CHANGES — concrete transformations
 * ════════════════════════════════════════════ */
function WhatChangesSection() {
  const changes = [
    { icon: Users, from: "CRM: $59/seat/month, manual data entry", to: "AI-controlled CRM with 35 endpoints. Say \u2018create a client\u2019 and it\u2019s done." },
    { icon: BarChart3, from: "Reporting: Monday morning dashboard marathon", to: "\u2018Summarize last week\u2019s revenue across all cities\u2019 \u2192 answer in seconds." },
    { icon: Zap, from: "Lead follow-ups: 4-hour average response time", to: "AI monitors inbound, triggers follow-ups in minutes. Fewer lost deals." },
    { icon: Server, from: "Data: locked in 8 separate SaaS silos", to: "One PostgreSQL database. Everything connected. Full data ownership." },
  ];

  return (
    <RevealSection>
      <SectionContainer>
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-[13px] font-semibold mb-6" style={{ color: colors.blue, background: `${colors.blue}0D`, border: `1px solid ${colors.blue}20`, fontFamily: fonts.display }}>What changes</span>
          <h2 className="text-[32px] md:text-[40px] leading-[1.15] max-w-[600px] mx-auto" style={{ fontFamily: fonts.display, fontWeight: 800, color: colors.textDark }}>SaaS tools replaced, operations accelerated</h2>
        </div>
        <div className="space-y-4 max-w-[800px] mx-auto">
          {changes.map((c, i) => (
            <motion.div key={c.from} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex flex-col md:flex-row items-stretch rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex-1 p-6 bg-gray-50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-100 shrink-0"><X size={16} className="text-red-400" /></div>
                <p className="text-[14px] text-gray-500 leading-[1.6]" style={{ fontFamily: fonts.display }}>{c.from}</p>
              </div>
              <div className="flex items-center justify-center px-4 py-2 md:py-0"><ArrowRight size={18} className="text-[#00C59B] rotate-90 md:rotate-0" /></div>
              <div className="flex-1 p-6 bg-white flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-50 shrink-0"><CheckCircle2 size={16} className="text-[#00C59B]" /></div>
                <p className="text-[14px] text-gray-800 leading-[1.6] font-medium" style={{ fontFamily: fonts.display }}>{c.to}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </RevealSection>
  );
}

/* ════════════════════════════════════════════
 * 5. PROOF — Our own story
 * ════════════════════════════════════════════ */
function ProofSection() {
  const stats = [
    { label: "Monthly SaaS cost", before: "~$1,200", after: "$210" },
    { label: "Tools used daily", before: "8+ platforms", after: "1 AI interface" },
    { label: "Dashboard switching", before: "2\u20133 hrs/day", after: "0" },
    { label: "Lead response time", before: "Hours", after: "Minutes" },
    { label: "Data portability", before: "8 silos", after: "1 database" },
  ];

  return (
    <RevealSection dark>
      <SectionContainer>
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-[13px] font-semibold mb-6" style={{ color: "#F59E0B", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", fontFamily: fonts.display }}>We run our own businesses on this</span>
            <h2 className="text-[32px] md:text-[42px] text-white leading-[1.15] mb-4" style={{ fontFamily: fonts.display, fontWeight: 800 }}>This isn&apos;t theory — it&apos;s our daily stack</h2>
            <p className="text-[17px] text-white/50 leading-[1.7] max-w-[600px] mx-auto" style={{ fontFamily: fonts.display }}>We operate two companies — an AI consulting agency and a multi-city European tour operation — entirely on the same system we build for clients.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {["Custom CRM (35 endpoints)", "Multi-site WordPress gateway", "Email infrastructure (3 domains)", "Lead pipeline + enrichment", "Google Ads + GA4 analytics", "PostgreSQL serving all apps"].map((item) => (
              <div key={item} className="p-4 rounded-xl bg-white/5 border border-white/10"><span className="text-[13px] text-white/70" style={{ fontFamily: fonts.display }}>{item}</span></div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-3 text-[13px] font-bold border-b border-white/10 bg-white/5">
              <div className="p-4 text-white/40" style={{ fontFamily: fonts.display }}>Metric</div>
              <div className="p-4 text-red-400" style={{ fontFamily: fonts.display }}>Before</div>
              <div className="p-4 text-[#00C59B]" style={{ fontFamily: fonts.display }}>After</div>
            </div>
            {stats.map((s) => (
              <div key={s.label} className="grid grid-cols-3 text-[14px] border-b border-white/5 last:border-0">
                <div className="p-4 text-white/70" style={{ fontFamily: fonts.display }}>{s.label}</div>
                <div className="p-4 text-white/40" style={{ fontFamily: fonts.display }}>{s.before}</div>
                <div className="p-4 text-white font-semibold" style={{ fontFamily: fonts.display }}>{s.after}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-[13px] mt-6" style={{ fontFamily: fonts.display }}>All running on a single $10/month VPS with Docker + Nginx + SSL</p>
        </div>
      </SectionContainer>
    </RevealSection>
  );
}

/* ════════════════════════════════════════════
 * 6. HOW IT WORKS — 3 steps
 * ════════════════════════════════════════════ */
function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Audit", text: "We analyze your SaaS stack, map your workflows, and identify what\u2019s replaceable. You get a clear breakdown of potential savings and the fastest path to an AI Operations System.", duration: "Week 1" },
    { num: "02", title: "Design & Build", text: "We architect your system \u2014 CRM, automations, integrations, database \u2014 and build it on infrastructure you own. Every tool is designed for AI interaction, not human dashboards.", duration: "Weeks 2\u20136" },
    { num: "03", title: "Deploy & Operate", text: "Your system goes live. We handle migration, training, and monitoring. You start operating through one AI interface instead of 8 separate tools.", duration: "Weeks 6\u20138" },
  ];

  return (
    <RevealSection id="how-it-works">
      <SectionContainer>
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-[13px] font-semibold mb-6" style={{ color: colors.blue, background: `${colors.blue}0D`, border: `1px solid ${colors.blue}20`, fontFamily: fonts.display }}>How it works</span>
          <h2 className="text-[32px] md:text-[40px] leading-[1.15]" style={{ fontFamily: fonts.display, fontWeight: 800, color: colors.textDark }}>From audit to production in 4–8 weeks</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
          {steps.map((s, i) => (
            <motion.div key={s.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="relative">
              <span className="text-[72px] font-black leading-none opacity-[0.06]" style={{ fontFamily: fonts.display, color: colors.textDark }}>{s.num}</span>
              <div className="mt-[-20px] relative z-10">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold mb-4 text-[#00C59B]" style={{ background: "rgba(0,197,155,0.08)", fontFamily: fonts.display }}>{s.duration}</span>
                <h3 className="text-[22px] mb-3" style={{ fontFamily: fonts.display, fontWeight: 800, color: colors.textDark }}>{s.title}</h3>
                <p className="text-[15px] text-gray-600 leading-[1.7]" style={{ fontFamily: fonts.display }}>{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </RevealSection>
  );
}

/* ════════════════════════════════════════════
 * 7. WHO IT'S FOR
 * ════════════════════════════════════════════ */
function WhoItsForSection() {
  return (
    <RevealSection dark>
      <SectionContainer>
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[32px] md:text-[40px] text-white leading-[1.15] mb-6" style={{ fontFamily: fonts.display, fontWeight: 800 }}>Built for operations-heavy businesses</h2>
          <p className="text-[17px] text-white/50 leading-[1.7] mb-12" style={{ fontFamily: fonts.display }}>This works best for service businesses, agencies, and founder-led companies with 5–50 people and stable workflows that span multiple tools.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-[640px] mx-auto mb-12">
            {["Service businesses and agencies", "Teams of 5\u201350 people", "Spending $1K\u2013$10K/month on SaaS", "Repetitive workflows across multiple tools", "Founder-led or hands-on ops lead", "Ready to invest in infrastructure they own"].map((item) => (
              <div key={item} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#00C59B] shrink-0" /><span className="text-[14px] text-white/70" style={{ fontFamily: fonts.display }}>{item}</span></div>
            ))}
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-[600px] mx-auto">
            <p className="text-[15px] text-white/40 leading-[1.7] italic" style={{ fontFamily: fonts.display }}>&quot;If your operations are still chaotic or undocumented, AI will only amplify the chaos. Fix the process first, then automate it. We&apos;ll tell you honestly if you&apos;re ready.&quot;</p>
          </div>
        </div>
      </SectionContainer>
    </RevealSection>
  );
}

/* ════════════════════════════════════════════
 * 8. FINAL CTA
 * ════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #142B50 60%, #0D3B3B 100%)` }}>
      <SectionContainer className="relative z-10">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="text-[32px] md:text-[44px] text-white leading-[1.15] mb-6" style={{ fontFamily: fonts.display, fontWeight: 800 }}>Find out what&apos;s replaceable in your stack</h2>
          <p className="text-[17px] text-white/50 leading-[1.7] mb-10 max-w-[560px] mx-auto" style={{ fontFamily: fonts.display }}>We identify replaceable SaaS spend, manual workflows worth automating, and the fastest path to an AI Operations System for your business. 30 minutes. Free.</p>
          <PrimaryButton onClick={() => { trackCTA("final_audit_cta", "bottom"); openBookingModal(); }}>Get Your AI Operations Audit</PrimaryButton>
          <p className="text-white/30 text-[13px] mt-6" style={{ fontFamily: fonts.display }}>No pitch, no pressure — just an honest assessment of where you are</p>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ════════════════════════════════════════════
 * PAGE
 * ════════════════════════════════════════════ */
export default function AiIntegrationPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="AI Operations System — Replace SaaS, Automate Operations, Own Your Stack | Digidog"
        description="We replace your $1K–$10K/month SaaS stack with an AI Operations System you own. CRM, automations, reporting — all on your infrastructure. Built in 4–8 weeks."
        canonical="/ai-integration"
      />
      <ScrollDepthTracker />
      <Navbar />
      <HeroSection />
      <WhatBreaksSection />
      <TheShiftSection />
      <WhatChangesSection />
      <ProofSection />
      <HowItWorksSection />
      <WhoItsForSection />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
