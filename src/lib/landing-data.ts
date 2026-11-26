/* Niche landing pages for outreach and search.
 * One entry per niche and language. Only facts from our real projects. */

export type Landing = {
  key: string; // shared between languages
  lang: "en" | "de";
  slug: string;
  path: string;
  alt: string; // path of the other language
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  sub: string;
  cta: string;
  cta2: string;
  ctaNote: string;
  jobsTitle: string;
  jobs: { title: string; text: string }[];
  caseTitle: string;
  cases: { tag: string; title: string; text: string; metric?: string; metricLabel?: string; href: string; link: string }[];
  stepsTitle: string;
  steps: { tag: string; title: string; text: string }[];
  systemsTitle: string;
  systems: string[];
  systemsNote: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  closingTitle: string;
  closingText: string;
};

export const landings: Landing[] = [
  {
    key: "dental-clinics",
    lang: "en",
    slug: "dental-clinics",
    path: "/for/dental-clinics",
    alt: "/de/fuer/zahnarztpraxen",
    metaTitle: "AI Agents for Dental & Medical Clinic Groups",
    metaDescription:
      "AI agents for multi-location clinics: route new-patient requests, follow up on enquiries and keep HubSpot clean. Built by the team behind a dental chain's CRM.",
    eyebrow: "For dental and medical clinic groups",
    h1: "AI agents that handle patient enquiries across all your locations",
    sub: "New-patient requests, follow-ups and CRM updates take hours of front-desk time in every branch. We connect an AI agent to your forms, inbox and CRM, so requests reach the right location and nothing is left unanswered. Your staff approve what goes out.",
    cta: "Book a free walk-through",
    cta2: "Send a message",
    ctaNote: "45 minutes · one real process · honest yes or no",
    jobsTitle: "What the agent takes off your team",
    jobs: [
      { title: "Routes every request", text: "Reads each web form, email and callback request and sends it to the right location and person, with the details already filled in." },
      { title: "Follows up on open enquiries", text: "Drafts the reply or reminder for enquiries nobody answered. A staff member reads it and presses send." },
      { title: "Keeps the CRM clean", text: "Creates and updates contacts, deals and notes in HubSpot, so every branch works from the same record." },
      { title: "Reports per location", text: "A weekly summary of enquiries, response times and bookings by branch, in plain language, from your own data." },
    ],
    caseTitle: "Work we have done for clinics",
    cases: [
      {
        tag: "Dental clinic chain · confidential",
        title: "HubSpot CRM across a multi-branch dental chain",
        text: "One patient workflow for all branches in HubSpot, connected to the IVORIS practice software through its API and automated with Make.",
        href: "/portfolio/hubspot-dental-crm",
        link: "See the project",
      },
      {
        tag: "SmileforYou · dental clinic chain",
        title: "Website redesign and conversion optimisation",
        text: "A full redesign of the clinic chain's website, focused on turning visitors into appointment requests.",
        metric: "5% → 11%",
        metricLabel: "conversion rate",
        href: "/portfolio/smileforyou",
        link: "See the project",
      },
    ],
    stepsTitle: "How we start",
    steps: [
      { tag: "Free · 45 min", title: "Process walk-through", text: "We go through one of your processes together, for example how a new-patient request travels from the website to a booked appointment." },
      { tag: "From $400 · 2–3 weeks", title: "AI agent pilot", text: "One agent connected to your real tools. You see it work on your own enquiries before you decide on more." },
      { tag: "Monthly", title: "Run and improve", text: "We keep the agent running, watch the results and add the next process when the first one pays off." },
    ],
    systemsTitle: "Systems we connect",
    systems: ["HubSpot", "IVORIS", "Make", "n8n", "Website forms", "Email", "Google Analytics", "Claude", "ChatGPT", "Local models"],
    systemsNote: "Using other practice software? We check its API in the walk-through and tell you plainly what is possible.",
    faqTitle: "Questions clinics ask",
    faqs: [
      { q: "Does the agent see patient records?", a: "Not unless you decide so. We start with enquiry and scheduling data, not clinical records. You choose which data the agent may read, which AI provider is used and in which region it runs." },
      { q: "Does it send messages on its own?", a: "No. The agent prepares replies and updates; a member of your team approves anything that goes to a patient." },
      { q: "Which AI do you use?", a: "Claude, ChatGPT, Grok or a local model on your own hardware. We choose together, based on your data rules." },
      { q: "How long does a pilot take?", a: "Usually two to three weeks for one process, at a fixed price agreed after the walk-through. Packages start from $400." },
    ],
    closingTitle: "Show us one process. We'll tell you if an agent fits.",
    closingText: "Tell us how enquiries reach your clinics today. You get a clear answer on what an agent could take over, and what it should not.",
  },
  {
    key: "dental-clinics",
    lang: "de",
    slug: "zahnarztpraxen",
    path: "/de/fuer/zahnarztpraxen",
    alt: "/for/dental-clinics",
    metaTitle: "KI-Agenten für Zahnarztpraxen & Praxisgruppen",
    metaDescription:
      "KI-Agenten für Praxen mit mehreren Standorten: Terminanfragen verteilen, offene Anfragen nachfassen, HubSpot sauber halten. Vom Team hinter dem CRM einer Zahnarztkette.",
    eyebrow: "Für Zahnarztpraxen und Praxisgruppen",
    h1: "KI-Agenten, die Patientenanfragen für alle Ihre Standorte bearbeiten",
    sub: "Terminanfragen, Rückfragen und CRM-Pflege kosten an jedem Standort Stunden am Empfang. Wir verbinden einen KI-Agenten mit Ihren Formularen, Ihrem Postfach und Ihrem CRM. Anfragen landen am richtigen Standort und nichts bleibt liegen. Ihr Team gibt frei, was rausgeht.",
    cta: "Kostenlosen Prozess-Check buchen",
    cta2: "Nachricht senden",
    ctaNote: "45 Minuten · ein echter Prozess · ehrliches Ja oder Nein",
    jobsTitle: "Was der Agent Ihrem Team abnimmt",
    jobs: [
      { title: "Verteilt jede Anfrage", text: "Liest Formulare, E-Mails und Rückrufbitten und leitet sie an den richtigen Standort und die richtige Person weiter, mit allen Angaben." },
      { title: "Fasst offene Anfragen nach", text: "Entwirft die Antwort oder Erinnerung für Anfragen, auf die niemand reagiert hat. Eine Mitarbeiterin liest und sendet." },
      { title: "Hält das CRM sauber", text: "Legt Kontakte, Deals und Notizen in HubSpot an und aktualisiert sie, damit alle Standorte mit demselben Stand arbeiten." },
      { title: "Berichtet pro Standort", text: "Jede Woche eine Übersicht zu Anfragen, Antwortzeiten und Terminen je Standort, verständlich formuliert, aus Ihren eigenen Daten." },
    ],
    caseTitle: "Was wir für Praxen umgesetzt haben",
    cases: [
      {
        tag: "Zahnarztkette · vertraulich",
        title: "HubSpot CRM für eine Zahnarztkette mit mehreren Standorten",
        text: "Ein Patienten-Workflow für alle Standorte in HubSpot, über die API mit der Praxissoftware IVORIS verbunden und mit Make automatisiert.",
        href: "/de/portfolio",
        link: "Zum Portfolio",
      },
      {
        tag: "SmileforYou · Zahnarztkette",
        title: "Website-Redesign und Conversion-Optimierung",
        text: "Komplettes Redesign der Website der Praxiskette, mit Fokus darauf, aus Besuchern Terminanfragen zu machen.",
        metric: "5 % → 11 %",
        metricLabel: "Conversion-Rate",
        href: "/de/portfolio",
        link: "Zum Portfolio",
      },
    ],
    stepsTitle: "So starten wir",
    steps: [
      { tag: "Kostenlos · 45 Min.", title: "Prozess-Check", text: "Wir gehen gemeinsam einen Ihrer Prozesse durch, zum Beispiel den Weg einer Terminanfrage von der Website bis zum gebuchten Termin." },
      { tag: "Ab 400 $ · 2–3 Wochen", title: "KI-Agent als Pilot", text: "Ein Agent, verbunden mit Ihren echten Tools. Sie sehen ihn mit Ihren eigenen Anfragen arbeiten, bevor Sie mehr entscheiden." },
      { tag: "Monatlich", title: "Betreiben und verbessern", text: "Wir halten den Agenten am Laufen, beobachten die Ergebnisse und nehmen den nächsten Prozess dazu, wenn sich der erste rechnet." },
    ],
    systemsTitle: "Systeme, die wir verbinden",
    systems: ["HubSpot", "IVORIS", "Make", "n8n", "Website-Formulare", "E-Mail", "Google Analytics", "Claude", "ChatGPT", "Lokale Modelle"],
    systemsNote: "Sie nutzen eine andere Praxissoftware? Wir prüfen die Schnittstelle im Prozess-Check und sagen Ihnen klar, was möglich ist.",
    faqTitle: "Fragen aus Praxen",
    faqs: [
      { q: "Sieht der Agent Patientenakten?", a: "Nur wenn Sie das entscheiden. Wir starten mit Anfrage- und Termindaten, nicht mit Behandlungsdaten. Sie legen fest, welche Daten der Agent lesen darf, welcher KI-Anbieter genutzt wird und in welcher Region er läuft." },
      { q: "Verschickt er selbstständig Nachrichten?", a: "Nein. Der Agent bereitet Antworten und Einträge vor; alles, was an Patienten geht, gibt Ihr Team frei." },
      { q: "Welche KI setzen Sie ein?", a: "Claude, ChatGPT, Grok oder ein lokales Modell auf Ihrer eigenen Hardware. Das entscheiden wir gemeinsam nach Ihren Datenschutzvorgaben." },
      { q: "Wie lange dauert ein Pilot?", a: "Meist zwei bis drei Wochen für einen Prozess, zum Festpreis nach dem Prozess-Check. Pakete starten ab 400 $." },
    ],
    closingTitle: "Zeigen Sie uns einen Prozess. Wir sagen Ihnen, ob ein Agent passt.",
    closingText: "Beschreiben Sie kurz, wie Anfragen heute in Ihre Praxen kommen. Sie erhalten eine klare Antwort, was ein Agent übernehmen kann und was nicht.",
  },
];

export const getLanding = (lang: "en" | "de", slug: string) => landings.find((l) => l.lang === lang && l.slug === slug);
