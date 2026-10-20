/* ─────────────────────────────────────────────
 * Upwork track record: Top Rated Plus badge, numbers from the
 * public profile, and the client story from a medical education
 * platform to the United Nations.
 * ───────────────────────────────────────────── */
import { ArrowUpRight, BadgeCheck, ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { colors, fonts } from "./ui/brand";
import { SectionContainer, SectionBadge } from "./ui/section";
import { getLocalizedProjects } from "./PortfolioSection";
import { useTranslation } from "@/i18n/i18n-context";
import erikPhoto from "figma:asset/c28a01d5ca35b1e207da7537c250359543a3aa75.png";
const erikPhotoSrc = erikPhoto as unknown as string;
import enT from "@/translations/english.json";
import deT from "@/translations/german.json";

export const UPWORK_PROFILE_URL = "https://www.upwork.com/freelancers/~017064d1a9c71f1de6";

const STORY_SLUGS = ["mpa-online", "smileforyou", "pruftechnik-fluke", "activated-insights-migration", "united-nations-fp2030"];

export function UpworkProofSection() {
  const { locale } = useTranslation();
  const t = (locale === "DE" ? deT : enT).upworkSection;
  const projects = getLocalizedProjects(locale);
  const story = STORY_SLUGS.map((slug, i) => ({ p: projects.find((x) => x.slug === slug), s: t.story[i] })).filter((x) => x.p);

  return (
    <section id="upwork" className="relative py-20 md:py-28 overflow-hidden" style={{ background: "#ffffff" }}>
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start">
          {/* Profile card */}
          <ScrollReveal className="order-2 lg:order-1">
            <div
              className="lg:sticky lg:top-28 rounded-2xl p-7 md:p-8 text-white overflow-hidden relative"
              style={{ background: "linear-gradient(160deg, #0a1628 0%, #14205a 100%)" }}
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-40" style={{ background: "#14a800" }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <img src={erikPhotoSrc} alt="Erik Budanov" className="w-14 h-14 rounded-full object-cover border-2 border-white/20" />
                  <div>
                    <p className="text-[18px]" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>Erik Budanov</p>
                    <p className="text-[13px] text-white/60" style={{ fontFamily: fonts.body }}>{t.role}</p>
                  </div>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 text-[13px]"
                  style={{ background: "rgba(20,168,0,0.15)", border: "1px solid rgba(20,168,0,0.5)", color: "#7ee26b", fontFamily: fonts.body, fontWeight: 700 }}
                >
                  <BadgeCheck size={16} /> {t.badge}
                </div>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5 mb-7">
                  {t.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="text-[26px] leading-none mb-1.5 tabular-nums" style={{ fontFamily: fonts.ui, fontWeight: 800 }}>{s.value}</dt>
                      <dd className="text-[12.5px] text-white/60 leading-snug" style={{ fontFamily: fonts.body }}>{s.label}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-[13.5px] leading-[1.6] text-white/70 mb-7" style={{ fontFamily: fonts.body }}>{t.background}</p>
                <a
                  href={UPWORK_PROFILE_URL}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl text-[15px] transition-transform hover:scale-[1.02]"
                  style={{ background: "#14a800", color: "#fff", fontFamily: fonts.body, fontWeight: 700 }}
                >
                  {t.cta} <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Story */}
          <div className="order-1 lg:order-2">
            <ScrollReveal>
              <SectionBadge variant="light" className="mb-6">{t.kicker}</SectionBadge>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="text-[30px] md:text-[42px] leading-[1.2] mb-5" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}>
                {t.title}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-[16px] md:text-[17px] leading-[1.75] mb-10 max-w-[640px]" style={{ fontFamily: fonts.body, color: colors.textSubtle }}>
                {t.intro}
              </p>
            </ScrollReveal>

            <ol className="relative border-l-2 ml-3 space-y-8" style={{ borderColor: "#dbe5ff" }}>
              {story.map(({ p, s }, i) => (
                <ScrollReveal key={p!.slug} delay={0.05 * i}>
                  <li className="relative pl-8">
                    <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full border-4 border-white" style={{ background: colors.blue, boxShadow: "0 0 0 2px #dbe5ff" }} />
                    <a href={`/portfolio/${p!.slug}`} className="group flex flex-col sm:flex-row gap-4 sm:gap-5 rounded-xl p-3 -m-3 hover:bg-[#f4f7ff] transition-colors">
                      <img src={p!.image} alt={p!.title} loading="lazy" className="w-full sm:w-[150px] h-[150px] sm:h-[96px] rounded-lg object-cover shrink-0 border border-black/5" />
                      <div className="min-w-0">
                        <p className="text-[12px] tracking-[1.5px] uppercase mb-1" style={{ fontFamily: fonts.body, fontWeight: 700, color: colors.blue }}>{s.kind}</p>
                        <p className="text-[18px] leading-snug mb-1.5" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}>
                          {s.client}
                          <ArrowRight size={16} className="inline ml-1.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </p>
                        <p className="text-[14.5px] leading-[1.6]" style={{ fontFamily: fonts.body, color: colors.textSubtle }}>{s.text}</p>
                      </div>
                    </a>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
