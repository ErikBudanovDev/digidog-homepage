"use client";
/* Compact case-study cards for the AI integration page (Nov 2026). */
import { BarChart3, Target, Globe, Network } from "lucide-react";
import { colors, fonts } from "@/components/ui/brand";
import { SectionContainer, SectionBadge } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StarField } from "@/components/CosmicElements";
import { useTranslation } from "@/i18n/i18n-context";

type Case = { tag: string; title: string; metric: string; metricLabel: string; text: string; chips: string[] };

const COPY: Record<"EN" | "DE", { badge: string; t1: string; t2: string; desc: string; cases: Case[] }> = {
  EN: {
    badge: "Case studies",
    t1: "Study our work:",
    t2: "AI systems in production",
    desc: "Real systems we built and run, for clients and for our own company.",
    cases: [
      {
        tag: "Tour operator · Marketing",
        title: "AI marketing dashboard for Be Original Tours",
        metric: "€18,099",
        metricLabel: "duplicate ad spend found",
        text: "One Claude chat reads Google Ads, GA4 and tour data. It found a second ad account running the same campaigns twice, and pulled 6,850 reviews from 12 cities onto the website.",
        chips: ["Claude", "MCP · 51 tools", "Google Ads", "GA4"],
      },
      {
        tag: "Sales · Lead generation",
        title: "Lead agent that writes the first email",
        metric: "2",
        metricLabel: "new clients in the UK",
        text: "The agent reads a prospect's website, compares it with their top-10 Google competitors and drafts a personal email. A second agent watches the Swiss commercial register: about 200 new companies a day.",
        chips: ["Website analysis", "Google SERP", "LinkedIn", "Python"],
      },
      {
        tag: "Agencies · Websites",
        title: "One chat runs many WordPress sites",
        metric: "5+",
        metricLabel: "client websites, one chat",
        text: "An MCP gateway on our server connects Claude to client WordPress sites. Redirects, page translations and content updates happen in one conversation, without logging in to each site.",
        chips: ["WordPress", "MCP gateway", "REST API", "VPS"],
      },
      {
        tag: "Our own company",
        title: "AI operations dashboard",
        metric: "1",
        metricLabel: "view for every agent",
        text: "DigiDog runs on it. Every agent and chat is a branch on one board, and colours show who is working, what is done and what waits for a decision. We set up the same for clients.",
        chips: ["Claude", "MCP", "Chrome extension", "VPS"],
      },
    ],
  },
  DE: {
    badge: "Fallstudien",
    t1: "Unsere Arbeit:",
    t2: "KI-Systeme im Einsatz",
    desc: "Echte Systeme, die wir gebaut haben und betreiben, für Kunden und für unser eigenes Unternehmen.",
    cases: [
      {
        tag: "Reiseveranstalter · Marketing",
        title: "KI-Marketing-Dashboard für Be Original Tours",
        metric: "18.099 €",
        metricLabel: "doppelte Werbeausgaben gefunden",
        text: "Ein Claude-Chat liest Google Ads, GA4 und Tour-Daten. Er fand ein zweites Werbekonto, das dieselben Kampagnen doppelt schaltete, und holte 6.850 Bewertungen aus 12 Städten auf die Website.",
        chips: ["Claude", "MCP · 51 Tools", "Google Ads", "GA4"],
      },
      {
        tag: "Vertrieb · Leadgenerierung",
        title: "Lead-Agent, der die erste E-Mail schreibt",
        metric: "2",
        metricLabel: "neue Kunden in Großbritannien",
        text: "Der Agent liest die Website eines Interessenten, vergleicht sie mit den Top-10-Konkurrenten bei Google und entwirft eine persönliche E-Mail. Ein zweiter Agent beobachtet das Schweizer Handelsregister: rund 200 neue Firmen pro Tag.",
        chips: ["Website-Analyse", "Google SERP", "LinkedIn", "Python"],
      },
      {
        tag: "Agenturen · Websites",
        title: "Ein Chat steuert viele WordPress-Seiten",
        metric: "5+",
        metricLabel: "Kunden-Websites, ein Chat",
        text: "Ein MCP-Gateway auf unserem Server verbindet Claude mit WordPress-Seiten von Kunden. Weiterleitungen, Übersetzungen und Inhalte werden in einem Gespräch erledigt, ohne Login auf jeder Seite.",
        chips: ["WordPress", "MCP-Gateway", "REST API", "VPS"],
      },
      {
        tag: "Unser eigenes Unternehmen",
        title: "KI-Operations-Dashboard",
        metric: "1",
        metricLabel: "Ansicht für alle Agenten",
        text: "DigiDog läuft darauf. Jeder Agent und jeder Chat ist ein Zweig auf einem Board, Farben zeigen, wer arbeitet, was fertig ist und was auf eine Entscheidung wartet. Dasselbe richten wir für Kunden ein.",
        chips: ["Claude", "MCP", "Chrome-Erweiterung", "VPS"],
      },
    ],
  },
};

const ICONS = [BarChart3, Target, Globe, Network];

export function AiCaseCards() {
  const { locale } = useTranslation();
  const c = locale === "DE" ? COPY.DE : COPY.EN;
  return (
    <section id="case-studies" className="relative py-20 md:py-24 overflow-hidden" style={{ background: colors.navyDeep }}>
      <StarField count={25} color="rgba(255,255,255,0.3)" />
      <SectionContainer className="relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-[720px] mx-auto mb-10 md:mb-12">
            <SectionBadge variant="dark">{c.badge}</SectionBadge>
            <h2 className="mt-5 text-white text-[30px] md:text-[44px] leading-[1.15]" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>
              {c.t1}{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #10B981, #06b6d4)" }}>{c.t2}</span>
            </h2>
            <p className="mt-4 text-[16px] md:text-[17px] leading-[1.7]" style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}>{c.desc}</p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 md:gap-5 md:grid-cols-2 max-w-[1080px] mx-auto">
          {c.cases.map((cs, i) => {
            const Icon = ICONS[i];
            return (
              <ScrollReveal key={cs.title} delay={i * 0.06}>
                <article className="h-full rounded-2xl p-5 md:p-6 bg-white/[0.04] border border-white/10 hover:border-sky-400/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ background: "linear-gradient(135deg, #0057ff, #0ea5e9)" }}>
                      <Icon size={19} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11.5px] uppercase tracking-[0.14em] text-sky-300/80" style={{ fontFamily: fonts.display, fontWeight: 700 }}>{cs.tag}</p>
                      <h3 className="mt-1 text-white text-[18px] md:text-[19px] leading-snug" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>{cs.title}</h3>
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2.5">
                    <span className="text-[28px] md:text-[32px] leading-none bg-clip-text text-transparent" style={{ fontFamily: fonts.heading, fontWeight: 700, backgroundImage: "linear-gradient(135deg, #34d399, #22d3ee)" }}>
                      {cs.metric}
                    </span>
                    <span className="text-[13.5px] text-white/70" style={{ fontFamily: fonts.body }}>{cs.metricLabel}</span>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-white/70" style={{ fontFamily: fonts.body }}>{cs.text}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cs.chips.map((ch) => (
                      <span key={ch} className="text-[11.5px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/70" style={{ fontFamily: fonts.body }}>{ch}</span>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
