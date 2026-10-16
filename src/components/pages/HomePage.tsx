import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrustedPartners } from "@/components/TrustedPartners";
import { ServicesSection } from "@/components/ServicesSection";
import { ImmersiveSection } from "@/components/ImmersiveSection";
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
        title="Immersive 3D, VR & AR Development with AI | DigiDog"
        description="Interactive 3D worlds, VR walkthroughs and AR experiences built with AI by Erik Budanov. Runs in the browser and on Meta Quest."
        canonical="/"
        schemaMarkup={organizationSchema}
      />
      <Navbar />
      <HeroSection />
      <TrustedPartners />
      <ImmersiveSection />
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
