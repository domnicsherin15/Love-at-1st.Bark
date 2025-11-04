import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import heroDogs from "@/assets/hero-dogs.jpg";
import shihtzu1 from "@/assets/shih-tzu-hero-1.jpg";
import shihtzu2 from "@/assets/shih-tzu-hero-2.jpg";
import shihtzu3 from "@/assets/shih-tzu-hero-3.jpg";
import dogPortrait1 from "@/assets/dog-portrait-1.jpg";
import dogPortrait2 from "@/assets/dog-portrait-2.jpg";

const Index = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [floatOffset, setFloatOffset] = useState(0);
  
  const backgroundImages = [
    heroDogs,
    shihtzu1,
    shihtzu2,
    shihtzu3,
    dogPortrait1,
    dogPortrait2
  ];

  useEffect(() => {
    // Change image every 2 seconds
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 2000);

    // Floating animation
    const floatAnimation = setInterval(() => {
      setFloatOffset((prev) => (prev + 1) % 360);
    }, 50);

    return () => {
      clearInterval(imageInterval);
      clearInterval(floatAnimation);
    };
  }, [backgroundImages.length]);

  const floatY = Math.sin(floatOffset * 0.05) * 20;

  return (
    <div className="min-h-screen cursor-paw relative">
      {/* Floating Background Image Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-20" : "opacity-0"
            }`}
            style={{
              transform: `translateY(${floatY}px) scale(1.1)`,
              transition: "transform 3s ease-in-out"
            }}
          >
            <img
              src={image}
              alt={`Floating background ${index + 1}`}
              className="w-full h-full object-cover blur-sm"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <main>
          <HeroSection />
          <FeaturesSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;