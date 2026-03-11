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
          <path d={Object.values(svgPaths)[0]} fill="white" fillOpacity={0.6} />
          <path d={Object.values(svgPaths)[1]} fill="white" fillOpacity={0.4} />
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
  number,
  title,
  children,
}: {
  number: string;
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
        {number}. {title}
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

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: colors.white }}>
            <SEO
        title="Terms of Service"
        description="Terms of service and general business conditions for Digidog LLC."
        canonical="/terms"
        noindex={true}
      />
      <Navbar />

      {/* Hero */}
      <HeroLayout
        backgroundElements={<HeroBackground />}
        minHeight="min-h-[340px] md:min-h-[400px]"
        badge="Legal"
        title="Terms of Service"
        description="We dive deep into the thoughts of our customers to understand their needs."
        align="center"
        padding="py-[100px] lg:py-[120px]"
      />

      {/* Content */}
      <section className="py-16 md:py-24" style={{ background: colors.white }}>
        <SectionContainer>
          <ScrollReveal>
            <div className="max-w-[800px] mx-auto">
              <LegalSection number="1" title="Scope / Contract Text / Contract Language">
                <p>
                  1.1 Our deliveries are made in accordance with the following General Terms and Conditions (GTC), which form the basis of our offered services and the contracts concluded with you (and also contain consumer information).
                </p>
                <p>
                  1.2 Our customers are both consumers (§ 1 KSchG) and entrepreneurs (§ 1 KSchG). Unless otherwise agreed, the applicable legal provisions for our business relationship with consumers or entrepreneurs shall apply.
                </p>
                <p>
                  1.3 When specifying deadlines, we also use business days (Mon–Fri, excluding public holidays).
                </p>
                <p>
                  1.4 Our current terms and conditions and other applicable contractual provisions are printed in our respective catalogs.
                </p>
                <p>
                  1.5 All contracts concluded with us can currently only be made in German. In electronic commerce, the contract texts are stored by us. However, they are not accessible to you.
                </p>
                <p>
                  1.6 We gladly accept your order by phone (Mon–Fri from 8:00 am to 6:00 pm), fax, email, letter, order card, or through our online shop. You are bound to your order — subject to your right of withdrawal — for 5 business days.
                </p>
                <p>
                  1.7 Your order constitutes a binding offer to us for the conclusion of a purchase contract. For orders placed in our online shop, you will receive the mentioned order confirmation. However, this does not yet constitute a binding acceptance of your order. The binding purchase contract is only concluded when you receive a corresponding acceptance declaration via a separate email or in another way, in the case of prepayment, with our proforma invoice, but at the latest, when you (or your representative) receive the ordered product from us.
                </p>
                <p>
                  1.8 We kindly ask for your understanding that for advance payment orders, we can only reserve your ordered goods for a maximum of 7 days. If the payment is made outside this period, delivery delays may occur.
                </p>
              </LegalSection>

              <LegalSection number="2" title="Right of Withdrawal for Consumers">
                <div
                  className="rounded-2xl p-6 md:p-8 mb-4"
                  style={{
                    background: "linear-gradient(135deg, #f0f5ff 0%, #f8f9fb 100%)",
                    border: "1px solid #e2eaf5",
                  }}
                >
                  <h4
                    className="text-[16px] mb-3"
                    style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.navy }}
                  >
                    Right of Withdrawal
                  </h4>
                  <p>
                    You have the right to withdraw from the contract within fourteen days without giving any reason.
                  </p>
                  <p className="mt-3">
                    The withdrawal period is fourteen days from the day on which you or a third party named by you, who is not the carrier, took possession of the last goods.
                  </p>
                  <p className="mt-3">
                    To exercise your right of withdrawal, you must inform us, Digidog LLC The Online Marketing Agency, of your decision to withdraw from this contract by means of a clear statement (e.g., a letter sent by post, fax, or email). You may use the withdrawal form provided below for this purpose, but it is not mandatory.
                  </p>
                </div>

                <h4
                  className="text-[16px] mb-3 mt-6"
                  style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.navy }}
                >
                  Consequences of Withdrawal
                </h4>
                <p>
                  If you revoke this contract, we must refund all payments we have received from you, including delivery costs (with the exception of additional costs arising from your choice of a different type of delivery than the cheapest standard delivery offered by us), without delay and at the latest within fourteen days from the day on which the notification of your revocation of this contract is received by us.
                </p>
                <p>
                  We will use the same payment method for this refund that you used in the original transaction, unless something else has been explicitly agreed upon with you; in no case will you be charged fees for this refund. We may refuse the refund until we have received the goods back or until you have provided proof that you have returned the goods, whichever is the earlier date.
                </p>
                <p>
                  You must return or hand over the goods to us without undue delay and in any event no later than fourteen days from the day on which you notify us of the withdrawal from the contract. The deadline is met if you send the goods before the period of fourteen days has expired. We will bear the cost of returning the goods. You are only liable for any diminished value of the goods if this loss in value is due to handling them in a way that was not necessary to ascertain the nature, characteristics, and functioning of the goods.
                </p>

                <div
                  className="rounded-2xl p-6 md:p-8 mt-6"
                  style={{
                    background: "linear-gradient(135deg, #f0f5ff 0%, #f8f9fb 100%)",
                    border: "1px solid #e2eaf5",
                  }}
                >
                  <h4
                    className="text-[16px] mb-3"
                    style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.navy }}
                  >
                    Sample Withdrawal Form
                  </h4>
                  <p className="italic opacity-80 mb-3">
                    (If you want to revoke the contract, you can use this completed form text and send it to us)
                  </p>
                  <p style={{ fontWeight: 600 }}>Digidog LLC</p>
                  <div className="mt-3 space-y-1 opacity-80">
                    <p>I/we (*) hereby revoke the contract concluded by me/us (*) for the purchase of the following goods (*) / the provision of the following service (*).</p>
                    <p className="mt-2">Ordered on (*) / received on (*)</p>
                    <p>Name of the consumer(s)</p>
                    <p>Address of the consumer(s)</p>
                    <p>Signature of the consumer(s) (only if notified on paper)</p>
                    <p>Date</p>
                    <p className="mt-2 text-[13px]">(*) Delete as applicable.</p>
                  </div>
                </div>
              </LegalSection>

              <LegalSection number="3" title="Prices, Shipping Costs, and Payment Methods">
                <p>
                  3.1 All stated prices are total prices, meaning they include the applicable statutory value-added tax (VAT) and other price components, but exclude the expressly agreed shipping costs. We cover cash-on-delivery fees (for the payment method cash on delivery).
                </p>
                <p>
                  3.2 We accept no liability for printing errors in price information and reserve the right to charge the corrected (correct) price.
                </p>
                <p>
                  3.3 We offer you various payment methods. There is no entitlement to the payment method 'purchase on account'. Please choose from our payment methods as follows: by invoice (subject to creditworthiness and no outstanding, dunned previous invoice), by SEPA direct debit, or by advance payment.
                </p>
                <p>
                  Our invoices are generally due and payable within 14 days after receipt of the goods and are to be paid in full without any deductions.
                </p>
                <p>
                  3.4 If you pay via SEPA direct debit, we grant you a discount of 2% of the net invoice amount. This 2% immediate payment discount will then be automatically deducted during the debit process. Books are subject to fixed pricing and are therefore excluded from the discount policy.
                </p>
              </LegalSection>

              <LegalSection number="4" title="Warranty Law">
                <p>
                  For all goods that you can purchase in our online shop or from our catalog, a statutory warranty right applies.
                </p>
              </LegalSection>

              <LegalSection number="5" title="Retention of Title">
                <p>
                  We reserve ownership of the purchased goods (items) until full payment of the purchase price has been made.
                </p>
              </LegalSection>

              <LegalSection number="6" title="Data Protection">
                <p>
                  To process your order, we store your address and order-related data in accordance with legal regulations. You can find more information about our privacy policy regarding order processing in our{" "}
                  <a
                    href="/privacy"
                    className="transition-colors"
                    style={{ color: colors.blue }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Data Privacy Statement
                  </a>
                  .
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