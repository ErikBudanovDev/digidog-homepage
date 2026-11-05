"use client";

import { useState } from "react";
import { Lock, Globe2, ShieldCheck, KeyRound, ChevronDown } from "lucide-react";
import { colors, fonts } from "@/components/ui/brand";
import { SectionContainer, SectionBadge } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslation } from "@/i18n/i18n-context";

const COPY = {
  EN: {
    defBadge: "In short",
    defTitle: "What is AI integration?",
    defText:
      "AI integration means connecting an AI model such as Claude to the tools your business already runs on: CRM, email, bookings, accounting or your own database. Through APIs and MCP, the AI can read your data and take defined actions, like answering an enquiry or updating a deal, while a person approves the steps that matter.",
    dataBadge: "Data & ownership",
    dataTitle: "Your data stays yours",
    dataIntro:
      "The model brings general knowledge, like a search engine. Your recent business data, the part that could hurt you in the wrong hands, stays with you.",
    dataItems: [
      {
        title: "A private repository, only for you",
        text: "We set up a private repository and server for your agent. Only you and your agent have access to your databases.",
      },
      {
        title: "You choose the model and the country",
        text: "Claude (Anthropic), ChatGPT (OpenAI), Grok (xAI) or an open-source model on your own server, hosted in the US, the EU or where you need it.",
      },
      {
        title: "Not used to train their models",
        text: "On business and API plans, Anthropic, OpenAI and xAI state that they do not train their models on your data by default. Free consumer chat apps can. With a local model, nothing leaves your server.",
      },
      {
        title: "Your keys, your code, secured",
        text: "API keys, accounts and code are created in your name, stored securely and handed over. If we stop working together, everything keeps running.",
      },
    ],
    dataNote: "Provider policies as published by Anthropic, OpenAI and xAI in November 2026. We check them again for every project.",
    faqBadge: "FAQ",
    faqTitle: "Questions we get asked first",
    faqs: [
      {
        q: "How long does the first AI agent take?",
        a: "After the free 45-minute walk-through, the pilot usually takes 2 to 3 weeks: one process, connected to your real tools, working on your data.",
      },
      {
        q: "What does it cost?",
        a: "Packages start at $400. The pilot has a fixed price that we agree after the free walk-through. It depends mainly on how many systems the agent needs to connect to.",
      },
      {
        q: "Which tools can you connect?",
        a: "Anything with an API: CRMs like HubSpot, Google Workspace, booking systems, accounting tools, databases and internal apps. We have done this for tour operators, a dental clinic chain and a jewelry brand.",
      },
      {
        q: "Where is our data processed, and who owns it?",
        a: "Your data stays in your systems. We build on infrastructure you own or choose, and code and accounts are handed over to you. Data protection questions, including GDPR, are part of the walk-through.",
      },
      {
        q: "Claude, ChatGPT, Grok or a local model?",
        a: "We mostly build on Claude, because it handles long tasks well and connects to tools through MCP. We also set up agents on ChatGPT, Grok or an open-source model on your own server, if that fits your needs or your data rules better.",
      },
    ],
  },
  DE: {
    defBadge: "Kurz erklärt",
    defTitle: "Was ist KI-Integration?",
    defText:
      "KI-Integration bedeutet, ein KI-Modell wie Claude mit den Tools zu verbinden, mit denen Ihr Unternehmen schon arbeitet: CRM, E-Mail, Buchungssystem, Buchhaltung oder eigene Datenbank. Über APIs und MCP kann die KI Ihre Daten lesen und festgelegte Aufgaben erledigen, etwa eine Anfrage beantworten oder einen Deal aktualisieren. Wichtige Schritte gibt ein Mensch frei.",
    dataBadge: "Datenschutz & Eigentum",
    dataTitle: "Ihre Daten bleiben Ihre Daten",
    dataIntro:
      "Das Modell bringt Allgemeinwissen mit, wie eine Suchmaschine. Ihre aktuellen Unternehmensdaten, also der Teil, der Ihnen schaden könnte, bleiben bei Ihnen.",
    dataItems: [
      {
        title: "Ein privates Repository, nur für Sie",
        text: "Wir richten ein privates Repository und einen Server für Ihren Agenten ein. Zugriff auf Ihre Datenbanken haben nur Sie und Ihr Agent.",
      },
      {
        title: "Sie wählen Modell und Land",
        text: "Claude (Anthropic), ChatGPT (OpenAI), Grok (xAI) oder ein Open-Source-Modell auf Ihrem eigenen Server, gehostet in den USA, in der EU oder wo Sie es brauchen.",
      },
      {
        title: "Kein Training mit Ihren Daten",
        text: "Für Business- und API-Tarife erklären Anthropic, OpenAI und xAI, dass sie ihre Modelle standardmäßig nicht mit Ihren Daten trainieren. Kostenlose Chat-Apps für Endkunden können das tun. Mit einem lokalen Modell verlässt nichts Ihren Server.",
      },
      {
        title: "Ihre Schlüssel, Ihr Code, abgesichert",
        text: "API-Schlüssel, Accounts und Code laufen auf Ihren Namen, werden sicher gespeichert und übergeben. Endet die Zusammenarbeit, läuft alles weiter.",
      },
    ],
    dataNote: "Stand der Richtlinien von Anthropic, OpenAI und xAI: November 2026. Wir prüfen sie bei jedem Projekt neu.",
    faqBadge: "FAQ",
    faqTitle: "Häufige Fragen",
    faqs: [
      {
        q: "Wie lange dauert der erste KI-Agent?",
        a: "Nach dem kostenlosen 45-minütigen KI-Prozess-Check dauert der Pilot meist 2 bis 3 Wochen: ein Prozess, verbunden mit Ihren echten Tools, mit Ihren Daten.",
      },
      {
        q: "Was kostet das?",
        a: "Pakete beginnen bei 400 $. Der Pilot hat einen Festpreis, den wir nach dem kostenlosen Prozess-Check vereinbaren. Er hängt vor allem davon ab, wie viele Systeme angebunden werden.",
      },
      {
        q: "Welche Tools können angebunden werden?",
        a: "Alles mit einer API: CRM wie HubSpot, Google Workspace, Buchungssysteme, Buchhaltung, Datenbanken und interne Anwendungen. Umgesetzt haben wir das z. B. für Reiseveranstalter, eine Zahnklinik-Kette und eine Schmuckmarke.",
      },
      {
        q: "Wo werden unsere Daten verarbeitet, und wem gehören sie?",
        a: "Ihre Daten bleiben in Ihren Systemen. Wir bauen auf Infrastruktur, die Ihnen gehört oder die Sie wählen, und übergeben Code und Zugänge. Fragen zu Datenschutz und DSGVO klären wir im Prozess-Check.",
      },
      {
        q: "Claude, ChatGPT, Grok oder ein lokales Modell?",
        a: "Wir bauen meist mit Claude, weil es lange Aufgaben gut bewältigt und sich über MCP mit Tools verbindet. Wir richten Agenten auch mit ChatGPT, Grok oder einem Open-Source-Modell auf Ihrem eigenen Server ein, wenn das besser zu Ihren Anforderungen oder Datenregeln passt.",
      },
    ],
  },
};

const ICONS = [Lock, Globe2, ShieldCheck, KeyRound];

export function AiTrustSection() {
  const { locale } = useTranslation();
  const c = locale === "DE" ? COPY.DE : COPY.EN;
  const [open, setOpen] = useState<number | null>(0);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "DE" ? "de" : "en",
    mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <section id="ai-trust" className="relative bg-white py-20 md:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SectionContainer>
        <ScrollReveal>
          <div className="max-w-[760px] mx-auto text-center mb-16">
            <SectionBadge>{c.defBadge}</SectionBadge>
            <h2 className="mt-4 text-[28px] md:text-[38px] leading-[1.2]" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}>
              {c.defTitle}
            </h2>
            <p className="mt-4 text-[16px] md:text-[18px] text-slate-600 leading-relaxed" style={{ fontFamily: fonts.body }}>
              {c.defText}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="text-center mb-8">
            <SectionBadge>{c.dataBadge}</SectionBadge>
            <h3 className="mt-4 text-[24px] md:text-[32px]" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}>
              {c.dataTitle}
            </h3>
            <p className="mt-3 max-w-[680px] mx-auto text-[16px] text-slate-600 leading-relaxed" style={{ fontFamily: fonts.body }}>
              {c.dataIntro}
            </p>
          </div>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-2 max-w-[980px] mx-auto">
          {c.dataItems.map((d, i) => {
            const Icon = ICONS[i];
            return (
              <ScrollReveal key={d.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-slate-200 bg-[#f8fafc] p-6">
                  <Icon size={26} style={{ color: colors.blue }} />
                  <h4 className="mt-4 text-[18px]" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}>
                    {d.title}
                  </h4>
                  <p className="mt-2 text-[15px] text-slate-600" style={{ fontFamily: fonts.body }}>
                    {d.text}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
        <p className="mt-5 mb-20 text-center text-[13px] text-slate-500" style={{ fontFamily: fonts.body }}>{c.dataNote}</p>

        <ScrollReveal>
          <div className="max-w-[820px] mx-auto">
            <div className="text-center mb-8">
              <SectionBadge>{c.faqBadge}</SectionBadge>
              <h3 className="mt-4 text-[24px] md:text-[32px]" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}>
                {c.faqTitle}
              </h3>
            </div>
            <div className="space-y-3">
              {c.faqs.map((f, i) => (
                <div key={f.q} className="rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                    aria-expanded={open === i}
                  >
                    <span className="text-[16px] font-semibold" style={{ fontFamily: fonts.body, color: colors.textDark }}>
                      {f.q}
                    </span>
                    <ChevronDown size={18} className={`shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`px-5 pb-4 text-[15px] text-slate-600 ${open === i ? "block" : "hidden"}`} style={{ fontFamily: fonts.body }}>
                    {f.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </SectionContainer>
    </section>
  );
}
