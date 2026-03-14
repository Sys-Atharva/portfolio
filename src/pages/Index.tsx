import InteractiveBackdrop from "@/components/InteractiveBackdrop";
import FloatingNav from "@/components/FloatingNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DualCoreSection from "@/components/DualCoreSection";
import PortfolioPreview from "@/components/PortfolioPreview";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <InteractiveBackdrop />
      <FloatingNav />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <DualCoreSection />
        <PortfolioPreview />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
