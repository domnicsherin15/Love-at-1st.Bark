import { useState, useEffect } from "react";
import { ArrowRight, Play, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-dogs.jpg";
import dogPortrait1 from "@/assets/dog-portrait-1.jpg";
import dogPortrait2 from "@/assets/dog-portrait-2.jpg";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  const images = [heroImage, dogPortrait1, dogPortrait2];

  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with Parallax */}
      <div 
        className="absolute inset-0 parallax"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
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
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 fade-in-up stagger-1">
            <Star className="h-4 w-4 mr-1" />
            #1 Dog Information Platform
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up stagger-2">
            <span className="gradient-text">Discover</span> the Perfect
            <br />
            <span className="text-accent">Companion</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-up stagger-3">
            Explore comprehensive breed information, expert care guides, and find your ideal four-legged friend
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 fade-in-up stagger-4">
            <Button size="lg" className="btn-glow text-lg px-8">
              Explore Breeds
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 glass">
              <Play className="mr-2 h-5 w-5" />
              Watch Story
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

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 float">
        <Heart className="h-8 w-8 text-accent opacity-60" />
      </div>
      <div className="absolute top-40 right-16 float" style={{ animationDelay: "2s" }}>
        <Star className="h-6 w-6 text-primary opacity-60" />
      </div>
      <div className="absolute bottom-32 left-20 float" style={{ animationDelay: "4s" }}>
        <Heart className="h-10 w-10 text-accent-light opacity-40" />
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