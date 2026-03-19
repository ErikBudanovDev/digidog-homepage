/* ─────────────────────────────────────────────
 * ENGLISH (EN) — translations
 * ───────────────────────────────────────────── */

import type { de } from "./de";

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : T[K] extends object ? DeepStringify<T[K]> : T[K];
};

export const en: DeepStringify<typeof de> = {
  /* ── shared / common ── */
  common: {
    services: "Services",
    learnMore: "Learn More",
    viewProject: "View Project",
    viewAllProjects: "View All Projects",
    startProject: "Start Project",
    startProjectNow: "Start Project Now",
    discussProject: "Discuss Project",
    theResult: "The Result",
    technologies: "Technologies",
    ourProcess: "Our Process",
    ourTechStack: "Our Tech Stack",
    selectedProjects: "Featured Projects",
    readMore: "Read More",
  },

  /* ── cards component ── */
  cards: {
    viewProject: "View Project",
  },

  /* ── AI Solutions page ── */
  ai: {
    breadcrumbService: "Services",
    breadcrumbPage: "AI Solutions",
    heroBadge: "AI Solutions & Automation",
    heroTitle1: "Artificial Intelligence!!",
    heroTitle2: "for Your Business!!",
    heroDescription:
      "From intelligent chatbots and predictive analytics to computer vision — we develop custom AI solutions that automate your processes and accelerate your growth.",
    heroCtaPrimary: "Start AI Consulting",
    heroCtaSecondary: "Learn More",

    deliverablesBadge: "Our AI Services",
    deliverablesTitle1: "Intelligent Solutions ",
    deliverablesTitle2: "for Every Industry",
    deliverablesSubtitle:
      "From strategy consulting and model development to integration — we guide you through every step of your AI journey.",

    automationBadge: "Smart Automation",
    automationTitle1: "We Build Systems ",
    automationTitle2: "That AI Can Use",
    automationSubtitle:
      "Our AI agents automatically orchestrate complex workflows — from data collection and intelligent processing to action in your systems.",
    automationFeature1Title: "Multi-Step Workflows",
    automationFeature1Text: "Automatically orchestrate complex processes",
    automationFeature2Title: "Real-Time Processing",
    automationFeature2Text: "Instant reaction to events and data",
    automationFeature3Title: "Smart Decision Making",
    automationFeature3Text: "AI-driven decisions at every step",

    showcaseBadge: "Success Stories",
    showcaseTitle1: "Intelligent Systems ",
    showcaseTitle2: "in Practice",
    showcaseSubtitle:
      "Real AI solutions we've developed for our clients — from e-commerce to freelancer platforms.",
    showcaseResults: "Results",
    showcaseCta: "Ready for your own AI solution?",
    showcaseCtaButton: "Discuss Project",

    system1Desc:
      "Automated workflow from customer inquiry to finished sketch with AI validation.",
    system1Steps: ["Customer Inquiry", "GPT Analysis", "Generate Sketch", "Validation", "Feedback Loop"],
    system1Details: ["Email or form", "Understand requirements", "Create AI design", "Quality check", "Repeat if needed"],
    system1Results: ["85% faster design time", "Automatic validation", "Customer satisfaction +40%"],

    system2Desc:
      "AI searches multiple job portals, analyzes fit, and automatically submits applications.",
    system2Steps: ["Job Scraping", "AI Matching", "Proposal Generator", "Auto-Submit", "Tracking"],
    system2Details: ["Multiple sources", "Skills analysis", "Personalized", "Send directly", "Measure success rate"],
    system2Results: ["10x more applications", "75% matching accuracy", "Automated follow-ups"],

    system3Title: "CRM MCP for Claude",
    system3Desc:
      "Claude integration enables natural language interaction with your CRM — manage accounts, contacts, and deals via chat.",
    system3Steps: ["Natural Language", "Claude MCP", "CRM Actions", "Real-Time Sync", "Smart Insights"],
    system3Details: ["Simple commands", "Intelligent interface", "Accounts & Deals", "Instant updates", "AI analytics"],
    system3Results: ["Natural CRM interaction", "50% faster updates", "Claude-powered Insights"],

    showcase1Title: "AI That Understands Your Customers",
    showcase1Text:
      "Our NLP solutions analyze customer inquiries, feedback, and documents in real time — delivering actionable insights to your team instantly.",
    showcase1Bullets: [
      "Chatbots with natural dialogue understanding",
      "Automatic sentiment and intent analysis",
      "Multilingual processing (DE/EN/TR)",
    ],
    showcase2Title: "Turning Data into Decisions",
    showcase2Text:
      "With predictive analytics and machine learning, we detect patterns in your data before they become obvious — enabling proactive business decisions.",
    showcase2Bullets: [
      "Revenue and demand forecasting",
      "Customer segmentation and churn prediction",
      "Automatic anomaly detection",
    ],
    showcase3Title: "Seeing What Humans Miss",
    showcase3Text:
      "Computer vision detects defects, classifies objects, and automates visual inspection processes — faster and more precise than any manual review.",
    showcase3Bullets: [
      "Real-time image recognition and classification",
      "Quality control in production",
      "OCR and automatic document processing",
    ],

    processBadge: "Our AI Process",
    processTitle1: "From Use Case to ",
    processTitle2: "AI Product",
    processSubtitle: "Five proven steps for successful AI projects.",

    techBadge: "Technologies",
    techTitle: "Our AI Stack",
    techSubtitle:
      "We rely on leading AI frameworks and cloud infrastructure for robust, scalable solutions.",

    portfolioBadge: "Featured AI Projects",
    portfolioTitle: "Our AI Portfolio",
    portfolioSubtitle: "A glimpse into our AI and machine learning projects.",
    portfolioLink: "View All Projects",
    portfolioProjectLink: "View Project",

    resultTitle: "AI Results That Matter",
    resultText:
      "Our AI solutions deliver measurable results — from reduced operating costs to accelerated decision-making processes.",
    resultStat1: "Automation",
    resultStat2: "Faster Analysis",
    resultStat3: "Accuracy",
    resultStat4: "Availability",
    resultCta: "Start AI Project",
  },

  /* ── Web Design page ── */
  web: {
    breadcrumbService: "Services",
    breadcrumbPage: "Web Design & Development",
    heroBadge: "Web Design & Full-Stack Development",
    heroTitle1: "Websites That Inspire!!",
    heroTitle2: "and Convert!!",
    heroDescription:
      "From the first sketch to ongoing operations — we design and develop custom websites and web applications that take your business to the next level.",
    heroCtaPrimary: "Start Project",
    heroCtaSecondary: "Learn More",

    deliverablesBadge: "What We Deliver",
    deliverablesTitle1: "Everything from ",
    deliverablesTitle2: "One Source",
    deliverablesSubtitle:
      "From design to development to hosting — we cover the entire lifecycle of your digital project.",

    showcase1Title: "Design That Strengthens Your Brand",
    showcase1Text:
      "Every project starts with a deep understanding of your brand. We create visual identities that don't just look great but build trust and turn visitors into customers.",
    showcase1Bullets: [
      "Custom design concepts instead of templates",
      "Conversion-oriented layouts",
      "Consistent brand experience",
    ],
    showcase2Title: "Technology That Scales",
    showcase2Text:
      "Behind every great design is solid technology. We use cutting-edge technologies to build performant, secure, and future-proof applications.",
    showcase2Bullets: [
      "React, Next.js & TypeScript",
      "Server-side APIs & databases",
      "CI/CD pipelines & automated testing",
    ],
    showcase3Title: "Performance That Convinces",
    showcase3Text:
      "Speed is not a luxury — it's a necessity. We optimize every page for lightning-fast load times and ensure your website ranks at the top of Google.",
    showcase3Bullets: [
      "Core Web Vitals optimization",
      "Technical SEO on-page & off-page",
      "CDN, caching & image optimization",
    ],

    processBadge: "Our Process",
    processTitle1: "From Idea to ",
    processTitle2: "Result",
    processSubtitle: "Five clearly defined phases for maximum project success.",

    techBadge: "Technologies",
    techTitle: "Our Tech Stack",
    techSubtitle:
      "We rely on proven, modern technologies for maximum performance and future-proofing.",

    portfolioBadge: "Featured Projects",
    portfolioTitle: "Our Portfolio",
    portfolioSubtitle: "A glimpse into our web design & development projects.",
    portfolioLink: "View All Projects",
    portfolioProjectLink: "View Project",

    project1Title: "Miso Supermarket & Bakery",
    project1Desc:
      "Modern web design and digital solution for a local supermarket with integrated online shop and ordering system.",
    project2Title: "TechVision Dashboard",
    project2Desc:
      "Complete redesign of an enterprise dashboard with modern UI/UX design and responsive layout.",
    project3Title: "Bella Cucina Restaurant",
    project3Desc:
      "Elegant website with online reservations and digital menu for an upscale Italian restaurant.",
    project4Title: "Luxe Fashion Online Shop",
    project4Desc:
      "High-end e-commerce solution with personalized recommendations and seamless checkout experience.",

    resultTitle: "The Result",
    resultText:
      "A fast, secure, and scalable digital platform that supports your business long-term — with measurable results that convince.",
    resultStat1: "Uptime",
    resultStat2: "Load Time",
    resultStat3: "Lighthouse",
    resultStat4: "Support",
    resultCta: "Start Project Now",
  },

  /* ── Custom Software page ── */
  software: {
    breadcrumbService: "Services",
    breadcrumbPage: "Custom Software",
    heroBadge: "Software & Integrations",
    heroTitle1: "Software That Connects!!",
    heroTitle2: "Your Processes!!",
    heroDescription:
      "From internal tools and API integrations to complete SaaS platforms — we develop custom software that connects your systems and makes your team more productive.",
    heroCtaPrimary: "Discuss Project",
    heroCtaSecondary: "Learn More",

    deliverablesBadge: "Our Services",
    deliverablesTitle1: "Technical Excellence ",
    deliverablesTitle2: "Tailored to You",
    deliverablesSubtitle:
      "From requirements analysis to architecture to go-live — we deliver software that truly works.",

    del1Title: "Custom Software",
    del1Text: "Tailored applications built precisely for your business logic and workflows.",
    del2Title: "API & System Integration",
    del2Text: "Seamless connection to third-party systems, CRMs, ERPs, and existing infrastructure.",
    del3Title: "Workflow Automation",
    del3Text: "Automation of recurring processes — from data reconciliation to complex business rules.",
    del4Title: "Dashboards & Reporting",
    del4Text: "Real-time dashboards and reporting systems for data-driven decisions at all levels.",
    del5Title: "SaaS & MVP Development",
    del5Text: "From concept to market-ready product — rapid prototypes and scalable SaaS platforms.",
    del6Title: "Database Architecture",
    del6Text: "Performant, scalable database designs — from SQL and NoSQL to real-time databases.",
    del7Title: "Security & Compliance",
    del7Text: "Enterprise security, role-based access control, and GDPR-compliant data management.",
    del8Title: "Maintenance & Evolution",
    del8Text: "Continuous development, monitoring, and technical support for long-term success.",

    step1Title: "Discovery & Requirements",
    step1Text: "In-depth analysis of your business processes, bottlenecks, and technical requirements.",
    step2Title: "Architecture & Planning",
    step2Text: "Technical architecture, data modeling, and detailed project planning with clear milestones.",
    step3Title: "Agile Development",
    step3Text: "Iterative development in sprints with regular demos and close feedback loops.",
    step4Title: "Integration & QA",
    step4Text: "System integration, automated testing, security audits, and staging deployments.",
    step5Title: "Launch & Scaling",
    step5Text: "Go-live, performance monitoring, and continuous optimization for growing demands.",

    showcase1Title: "Connecting Systems Seamlessly",
    showcase1Text:
      "Your existing tools — CRM, ERP, accounting, email — often work in isolation. We create a unified data bridge that synchronizes all systems.",
    showcase1Bullets: [
      "REST & GraphQL API development",
      "Bidirectional data synchronization",
      "Webhooks and event-driven architecture",
    ],
    showcase2Title: "Automating Processes",
    showcase2Text:
      "Manual data entry, document processing, and recurring workflows cost time and money. Our automation solutions eliminate bottlenecks.",
    showcase2Bullets: [
      "Workflow orchestration and task queues",
      "Automatic data validation and cleansing",
      "Rule-based and AI-powered decisions",
    ],
    showcase3Title: "Scalable Architectures",
    showcase3Text:
      "From microservices and container orchestration to cloud-native deployments — we build software that grows with your business.",
    showcase3Bullets: [
      "Microservice and event-driven architecture",
      "Container deployments with Docker & Kubernetes",
      "Auto-scaling and load balancing",
    ],

    processBadge: "Our Process",
    processTitle1: "From Idea to ",
    processTitle2: "Finished System",
    processSubtitle: "Five proven steps for successful software projects.",

    techBadge: "Technologies",
    techTitle: "Our Tech Stack",
    techSubtitle:
      "We rely on proven backend technologies and cloud infrastructure for robust, maintainable systems.",

    portfolioBadge: "Featured Projects",
    portfolioTitle: "Our Software Portfolio",
    portfolioSubtitle: "A glimpse into our software and integration projects.",
    portfolioLink: "View All Projects",
    portfolioProjectLink: "View Project",

    project1Title: "Enterprise ERP Integration",
    project1Desc:
      "Complete integration of a legacy ERP system with modern cloud services — including real-time data synchronization and custom API layer.",
    project2Title: "Logistics Management Platform",
    project2Desc:
      "Custom logistics platform with real-time tracking, automatic route optimization, and integrated warehouse management.",
    project3Title: "Custom CRM for Sales",
    project3Desc:
      "Industry-specific CRM system with pipeline management, lead scoring, and seamless email integration.",
    project4Title: "DevOps & CI/CD Pipeline",
    project4Desc:
      "Automated deployment pipeline with infrastructure-as-code, container orchestration, and comprehensive monitoring.",

    resultTitle: "The Result",
    resultText:
      "Efficient, connected systems that eliminate bottlenecks, reduce manual work, and enable your growth — with measurable results.",
    resultStat1: "Less Manual Work",
    resultStat2: "Uptime",
    resultStat3: "Faster",
    resultStat4: "Integrated",
    resultCta: "Start Project Now",
  },

  /* ── AI Integration page ── */
  aiIntegration: {
    /* SEO */
    seoTitle: "AI Integration & Workflow Automation Agency",
    seoDescription:
      "We integrate your operations, data, and workflows into AI. Access reports, automate tasks, manage operations, and make decisions through natural conversation with Claude or GPT.",

    /* Hero */
    heroBadge: "AI Integration Agency",
    heroTitle1: "Talk to Your",
    heroTitle2: "Business",
    heroTitle3: "With AI",
    heroDescription:
      "Integrate your operations, data, and workflows into your",
    heroDescHighlight: "Claude or GPT Chat",
    heroDescEnd:
      ". Access reports, automate tasks, manage operations, and make decisions through natural conversation.",
    heroCta: "Book Free Strategy Call",
    heroCtaSecondary: "Explore Services",
    heroKpi1Value: "30–60%",
    heroKpi1Label: "Repetitive work automated",
    heroKpi2Value: "40%",
    heroKpi2Label: "Average cost reduction",
    heroKpi3Value: "3x",
    heroKpi3Label: "Faster operations",
    heroHubCaption: "AI connects all your business systems into one intelligent interface",

    /* Hub nodes */
    hubCrm: "CRM",
    hubEmail: "Email",
    hubSupport: "Support",
    hubAnalytics: "Analytics",
    hubTasks: "Tasks",
    hubFinance: "Finance",
    hubOperations: "Operations",

    /* Core Idea */
    coreIdeaBadge: "The Core Idea",
    coreIdeaTitle1: "Your Entire Business.",
    coreIdeaTitle2: "One AI Conversation.",
    coreIdeaDescription:
      "AI connects your business tools and data sources into one intelligent system. Instead of opening dashboards and switching between platforms, you simply ask. The AI retrieves the information from your systems instantly.",
    corePoint1: "No more switching between platforms",
    corePoint2: "No manual reporting",
    corePoint3: "Real-time business visibility",
    corePoint4: "AI-powered operations",

    /* Example questions */
    eq1: "How much revenue did we generate this week?",
    eq2: "Which clients need follow-up?",
    eq3: "What tasks are still pending?",
    eq4: "What tasks were done for this project?",
    eq5: "Which marketing campaigns generated leads?",
    eq6: "Are there unresolved customer tickets?",
    eqAnswer: "AI retrieves answers from your connected systems instantly.",

    /* What We Do */
    whatWeDoBadge: "What We Do",
    whatWeDoTitle1: "An AI That",
    whatWeDoTitle2: "Understands Your Business",
    whatWeDoDescription:
      "All your tools orbit around one intelligent AI. Ask it anything about your business and get real answers.",

    /* Chat interface */
    chatTitle: "AI Business Assistant",
    chatOnline: "Online",
    chatUserMessage: "What goals did we achieve last quarter?",
    chatPulling: "Pulling data from your connected tools...",
    chatResponse: "Here are your Q4 results across all connected platforms:",
    chatDataConfirm: "Data pulled from HubSpot, Asana, Google Sheets & Ahrefs",
    chatInputPlaceholder: "Ask about your business...",
    chatRevenueGrowth: "Revenue Growth",
    chatNewClients: "New Clients Acquired",
    chatTasksCompleted: "Tasks Completed",
    chatSatisfaction: "Customer Satisfaction",

    /* Data sources */
    dsHubspot: "HubSpot CRM",
    dsSheets: "Google Sheets",
    dsAsana: "Asana",
    dsAhrefs: "Ahrefs",

    /* Case Studies */
    csBadge: "Real Business Examples",
    csTitle1: "Real Businesses",
    csTitle2: "Running on AI Systems",
    csDescription: "See how businesses across industries use AI to transform their daily operations.",
    csCta: "Want to see how AI can transform your business?",
    csCtaButton: "Discuss Your Use Case",
    csAnswerLine: "AI retrieves answers from your connected systems instantly.",
    csTryItOut: "Try it out",
    csMcpServerUrl: "MCP Server URL",
    csCopy: "Copy",
    csCopied: "Copied!",

    /* Case study 1 */
    cs1Title: "AI Operations System for Be Original Tours",
    cs1Subtitle: "Tour Operations",
    cs1Description:
      "Tour operations fully integrated with AI. Managers can ask the system about weekly revenue, customer complaints, tour performance, and website traffic.",
    cs1Outcome: "Centralized operational intelligence",
    cs1Q1: "Create a main task to integrate the design of the project",
    cs1Q2: "Check which client invoices are still unpaid",
    cs1Q3: "What tasks are still pending for the Berlin tour?",
    cs1Q4: "Summarize last week's tour performance",
    cs1Q5: "Which campaigns generated the most bookings?",
    cs1Q6: "Are there unresolved customer complaints?",

    /* Case study 2 */
    cs2Title: "AI CRM Account Manager",
    cs2Subtitle: "Sales & CRM",
    cs2Description:
      "AI acts as an account manager — creating clients, managing deals, updating pipelines, tracking communication, generating follow-ups, and monitoring emails.",
    cs2Outcome: "Sales teams spend less time updating systems and more time closing deals",
    cs2Q1: "Create a new client profile for Acme Corp",
    cs2Q2: "Move the Johnson deal to negotiation stage",
    cs2Q3: "Draft a follow-up email for pending proposals",
    cs2Q4: "Which deals haven't been updated this week?",
    cs2Q5: "Show all communication with client XYZ",

    /* Case study 3 */
    cs3Title: "AI Service Desk for a Digital Agency",
    cs3Subtitle: "Client Coordination",
    cs3Description:
      "AI coordinates client requests across Email, Asana, development environments, and CRM — reading emails, creating tasks, routing projects, and tracking completion.",
    cs3Outcome: "70-80% of operational coordination automated",
    cs3Q1: "Create an Asana task from the latest client email",
    cs3Q2: "Route the new landing page request to development",
    cs3Q3: "What projects are waiting for client approval?",
    cs3Q4: "Track completion status of all active projects",

    /* Process */
    processBadge: "Our Process",
    processTitle1: "How Your Business Becomes",
    processTitle2: "AI-Powered",
    processDescription:
      "A proven five-phase process that transforms your operations step by step — from analysis to a fully connected AI system.",

    /* Process steps */
    proc1Title: "AI Opportunity Deep Dive",
    proc1Short: "Deep Dive",
    proc1Desc:
      "We start with a deep operational audit of your business. This includes understanding your workflows, data sources, internal systems, and decision processes.",
    proc1Details:
      "We talk with stakeholders and identify where AI can create the most value by automating tasks, connecting data, and simplifying operations. The goal is to understand how your business actually runs before introducing AI.",

    proc2Title: "AI Architecture Design",
    proc2Short: "Architecture",
    proc2Desc:
      "Once we understand your business processes, we design the AI system architecture. This defines how AI will connect to your tools, databases, and operational workflows.",
    proc2Details:
      "We plan how your systems will be integrated into a unified AI layer and determine which data sources will become part of the AI environment. This creates the blueprint for your AI-powered operational system.",

    proc3Title: "MCP Integration (AI Foundation)",
    proc3Short: "MCP Layer",
    proc3Desc:
      "We build the first operational AI layer — your Model Context Protocol (MCP). This connects your core systems, databases, and tools into a single AI environment.",
    proc3Details:
      "The MCP acts as the bridge between AI and your business infrastructure. At this stage, the AI can already access and understand key parts of your business data.",

    proc4Title: "MVP AI Business Interface",
    proc4Short: "MVP Launch",
    proc4Desc:
      "Once the MCP is in place, we launch a Minimum Viable AI System (MVP). This integrates one part of your business into the AI interface so you can immediately start interacting with it.",
    proc4Details:
      "This allows your team to experience AI integration early and shape how the system evolves.",
    proc4Bullet1: "Generate reports through chat",
    proc4Bullet2: "Access operational data instantly",
    proc4Bullet3: "Monitor performance metrics",
    proc4Bullet4: "Ask questions about your business",

    proc5Title: "Progressive AI Integration",
    proc5Short: "Scale Up",
    proc5Desc:
      "After the MVP launch, we continue expanding the AI system by integrating more business functions. Each new integration increases the capabilities of your AI system.",
    proc5Bullet1: "CRM",
    proc5Bullet2: "Support tickets",
    proc5Bullet3: "Marketing analytics",
    proc5Bullet4: "Task management",
    proc5Bullet5: "Financial reporting",
    proc5Bullet6: "Operational data",

    /* Outcomes */
    outcome1: "Centralized operational visibility",
    outcome2: "Faster decision making",
    outcome3: "Less manual work",
    outcome4: "Automated reporting",
    outcome5: "Connected business systems",

    /* Business Types */
    btBadge: "Who We Help",
    btTitle1: "Types of Businesses",
    btTitle2: "We Help",
    btDescription: "Any business with clients, data, operations, and workflows can benefit from AI integration.",

    bt1Label: "Digital Agencies",
    bt1Desc: "Automate client workflows, project routing & reporting",
    bt2Label: "Customer Support Centers",
    bt2Desc: "AI-powered ticket triage, responses & escalation",
    bt3Label: "Logistics Companies",
    bt3Desc: "Route optimization, shipment tracking & dispatch AI",
    bt4Label: "Home Care / Senior Care",
    bt4Desc: "Scheduling, caregiver matching & compliance tracking",
    bt5Label: "Recruitment Agencies",
    bt5Desc: "Candidate screening, outreach & pipeline management",
    bt6Label: "Real Estate Brokerages",
    bt6Desc: "Lead nurturing, listing management & market analysis",
    bt7Label: "Professional Services",
    bt7Desc: "Document automation, billing & client communication",
    bt8Label: "Tour Operators & Travel",
    bt8Desc: "Booking management, itinerary planning & guest comms",
    bt9Label: "Managed IT Providers",
    bt9Desc: "Incident response, monitoring alerts & SLA tracking",
    bt10Label: "Property Management",
    bt10Desc: "Tenant communication, maintenance requests & leasing",

    /* CTA Banner */
    ctaTitle1: "Don't leave automation to chance —",
    ctaTitle2: "leave it to the experts",
    ctaDescription: "We handle the complexity so you can focus on your business. Book a consultation and let us build your AI-powered operations.",
    ctaButton: "Book AI Integration Call",

    /* Services link */
    servicesLink: "Explore Services",
  },
} as const;
