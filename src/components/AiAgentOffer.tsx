"use client";

import { useState } from "react";
import { Search, Bot, RefreshCcw, CheckCircle2 } from "lucide-react";
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
    steps: [
      {
        tag: "Free · 45 min",
        title: "AI process walk-through",
        text: "We go through one of your processes together and show where Claude or an AI agent fits, and where it doesn't.",
        points: ["One real process, not slides", "Which tools to connect (CRM, email, bookings)", "Honest yes/no on whether it's worth it"],
      },
      {
        tag: "Fixed price · 2–3 weeks",
        title: "AI agent pilot",
        text: "We build one agent connected to your real tools. You see it work on your data before you commit to more.",
        points: ["Connected via MCP to your systems", "A person approves what matters", "Fixed price, agreed after the walk-through"],
      },
      {
        tag: "Monthly",
        title: "Run & improve",
        text: "We keep the agent running, watch the results and add the next process when the first one pays off.",
        points: ["Monitoring and fixes", "New skills as your team asks for them", "Cancel any month"],
      },
    ],
    cta: "Book the free walk-through",
    checkTitle: "Is your business ready for an AI agent?",
    checkDesc: "5 quick questions. Tick what's true for you.",
    questions: [
      "Your team does the same task by hand every week (emails, data entry, reports).",
      "Your data lives in tools with an API (CRM, booking system, Google Workspace, accounting).",
      "You can name one person who owns that process.",
      "A mistake in that task can be caught by a person before it reaches a customer.",
      "You'd save at least 5 hours a week if it ran on its own.",
    ],
    results: [
      { min: 4, title: "Strong fit.", text: "You have a clear first use case. Let's pick it in the walk-through and price the pilot." },
      { min: 2, title: "Good start.", text: "There's likely one process worth automating. The walk-through will show which one." },
      { min: 0, title: "Early stage.", text: "An agent may not pay off yet. In 45 minutes we can tell you what to get in place first." },
    ],
    score: (n: number) => `${n} of 5`,
  },
  DE: {
    badge: "So starten wir",
    title1: "Ihr erster KI-Agent",
    title2: "in drei Schritten",
    desc: "Kein großes Transformationsprojekt. Wir starten mit einem Prozess, zeigen, dass es funktioniert, und bauen dann aus.",
    steps: [
      {
        tag: "Kostenlos · 45 Min.",
        title: "KI-Prozess-Check",
        text: "Wir gehen gemeinsam einen Ihrer Prozesse durch und zeigen, wo Claude oder ein KI-Agent passt und wo nicht.",
        points: ["Ein echter Prozess, keine Folien", "Welche Tools angebunden werden (CRM, E-Mail, Buchungen)", "Ehrliches Ja/Nein, ob es sich lohnt"],
      },
      {
        tag: "Festpreis · 2–3 Wochen",
        title: "KI-Agent-Pilot",
        text: "Wir bauen einen Agenten, der mit Ihren echten Tools verbunden ist. Sie sehen ihn mit Ihren Daten arbeiten, bevor Sie mehr beauftragen.",
        points: ["Per MCP mit Ihren Systemen verbunden", "Ein Mensch gibt Wichtiges frei", "Festpreis, vereinbart nach dem Check"],
      },
      {
        tag: "Monatlich",
        title: "Betrieb & Ausbau",
        text: "Wir betreiben den Agenten, beobachten die Ergebnisse und nehmen den nächsten Prozess dazu, sobald sich der erste rechnet.",
        points: ["Monitoring und Fehlerbehebung", "Neue Skills, wenn Ihr Team sie braucht", "Monatlich kündbar"],
      },
    ],
    cta: "Kostenlosen Check buchen",
    checkTitle: "Ist Ihr Unternehmen bereit für einen KI-Agenten?",
    checkDesc: "5 kurze Fragen. Haken Sie ab, was auf Sie zutrifft.",
    questions: [
      "Ihr Team erledigt jede Woche dieselbe Aufgabe von Hand (E-Mails, Dateneingabe, Berichte).",
      "Ihre Daten liegen in Tools mit API (CRM, Buchungssystem, Google Workspace, Buchhaltung).",
      "Es gibt eine Person, die für diesen Prozess verantwortlich ist.",
      "Ein Fehler in dieser Aufgabe kann von einem Menschen abgefangen werden, bevor er den Kunden erreicht.",
      "Sie würden mindestens 5 Stunden pro Woche sparen, wenn es von selbst liefe.",
    ],
    results: [
      { min: 4, title: "Sehr gute Basis.", text: "Sie haben einen klaren ersten Anwendungsfall. Im Check wählen wir ihn aus und kalkulieren den Pilot." },
      { min: 2, title: "Guter Start.", text: "Wahrscheinlich lohnt sich ein Prozess. Der Check zeigt, welcher." },
      { min: 0, title: "Frühe Phase.", text: "Ein Agent rechnet sich vielleicht noch nicht. In 45 Minuten sagen wir Ihnen, was zuerst nötig ist." },
    ],
    score: (n: number) => `${n} von 5`,
  },
};

const ICONS = [Search, Bot, RefreshCcw];

export function AiAgentOffer() {
  const { locale } = useTranslation();
  const c = locale === "DE" ? COPY.DE : COPY.EN;
  const [ticks, setTicks] = useState<boolean[]>([false, false, false, false, false]);
  const n = ticks.filter(Boolean).length;
  const answered = n > 0;
  const result = c.results.find((r) => n >= r.min)!;

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
          <div id="ai-readiness-check" className="mt-14 md:mt-20 rounded-3xl bg-white border border-slate-200 p-6 md:p-10 shadow-sm">
            <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-start">
              <div>
                <h3 className="text-[24px] md:text-[30px] leading-[1.2] mb-2" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}>
                  {c.checkTitle}
                </h3>
                <p className="text-[15px] text-slate-600 mb-6" style={{ fontFamily: fonts.body }}>
                  {c.checkDesc}
                </p>
                <div className="space-y-3">
                  {c.questions.map((q, i) => (
                    <label
                      key={q}
                      className={`flex gap-3 items-start rounded-xl border p-4 cursor-pointer transition-colors ${
                        ticks[i] ? "border-sky-400 bg-sky-50" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={ticks[i]}
                        onChange={() => setTicks((t) => t.map((v, j) => (j === i ? !v : v)))}
                        className="mt-1 w-5 h-5 shrink-0 accent-sky-600"
                      />
                      <span className="text-[15px] text-slate-700" style={{ fontFamily: fonts.body }}>
                        {q}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-7 text-white md:sticky md:top-28" style={{ background: colors.gradientCosmic }}>
                <div className="text-[44px] leading-none mb-3" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>
                  {c.score(n)}
                </div>
                {answered ? (
                  <>
                    <div className="text-[20px] mb-2" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>
                      {result.title}
                    </div>
                    <p className="text-white/75 text-[15px] mb-6" style={{ fontFamily: fonts.body }}>
                      {result.text}
                    </p>
                  </>
                ) : (
                  <p className="text-white/60 text-[15px] mb-6" style={{ fontFamily: fonts.body }}>
                    {c.checkDesc}
                  </p>
                )}
                <PrimaryButton onClick={() => openBookingModal()}>
                  {c.cta}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionContainer>
    </section>
  );
}
