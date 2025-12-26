import { useState } from "react";
import { Heart, BookOpen, Home, Users, Zap, Shield, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Card3D from "@/components/Card3D";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer from "@/components/StaggerContainer";

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Breed Profiles",
    description: "Detailed information about temperament, care needs, health considerations, and training requirements for every breed.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    gradient: "from-primary/20 to-primary/5"
  },
  {
    icon: Heart,
    title: "Personalized Matching",
    description: "Our intelligent matching system helps you find the perfect dog breed based on your lifestyle, living situation, and preferences.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    gradient: "from-accent/20 to-accent/5"
  },
  {
    icon: Users,
    title: "Expert Community",
    description: "Connect with veterinarians, trainers, and experienced dog owners to get advice and share experiences.",
    color: "text-primary-dark",
    bgColor: "bg-primary-dark/10",
    gradient: "from-primary-dark/20 to-primary-dark/5"
  },
  {
    icon: Home,
    title: "Adoption Resources",
    description: "Find reputable rescue organizations and shelters in your area, with tips for successful pet adoption.",
    color: "text-accent-dark",
    bgColor: "bg-accent-dark/10",
    gradient: "from-accent-dark/20 to-accent-dark/5"
  },
  {
    icon: Zap,
    title: "Training Guides",
    description: "Step-by-step training tutorials and behavioral guides from certified dog trainers and behaviorists.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    gradient: "from-primary/20 to-primary/5"
  },
  {
    icon: Shield,
    title: "Health & Wellness",
    description: "Comprehensive health guides, nutrition advice, and preventive care information to keep your dog healthy.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    gradient: "from-accent/20 to-accent/5"
  }
];

const FeaturesSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background via-background/50 to-background overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop)`,
          transform: 'translateZ(0)',
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <Badge variant="secondary" className="mb-4 text-sm sm:text-base px-4 sm:px-6 py-2">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-2 inline" />
            Why Choose PawPerfect
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Everything You Need for Your
            <br className="hidden sm:block" />
            <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary-dark">
              Dog Journey
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            From breed selection to lifelong care, we provide comprehensive resources for every dog lover
          </p>
        </ScrollReveal>

        {/* Features Grid */}
        <StaggerContainer 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-12 sm:mb-16"
          staggerDelay={0.08}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <Card3D key={feature.title} className="h-full">
                <Card 
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative h-full border-2 border-border/50 backdrop-blur-sm transition-all duration-500 overflow-hidden
                    ${isHovered ? 'shadow-elegant border-primary/50' : 'hover:border-border'}`}
                >
                  {/* Gradient background overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />
                  
                  <CardHeader className="relative z-10 p-4 sm:p-3">
                    <div className="flex flex-col items-center justify-center mb-2">
                      <motion.div 
                        className={`w-12 h-12 sm:w-10 sm:h-10 rounded-xl ${feature.bgColor} flex items-center justify-center shadow-lg mb-2`}
                        whileHover={{ scale: 1.1, rotate: 6 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <IconComponent className={`h-6 w-6 sm:h-5 sm:w-5 ${feature.color}`} />
                      </motion.div>
                    </div>
                    <CardTitle className="text-sm text-center mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 p-4 sm:p-3 pt-0">
                    <CardDescription className="text-xs leading-relaxed text-center group-hover:text-foreground/80 transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </Card3D>
            );
          })}
        </StaggerContainer>

        {/* Enhanced Stats Section */}
        <ScrollReveal delay={0.2}>
          <div className="relative mt-12 sm:mt-20 p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary via-accent to-primary-dark text-white overflow-hidden shadow-elegant">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }} />
            </div>
            
            {/* Floating shapes */}
            <motion.div
              className="absolute top-5 right-10"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Heart className="h-12 sm:h-16 w-12 sm:w-16 text-white/10" />
            </motion.div>
            <motion.div
              className="absolute bottom-5 left-10"
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <Sparkles className="h-10 sm:h-12 w-10 sm:w-12 text-white/10" />
            </motion.div>
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Trusted by Dog Lovers Worldwide</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
                {[
                  { value: "200+", label: "Dog Breeds" },
                  { value: "500+", label: "Care Articles" },
                  { value: "1M+", label: "Users Helped" },
                  { value: "99%", label: "Satisfaction Rate" },
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="group"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">{stat.value}</div>
                    <div className="text-white/90 text-sm sm:text-base lg:text-lg">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal className="text-center mt-12 sm:mt-16" delay={0.3}>
          <Button variant="premium" size="lg" className="group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6">
            <span className="relative z-10">Explore All Features</span>
            <ArrowRight className="relative z-10 ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturesSection;