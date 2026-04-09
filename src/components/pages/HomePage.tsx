import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrustedPartners } from "@/components/TrustedPartners";
import { ServicesSection } from "@/components/ServicesSection";
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
        title="AI Operations Systems for Service Businesses | Digidog"
        description="We rebuild how your business operates using AI. Replace bloated SaaS, automate workflows, and own your infrastructure. From $1,200/month in SaaS to $210 — on systems you control."
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
      <ContactFormSection />
      <Footer />
    </div>
  );
}
