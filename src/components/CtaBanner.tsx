import { ScrollReveal } from "./ScrollReveal";
import { motion } from "motion/react";
import {
  Spaceship,
  StarField,
  ShootingStar,
  Planet,
  StarShape,
} from "./CosmicElements";
import { colors, fonts } from "./ui/brand";
import { SectionContainer } from "./ui/section";
import { PrimaryButton, openBookingModal } from "./ui/buttons";
import { useTranslation } from "@/i18n/i18n-context";
import enT from "@/translations/english.json";
import deT from "@/translations/german.json";

export function CtaBanner() {
  const handleBooking = () => openBookingModal();
  const { locale } = useTranslation();
  const pt = locale === "DE" ? deT : enT;

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: colors.navy }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[20%] w-[400px] h-[400px] bg-[#2E7ECE] rounded-full opacity-15 blur-[200px]" />
        <div className="absolute bottom-[-30%] left-[10%] w-[500px] h-[500px] bg-[#543365] rounded-full opacity-10 blur-[200px]" />

        {/* Star field */}
        <StarField count={18} color="rgba(255,255,255,0.5)" />

        {/* Shooting star */}
        <ShootingStar delay={2} style={{ top: "20%", left: "30%", transform: "rotate(-12deg)" }} />

        {/* Spaceship - bottom right */}
        <motion.div
          className="absolute hidden md:block"
          style={{ bottom: "15%", right: "5%" }}
          animate={{ x: [0, 12, 0], y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Spaceship size={90} flip />
        </motion.div>

        {/* Planet top-right */}
        <motion.div
          className="absolute hidden lg:block"
          style={{ top: "10%", right: "10%" }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Planet size={35} color={colors.magenta} ringColor="rgba(220,67,244,0.3)" />
        </motion.div>

        {/* Star shapes */}
        <motion.div
          className="absolute"
          style={{ top: "30%", right: "25%" }}
          animate={{ rotate: 360, scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <StarShape size={14} color="rgba(0,183,255,0.5)" />
        </motion.div>
        <motion.div
          className="absolute"
          style={{ bottom: "25%", left: "40%" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <StarShape size={10} color="rgba(255,255,255,0.4)" />
        </motion.div>
      </div>

      <SectionContainer className="relative">
        <div className="max-w-[611px]">
          <ScrollReveal direction="left">
            <h2
              className="text-white text-[32px] md:text-[44px] leading-[1.4] mb-4"
              style={{ fontFamily: fonts.display, fontWeight: 900 }}
            >
              {pt.ctaBanner.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.1}>
            <p
              className="text-white/80 text-[22px] md:text-[28px] leading-[1.5] mb-8"
              style={{ fontFamily: fonts.display }}
            >
              {pt.ctaBanner.subtitle}
            </p>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.2}>
            <PrimaryButton onClick={handleBooking}>
              {pt.ctaBanner.cta}
            </PrimaryButton>
          </ScrollReveal>
        </div>
      </SectionContainer>
    </section>
  );
}