import { useState, useEffect, useRef } from "react";
import { ArrowRight, Play, Heart, Star, Compass, Dog, Sparkles, Activity, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import shihtzu1 from "@/assets/shih-tzu-hero-1.jpg";
import shihtzu2 from "@/assets/shih-tzu-hero-2.jpg";
import shihtzu3 from "@/assets/shih-tzu-hero-3.jpg";

const sideNavItems = [
  { name: "Discover", href: "/", icon: Compass },
  { name: "Breeds", href: "/breeds", icon: Dog },
  { name: "Care", href: "/care", icon: Sparkles },
  { name: "Health", href: "/health", icon: Activity },
  { name: "Join Community", href: "/auth", icon: Users }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

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
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY, scale }}
      >
        <div className="absolute inset-0 bg-hero-gradient opacity-50 z-10" />
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Hero dog ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 animate-ken-burns" : "opacity-0"
            }`}
            style={{
              animationDelay: index === currentSlide ? "0s" : "0s",
            }}
          />
        ))}
      </motion.div>

      {/* Floating Side Navigation */}
      <motion.div 
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3"
        style={{ opacity }}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {sideNavItems.map((item, index) => (
          <Link
            key={item.name}
            to={item.href}
            className="group flex items-center gap-3 glass px-4 py-3 rounded-full hover:bg-primary/20 transition-all duration-300 hover:scale-105 hover:translate-x-1"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <item.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
              {item.name}
            </span>
          </Link>
        ))}
      </motion.div>

      {/* Parallax Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 md:pl-56"
        style={{ y: contentY, opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Personalized Greeting */}
          <div className="mb-4 fade-in-up stagger-1">
            <p className="text-sm md:text-base text-muted-foreground italic">
              For <span className="text-primary font-semibold">Mom</span> —
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
              <div className="text-3xl font-bold text-primary mb-2">10L+</div>
              <div className="text-sm text-muted-foreground">Dogs Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Provided</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{ opacity }}
      >
        <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;