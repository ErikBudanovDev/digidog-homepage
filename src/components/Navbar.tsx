import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronDown, Menu, X, Code, Bot, Blocks, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { colors, fonts } from "./ui/brand";
import { useTranslation, type Locale } from "@/i18n/i18n-context";
import { getLocalizedRoute } from "@/i18n/routes";
import enT from "@/translations/english.json";
import deT from "@/translations/german.json";

const localeOptions: { code: Locale; label: string; flag: string }[] = [
  { code: "EN", label: "EN", flag: "🇬🇧" },
  { code: "DE", label: "DE", flag: "🇩🇪" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const { locale } = useTranslation();
  const pt = locale === "DE" ? deT : enT;

  const serviceSubLinks = [
    { href: getLocalizedRoute("webDesign", locale), label: pt.nav.webDesign, icon: Code, color: "#0057ff" },
    { href: getLocalizedRoute("aiSolutions", locale), label: pt.nav.aiSolutions, icon: Bot, color: "#a855f7" },
    { href: getLocalizedRoute("customSoftware", locale), label: pt.nav.customSoftware, icon: Blocks, color: "#06b6d4" },
  ];

  const navLinks = [
    { href: getLocalizedRoute("portfolio", locale), label: pt.nav.portfolio },
    { href: "#services", label: pt.nav.services, hasDropdown: "services" as const },
    { href: getLocalizedRoute("about", locale), label: pt.nav.about },
    { href: getLocalizedRoute("contact", locale), label: pt.nav.contact },
  ];
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    setServicesOpen(false);

    if (href.startsWith("#")) {
      if (location.pathname === "/") {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        navigate("/");
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      navigate(href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const homeRoute = getLocalizedRoute("home", locale);
    if (location.pathname === homeRoute) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(homeRoute);
    }
  };

  const handleLanguageSwitch = (newLocale: Locale) => {
    setLangOpen(false);
    
    // Map current path to the new locale
    const currentPath = location.pathname || "/";
    let targetPath = "/";
    
    // Check if we're on a German page
    if (currentPath.startsWith("/de")) {
      if (newLocale === "EN") {
        // Switch from DE to EN
        if (currentPath === "/de") {
          targetPath = "/";
        } else if (currentPath.startsWith("/de/dienstleistungen/ki-loesungen")) {
          targetPath = "/services/ai-solutions";
        } else if (currentPath.startsWith("/de/dienstleistungen/ki-integration")) {
          targetPath = "/services/ai-integration";
        } else if (currentPath.startsWith("/de/dienstleistungen/webdesign")) {
          targetPath = "/services/web-design";
        } else if (currentPath.startsWith("/de/dienstleistungen/individuelle-software")) {
          targetPath = "/services/custom-software";
        } else if (currentPath.startsWith("/de/portfolio")) {
          targetPath = "/portfolio";
        } else if (currentPath.startsWith("/de/ueber-uns")) {
          targetPath = "/about";
        } else if (currentPath.startsWith("/de/kontakt")) {
          targetPath = "/contact";
        } else if (currentPath.startsWith("/de/impressum")) {
          targetPath = "/imprint";
        } else if (currentPath.startsWith("/de/datenschutz")) {
          targetPath = "/privacy";
        } else if (currentPath.startsWith("/de/agb")) {
          targetPath = "/terms";
        }
      }
    } else {
      // Switch from EN to DE
      if (newLocale === "DE") {
        if (currentPath === "/") {
          targetPath = "/de";
        } else if (currentPath.startsWith("/services/ai-solutions")) {
          targetPath = "/de/dienstleistungen/ki-loesungen";
        } else if (currentPath.startsWith("/services/ai-integration")) {
          targetPath = "/de/dienstleistungen/ki-integration";
        } else if (currentPath.startsWith("/services/web-design")) {
          targetPath = "/de/dienstleistungen/webdesign";
        } else if (currentPath.startsWith("/services/custom-software")) {
          targetPath = "/de/dienstleistungen/individuelle-software";
        } else if (currentPath.startsWith("/portfolio")) {
          targetPath = "/de/portfolio";
        } else if (currentPath.startsWith("/about")) {
          targetPath = "/de/ueber-uns";
        } else if (currentPath.startsWith("/contact")) {
          targetPath = "/de/kontakt";
        } else if (currentPath.startsWith("/imprint")) {
          targetPath = "/de/impressum";
        } else if (currentPath.startsWith("/privacy")) {
          targetPath = "/de/datenschutz";
        } else if (currentPath.startsWith("/terms")) {
          targetPath = "/de/agb";
        }
      }
    }
    
    // Locale auto-detected from URL path by I18nProvider
    navigate(targetPath);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-20 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-[#02033d]/90 backdrop-blur-xl shadow-lg shadow-black/10 py-3"
          : "bg-transparent py-6"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-[1296px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" onClick={handleLogoClick} className="flex items-center cursor-pointer">
          <img
            src="/src/assets/Digidog secondary negative@4x.png"
            alt="DigiDog"
            className="h-[44px] w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.hasDropdown === "services" ? (
              <div key={link.href} ref={servicesRef} className="relative">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center gap-1.5 text-white text-[17px] hover:text-[#52bd94] transition-colors relative group cursor-pointer"
                  style={{ fontFamily: fonts.display }}
                >
                  {link.label}
                  <motion.span
                    animate={{ rotate: servicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={14} />
                  </motion.span>
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                    style={{ background: colors.green }}
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 border border-white/10 rounded-xl overflow-hidden shadow-xl shadow-black/30 min-w-[280px]"
                      style={{ background: colors.navyDeep }}
                    >
                      <a
                        href="#services"
                        onClick={(e) => handleNavClick(e, "#services")}
                        className="block px-4 py-3 text-[14px] text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors border-b border-white/[0.06]"
                        style={{ fontFamily: fonts.body }}
                      >
                        {pt.nav.allServices}
                      </a>

                      {serviceSubLinks.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={(e) => handleNavClick(e, sub.href)}
                            className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors group/item"
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{
                                background: `${sub.color}18`,
                                border: `1px solid ${sub.color}30`,
                              }}
                            >
                              <Icon size={16} style={{ color: sub.color }} strokeWidth={1.8} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-[14px] text-white group-hover/item:text-white transition-colors truncate"
                                  style={{ fontFamily: fonts.body, fontWeight: 500 }}
                                >
                                  {sub.label}
                                </span>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-white text-[17px] hover:text-[#52bd94] transition-colors relative group"
                style={{ fontFamily: fonts.display }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                  style={{ background: colors.green }}
                />
              </a>
            )
          )}
        </div>

        {/* Language Switcher (Desktop) */}
        <div ref={langRef} className="hidden lg:block relative ml-2">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
          >
            <Globe size={16} />
            <span className="text-[13px]" style={{ fontFamily: fonts.body, fontWeight: 500 }}>{locale}</span>
            <ChevronDown size={12} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 rounded-lg border border-white/10 overflow-hidden shadow-xl z-50"
                style={{ background: colors.navyDeep }}
              >
                {localeOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => handleLanguageSwitch(opt.code)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-[13px] w-full cursor-pointer transition-colors ${
                      locale === opt.code ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                    style={{ fontFamily: fonts.body }}
                  >
                    <span>{opt.flag}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-4 bg-[#02033d]/95 backdrop-blur-xl rounded-xl p-6 flex flex-col gap-4 overflow-hidden"
          >
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} className="flex flex-col gap-2">
                  <span
                    className="text-white/50 text-[14px] uppercase tracking-wider"
                    style={{ fontFamily: fonts.body, fontWeight: 600 }}
                  >
                    {link.label}
                  </span>
                  {serviceSubLinks.map((sub) => {
                    const Icon = sub.icon;
                    return (
                      <a
                        key={sub.label}
                        href={sub.href}
                        onClick={(e) => handleNavClick(e, sub.href)}
                        className="flex items-center gap-3 pl-2 py-1.5"
                      >
                        <Icon size={16} style={{ color: sub.color }} strokeWidth={1.8} />
                        <span
                          className="text-white text-[16px]"
                          style={{ fontFamily: fonts.display }}
                        >
                          {sub.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-white text-[17px] hover:text-[#52bd94] transition-colors"
                  style={{ fontFamily: fonts.display }}
                >
                  {link.label}
                </a>
              )
            )}
            {/* Mobile Language Switcher */}
            <div className="flex gap-2 mt-6 pt-4 border-t border-white/10">
              {localeOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => { handleLanguageSwitch(opt.code); setMobileOpen(false); }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[14px] cursor-pointer transition-colors ${
                    locale === opt.code
                      ? "bg-white/15 text-white"
                      : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                  style={{ fontFamily: fonts.body, fontWeight: 500 }}
                >
                  <span>{opt.flag}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
