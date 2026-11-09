import Navbar from '../design/components/Navbar';
import HeroCarousel from '../design/components/HeroCarousel';
import StatsSection from '../design/components/StatsSection';
import HowItWorks from '../design/components/HowItWorks';
import ServicesSection from '../design/components/ServicesSection';
import CTASection from '../design/components/CTASection';
import Footer from '../design/components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Landing() {
  return (
    <div className="min-h-screen bg-softwhite text-darknavy landing-page">
      <Navbar />
      <main id="home">
        <HeroCarousel />
        <StatsSection />
        <HowItWorks />
        <ServicesSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
