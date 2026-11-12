"use client";
/* ─────────────────────────────────────────────
 * AI integration page v2 (Nov 2026): model rotator, AI operations
 * dashboard with agent bubbles, "world is changing" and team sections.
 * ───────────────────────────────────────────── */
import { motion } from "motion/react";
import {
  TrendingUp, Megaphone, Headphones, BarChart3, CalendarCheck,
  ArrowRight, BookOpen, Palette, Code2, BadgeCheck, ArrowUpRight, FlaskConical, Filter, Rocket,
} from "lucide-react";
import { colors, fonts } from "@/components/ui/brand";
import { SectionContainer, SectionBadge } from "@/components/ui/section";
import { PrimaryButton } from "@/components/ui/buttons";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StarField } from "@/components/CosmicElements";
import { useTranslation } from "@/i18n/i18n-context";
import { getLocalizedRoute } from "@/i18n/routes";
import erikPhoto from "figma:asset/c28a01d5ca35b1e207da7537c250359543a3aa75.png";
const erikPhotoSrc = erikPhoto as unknown as string;

const UPWORK = "https://www.upwork.com/freelancers/erikbudanov";

/* ── Rotating model name. All names are in the HTML (for search engines
 *    and AI crawlers); CSS shows one at a time. ── */
const ROTATOR_CSS = `
.mr{display:inline-grid;vertical-align:top}
.mr>span{grid-area:1/1;opacity:0;animation:mrCycle 10s infinite;white-space:nowrap}
.mr>span:nth-child(2){animation-delay:2.5s}.mr>span:nth-child(3){animation-delay:5s}.mr>span:nth-child(4){animation-delay:7.5s}
@keyframes mrCycle{0%{opacity:0;transform:translateY(30%)}4%,22%{opacity:1;transform:none}26%,100%{opacity:0;transform:translateY(-30%)}}
@media (prefers-reduced-motion:reduce){.mr>span{animation:none}.mr>span:first-child{opacity:1}}
`;

/** Render once, outside the heading, so the CSS never ends up in the <h1> text. */
export function ModelRotatorStyle() {
  return <style>{ROTATOR_CSS}</style>;
}

/** Each word appears exactly once in the HTML; the hidden separator keeps the heading text readable for crawlers. */
export function ModelRotator({ words }: { words: string[] }) {
  return (
    <span className="mr">
      {words.map((w, i) => (
        <span
          key={w}
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg, #ffffff 0%, #7dd3fc 100%)" }}
        >
          {w}
          {i < words.length - 1 && <span className="sr-only">, </span>}
        </span>
      ))}
    </span>
  );
}

/* ── Copy ── */
const COPY = {
  EN: {
    dashBadge: "The core idea",
    dashTitle1: "Your entire business.",
    dashTitle2: "One AI operations dashboard.",
    dashText:
      "We set up AI agents for exactly your business. Each one is connected to your real tools, does one job well and reports back. You see what they did, and you can ask them anything in plain language.",
    outcomes: [
      "Every enquiry gets an answer within minutes, also at night",
      "More visibility: your website, Google profile and posts stay fresh",
      "Weekly reports arrive without anyone building them",
      "Bookings, emails and invoices move on without copy and paste",
    ],
    seeTitle: "See it working",
    see: [
      { label: "Workshop: from idea to a live app with Claude", href: "/blog/building-with-ai-claude-workshop" },
      { label: "Report: what Claude Code does inside a company", href: "/blog/claude-code-for-business" },
      { label: "Guide: Claude Skills vs. MCP servers", href: "/blog/claude-skills-vs-mcp-servers" },
    ],
    cta: "Start a conversation",
    center: "AI operations",
    bubbles: [
      { t: "Sales agent", s: "Answers and follows up every lead" },
      { t: "Marketing agent", s: "Keeps you visible" },
      { t: "Support agent", s: "Replies in minutes" },
      { t: "Reporting agent", s: "" },
      { t: "Booking agent", s: "" },
    ],
    worldBadge: "Why now",
    worldTitle1: "The world changes every day.",
    worldTitle2: "We know which way it is moving.",
    worldText:
      "New models and tools arrive every week. We test them on our own company first and bring only what works into your business. The same kind of technology brought you to this page.",
    timeline: [
      { k: "Yesterday", v: "AI answered questions in a chat window." },
      { k: "Today", v: "AI agents use your tools: CRM, email, bookings, website." },
      { k: "Next", v: "Agents run whole processes. A person approves what matters." },
    ],
    worldCards: [
      { t: "Tested on us first", s: "Every tool we bring you already runs in our own company." },
      { t: "Only what pays off", s: "We say no to trends that don't save you time or money." },
      { t: "You stay ahead", s: "When a better model or tool appears, your agents get it." },
    ],
    teamBadge: "Our team",
    teamTitle1: "One engineer.",
    teamTitle2: "A team of AI agents.",
    erikRole: "Founder · systems engineer",
    agents: [
      { t: "Marketing agent", s: "Claude" },
      { t: "Design agent", s: "Claude" },
      { t: "Engineering agent", s: "Claude Code" },
    ],
    teamText: "Supercharge your business with the latest technology.",
    teamSub:
      "Erik plans every project and checks every result. The agents do the research, writing, design drafts and code, so you get a full team's speed with one person responsible.",
    proof: ["Top Rated Plus on Upwork", "100% Job Success", "54 jobs · 7,830 hours"],
    proofLink: "View Upwork profile",
  },
  DE: {
    dashBadge: "Die Kernidee",
    dashTitle1: "Ihr ganzes Unternehmen.",
    dashTitle2: "Ein KI-Operations-Dashboard.",
    dashText:
      "Wir richten KI-Agenten genau für Ihr Unternehmen ein. Jeder ist mit Ihren echten Tools verbunden, erledigt eine Aufgabe gut und meldet zurück. Sie sehen, was passiert ist, und können in normaler Sprache alles fragen.",
    outcomes: [
      "Jede Anfrage bekommt in Minuten eine Antwort, auch nachts",
      "Mehr Sichtbarkeit: Website, Google-Profil und Beiträge bleiben aktuell",
      "Wochenberichte kommen, ohne dass jemand sie erstellt",
      "Buchungen, E-Mails und Rechnungen laufen ohne Copy & Paste weiter",
    ],
    seeTitle: "So sieht das aus",
    see: [
      { label: "Workshop: von der Idee zur fertigen App mit Claude", href: "/de/blog/mit-ki-bauen-claude-workshop" },
      { label: "Bericht: was Claude Code im Unternehmen leistet", href: "/de/blog/claude-code-fuer-unternehmen" },
      { label: "Leitfaden: Claude Skills vs. MCP-Server", href: "/de/blog/claude-skills-vs-mcp-server" },
    ],
    cta: "Gespräch starten",
    center: "KI-Operations",
    bubbles: [
      { t: "Vertriebs-Agent", s: "Beantwortet und verfolgt jeden Lead" },
      { t: "Marketing-Agent", s: "Hält Sie sichtbar" },
      { t: "Support-Agent", s: "Antwortet in Minuten" },
      { t: "Reporting-Agent", s: "" },
      { t: "Buchungs-Agent", s: "" },
    ],
    worldBadge: "Warum jetzt",
    worldTitle1: "Die Welt ändert sich jeden Tag.",
    worldTitle2: "Wir wissen, in welche Richtung.",
    worldText:
      "Jede Woche kommen neue Modelle und Tools. Wir testen sie zuerst in unserem eigenen Unternehmen und bringen nur das zu Ihnen, was funktioniert. Dieselbe Art von Technologie hat Sie auf diese Seite gebracht.",
    timeline: [
      { k: "Gestern", v: "KI beantwortete Fragen in einem Chatfenster." },
      { k: "Heute", v: "KI-Agenten nutzen Ihre Tools: CRM, E-Mail, Buchungen, Website." },
      { k: "Morgen", v: "Agenten führen ganze Prozesse aus. Ein Mensch gibt Wichtiges frei." },
    ],
    worldCards: [
      { t: "Zuerst bei uns getestet", s: "Jedes Tool, das wir Ihnen bringen, läuft schon in unserem Unternehmen." },
      { t: "Nur, was sich rechnet", s: "Trends, die weder Zeit noch Geld sparen, lassen wir weg." },
      { t: "Sie bleiben vorne", s: "Kommt ein besseres Modell oder Tool, bekommen Ihre Agenten es." },
    ],
    teamBadge: "Unser Team",
    teamTitle1: "Ein Ingenieur.",
    teamTitle2: "Ein Team aus KI-Agenten.",
    erikRole: "Gründer · Systemingenieur",
    agents: [
      { t: "Marketing-Agent", s: "Claude" },
      { t: "Design-Agent", s: "Claude" },
      { t: "Engineering-Agent", s: "Claude Code" },
    ],
    teamText: "Bringen Sie Ihr Unternehmen mit neuester Technologie nach vorne.",
    teamSub:
      "Erik plant jedes Projekt und prüft jedes Ergebnis. Die Agenten übernehmen Recherche, Texte, Design-Entwürfe und Code: das Tempo eines ganzen Teams, mit einer verantwortlichen Person.",
    proof: ["Top Rated Plus auf Upwork", "100 % Job Success", "54 Aufträge · 7.830 Stunden"],
    proofLink: "Upwork-Profil ansehen",
  },
};

const useCopy = () => {
  const { locale } = useTranslation();
  return { c: locale === "DE" ? COPY.DE : COPY.EN, locale };
};

/* ── Agent bubbles (blue, floating) ── */
const BUBBLES = [
  { icon: TrendingUp, size: 44, x: 30, y: 30, d: 0 },   // sales — biggest
  { icon: Megaphone, size: 31, x: 78, y: 24, d: 1.2 },  // marketing
  { icon: Headphones, size: 27, x: 82, y: 68, d: 0.6 }, // support
  { icon: BarChart3, size: 22, x: 34, y: 80, d: 1.8 },  // reporting
  { icon: CalendarCheck, size: 19, x: 59, y: 86, d: 2.4 }, // booking
];

function AgentBubbles() {
  const { c } = useCopy();
  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-square">
      <div
        className="absolute inset-[8%] rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(circle, rgba(0,87,255,0.35), transparent 70%)" }}
      />
      <span
        className="absolute left-[60%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-sky-700/60"
        style={{ fontFamily: fonts.display, fontWeight: 700 }}
      >
        {c.center}
      </span>
      {BUBBLES.map((b, i) => {
        const Icon = b.icon;
        const info = c.bubbles[i];
        const big = b.size >= 27;
        return (
          <div
            key={info.t}
            className="absolute"
            style={{ width: `${b.size}%`, aspectRatio: "1", left: `${b.x}%`, top: `${b.y}%`, transform: "translate(-50%,-50%)" }}
          >
          <motion.div
            className="w-full h-full rounded-full flex flex-col items-center justify-center text-center text-white"
            style={{
              background: "radial-gradient(circle at 30% 25%, #7dd3fc 0%, #0ea5e9 28%, #0057ff 70%, #1e3a8a 100%)",
              boxShadow: "0 20px 50px rgba(0,87,255,0.35), inset 0 -10px 30px rgba(2,3,61,0.35), inset 0 8px 20px rgba(255,255,255,0.35)",
              padding: "8%",
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: b.d }}
          >
            <Icon className="mb-1 w-[18%] h-auto opacity-90" />
            <span className={`${big ? "text-[13px] md:text-[17px]" : "text-[10px] md:text-[13px]"} leading-tight`} style={{ fontFamily: fonts.heading, fontWeight: 700 }}>
              {info.t}
            </span>
            {info.s && big && (
              <span className="hidden sm:block mt-1 text-[11px] md:text-[12.5px] leading-snug text-white/85" style={{ fontFamily: fonts.body }}>
                {info.s}
              </span>
            )}
          </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export function AiDashboardSection() {
  const { c, locale } = useCopy();
  return (
    <section id="ai-dashboard" className="relative bg-white py-20 md:py-28 overflow-hidden">
      <SectionContainer>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <ScrollReveal>
              <SectionBadge>{c.dashBadge}</SectionBadge>
              <h2 className="mt-5 text-[32px] md:text-[46px] leading-[1.12]" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}>
                {c.dashTitle1}{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${colors.blue}, #0ea5e9)` }}>
                  {c.dashTitle2}
                </span>
              </h2>
              <p className="mt-5 text-[16px] md:text-[18px] leading-[1.7] text-slate-600" style={{ fontFamily: fonts.body }}>
                {c.dashText}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ul className="mt-7 space-y-3">
                {c.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 text-[15.5px] text-slate-800" style={{ fontFamily: fonts.body }}>
                    <span className="mt-[7px] w-2.5 h-2.5 rounded-full shrink-0" style={{ background: colors.blue }} />
                    {o}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
                <p className="text-[12px] uppercase tracking-[0.15em] text-slate-500 mb-3" style={{ fontFamily: fonts.display, fontWeight: 700 }}>
                  {c.seeTitle}
                </p>
                <ul className="space-y-2.5">
                  {c.see.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="group flex items-start gap-2.5 text-[15px] text-slate-800 hover:text-blue-700" style={{ fontFamily: fonts.body }}>
                        <BookOpen size={17} className="shrink-0 mt-[3px]" style={{ color: colors.blue }} />
                        <span className="underline decoration-slate-300 underline-offset-4 group-hover:decoration-blue-500">{l.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="mt-8">
                <PrimaryButton onClick={() => { window.location.href = getLocalizedRoute("contact", locale); }}>
                  {c.cta} <ArrowRight size={18} className="inline ml-1" />
                </PrimaryButton>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <AgentBubbles />
          </ScrollReveal>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ── The world is changing ── */
const WORLD_ICONS = [FlaskConical, Filter, Rocket];

export function ChangingWorldSection() {
  const { c } = useCopy();
  return (
    <section id="why-now" className="relative py-20 md:py-28 overflow-hidden" style={{ background: colors.gradientCosmic }}>
      <StarField count={30} color="rgba(255,255,255,0.35)" />
      <SectionContainer className="relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-[760px] mx-auto">
            <SectionBadge variant="dark">{c.worldBadge}</SectionBadge>
            <h2 className="mt-5 text-white text-[30px] md:text-[46px] leading-[1.15]" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>
              {c.worldTitle1}{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #7dd3fc, #a78bfa)" }}>
                {c.worldTitle2}
              </span>
            </h2>
            <p className="mt-5 text-[16px] md:text-[18px] leading-[1.7]" style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}>
              {c.worldText}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3 max-w-[980px] mx-auto">
          {c.timeline.map((x, i) => (
            <ScrollReveal key={x.k} delay={i * 0.08}>
              <div
                className="h-full rounded-2xl p-6 border"
                style={{
                  borderColor: i === 1 ? "rgba(125,211,252,0.6)" : "rgba(255,255,255,0.12)",
                  background: i === 1 ? "rgba(14,165,233,0.12)" : "rgba(255,255,255,0.04)",
                }}
              >
                <p className="text-[12px] uppercase tracking-[0.18em] mb-2" style={{ fontFamily: fonts.display, fontWeight: 700, color: i === 1 ? "#7dd3fc" : "rgba(255,255,255,0.5)" }}>
                  {x.k}
                </p>
                <p className="text-white text-[16px] leading-[1.6]" style={{ fontFamily: fonts.body }}>{x.v}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3 max-w-[980px] mx-auto">
          {c.worldCards.map((w, i) => {
            const Icon = WORLD_ICONS[i];
            return (
              <ScrollReveal key={w.t} delay={i * 0.08}>
                <div className="h-full rounded-2xl p-6 bg-white/[0.06] border border-white/10">
                  <Icon size={22} className="text-sky-300" />
                  <h3 className="mt-3 text-white text-[18px]" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>{w.t}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.6] text-white/70" style={{ fontFamily: fonts.body }}>{w.s}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ── Our team: Erik + AI agents ── */
const AGENT_ICONS = [Megaphone, Palette, Code2];

export function TeamSection() {
  const { c } = useCopy();
  return (
    <section id="team" className="relative bg-white py-20 md:py-28 overflow-hidden">
      <SectionContainer>
        <ScrollReveal>
          <div className="text-center max-w-[720px] mx-auto">
            <SectionBadge>{c.teamBadge}</SectionBadge>
            <h2 className="mt-5 text-[30px] md:text-[46px] leading-[1.15]" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}>
              {c.teamTitle1}{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${colors.blue}, #0ea5e9)` }}>
                {c.teamTitle2}
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative mt-12 max-w-[760px] mx-auto">
          {/* Erik */}
          <ScrollReveal>
            <div className="flex flex-col items-center">
              <div
                className="w-[132px] h-[132px] md:w-[160px] md:h-[160px] rounded-full p-[5px]"
                style={{ background: "linear-gradient(135deg, #7dd3fc, #0057ff)", boxShadow: "0 20px 50px rgba(0,87,255,0.3)" }}
              >
                <img src={erikPhotoSrc} alt="Erik Budanov" className="w-full h-full rounded-full object-cover border-4 border-white" />
              </div>
              <p className="mt-4 text-[20px]" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}>Erik Budanov</p>
              <p className="text-[14px] text-slate-500" style={{ fontFamily: fonts.body }}>{c.erikRole}</p>
            </div>
          </ScrollReveal>

          {/* connector */}
          <svg className="block mx-auto my-4 md:my-6 w-[78%] h-[48px]" viewBox="0 0 600 48" preserveAspectRatio="none" aria-hidden="true">
            <path d="M300 0 V18 M100 48 V30 Q100 18 120 18 H480 Q500 18 500 30 V48 M300 18 V48" fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5 5" />
          </svg>

          {/* agents */}
          <div className="grid grid-cols-3 gap-3 md:gap-8">
            {c.agents.map((a, i) => {
              const Icon = AGENT_ICONS[i];
              return (
                <ScrollReveal key={a.t} delay={i * 0.08}>
                  <motion.div
                    className="mx-auto w-full max-w-[170px] aspect-square rounded-full flex flex-col items-center justify-center text-center text-white p-3"
                    style={{
                      background: "radial-gradient(circle at 30% 25%, #7dd3fc 0%, #0ea5e9 28%, #0057ff 70%, #1e3a8a 100%)",
                      boxShadow: "0 16px 40px rgba(0,87,255,0.3), inset 0 8px 20px rgba(255,255,255,0.3)",
                    }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
                  >
                    <Icon className="w-6 h-6 md:w-8 md:h-8 mb-1.5" />
                    <span className="text-[11.5px] md:text-[15px] leading-tight" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>{a.t}</span>
                    <span className="mt-1 text-[10px] md:text-[12px] text-white/80" style={{ fontFamily: fonts.body }}>{a.s}</span>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        <ScrollReveal>
          <div className="mt-14 text-center max-w-[680px] mx-auto">
            <p className="text-[22px] md:text-[30px] leading-[1.25]" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}>
              {c.teamText}
            </p>
            <p className="mt-4 text-[15.5px] md:text-[17px] leading-[1.7] text-slate-600" style={{ fontFamily: fonts.body }}>{c.teamSub}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {c.proof.map((p, i) => (
                <span key={p} className="inline-flex items-center gap-1.5 text-[13px] px-3 py-1.5 rounded-full border border-slate-200 bg-[#f8fafc] text-slate-700" style={{ fontFamily: fonts.body, fontWeight: 600 }}>
                  {i === 0 && <BadgeCheck size={15} className="text-green-600" />}
                  {p}
                </span>
              ))}
              <a href={UPWORK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-blue-700 hover:underline" style={{ fontFamily: fonts.body }}>
                {c.proofLink} <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </SectionContainer>
    </section>
  );
}
