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
  { icon: DollarSign, value: "$1,200→$210", labelEn: "Monthly SaaS cost replaced", labelDe: "Monatliche SaaS-Kosten ersetzt" },
  { icon: Clock, value: "25 hrs/wk", labelEn: "Manual work eliminated", labelDe: "Manuelle Arbeit eliminiert" },
  { icon: Zap, value: "1 prompt", labelEn: "Replaces 5 tools + 3 hours", labelDe: "Ersetzt 5 Tools + 3 Stunden" },
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
      className="[&_.text-column]:text-center [&_.text-column]:lg:text-left"
      title={
        <>
          {pt.hero.title1}
          <br />
          {pt.hero.title2}
        </>
      }
      description={pt.hero.description}
      descriptionClassName="text-white/90 text-[18px] lg:text-[20px] leading-[1.6] mb-10 max-w-[600px] mx-auto lg:mx-0 text-center lg:text-left"
      descriptionStyle={{ fontFamily: fonts.display }}
      actionsMarginTop="mt-0"
      actions={
        <div className="flex flex-col gap-6 items-center lg:items-start">
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
          {/* Mobile/Tablet: Static image */}
          <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] lg:hidden mx-auto">
            <ImageWithFallback
              src="/girl/Loading.png"
              alt="AI Assistant"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Desktop: 3D Girl */}
          <div className="hidden lg:block relative w-[520px] h-[650px] mx-0">
            <Girl3D />
          </div>
        </motion.div>
      }
    />
  );
}