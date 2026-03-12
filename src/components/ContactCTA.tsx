import { useState, useRef, useEffect } from "react";
import { ArrowRight, X, Calendar, Clock } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { motion, AnimatePresence } from "motion/react";
import erikPhoto from "figma:asset/c28a01d5ca35b1e207da7537c250359543a3aa75.png";
const erikPhotoSrc = erikPhoto as unknown as string;
import { Spaceship, Planet, StarShape } from "./CosmicElements";
import { colors, fonts } from "./ui/brand";
import { SectionContainer } from "./ui/section";
import { PrimaryButton } from "./ui/buttons";
import { useTranslation } from "@/i18n/i18n-context";
import { trackContactFormSubmit } from "@/lib/analytics";
import enT from "@/translations/english.json";
import deT from "@/translations/german.json";

/* ── Cosmic floating orbs ── */
function CosmicOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.08 + 0.02,
      opacity: Math.random() * 0.5 + 0.15,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);
      const t = Date.now() * 0.001;

      for (const s of stars) {
        s.y -= s.speed * 0.001;
        if (s.y < -0.02) {
          s.y = 1.02;
          s.x = Math.random();
        }
        const alpha = s.opacity * (0.5 + 0.5 * Math.sin(s.phase + t * 0.8));
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

export function ContactCTA() {
  const { locale } = useTranslation();
  const pt = locale === "DE" ? deT : enT;
  const [bookingOpen, setBookingOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = () => setBookingOpen(true);
    window.addEventListener("open-booking-modal", handler);
    return () => window.removeEventListener("open-booking-modal", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackContactFormSubmit("hero_cta_modal", { name: formData.name, email: formData.email });
    setSubmitted(true);
    setTimeout(() => {
      setBookingOpen(false);
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 2000);
  };

  const inputClasses =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] placeholder:text-white/30 focus:outline-none focus:border-[#52bd94]/50 transition-colors";

  return (
    <>
      <section
        id="contact"
        className="relative py-14 md:py-20 overflow-hidden"
        style={{ background: colors.gradientCosmic }}
      >
        {/* Cosmic background effects */}
        <CosmicOrbs />

        {/* Cosmic decorative elements */}
        <motion.div
          className="absolute hidden md:block z-[1]"
          style={{ top: "8%", left: "4%" }}
          animate={{ x: [0, 10, 0], y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Spaceship size={80} />
        </motion.div>

        <motion.div
          className="absolute hidden lg:block z-[1]"
          style={{ bottom: "12%", right: "4%" }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Planet size={38} color={colors.cyan} ringColor="rgba(0,183,255,0.3)" />
        </motion.div>

        <motion.div
          className="absolute z-[1]"
          style={{ top: "20%", right: "15%" }}
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <StarShape size={14} color="rgba(0,183,255,0.4)" />
        </motion.div>

        <motion.div
          className="absolute z-[1]"
          style={{ bottom: "30%", left: "12%" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <StarShape size={10} color="rgba(220,67,244,0.35)" />
        </motion.div>

        {/* Subtle gradient lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Content */}
        <SectionContainer className="relative z-10 text-center">
          {/* Heading */}
          <ScrollReveal>
            <h2
              className="text-white text-[32px] md:text-[46px] leading-[1.2] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700 }}
            >
              {pt.contactCta.title}
            </h2>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={0.1}>
            <p
              className="text-[#a0aec0] text-[16px] md:text-[17px] mb-7"
              style={{ fontFamily: fonts.body }}
            >
              {pt.contactCta.subtitle}
            </p>
          </ScrollReveal>

          {/* Profile photo */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div
                  className="absolute -inset-1 rounded-full opacity-40"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(100, 140, 255, 0.4), rgba(160, 100, 255, 0.3))",
                    filter: "blur(8px)",
                  }}
                />
                <div className="relative w-[80px] h-[80px] md:w-[96px] md:h-[96px] rounded-full overflow-hidden border-[3px] border-white/20">
                  <img
                    src={erikPhotoSrc}
                    alt="Erik Budanov"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3
                className="text-white text-[17px] md:text-[18px] mb-0.5"
                style={{ fontFamily: fonts.heading, fontWeight: 600 }}
              >
                Erik Budanov
              </h3>
              <p
                className="text-[#8896b3] text-[14px] md:text-[15px]"
                style={{ fontFamily: fonts.body }}
              >
                Founder & Lead Developer
              </p>
            </div>
          </ScrollReveal>

          {/* CTA Link */}
          <ScrollReveal delay={0.3}>
            <motion.button
              onClick={() => setBookingOpen(true)}
              className="inline-flex items-center gap-3 cursor-pointer group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span
                className="text-white text-[16px] md:text-[17px] border-b border-white/60 pb-0.5 group-hover:border-white transition-colors"
                style={{ fontFamily: fonts.body, fontWeight: 600 }}
              >
              {pt.contactCta.cta}
              </span>
              <motion.span
                className="text-white"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight size={18} />
              </motion.span>
            </motion.button>
          </ScrollReveal>
        </SectionContainer>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 backdrop-blur-sm"
              style={{ background: colors.overlayBlack60 }}
              onClick={() => setBookingOpen(false)}
            />
            <motion.div
              className="relative border border-white/10 rounded-2xl p-8 max-w-[500px] w-full shadow-2xl"
              style={{ background: colors.navyDeep }}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setBookingOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${colors.green}33` }}
                  >
                    <Calendar size={32} style={{ color: colors.green }} />
                  </div>
                  <h3
                    className="text-white text-[24px] mb-2"
                    style={{ fontFamily: fonts.heading }}
                  >
                    Thank you!
                  </h3>
                  <p
                    className="text-white/60 text-[15px]"
                    style={{ fontFamily: fonts.body }}
                  >
                    We will get back to you shortly.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: `${colors.green}33` }}
                    >
                      <Clock size={20} style={{ color: colors.green }} />
                    </div>
                    <div>
                      <h3
                        className="text-white text-[20px]"
                        style={{ fontFamily: fonts.heading }}
                      >
                        Book Consultation
                      </h3>
                      <p
                        className="text-white/50 text-[13px]"
                        style={{ fontFamily: fonts.body }}
                      >
                        30 Minutes &bull; Free
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
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
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className={inputClasses}
                      style={{ fontFamily: fonts.body }}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number (optional)"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={inputClasses}
                      style={{ fontFamily: fonts.body }}
                    />
                    <textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={3}
                      className={`${inputClasses} resize-none`}
                      style={{ fontFamily: fonts.body }}
                    />
                    <PrimaryButton
                      type="submit"
                      className="w-full"
                      style={{ borderRadius: 12, padding: "14px 0" }}
                    >
                      Request Appointment
                    </PrimaryButton>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}