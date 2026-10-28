/* ─────────────────────────────────────────────
 * "Businesses we integrated with AI" (homepage)
 * Three client cases from the portfolio + two systems
 * DigiDog runs on itself (Claude as ops / marketing / DevOps).
 * ───────────────────────────────────────────── */
import Link from "next/link";
import { ArrowRight, Check, Bot, PlayCircle } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { colors, fonts } from "./ui/brand";
import { SectionContainer, SectionBadge } from "./ui/section";
import { openBookingModal } from "./ui/buttons";
import { getLocalizedProjects } from "./PortfolioSection";
import { useTranslation } from "@/i18n/i18n-context";
import enT from "@/translations/english.json";
import deT from "@/translations/german.json";

const ACCENTS = ["#0891b2", "#8b5cf6", "#f59e0b"];
const INTERNAL_ICONS = [Bot, PlayCircle];

export function AiCasesSection() {
  const { locale } = useTranslation();
  const t = (locale === "DE" ? deT : enT).aiCasesSection;
  const projects = getLocalizedProjects(locale);

  return (
    <section id="ai-cases" className="relative py-20 md:py-28 overflow-hidden" style={{ background: "#f6f8fb" }}>
      <SectionContainer className="relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal>
            <SectionBadge className="mb-7">{t.badge}</SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[32px] md:text-[46px] leading-[1.2] mb-5" style={{ fontFamily: fonts.heading, fontWeight: 700, color: "#0b1b34" }}>
              {t.title1}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #0891b2, #10b981)" }}>
                {t.title2}
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-[16px] md:text-[17px] max-w-[660px] mx-auto leading-[1.7]" style={{ fontFamily: fonts.body, color: "#475569" }}>
              {t.subtitle}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.cases.map((c, i) => {
            const p = projects.find((x) => x.slug === c.slug);
            return (
              <ScrollReveal key={c.slug} delay={0.08 * i}>
                <article className="h-full flex flex-col rounded-2xl overflow-hidden bg-white border shadow-[0_8px_30px_rgba(15,23,42,0.06)]" style={{ borderColor: "#e2e8f0" }}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    {p?.image && (
                      <img src={typeof p.image === "string" ? p.image : (p.image as { src: string }).src} alt={c.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    <span className="absolute left-4 top-4 px-3 py-1 rounded-full text-[12px] tracking-[1px] uppercase bg-white/90" style={{ fontFamily: fonts.body, fontWeight: 700, color: ACCENTS[i] }}>
                      {c.industry}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-[20px] leading-[1.3] mb-3" style={{ fontFamily: fonts.heading, fontWeight: 700, color: "#0b1b34" }}>
                      {c.title}
                    </h3>
                    <p className="text-[15px] leading-[1.65] mb-4" style={{ fontFamily: fonts.body, color: "#475569" }}>{c.body}</p>
                    <ul className="space-y-2 mb-5 flex-1">
                      {c.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                          <Check size={15} strokeWidth={3} className="mt-[3px] shrink-0" style={{ color: ACCENTS[i] }} />
                          <span className="text-[14px] leading-[1.55]" style={{ fontFamily: fonts.body, color: "#334155" }}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {c.tools.map((tool) => (
                        <span key={tool} className="px-2.5 py-1 rounded-md text-[12px]" style={{ fontFamily: fonts.body, fontWeight: 600, color: "#334155", background: "#f1f5f9" }}>{tool}</span>
                      ))}
                    </div>
                    <Link href={`/portfolio/${c.slug}`} className="inline-flex items-center gap-1.5 text-[14px] hover:gap-2.5 transition-all" style={{ fontFamily: fonts.body, fontWeight: 700, color: ACCENTS[i] }}>
                      {t.readCase} <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <h3 className="text-center text-[20px] md:text-[22px] mt-14 mb-6" style={{ fontFamily: fonts.heading, fontWeight: 700, color: "#0b1b34" }}>
          {t.internalTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {t.internal.map((c, i) => {
            const Icon = INTERNAL_ICONS[i];
            return (
              <ScrollReveal key={c.title} delay={0.08 * i}>
                <Link href={c.href} className="group h-full flex gap-4 rounded-2xl p-6 border transition-colors hover:border-cyan-400" style={{ background: "#0b1b34", borderColor: "#1e3a5f" }}>
                  <Icon size={28} className="shrink-0 mt-1" style={{ color: "#22d3ee" }} />
                  <div>
                    <p className="text-white text-[17px] mb-1.5" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>{c.title}</p>
                    <p className="text-[14.5px] leading-[1.6] mb-3" style={{ fontFamily: fonts.body, color: colors.textSlate }}>{c.body}</p>
                    <span className="inline-flex items-center gap-1.5 text-[14px] text-cyan-300 group-hover:gap-2.5 transition-all" style={{ fontFamily: fonts.body, fontWeight: 700 }}>
                      {c.link} <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={openBookingModal}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[15px] text-white transition-transform hover:scale-[1.03]"
            style={{ fontFamily: fonts.body, fontWeight: 700, background: "linear-gradient(135deg, #0891b2, #10b981)" }}
          >
            {t.cta}
            <ArrowRight size={16} />
          </button>
          <p className="mt-3 text-[13.5px]" style={{ fontFamily: fonts.body, color: "#64748b" }}>{t.ctaNote}</p>
        </div>
      </SectionContainer>
    </section>
  );
}
