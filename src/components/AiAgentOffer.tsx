"use client";

import { Search, Bot, RefreshCcw, CheckCircle2, XCircle } from "lucide-react";
import { colors, fonts } from "@/components/ui/brand";
import { SectionContainer, SectionBadge } from "@/components/ui/section";
import { PrimaryButton, openBookingModal } from "@/components/ui/buttons";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslation } from "@/i18n/i18n-context";

const COPY = {
  EN: {
    badge: "How we start",
    title1: "Your first AI agent",
    title2: "in three steps",
    desc: "No big transformation project. We start with one process, prove it works, then grow from there.",
    price: "Packages from $400",
    steps: [
      {
        tag: "Free · 45 min",
        title: "AI process walk-through",
        text: "We go through one of your processes together and show where Claude or an AI agent fits, and where it doesn't.",
        points: ["One real process, not slides", "Which tools to connect (CRM, email, bookings)", "Honest yes/no on whether it's worth it"],
      },
      {
        tag: "From $400 · 2–3 weeks",
        title: "AI agent pilot",
        text: "We build one agent connected to your real tools. You see it work on your data before you commit to more.",
        points: ["Connected via MCP to your systems", "A person approves what matters", "Fixed price from $400, agreed after the walk-through"],
      },
      {
        tag: "Monthly",
        title: "Run & improve",
        text: "We keep the agent running, watch the results and add the next process when the first one pays off.",
        points: ["Monitoring and fixes", "New skills as your team asks for them", "Cancel any month"],
      },
    ],
    cta: "Book the free walk-through",
    cmpTitle: "Your week, without us and with us",
    withoutTitle: "Without an agent",
    without: [
      "Someone has to manage your WordPress site: updates, content, fixes",
      "You copy website data, enquiries and emails between tools by hand",
      "Your booking system, CRM and inbox don't talk to each other",
      "Reports get built manually, if at all",
    ],
    withTitle: "With DigiDog",
    with: [
      "One agent connected to WordPress, email, bookings and your data",
      "Content, updates and replies are prepared for you to approve",
      "Everything shows up in one AI operations dashboard",
      "You ask in plain language and get answers from your own data",
    ],
  },
  DE: {
    badge: "So starten wir",
    title1: "Ihr erster KI-Agent",
    title2: "in drei Schritten",
    desc: "Kein großes Transformationsprojekt. Wir starten mit einem Prozess, zeigen, dass es funktioniert, und bauen dann aus.",
    price: "Pakete ab 400 $",
    steps: [
      {
        tag: "Kostenlos · 45 Min.",
        title: "KI-Prozess-Check",
        text: "Wir gehen gemeinsam einen Ihrer Prozesse durch und zeigen, wo Claude oder ein KI-Agent passt und wo nicht.",
        points: ["Ein echter Prozess, keine Folien", "Welche Tools angebunden werden (CRM, E-Mail, Buchungen)", "Ehrliches Ja/Nein, ob es sich lohnt"],
      },
      {
        tag: "Ab 400 $ · 2–3 Wochen",
        title: "KI-Agent-Pilot",
        text: "Wir bauen einen Agenten, der mit Ihren echten Tools verbunden ist. Sie sehen ihn mit Ihren Daten arbeiten, bevor Sie mehr beauftragen.",
        points: ["Per MCP mit Ihren Systemen verbunden", "Ein Mensch gibt Wichtiges frei", "Festpreis ab 400 $, vereinbart nach dem Check"],
      },
      {
        tag: "Monatlich",
        title: "Betrieb & Ausbau",
        text: "Wir betreiben den Agenten, beobachten die Ergebnisse und nehmen den nächsten Prozess dazu, sobald sich der erste rechnet.",
        points: ["Monitoring und Fehlerbehebung", "Neue Skills, wenn Ihr Team sie braucht", "Monatlich kündbar"],
      },
    ],
    cta: "Kostenlosen Check buchen",
    cmpTitle: "Ihre Woche, ohne uns und mit uns",
    withoutTitle: "Ohne Agent",
    without: [
      "Jemand muss Ihre WordPress-Seite pflegen: Updates, Inhalte, Fehler",
      "Website-Daten, Anfragen und E-Mails werden von Hand zwischen Tools kopiert",
      "Buchungssystem, CRM und Postfach sprechen nicht miteinander",
      "Berichte werden manuell erstellt, wenn überhaupt",
    ],
    withTitle: "Mit DigiDog",
    with: [
      "Ein Agent, verbunden mit WordPress, E-Mail, Buchungen und Ihren Daten",
      "Inhalte, Updates und Antworten werden vorbereitet, Sie geben frei",
      "Alles erscheint in einem KI-Operations-Dashboard",
      "Sie fragen in normaler Sprache und bekommen Antworten aus Ihren Daten",
    ],
  },
};

const ICONS = [Search, Bot, RefreshCcw];

export function AiAgentOffer() {
  const { locale } = useTranslation();
  const c = locale === "DE" ? COPY.DE : COPY.EN;

  return (
    <section id="ai-agent-offer" className="relative bg-[#f8fafc] py-20 md:py-28">
      <SectionContainer>
        <ScrollReveal>
          <div className="text-center max-w-[720px] mx-auto mb-12 md:mb-16">
            <SectionBadge>{c.badge}</SectionBadge>
            <h2
              className="mt-4 text-[30px] md:text-[44px] leading-[1.15]"
              style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
            >
              {c.title1}{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${colors.blue}, ${colors.purple})` }}>
                {c.title2}
              </span>
            </h2>
            <p className="mt-4 text-[16px] md:text-[18px] text-slate-600" style={{ fontFamily: fonts.body }}>
              {c.desc}
            </p>
            <p className="mt-5 inline-block text-[15px] md:text-[17px] px-4 py-2 rounded-full" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.blue, background: "#e0edff" }}>
              {c.price}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {c.steps.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <ScrollReveal key={s.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white border border-slate-200 p-7 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                      style={{ background: `linear-gradient(135deg, ${colors.blue}, ${colors.purple})` }}
                    >
                      <Icon size={22} />
                    </div>
                    <span className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: fonts.display }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <span
                    className="self-start text-[12px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3"
                    style={{ background: "#e0f2fe", color: "#0369a1", fontFamily: fonts.display }}
                  >
                    {s.tag}
                  </span>
                  <h3 className="text-[21px] mb-2" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}>
                    {s.title}
                  </h3>
                  <p className="text-[15px] text-slate-600 mb-5" style={{ fontFamily: fonts.body }}>
                    {s.text}
                  </p>
                  <ul className="mt-auto space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2 text-[14px] text-slate-700" style={{ fontFamily: fonts.body }}>
                        <CheckCircle2 size={17} className="shrink-0 mt-[2px]" style={{ color: colors.blue }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div id="with-without" className="mt-14 md:mt-20">
            <h3 className="text-center text-[24px] md:text-[32px] leading-[1.2] mb-8" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}>
              {c.cmpTitle}
            </h3>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
                <p className="text-[13px] uppercase tracking-[0.15em] text-slate-500 mb-5" style={{ fontFamily: fonts.display, fontWeight: 700 }}>
                  {c.withoutTitle}
                </p>
                <ul className="space-y-4">
                  {c.without.map((x) => (
                    <li key={x} className="flex gap-3 text-[15.5px] text-slate-600" style={{ fontFamily: fonts.body }}>
                      <XCircle size={19} className="shrink-0 mt-[2px] text-slate-400" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl p-6 md:p-8 text-white" style={{ background: colors.gradientCosmic }}>
                <p className="text-[13px] uppercase tracking-[0.15em] text-sky-300 mb-5" style={{ fontFamily: fonts.display, fontWeight: 700 }}>
                  {c.withTitle}
                </p>
                <ul className="space-y-4">
                  {c.with.map((x) => (
                    <li key={x} className="flex gap-3 text-[15.5px] text-white/90" style={{ fontFamily: fonts.body }}>
                      <CheckCircle2 size={19} className="shrink-0 mt-[2px] text-sky-300" />
                      {x}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <PrimaryButton onClick={() => openBookingModal()}>{c.cta}</PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionContainer>
    </section>
  );
}
