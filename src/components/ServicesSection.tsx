import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Code, Bot, Blocks, Check, ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { motion, useInView } from "motion/react";
import { Spaceship, Planet, StarShape, ShootingStar } from "./CosmicElements";
import { colors, fonts, transitions } from "./ui/brand";
import { SectionContainer, SectionBadge, SectionHeading } from "./ui/section";
import { openBookingModal } from "./ui/buttons";
import { useTranslation } from "@/i18n/i18n-context";
import enT from "@/translations/english.json";
import deT from "@/translations/german.json";

const services = [
  {
    icon: Code,
    title: "Web Design & Full-Stack Development",
    subtitle:
      "Custom websites and web applications built for performance, scalability, and growth.",
    deliverables: [
      "Custom website design aligned with your brand",
      "Full-stack development (frontend + backend)",
      "UX/UI design focused on conversions",
      "Responsive design for all devices",
      "CMS integration or custom dashboards",
      "Performance optimization & technical SEO",
      "Deployment, hosting & ongoing maintenance",
    ],
    result:
      "A fast, secure, and scalable digital platform that supports your business long-term.",
    gradient: "from-[#0057ff] to-[#00c6ff]",
    glowColor: colors.blue,
    orbColor: "rgba(0, 87, 255, 0.12)",
    number: "01",
    link: "/services/web-design",
  },
  {
    icon: Bot,
    title: "Custom AI Solutions & Automation",
    subtitle:
      "Integrate AI into your workflows to automate tasks, improve efficiency, and unlock new capabilities.",
    deliverables: [
      "Custom AI integrations into websites & apps",
      "MCP servers and AI service infrastructure",
      "AI-powered workflow automation",
      "Custom chatbots & intelligent assistants",
      "Knowledge-base AI on your business data",
      "Automation of manual tasks & cost reduction",
      "Secure deployment & scalable architecture",
    ],
    result:
      "Reduced manual work, faster operations, and smarter business processes powered by AI.",
    gradient: "from-[#a855f7] to-[#ec4899]",
    glowColor: colors.purple,
    orbColor: "rgba(168, 85, 247, 0.12)",
    number: "02",
    link: "/services/ai-solutions",
  },
  {
    icon: Blocks,
    title: "Custom Software & Business Integrations",
    subtitle:
      "Tailored technical solutions designed to solve your specific business challenges.",
    deliverables: [
      "Custom internal tools & business systems",
      "Platform, API & third-party integrations",
      "Workflow automation & system connectivity",
      "Custom dashboards & reporting systems",
      "SaaS product development & MVP creation",
      "Technical consulting & architecture planning",
      "Ongoing support & system evolution",
    ],
    result:
      "Efficient, connected systems that eliminate bottlenecks and enable growth.",
    gradient: "from-[#06b6d4] to-[#10b981]",
    glowColor: colors.teal,
    orbColor: "rgba(6, 182, 212, 0.12)",
    number: "03",
    link: "/services/custom-software",
  },
];

/* ── Floating star particles ── */
function CosmicParticles() {
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
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.15 + 0.03,
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const t = Date.now() * 0.001;

      for (const s of stars) {
        s.y -= s.speed;
        s.pulse += 0.01;
        if (s.y < -5) {
          s.y = rect.height + 5;
          s.x = Math.random() * rect.width;
        }
        const alpha = s.opacity * (0.6 + 0.4 * Math.sin(s.pulse + t));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
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
      style={{ opacity: 0.7 }}
    />
  );
}

/* ── Service card ── */
function ServiceCard({
  service,
  index,
  isInView,
}: {
  service: (typeof services)[0];
  index: number;
  isInView: boolean;
}) {
  const Icon = service.icon;
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (service.link) {
      navigate(service.link);
    } else {
      openBookingModal();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.7,
        delay: index * 0.18,
        ease: transitions.snappy,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-2xl overflow-hidden"
    >
      {/* Gradient border wrapper */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${service.glowColor}60, transparent 50%, ${service.glowColor}30)`,
        }}
      />

      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl blur-xl pointer-events-none"
        animate={{ opacity: hovered ? 0.2 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: service.glowColor }}
      />

      {/* Card body */}
      <div
        className="relative rounded-2xl backdrop-blur-sm flex flex-col flex-1 p-7 md:p-8 overflow-hidden"
        style={{ background: colors.cardDarkOverlay }}
      >
        {/* Decorative orb */}
        <div
          className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-3xl pointer-events-none"
          style={{ background: service.orbColor }}
        />

        {/* Top row: number + icon */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <span
            className="text-[48px] opacity-[0.06]"
            style={{
              fontFamily: fonts.heading,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {service.number}
          </span>
          <motion.div
            animate={{ rotate: hovered ? 8 : 0, scale: hovered ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${service.gradient} shadow-lg`}
            style={{
              boxShadow: hovered
                ? `0 8px 32px ${service.glowColor}50`
                : `0 4px 16px ${service.glowColor}25`,
            }}
          >
            <Icon size={26} color="#fff" strokeWidth={1.8} />
          </motion.div>
        </div>

        {/* Title */}
        <h3
          className="text-white text-[22px] md:text-[24px] leading-[1.3] mb-3 relative z-10"
          style={{ fontFamily: fonts.heading, fontWeight: 700 }}
        >
          {service.title}
        </h3>

        {/* Subtitle */}
        <p
          className="text-[15px] leading-[1.7] mb-6 relative z-10"
          style={{ fontFamily: fonts.body, color: colors.textSlate }}
        >
          {service.subtitle}
        </p>

        {/* Divider */}
        <div className="relative z-10 mb-5">
          <div className="h-px w-full" style={{ background: colors.borderSubtle }} />
          <div
            className={`h-px w-16 bg-gradient-to-r ${service.gradient} -mt-px`}
          />
        </div>

        {/* Deliverables bullet list */}
        <ul className="space-y-3 mb-6 relative z-10 flex-1">
          {service.deliverables.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{
                duration: 0.4,
                delay: index * 0.18 + 0.3 + i * 0.04,
                ease: transitions.smooth,
              }}
              className="flex items-start gap-3 group/item"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-[2px] border"
                style={{
                  borderColor: `${service.glowColor}40`,
                  background: `${service.glowColor}10`,
                }}
              >
                <Check
                  size={11}
                  strokeWidth={3}
                  style={{ color: service.glowColor }}
                />
              </div>
              <span
                className="text-[13.5px] leading-[1.6]"
                style={{ fontFamily: fonts.body, color: colors.textSlateLighter }}
              >
                {item}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Result box */}
        <div
          className="relative z-10 rounded-xl p-4 mb-5 border"
          style={{
            background: `linear-gradient(135deg, ${service.glowColor}08, transparent)`,
            borderColor: `${service.glowColor}15`,
          }}
        >
          <div className="flex items-start gap-2.5">
            <Sparkles
              size={16}
              className="mt-0.5 shrink-0"
              style={{ color: service.glowColor }}
            />
            <p
              className="text-[13px] leading-[1.65]"
              style={{ fontFamily: fonts.body, color: colors.textSlate }}
            >
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${service.glowColor}, #fff)`,
                  fontWeight: 600,
                }}
              >
                Result:{" "}
              </span>
              {service.result}
            </p>
          </div>
        </div>

        {/* CTA link */}
        <a
          href={service.link || "#contact"}
          onClick={handleCtaClick}
          className="relative z-10 inline-flex items-center gap-2 text-[14px] group/link cursor-pointer"
          style={{
            fontFamily: fonts.body,
            fontWeight: 600,
            color: service.glowColor,
          }}
        >
          {service.link ? service._learnMore : service._startProject}
          <motion.span
            className="inline-flex"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <ArrowRight size={15} />
          </motion.span>
        </a>
      </div>
    </motion.div>
  );
}

/* ── Main section ── */
export function ServicesSection() {
  const cardsRef = useRef(null);
  const isInView = useInView(cardsRef, { once: true, margin: "-60px 0px" });
  const { locale } = useTranslation();
  const pt = locale === "DE" ? deT : enT;

  const translatedServices = services.map((s, i) => {
    const overrides = i === 0
      ? { title: pt.servicesSection.webTitle, subtitle: pt.servicesSection.webSubtitle, result: pt.servicesSection.webResult }
      : i === 1
      ? { title: pt.servicesSection.aiTitle, subtitle: pt.servicesSection.aiSubtitle, result: pt.servicesSection.aiResult }
      : { title: pt.servicesSection.softwareTitle, subtitle: pt.servicesSection.softwareSubtitle, result: pt.servicesSection.softwareResult };
    return { ...s, ...overrides, _learnMore: pt.servicesSection.learnMore, _startProject: pt.servicesSection.startProject };
  });

  return (
    <section
      id="services"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: colors.navyDeep }}
    >
      {/* Cosmic background layers */}
      <CosmicParticles />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0, 87, 255, 0.2) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, rgba(6, 182, 212, 0.2), transparent 70%)",
        }}
      />

      {/* Extra cosmic decorations */}
      <motion.div
        className="absolute hidden lg:block z-[1]"
        style={{ top: "6%", right: "3%" }}
        animate={{ x: [0, -12, 0], y: [0, 6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <Spaceship size={100} flip />
      </motion.div>

      <motion.div
        className="absolute hidden md:block z-[1]"
        style={{ bottom: "8%", left: "2%" }}
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Planet size={55} color={colors.purple} ringColor="rgba(168,85,247,0.35)" />
      </motion.div>

      <motion.div
        className="absolute z-[1]"
        style={{ top: "40%", left: "1%" }}
        animate={{ rotate: 360, scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <StarShape size={16} color="rgba(6,182,212,0.4)" />
      </motion.div>

      <motion.div
        className="absolute hidden md:block z-[1]"
        style={{ top: "55%", right: "2%" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <StarShape size={12} color={`${colors.blue}59`} />
      </motion.div>

      <ShootingStar delay={3} style={{ top: "15%", left: "15%", transform: "rotate(-18deg)" }} />
      <ShootingStar delay={7} duration={1.3} style={{ top: "70%", left: "40%", transform: "rotate(-10deg)" }} />

      <SectionContainer className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <SectionBadge variant="dark" className="mb-7">
              {pt.servicesSection.badge}
            </SectionBadge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2
              className="text-white text-[34px] md:text-[48px] leading-[1.2] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700 }}
            >
              {pt.servicesSection.title1}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: colors.gradientServicesAccent,
                }}
              >
                {pt.servicesSection.title2}
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p
              className="text-[16px] md:text-[17px] max-w-[560px] mx-auto leading-[1.7]"
              style={{ fontFamily: fonts.body, color: colors.textSubtle }}
            >
              {pt.servicesSection.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          {translatedServices.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service as any}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}