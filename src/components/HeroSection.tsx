import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { Zap, DollarSign, Clock } from "lucide-react";
import { colors, fonts, transitions } from "./ui/brand";
import { PrimaryButton, openBookingModal } from "./ui/buttons";
import { HeroLayout } from "./ui/hero-layout";
import { Girl3D } from "./Girl3D";
import { useTranslation } from "@/i18n/i18n-context";
import enT from "@/translations/english.json";
import deT from "@/translations/german.json";

const heroKpis = [
  { icon: Zap, value: "30-60%", labelEn: "Repetitive work automated", labelDe: "Repetitive Arbeit automatisiert" },
  { icon: DollarSign, value: "40%", labelEn: "Average cost reduction", labelDe: "Durchschnittliche Kostensenkung" },
  { icon: Clock, value: "3X", labelEn: "Faster operations", labelDe: "Schnellere Abläufe" },
];

export function HeroSection() {
  const handleBooking = () => openBookingModal();
  const { locale } = useTranslation();
  const pt = locale === "DE" ? deT : enT;

  return (
    <HeroLayout
      id="hero"
      minHeight="min-h-[700px] lg:min-h-[850px]"
      padding="pt-[140px] lg:pt-[180px] pb-20 px-6"
      contentMaxWidth="max-w-[635px]"
      titleFont={fonts.display}
      titleWeight={900}
      titleLeading="leading-[1.15]"
      titleMarginBottom="mb-8"
      className="[&_h1]:text-center [&_h1]:lg:text-left [&_p]:text-center [&_p]:lg:text-left [&_.flex.flex-wrap]:justify-center [&_.flex.flex-wrap]:lg:justify-start"
      title={
        <>
          {pt.hero.title1}
          <br />
          {pt.hero.title2}
        </>
      }
      description={pt.hero.description}
      descriptionClassName="text-white/90 text-[18px] lg:text-[20px] leading-[1.6] mb-10 max-w-[600px] mx-auto lg:mx-0"
      descriptionStyle={{ fontFamily: fonts.display }}
      actionsMarginTop="mt-0"
      actions={
        <div className="flex flex-col gap-6">
          <div>
            <PrimaryButton onClick={handleBooking}>
              {pt.hero.cta}
            </PrimaryButton>
          </div>
          <div className="flex flex-wrap gap-6 lg:gap-8">
            {heroKpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  key={kpi.value}
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    <Icon size={14} className="text-white/60" />
                  </div>
                  <div>
                    <span
                      className="block text-white text-[16px] leading-tight"
                      style={{ fontFamily: fonts.heading, fontWeight: 700 }}
                    >
                      {kpi.value}
                    </span>
                    <span
                      className="block text-white/50 text-[11px] leading-tight"
                      style={{ fontFamily: fonts.body }}
                    >
                      {locale === "DE" ? kpi.labelDe : kpi.labelEn}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      }
      splitAlign="start"
      rightContent={
        <motion.div
          className="flex-1 flex justify-center lg:justify-end relative mx-auto lg:mx-0"
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: transitions.smooth }}
        >
          <div className="relative w-[400px] h-[500px] md:w-[500px] md:h-[600px] lg:w-[600px] lg:h-[700px] mx-auto lg:mx-0">
            <Girl3D />
          </div>
        </motion.div>
      }
    />
  );
}