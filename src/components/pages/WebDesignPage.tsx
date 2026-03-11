import { colors, fonts, transitions, layout, portfolioCardGradientBg } from "@/components/ui/brand";
import { SectionContainer, SectionBadge, SectionHeading } from "@/components/ui/section";
import { PrimaryButton, ArrowIcon, LinkWithArrow, openBookingModal } from "@/components/ui/buttons";
import { HeroLayout } from "@/components/ui/hero-layout";
import webDesignHeroImage from "figma:asset/f7a8d04658541304c4fc27c4c302b2ecbe7efaef.png";
import { useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Paintbrush, Code, Layers, Smartphone, Server, Gauge, Shield, Wrench, Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { TrustedPartners } from "@/components/TrustedPartners";
import { ContactCTA } from "@/components/ContactCTA";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StarField, ShootingStar, Spaceship, Planet, StarShape } from "@/components/CosmicElements";
import { SEO, serviceSchema } from "@/components/SEO";
import { useTranslation } from "@/i18n/i18n-context";

/* ─────────────────────────────────────────────
 * DATA
 * ───────────────────────────────────────────── */

const deliverables = [
  {
    icon: Paintbrush,
    title: "Custom Website Design",
    text: "Individual design that perfectly represents your brand and converts visitors into customers.",
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    text: "Modern frontend and backend development with React, Next.js, Node.js, and other technologies.",
  },
  {
    icon: Layers,
    title: "UX/UI Design",
    text: "User-centered design focused on conversions, usability, and a seamless user experience.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    text: "Perfect display on all devices — desktop, tablet, and smartphone.",
  },
  {
    icon: Server,
    title: "CMS & Custom Dashboards",
    text: "Integration of content management systems or custom admin dashboards.",
  },
  {
    icon: Gauge,
    title: "Performance & SEO",
    text: "Technical optimization for lightning-fast load times and top search engine rankings.",
  },
  {
    icon: Shield,
    title: "Security & Hosting",
    text: "SSL encryption, secure server configuration, and reliable hosting.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    text: "Ongoing support, updates, and technical assistance for long-term success.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Consulting & Analysis",
    text: "We analyze your goals, target audience, and competitors to develop a tailored strategy.",
  },
  {
    number: "02",
    title: "Concept & Design",
    text: "Wireframes and visual design — iteratively refined until every page is perfect.",
  },
  {
    number: "03",
    title: "Development",
    text: "Clean, performant code using modern technologies and best practices.",
  },
  {
    number: "04",
    title: "Testing & Launch",
    text: "Thorough testing on all devices, performance optimization, and smooth go-live.",
  },
  {
    number: "05",
    title: "Support & Growth",
    text: "Ongoing maintenance, analytics, and continuous improvement of your digital platform.",
  },
];

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "TailwindCSS",
  "PostgreSQL",
  "Supabase",
  "Vercel",
  "Figma",
  "Strapi",
  "GraphQL",
  "Docker",
];

const portfolioProjects = [
  {
    title: "Miso Supermarket & Bakery",
    description:
      "Modern web design and digital solution for a local supermarket with integrated online shop and ordering system.",
    image:
      "https://images.unsplash.com/photo-1591538519435-4578c3ba26d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGJha2VyeSUyMHN0b3JlZnJvbnR8ZW58MXx8fHwxNzcyMjE0NzYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Web Design", "E-Commerce", "CMS"],
  },
  {
    title: "TechVision Dashboard",
    description:
      "Complete redesign of an enterprise dashboard with modern UI/UX design and responsive layout.",
    image:
      "https://images.unsplash.com/photo-1642054220942-d3c7dd1466cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB3ZWJzaXRlJTIwcmVkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzcyMjY5MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Full-Stack", "Dashboard", "React"],
  },
  {
    title: "Bella Cucina Restaurant",
    description:
      "Elegant website with online reservations and digital menu for an upscale Italian restaurant.",
    image:
      "https://images.unsplash.com/photo-1681310483042-64aa6776f112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwd2Vic2l0ZSUyMGVsZWdhbnQlMjBkYXJrfGVufDF8fHx8MTc3MjI2OTM0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Web Design", "Responsive", "SEO"],
  },
  {
    title: "Luxe Fashion Online Shop",
    description:
      "High-end e-commerce solution with personalized recommendations and seamless checkout experience.",
    image:
      "https://images.unsplash.com/photo-1548524238-a971a4a3b523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc3MjIyNDU1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["E-Commerce", "Full-Stack", "Performance"],
  },
];

/* ─────────────────────────────────────────────
 * COSMIC HERO BACKGROUND (matching Figma import)
 * ───────────────────────────────────────────── */

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient blobs */}
      <div
        className="absolute opacity-10 rounded-full blur-[150px]"
        style={{
          top: "-5%",
          left: "43%",
          width: "55%",
          height: "100%",
          background: "radial-gradient(ellipse, white, transparent 70%)",
        }}
      />

      <motion.div
        className="absolute opacity-10 rounded-full blur-[150px]"
        style={{
          top: "95%",
          left: "60%",
          width: "40%",
          height: "70%",
          background: "radial-gradient(ellipse, #00C59B, transparent 70%)",
        }}
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute opacity-10 rounded-full blur-[150px]"
        style={{
          top: "85%",
          left: "32%",
          width: "62%",
          height: "75%",
          background: "radial-gradient(ellipse, #DC43F4, transparent 70%)",
        }}
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Blue glow (right-center) */}
      <div
        className="absolute opacity-40 rounded-full blur-[150px]"
        style={{
          top: "25%",
          left: "48%",
          width: "50%",
          height: "75%",
          background: "radial-gradient(ellipse, #2E7ECE, transparent 70%)",
        }}
      />

      <StarField count={60} color="rgba(255,255,255,0.7)" />

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "15%",
          right: "8%",
          width: 120,
          height: 120,
          background: "radial-gradient(circle, rgba(100, 180, 255, 0.35) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <ShootingStar delay={2} style={{ top: "20%", left: "15%", transform: "rotate(-15deg)" }} />
      <ShootingStar delay={6} duration={1.3} style={{ top: "45%", left: "55%", transform: "rotate(-22deg)" }} />

      <motion.div
        className="absolute hidden lg:block"
        style={{ top: "8%", right: "6%" }}
        animate={{ x: [0, -12, 0], y: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Spaceship size={90} />
      </motion.div>

      <motion.div
        className="absolute hidden md:block"
        style={{ bottom: "15%", left: "4%" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Planet size={40} color={colors.blue} ringColor="rgba(0, 87, 255, 0.3)" />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ top: "30%", left: "3%" }}
        animate={{ rotate: 360, scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <StarShape size={14} color="rgba(0, 183, 255, 0.5)" />
      </motion.div>
      <motion.div
        className="absolute hidden md:block"
        style={{ top: "55%", right: "10%" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <StarShape size={10} color="rgba(255, 255, 255, 0.4)" />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * SECTIONS
 * ───────────────────────────────────────────── */

function ServiceHero() {
  const { t } = useTranslation();
  return (
    <HeroLayout
      backgroundElements={<HeroBackground />}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: t.web.breadcrumbService, path: "/" },
        { label: t.web.breadcrumbPage, color: colors.blue },
      ]}
      badge={t.web.heroBadge}
      title={
        <>
          {t.web.heroTitle1}
          <br />
          {t.web.heroTitle2}
        </>
      }
      description={t.web.heroDescription}
      actions={
        <>
          <PrimaryButton
            onClick={() => openBookingModal()}
          >
            {t.web.heroCtaPrimary}
          </PrimaryButton>
          <a
            href="#deliverables"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#deliverables")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white text-[17px] hover:border-white/40 hover:bg-white/5 transition-all cursor-pointer"
            style={{ fontFamily: fonts.display, fontWeight: 600 }}
          >
            {t.web.heroCtaSecondary}
            <ArrowRight size={18} />
          </a>
        </>
      }
      rightContent={
        <motion.div
          className="hidden lg:block relative w-[780px] h-[600px] shrink-0"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: transitions.smooth }}
        >
          <motion.div
            className="relative w-full h-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={webDesignHeroImage}
              alt="Website Creation and Analytics"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>
      }
      splitAlign="center"
    />
  );
}

/* ── Deliverables Grid ── */
function DeliverablesSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      id="deliverables"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: colors.navyDeep }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse, rgba(0,87,255,0.25), transparent 70%)",
        }}
      />

      <SectionContainer className="relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionBadge variant="dark" className="mb-6">
              {t.web.deliverablesBadge}
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-white text-[32px] md:text-[44px] leading-[1.2] mb-5"
              style={{ fontFamily: fonts.heading, fontWeight: 700 }}
            >
              {t.web.deliverablesTitle1}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${colors.blue}, #00c6ff)` }}
              >
                {t.web.deliverablesTitle2}
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="text-[16px] md:text-[17px] max-w-[560px] mx-auto leading-[1.7]"
              style={{ fontFamily: fonts.body, color: colors.textSubtle }}
            >
              From design to development to hosting — we cover
              the entire lifecycle of your digital project.
            </p>
          </ScrollReveal>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {deliverables.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: transitions.smooth }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300 cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${colors.blue}20, ${colors.blue}08)`,
                    border: `1px solid ${colors.blue}25`,
                  }}
                >
                  <Icon size={22} style={{ color: colors.blue }} strokeWidth={1.8} />
                </div>
                <h3
                  className="text-white text-[17px] mb-2"
                  style={{ fontFamily: fonts.heading, fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[14px] leading-[1.65]"
                  style={{ fontFamily: fonts.body, color: colors.textSlate }}
                >
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ── Single showcase row (hooks-safe) ── */
function ShowcaseRow({
  item,
  isLast,
}: {
  item: { title: string; text: string; bullets: string[]; image: string; reverse: boolean };
  isLast: boolean;
}) {
  const rowRef = useRef(null);
  const rowInView = useInView(rowRef, { once: true, margin: "-80px 0px" });

  return (
    <div
      ref={rowRef}
      className={`flex flex-col ${
        item.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center gap-12 lg:gap-16 ${!isLast ? "mb-20 md:mb-28" : ""}`}
    >
      <motion.div
        className="flex-1 w-full max-w-[560px]"
        initial={{ opacity: 0, x: item.reverse ? 40 : -40 }}
        animate={rowInView ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.7, ease: transitions.smooth }}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
          <ImageWithFallback
            src={item.image}
            alt={item.title}
            className="w-full aspect-[4/3] object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(0,87,255,0.05), transparent 60%)" }}
          />
        </div>
      </motion.div>
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: item.reverse ? -40 : 40 }}
        animate={rowInView ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.7, delay: 0.15, ease: transitions.smooth }}
      >
        <h3
          className="text-[26px] md:text-[32px] leading-[1.25] mb-4"
          style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.textDark }}
        >
          {item.title}
        </h3>
        <p
          className="text-[16px] leading-[1.7] mb-6"
          style={{ fontFamily: fonts.body, color: colors.textMuted }}
        >
          {item.text}
        </p>
        <ul className="space-y-3">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${colors.blue}15`, border: `1px solid ${colors.blue}30` }}
              >
                <Check size={11} strokeWidth={3} style={{ color: colors.blue }} />
              </div>
              <span className="text-[15px]" style={{ fontFamily: fonts.body, color: colors.textDark }}>
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/* ── Visual Showcase ── */
function ShowcaseSection() {
  const { t } = useTranslation();
  const showcases = [
    {
      title: "Design That Strengthens Your Brand",
      text: "Every project starts with a deep understanding of your brand. We create visual identities that don't just look great but build trust and turn visitors into customers.",
      bullets: [
        "Custom design concepts instead of templates",
        "Conversion-oriented layouts",
        "Consistent brand experience",
      ],
      image:
        "https://images.unsplash.com/photo-1680016661694-1cd3faf31c3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVWCUyMGRlc2lnbiUyMHdpcmVmcmFtZSUyMHByb3RvdHlwZSUyMHByb2Nlc3N8ZW58MXx8fHwxNzcyMjY3NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      reverse: false,
    },
    {
      title: "Technology That Scales",
      text: "Behind every great design is solid technology. We use cutting-edge technologies to build performant, secure, and future-proof applications.",
      bullets: [
        "React, Next.js & TypeScript",
        "Server-side APIs & databases",
        "CI/CD pipelines & automated testing",
      ],
      image:
        "https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBkZXZlbG9wbWVudCUyMHdvcmtzcGFjZSUyMGxhcHRvcCUyMGNvZGV8ZW58MXx8fHwxNzcyMjY3NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      reverse: true,
    },
    {
      title: "Performance That Convinces",
      text: "Speed is not a luxury — it's a necessity. We optimize every page for lightning-fast load times and ensure your website ranks at the top of Google.",
      bullets: [
        "Core Web Vitals optimization",
        "Technical SEO on-page & off-page",
        "CDN, caching & image optimization",
      ],
      image:
        "https://images.unsplash.com/photo-1748609278627-4b0e483b9b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc3MjI2Nzc2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      reverse: false,
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <SectionContainer>
        {showcases.map((item, idx) => (
          <ShowcaseRow key={item.title} item={item} isLast={idx === showcases.length - 1} />
        ))}
      </SectionContainer>
    </section>
  );
}

/* ── Process Section ── */
function ProcessSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: colors.navy }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/15 rounded-full"
            style={{ left: `${(i * 7.1) % 100}%`, top: `${(i * 5.3) % 100}%` }}
            animate={{ y: [0, -15, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          />
        ))}
      </div>

      <SectionContainer className="relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionBadge variant="dark" className="mb-6">{t.web.processBadge}</SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading theme="dark" subtitle="Five clearly defined phases for maximum project success.">
              From Idea to{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: colors.gradientServicesAccent }}>
                Result
              </span>
            </SectionHeading>
          </ScrollReveal>
        </div>

        <div ref={ref} className="relative">
          <div className="hidden lg:block absolute top-[36px] left-[10%] right-[10%] h-[2px] bg-white/[0.08]" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: transitions.smooth }}
                className="text-center relative"
              >
                <div className="relative mx-auto w-[72px] h-[72px] mb-5">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${colors.blue}30, transparent)`,
                      border: `2px solid ${colors.blue}40`,
                    }}
                  />
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[20px]"
                    style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.blue }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="text-white text-[17px] mb-2" style={{ fontFamily: fonts.heading, fontWeight: 600 }}>
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.6]" style={{ fontFamily: fonts.body, color: colors.textSlate }}>
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ── Floating tech icon data for background ── */
const floatingTechIcons: {
  label: string;
  color: string;
  svgPath: string;
  x: string;
  y: string;
  size: number;
  dur: number;
  delay: number;
  drift: number;
}[] = [
  { label: "React", color: "#61DAFB", svgPath: "M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0-10c1.1 0 2.7.4 4.3 1.4 1.6 1 2.8 2.3 3.5 3.6.7 1.3.8 2.6.3 3.5-.5.9-1.6 1.4-3.1 1.5 1.5.1 2.6.6 3.1 1.5.5.9.4 2.2-.3 3.5.7 1.3-1.9 2.6-3.5 3.6C14.7 23.6 13.1 24 12 24s-2.7-.4-4.3-1.4c-1.6-1-2.8-2.3-3.5-3.6-.7-1.3-.8-2.6-.3-3.5.5-.9 1.6-1.4 3.1-1.5-1.5-.1-2.6-.6-3.1-1.5-.5-.9-.4-2.2.3-3.5.7-1.3 1.9-2.6 3.5-3.6C9.3 3.9 10.9 3.5 12 3.5Z", x: "4%", y: "15%", size: 40, dur: 9, delay: 0, drift: 8 },
  { label: "TS", color: "#3178C6", svgPath: "M0 12v12h24V0H0v12Zm19.3-.5v1H17v6h-1.7v-6h-2.3v-1h6.3Zm-8.3.2v.8h2.2v6h1.6v-6h2.2v-.9l-6 .1Z", x: "90%", y: "20%", size: 34, dur: 11, delay: 1.2, drift: -6 },
  { label: "Node", color: "#339933", svgPath: "M12 1.85c-.2 0-.4.05-.58.15L3.6 6.35c-.36.2-.58.59-.58 1v8.3c0 .41.22.8.58 1l7.82 4.35c.36.2.8.2 1.16 0l7.82-4.35c.36-.2.58-.59.58-1v-8.3c0-.41-.22-.8-.58-1L12.58 2a1.15 1.15 0 0 0-.58-.15Z", x: "92%", y: "68%", size: 36, dur: 10, delay: 2, drift: 10 },
  { label: "DB", color: "#336791", svgPath: "M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4Zm0 2c4.42 0 8 1.34 8 3s-3.58 3-8 3-8-1.34-8-3 3.58-3 8-3Z", x: "2%", y: "72%", size: 32, dur: 12, delay: 0.5, drift: -5 },
  { label: "CSS", color: "#38BDF8", svgPath: "M6 2l1.5 17L12 21l4.5-2L18 2H6Zm10.1 4-.3 4H9.2l.2 2h6.1l-.5 5.5L12 18.5l-3-.95L8.7 14h2l.2 1.6 1.1.4 1.1-.4.2-1.6H8.5L8 8h8l.1-2Z", x: "14%", y: "85%", size: 30, dur: 8, delay: 3, drift: 7 },
  { label: "Git", color: "#F05032", svgPath: "M21.62 11.11l-8.73-8.73a1.3 1.3 0 0 0-1.84 0L9.22 4.21l2.33 2.33a1.55 1.55 0 0 1 1.96 1.96l2.24 2.24a1.55 1.55 0 1 1-.93.86l-2.09-2.09v5.5a1.55 1.55 0 1 1-1.28-.07V9.36a1.55 1.55 0 0 1-.84-2.03L8.3 5.02l-5.92 5.92a1.3 1.3 0 0 0 0 1.84l8.73 8.73a1.3 1.3 0 0 0 1.84 0l8.67-8.67a1.3 1.3 0 0 0 0-1.84Z", x: "80%", y: "82%", size: 28, dur: 13, delay: 1.5, drift: -8 },
  { label: "Bolt", color: "#10B981", svgPath: "M13 10V3L4 14h7v7l9-11h-7Z", x: "45%", y: "5%", size: 28, dur: 7, delay: 0.8, drift: 6 },
  { label: "Cloud", color: "#818CF8", svgPath: "M6.5 20a4.49 4.49 0 0 1-.42-8.96A6.5 6.5 0 0 1 18.5 12h.5a3.5 3.5 0 0 1 0 7H6.5Z", x: "62%", y: "88%", size: 34, dur: 14, delay: 2.5, drift: -4 },
  { label: "Figma", color: "#A259FF", svgPath: "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5ZM12 2h3.5a3.5 3.5 0 1 1 0 7H12V2Zm0 7h3.5a3.5 3.5 0 1 1 0 7H12v-7Zm-7 7a3.5 3.5 0 0 1 3.5-3.5H12v3.5a3.5 3.5 0 1 1-7 0Zm0-7A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5Z", x: "24%", y: "6%", size: 30, dur: 10, delay: 3.5, drift: 9 },
  { label: "Docker", color: "#2496ED", svgPath: "M20.83 11.15c-.12-.09-.82-.56-1.7-.56-.28 0-.56.04-.83.11-.24-1.03-.96-1.5-1-1.53l-.2-.12-.14.18c-.18.23-.33.5-.42.76-.18.5-.22 1.06-.07 1.58-.58.33-1.51.41-1.7.42H2.35c-.26 0-.47.2-.5.46-.08.82.03 1.64.28 2.43.3.87.76 1.5 1.38 1.93.7.48 1.83.75 3.1.75.58 0 1.18-.06 1.77-.18.83-.17 1.62-.47 2.34-.89.6-.35 1.14-.79 1.6-1.3.76-.86 1.22-1.84 1.56-2.7h.14c.86 0 1.4-.35 1.7-.64.2-.18.36-.4.47-.64l.07-.15-.14-.1Z", x: "72%", y: "8%", size: 36, dur: 11, delay: 4, drift: -7 },
];

/* ── Tech Stack ── */
function TechStackSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">
      {/* Floating tech icons background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial gradient wash */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[140px] opacity-[0.06]"
          style={{ background: `radial-gradient(ellipse, ${colors.blue}, ${colors.purple}40, transparent 70%)` }}
        />

        {floatingTechIcons.map((icon) => (
          <motion.div
            key={icon.label}
            className="absolute hidden md:flex items-center justify-center"
            style={{
              left: icon.x,
              top: icon.y,
              width: icon.size,
              height: icon.size,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.04, 0.1, 0.04],
              y: [0, -14, 0],
              x: [0, icon.drift, 0],
            }}
            transition={{
              duration: icon.dur,
              repeat: Infinity,
              delay: icon.delay,
              ease: "easeInOut",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill={icon.color}
              className="w-full h-full"
            >
              <path d={icon.svgPath} />
            </svg>
          </motion.div>
        ))}

        {/* Scattered small dots for texture */}
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute hidden lg:block rounded-full"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              left: `${(i * 4.3 + 3) % 96}%`,
              top: `${(i * 3.7 + 6) % 92}%`,
              background: [colors.blue, colors.purple, colors.teal, "#61DAFB"][i % 4],
            }}
            animate={{
              opacity: [0.03, 0.09, 0.03],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <SectionContainer className="relative z-10">
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">{t.web.techBadge}</SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading
              theme="light"
              subtitle="We rely on proven, modern technologies for maximum performance and future-proofing."
            >
              Our Tech Stack
            </SectionHeading>
          </ScrollReveal>
        </div>

        <div ref={ref} className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-[700px] mx-auto">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: transitions.smooth }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="px-5 py-2.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:border-blue-300 hover:shadow-md transition-all cursor-default"
              style={{ fontFamily: fonts.display, fontWeight: 600, color: colors.textDark, fontSize: 14 }}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ── Portfolio Section ── */
function PortfolioShowcase() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const navigate = useNavigate();

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(196,224,254,0) 0%, rgba(196,224,254,0.35) 30%, rgba(196,224,254,0) 100%)",
      }}
    >
      <SectionContainer className="relative z-10">
        <div className="text-center mb-14">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">
              {t.web.portfolioBadge}
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading theme="light" subtitle={t.web.portfolioSubtitle}>
              {t.web.portfolioTitle}
            </SectionHeading>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-4">
              <LinkWithArrow
                href="/"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  navigate("/");
                  setTimeout(() => {
                    document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
                  }, 150);
                }}
              >
                View All Projects
              </LinkWithArrow>
            </div>
          </ScrollReveal>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: transitions.smooth }}
              className="group flex flex-col gap-5"
            >
              {/* Card image container matching homepage style */}
              <div
                className="relative rounded-2xl w-full overflow-hidden"
                style={{
                  aspectRatio: "700 / 380",
                  backgroundImage: portfolioCardGradientBg,
                  backgroundSize: "cover",
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                  style={{
                    border: "2px solid rgba(255,255,255,0.59)",
                    boxShadow: "0px 4px 30px 0px rgba(0,0,0,0.1)",
                  }}
                />
                <div
                  className="absolute left-1/2 rounded-lg overflow-hidden"
                  style={{
                    width: "82%",
                    height: "79%",
                    top: "50%",
                    transform: "translate(-50%, -47%)",
                    boxShadow:
                      "0px 0px 10px 0px rgba(165,171,192,0.3), 0px 2px 2px 0px rgba(165,171,192,0.6), 0px 4px 4px 0px rgba(165,171,192,0.6), 0px 16px 16px 0px rgba(165,171,192,0.6), 0px 32px 32px 0px rgba(165,171,192,0.6)",
                  }}
                >
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 px-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex px-3 py-1 rounded-full text-[12px]"
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 600,
                      color: colors.blue,
                      background: `${colors.blue}12`,
                      border: `1px solid ${colors.blue}25`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & description */}
              <div className="px-1">
                <h3
                  className="text-[20px] md:text-[22px] tracking-[-0.48px] mb-2"
                  style={{ fontFamily: fonts.display, fontWeight: 700, color: colors.textDark }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-[15px] md:text-[16px] leading-[1.6] mb-3"
                  style={{ fontFamily: fonts.display, color: colors.textMuted }}
                >
                  {project.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-4 text-[16px] hover:gap-5 transition-all"
                  style={{ fontFamily: fonts.display, fontWeight: 700, color: colors.textBlueLink }}
                >
                  View Project
                  <ArrowIcon />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ── Result / Outcome Banner ── */
function ResultBanner() {
  const { t } = useTranslation();
  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${colors.navyDeep}, ${colors.navy})` }}
    >
      <SectionContainer className="relative z-10">
        <ScrollReveal>
          <div
            className="rounded-2xl p-8 md:p-12 border"
            style={{
              background: `linear-gradient(135deg, ${colors.blue}08, ${colors.purple}06, transparent)`,
              borderColor: `${colors.blue}20`,
            }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <h2
                  className="text-white text-[28px] md:text-[36px] leading-[1.25] mb-4"
                  style={{ fontFamily: fonts.heading, fontWeight: 700 }}
                >
                  {t.web.resultTitle}
                </h2>
                <p
                  className="text-[16px] md:text-[17px] leading-[1.7] mb-6"
                  style={{ fontFamily: fonts.body, color: colors.textSlate }}
                >
                  A fast, secure, and scalable digital platform that supports
                  your business long-term — with measurable
                  results that convince.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { value: "99%", label: "Uptime" },
                    { value: "<1s", label: "Load Time" },
                    { value: "100", label: "Lighthouse" },
                    { value: "24/7", label: "Support" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div
                        className="text-[28px] md:text-[32px] mb-1"
                        style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.blue }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-[13px]" style={{ fontFamily: fonts.body, color: colors.textSlate }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="shrink-0">
                <PrimaryButton
                  onClick={() => openBookingModal()}
                >
                  {t.web.resultCta}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionContainer>
    </section>
  );
}

/* ─────────────────────────────────────────────
 * PAGE
 * ───────────────────────────────────────────── */

export default function WebDesignPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden scroll-smooth">
            <SEO
        title="Web Design & Full-Stack Development Agency"
        description="Custom website design and full-stack web development by Digidog. We build responsive, high-performance websites with React, Next.js, and modern technologies that convert visitors into customers."
        canonical="/services/web-design"
        schemaMarkup={serviceSchema("Web Design & Development", "Custom website design and full-stack web development services including UX/UI design, responsive development, CMS integration, and ongoing maintenance.", "/services/web-design")}
      />
      <Navbar />
      <ServiceHero />
      <TrustedPartners />
      <DeliverablesSection />
      <ShowcaseSection />
      <ProcessSection />
      <TechStackSection />
      <PortfolioShowcase />
      <ResultBanner />
      <ContactCTA />
      <Footer />
    </div>
  );
}