import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ViabilitySection } from '@/components/ViabilitySection';
import { PartnershipsSection } from '@/components/PartnershipsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ProcessSection } from '@/components/ProcessSection';
import { FAQSection } from '@/components/FAQSection';
import { ContactSection } from '@/components/ContactSection';
import { CTASection } from '@/components/CTASection';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Grain texture overlay */}
      <div className="grain-overlay" />
      
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ViabilitySection />
        <PartnershipsSection />
        <TestimonialsSection />
        <ProcessSection />
        <FAQSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
