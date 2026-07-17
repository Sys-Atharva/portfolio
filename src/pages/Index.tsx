import FloatingNav from "@/components/FloatingNav";
import HeroSection from "@/components/HeroSection";
import TechMarquee from "@/components/TechMarquee";
import { BentoGrid } from "@/components/BentoGrid";
import { CircuitTimeline } from "@/components/CircuitTimeline";
import VideoSection from "@/components/VideoSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <FloatingNav />
      <main className="relative z-10">
        <HeroSection />
        <TechMarquee />
        <BentoGrid />
        <CircuitTimeline />
        <VideoSection />
        <Testimonials />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
