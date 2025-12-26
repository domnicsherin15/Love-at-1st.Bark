import { useState, useEffect } from "react";
import { ArrowRight, Play, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import shihtzu1 from "@/assets/shih-tzu-hero-1.jpg";
import shihtzu2 from "@/assets/shih-tzu-hero-2.jpg";
import shihtzu3 from "@/assets/shih-tzu-hero-3.jpg";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const images = [shihtzu1, shihtzu2, shihtzu3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Hero dog ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Personalized Greeting */}
          <div className="mb-4 fade-in-up stagger-1">
            <p className="text-sm md:text-base text-muted-foreground italic">
              For <span className="text-primary font-semibold">Bhavani</span> —
            </p>
            <p className="text-xs md:text-sm text-muted-foreground/80">
              A tiny Shih-Tzu corner I made because you smiled at puppies once ✨
            </p>
          </div>

          {/* Badge */}
          <Badge variant="secondary" className="mb-6 fade-in-up stagger-1">
            <Star className="h-4 w-4 mr-1" />
            #1 Dog Information Platform
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text text-reveal stagger-2">Shih-Tzu</span>
            <span className="slide-in-glow" style={{ animationDelay: "0.3s" }}> Care & </span>
            <br />
            <span className="text-accent text-reveal" style={{ animationDelay: "0.5s" }}>Excellence</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            <span className="word-fade inline-block" style={{ animationDelay: "0.7s" }}>Everything</span>{' '}
            <span className="word-fade inline-block" style={{ animationDelay: "0.85s" }}>You</span>{' '}
            <span className="word-fade inline-block" style={{ animationDelay: "1s" }}>Need</span>{' '}
            <span className="word-fade inline-block" style={{ animationDelay: "1.15s" }}>for</span>{' '}
            <span className="word-fade inline-block" style={{ animationDelay: "1.3s" }}>Your</span>{' '}
            <span className="word-fade inline-block" style={{ animationDelay: "1.45s" }}>Dog</span>{' '}
            <span className="word-fade inline-block" style={{ animationDelay: "1.6s" }}>Journey</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 fade-in-up stagger-4">
            <Button size="lg" variant="premium" className="text-lg px-8 group" onClick={() => navigate('/breeds')}>
              <span className="relative z-10">Explore Breeds</span>
              <ArrowRight className="relative z-10 ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="neon" className="text-lg px-8 group" onClick={() => navigate('/care')}>
              <Play className="relative z-10 mr-2 h-5 w-5" />
              <span className="relative z-10">Care Guide</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto fade-in-up stagger-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Dog Breeds</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">50k+</div>
              <div className="text-sm text-muted-foreground">Happy Families</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1M+</div>
              <div className="text-sm text-muted-foreground">Dogs Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;