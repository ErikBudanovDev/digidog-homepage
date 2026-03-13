import { ScrollReveal } from "./ScrollReveal";
import svgPaths from "@/imports/svg-lf55duofgf";
import { fonts } from "./ui/brand";
import { SectionContainer } from "./ui/section";

/* ─── SmileforYou logo (from Figma import) ─── */
function SmileforYouLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64.6116 64.6116" fill="none">
      <ellipse cx="32.3058" cy="32.3058" rx="32.3058" ry="32.3058" fill="#163376" />
      <path d={svgPaths.p3f5f2e00} fill="white" />
    </svg>
  );
}

/* ─── Hoffmann Group logo (H in rounded rect) ─── */
function HoffmannLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="14" fill="#163376" />
      <path d="M20 18v28M44 18v28M20 32h24" stroke="white" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Activated Insights logo (lightbulb / brain) ─── */
function ActivatedInsightsLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="#163376" />
      <path d="M26 44h12M28 48h8" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M24 30c0-4.4 3.6-8 8-8s8 3.6 8 8c0 3-1.5 5.2-3.5 6.5-.8.5-1.5 1.5-1.5 2.5v1h-6v-1c0-1-.7-2-1.5-2.5C25.5 35.2 24 33 24 30z"
        fill="white"
      />
      <path d="M32 20v-4M44 30h4M16 30h4M40.5 21.5l2.8-2.8M20.7 21.5l-2.8-2.8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ─── United Nations logo (globe with laurels) ─── */
function UnitedNationsLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="#163376" />
      <circle cx="32" cy="32" r="12" stroke="white" strokeWidth="2" fill="none" />
      <ellipse cx="32" cy="32" rx="5" ry="12" stroke="white" strokeWidth="1.5" fill="none" />
      <line x1="20" y1="32" x2="44" y2="32" stroke="white" strokeWidth="1.5" />
      <line x1="32" y1="20" x2="32" y2="44" stroke="white" strokeWidth="1.5" />
      <path d="M16 46c4-3 7-8 7-14s-3-11-7-14" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M48 46c-4-3-7-8-7-14s3-11 7-14" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Greenventory logo (leaf / sustainability) ─── */
function GreenventoryLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="#163376" />
      <path
        d="M18 44c0-14 10-26 26-26 0 0-2 10-10 18S18 44 18 44z"
        fill="white"
      />
      <path d="M22 40c4-6 10-12 18-16" stroke="#163376" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Original Berlin Tours logo (Brandenburg gate) ─── */
function OriginalBerlinToursLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="#163376" />
      <rect x="18" y="42" width="28" height="4" rx="1" fill="white" />
      <rect x="20" y="28" width="4" height="14" fill="white" />
      <rect x="30" y="28" width="4" height="14" fill="white" />
      <rect x="40" y="28" width="4" height="14" fill="white" />
      <path d="M17 28h30" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 28v-4h16v4" stroke="white" strokeWidth="2" fill="none" />
      <path d="M28 24l4-6 4 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ─── Tirecheck Online logo (tire / checkmark) ─── */
function TirecheckOnlineLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="#163376" />
      <circle cx="32" cy="32" r="14" stroke="white" strokeWidth="3" fill="none" />
      <circle cx="32" cy="32" r="8" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="32" cy="32" r="3" fill="white" />
      <path d="M26 32l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ─── Exeros Technologies logo (interconnected nodes) ─── */
function ExerosLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="16" fill="#163376" />
      <circle cx="32" cy="22" r="4" fill="white" />
      <circle cx="20" cy="38" r="4" fill="white" />
      <circle cx="44" cy="38" r="4" fill="white" />
      <circle cx="32" cy="48" r="3" fill="white" opacity="0.6" />
      <line x1="32" y1="26" x2="20" y2="34" stroke="white" strokeWidth="2" />
      <line x1="32" y1="26" x2="44" y2="34" stroke="white" strokeWidth="2" />
      <line x1="20" y1="38" x2="44" y2="38" stroke="white" strokeWidth="2" />
      <line x1="24" y1="40" x2="29" y2="46" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="40" y1="40" x2="35" y2="46" stroke="white" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

/* ─── Partner data ─── */
type PartnerDef =
  | { name: string; Logo: React.FC<{ size?: number }>; image?: undefined }
  | { name: string; image: string; Logo?: undefined };

const partners: PartnerDef[] = [
  { name: "Activated Insights", image: "/figma-assets/activated-insights-logo.svg" },
  { name: "smileforyou", Logo: SmileforYouLogo },
  { name: "United Nations", Logo: UnitedNationsLogo },
  { name: "Greenventory", image: "/figma-assets/greenventory-logo.webp" },
  { name: "Original Berlin Tours", image: "/figma-assets/original-berlin-tours.webp" },
  { name: "Hoffmann Group", Logo: HoffmannLogo },
  { name: "Berit Schulen", image: "/figma-assets/berit-schulen.webp" },
  { name: "Tirecheck Online", Logo: TirecheckOnlineLogo },
  { name: "Exeros Technologies", Logo: ExerosLogo },
];

function PartnerItem({ partner }: { partner: PartnerDef }) {
  const { name } = partner;
  return (
    <div className="flex items-center gap-3 shrink-0 select-none group cursor-pointer">
      <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-300" style={{ filter: 'grayscale(100%)' }}>
        {partner.image ? (
          <img
            src={partner.image}
            alt={name}
            style={{ height: 44, width: 'auto', objectFit: 'contain' }}
          />
        ) : partner.Logo ? (
          <partner.Logo size={44} />
        ) : null}
      </div>
      <span
        className="text-[#163376] text-[22px] md:text-[26px] opacity-50 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
        style={{ fontFamily: fonts.display, fontWeight: 700 }}
      >
        {name}
      </span>
    </div>
  );
}

export function TrustedPartners() {
  // Double the array for seamless looping
  const doubled = [...partners, ...partners];

  return (
    <section className="bg-white py-12 md:py-16 border-b border-gray-100 overflow-hidden">
      <SectionContainer>
        <ScrollReveal>
          <p
            className="text-center text-[#756e6e] text-[18px] md:text-[24px] uppercase tracking-wider mb-10"
            style={{ fontFamily: fonts.ui }}
          >
            Trusted partner for
          </p>
        </ScrollReveal>
      </SectionContainer>

      {/* Infinite Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          {/* Track 1 */}
          <div className="flex animate-marquee items-center gap-14 md:gap-20 whitespace-nowrap">
            {doubled.map((partner, i) => (
              <PartnerItem key={`a-${partner.name}-${i}`} partner={partner} />
            ))}
          </div>
          {/* Track 2 (duplicate for seamless loop) */}
          <div
            className="flex animate-marquee2 items-center gap-14 md:gap-20 whitespace-nowrap"
            aria-hidden="true"
          >
            {doubled.map((partner, i) => (
              <PartnerItem key={`b-${partner.name}-${i}`} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
