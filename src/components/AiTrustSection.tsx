"use client";

import { useState } from "react";
import { ShieldCheck, KeyRound, UserCheck, ChevronDown } from "lucide-react";
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
    dataItems: [
      {
        title: "Your infrastructure",
        text: "We build on systems and servers you own or choose, including servers in the EU. No platform you are locked into.",
      },
      {
        title: "You own code and accounts",
        text: "Code, API keys and accounts are set up in your name and handed over. If we stop working together, everything keeps running.",
      },
      {
        title: "A person stays in control",
        text: "The agent only does what it is allowed to do. Anything that reaches a customer or moves money waits for a human approval.",
      },
    ],
    faqBadge: "FAQ",
    faqTitle: "Questions we get asked first",
    faqs: [
      {
        q: "How long does the first AI agent take?",
        a: "After the free 45-minute walk-through, the pilot usually takes 2 to 3 weeks: one process, connected to your real tools, working on your data.",
      },
      {
        q: "What does it cost?",
        a: "The pilot has a fixed price that we agree after the walk-through. It depends mainly on how many systems the agent needs to connect to.",
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
        q: "Claude or ChatGPT?",
        a: "We mostly build on Claude, because it works well with long tasks and connects to tools through MCP. Where another model fits better, we use it.",
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
    dataItems: [
      {
        title: "Ihre Infrastruktur",
        text: "Wir bauen auf Systemen und Servern, die Ihnen gehören oder die Sie wählen, auch auf Servern in der EU. Keine Plattform, an die Sie gebunden sind.",
      },
      {
        title: "Code und Zugänge gehören Ihnen",
        text: "Code, API-Schlüssel und Accounts laufen auf Ihren Namen und werden übergeben. Endet die Zusammenarbeit, läuft alles weiter.",
      },
      {
        title: "Ein Mensch behält die Kontrolle",
        text: "Der Agent tut nur, was er darf. Alles, was Kunden erreicht oder Geld bewegt, wartet auf eine Freigabe durch einen Menschen.",
      },
    ],
    faqBadge: "FAQ",
    faqTitle: "Häufige Fragen",
    faqs: [
      {
        q: "Wie lange dauert der erste KI-Agent?",
        a: "Nach dem kostenlosen 45-minütigen KI-Prozess-Check dauert der Pilot meist 2 bis 3 Wochen: ein Prozess, verbunden mit Ihren echten Tools, mit Ihren Daten.",
      },
      {
        q: "Was kostet das?",
        a: "Der Pilot hat einen Festpreis, den wir nach dem Prozess-Check vereinbaren. Er hängt vor allem davon ab, wie viele Systeme angebunden werden.",
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
        q: "Claude oder ChatGPT?",
        a: "Wir bauen meist mit Claude, weil es lange Aufgaben gut bewältigt und sich über MCP mit Tools verbindet. Wo ein anderes Modell besser passt, setzen wir das ein.",
      },
    ],
  },
};

const ICONS = [ShieldCheck, KeyRound, UserCheck];

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
          </div>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3 mb-20">
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
