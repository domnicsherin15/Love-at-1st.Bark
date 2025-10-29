import { useState } from "react";
import { Heart, BookOpen, Home, Users, Zap, Shield, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <section className="relative py-20 bg-gradient-to-b from-background via-background/50 to-background overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop)`,
          transform: 'translateZ(0)',
        }}
      ></div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <Badge variant="secondary" className="mb-4 text-base px-6 py-2 animate-pulse">
            <Sparkles className="h-4 w-4 mr-2 inline" />
            Why Choose PawPerfect
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Everything You Need for Your
            <br />
            <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary-dark animate-gradient">
              Dog Journey
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From breed selection to lifelong care, we provide comprehensive resources for every dog lover
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <Card 
                key={feature.title}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative border-2 border-border/50 backdrop-blur-sm transition-all duration-500 overflow-hidden
                  ${isHovered ? 'scale-105 shadow-elegant border-primary/50 -translate-y-2' : 'hover:border-border'}
                  fade-in-up stagger-${index % 4 + 1}`}
              >
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Animated border glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center 
                      group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <IconComponent className={`h-7 w-7 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <ArrowRight className={`h-5 w-5 text-muted-foreground transition-all duration-300 
                      ${isHovered ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                  </div>
                  <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Stats Section */}
        <div className="relative mt-20 p-10 rounded-3xl bg-gradient-to-r from-primary via-accent to-primary-dark text-white overflow-hidden shadow-elegant fade-in-up">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Floating shapes */}
          <Heart className="absolute top-5 right-10 h-16 w-16 text-white/10 animate-float" />
          <Sparkles className="absolute bottom-5 left-10 h-12 w-12 text-white/10 animate-float" style={{ animationDelay: "1s" }} />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-center mb-8 animate-fade-in-up">Trusted by Dog Lovers Worldwide</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold mb-2 animate-fade-in-up">200+</div>
                <div className="text-white/90 text-lg">Dog Breeds</div>
              </div>
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold mb-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>500+</div>
                <div className="text-white/90 text-lg">Care Articles</div>
              </div>
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold mb-2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>1M+</div>
                <div className="text-white/90 text-lg">Users Helped</div>
              </div>
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold mb-2 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>99%</div>
                <div className="text-white/90 text-lg">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 fade-in-up">
          <Button variant="premium" size="lg" className="group text-lg px-8 py-6">
            <span className="relative z-10">Explore All Features</span>
            <ArrowRight className="relative z-10 ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;