import FloatingNav from "@/components/FloatingNav";
import HeroSection from "@/components/HeroSection";
import TechMarquee from "@/components/TechMarquee";
import ValueProps from "@/components/ValueProps";
import PortfolioPreview from "@/components/PortfolioPreview";
import ExperienceTimeline from "@/components/ExperienceTimeline";
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
        <ValueProps />
        <PortfolioPreview />
        <ExperienceTimeline />
        <VideoSection />
        <Testimonials />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
