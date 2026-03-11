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
import { SectionContainer, SectionBadge } from "@/components/ui/section";
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
      <ShootingStar delay={2.5} />
      <StarShape
        size={10}
        color="rgba(255,255,255,0.15)"
        className="absolute"
        style={{ top: "30%", left: "6%" }}
      />
      <StarShape
        size={8}
        color="rgba(255,255,255,0.10)"
        className="absolute"
        style={{ top: "50%", right: "10%" }}
      />
    </div>
  );
}

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

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: colors.white }}>
            <SEO
        title="Privacy Policy"
        description="Data privacy policy and GDPR information for Digidog LLC."
        canonical="/privacy"
        noindex={true}
      />
      <Navbar />

      {/* Hero */}
      <HeroLayout
        backgroundElements={<HeroBackground />}
        minHeight="min-h-[340px] md:min-h-[400px]"
        badge="Legal"
        title="Data Privacy"
        description="We delve deep into the minds of customers to understand their needs."
        align="center"
        padding="py-[100px] lg:py-[120px]"
      />

      {/* Content */}
      <section className="py-16 md:py-24" style={{ background: colors.white }}>
        <SectionContainer>
          <ScrollReveal>
            <div className="max-w-[800px] mx-auto">
              {/* Intro highlight */}
              <div
                className="rounded-2xl p-6 md:p-8 mb-10"
                style={{
                  background: "linear-gradient(135deg, #f0f5ff 0%, #f8f9fb 100%)",
                  border: "1px solid #e2eaf5",
                }}
              >
                <h4
                  className="text-[16px] md:text-[18px] mb-3"
                  style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.navy }}
                >
                  Statement on Information Obligation
                </h4>
                <p
                  className="text-[15px] md:text-[16px] leading-[1.8]"
                  style={{ fontFamily: fonts.body, color: colors.textDark }}
                >
                  The protection of your personal data is of particular importance to us. We therefore process your data exclusively on the basis of the statutory provisions (GDPR, TKG 2003). In this data protection information we inform you about the most important aspects of data processing on our website.
                </p>
              </div>

              <LegalSection title="Contact Us">
                <p>
                  If you contact us using the form on the website or by email, the data you provide will be stored for six months in order to process your request and in case of follow-up questions. We will not pass on this data without your consent.
                </p>
              </LegalSection>

              <LegalSection title="Data Storage">
                <p>
                  We would like to point out that, in order to simplify the purchasing process and facilitate later contract processing, the web shop operator stores the IP address of the connection owner in cookies, as well as the name, address, and credit card number of the buyer.
                </p>
                <p>
                  The data you provide is necessary for the fulfillment of the contract or for the execution of pre-contractual measures. Without this data, we cannot conclude the contract with you. Data will not be transmitted to third parties, except for the transmission of credit card details to the processing banks/payment service providers for the purpose of debiting the purchase price, to the transport company/shipping company we have contracted for the delivery of the goods, and to our tax advisor for the fulfillment of our tax obligations.
                </p>
                <p>
                  After the purchase process is aborted, the data stored with us will be deleted. In the case of a contract conclusion, all data related to the contractual relationship will be stored until the expiration of the tax retention period (7 years).
                </p>
                <p>
                  The data including name, address, purchased items, and purchase date will additionally be stored until the expiration of the product liability period (10 years). Data processing is carried out based on the legal provisions of § 96 (3) TKG as well as Article 6 (1) (a) (consent) and/or (b) (necessary for contract fulfillment) of the GDPR.
                </p>
              </LegalSection>

              <LegalSection title="Cookies">
                <p>
                  Our website uses so-called cookies. These are small text files that are stored on your device by your browser. They do not cause any harm.
                </p>
                <p>
                  We use cookies to make our offer user-friendly. Some cookies remain stored on your device until you delete them. They allow us to recognize your browser on your next visit.
                </p>
                <p>
                  If you do not wish this, you can configure your browser to notify you about the setting of cookies and allow them only on a case-by-case basis.
                </p>
                <p>
                  Disabling cookies may limit the functionality of our website.
                </p>
              </LegalSection>

              <LegalSection title="Web Analysis">
                <p>
                  Our website uses features of the web analytics service Google Analytics, Mountain View, California. Cookies are used to analyze how users interact with the website. The information generated in this process is transferred to and stored on the provider's server.
                </p>
                <p>
                  You can prevent this by configuring your browser to not store cookies.
                </p>
                <p>
                  We have signed a corresponding data processing agreement with the provider.
                </p>
                <p>
                  Your IP address is recorded but promptly pseudonymized (e.g., by deleting the last 8 bits). As a result, only a rough localization is possible.
                </p>
                <p>
                  Data processing is carried out based on the legal provisions of § 96 (3) TKG as well as Art. 6 (1) (a) (consent) and/or (f) (legitimate interest) of the GDPR.
                </p>
                <p>
                  Our objective under the GDPR (legitimate interest) is to improve our services and our web presence. As we value the privacy of our users, the user data is pseudonymized.
                </p>
              </LegalSection>

              <LegalSection title="Your Rights">
                <div
                  className="rounded-2xl p-6 md:p-8"
                  style={{
                    background: "linear-gradient(135deg, #f0f5ff 0%, #f8f9fb 100%)",
                    border: "1px solid #e2eaf5",
                  }}
                >
                  <p>
                    In principle, you have the right to information, correction, deletion, restriction, data transferability, revocation and objection with regard to your data stored by us. If you believe that the processing of your data violates data protection law or your data protection claims have otherwise been violated in any way, you can complain to us (
                    <a
                      href="mailto:hey@digidog.org"
                      className="transition-colors"
                      style={{ color: colors.blue }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      hey@digidog.org
                    </a>
                    ) or the data protection authority.
                  </p>
                </div>
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