import { useState, useEffect } from "react";
import { ArrowRight, Play, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-hero-gradient opacity-90 z-10" />
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Hero dog ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Personalized Greeting */}
          <motion.div className="mb-4" variants={itemVariants}>
            <p className="text-sm md:text-base text-muted-foreground italic">
              For <span className="text-primary font-semibold">Bhavani</span> —
            </p>
            <p className="text-xs md:text-sm text-muted-foreground/80">
              A tiny Shih-Tzu corner I made because you smiled at puppies once ✨
            </p>
          </motion.div>

          {/* Badge */}
          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="mb-4 sm:mb-6">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="text-xs sm:text-sm">#1 Dog Information Platform</span>
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6"
            variants={itemVariants}
          >
            <span className="gradient-text">Shih-Tzu</span>
            <span className="text-foreground"> Care & </span>
            <br className="hidden sm:block" />
            <span className="text-accent">Excellence</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
            variants={itemVariants}
          >
            Everything You Need for Your Dog Journey
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              variant="premium" 
              className="text-base sm:text-lg px-6 sm:px-8 group w-full sm:w-auto" 
              onClick={() => navigate('/breeds')}
            >
              <span className="relative z-10">Explore Breeds</span>
              <ArrowRight className="relative z-10 ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="neon" 
              className="text-base sm:text-lg px-6 sm:px-8 group w-full sm:w-auto" 
              onClick={() => navigate('/care')}
            >
              <Play className="relative z-10 mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="relative z-10">Care Guide</span>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-2xl mx-auto px-4"
            variants={itemVariants}
          >
            {[
              { value: "200+", label: "Dog Breeds", color: "text-primary" },
              { value: "50k+", label: "Happy Families", color: "text-accent" },
              { value: "1M+", label: "Dogs Helped", color: "text-primary" },
              { value: "24/7", label: "Support", color: "text-accent" },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center p-3 sm:p-4 rounded-xl bg-background/30 backdrop-blur-sm border border-primary/10"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1 sm:mb-2`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div 
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-foreground/50 rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="w-1 h-2 sm:h-3 bg-foreground/50 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;