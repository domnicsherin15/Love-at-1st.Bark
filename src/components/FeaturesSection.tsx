import { Heart, BookOpen, Home, Users, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Breed Profiles",
    description: "Detailed information about temperament, care needs, health considerations, and training requirements for every breed.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Heart,
    title: "Personalized Matching",
    description: "Our intelligent matching system helps you find the perfect dog breed based on your lifestyle, living situation, and preferences.",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: Users,
    title: "Expert Community",
    description: "Connect with veterinarians, trainers, and experienced dog owners to get advice and share experiences.",
    color: "text-primary-dark",
    bgColor: "bg-primary-dark/10"
  },
  {
    icon: Home,
    title: "Adoption Resources",
    description: "Find reputable rescue organizations and shelters in your area, with tips for successful pet adoption.",
    color: "text-accent-dark",
    bgColor: "bg-accent-dark/10"
  },
  {
    icon: Zap,
    title: "Training Guides",
    description: "Step-by-step training tutorials and behavioral guides from certified dog trainers and behaviorists.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Shield,
    title: "Health & Wellness",
    description: "Comprehensive health guides, nutrition advice, and preventive care information to keep your dog healthy.",
    color: "text-accent",
    bgColor: "bg-accent/10"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <Badge variant="secondary" className="mb-4">
            Why Choose PawPerfect
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need for Your
            <br />
            <span className="gradient-text">Dog Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From breed selection to lifelong care, we provide comprehensive resources for every dog lover
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.title} 
                className={`hover-lift group border-0 bg-card/50 backdrop-blur-sm fade-in-up stagger-${index % 4 + 1}`}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 p-8 rounded-2xl bg-ocean-gradient text-white fade-in-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-white/80">Dog Breeds</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-white/80">Care Articles</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-white/80">Users Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-white/80">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;