import { useState, useEffect, useRef } from "react";
import { 
  Apple, 
  GraduationCap, 
  Scissors, 
  Heart,
  BookOpen,
  Users,
  ChevronRight,
  Sparkles,
  Trophy,
  Target
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Card3D from "@/components/Card3D";

import shihTzuHero1 from "@/assets/shih-tzu-hero-1.jpg";
import shihTzuHero2 from "@/assets/shih-tzu-hero-2.jpg";
import shihTzuGallery1 from "@/assets/breeds/shih-tzu-gallery-1.jpg";

const careCategories = [
  {
    icon: Apple,
    title: "Nutrition & Diet",
    description: "Complete feeding guides and nutritional requirements for your Shih-Tzu",
    color: "text-green-600",
    bgColor: "bg-green-50",
    articles: 12,
    tips: ["Premium quality dog food", "Small frequent meals", "Avoid human food", "Fresh water always"]
  },
  {
    icon: GraduationCap,
    title: "Training & Behavior",
    description: "Professional training methods and behavioral guidance",
    color: "text-blue-600",
    bgColor: "bg-blue-50", 
    articles: 15,
    tips: ["Positive reinforcement", "Consistency is key", "Short training sessions", "Early socialization"]
  },
  {
    icon: Scissors,
    title: "Grooming & Hygiene",
    description: "Essential grooming techniques and hygiene maintenance",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    articles: 10,
    tips: ["Daily brushing routine", "Professional grooming monthly", "Nail trimming weekly", "Teeth cleaning daily"]
  }
];

const AnimatedWord = ({ word, index }: { word: string, index: number }) => {
  return (
    <span 
      className="inline-block animate-fade-in"
      style={{ 
        animationDelay: `${index * 0.08}s`,
        opacity: 0,
        animationFillMode: 'forwards'
      }}
    >
      {word}
      {word !== '' && '\u00A0'}
    </span>
  );
};

const AnimatedText = ({ text }: { text: string }) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, index) => (
        <AnimatedWord key={index} word={word} index={index} />
      ))}
    </>
  );
};

const CareSection = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-20 relative overflow-hidden"
      style={{
        background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.1), transparent 80%)`
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block">
            <Badge variant="secondary" className="text-lg px-6 py-2 animate-bounce">
              <Sparkles className="mr-2 h-4 w-4" />
              <AnimatedText text="Shih-Tzu Care Excellence" />
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              <AnimatedText text="Care Guide" />
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <AnimatedText text="Master the art of Shih-Tzu care with expert guidance on nutrition, training, and grooming. Everything your companion needs for a happy, healthy life." />
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button size="lg" variant="premium" className="group">
              <Trophy className="relative z-10 mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span className="relative z-10">Expert Tips</span>
            </Button>
            <Button size="lg" variant="glow" className="group">
              <Target className="relative z-10 mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="relative z-10">Training Plans</span>
            </Button>
          </div>
        </div>

        {/* Care Categories with Enhanced 3D Effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {careCategories.map((category, index) => {
            const IconComponent = category.icon;
            const isActive = activeCategory === index;
            
            return (
              <div
                key={category.title}
                onMouseEnter={() => setActiveCategory(index)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Card3D 
                  className={`group cursor-pointer transition-all duration-500 ${
                    isActive ? 'scale-105 z-20' : 'hover:scale-105'
                  }`}
                >
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 backdrop-blur-xl h-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="text-center relative z-10">
                    <div className={`w-20 h-20 mx-auto rounded-full ${category.bgColor} flex items-center justify-center mb-6 
                      transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 
                      shadow-lg group-hover:shadow-2xl`}>
                      <IconComponent className={`h-10 w-10 ${category.color}`} />
                    </div>
                    
                    <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                    
                    <Badge variant="outline" className="mx-auto mb-4">
                      {category.articles} Expert Articles
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <CardDescription className="text-center mb-6 text-base">
                      {category.description}
                    </CardDescription>
                    
                    {/* Tips List */}
                    <div className="space-y-2 mt-4">
                      {category.tips.map((tip, tipIndex) => (
                        <div 
                          key={tipIndex}
                          className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                          style={{
                            transitionDelay: `${tipIndex * 100}ms`
                          }}
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 group-hover:scale-150 transition-transform" />
                          {tip}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Card3D>
              </div>
            );
          })}
        </div>

        {/* Featured Care Images */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            <AnimatedText text="Visual Care Guides" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[shihTzuHero1, shihTzuHero2, shihTzuGallery1].map((image, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <img 
                  src={image} 
                  alt={`Shih Tzu Care ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-3"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-bold text-xl mb-2">
                      {index === 0 ? 'Grooming Essentials' : index === 1 ? 'Training Success' : 'Nutrition Tips'}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {index === 0 ? 'Learn professional grooming techniques' : 
                       index === 1 ? 'Effective training methods' : 
                       'Optimal feeding guidelines'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl" />
          <div className="relative text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-xl border-2 border-primary/20">
            <Heart className="w-16 h-16 mx-auto mb-6 text-primary animate-pulse" />
            <h3 className="text-3xl font-bold mb-4">
              <AnimatedText text="Join Our Care Community" />
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
              <AnimatedText text="Connect with expert trainers, groomers, and fellow Shih-Tzu lovers. Get personalized care advice and share your journey." />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="premium" className="group">
                <Users className="relative z-10 mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Join Community</span>
              </Button>
              <Button size="lg" variant="glow" className="group">
                <BookOpen className="relative z-10 mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Explore Guides</span>
                <ChevronRight className="relative z-10 ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareSection;
