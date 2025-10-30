import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Heart, Crown, Star, Sparkles, Users, Trophy, Award, Shield, Zap, Target, Gift, MessageCircle, Calendar, BookOpen, CheckCircle, TrendingUp, Verified, ArrowRight, Play, ChevronDown, Phone, MapPin, Clock, ArrowLeft, Home, Activity, Stethoscope, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import shihTzuHero1 from "@/assets/shih-tzu-hero-1.jpg";
import shihTzuHero2 from "@/assets/shih-tzu-hero-2.jpg";
import shihTzuHero3 from "@/assets/shih-tzu-hero-3.jpg";
import authBackground from "@/assets/auth-background.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserAuth = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [memberCount, setMemberCount] = useState(47823);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formProgress, setFormProgress] = useState(0);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const navigationLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Care", path: "/care-hub", icon: Activity },
    { name: "Health", path: "/health", icon: Stethoscope },
    { name: "Breeds", path: "/breeds", icon: BookMarked },
  ];

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

  // Animate member count
  useEffect(() => {
    const interval = setInterval(() => {
      setMemberCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse position
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

  // Calculate form progress
  useEffect(() => {
    const fields = Object.values(signupData).filter(v => v.length > 0);
    setFormProgress((fields.length / 4) * 100);
  }, [signupData]);

  // Validate email in real-time
  useEffect(() => {
    if (signupData.email.length === 0) {
      setEmailValid(null);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(signupData.email));
  }, [signupData.email]);

  // Calculate password strength
  useEffect(() => {
    const pwd = signupData.password;
    if (pwd.length === 0) {
      setPasswordStrength(0);
      return;
    }
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9]/.test(pwd)) strength += 25;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength += 25;
    setPasswordStrength(strength);
  }, [signupData.password]);

  const communityFeatures = [
    {
      icon: Crown,
      title: "Premium Access",
      description: "Exclusive content from certified Shih-Tzu experts",
      color: "from-yellow-500 to-amber-600",
      stat: "500+ Articles"
    },
    {
      icon: Users,
      title: "Expert Community",
      description: "Connect with passionate dog lovers worldwide",
      color: "from-amber-500 to-yellow-600",
      stat: "50K+ Members"
    },
    {
      icon: Trophy,
      title: "Achievements",
      description: "Earn badges as you learn and contribute",
      color: "from-yellow-600 to-amber-500",
      stat: "100+ Badges"
    },
    {
      icon: Sparkles,
      title: "AI Care Assistant",
      description: "Personalized recommendations for your dog",
      color: "from-amber-600 to-yellow-500",
      stat: "24/7 Available"
    },
    {
      icon: MessageCircle,
      title: "Expert Support",
      description: "Get answers from veterinarians",
      color: "from-yellow-500 to-amber-600",
      stat: "< 2h Response"
    },
    {
      icon: Gift,
      title: "Monthly Perks",
      description: "Exclusive discounts and rewards",
      color: "from-amber-500 to-yellow-600",
      stat: "$200+ Value"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Shih-Tzu Owner • 3 years",
      image: shihTzuHero1,
      text: "This community transformed how I care for my Bella! The expert advice saved me thousands in vet bills.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Professional Trainer • 8 years",
      image: shihTzuHero2,
      text: "The best resource for Shih-Tzu training. My clients see results faster than ever before!",
      rating: 5
    },
    {
      name: "Emma Wilson",
      role: "Certified Groomer • 5 years",
      image: shihTzuHero3,
      text: "I've learned advanced techniques that elevated my grooming business to the next level.",
      rating: 5
    }
  ];

  const benefits = [
    { icon: CheckCircle, text: "Free lifetime updates", color: "text-green-400" },
    { icon: Shield, text: "100% Privacy protected", color: "text-blue-400" },
    { icon: TrendingUp, text: "Expert-curated content", color: "text-purple-400" },
    { icon: Verified, text: "Verified by 1000+ vets", color: "text-yellow-400" }
  ];

  const faqs = [
    {
      question: "Is membership really free?",
      answer: "Yes! Basic membership is completely free forever. Premium features are optional and give you access to advanced content, 1-on-1 expert consultations, and exclusive perks."
    },
    {
      question: "What makes this community different?",
      answer: "We're the only platform with certified veterinarians, professional trainers, and groomers actively engaged. Every piece of advice is verified by experts with years of experience."
    },
    {
      question: "Can I get personalized advice for my dog?",
      answer: "Absolutely! Our AI Care Assistant provides personalized recommendations, and premium members can schedule video consultations with experts for specific concerns."
    },
    {
      question: "How quickly will I get responses?",
      answer: "Community members typically respond within minutes. Expert support is available 24/7 with average response time under 2 hours for urgent questions."
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "🎉 Welcome back!",
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
        title: "⚠️ Password mismatch",
        description: "Please ensure both passwords match.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (passwordStrength < 75) {
      toast({
        title: "⚠️ Weak password",
        description: "Please choose a stronger password for your security.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      toast({
        title: "🎉 Welcome to PawPerfect!",
        description: "Your account has been created successfully!",
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
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${authBackground})`,
          filter: 'brightness(0.4)'
        }}
      />

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
        {[...Array(40)].map((_, i) => (
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

      {/* Back Button with Dropdown - Top Left Corner */}
      <div className="absolute top-8 left-8 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="group flex items-center gap-3 px-6 py-6 rounded-full backdrop-blur-xl border-2 border-yellow-500/40 bg-black/50 hover:bg-black/70 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] font-professional"
            >
              <ArrowLeft className="h-6 w-6 text-yellow-500 group-hover:translate-x-[-4px] transition-transform" />
              <span className="text-lg font-semibold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Navigate
              </span>
              <ChevronDown className="h-5 w-5 text-yellow-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-56 mt-2 backdrop-blur-xl border-2 border-yellow-500/40 bg-black/90 z-[100]"
            align="start"
          >
            {navigationLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <DropdownMenuItem
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-yellow-500/20 focus:bg-yellow-500/20 transition-all duration-200 group"
                >
                  <IconComponent className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                  <span className="text-yellow-200 group-hover:text-yellow-300 font-medium font-professional">
                    {link.name}
                  </span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Floating Logo - Top Right Corner */}
      <div className="absolute top-8 right-8 z-50 group cursor-pointer animate-float">
        <div className="relative">
          <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 h-8 w-8 text-yellow-500 animate-bounce" />
          <div className="flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl border-2 border-yellow-500/40 bg-black/50 hover:bg-black/70 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(255,215,0,0.4)]">
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
        <div className="max-w-[1600px] w-full">
          
          {/* Hero Section */}
          <div className="text-center mb-12 space-y-6">
            <Badge 
              className="mb-4 px-8 py-3 text-lg border-2 border-yellow-500/50 bg-black/60 text-yellow-400 hover:bg-yellow-500/10 transition-all duration-300 hover:scale-105 animate-pulse"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              🎉 Limited Time: First 1000 Members Get Premium Free!
            </Badge>
            
            <h1 className="text-3xl md:text-5xl font-professional font-bold leading-tight tracking-tight">
              <span className="block bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                Join The World's
              </span>
              <span className="block bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-300 bg-clip-text text-transparent animate-gradient">
                #1 Shih-Tzu
              </span>
              <span className="block bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent animate-gradient">
                Community
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-yellow-200/90 max-w-3xl mx-auto font-medium">
              Connect with <span className="text-yellow-400 font-bold">{memberCount.toLocaleString()}+</span> passionate dog lovers and certified experts worldwide
            </p>

            {/* Live Activity Indicators */}
            <div className="flex items-center justify-center gap-6 text-yellow-300/80">
              <div className="flex items-center gap-2 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                <span className="text-sm font-medium">347 members online now</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">12 questions answered in last hour</span>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
            
            {/* Left Side - Content */}
            <div className="space-y-8">
              
              {/* Live Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { number: memberCount.toLocaleString() + "+", label: "Active Members", icon: Users },
                  { number: "1000+", label: "Expert Vets", icon: Award },
                  { number: "24/7", label: "Support", icon: MessageCircle },
                  { number: "4.9★", label: "Rating", icon: Star }
                ].map((stat, i) => {
                  const IconComponent = stat.icon;
                  return (
                    <div 
                      key={i}
                      className="group relative p-6 rounded-2xl backdrop-blur-xl border-2 border-yellow-500/30 bg-black/40 hover:bg-black/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <IconComponent className="h-8 w-8 text-yellow-400 mb-3 group-hover:scale-110 transition-transform" />
                      <div className="text-4xl font-black bg-gradient-to-br from-yellow-400 to-amber-600 bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-sm text-yellow-200/70 font-medium">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Features Grid */}
              <div>
                <h3 className="text-3xl font-bold text-yellow-300 mb-6 flex items-center gap-3">
                  <Trophy className="h-8 w-8" />
                  Why Join PawPerfect?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {communityFeatures.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div
                        key={index}
                        onMouseEnter={() => setActiveFeature(index)}
                        onMouseLeave={() => setActiveFeature(null)}
                        className="group relative p-6 rounded-2xl backdrop-blur-xl border-2 border-yellow-500/30 bg-black/40 hover:bg-black/60 transition-all duration-300 cursor-pointer overflow-hidden"
                        style={{
                          transform: activeFeature === index ? 'scale(1.05) translateY(-5px)' : 'scale(1)',
                          boxShadow: activeFeature === index ? '0 0 50px rgba(255, 215, 0, 0.4)' : 'none'
                        }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                        <div className="relative">
                          <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-600/20 group-hover:scale-110 transition-transform duration-300">
                              <IconComponent className="h-8 w-8 text-yellow-400" />
                            </div>
                            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/40">
                              {feature.stat}
                            </Badge>
                          </div>
                          <h3 className="font-bold text-xl text-yellow-300 mb-2">{feature.title}</h3>
                          <p className="text-sm text-yellow-200/70 leading-relaxed">{feature.description}</p>
                          <ArrowRight className="h-5 w-5 text-yellow-400 mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Testimonials Carousel */}
              <div className="relative">
                <h3 className="text-3xl font-bold text-yellow-300 mb-6 flex items-center gap-3">
                  <Star className="h-8 w-8 fill-yellow-400" />
                  Trusted by Thousands
                </h3>
                <div className="relative rounded-2xl backdrop-blur-xl border-2 border-yellow-500/30 bg-black/40 p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-600/5" />
                  {testimonials.map((testimonial, i) => (
                    <div
                      key={i}
                      className={`relative transition-all duration-500 ${
                        i === currentTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
                      }`}
                    >
                      <div className="flex items-start gap-6">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-yellow-500/50 shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                        />
                        <div className="flex-1">
                          <div className="flex gap-1 mb-3">
                            {[...Array(testimonial.rating)].map((_, j) => (
                              <Star key={j} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                            ))}
                          </div>
                          <p className="text-lg text-yellow-200/90 italic mb-4 leading-relaxed">"{testimonial.text}"</p>
                          <div>
                            <div className="font-bold text-yellow-300 text-lg">{testimonial.name}</div>
                            <div className="text-sm text-yellow-200/60">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-6 justify-center">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentTestimonial(i)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          i === currentTestimonial ? 'bg-yellow-400 w-8' : 'bg-yellow-500/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {benefits.map((benefit, i) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl backdrop-blur-xl border border-yellow-500/30 bg-black/40 hover:bg-black/60 transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <IconComponent className={`h-8 w-8 ${benefit.color}`} />
                      <span className="text-xs text-yellow-200/70 text-center font-medium">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* FAQ Section */}
              <div>
                <h3 className="text-3xl font-bold text-yellow-300 mb-6 flex items-center gap-3">
                  <BookOpen className="h-8 w-8" />
                  Frequently Asked Questions
                </h3>
                <Accordion type="single" collapsible className="space-y-3">
                  {faqs.map((faq, i) => (
                    <AccordionItem 
                      key={i} 
                      value={`item-${i}`}
                      className="backdrop-blur-xl border-2 border-yellow-500/30 bg-black/40 rounded-xl px-6 hover:bg-black/60 transition-all"
                    >
                      <AccordionTrigger className="text-yellow-300 font-semibold hover:text-yellow-400 py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-yellow-200/80 leading-relaxed pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* CTA Banner */}
              <div className="relative rounded-2xl backdrop-blur-xl border-2 border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 to-amber-600/10 p-8 overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-yellow-300 mb-2">Ready to Transform Your Dog Care?</h4>
                    <p className="text-yellow-200/70">Join now and get instant access to our premium features for free!</p>
                  </div>
                  <Play className="h-16 w-16 text-yellow-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="sticky top-8">
              <Card className="border-2 border-yellow-500/40 bg-black/70 backdrop-blur-2xl shadow-[0_0_60px_rgba(255,215,0,0.25)] hover:shadow-[0_0_100px_rgba(255,215,0,0.35)] transition-all duration-300">
                <CardHeader className="text-center space-y-4 pb-6">
                  <div className="flex justify-center">
                    <div className="relative">
                      <Shield className="h-20 w-20 text-yellow-500 animate-pulse" />
                      <Verified className="absolute -top-2 -right-2 h-8 w-8 text-green-400 animate-bounce" />
                    </div>
                  </div>
                  <CardTitle className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                    Start Your Journey
                  </CardTitle>
                  <CardDescription className="text-yellow-200/80 text-lg font-medium">
                    Join the elite community of Shih-Tzu enthusiasts
                  </CardDescription>
                  {formProgress > 0 && (
                    <div className="space-y-2">
                      <Progress value={formProgress} className="h-2 bg-black/50" />
                      <p className="text-xs text-yellow-300">Profile {Math.round(formProgress)}% complete</p>
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-black/50 border-2 border-yellow-500/30 p-1">
                      <TabsTrigger 
                        value="login" 
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-600 data-[state=active]:text-black text-yellow-300 font-bold"
                      >
                        Sign In
                      </TabsTrigger>
                      <TabsTrigger 
                        value="signup"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-600 data-[state=active]:text-black text-yellow-300 font-bold"
                      >
                        Sign Up
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-5 mt-6">
                      <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-yellow-300 font-semibold">Email Address</Label>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500/60 h-5 w-5 group-hover:text-yellow-400 transition-colors" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              className="pl-12 h-14 bg-black/50 border-2 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/40 focus:border-yellow-400 focus:ring-yellow-400/30 font-medium text-lg rounded-xl"
                              value={loginData.email}
                              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-yellow-300 font-semibold">Password</Label>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500/60 h-5 w-5 group-hover:text-yellow-400 transition-colors" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-12 pr-12 h-14 bg-black/50 border-2 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/40 focus:border-yellow-400 focus:ring-yellow-400/30 font-medium text-lg rounded-xl"
                              value={loginData.password}
                              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                              required
                            />
                            <button
                              type="button"
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-500/60 hover:text-yellow-400 transition-colors"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-black py-7 text-xl shadow-[0_0_40px_rgba(255,215,0,0.4)] hover:shadow-[0_0_60px_rgba(255,215,0,0.6)] transition-all duration-300 hover:scale-105 rounded-xl"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-3">
                              <Zap className="h-6 w-6 animate-spin" />
                              Signing In...
                            </span>
                          ) : (
                            <span className="flex items-center gap-3">
                              <Zap className="h-6 w-6" />
                              Sign In Now
                              <ArrowRight className="h-6 w-6" />
                            </span>
                          )}
                        </Button>
                      </form>

                      <div className="text-center">
                        <Button variant="link" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                          Forgot your password?
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-5 mt-6">
                      <form onSubmit={handleSignup} className="space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="signup-name" className="text-yellow-300 font-semibold">Full Name</Label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500/60 h-5 w-5 group-hover:text-yellow-400 transition-colors" />
                            <Input
                              id="signup-name"
                              type="text"
                              placeholder="Your name"
                              className="pl-12 h-14 bg-black/50 border-2 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/40 focus:border-yellow-400 focus:ring-yellow-400/30 font-medium text-lg rounded-xl"
                              value={signupData.name}
                              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                              required
                            />
                            {signupData.name.length > 0 && (
                              <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400 h-5 w-5" />
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-email" className="text-yellow-300 font-semibold">Email Address</Label>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500/60 h-5 w-5 group-hover:text-yellow-400 transition-colors" />
                            <Input
                              id="signup-email"
                              type="email"
                              placeholder="your@email.com"
                              className="pl-12 h-14 bg-black/50 border-2 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/40 focus:border-yellow-400 focus:ring-yellow-400/30 font-medium text-lg rounded-xl"
                              value={signupData.email}
                              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                              required
                            />
                            {emailValid !== null && (
                              emailValid ? (
                                <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400 h-5 w-5" />
                              ) : (
                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-400 text-xs">Invalid</span>
                              )
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-password" className="text-yellow-300 font-semibold">Password</Label>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500/60 h-5 w-5 group-hover:text-yellow-400 transition-colors" />
                            <Input
                              id="signup-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create strong password"
                              className="pl-12 pr-12 h-14 bg-black/50 border-2 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/40 focus:border-yellow-400 focus:ring-yellow-400/30 font-medium text-lg rounded-xl"
                              value={signupData.password}
                              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                              required
                            />
                            <button
                              type="button"
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-500/60 hover:text-yellow-400 transition-colors"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                          {signupData.password.length > 0 && (
                            <div className="space-y-2">
                              <Progress 
                                value={passwordStrength} 
                                className="h-2"
                                style={{
                                  background: 'rgba(0,0,0,0.5)'
                                }}
                              />
                              <p className={`text-xs font-semibold ${
                                passwordStrength < 50 ? 'text-red-400' : 
                                passwordStrength < 75 ? 'text-yellow-400' : 
                                'text-green-400'
                              }`}>
                                Password strength: {
                                  passwordStrength < 50 ? 'Weak 😟' : 
                                  passwordStrength < 75 ? 'Good 🙂' : 
                                  'Strong 🔒'
                                }
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password" className="text-yellow-300 font-semibold">Confirm Password</Label>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500/60 h-5 w-5 group-hover:text-yellow-400 transition-colors" />
                            <Input
                              id="confirm-password"
                              type="password"
                              placeholder="Confirm your password"
                              className="pl-12 h-14 bg-black/50 border-2 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/40 focus:border-yellow-400 focus:ring-yellow-400/30 font-medium text-lg rounded-xl"
                              value={signupData.confirmPassword}
                              onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                              required
                            />
                            {signupData.confirmPassword.length > 0 && (
                              signupData.password === signupData.confirmPassword ? (
                                <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400 h-5 w-5" />
                              ) : (
                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-400 text-xs">No match</span>
                              )
                            )}
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-black py-7 text-xl shadow-[0_0_40px_rgba(255,215,0,0.4)] hover:shadow-[0_0_60px_rgba(255,215,0,0.6)] transition-all duration-300 hover:scale-105 rounded-xl"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-3">
                              <Sparkles className="h-6 w-6 animate-spin" />
                              Creating Your Account...
                            </span>
                          ) : (
                            <span className="flex items-center gap-3">
                              <Crown className="h-6 w-6" />
                              Join Elite Community
                              <ArrowRight className="h-6 w-6" />
                            </span>
                          )}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6">
                    <Separator className="bg-yellow-500/20" />
                    <div className="text-center mt-6 space-y-4">
                      <p className="text-sm text-yellow-200/80 font-medium">
                        🎁 Unlock instant access to premium features:
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-300 bg-black/50 px-3 py-1">
                          <BookOpen className="h-3 w-3 mr-1" />
                          500+ Expert Guides
                        </Badge>
                        <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-300 bg-black/50 px-3 py-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Smart Reminders
                        </Badge>
                        <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-300 bg-black/50 px-3 py-1">
                          <Target className="h-3 w-3 mr-1" />
                          AI Assistant
                        </Badge>
                        <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-300 bg-black/50 px-3 py-1">
                          <Award className="h-3 w-3 mr-1" />
                          Exclusive Perks
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="mt-6 p-6 rounded-2xl backdrop-blur-xl border-2 border-yellow-500/30 bg-black/40">
                <h4 className="text-yellow-300 font-bold mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Need Help?
                </h4>
                <div className="space-y-2 text-sm text-yellow-200/70">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    support@pawperfect.com
                  </p>
                  <p className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Live chat available 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Banner */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
        <div className="flex items-center gap-3 px-8 py-4 rounded-full backdrop-blur-xl border-2 border-yellow-500/50 bg-black/70 shadow-[0_0_40px_rgba(255,215,0,0.3)]">
          <Sparkles className="h-6 w-6 text-yellow-400 animate-spin" />
          <span className="text-yellow-300 font-bold text-lg">🔥 347 People Joined in Last 24 Hours!</span>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
