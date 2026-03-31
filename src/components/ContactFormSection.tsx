"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { colors, fonts } from "./ui/brand";
import { SectionContainer } from "./ui/section";
import { PrimaryButton } from "./ui/buttons";
import { useTranslation } from "@/i18n/i18n-context";
import { submitContactForm } from "@/lib/contact";
import { trackContactFormSubmit } from "@/lib/analytics";
import enT from "@/translations/english.json";
import deT from "@/translations/german.json";

export function ContactFormSection() {
  const { locale } = useTranslation();
  const pt = locale === "DE" ? deT : enT;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    trackContactFormSubmit("bottom_contact_form", {
      name: formData.name,
      email: formData.email,
    });

    const result = await submitContactForm({
      name: formData.name,
      email: formData.email,
      company: formData.company || undefined,
      message: formData.message,
      source: "Bottom Contact Form",
    });

    setSending(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || pt.contactForm.error);
    }
  };

  const inputClasses =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[15px] placeholder:text-white/30 focus:outline-none focus:border-[#52bd94]/60 transition-colors";

  return (
    <section
      id="contact-form"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: colors.navyDeep }}
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2E7ECE] opacity-[0.06] blur-[120px] rounded-full" />
      </div>

      <SectionContainer className="relative z-10">
        <div className="max-w-[620px] mx-auto">
          <ScrollReveal>
            <h2
              className="text-white text-[28px] md:text-[36px] leading-[1.25] mb-3 text-center"
              style={{ fontFamily: fonts.heading, fontWeight: 700 }}
            >
              {pt.contactForm.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p
              className="text-[#8896b3] text-[15px] md:text-[16px] mb-10 text-center"
              style={{ fontFamily: fonts.body }}
            >
              {pt.contactForm.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div
              className="rounded-2xl border border-white/[0.08] p-8 md:p-10"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-8 gap-4"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: `${colors.green}22` }}
                    >
                      <CheckCircle2 size={32} style={{ color: colors.green }} />
                    </div>
                    <h3
                      className="text-white text-[22px]"
                      style={{ fontFamily: fonts.heading, fontWeight: 600 }}
                    >
                      {pt.contactForm.thankYou}
                    </h3>
                    <p
                      className="text-[#8896b3] text-[15px]"
                      style={{ fontFamily: fonts.body }}
                    >
                      {pt.contactForm.thankYouSub}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder={pt.contactForm.name}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className={inputClasses}
                        style={{ fontFamily: fonts.body }}
                      />
                      <input
                        type="email"
                        placeholder={pt.contactForm.email}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className={inputClasses}
                        style={{ fontFamily: fonts.body }}
                      />
                    </div>

                    <input
                      type="text"
                      placeholder={pt.contactForm.company}
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className={inputClasses}
                      style={{ fontFamily: fonts.body }}
                    />

                    <textarea
                      placeholder={pt.contactForm.message}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={5}
                      className={`${inputClasses} resize-none`}
                      style={{ fontFamily: fonts.body }}
                    />

                    {error && (
                      <p
                        className="text-red-400 text-[14px]"
                        style={{ fontFamily: fonts.body }}
                      >
                        {error}
                      </p>
                    )}

                    <PrimaryButton
                      type="submit"
                      disabled={sending}
                      className="w-full"
                      style={{ borderRadius: 12, padding: "14px 0", opacity: sending ? 0.7 : 1 }}
                    >
                      {sending ? "…" : pt.contactForm.submit}
                    </PrimaryButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </SectionContainer>
    </section>
  );
}
