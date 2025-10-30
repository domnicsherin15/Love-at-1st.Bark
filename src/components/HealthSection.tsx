import { useState, useEffect, useRef } from "react";
import { 
  Stethoscope,
  Activity,
  Pill,
  AlertCircle,
  Eye,
  Wind,
  Bone,
  HeartPulse,
  Syringe,
  Leaf,
  ShieldCheck,
  TrendingUp,
  Clock,
  Info,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Sparkles,
  Zap,
  BookOpen,
  Phone
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Card3D from "@/components/Card3D";
import { useToast } from "@/hooks/use-toast";

import shihTzuMain from "@/assets/breeds/shih-tzu-main.jpg";
import shihTzuHero3 from "@/assets/shih-tzu-hero-3.jpg";
import shihTzuGallery2 from "@/assets/breeds/shih-tzu-gallery-2.jpg";

const commonDiseases = [
  {
    icon: Eye,
    name: "Eye Problems",
    severity: 90,
    description: "Shih-Tzus are prone to various eye conditions including cataracts, progressive retinal atrophy, and corneal ulcers.",
    symptoms: ["Cloudy eyes", "Excessive tearing", "Redness", "Squinting"],
    prevention: ["Daily eye cleaning", "Regular vet checkups", "Protect from irritants"],
    treatment: "Regular veterinary eye exams, medicated eye drops, surgical intervention for severe cases",
    cost: "$200-$3000",
    color: "text-red-600",
    bgColor: "bg-red-50",
    progressColor: "bg-red-500"
  },
  {
    icon: Wind,
    name: "Breathing Issues",
    severity: 75,
    description: "Brachycephalic airway syndrome is common due to their flat face structure, leading to breathing difficulties.",
    symptoms: ["Snoring", "Labored breathing", "Exercise intolerance", "Gagging"],
    prevention: ["Maintain healthy weight", "Avoid heat stress", "Use harness instead of collar"],
    treatment: "Weight management, surgical correction in severe cases, avoid extreme temperatures",
    cost: "$1000-$5000",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    progressColor: "bg-orange-500"
  },
  {
    icon: Bone,
    name: "Hip Dysplasia",
    severity: 60,
    description: "A genetic condition where the hip joint doesn't develop properly, causing pain and mobility issues.",
    symptoms: ["Limping", "Difficulty standing", "Reduced activity", "Pain when touched"],
    prevention: ["Maintain healthy weight", "Regular exercise", "Joint supplements"],
    treatment: "Physical therapy, pain management, anti-inflammatory medications, surgery for severe cases",
    cost: "$1500-$6000",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    progressColor: "bg-yellow-500"
  },
  {
    icon: Activity,
    name: "Dental Disease",
    severity: 85,
    description: "Small breeds like Shih-Tzus are highly susceptible to dental problems including periodontal disease.",
    symptoms: ["Bad breath", "Bleeding gums", "Tooth loss", "Difficulty eating"],
    prevention: ["Daily teeth brushing", "Dental chews", "Regular dental cleanings"],
    treatment: "Professional dental cleaning, extractions if necessary, antibiotics for infections",
    cost: "$300-$1500",
    color: "text-green-600",
    bgColor: "bg-green-50",
    progressColor: "bg-green-500"
  }
];

const medicines = [
  {
    icon: Pill,
    category: "Antibiotics",
    examples: ["Amoxicillin", "Cephalexin", "Enrofloxacin"],
    uses: "Bacterial infections, wounds, urinary tract infections",
    dosage: "5-10mg per pound, twice daily",
    sideEffects: ["Vomiting", "Diarrhea", "Loss of appetite"],
    rating: 4.5
  },
  {
    icon: Syringe,
    category: "Anti-inflammatories",
    examples: ["Carprofen", "Meloxicam", "Deracoxib"],
    uses: "Pain relief, arthritis, post-surgery recovery",
    dosage: "2mg per pound daily",
    sideEffects: ["GI upset", "Liver issues with long-term use"],
    rating: 4.7
  },
  {
    icon: HeartPulse,
    category: "Heart Medications",
    examples: ["Enalapril", "Pimobendan", "Furosemide"],
    uses: "Heart disease, congestive heart failure",
    dosage: "0.25-0.5mg per pound daily",
    sideEffects: ["Increased urination", "Weakness", "Cough"],
    rating: 4.8
  },
  {
    icon: Eye,
    category: "Eye Drops",
    examples: ["Gentamicin", "Artificial tears", "Cyclosporine"],
    uses: "Eye infections, dry eyes, irritation",
    dosage: "1-2 drops, 2-3 times daily",
    sideEffects: ["Temporary stinging", "Redness"],
    rating: 4.6
  }
];

const naturalRemedies = [
  {
    icon: Leaf,
    name: "Coconut Oil",
    benefits: ["Improves skin health", "Boosts immune system", "Aids digestion"],
    usage: "1 tsp per 10 lbs body weight daily",
    effectiveness: 80,
    scientific: true
  },
  {
    icon: Leaf,
    name: "Chamomile Tea",
    benefits: ["Calms anxiety", "Soothes stomach upset", "Anti-inflammatory"],
    usage: "Cooled tea added to water bowl",
    effectiveness: 70,
    scientific: true
  },
  {
    icon: Leaf,
    name: "Apple Cider Vinegar",
    benefits: ["Improves coat shine", "Aids digestion", "Natural flea repellent"],
    usage: "1 tsp in water bowl (diluted)",
    effectiveness: 65,
    scientific: false
  },
  {
    icon: Leaf,
    name: "Glucosamine",
    benefits: ["Joint health", "Reduces arthritis pain", "Improves mobility"],
    usage: "Supplement form as directed",
    effectiveness: 85,
    scientific: true
  }
];

const HealthSection = () => {
  const [activeTab, setActiveTab] = useState("diseases");
  const [expandedDisease, setExpandedDisease] = useState<number | null>(null);
  const [hoveredMedicine, setHoveredMedicine] = useState<number | null>(null);
  const [symptomChecker, setSymptomChecker] = useState<{ [key: string]: boolean }>({});
  const [healthScore, setHealthScore] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const { toast } = useToast();
  
  const images = [shihTzuMain, shihTzuHero3, shihTzuGallery2];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate health score counter
    let counter = 0;
    const target = 85;
    const interval = setInterval(() => {
      if (counter < target) {
        counter += 1;
        setHealthScore(counter);
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto-rotate images
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleDisease = (index: number) => {
    setExpandedDisease(expandedDisease === index ? null : index);
  };

  const toggleSymptom = (symptom: string) => {
    setSymptomChecker(prev => ({
      ...prev,
      [symptom]: !prev[symptom]
    }));
    
    toast({
      title: symptomChecker[symptom] ? "Symptom removed" : "Symptom added",
      description: symptomChecker[symptom] ? "Removed from your checklist" : "Added to your symptom checklist",
    });
  };

  const handleMedicineClick = (medicine: any) => {
    toast({
      title: `${medicine.category} Information`,
      description: `Common examples: ${medicine.examples.join(", ")}. Always consult your veterinarian before use.`,
      duration: 5000,
    });
  };

  return (
    <section 
      className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Large gradient orbs */}
        <div 
          className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header with Interactive Elements */}
        <div className="text-center mb-16 space-y-8">
          <div className="inline-block animate-bounce">
            <Badge variant="secondary" className="text-lg px-6 py-3 shadow-lg cursor-pointer hover:scale-110 transition-transform">
              <Stethoscope className="mr-2 h-5 w-5 animate-pulse" />
              Shih-Tzu Health & Wellness Hub
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold animate-fade-in">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Interactive Health Guide
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Explore comprehensive health information with interactive tools, detailed disease profiles, and expert medical guidance for your Shih-Tzu.
          </p>

          {/* Interactive Health Stats with Animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            {[
              { icon: HeartPulse, label: "Lifespan", value: "10-18", unit: "years", color: "text-red-500" },
              { icon: TrendingUp, label: "Health Score", value: healthScore.toString(), unit: "/100", color: "text-green-500" },
              { icon: ShieldCheck, label: "Vaccines", value: "5-7", unit: "core", color: "text-blue-500" },
              { icon: Clock, label: "Vet Visits", value: "2x", unit: "yearly", color: "text-purple-500" }
            ].map((stat, index) => (
              <Card 
                key={index}
                className="text-center p-6 bg-gradient-to-br from-background to-primary/5 border-primary/20 hover:border-primary/60 hover:shadow-2xl transition-all hover:scale-110 cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <stat.icon className={`h-10 w-10 mx-auto mb-3 ${stat.color} group-hover:scale-125 transition-transform`} />
                <p className="text-3xl font-bold mb-1">
                  {stat.value}
                  <span className="text-lg text-muted-foreground">{stat.unit}</span>
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactive Image Gallery */}
        <div className="mb-16 relative">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Health ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                  index === imageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="text-3xl font-bold mb-2">Professional Health Care</h3>
              <p className="text-white/90">Expert veterinary guidance for your beloved companion</p>
            </div>
            
            {/* Image navigation dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === imageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-16">
          <TabsList className="grid grid-cols-3 w-full max-w-3xl mx-auto h-auto p-2 bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-xl">
            <TabsTrigger 
              value="diseases" 
              className="text-base py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:scale-105 transition-all"
            >
              <AlertCircle className="mr-2 h-5 w-5" />
              Diseases
            </TabsTrigger>
            <TabsTrigger 
              value="medicines" 
              className="text-base py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:scale-105 transition-all"
            >
              <Pill className="mr-2 h-5 w-5" />
              Medicines
            </TabsTrigger>
            <TabsTrigger 
              value="remedies" 
              className="text-base py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:scale-105 transition-all"
            >
              <Leaf className="mr-2 h-5 w-5" />
              Natural
            </TabsTrigger>
          </TabsList>

          {/* Interactive Diseases Tab */}
          <TabsContent value="diseases" className="mt-12">
            <div className="space-y-6">
              {commonDiseases.map((disease, index) => {
                const IconComponent = disease.icon;
                const isExpanded = expandedDisease === index;
                
                return (
                  <div
                    key={disease.name}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card3D className="group">
                      <Card className={`border-2 transition-all duration-500 cursor-pointer ${
                        isExpanded ? 'border-primary shadow-2xl scale-105' : 'border-primary/20 hover:border-primary/40'
                      }`}>
                        <CardHeader 
                          className="cursor-pointer"
                          onClick={() => toggleDisease(index)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div className={`w-16 h-16 rounded-full ${disease.bgColor} flex items-center justify-center
                                transform transition-all duration-500 ${isExpanded ? 'scale-110 rotate-12' : 'group-hover:scale-105'}`}>
                                <IconComponent className={`h-8 w-8 ${disease.color}`} />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <CardTitle className="text-2xl">{disease.name}</CardTitle>
                                  <Badge variant="destructive" className="animate-pulse">
                                    {disease.severity}% Risk
                                  </Badge>
                                </div>
                                
                                {/* Risk Progress Bar */}
                                <div className="flex items-center gap-3">
                                  <Progress value={disease.severity} className="flex-1 h-3" />
                                  <span className="text-sm font-semibold">{disease.severity}%</span>
                                </div>
                              </div>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="ml-4"
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                          
                          <CardDescription className="text-base mt-3 ml-20">
                            {disease.description}
                          </CardDescription>
                        </CardHeader>
                        
                        {/* Expandable Content */}
                        <div className={`overflow-hidden transition-all duration-500 ${
                          isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <CardContent className="pt-0 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                              {/* Symptoms */}
                              <div className="space-y-3">
                                <h4 className="font-semibold text-lg flex items-center">
                                  <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                                  Common Symptoms
                                </h4>
                                <div className="space-y-2">
                                  {disease.symptoms.map((symptom, i) => (
                                    <button
                                      key={i}
                                      onClick={() => toggleSymptom(symptom)}
                                      className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                                        symptomChecker[symptom]
                                          ? 'border-primary bg-primary/10 scale-105'
                                          : 'border-border hover:border-primary/50 hover:scale-102'
                                      }`}
                                    >
                                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                        symptomChecker[symptom] ? 'bg-primary border-primary' : 'border-muted-foreground'
                                      }`}>
                                        {symptomChecker[symptom] && (
                                          <Check className="h-3 w-3 text-white" />
                                        )}
                                      </div>
                                      <span className="text-sm flex-1">{symptom}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Prevention */}
                              <div className="space-y-3">
                                <h4 className="font-semibold text-lg flex items-center">
                                  <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
                                  Prevention Tips
                                </h4>
                                <ul className="space-y-2">
                                  {disease.prevention.map((prev, i) => (
                                    <li 
                                      key={i}
                                      className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 flex items-start gap-2 hover:scale-105 transition-transform"
                                    >
                                      <Sparkles className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                      <span className="text-sm">{prev}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            {/* Treatment & Cost */}
                            <div className="grid md:grid-cols-2 gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                              <div>
                                <h5 className="font-semibold mb-2 flex items-center">
                                  <Stethoscope className="h-4 w-4 mr-2 text-primary" />
                                  Treatment
                                </h5>
                                <p className="text-sm text-muted-foreground">{disease.treatment}</p>
                              </div>
                              <div>
                                <h5 className="font-semibold mb-2 flex items-center">
                                  <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                                  Estimated Cost
                                </h5>
                                <p className="text-2xl font-bold text-primary">{disease.cost}</p>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </Card3D>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Interactive Medicines Tab */}
          <TabsContent value="medicines" className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {medicines.map((medicine, index) => {
                const IconComponent = medicine.icon;
                const isHovered = hoveredMedicine === index;
                
                return (
                  <div
                    key={medicine.category}
                    onMouseEnter={() => setHoveredMedicine(index)}
                    onMouseLeave={() => setHoveredMedicine(null)}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card3D className="group h-full">
                      <Card 
                        className={`border-2 h-full transition-all duration-500 cursor-pointer ${
                          isHovered ? 'border-primary shadow-2xl scale-105' : 'border-primary/20'
                        }`}
                        onClick={() => handleMedicineClick(medicine)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-all ${
                                isHovered ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                              }`}>
                                <IconComponent className="h-8 w-8 text-primary" />
                              </div>
                              <CardTitle className="text-2xl">{medicine.category}</CardTitle>
                            </div>
                            
                            {/* Rating */}
                            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950/20 px-3 py-1 rounded-full">
                              <Sparkles className="h-4 w-4 text-yellow-500" />
                              <span className="font-bold text-yellow-700 dark:text-yellow-400">{medicine.rating}</span>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                            <p className="text-sm font-semibold text-blue-900 dark:text-blue-400 mb-2">Common Examples:</p>
                            <div className="flex flex-wrap gap-2">
                              {medicine.examples.map((example, i) => (
                                <Badge key={i} variant="secondary" className="hover:scale-110 transition-transform">
                                  {example}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-semibold text-primary mb-2 flex items-center">
                              <BookOpen className="h-4 w-4 mr-2" />
                              Used For:
                            </p>
                            <p className="text-sm text-muted-foreground">{medicine.uses}</p>
                          </div>
                          
                          <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg border border-purple-200 dark:border-purple-900">
                            <p className="text-sm font-semibold text-purple-800 dark:text-purple-400 mb-1">Typical Dosage:</p>
                            <p className="text-sm text-purple-700 dark:text-purple-500">{medicine.dosage}</p>
                          </div>
                          
                          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg border border-orange-200 dark:border-orange-900">
                            <p className="text-sm font-semibold text-orange-800 dark:text-orange-400 mb-2 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Side Effects:
                            </p>
                            <ul className="space-y-1">
                              {medicine.sideEffects.map((effect, i) => (
                                <li key={i} className="text-sm text-orange-700 dark:text-orange-500 flex items-center">
                                  <div className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
                                  {effect}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </Card3D>
                  </div>
                );
              })}
            </div>

            <Card className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-2 border-red-300 dark:border-red-800 shadow-xl animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1 animate-bounce" />
                  <div>
                    <h3 className="font-bold text-xl text-red-900 dark:text-red-400 mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Critical Safety Warning
                    </h3>
                    <p className="text-sm text-red-800 dark:text-red-500 mb-3 font-medium">
                      Never give human medications to your Shih-Tzu without veterinary approval. Many human medicines are highly toxic to dogs and can be fatal.
                    </p>
                    <ul className="space-y-2 text-sm text-red-700 dark:text-red-400">
                      <li className="flex items-start">
                                <X className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                        Ibuprofen, acetaminophen, and aspirin are dangerous
                      </li>
                      <li className="flex items-start">
                        <X className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                        Always consult your veterinarian before any medication
                      </li>
                      <li className="flex items-start">
                        <X className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                        Dosages must be calculated based on weight and condition
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interactive Natural Remedies Tab */}
          <TabsContent value="remedies" className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {naturalRemedies.map((remedy, index) => {
                const IconComponent = remedy.icon;
                
                return (
                  <div
                    key={remedy.name}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card3D className="group h-full">
                      <Card className="border-2 border-green-200 dark:border-green-900 hover:border-green-400 hover:shadow-2xl transition-all h-full bg-gradient-to-br from-background to-green-50 dark:to-green-950/20 cursor-pointer hover:scale-105">
                        <CardHeader className="text-center">
                          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all shadow-lg">
                            <IconComponent className="h-10 w-10 text-green-600" />
                          </div>
                          
                          <CardTitle className="text-xl mb-3">{remedy.name}</CardTitle>
                          
                          {/* Effectiveness Bar */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Effectiveness</span>
                              <span className="font-bold text-green-600">{remedy.effectiveness}%</span>
                            </div>
                            <Progress value={remedy.effectiveness} className="h-2 bg-green-100" />
                          </div>
                          
                          {remedy.scientific && (
                            <Badge variant="secondary" className="mt-2">
                              <ShieldCheck className="h-3 w-3 mr-1" />
                              Scientifically Backed
                            </Badge>
                          )}
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">Benefits:</p>
                            <ul className="space-y-2">
                              {remedy.benefits.map((benefit, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex items-start hover:text-foreground transition-colors">
                                  <Check className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-300 dark:border-green-800">
                            <p className="text-xs font-semibold text-green-800 dark:text-green-400 mb-1 flex items-center">
                              <Info className="h-3 w-3 mr-1" />
                              Usage:
                            </p>
                            <p className="text-xs text-green-700 dark:text-green-500 font-medium">{remedy.usage}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Card3D>
                  </div>
                );
              })}
            </div>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-300 dark:border-green-800 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Info className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl text-green-900 dark:text-green-400 mb-3 flex items-center gap-2">
                      <Leaf className="h-5 w-5" />
                      Natural Remedy Best Practices
                    </h3>
                    <p className="text-sm text-green-800 dark:text-green-500 mb-4 font-medium">
                      While natural remedies can complement your Shih-Tzu's health regimen, they should not replace professional veterinary care.
                    </p>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {[
                        "Start with small amounts and increase gradually",
                        "Consult your vet before combining with medications",
                        "Use organic, high-quality products when possible",
                        "Monitor for any adverse reactions carefully",
                        "Keep a health journal to track effectiveness",
                        "Research scientific evidence for each remedy"
                      ].map((tip, i) => (
                        <li key={i} className="text-sm text-green-700 dark:text-green-500 flex items-start p-2 rounded bg-green-100 dark:bg-green-950/40 hover:scale-105 transition-transform">
                          <Sparkles className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Interactive Emergency Contact Section */}
        <div className="relative mt-20 animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-orange-500/30 blur-3xl animate-pulse" />
          <Card className="relative border-4 border-red-300 dark:border-red-800 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/40 dark:to-orange-950/40 shadow-2xl overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <HeartPulse
                  key={i}
                  className="absolute animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            
            <CardContent className="p-12 text-center relative z-10">
              <div className="inline-block mb-6 animate-bounce">
                <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Phone className="w-12 h-12 text-white animate-pulse" />
                </div>
              </div>
              
              <h3 className="text-4xl font-bold mb-4 gradient-text">24/7 Emergency Veterinary Support</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                If your Shih-Tzu shows signs of distress, difficulty breathing, seizures, or unusual behavior, contact your veterinarian immediately. Early intervention can save lives.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="destructive" className="text-lg group shadow-xl hover:shadow-2xl">
                  <Phone className="mr-2 h-6 w-6 group-hover:animate-pulse" />
                  Find Emergency Vet
                </Button>
                <Button size="lg" variant="premium" className="text-lg group shadow-xl hover:shadow-2xl">
                  <Stethoscope className="relative z-10 mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="relative z-10">Health Resources</span>
                </Button>
              </div>
              
              {/* Emergency symptoms list */}
              <div className="mt-8 p-6 bg-white/50 dark:bg-black/20 rounded-2xl backdrop-blur-sm">
                <h4 className="font-bold text-red-900 dark:text-red-400 mb-4 flex items-center justify-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Seek Immediate Care If You Notice:
                </h4>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "Difficulty breathing",
                    "Collapse or weakness",
                    "Seizures",
                    "Severe bleeding",
                    "Poisoning suspected",
                    "Unable to urinate"
                  ].map((symptom, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-red-100 dark:bg-red-950/40 rounded-lg hover:scale-105 transition-transform">
                      <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-red-900 dark:text-red-400">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HealthSection;
