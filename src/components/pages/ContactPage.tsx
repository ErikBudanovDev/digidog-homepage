import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, useInView } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Calendar,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Users,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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

import erikPhoto from "figma:asset/c28a01d5ca35b1e207da7537c250359543a3aa75.png";
const erikPhotoSrc = erikPhoto as unknown as string;
import { SEO } from "@/components/SEO";
import { useTranslation } from "@/i18n/i18n-context";
import { trackContactFormSubmit } from "@/lib/analytics";
import enPg from "@/translations/pages/english.json";
import dePg from "@/translations/pages/german.json";

/* ─────────────────────────────────────────────
 * DATA
 * ───────────────────────────────────────────── */

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@digidog.org",
    href: "mailto:info@digidog.org",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+43 664 93020594",
    href: "tel:+4366493020594",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Yerevan, Armenia & Remote",
    href: null,
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Fri, 09:00 – 18:00",
    href: null,
  },
];

const serviceOptions = [
  "Web Design & Development",
  "AI Solutions & Automation",
  "Custom Software",
  "SEO & Marketing",
  "App Development",
  "Other",
];

const whyChoose = [
  {
    icon: Zap,
    title: "Fast Response Time",
    text: "We respond to your inquiry within 24 hours.",
  },
  {
    icon: Users,
    title: "Personal Consultation",
    text: "Every project gets a dedicated point of contact.",
  },
  {
    icon: MessageSquare,
    title: "Free Initial Consultation",
    text: "30-minute introductory call with no obligations.",
  },
];

const faqItems = [
  {
    q: "How does the initial consultation work?",
    a: "In a 30-minute call, we analyze your requirements, discuss goals, and outline possible solutions — completely free and non-binding.",
  },
  {
    q: "How long does a typical project take?",
    a: "Depending on scope, between 4–12 weeks. A simple website is ready in 4–6 weeks; more complex software solutions require 8–12 weeks.",
  },
  {
    q: "What does a web design project cost?",
    a: "Our projects start from €3,000. We determine the exact price individually based on your requirements and project scope.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes! We offer maintenance and support packages to keep your digital solution up-to-date, secure, and performant at all times.",
  },
];

/* ─────────────────────────────────────────────
 * HERO BACKGROUND
 * ───────────────────────────────────────────── */

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Star clusters */}
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

      {/* Blue glow */}
      <div
        className="absolute opacity-40"
        style={{ top: "10%", left: "30%", width: "55%", height: "80%" }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1753 1551">
          <g filter="url(#contact_blue_glow)">
            <ellipse cx="877" cy="776" rx="480" ry="350" fill="#2E7ECE" opacity="0.4" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1551" id="contact_blue_glow" width="1753" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1" stdDeviation="200" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Purple glow */}
      <motion.div
        className="absolute opacity-10"
        style={{ top: "60%", left: "60%", width: "50%", height: "60%" }}
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 800">
          <g filter="url(#contact_purple_glow)">
            <ellipse cx="500" cy="400" rx="350" ry="220" fill="#DC43F4" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="800" id="contact_purple_glow" width="1000" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1" stdDeviation="200" />
            </filter>
          </defs>
        </svg>
      </motion.div>

      <StarField count={50} color="rgba(255,255,255,0.7)" />

      <ShootingStar delay={2} style={{ top: "15%", left: "10%", transform: "rotate(-15deg)" }} />
      <ShootingStar delay={8} duration={1.3} style={{ top: "45%", left: "65%", transform: "rotate(-22deg)" }} />

      <motion.div
        className="absolute hidden lg:block"
        style={{ top: "8%", right: "6%" }}
        animate={{ x: [0, -10, 0], y: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Spaceship size={70} />
      </motion.div>

      <motion.div
        className="absolute hidden md:block"
        style={{ bottom: "15%", left: "4%" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Planet size={30} color={colors.green} ringColor="rgba(82,189,148,0.3)" />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ top: "30%", left: "3%" }}
        animate={{ rotate: 360, scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <StarShape size={12} color="rgba(82,189,148,0.5)" />
      </motion.div>
      <motion.div
        className="absolute hidden md:block"
        style={{ top: "55%", right: "10%" }}
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

function ContactHero() {
  const { locale } = useTranslation();
  const t = (locale === "DE" ? dePg : enPg).contact;
  const heroLines = t.heroTitle.split('\n');
  return (
    <HeroLayout
      backgroundElements={<HeroBackground />}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: t.heroBreadcrumb, color: colors.green },
      ]}
      badge={t.heroBadge}
      title={
        <>
          {heroLines[0]}
          <br />
          {heroLines[1]}
          <br />
          {heroLines[2]}
        </>
      }
      description={t.heroDescription}
      minHeight="min-h-[600px] lg:min-h-[720px]"
      padding="py-[160px] lg:py-[200px]"
      actions={
        <a
          href="#contact-form"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white text-[17px] cursor-pointer transition-all"
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            background: colors.green,
          }}
        >
          {t.heroCta}
          <Send size={18} />
        </a>
      }
    />
  );
}

/* ─────────────────────────────────────────────
 * CONTACT INFO CARDS
 * ───────────────────────────────────────────── */

function ContactInfoCards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="relative py-16 md:py-20" style={{ background: colors.navyDeep }}>
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <SectionContainer>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: transitions.smooth }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="block p-6 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all group"
                    style={{ background: colors.cardDark }}
                  >
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: `${colors.green}15`, border: `1px solid ${colors.green}25` }}
                    >
                      <Icon size={20} style={{ color: colors.green }} strokeWidth={1.8} />
                    </div>
                    <p
                      className="text-[13px] uppercase tracking-[1.5px] mb-1"
                      style={{ fontFamily: fonts.body, color: colors.textSlate }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-[15px] group-hover:text-white transition-colors"
                      style={{ fontFamily: fonts.body, fontWeight: 500, color: colors.textSlateLighter }}
                    >
                      {item.value}
                    </p>
                  </a>
                ) : (
                  <div
                    className="p-6 rounded-xl border border-white/[0.06]"
                    style={{ background: colors.cardDark }}
                  >
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: `${colors.green}15`, border: `1px solid ${colors.green}25` }}
                    >
                      <Icon size={20} style={{ color: colors.green }} strokeWidth={1.8} />
                    </div>
                    <p
                      className="text-[13px] uppercase tracking-[1.5px] mb-1"
                      style={{ fontFamily: fonts.body, color: colors.textSlate }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-[15px]"
                      style={{ fontFamily: fonts.body, fontWeight: 500, color: colors.textSlateLighter }}
                    >
                      {item.value}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * CONTACT FORM + SIDEBAR
 * ───────────────────────────────────────────── */

function ContactFormSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const { locale } = useTranslation();
  const t = (locale === "DE" ? dePg : enPg).contact;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackContactFormSubmit("contact_page", { name: formData.name, email: formData.email, service: formData.service });
    setSubmitted(true);
  };

  const inputClasses =
    "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-[15px] placeholder:text-white/25 focus:outline-none focus:border-[#52bd94]/40 focus:bg-white/[0.05] transition-all";

  return (
    <section
      id="contact-form"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: colors.navyDeep }}
    >
      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-10"
        style={{ background: "radial-gradient(ellipse, rgba(82,189,148,0.2), transparent 70%)" }}
      />

      <SectionContainer className="relative z-10">
        <div ref={ref} className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            className="flex-[1.2]"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.7, ease: transitions.smooth }}
          >
            <SectionBadge variant="dark" className="mb-5">
              {t.formBadge}
            </SectionBadge>

            <h2
              className="text-white text-[28px] md:text-[38px] leading-[1.2] mb-3"
              style={{ fontFamily: fonts.heading, fontWeight: 700 }}
            >
              {t.formTitle1}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${colors.green}, #00c6ff)` }}
              >
                {t.formTitle2}
              </span>
            </h2>
            <p
              className="text-[15px] mb-8 max-w-[500px] leading-[1.7]"
              style={{ fontFamily: fonts.body, color: colors.textSlate }}
            >
              {t.formSubtitle}
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 rounded-2xl border border-white/[0.08] text-center"
                style={{ background: colors.cardDark }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: `${colors.green}20` }}
                >
                  <CheckCircle2 size={36} style={{ color: colors.green }} />
                </div>
                <h3
                  className="text-white text-[24px] mb-2"
                  style={{ fontFamily: fonts.heading, fontWeight: 700 }}
                >
                  {t.formThankYou}
                </h3>
                <p className="text-[15px] mb-6" style={{ fontFamily: fonts.body, color: colors.textSlate }}>
                  {t.formThankYouSub}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" });
                  }}
                  className="text-[14px] underline underline-offset-4 cursor-pointer transition-colors"
                  style={{ fontFamily: fonts.body, color: colors.green }}
                >
                  {t.formNewMessage}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-[13px] mb-2 uppercase tracking-[1px]"
                      style={{ fontFamily: fonts.body, color: colors.textSlate }}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className={inputClasses}
                      style={{ fontFamily: fonts.body }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[13px] mb-2 uppercase tracking-[1px]"
                      style={{ fontFamily: fonts.body, color: colors.textSlate }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className={inputClasses}
                      style={{ fontFamily: fonts.body }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-[13px] mb-2 uppercase tracking-[1px]"
                      style={{ fontFamily: fonts.body, color: colors.textSlate }}
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+49 176 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClasses}
                      style={{ fontFamily: fonts.body }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[13px] mb-2 uppercase tracking-[1px]"
                      style={{ fontFamily: fonts.body, color: colors.textSlate }}
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={inputClasses}
                      style={{ fontFamily: fonts.body }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-[13px] mb-2 uppercase tracking-[1px]"
                      style={{ fontFamily: fonts.body, color: colors.textSlate }}
                    >
                      Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className={`${inputClasses} appearance-none cursor-pointer`}
                      style={{ fontFamily: fonts.body }}
                    >
                      <option value="" className="bg-[#0f1d35] text-white/50">
                        Please select...
                      </option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s} className="bg-[#0f1d35] text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-[13px] mb-2 uppercase tracking-[1px]"
                      style={{ fontFamily: fonts.body, color: colors.textSlate }}
                    >
                      Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className={`${inputClasses} appearance-none cursor-pointer`}
                      style={{ fontFamily: fonts.body }}
                    >
                      <option value="" className="bg-[#0f1d35] text-white/50">
                        Please select...
                      </option>
                      <option value="< 3.000 €" className="bg-[#0f1d35] text-white">
                        {"< 3.000 €"}
                      </option>
                      <option value="3.000 – 5.000 €" className="bg-[#0f1d35] text-white">
                        3.000 – 5.000 €
                      </option>
                      <option value="5.000 – 10.000 €" className="bg-[#0f1d35] text-white">
                        5.000 – 10.000 €
                      </option>
                      <option value="10.000 – 25.000 €" className="bg-[#0f1d35] text-white">
                        10.000 – 25.000 €
                      </option>
                      <option value="> 25.000 €" className="bg-[#0f1d35] text-white">
                        {"> 25.000 €"}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-[13px] mb-2 uppercase tracking-[1px]"
                    style={{ fontFamily: fonts.body, color: colors.textSlate }}
                  >
                    Message *
                  </label>
                  <textarea
                    placeholder="Describe your project, your goals, and your vision..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className={`${inputClasses} resize-none`}
                    style={{ fontFamily: fonts.body }}
                  />
                </div>

                <PrimaryButton
                  type="submit"
                  className="w-full sm:w-auto"
                  style={{ borderRadius: 12, padding: "16px 40px" }}
                >
                  <span className="inline-flex items-center gap-2">
                    {t.formSubmit}
                    <Send size={16} />
                  </span>
                </PrimaryButton>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.15, ease: transitions.smooth }}
          >
            {/* Erik CTA card */}
            <div
              className="p-6 rounded-2xl border border-white/[0.06] mb-6"
              style={{ background: colors.cardDark }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="relative">
                  <div
                    className="absolute -inset-0.5 rounded-full opacity-40"
                    style={{
                      background: "linear-gradient(135deg, rgba(82,189,148,0.4), rgba(0,87,255,0.3))",
                      filter: "blur(6px)",
                    }}
                  />
                  <div className="relative w-[56px] h-[56px] rounded-full overflow-hidden border-2 border-white/15">
                    <img src={erikPhotoSrc} alt="Erik Budanov" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <h3
                    className="text-white text-[16px]"
                    style={{ fontFamily: fonts.heading, fontWeight: 600 }}
                  >
                    Erik Budanov
                  </h3>
                  <p className="text-[13px]" style={{ fontFamily: fonts.body, color: colors.textSlate }}>
                    Founder & Lead Developer
                  </p>
                </div>
              </div>

              <p
                className="text-[14px] leading-[1.65] mb-5"
                style={{ fontFamily: fonts.body, color: colors.textSlate }}
              >
                "{t.erikQuote}"
              </p>

              <motion.button
                onClick={() =>
                  document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 text-[14px] cursor-pointer transition-colors"
                style={{ fontFamily: fonts.body, fontWeight: 600, color: colors.green }}
                whileHover={{ x: 3 }}
              >
                <Calendar size={15} />
                {t.erikCta}
                <ArrowRight size={14} />
              </motion.button>
            </div>

            {/* Why choose us */}
            <div className="space-y-4">
              {whyChoose.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl border border-white/[0.06] flex gap-4"
                    style={{ background: colors.cardDark }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${colors.blue}12`, border: `1px solid ${colors.blue}20` }}
                    >
                      <Icon size={18} style={{ color: colors.blue }} strokeWidth={1.8} />
                    </div>
                    <div>
                      <h4
                        className="text-white text-[15px] mb-1"
                        style={{ fontFamily: fonts.heading, fontWeight: 600 }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-[13px] leading-[1.6]"
                        style={{ fontFamily: fonts.body, color: colors.textSlate }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * FAQ
 * ───────────────────────────────────────────── */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const { locale } = useTranslation();
  const t = (locale === "DE" ? dePg : enPg).contact;
  const translatedFaq = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
  ];

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <SectionContainer>
        <div className="text-center mb-14">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">
              {t.faqBadge}
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-[28px] md:text-[40px] leading-[1.25] max-w-[600px] mx-auto"
              style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
            >
              {t.faqTitle1}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${colors.blue}, ${colors.green})` }}
              >
                {t.faqTitle2}
              </span>
            </h2>
          </ScrollReveal>
        </div>

        <div ref={ref} className="max-w-[720px] mx-auto space-y-3">
          {translatedFaq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: transitions.smooth }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer transition-colors hover:bg-gray-50"
                >
                  <span
                    className="text-[15px] md:text-[16px]"
                    style={{ fontFamily: fonts.heading, fontWeight: 600, color: colors.textDark }}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: isOpen ? colors.blue : `${colors.blue}10`,
                      color: isOpen ? "white" : colors.blue,
                    }}
                  >
                    <span className="text-[18px] leading-none">+</span>
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: transitions.smooth }}
                  className="overflow-hidden"
                >
                  <p
                    className="px-5 pb-5 text-[14px] md:text-[15px] leading-[1.7]"
                    style={{ fontFamily: fonts.body, color: colors.textMuted }}
                  >
                    {item.a}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * MAP BANNER
 * ───────────────────────────────────────────── */

function MapBanner() {
  const { locale } = useTranslation();
  const t = (locale === "DE" ? dePg : enPg).contact;
  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ background: colors.navyDeep }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <SectionContainer className="relative z-10">
        <div className="rounded-2xl overflow-hidden border border-white/[0.06]" style={{ background: colors.cardDark }}>
          <div className="relative h-[280px] md:h-[360px]">
            {/* Stylized map placeholder */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${colors.navy} 0%, #0f1d35 50%, #0c1a3a 100%)`,
              }}
            >
              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
                  backgroundSize: "60px 60px",
                }}
              />

              {/* City pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: colors.green, boxShadow: `0 0 30px ${colors.green}40` }}
                  >
                    <MapPin size={22} className="text-white" />
                  </div>
                </motion.div>
                <div
                  className="mt-3 px-4 py-2 rounded-lg border border-white/[0.08]"
                  style={{ background: colors.cardDarkOverlay }}
                >
                  <p
                    className="text-white text-[14px] text-center"
                    style={{ fontFamily: fonts.heading, fontWeight: 600 }}
                  >
                    {t.mapCity}
                  </p>
                  <p
                    className="text-[12px] text-center"
                    style={{ fontFamily: fonts.body, color: colors.textSlate }}
                  >
                    {t.mapSub}
                  </p>
                </div>
              </div>

              {/* Pulse rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                    style={{ borderColor: `${colors.green}15` }}
                    initial={{ width: 40, height: 40, opacity: 0.6 }}
                    animate={{
                      width: [40, 40 + i * 80],
                      height: [40, 40 + i * 80],
                      opacity: [0.4, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * PAGE
 * ───────────────────────────────────────────── */

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden scroll-smooth" style={{ background: colors.navyDeep }}>
            <SEO
        title="Contact Us - Free AI & Web Development Consultation"
        description="Get in touch with Digidog for a free consultation on AI automation, web development, or custom software. We respond within 24 hours."
        canonical="/contact"
      />
      <Navbar />
      <ContactHero />
      <ContactInfoCards />
      <ContactFormSection />
      <FAQSection />
      <MapBanner />
      <Footer />
    </div>
  );
}