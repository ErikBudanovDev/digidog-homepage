import { Mail, MessageCircle, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { useNavigate } from "react-router";
import { ScrollReveal } from "./ScrollReveal";
import { colors, fonts } from "./ui/brand";
import { SectionContainer } from "./ui/section";
import waveBorder from "figma:asset/1ebd5f724dd0e36f61d36898a311a05f4a075dc1.png";
import dogLogo from "figma:asset/ebd194b188260fe197aaf1d96b5b4f12cd875dbf.png";
const dogLogoSrc = dogLogo as unknown as string;
import digiDogLogo from "figma:asset/58f2cbf574c1863d80d69d3d0c78e56a09d857bc.png";
const digiDogLogoSrc = digiDogLogo as unknown as string;
import { useTranslation } from "@/i18n/i18n-context";
import { getLocalizedRoute } from "@/i18n/routes";
import enT from "@/translations/english.json";
import deT from "@/translations/german.json";

const socialLinksTop = [
  { name: "Instagram", href: "https://www.instagram.com/digidog_agency/", icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/digidog.agency", icon: Facebook },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/digidog-agency/", icon: Linkedin },
];

function FooterLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-[14px] transition-colors"
      style={{
        fontFamily: fonts.display,
        color: colors.textMuted,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = colors.textBlueLink)}
      onMouseLeave={(e) => (e.currentTarget.style.color = colors.textMuted)}
    >
      {children}
    </a>
  );
}

export function Footer() {
  const navigate = useNavigate();
  const { locale } = useTranslation();
  const pt = locale === "DE" ? deT : enT;

  const serviceLinks = [
    { label: pt.nav.webDesign, href: getLocalizedRoute("webDesign", locale) },
    { label: pt.nav.aiSolutions, href: getLocalizedRoute("aiSolutions", locale) },
    { label: "AI Integration", href: getLocalizedRoute("aiIntegration", locale) },
    { label: pt.nav.customSoftware, href: getLocalizedRoute("customSoftware", locale) },
    ...(locale === "DE" ? [
      { label: "Webdesign Berlin", href: "/de/webdesign-agentur-berlin" },
      { label: "Webdesign Hamburg", href: "/de/webdesign-agentur-hamburg" },
    ] : []),
  ];

  const quickLinks = [
    { label: pt.footer.home, href: getLocalizedRoute("home", locale) },
    { label: pt.footer.about, href: getLocalizedRoute("about", locale) },
    { label: pt.footer.portfolio, href: getLocalizedRoute("portfolio", locale) },
    { label: pt.footer.services, href: getLocalizedRoute("webDesign", locale) },
    { label: pt.footer.contact, href: getLocalizedRoute("contact", locale) },
  ];

  const legalLinks = [
    { label: pt.footer.imprint, href: getLocalizedRoute("imprint", locale) },
    { label: pt.footer.privacy, href: getLocalizedRoute("privacy", locale) },
    { label: pt.footer.terms, href: getLocalizedRoute("terms", locale) },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer>
      {/* Main footer content */}
      <div className="bg-white py-16 border-t border-gray-100">
        <SectionContainer>
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
              {/* Logo & Description */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-1 mb-8">
                  <img
                    src="/src/assets/Digidog Primary White@4x.png"
                    alt="DigiDog"
                    className="h-[96px] w-auto"
                    style={{ filter: "brightness(0) saturate(100%) invert(9%) sepia(30%) saturate(5000%) hue-rotate(210deg) brightness(95%) contrast(100%)" }}
                  />
                </div>

                <div className="flex gap-4 mt-8 mb-8">
                  {socialLinksTop.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center transition-colors"
                        style={{ color: colors.textDark }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = colors.navy;
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "";
                          e.currentTarget.style.color = colors.textDark;
                        }}
                        title={social.name}
                      >
                        <Icon size={16} />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4
                  className="text-[16px] mb-4"
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    color: colors.textDark,
                  }}
                >
                  {pt.footer.quickLinks}
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <FooterLink
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                      >
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services / Dienstleistungen */}
              <div>
                <h4
                  className="text-[16px] mb-4"
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    color: colors.textDark,
                  }}
                >
                  {pt.footer.ourServices}
                </h4>
                <ul className="space-y-3">
                  {serviceLinks.map((service) => (
                    <li key={service.label}>
                      <FooterLink
                        href={service.href}
                        onClick={(e) => handleNavClick(e, service.href)}
                      >
                        {service.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4
                  className="text-[16px] mb-4"
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    color: colors.textDark,
                  }}
                >
                  {pt.footer.legal}
                </h4>
                <ul className="space-y-3">
                  {legalLinks.map((link) => (
                    <li key={link.label}>
                      <FooterLink
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                      >
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4
                  className="text-[16px] mb-4"
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    color: colors.textDark,
                  }}
                >
                  {pt.footer.contact}
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <MapPin size={16} className="mt-1 shrink-0" style={{ color: colors.textMuted }} />
                    <span className="text-[14px]" style={{ fontFamily: fonts.display, color: colors.textMuted }}>
                      Digidog LLC<br />
                      30 N Gould St, Ste N<br />
                      Sheridan, WY 82801, USA
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Mail size={16} className="mt-1 shrink-0" style={{ color: colors.textMuted }} />
                    <FooterLink href="mailto:hey@digidog.org">
                      hey@digidog.org
                    </FooterLink>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="mt-1 shrink-0"
                      style={{ color: colors.textMuted }}
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    <FooterLink href="https://wa.me/4366493020594">
                      +43 664 93020594
                    </FooterLink>
                  </li>

                </ul>
              </div>
            </div>
          </ScrollReveal>
        </SectionContainer>
      </div>

      {/* Dark bottom bar with wave pattern background */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: colors.navyDeep,
          backgroundImage: `url(${waveBorder})`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center center",
          backgroundSize: "auto 100%",
        }}
      >
        {/* Dark overlay to keep the wave subtle */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: colors.navyDeep, opacity: 0.85 }}
        />

        {/* Content */}
        <div className="relative z-10 py-4">
          <SectionContainer>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Left – URL */}
              <a
                href="https://digidog.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] md:text-[13px] transition-opacity hover:opacity-100 opacity-50 hidden md:block shrink-0"
                style={{ fontFamily: fonts.body, color: "#fff" }}
              >
                https://digidog.org
              </a>

              {/* Center – Dog logo + Copyright + Legal links */}
              <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
                <img
                  src={dogLogoSrc}
                  alt="DigiDog"
                  className="h-[40px] w-auto brightness-0 invert opacity-70"
                />
                <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
                  <span
                    className="text-[11px] md:text-[12px] opacity-50"
                    style={{ fontFamily: fonts.body, color: "#fff" }}
                  >
                    &copy;2026 DigiDog. {pt.footer.rights}
                  </span>
                  <span className="text-[11px] md:text-[12px] opacity-30 mx-1" style={{ color: "#fff" }}>
                    &middot;
                  </span>
                  <a
                    href={getLocalizedRoute("terms", locale)}
                    onClick={(e) => handleNavClick(e, getLocalizedRoute("terms", locale))}
                    className="text-[11px] md:text-[12px] opacity-50 transition-opacity hover:opacity-100"
                    style={{ fontFamily: fonts.body, color: "#fff" }}
                  >
                    {pt.footer.terms}
                  </a>
                  <span className="text-[11px] md:text-[12px] opacity-30 mx-1" style={{ color: "#fff" }}>
                    &middot;
                  </span>
                  <a
                    href={getLocalizedRoute("privacy", locale)}
                    onClick={(e) => handleNavClick(e, getLocalizedRoute("privacy", locale))}
                    className="text-[11px] md:text-[12px] opacity-50 transition-opacity hover:opacity-100"
                    style={{ fontFamily: fonts.body, color: "#fff" }}
                  >
                    {pt.footer.privacy}
                  </a>
                  <span className="text-[11px] md:text-[12px] opacity-30 mx-1" style={{ color: "#fff" }}>
                    &middot;
                  </span>
                  <a
                    href={getLocalizedRoute("imprint", locale)}
                    onClick={(e) => handleNavClick(e, getLocalizedRoute("imprint", locale))}
                    className="text-[11px] md:text-[12px] opacity-50 transition-opacity hover:opacity-100"
                    style={{ fontFamily: fonts.body, color: "#fff" }}
                  >
                    {pt.footer.imprint}
                  </a>
                </div>
              </div>

              {/* Right – Social icons */}
              <div className="flex items-center gap-4 shrink-0">
                <a
                  href="https://www.facebook.com/digidog.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity opacity-50 hover:opacity-100"
                  title="Facebook"
                >
                  <Facebook size={16} color="#fff" />
                </a>
                <a
                  href="https://www.instagram.com/digidog_agency/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity opacity-50 hover:opacity-100"
                  title="Instagram"
                >
                  <Instagram size={16} color="#fff" />
                </a>
                <a
                  href="https://www.linkedin.com/company/digidog-agency/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity opacity-50 hover:opacity-100"
                  title="LinkedIn"
                >
                  <Linkedin size={16} color="#fff" />
                </a>
              </div>
            </div>
          </SectionContainer>
        </div>
      </div>
    </footer>
  );
}