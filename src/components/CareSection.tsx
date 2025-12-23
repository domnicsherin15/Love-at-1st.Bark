import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Apple, 
  GraduationCap, 
  Scissors, 
  Heart,
  BookOpen,
  Users,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Trophy,
  Target,
  Check,
  Clock,
  Star
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import shihTzuHero1 from "@/assets/shih-tzu-hero-1.jpg";
import shihTzuHero2 from "@/assets/shih-tzu-hero-2.jpg";
import shihTzuGallery1 from "@/assets/breeds/shih-tzu-gallery-1.jpg";

const careCategories = [
  {
    icon: Apple,
    title: "Nutrition & Diet",
    description: "Complete feeding guides and nutritional requirements for your Shih-Tzu",
    color: "text-green-600",
    bgColor: "bg-green-100",
    articles: 12,
    difficulty: "Beginner",
    timeToRead: "5 min",
    tips: ["Premium quality dog food", "Small frequent meals", "Avoid human food", "Fresh water always"],
    details: "A balanced diet is crucial for your Shih-Tzu's health. Focus on high-quality protein sources, healthy fats, and appropriate portions based on age and activity level."
  },
  {
    icon: GraduationCap,
    title: "Training & Behavior",
    description: "Professional training methods and behavioral guidance",
    color: "text-blue-600",
    bgColor: "bg-blue-100", 
    articles: 15,
    difficulty: "Intermediate",
    timeToRead: "8 min",
    tips: ["Positive reinforcement", "Consistency is key", "Short training sessions", "Early socialization"],
    details: "Shih-Tzus are intelligent and respond well to positive reinforcement. Start training early with short, fun sessions to build a strong bond with your companion."
  },
  {
    icon: Scissors,
    title: "Grooming & Hygiene",
    description: "Essential grooming techniques and hygiene maintenance",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    articles: 10,
    difficulty: "Advanced",
    timeToRead: "10 min",
    tips: ["Daily brushing routine", "Professional grooming monthly", "Nail trimming weekly", "Teeth cleaning daily"],
    details: "Regular grooming keeps your Shih-Tzu's luxurious coat healthy and tangle-free. Establish a consistent routine to make grooming a pleasant experience."
  }
];

const quickTips = [
  { id: 1, text: "Feed your Shih-Tzu twice daily at consistent times", category: "nutrition" },
  { id: 2, text: "Brush teeth at least 3 times per week", category: "hygiene" },
  { id: 3, text: "Keep training sessions under 10 minutes", category: "training" },
  { id: 4, text: "Check ears weekly for signs of infection", category: "hygiene" },
  { id: 5, text: "Provide mental stimulation with puzzle toys", category: "training" },
  { id: 6, text: "Avoid grapes, chocolate, and onions", category: "nutrition" },
];

const CareSection = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [completedTips, setCompletedTips] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const toggleTip = (id: number) => {
    setCompletedTips(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const filteredTips = activeTab === "all" 
    ? quickTips 
    : quickTips.filter(tip => tip.category === activeTab);

  const images = [
    { src: shihTzuHero1, title: 'Grooming Essentials', desc: 'Learn professional grooming techniques' },
    { src: shihTzuHero2, title: 'Training Success', desc: 'Effective training methods' },
    { src: shihTzuGallery1, title: 'Nutrition Tips', desc: 'Optimal feeding guidelines' }
  ];

  return (
    <section className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-6"
        >
          <Badge variant="secondary" className="text-lg px-6 py-2">
            <Sparkles className="mr-2 h-4 w-4" />
            Shih-Tzu Care Excellence
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Care Guide
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Master the art of Shih-Tzu care with expert guidance on nutrition, training, and grooming.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button size="lg" className="group">
              <Trophy className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Expert Tips
            </Button>
            <Button size="lg" variant="outline" className="group">
              <Target className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Training Plans
            </Button>
          </div>
        </motion.div>

        {/* Interactive Care Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {careCategories.map((category, index) => {
            const IconComponent = category.icon;
            const isExpanded = expandedCard === index;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 h-full ${
                    isExpanded ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}
                  onClick={() => setExpandedCard(isExpanded ? null : index)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full ${category.bgColor} flex items-center justify-center mb-4 transition-transform duration-300 ${isExpanded ? 'scale-110' : ''}`}>
                      <IconComponent className={`h-8 w-8 ${category.color}`} />
                    </div>
                    
                    <CardTitle className="text-xl mb-2 flex items-center justify-center gap-2">
                      {category.title}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </CardTitle>
                    
                    <div className="flex gap-2 justify-center flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {category.articles} Articles
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {category.timeToRead}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="text-center mb-4">
                      {category.description}
                    </CardDescription>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t space-y-4">
                            <p className="text-sm text-muted-foreground">
                              {category.details}
                            </p>
                            
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium">Difficulty: {category.difficulty}</span>
                            </div>
                            
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Quick Tips:</p>
                              {category.tips.map((tip, tipIndex) => (
                                <motion.div 
                                  key={tipIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: tipIndex * 0.1 }}
                                  className="flex items-center text-sm text-muted-foreground"
                                >
                                  <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                                  {tip}
                                </motion.div>
                              ))}
                            </div>
                            
                            <Button className="w-full mt-4" size="sm">
                              Learn More
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Tips Checklist */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Daily Care Checklist</h2>
            <p className="text-muted-foreground">Track your progress - {completedTips.length}/{quickTips.length} completed</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-2xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="hygiene">Hygiene</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredTips.map((tip) => (
                  <motion.div
                    key={tip.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => toggleTip(tip.id)}
                    className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      completedTips.includes(tip.id) 
                        ? 'bg-primary/10 border-primary' 
                        : 'bg-card hover:bg-muted/50 border-border'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      completedTips.includes(tip.id) 
                        ? 'bg-primary border-primary' 
                        : 'border-muted-foreground'
                    }`}>
                      {completedTips.includes(tip.id) && (
                        <Check className="h-4 w-4 text-primary-foreground" />
                      )}
                    </div>
                    <span className={`flex-1 ${completedTips.includes(tip.id) ? 'line-through text-muted-foreground' : ''}`}>
                      {tip.text}
                    </span>
                    <Badge variant="secondary" className="capitalize text-xs">
                      {tip.category}
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Interactive Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Visual Care Guides</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl aspect-square cursor-pointer group"
                onClick={() => setSelectedImage(selectedImage === index ? null : index)}
              >
                <img 
                  src={image.src} 
                  alt={image.title}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    selectedImage === index ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                  selectedImage === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-2">{image.title}</h3>
                    <p className="text-white/90 text-sm">{image.desc}</p>
                    {selectedImage === index && (
                      <Button size="sm" variant="secondary" className="mt-3">
                        View Guide
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
            <Heart className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h3 className="text-3xl font-bold mb-4">Join Our Care Community</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
              Connect with expert trainers, groomers, and fellow Shih-Tzu lovers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Join Community
              </Button>
              <Button size="lg" variant="outline" className="group">
                <BookOpen className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Explore Guides
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareSection;
