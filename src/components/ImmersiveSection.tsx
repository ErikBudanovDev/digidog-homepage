/* ─────────────────────────────────────────────
 * Immersive 3D & VR showcase (homepage)
 * Two real projects: apartment renovation planned in VR,
 * and the Armenian-language Solar System VR.
 * ───────────────────────────────────────────── */
import { useState } from "react";
import { ArrowRight, ExternalLink, Box, GraduationCap, Building2, Check } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { colors, fonts } from "./ui/brand";
import { SectionContainer, SectionBadge } from "./ui/section";
import { openBookingModal } from "./ui/buttons";
import { useTranslation } from "@/i18n/i18n-context";
import enT from "@/translations/english.json";
import deT from "@/translations/german.json";

const SOLAR_DEMO_URL = "https://solar-vr.deploy.digidog-services.com/";

const caseMedia = [
  {
    accent: colors.teal,
    main: "/images/immersive/apartment-vr-furniture.webp",
    thumbs: [
      "/images/immersive/apartment-empty-shell.webp",
      "/images/immersive/apartment-vr-wiring.webp",
      "/images/immersive/apartment-blender-model.webp",
    ],
    demo: null as string | null,
    caseStudy: "/portfolio/apartment-renovation-vr",
  },
  {
    accent: "#ffcf5a",
    main: "/images/immersive/enc-dinosaurs.webp",
    thumbs: [
      "/images/immersive/solar-saturn.webp",
      "/images/immersive/enc-micro-blood.webp",
      "/images/immersive/enc-micro-cell.webp",
    ],
    demo: SOLAR_DEMO_URL,
    caseStudy: "/portfolio/solar-system-vr",
  },
];

const useCaseIcons = [Building2, GraduationCap, Box];

type CaseCopy = (typeof enT)["immersiveSection"]["cases"][number];

function ShowcaseCard({
  copy,
  media,
  liveDemo,
  caseStudy,
}: {
  copy: CaseCopy;
  media: (typeof caseMedia)[number];
  liveDemo: string;
  caseStudy: string;
}) {
  // the big image can be swapped by clicking a thumbnail
  const [active, setActive] = useState(media.main);
  const [activeAlt, setActiveAlt] = useState(copy.title);
  const all = [{ src: media.main, alt: copy.title }, ...media.thumbs.map((src, i) => ({ src, alt: copy.thumbs[i] }))];

  return (
    <article
      className="relative flex flex-col rounded-2xl overflow-hidden border"
      style={{ background: "rgba(10, 16, 34, 0.9)", borderColor: colors.borderLight }}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-black">
        <img
          src={active}
          alt={activeAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span
          className="absolute left-4 top-4 px-3 py-1 rounded-full text-[12px] tracking-[1.5px] uppercase backdrop-blur-md"
          style={{ fontFamily: fonts.body, fontWeight: 600, color: "#fff", background: "rgba(0,0,0,0.45)", border: `1px solid ${media.accent}55` }}
        >
          {copy.tag}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 p-2" role="list">
        {all.map((m) => (
          <button
            key={m.src}
            type="button"
            role="listitem"
            onClick={() => { setActive(m.src); setActiveAlt(m.alt); }}
            className="relative aspect-[16/10] rounded-lg overflow-hidden border transition-opacity"
            style={{ borderColor: active === m.src ? media.accent : "transparent", opacity: active === m.src ? 1 : 0.7 }}
            aria-label={m.alt}
            title={m.alt}
          >
            <img src={m.src} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <div className="flex flex-col flex-1 p-6 md:p-8 pt-4 md:pt-5">
        <p className="text-[13px] mb-2" style={{ fontFamily: fonts.body, color: media.accent, fontWeight: 600 }}>
          {copy.place}
        </p>
        <h3 className="text-white text-[22px] md:text-[26px] leading-[1.25] mb-3" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>
          {copy.title}
        </h3>
        <p className="text-[15px] leading-[1.7] mb-5" style={{ fontFamily: fonts.body, color: colors.textSlate }}>
          {copy.body}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5 mb-6 flex-1">
          {copy.points.map((p) => (
            <li key={p} className="flex items-start gap-2.5">
              <Check size={14} strokeWidth={3} className="mt-[4px] shrink-0" style={{ color: media.accent }} />
              <span className="text-[13.5px] leading-[1.55]" style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}>
                {p}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={media.caseStudy}
          className="inline-flex items-center gap-2 text-[14px]"
          style={{ fontFamily: fonts.body, fontWeight: 600, color: "#fff" }}
        >
          {caseStudy}
          <ArrowRight size={14} />
        </a>
        {media.demo && (
          <a
            href={media.demo}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-[14px]"
            style={{ fontFamily: fonts.body, fontWeight: 600, color: media.accent }}
          >
            {liveDemo}
            <ExternalLink size={14} />
          </a>
        )}
        </div>
      </div>
    </article>
  );
}

export function ImmersiveSection() {
  const { locale } = useTranslation();
  const t = (locale === "DE" ? deT : enT).immersiveSection;

  return (
    <section
      id="immersive-3d-vr"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050816 0%, #070b1f 60%, #0a1628 100%)" }}
    >
      {/* soft planet-glow backdrop */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[520px] rounded-full blur-[130px] pointer-events-none opacity-25"
        style={{ background: "radial-gradient(ellipse, rgba(255, 207, 90, 0.25) 0%, rgba(6, 182, 212, 0.15) 45%, transparent 70%)" }}
      />

      <SectionContainer className="relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal>
            <SectionBadge variant="dark" className="mb-7">{t.badge}</SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-white text-[34px] md:text-[48px] leading-[1.2] mb-5" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>
              {t.title1}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #ffcf5a, #06b6d4)" }}>
                {t.title2}
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-[16px] md:text-[17px] max-w-[620px] mx-auto leading-[1.7]" style={{ fontFamily: fonts.body, color: colors.textSlate }}>
              {t.subtitle}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {t.cases.map((c, i) => (
            <ScrollReveal key={c.title} delay={0.1 * i}>
              <ShowcaseCard copy={c} media={caseMedia[i]} liveDemo={t.liveDemo} caseStudy={t.caseStudy} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-14 md:mt-16">
          <h3 className="text-center text-white text-[20px] md:text-[22px] mb-7" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>
            {t.useCasesTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {t.useCases.map((u, i) => {
              const Icon = useCaseIcons[i];
              return (
                <div key={u.title} className="rounded-xl p-5 border" style={{ borderColor: colors.borderLight, background: "rgba(255,255,255,0.02)" }}>
                  <Icon size={22} className="mb-3" style={{ color: colors.textBlueLight }} />
                  <p className="text-white text-[16px] mb-1.5" style={{ fontFamily: fonts.body, fontWeight: 600 }}>{u.title}</p>
                  <p className="text-[14px] leading-[1.6]" style={{ fontFamily: fonts.body, color: colors.textSlate }}>{u.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={openBookingModal}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[15px] text-[#050816] transition-transform hover:scale-[1.03]"
            style={{ fontFamily: fonts.body, fontWeight: 700, background: "linear-gradient(135deg, #ffcf5a, #5eead4)" }}
          >
            {t.cta}
            <ArrowRight size={16} />
          </button>
        </div>
      </SectionContainer>
    </section>
  );
}
