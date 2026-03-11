import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  StarField,
  ShootingStar,
  StarShape,
} from "@/components/CosmicElements";
import { colors, fonts } from "@/components/ui/brand";
import { SectionContainer } from "@/components/ui/section";
import { HeroLayout } from "@/components/ui/hero-layout";
import svgPaths from "@/imports/svg-ly9usgqlzn";
import { SEO } from "@/components/SEO";

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute mix-blend-soft-light opacity-60"
        style={{ top: "80%", right: "-19%", bottom: "-35%", left: "70%" }}
      >
        <svg viewBox="0 0 308 308" fill="none" className="w-full h-full">
          <path d={svgPaths[0]} fill="white" fillOpacity={0.6} />
          <path d={svgPaths[1]} fill="white" fillOpacity={0.4} />
        </svg>
      </div>
      <StarField count={30} />
      <ShootingStar delay={2} />
      <StarShape
        size={10}
        color="rgba(255,255,255,0.15)"
        className="absolute"
        style={{ top: "25%", left: "10%" }}
      />
      <StarShape
        size={8}
        color="rgba(255,255,255,0.10)"
        className="absolute"
        style={{ top: "55%", right: "8%" }}
      />
    </div>
  );
}

/* Reusable section block */
function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h3
        className="text-[17px] md:text-[19px] mb-3"
        style={{
          fontFamily: fonts.heading,
          fontWeight: 700,
          color: colors.navy,
        }}
      >
        {title}
      </h3>
      <div
        className="text-[15px] md:text-[16px] leading-[1.8] space-y-4"
        style={{ fontFamily: fonts.body, color: colors.textDark }}
      >
        {children}
      </div>
    </div>
  );
}

export default function ImprintPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: colors.white }}>
            <SEO
        title="Imprint"
        description="Legal imprint and company information for Digidog LLC."
        canonical="/imprint"
        noindex={true}
      />
      <Navbar />

      {/* Hero */}
      <HeroLayout
        backgroundElements={<HeroBackground />}
        minHeight="min-h-[340px] md:min-h-[400px]"
        badge="Legal"
        title="Imprint"
        description="Legal information and responsible party details for DigiDog."
        align="center"
        padding="py-[100px] lg:py-[120px]"
      />

      {/* Content */}
      <section className="py-16 md:py-24" style={{ background: colors.white }}>
        <SectionContainer>
          <ScrollReveal>
            <div className="max-w-[800px] mx-auto">
              <LegalSection title="Information according to § 5 TMG">
                <p>
                  <strong>DigiDog LLC</strong>
                  <br />
                  The Online Marketing Agency
                </p>
                <p>
                  Responsible for the content according to § 55 Abs. 2 RStV:
                  <br />
                  DigiDog LLC
                </p>
              </LegalSection>

              <LegalSection title="Contact">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@digidog.org"
                    className="transition-colors"
                    style={{ color: colors.blue }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    info@digidog.org
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <a
                    href="https://digidog.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                    style={{ color: colors.blue }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    www.digidog.org
                  </a>
                </p>
              </LegalSection>

              <LegalSection title="Dispute Resolution">
                <p>
                  The European Commission provides a platform for online dispute
                  resolution (OS):{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                    style={{ color: colors.blue }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                  .
                </p>
                <p>
                  We are not willing or obligated to participate in dispute
                  resolution proceedings before a consumer arbitration board.
                </p>
              </LegalSection>

              <LegalSection title="Liability for Content">
                <p>
                  As a service provider, we are responsible for our own content
                  on these pages in accordance with § 7 Abs.1 TMG under general
                  law. According to §§ 8 to 10 TMG, however, we are not
                  obligated as a service provider to monitor transmitted or
                  stored third-party information or to investigate circumstances
                  that indicate illegal activity.
                </p>
                <p>
                  Obligations to remove or block the use of information under
                  general law remain unaffected. However, liability in this
                  regard is only possible from the time of knowledge of a
                  specific legal violation. Upon becoming aware of corresponding
                  legal violations, we will remove this content immediately.
                </p>
              </LegalSection>

              <LegalSection title="Liability for Links">
                <p>
                  Our offer contains links to external websites of third parties,
                  on whose contents we have no influence. Therefore, we cannot
                  assume any liability for these external contents. The
                  respective provider or operator of the pages is always
                  responsible for the contents of the linked pages. The linked
                  pages were checked for possible legal violations at the time of
                  linking. Illegal content was not recognizable at the time of
                  linking.
                </p>
                <p>
                  However, a permanent content control of the linked pages is not
                  reasonable without concrete evidence of a legal violation. Upon
                  becoming aware of legal violations, we will remove such links
                  immediately.
                </p>
              </LegalSection>

              <LegalSection title="Copyright">
                <p>
                  The content and works on these pages created by the site
                  operators are subject to German copyright law. The
                  reproduction, editing, distribution, and any kind of use
                  outside the limits of copyright law require the written consent
                  of the respective author or creator. Downloads and copies of
                  this page are only permitted for private, non-commercial use.
                </p>
                <p>
                  Insofar as the content on this page was not created by the
                  operator, the copyrights of third parties are respected. In
                  particular, third-party content is identified as such. Should
                  you nevertheless become aware of a copyright infringement,
                  please inform us accordingly. Upon becoming aware of legal
                  violations, we will remove such content immediately.
                </p>
              </LegalSection>
            </div>
          </ScrollReveal>
        </SectionContainer>
      </section>

      <ContactCTA />
      <Footer />
    </div>
  );
}
