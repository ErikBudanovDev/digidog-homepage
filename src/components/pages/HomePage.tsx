import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrustedPartners } from "@/components/TrustedPartners";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactCTA } from "@/components/ContactCTA";
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
        title="AI Automation & Web Development Agency"
        description="Digidog is an AI consulting and full-stack web development agency. We build custom AI automations, websites, and software for mid-size companies. Get more traffic, leads, and conversions."
        canonical="/"
        schemaMarkup={organizationSchema}
      />
      <Navbar />
      <HeroSection />
      <TrustedPartners />
      <ServicesSection />
      <ReviewsSection />
      <CtaBanner />
      <PortfolioSection />
      <BlogSection />
      <ContactCTA />
      <Footer />
    </div>
  );
}
