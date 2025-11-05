import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import { Slider } from "@/components/ui/slider";
import { Settings } from "lucide-react";

const Index = () => {
  const [floatOffset, setFloatOffset] = useState(0);
  const [opacity, setOpacity] = useState([40]);
  const [blur, setBlur] = useState([3]);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    // Floating animation
    const floatAnimation = setInterval(() => {
      setFloatOffset((prev) => (prev + 1) % 360);
    }, 50);

    return () => {
      clearInterval(floatAnimation);
    };
  }, []);

  const floatY = Math.sin(floatOffset * 0.05) * 20;

  return (
    <div className="min-h-screen cursor-paw relative">
      {/* Floating Background Video Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${floatY}px) scale(1.1)`,
            transition: "transform 3s ease-in-out",
            opacity: opacity[0] / 100
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{
              filter: `blur(${blur[0]}px)`
            }}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-dog-running-in-a-park-4053-large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/70" />
      </div>

      {/* Background Controls */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="fixed top-24 right-6 z-50 p-3 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full hover:bg-primary/30 transition-all"
        aria-label="Toggle background controls"
      >
        <Settings className="w-5 h-5 text-primary" />
      </button>

      {showControls && (
        <div className="fixed top-40 right-6 z-50 p-6 bg-background/95 backdrop-blur-md border border-primary/30 rounded-lg shadow-elegant w-80 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex justify-between">
              <span>Background Opacity</span>
              <span className="text-primary">{opacity[0]}%</span>
            </label>
            <Slider
              value={opacity}
              onValueChange={setOpacity}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex justify-between">
              <span>Blur Level</span>
              <span className="text-primary">{blur[0]}px</span>
            </label>
            <Slider
              value={blur}
              onValueChange={setBlur}
              min={0}
              max={20}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      )}

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