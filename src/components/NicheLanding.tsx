"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import { colors, fonts } from "@/components/ui/brand";
import { SectionContainer } from "@/components/ui/section";
import { PrimaryButton, openBookingModal } from "@/components/ui/buttons";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactFormSection } from "@/components/ContactFormSection";
import type { Landing } from "@/lib/landing-data";

const H2 = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <h2 className="text-[28px] md:text-[38px] leading-[1.2] mb-8 md:mb-10" style={{ fontFamily: fonts.heading, fontWeight: 700, color: light ? "#fff" : colors.navy }}>
    {children}
  </h2>
);

export default function NicheLanding({ data }: { data: Landing }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24" style={{ background: colors.gradientCosmic }}>
        <SectionContainer>
          <div className="max-w-[860px]">
            <p className="text-[13px] md:text-[14px] uppercase tracking-[2px] text-sky-300 mb-5" style={{ fontFamily: fonts.display, fontWeight: 700 }}>{data.eyebrow}</p>
            <h1 className="text-white text-[34px] md:text-[54px] leading-[1.12] mb-6" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>{data.h1}</h1>
            <p className="text-[17px] md:text-[19px] leading-[1.65] mb-8 max-w-[720px]" style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}>{data.sub}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <PrimaryButton onClick={openBookingModal} className="w-full sm:w-auto">{data.cta}</PrimaryButton>
              <a href="#contact-form" className="inline-flex items-center justify-center gap-2 text-white/90 hover:text-white text-[16px] py-2" style={{ fontFamily: fonts.display, fontWeight: 600 }}>
                {data.cta2} <ArrowRight size={18} />
              </a>
            </div>
            <p className="mt-4 text-[14px] text-white/60" style={{ fontFamily: fonts.body }}>{data.ctaNote}</p>
          </div>
        </SectionContainer>
      </section>

      {/* Jobs */}
      <section className="py-16 md:py-24">
        <SectionContainer>
          <H2>{data.jobsTitle}</H2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {data.jobs.map((j) => (
              <div key={j.title} className="rounded-2xl border p-6 md:p-7" style={{ borderColor: colors.borderGray }}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="mt-1 shrink-0" style={{ color: colors.green }} />
                  <div>
                    <h3 className="text-[19px] md:text-[20px] mb-2" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.navy }}>{j.title}</h3>
                    <p className="text-[15.5px] leading-[1.65]" style={{ fontFamily: fonts.body, color: colors.textDark }}>{j.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Cases */}
      <section className="py-16 md:py-24" style={{ background: colors.navyDeep }}>
        <SectionContainer>
          <H2 light>{data.caseTitle}</H2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {data.cases.map((c) => (
              <a key={c.title} href={c.href} className="block rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-7 hover:bg-white/[0.07] transition-colors">
                <p className="text-[12px] uppercase tracking-[0.14em] text-sky-300/80 mb-2" style={{ fontFamily: fonts.display, fontWeight: 700 }}>{c.tag}</p>
                <h3 className="text-white text-[20px] md:text-[22px] leading-snug mb-3" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>{c.title}</h3>
                {c.metric && (
                  <p className="mb-3 flex items-baseline gap-2 flex-wrap">
                    <span className="text-[30px] leading-none bg-clip-text text-transparent" style={{ fontFamily: fonts.heading, fontWeight: 700, backgroundImage: "linear-gradient(135deg, #34d399, #22d3ee)" }}>{c.metric}</span>
                    <span className="text-[14px] text-white/70" style={{ fontFamily: fonts.body }}>{c.metricLabel}</span>
                  </p>
                )}
                <p className="text-[15.5px] leading-[1.65] text-white/75 mb-4" style={{ fontFamily: fonts.body }}>{c.text}</p>
                <span className="inline-flex items-center gap-2 text-sky-300 text-[15px]" style={{ fontFamily: fonts.display, fontWeight: 600 }}>{c.link} <ArrowRight size={16} /></span>
              </a>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-24">
        <SectionContainer>
          <H2>{data.stepsTitle}</H2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 list-none p-0 m-0">
            {data.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl p-6 md:p-7" style={{ background: "#f4f7fd" }}>
                <p className="text-[13px] mb-3" style={{ fontFamily: fonts.display, fontWeight: 700, color: colors.blue }}>{String(i + 1).padStart(2, "0")} · {s.tag}</p>
                <h3 className="text-[20px] mb-2" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.navy }}>{s.title}</h3>
                <p className="text-[15.5px] leading-[1.65]" style={{ fontFamily: fonts.body, color: colors.textDark }}>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <h3 className="text-[20px] mb-4" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.navy }}>{data.systemsTitle}</h3>
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
              {data.systems.map((s) => (
                <li key={s} className="px-3.5 py-1.5 rounded-full border text-[14px]" style={{ borderColor: colors.borderGray, fontFamily: fonts.body, color: colors.textDark }}>{s}</li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] leading-[1.6] max-w-[720px]" style={{ fontFamily: fonts.body, color: colors.textSubtle }}>{data.systemsNote}</p>
          </div>
        </SectionContainer>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24" style={{ background: "#f4f7fd" }}>
        <SectionContainer>
          <H2>{data.faqTitle}</H2>
          <div className="max-w-[860px] space-y-3">
            {data.faqs.map((f) => (
              <details key={f.q} className="rounded-xl bg-white border px-5 py-4" style={{ borderColor: colors.borderGray }}>
                <summary className="cursor-pointer text-[17px]" style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.navy }}>{f.q}</summary>
                <p className="mt-3 text-[15.5px] leading-[1.65]" style={{ fontFamily: fonts.body, color: colors.textDark }}>{f.a}</p>
              </details>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Closing */}
      <section className="py-16 md:py-20" style={{ background: colors.gradientCosmic }}>
        <SectionContainer>
          <div className="max-w-[760px]">
            <h2 className="text-white text-[28px] md:text-[38px] leading-[1.2] mb-4" style={{ fontFamily: fonts.heading, fontWeight: 700 }}>{data.closingTitle}</h2>
            <p className="text-[17px] leading-[1.65] mb-7" style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}>{data.closingText}</p>
            <PrimaryButton onClick={openBookingModal} className="w-full sm:w-auto">{data.cta}</PrimaryButton>
          </div>
        </SectionContainer>
      </section>

      <ContactFormSection />
      <Footer />
    </div>
  );
}
