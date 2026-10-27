import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrustedPartners } from "@/components/TrustedPartners";
import { ServicesSection } from "@/components/ServicesSection";
import { ImmersiveSection } from "@/components/ImmersiveSection";
import { AiCasesSection } from "@/components/AiCasesSection";
import { UpworkProofSection } from "@/components/UpworkProofSection";
import { ContactCTA } from "@/components/ContactCTA";
import { ContactFormSection } from "@/components/ContactFormSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { CtaBanner } from "@/components/CtaBanner";
import { PortfolioSection } from "@/components/PortfolioSection";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";
import { SEO, organizationSchema } from "@/components/SEO";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden scroll-smooth">
      <SEO
        title="Claude & AI Integration for Businesses | DigiDog"
        description="AI integration services by Erik Budanov: Claude, AI agents and MCP connected to your CRM, bookings, email and analytics. Real client cases."
        canonical="/"
        schemaMarkup={organizationSchema}
      />
      <Navbar />
      <HeroSection />
      <TrustedPartners />
      <AiCasesSection />
      <UpworkProofSection />
      <ReviewsSection />
      <ServicesSection />
      <ImmersiveSection />
      <CtaBanner />
      <PortfolioSection />
      <BlogSection />
      <ContactCTA />
      <ContactFormSection />
      <Footer />
    </div>
  );
}
