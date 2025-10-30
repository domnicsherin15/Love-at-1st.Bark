import { useState, useEffect, useRef } from "react";
import { Mail, Lock, User, Eye, EyeOff, Heart, Crown, Star, Sparkles, Users, Trophy, Award, Shield, Zap, Target, Gift, MessageCircle, Calendar, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import shihTzuHero1 from "@/assets/shih-tzu-hero-1.jpg";
import shihTzuHero2 from "@/assets/shih-tzu-hero-2.jpg";
import shihTzuHero3 from "@/assets/shih-tzu-hero-3.jpg";

const UserAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const communityFeatures = [
    {
      icon: Crown,
      title: "Premium Access",
      description: "Exclusive content from certified Shih-Tzu experts",
      color: "from-yellow-500 to-amber-600"
    },
    {
      icon: Users,
      title: "Expert Community",
      description: "Connect with 50,000+ passionate dog lovers",
      color: "from-amber-500 to-yellow-600"
    },
    {
      icon: Trophy,
      title: "Achievements",
      description: "Earn badges as you learn and contribute",
      color: "from-yellow-600 to-amber-500"
    },
    {
      icon: Sparkles,
      title: "Personalized Care",
      description: "AI-powered recommendations for your Shih-Tzu",
      color: "from-amber-600 to-yellow-500"
    },
    {
      icon: MessageCircle,
      title: "24/7 Support",
      description: "Get answers from experts anytime",
      color: "from-yellow-500 to-amber-600"
    },
    {
      icon: Gift,
      title: "Monthly Perks",
      description: "Exclusive discounts and surprise rewards",
      color: "from-amber-500 to-yellow-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Shih-Tzu Mom",
      image: shihTzuHero1,
      text: "This community transformed how I care for my Bella!"
    },
    {
      name: "Mike Chen",
      role: "Dog Trainer",
      image: shihTzuHero2,
      text: "The expert advice here is absolutely invaluable."
    },
    {
      name: "Emma Wilson",
      role: "Grooming Expert",
      image: shihTzuHero3,
      text: "I've learned so much and made amazing friends!"
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome back!",
        description: "Successfully logged into your PawPerfect account.",
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please ensure both passwords match.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Account created!",
        description: "Welcome to the PawPerfect community!",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: '#0a0a0a',
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Golden Gradient Orbs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 animate-float"
          style={{
            background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.3s ease-out, top 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
          style={{
            background: 'radial-gradient(circle, #FFA500 0%, transparent 70%)',
            right: '10%',
            bottom: '10%',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 opacity-30"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(#FFD700 1px, transparent 1px), linear-gradient(90deg, #FFD700 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating Logo - Top Right Corner with Crown */}
      <div className="absolute top-8 right-8 z-50 group cursor-pointer">
        <div className="relative">
          <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 h-8 w-8 text-yellow-500 animate-bounce" />
          <div className="flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl border border-yellow-500/30 bg-black/40 hover:bg-black/60 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]">
            <Heart className="h-8 w-8 text-yellow-500 animate-pulse" />
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                PawPerfect
              </span>
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-2 w-2 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Hero Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <Badge 
                className="mb-4 px-6 py-2 text-lg border-2 border-yellow-500/50 bg-black/60 text-yellow-400 hover:bg-yellow-500/10 transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Elite Shih-Tzu Community
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                  Join The Most
                </span>
                <span className="block bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-300 bg-clip-text text-transparent animate-gradient">
                  Exclusive
                </span>
                <span className="block bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent animate-gradient">
                  Dog Community
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-yellow-200/80 max-w-xl">
                Where passion meets expertise. Connect with 50,000+ Shih-Tzu lovers worldwide.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              {[
                { number: "50K+", label: "Members" },
                { number: "1000+", label: "Experts" },
                { number: "24/7", label: "Support" }
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-xl backdrop-blur-xl border border-yellow-500/30 bg-black/40 hover:bg-black/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] cursor-pointer"
                >
                  <div className="text-3xl font-bold bg-gradient-to-br from-yellow-400 to-amber-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-yellow-200/60">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto lg:mx-0">
              {communityFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setActiveFeature(index)}
                    onMouseLeave={() => setActiveFeature(null)}
                    className="group relative p-4 rounded-xl backdrop-blur-xl border border-yellow-500/30 bg-black/40 hover:bg-black/60 transition-all duration-300 cursor-pointer overflow-hidden"
                    style={{
                      transform: activeFeature === index ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: activeFeature === index ? '0 0 40px rgba(255, 215, 0, 0.3)' : 'none'
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className="relative flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400/20 to-amber-600/20 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-6 w-6 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-yellow-300 mb-1">{feature.title}</h3>
                        <p className="text-sm text-yellow-200/60">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Testimonials Carousel */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                <span className="text-yellow-300 font-semibold">What Our Members Say</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {testimonials.map((testimonial, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl backdrop-blur-xl border border-yellow-500/30 bg-black/40 hover:bg-black/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-yellow-500/50 group-hover:border-yellow-400 transition-colors"
                      />
                      <div>
                        <div className="font-semibold text-yellow-300">{testimonial.name}</div>
                        <div className="text-xs text-yellow-200/60">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="text-sm text-yellow-200/80 italic">"{testimonial.text}"</p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="border-2 border-yellow-500/30 bg-black/60 backdrop-blur-xl shadow-[0_0_50px_rgba(255,215,0,0.2)] hover:shadow-[0_0_80px_rgba(255,215,0,0.3)] transition-all duration-300">
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  <Shield className="h-16 w-16 text-yellow-500 animate-pulse" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                  Start Your Journey
                </CardTitle>
                <CardDescription className="text-yellow-200/70 text-base">
                  Join thousands of Shih-Tzu enthusiasts and unlock premium features
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-yellow-500/30">
                    <TabsTrigger 
                      value="login" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-600 data-[state=active]:text-black text-yellow-300"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signup"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-600 data-[state=active]:text-black text-yellow-300"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4 mt-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-yellow-300">Email</Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500/60 h-4 w-4 group-hover:text-yellow-400 transition-colors" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10 bg-black/40 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/40 focus:border-yellow-400 focus:ring-yellow-400/20"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-yellow-300">Password</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500/60 h-4 w-4 group-hover:text-yellow-400 transition-colors" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10 bg-black/40 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/40 focus:border-yellow-400 focus:ring-yellow-400/20"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-500/60 hover:text-yellow-400 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold py-6 text-lg shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-all duration-300 hover:scale-105"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <Zap className="h-5 w-5 animate-spin" />
                            Signing In...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            Sign In Now
                          </span>
                        )}
                      </Button>
                    </form>

                    <div className="text-center">
                      <Button variant="link" className="text-sm text-yellow-400 hover:text-yellow-300">
                        Forgot your password?
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4 mt-6">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-yellow-300">Full Name</Label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500/60 h-4 w-4 group-hover:text-yellow-400 transition-colors" />
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="Your name"
                            className="pl-10 bg-black/40 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/40 focus:border-yellow-400 focus:ring-yellow-400/20"
                            value={signupData.name}
                            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-yellow-300">Email</Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500/60 h-4 w-4 group-hover:text-yellow-400 transition-colors" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10 bg-black/40 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/40 focus:border-yellow-400 focus:ring-yellow-400/20"
                            value={signupData.email}
                            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-yellow-300">Password</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500/60 h-4 w-4 group-hover:text-yellow-400 transition-colors" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create password"
                            className="pl-10 pr-10 bg-black/40 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/40 focus:border-yellow-400 focus:ring-yellow-400/20"
                            value={signupData.password}
                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-500/60 hover:text-yellow-400 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-yellow-300">Confirm Password</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500/60 h-4 w-4 group-hover:text-yellow-400 transition-colors" />
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm password"
                            className="pl-10 bg-black/40 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/40 focus:border-yellow-400 focus:ring-yellow-400/20"
                            value={signupData.confirmPassword}
                            onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold py-6 text-lg shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-all duration-300 hover:scale-105"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 animate-spin" />
                            Creating...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Crown className="h-5 w-5" />
                            Join Elite Community
                          </span>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="mt-6">
                  <Separator className="bg-yellow-500/20" />
                  <div className="text-center mt-4 space-y-4">
                    <p className="text-sm text-yellow-200/70">
                      Join now and unlock instant access to:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-300 bg-black/40">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Expert Guides
                      </Badge>
                      <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-300 bg-black/40">
                        <Calendar className="h-3 w-3 mr-1" />
                        Care Reminders
                      </Badge>
                      <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-300 bg-black/40">
                        <Target className="h-3 w-3 mr-1" />
                        Training Tips
                      </Badge>
                      <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-300 bg-black/40">
                        <Award className="h-3 w-3 mr-1" />
                        Achievements
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Floating Badge */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-xl border border-yellow-500/30 bg-black/60 animate-bounce">
          <Sparkles className="h-5 w-5 text-yellow-400" />
          <span className="text-yellow-300 font-semibold">Limited Time: Free Premium Access!</span>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;