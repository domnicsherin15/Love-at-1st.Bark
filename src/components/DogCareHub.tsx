import { useState, useEffect, useRef } from "react";
import { 
  Heart, 
  BookOpen, 
  Users, 
  Award,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Scissors,
  GraduationCap,
  Apple
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card3D from "@/components/Card3D";
import ArticleCard3D from "@/components/ArticleCard3D";

const careCategories = [
  {
    icon: Apple,
    title: "Nutrition & Diet",
    description: "Complete feeding guides and nutritional requirements for your Shih-Tzu",
    color: "text-green-600",
    bgColor: "bg-green-50",
    articles: 12
  },
  {
    icon: Stethoscope,
    title: "Health & Wellness",
    description: "Preventive care, health monitoring, and wellness tips",
    color: "text-red-600", 
    bgColor: "bg-red-50",
    articles: 18
  },
  {
    icon: GraduationCap,
    title: "Training & Behavior",
    description: "Professional training methods and behavioral guidance",
    color: "text-blue-600",
    bgColor: "bg-blue-50", 
    articles: 15
  },
  {
    icon: Scissors,
    title: "Grooming & Hygiene",
    description: "Essential grooming techniques and hygiene maintenance",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    articles: 10
  }
];

const featuredArticles = [
  {
    id: 1,
    title: "The Complete Shih-Tzu Nutrition Guide",
    category: "Nutrition",
    excerpt: "Everything you need to know about feeding your Shih-Tzu for optimal health and vitality.",
    readTime: "8 min read",
    author: "Dr. Sarah Chen",
    publishDate: "2024-01-15",
    image: "/api/placeholder/300/200",
    featured: true
  },
  {
    id: 2,
    title: "Shih-Tzu Eye Care: Preventing Common Issues",
    category: "Health",
    excerpt: "Essential tips for maintaining your Shih-Tzu's eye health and preventing common problems.",
    readTime: "5 min read", 
    author: "Dr. Mike Rodriguez",
    publishDate: "2024-01-12",
    image: "/api/placeholder/300/200",
    featured: true
  },
  {
    id: 3,
    title: "Mastering Shih-Tzu Coat Care",
    category: "Grooming",
    excerpt: "Professional grooming techniques to keep your Shih-Tzu's coat healthy and beautiful.",
    readTime: "10 min read",
    author: "Emma Wilson",
    publishDate: "2024-01-10",
    image: "/api/placeholder/300/200", 
    featured: true
  },
  {
    id: 4,
    title: "House Training Your Shih-Tzu Puppy",
    category: "Training",
    excerpt: "Effective methods for successfully house training your Shih-Tzu puppy.",
    readTime: "6 min read",
    author: "Tom Anderson",
    publishDate: "2024-01-08",
    image: "/api/placeholder/300/200",
    featured: false
  },
  {
    id: 5,
    title: "Shih-Tzu Exercise Needs & Activities",
    category: "Health",
    excerpt: "Understanding the exercise requirements and best activities for your Shih-Tzu.",
    readTime: "7 min read",
    author: "Lisa Martinez",
    publishDate: "2024-01-05",
    image: "/api/placeholder/300/200",
    featured: false
  },
  {
    id: 6,
    title: "Dealing with Shih-Tzu Separation Anxiety",
    category: "Training", 
    excerpt: "Expert strategies to help your Shih-Tzu overcome separation anxiety.",
    readTime: "9 min read",
    author: "Dr. Jennifer Kim",
    publishDate: "2024-01-03",
    image: "/api/placeholder/300/200",
    featured: false
  }
];

// Helper component for animated text
const AnimatedWord = ({ word, index, type = "slide" }: { word: string, index: number, type?: string }) => {
  const animationClass = type === "slide" ? "word-slide-in" : 
                        type === "rotate" ? "word-rotate-in" :
                        type === "bounce" ? "word-bounce-in" :
                        type === "scale" ? "word-scale-in" : "word-wave-in";
  
  return (
    <span 
      className={`inline-block ${animationClass}`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
        animationFillMode: 'forwards'
      }}
    >
      {word}
      {word !== '' && '\u00A0'}
    </span>
  );
};

const AnimatedText = ({ text, type = "slide" }: { text: string, type?: string }) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, index) => (
        <AnimatedWord key={index} word={word} index={index} type={type} />
      ))}
    </>
  );
};

const DogCareHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  const filteredArticles = selectedCategory === "all" 
    ? featuredArticles 
    : featuredArticles.filter(article => 
        article.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      section.style.setProperty('--mouse-x', `${x}%`);
      section.style.setProperty('--mouse-y', `${y}%`);
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="care" 
      className="py-20 bg-serenity-gradient care-hub-section relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <AnimatedText text="Expert Knowledge Base" type="scale" />
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">
              <AnimatedText text="Shih-Tzu" type="rotate" />
            </span>
            {' '}
            <AnimatedText text="Care Hub" type="bounce" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            <AnimatedText 
              text="Comprehensive guides and expert advice for every aspect of Shih-Tzu care, from puppyhood to senior years" 
              type="wave"
            />
          </p>
        </div>

        {/* Care Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 fade-in-up stagger-2">
          {careCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card3D 
                key={category.title}
                className="group cursor-pointer h-full min-h-[280px]"
                onClick={() => setSelectedCategory(category.title.toLowerCase().split(' ')[0])}
              >
                <Card className="border-0 bg-transparent backdrop-blur-sm h-full">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <CardTitle className="text-lg mb-2">
                      <AnimatedText text={category.title} type="slide" />
                    </CardTitle>
                    <Badge variant="outline" className="mx-auto">
                      {category.articles} Articles
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-sm">
                      <AnimatedText text={category.description} type="wave" />
                    </CardDescription>
                  </CardContent>
                </Card>
              </Card3D>
            );
          })}
        </div>

        {/* Article Filters */}
        <div className="mb-12 fade-in-up stagger-3">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full max-w-2xl mx-auto">
              <TabsTrigger value="all">All Articles</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="grooming">Grooming</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Featured Articles Grid */}
        <div className="fade-in-up stagger-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">
              <AnimatedText 
                text={selectedCategory === "all" ? "Featured Articles" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Articles`}
                type="rotate"
              />
            </h3>
            <Button variant="outline">
              View All Articles
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <ArticleCard3D 
                key={article.id}
                className="group min-h-[520px]"
                featured={article.featured}
              >
                <Card className="border-0 bg-transparent overflow-hidden h-full">
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <Badge variant="secondary" className="glass">
                        {article.category}
                      </Badge>
                      {article.featured && (
                        <Badge variant="default" className="bg-accent text-accent-foreground">
                          <Award className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      <AnimatedText text={article.title} type="slide" />
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      <AnimatedText text={article.excerpt} type="wave" />
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(article.publishDate).toLocaleDateString()}
                      </div>
                      <Button size="sm" variant="ghost" className="text-primary">
                        Read More
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ArticleCard3D>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 rounded-2xl bg-ocean-gradient text-white fade-in-up stagger-5">
          <h3 className="text-2xl font-bold mb-4">
            <AnimatedText text="Join Our Expert Community" type="bounce" />
          </h3>
          <p className="text-white/90 mb-6 max-w-lg mx-auto">
            <AnimatedText 
              text="Get access to exclusive Shih-Tzu care content, expert Q&A sessions, and personalized guidance from certified professionals."
              type="wave"
            />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Users className="mr-2 h-5 w-5" />
              Join Community
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <BookOpen className="mr-2 h-5 w-5" />
              Browse All Guides
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DogCareHub;