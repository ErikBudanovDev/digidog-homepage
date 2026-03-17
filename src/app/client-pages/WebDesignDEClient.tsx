/* ─────────────────────────────────────────────
 * German Webdesign Agentur Landing Page (shared)
 * City-specific SEO landing pages for DACH market
 * ───────────────────────────────────────────── */
"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Paintbrush, Code, Layers, Smartphone, Server, Gauge,
  Shield, Wrench, Check, ArrowRight, Star, Users, Zap
} from "lucide-react";

interface CityConfig {
  city: string;
  citySlug: string;
  heroTitle: string;
  heroSubtitle: string;
  introText: string;
}

const leistungen = [
  { icon: Paintbrush, title: "Individuelles Webdesign", text: "Maßgeschneidertes Design, das Ihre Marke perfekt repräsentiert und Besucher in Kunden verwandelt." },
  { icon: Code, title: "Full-Stack Entwicklung", text: "Moderne Frontend- und Backend-Entwicklung mit React, Next.js, Node.js und weiteren Technologien." },
  { icon: Layers, title: "UX/UI Design", text: "Nutzerzentriertes Design mit Fokus auf Conversion, Usability und ein nahtloses Nutzererlebnis." },
  { icon: Smartphone, title: "Responsive Design", text: "Perfekte Darstellung auf allen Geräten — Desktop, Tablet und Smartphone." },
  { icon: Server, title: "CMS & Dashboards", text: "Integration von Content-Management-Systemen oder individuellen Admin-Dashboards." },
  { icon: Gauge, title: "Performance & SEO", text: "Technische Optimierung für blitzschnelle Ladezeiten und Top-Platzierungen in Suchmaschinen." },
  { icon: Shield, title: "Sicherheit & Hosting", text: "SSL-Verschlüsselung, sichere Serverkonfiguration und zuverlässiges Hosting." },
  { icon: Wrench, title: "Wartung & Support", text: "Laufende Betreuung, Updates und technische Unterstützung für langfristigen Erfolg." },
];

const prozessSchritte = [
  { nr: "01", title: "Beratung & Analyse", text: "Wir analysieren Ihre Ziele, Zielgruppe und Wettbewerber, um eine maßgeschneiderte Strategie zu entwickeln." },
  { nr: "02", title: "Konzept & Design", text: "Wireframes und visuelles Design — iterativ verfeinert, bis jede Seite perfekt ist." },
  { nr: "03", title: "Entwicklung", text: "Sauberer, performanter Code mit modernen Technologien und Best Practices." },
  { nr: "04", title: "Testing & Launch", text: "Gründliches Testing auf allen Geräten, Performance-Optimierung und reibungsloser Go-Live." },
  { nr: "05", title: "Support & Wachstum", text: "Laufende Wartung, Analytics und kontinuierliche Verbesserung Ihrer digitalen Plattform." },
];

const techStack = ["React", "Next.js", "TypeScript", "Node.js", "TailwindCSS", "PostgreSQL", "Supabase", "Vercel", "Figma", "Docker"];

const vorteile = [
  { icon: Zap, title: "Schnelle Umsetzung", text: "Von der Idee zur fertigen Website in 4-6 Wochen." },
  { icon: Users, title: "Persönliche Betreuung", text: "Direkter Kontakt zum Entwickler — keine Zwischenhändler." },
  { icon: Star, title: "Moderne Technologien", text: "React, Next.js und KI-Integration statt veralteter WordPress-Templates." },
  { icon: Shield, title: "Festpreise", text: "Transparente Preise ohne versteckte Kosten oder Überraschungen." },
];

const faqs = [
  { q: "Was kostet eine professionelle Website?", a: "Unsere Projekte starten ab 3.000 €. Der genaue Preis hängt vom Umfang ab — wir erstellen Ihnen ein transparentes Angebot nach dem kostenlosen Erstgespräch." },
  { q: "Wie lange dauert die Entwicklung?", a: "Eine typische Website ist in 4-6 Wochen fertig. Komplexere Projekte mit Shops oder Dashboards können 8-12 Wochen dauern." },
  { q: "Arbeitet ihr nur mit Unternehmen aus Berlin/Hamburg?", a: "Nein, wir arbeiten mit Unternehmen aus ganz Deutschland, Österreich und der Schweiz. Dank Remote-Zusammenarbeit sind wir flexibel und effizient." },
  { q: "Welche Technologien setzt ihr ein?", a: "Wir nutzen React, Next.js, TypeScript und Node.js für moderne, schnelle und skalierbare Websites. Keine veralteten Templates oder Page-Builder." },
  { q: "Bietet ihr auch laufende Wartung an?", a: "Ja, wir bieten monatliche Wartungspakete ab 200 €/Monat inklusive Updates, Monitoring, Backups und technischem Support." },
];

export default function WebDesignDEClient({ config }: { config: CityConfig }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B1B34] via-[#142B50] to-[#1B3A5C] pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4">
            Webdesign Agentur {config.city}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {config.heroTitle}
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            {config.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
            >
              Kostenloses Erstgespräch buchen <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 rounded-full transition-colors"
            >
              Referenzen ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Intro / City-specific text */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-gray-600 text-lg leading-relaxed">{config.introText}</p>
      </section>

      {/* Vorteile */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-cyan-600 text-sm font-semibold tracking-wider uppercase mb-3 text-center">Warum DigiDog</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Ihre Webdesign Agentur für {config.city}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vorteile.map((v, i) => (
              <div key={i} className="flex gap-4 items-start bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="bg-cyan-50 p-3 rounded-lg shrink-0">
                  <v.icon className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-cyan-600 text-sm font-semibold tracking-wider uppercase mb-3 text-center">Leistungen</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Was wir für Sie tun
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leistungen.map((l, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-br from-[#0B1B34] to-[#1B3A5C] p-3 rounded-lg inline-block mb-4">
                  <l.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{l.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prozess */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-cyan-600 text-sm font-semibold tracking-wider uppercase mb-3 text-center">Unser Prozess</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            In 5 Schritten zu Ihrer neuen Website
          </h2>
          <div className="space-y-6">
            {prozessSchritte.map((s, i) => (
              <div key={i} className="flex gap-5 items-start bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-3xl font-bold text-cyan-500/30 shrink-0 w-12">{s.nr}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-cyan-600 text-sm font-semibold tracking-wider uppercase mb-3">Technologien</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Unser Tech-Stack</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {techStack.map((t, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-cyan-600 text-sm font-semibold tracking-wider uppercase mb-3 text-center">FAQ</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Häufige Fragen</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 hover:text-cyan-600 transition-colors">
                  {f.q}
                  <ArrowRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                </summary>
                <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#0B1B34] to-[#1B3A5C] py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bereit für Ihre neue Website?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Lassen Sie uns in einem kostenlosen Erstgespräch besprechen, wie wir Ihr Unternehmen in {config.city} digital nach vorne bringen.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
          >
            Jetzt kostenlos beraten lassen <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
