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
  {
    key: "industrial-energy",
    lang: "en",
    slug: "industrial-companies",
    path: "/for/industrial-companies",
    alt: "/de/fuer/industrie-energie",
    metaTitle: "AI Agents for Industrial & Energy Companies",
    metaDescription:
      "AI agents for mid-size industrial and energy companies: quote requests, order processing and service tickets, connected to your ERP and CRM. Free 30-minute intro call.",
    eyebrow: "For industrial and energy companies · 50–500 people",
    h1: "AI agents that take the paperwork off your sales and service teams",
    sub: "Quote requests, order confirmations, service tickets and weekly reports take hours in every mid-size industrial company. We connect an AI agent to your inbox, ERP and CRM. It prepares the work; your people check and approve it.",
    cta: "Book a free intro call",
    cta2: "Send a message",
    ctaNote: "30 minutes · one real process · honest yes or no",
    jobsTitle: "What the agent takes off your team",
    jobs: [
      { title: "Prepares quotes and answers enquiries", text: "Reads each request from the form or inbox, pulls article data and prices from your system and drafts the quote or reply. Sales checks it and sends." },
      { title: "Processes orders and documents", text: "Reads purchase orders, delivery notes and invoices from PDF or email and enters them into your ERP. Unclear cases go to a person." },
      { title: "Sorts service and spare-parts requests", text: "Recognises the customer, the machine and the urgency, opens the ticket and suggests the next step to your service team." },
      { title: "Reports every week", text: "A short summary of open quotes, orders and service cases, in plain language, from your own data." },
    ],
    caseTitle: "Work we can show",
    cases: [
      {
        tag: "PRÜFTECHNIK (Fluke) · industrial condition monitoring",
        title: "Three years of website operations for an industrial brand",
        text: "From 2022 to 2025 we handled most website updates for PRÜFTECHNIK, the condition-monitoring brand of Fluke, in German and English.",
        href: "/portfolio/pruftechnik-fluke",
        link: "See the project",
      },
      {
        tag: "DigiDog · our own company",
        title: "A company run by AI agents",
        text: "CRM, tasks, reporting and lead handling run on one AI-operated system instead of more than 12 separate tools.",
        metric: "$1,200 → $210",
        metricLabel: "tool costs per month",
        href: "/portfolio/digidog-ai-operations-system",
        link: "See the system",
      },
    ],
    stepsTitle: "How we start",
    steps: [
      { tag: "Free · 30 min", title: "Intro call", text: "You show us one process, for example how a quote request travels from the inbox to a sent quote. We tell you plainly whether an agent fits." },
      { tag: "Fixed price · 2–3 weeks", title: "AI agent pilot", text: "One agent connected to your real tools, working on your own requests. You decide on more after you have seen it work." },
      { tag: "Monthly", title: "Run and improve", text: "We keep the agent running, watch the results and add the next process when the first one pays off." },
    ],
    systemsTitle: "Systems we connect",
    systems: ["ERP via API", "HubSpot", "Email", "Website forms", "PDF documents", "Make", "n8n", "Claude", "ChatGPT", "Local models"],
    systemsNote: "SAP, Microsoft Dynamics, a sector ERP or your own software? We check the interface in the intro call and tell you plainly what is possible.",
    faqTitle: "Questions managing directors ask",
    faqs: [
      { q: "Where does our data go?", a: "You decide. You choose which data the agent may read, which AI provider is used (Claude, ChatGPT or a local model on your own hardware) and in which region it runs." },
      { q: "Does the agent act on its own?", a: "No. It prepares quotes, entries and replies; your team approves what goes to a customer or into the ERP." },
      { q: "Have you built agents for industrial companies before?", a: "Not yet. Our industrial work so far is website operations for PRÜFTECHNIK (Fluke) and Technik Hoffmann. Our AI agent projects are in other sectors and in our own company. That is why we start with one process and a fixed-price pilot." },
      { q: "What does a pilot cost?", a: "A fixed price for one process, agreed after the intro call. The call itself is free." },
    ],
    closingTitle: "Show us one process. We'll tell you if an agent fits.",
    closingText: "30 minutes with Erik, the founder. You get a clear answer on what an agent could take over in your company, and what it should not.",
  },
  {
    key: "industrial-energy",
    lang: "de",
    slug: "industrie-energie",
    path: "/de/fuer/industrie-energie",
    alt: "/for/industrial-companies",
    metaTitle: "KI-Agenten für Industrie & Energie im Mittelstand",
    metaDescription:
      "KI-Agenten für mittelständische Industrie- und Energieunternehmen: Angebotsanfragen, Auftragsabwicklung und Serviceanfragen, verbunden mit ERP und CRM. Kostenloses Erstgespräch, 30 Minuten.",
    eyebrow: "Für Industrie- und Energieunternehmen · 50–500 Mitarbeitende",
    h1: "KI-Agenten, die Vertrieb und Service den Papierkram abnehmen",
    sub: "Angebotsanfragen, Auftragsbestätigungen, Serviceanfragen und Wochenberichte kosten in jedem mittelständischen Industriebetrieb Stunden. Wir verbinden einen KI-Agenten mit Ihrem Postfach, Ihrem ERP und Ihrem CRM. Er bereitet die Arbeit vor, Ihr Team prüft und gibt frei.",
    cta: "Kostenloses Erstgespräch buchen",
    cta2: "Nachricht senden",
    ctaNote: "30 Minuten · ein echter Prozess · ehrliches Ja oder Nein",
    jobsTitle: "Was der Agent Ihrem Team abnimmt",
    jobs: [
      { title: "Bereitet Angebote und Antworten vor", text: "Liest jede Anfrage aus Formular oder Postfach, holt Artikeldaten und Preise aus Ihrem System und entwirft Angebot oder Antwort. Der Vertrieb prüft und sendet." },
      { title: "Erfasst Aufträge und Belege", text: "Liest Bestellungen, Lieferscheine und Rechnungen aus PDF oder E-Mail und trägt sie in Ihr ERP ein. Unklare Fälle gehen an einen Menschen." },
      { title: "Sortiert Service- und Ersatzteilanfragen", text: "Erkennt Kunde, Maschine und Dringlichkeit, legt das Ticket an und schlägt Ihrem Service den nächsten Schritt vor." },
      { title: "Berichtet jede Woche", text: "Eine kurze Übersicht zu offenen Angeboten, Aufträgen und Servicefällen, verständlich formuliert, aus Ihren eigenen Daten." },
    ],
    caseTitle: "Arbeit, die wir zeigen können",
    cases: [
      {
        tag: "PRÜFTECHNIK (Fluke) · Zustandsüberwachung für die Industrie",
        title: "Drei Jahre Website-Betrieb für eine Industriemarke",
        text: "Von 2022 bis 2025 haben wir den Großteil der Website-Pflege für PRÜFTECHNIK übernommen, die Condition-Monitoring-Marke von Fluke, auf Deutsch und Englisch.",
        href: "/de/portfolio",
        link: "Zum Portfolio",
      },
      {
        tag: "DigiDog · unser eigenes Unternehmen",
        title: "Ein Unternehmen, das mit KI-Agenten arbeitet",
        text: "CRM, Aufgaben, Reporting und Lead-Bearbeitung laufen auf einem KI-betriebenen System statt auf mehr als 12 einzelnen Tools.",
        metric: "1.200 $ → 210 $",
        metricLabel: "Tool-Kosten pro Monat",
        href: "/de/portfolio",
        link: "Zum Portfolio",
      },
    ],
    stepsTitle: "So starten wir",
    steps: [
      { tag: "Kostenlos · 30 Min.", title: "Erstgespräch", text: "Sie zeigen uns einen Prozess, zum Beispiel den Weg einer Angebotsanfrage vom Postfach bis zum versendeten Angebot. Wir sagen Ihnen klar, ob ein Agent passt." },
      { tag: "Festpreis · 2–3 Wochen", title: "KI-Agent als Pilot", text: "Ein Agent, verbunden mit Ihren echten Systemen, arbeitet mit Ihren eigenen Anfragen. Über mehr entscheiden Sie, wenn Sie ihn arbeiten gesehen haben." },
      { tag: "Monatlich", title: "Betreiben und verbessern", text: "Wir halten den Agenten am Laufen, beobachten die Ergebnisse und nehmen den nächsten Prozess dazu, wenn sich der erste rechnet." },
    ],
    systemsTitle: "Systeme, die wir verbinden",
    systems: ["ERP über API", "HubSpot", "E-Mail", "Website-Formulare", "PDF-Belege", "Make", "n8n", "Claude", "ChatGPT", "Lokale Modelle"],
    systemsNote: "SAP, Microsoft Dynamics, ein Branchen-ERP oder eigene Software? Wir prüfen die Schnittstelle im Erstgespräch und sagen Ihnen klar, was möglich ist.",
    faqTitle: "Fragen von Geschäftsführern",
    faqs: [
      { q: "Wohin gehen unsere Daten?", a: "Das entscheiden Sie. Sie legen fest, welche Daten der Agent lesen darf, welcher KI-Anbieter genutzt wird (Claude, ChatGPT oder ein lokales Modell auf Ihrer eigenen Hardware) und in welcher Region er läuft." },
      { q: "Handelt der Agent selbstständig?", a: "Nein. Er bereitet Angebote, Einträge und Antworten vor; Ihr Team gibt frei, was an Kunden geht oder ins ERP kommt." },
      { q: "Haben Sie schon Agenten für Industrieunternehmen gebaut?", a: "Noch nicht. Unsere Industriearbeit ist bisher der Website-Betrieb für PRÜFTECHNIK (Fluke) und Technik Hoffmann. Unsere KI-Agenten-Projekte stammen aus anderen Branchen und aus unserem eigenen Unternehmen. Deshalb starten wir mit einem Prozess und einem Piloten zum Festpreis." },
      { q: "Was kostet ein Pilot?", a: "Ein Festpreis für einen Prozess, den wir nach dem Erstgespräch vereinbaren. Das Gespräch selbst ist kostenlos." },
    ],
    closingTitle: "Zeigen Sie uns einen Prozess. Wir sagen Ihnen, ob ein Agent passt.",
    closingText: "30 Minuten mit Erik, dem Gründer. Sie erhalten eine klare Antwort, was ein Agent in Ihrem Unternehmen übernehmen kann und was nicht.",
  },
];

export const getLanding = (lang: "en" | "de", slug: string) => landings.find((l) => l.lang === lang && l.slug === slug);
