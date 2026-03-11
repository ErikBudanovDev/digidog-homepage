import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, Rocket, Heart, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  StarField,
  ShootingStar,
  Spaceship,
  Planet,
  StarShape,
} from "@/components/CosmicElements";

import { colors, fonts, transitions } from "@/components/ui/brand";
import { PrimaryButton } from "@/components/ui/buttons";
import { SectionContainer, SectionBadge } from "@/components/ui/section";
import { HeroLayout } from "@/components/ui/hero-layout";
import svgPaths from "@/imports/svg-ly9usgqlzn";

/* Figma assets */
import teamPhoto from "figma:asset/662435b77afb9fc5df300b8a814a4e93a31c97ee.png";
const teamPhotoSrc = teamPhoto as unknown as string;
import { SEO } from "@/components/SEO";
import { useTranslation } from "@/i18n/i18n-context";
import enPg from "@/translations/pages/english.json";
import dePg from "@/translations/pages/german.json";

/* ─────────────────────────────────────────────
 * DATA
 * ───────────────────────────────────────────── */

const values = [
  {
    icon: Sparkles,
    title: "Generate success",
    text: "With Digidog by your side, you will not only stand out in the digital competition but also achieve top performance. Whether you need innovative strategies, technical solutions, or creative ideas, we are here to support you. Accelerate your efforts with our experience and benefit from our relentless support aimed at maximizing your success.",
  },
  {
    icon: Heart,
    title: "Celebrate success",
    text: "At Digidog, we know that every step forward counts. That's why we celebrate every success, whether it's a major milestone or a small but significant step. For us, every achievement is a testament to our commitment, dedication, and the hard work our team puts in every day.",
  },
  {
    icon: Rocket,
    title: "Start together, fly forever",
    text: "At Digidog, we value long-term relationships built on a solid foundation of trust and integrity. For us, it's not just about the moment but about continuous mutual growth and the pursuit of excellence that unites us.",
  },
];



/* ─────────────────────────────────────────────
 * HERO BACKGROUND
 * ───────────────────────────────────────────── */

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Figma star cluster decorations */}
      <div
        className="absolute mix-blend-soft-light opacity-60"
        style={{ top: "80%", right: "-19%", bottom: "-35%", left: "70%" }}
      >
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 954.816 379.109"
        >
          <g style={{ mixBlendMode: "soft-light" }}>
            <path d={svgPaths.p361adb00} fill="white" />
            <path d={svgPaths.p21d74300} fill="white" />
            <path d={svgPaths.p2a163200} fill="white" />
            <path d={svgPaths.p25da73f0} fill="white" />
            <path d={svgPaths.p16156a40} fill="white" />
            <path d={svgPaths.p21648000} fill="white" />
            <path d={svgPaths.p26a90800} fill="white" />
            <path d={svgPaths.p1a0f7580} fill="white" />
            <path d={svgPaths.p3f4ee580} fill="white" />
            <path d={svgPaths.p17b1f80} fill="white" />
            <path d={svgPaths.p3f345e40} fill="white" />
            <path d={svgPaths.p187c1200} fill="white" />
            <path d={svgPaths.p342cf5f0} fill="white" />
            <path d={svgPaths.pac18500} fill="white" />
            <path d={svgPaths.p286e9d00} fill="white" />
            <path d={svgPaths.p31556600} fill="white" />
            <path d={svgPaths.p23120f00} fill="white" />
            <path d={svgPaths.p936c00} fill="white" />
            <path d={svgPaths.p15896500} fill="white" />
            <path d={svgPaths.p320dfb00} fill="white" />
            <path d={svgPaths.p3b5b8800} fill="white" />
            <path d={svgPaths.p2c1e8240} fill="white" />
            <path d={svgPaths.pf102a80} fill="white" />
            <path d={svgPaths.p126e0200} fill="white" />
            <path d={svgPaths.p3ad25d00} fill="white" />
            <path d={svgPaths.p15a26500} fill="white" />
            <path d={svgPaths.p26d39940} fill="white" />
            <path d={svgPaths.p7cf1780} fill="white" />
            <path d={svgPaths.p34a47580} fill="white" />
            <path d={svgPaths.p2df6aa00} fill="white" />
          </g>
        </svg>
      </div>

      {/* Small star cluster */}
      <div
        className="absolute mix-blend-soft-light opacity-60"
        style={{ top: "38%", right: "-11%", bottom: "34%", left: "101%" }}
      >
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 205.407 192.741"
        >
          <g style={{ mixBlendMode: "soft-light" }}>
            <path d={svgPaths.p27b0fb00} fill="#E4E0D8" />
            <path d={svgPaths.p320bf300} fill="#E4E0D8" />
            <path d={svgPaths.p3df264c0} fill="#E4E0D8" />
            <path d={svgPaths.p694c100} fill="#E4E0D8" />
            <path d={svgPaths.p10a7a7c0} fill="#E4E0D8" />
            <path d={svgPaths.p2c646c00} fill="#E4E0D8" />
            <path d={svgPaths.p203d800} fill="#E4E0D8" />
            <path d={svgPaths.p26db5a00} fill="#E4E0D8" />
            <path d={svgPaths.p33a37d80} fill="#E4E0D8" />
            <path d={svgPaths.p238acd80} fill="#E4E0D8" />
            <path d={svgPaths.pdf51600} fill="#E4E0D8" />
            <path d={svgPaths.p277d4880} fill="#E4E0D8" />
            <path d={svgPaths.p9a8680} fill="#E4E0D8" />
            <path d={svgPaths.p2e186800} fill="#E4E0D8" />
            <path d={svgPaths.pda4d000} fill="#E4E0D8" />
            <path d={svgPaths.p3e1ab900} fill="#E4E0D8" />
            <path d={svgPaths.p1806bd00} fill="#E4E0D8" />
            <path d={svgPaths.p14377c00} fill="#E4E0D8" />
            <path d={svgPaths.p217f0c00} fill="#E4E0D8" />
            <path d={svgPaths.p285adb00} fill="#E4E0D8" />
          </g>
        </svg>
      </div>

      {/* Gradient glow */}
      <div
        className="absolute mix-blend-screen opacity-60"
        style={{ top: "34%", right: "-22%", bottom: "19%", left: "94%" }}
      >
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 533.508 323.575"
        >
          <g style={{ mixBlendMode: "screen" }}>
            <path d={svgPaths.p20fd4500} fill="url(#about_grad_1)" />
          </g>
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="about_grad_1"
              x1="266.765"
              x2="266.765"
              y1="323.544"
              y2="-0.798"
            >
              <stop stopColor="#135195" />
              <stop offset="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Blue glow (center) */}
      <div
        className="absolute opacity-40"
        style={{ top: "10%", left: "30%", width: "55%", height: "80%" }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1753 1551"
        >
          <g filter="url(#about_blue_glow)">
            <ellipse cx="877" cy="776" rx="480" ry="350" fill="#2E7ECE" opacity="0.4" />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="1551"
              id="about_blue_glow"
              width="1753"
              x="0"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1" stdDeviation="200" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Purple glow (bottom) */}
      <motion.div
        className="absolute opacity-10"
        style={{ top: "70%", left: "50%", width: "50%", height: "60%" }}
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 800">
          <g filter="url(#about_purple_glow)">
            <ellipse cx="500" cy="400" rx="350" ry="220" fill="#DC43F4" />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="800"
              id="about_purple_glow"
              width="1000"
              x="0"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1" stdDeviation="200" />
            </filter>
          </defs>
        </svg>
      </motion.div>

      <StarField count={60} color="rgba(255,255,255,0.7)" />

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "12%",
          right: "10%",
          width: 100,
          height: 100,
          background: "radial-gradient(circle, rgba(100,180,255,0.35) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <ShootingStar delay={2} style={{ top: "18%", left: "10%", transform: "rotate(-15deg)" }} />
      <ShootingStar delay={7} duration={1.3} style={{ top: "50%", left: "60%", transform: "rotate(-22deg)" }} />

      <motion.div
        className="absolute hidden lg:block"
        style={{ top: "6%", right: "5%" }}
        animate={{ x: [0, -12, 0], y: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Spaceship size={80} />
      </motion.div>

      <motion.div
        className="absolute hidden md:block"
        style={{ bottom: "12%", left: "3%" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Planet size={35} color={colors.blue} ringColor="rgba(0,87,255,0.3)" />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ top: "35%", left: "2%" }}
        animate={{ rotate: 360, scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <StarShape size={14} color="rgba(0,183,255,0.5)" />
      </motion.div>
      <motion.div
        className="absolute hidden md:block"
        style={{ top: "60%", right: "8%" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <StarShape size={10} color="rgba(255,255,255,0.4)" />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * HERO
 * ───────────────────────────────────────────── */

function AboutHero() {
  const { locale } = useTranslation();
  const t = (locale === "DE" ? dePg : enPg).about;
  const lines = t.heroTitle.split('\n');
  return (
    <HeroLayout
      backgroundElements={<HeroBackground />}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: t.heroBreadcrumb, color: colors.blue },
      ]}
      badge={t.heroBadge}
      title={
        <>
          {lines[0]}
          <br />
          {lines[1]}
          <br />
          {lines[2]}
        </>
      }
      contentMaxWidth="max-w-[750px]"
      actions={
        <>
          <PrimaryButton
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t.heroCta}
            </PrimaryButton>
          <a
            href="#mission"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#mission")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white text-[17px] hover:border-white/40 hover:bg-white/5 transition-all cursor-pointer"
            style={{ fontFamily: fonts.display, fontWeight: 600 }}
          >
            {t.heroCtaSecondary}
            <ArrowRight size={18} />
          </a>
        </>
      }
    />
  );
}

/* ─────────────────────────────────────────────
 * MISSION SECTION
 * ───────────────────────────────────────────── */

function MissionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const { locale } = useTranslation();
  const t = (locale === "DE" ? dePg : enPg).about;

  return (
    <section
      id="mission"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: colors.navyDeep }}
    >
      {/* Subtle glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-15"
        style={{
          background: "radial-gradient(ellipse, rgba(0,87,255,0.25), transparent 70%)",
        }}
      />

      <SectionContainer className="relative z-10">
        <div ref={ref} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text content */}
          <motion.div
            className="flex-1 order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.7, ease: transitions.smooth }}
          >
            <SectionBadge variant="dark" className="mb-6">
              {t.missionBadge}
            </SectionBadge>

            <h2
              className="text-white text-[32px] md:text-[44px] leading-[1.2] mb-6"
              style={{ fontFamily: fonts.heading, fontWeight: 700 }}
            >
              {t.missionTitle1}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.blue}, #00c6ff)`,
                }}
              >
                {t.missionTitle2}
              </span>
            </h2>

            <div
              className="space-y-4 text-[15px] md:text-[16px] leading-[1.75]"
              style={{ fontFamily: fonts.body, color: colors.textSlate }}
            >
              <p>{t.missionP1}</p>
              <p>{t.missionP2}</p>
              <p>{t.missionP3}</p>
            </div>
          </motion.div>

          {/* Team photo */}
          <motion.div
            className="flex-1 order-1 lg:order-2 w-full max-w-[520px]"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.15, ease: transitions.smooth }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
              <img
                src={teamPhotoSrc}
                alt="Digidog Team"
                className="w-full aspect-[4/3] object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,87,255,0.08), transparent 60%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * VALUES SECTION
 * ───────────────────────────────────────────── */

function ValuesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const { locale } = useTranslation();
  const t = (locale === "DE" ? dePg : enPg).about;
  const translatedValues = [
    { ...values[0], title: t.value1Title, text: t.value1Text },
    { ...values[1], title: t.value2Title, text: t.value2Text },
    { ...values[2], title: t.value3Title, text: t.value3Text },
  ];

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <SectionContainer>
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">
              {t.valuesBadge}
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-[28px] md:text-[40px] lg:text-[48px] leading-[1.25] max-w-[800px] mx-auto"
              style={{
                fontFamily: fonts.heading,
                fontWeight: 700,
                color: colors.textDark,
              }}
            >
              {t.valuesTitle1}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.blue}, ${colors.purple})`,
                }}
              >
                {t.valuesTitle2}
              </span>
            </h2>
          </ScrollReveal>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {translatedValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: transitions.smooth,
                }}
                className="group"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `${colors.blue}10`,
                    border: `1px solid ${colors.blue}20`,
                  }}
                >
                  <Icon size={24} style={{ color: colors.blue }} strokeWidth={1.8} />
                </div>

                <h3
                  className="text-[20px] md:text-[22px] mb-3"
                  style={{
                    fontFamily: fonts.heading,
                    fontWeight: 700,
                    color: colors.textDark,
                  }}
                >
                  {value.title}
                </h3>

                <p
                  className="text-[15px] leading-[1.7]"
                  style={{ fontFamily: fonts.body, color: colors.textMuted }}
                >
                  {value.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * PAGE
 * ───────────────────────────────────────────── */

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden scroll-smooth">
            <SEO
        title="About Us - AI & Web Development Team"
        description="Meet the Digidog team. We are an AI consulting and web development agency helping mid-size companies with digital transformation, automation, and high-performance websites."
        canonical="/about"
      />
      <Navbar />
      <AboutHero />
      <MissionSection />
      <ValuesSection />
      <ContactCTA />
      <Footer />
    </div>
  );
}