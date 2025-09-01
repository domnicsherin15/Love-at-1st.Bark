import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import BreedEncyclopedia from "@/components/BreedEncyclopedia";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <BreedEncyclopedia />
      </main>
      <Footer />
    </div>
  );
};

export default Index;