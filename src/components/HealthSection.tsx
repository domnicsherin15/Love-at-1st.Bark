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
  Info
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card3D from "@/components/Card3D";

import shihTzuMain from "@/assets/breeds/shih-tzu-main.jpg";
import shihTzuHero3 from "@/assets/shih-tzu-hero-3.jpg";
import shihTzuGallery2 from "@/assets/breeds/shih-tzu-gallery-2.jpg";

const commonDiseases = [
  {
    icon: Eye,
    name: "Eye Problems",
    severity: "High",
    description: "Shih-Tzus are prone to various eye conditions including cataracts, progressive retinal atrophy, and corneal ulcers.",
    symptoms: ["Cloudy eyes", "Excessive tearing", "Redness", "Squinting"],
    prevention: ["Daily eye cleaning", "Regular vet checkups", "Protect from irritants"],
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    icon: Wind,
    name: "Breathing Issues",
    severity: "Medium",
    description: "Brachycephalic airway syndrome is common due to their flat face structure, leading to breathing difficulties.",
    symptoms: ["Snoring", "Labored breathing", "Exercise intolerance", "Gagging"],
    prevention: ["Maintain healthy weight", "Avoid heat stress", "Use harness instead of collar"],
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    icon: Bone,
    name: "Hip Dysplasia",
    severity: "Medium",
    description: "A genetic condition where the hip joint doesn't develop properly, causing pain and mobility issues.",
    symptoms: ["Limping", "Difficulty standing", "Reduced activity", "Pain when touched"],
    prevention: ["Maintain healthy weight", "Regular exercise", "Joint supplements"],
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    icon: Activity,
    name: "Dental Disease",
    severity: "High",
    description: "Small breeds like Shih-Tzus are highly susceptible to dental problems including periodontal disease.",
    symptoms: ["Bad breath", "Bleeding gums", "Tooth loss", "Difficulty eating"],
    prevention: ["Daily teeth brushing", "Dental chews", "Regular dental cleanings"],
    color: "text-green-600",
    bgColor: "bg-green-50"
  }
];

const medicines = [
  {
    icon: Pill,
    category: "Antibiotics",
    examples: ["Amoxicillin", "Cephalexin"],
    uses: "Bacterial infections, wounds, urinary tract infections",
    dosage: "As prescribed by veterinarian"
  },
  {
    icon: Syringe,
    category: "Anti-inflammatories",
    examples: ["Carprofen", "Meloxicam"],
    uses: "Pain relief, arthritis, post-surgery recovery",
    dosage: "Based on weight, vet prescription required"
  },
  {
    icon: HeartPulse,
    category: "Heart Medications",
    examples: ["Enalapril", "Pimobendan"],
    uses: "Heart disease, congestive heart failure",
    dosage: "Long-term management as prescribed"
  },
  {
    icon: Eye,
    category: "Eye Drops",
    examples: ["Gentamicin", "Artificial tears"],
    uses: "Eye infections, dry eyes, irritation",
    dosage: "2-3 times daily or as directed"
  }
];

const naturalRemedies = [
  {
    icon: Leaf,
    name: "Coconut Oil",
    benefits: ["Improves skin health", "Boosts immune system", "Aids digestion"],
    usage: "1 tsp per 10 lbs body weight daily"
  },
  {
    icon: Leaf,
    name: "Chamomile Tea",
    benefits: ["Calms anxiety", "Soothes stomach upset", "Anti-inflammatory"],
    usage: "Cooled tea added to water bowl"
  },
  {
    icon: Leaf,
    name: "Apple Cider Vinegar",
    benefits: ["Improves coat shine", "Aids digestion", "Natural flea repellent"],
    usage: "1 tsp in water bowl (diluted)"
  },
  {
    icon: Leaf,
    name: "Glucosamine",
    benefits: ["Joint health", "Reduces arthritis pain", "Improves mobility"],
    usage: "Supplement form as directed"
  }
];

const AnimatedFloat = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <div 
      className="animate-float"
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

const HealthSection = () => {
  const [activeTab, setActiveTab] = useState("diseases");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
          style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.08}px)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-16 space-y-6">
          <AnimatedFloat delay={0}>
            <Badge variant="secondary" className="text-lg px-6 py-3 shadow-lg">
              <Stethoscope className="mr-2 h-5 w-5" />
              Shih-Tzu Health & Wellness
            </Badge>
          </AnimatedFloat>
          
          <AnimatedFloat delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Health Guide
              </span>
            </h1>
          </AnimatedFloat>
          
          <AnimatedFloat delay={0.4}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive health information, common diseases, medications, and natural remedies to keep your Shih-Tzu happy and healthy.
            </p>
          </AnimatedFloat>

          {/* Health Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            {[
              { icon: HeartPulse, label: "Lifespan", value: "10-18 years" },
              { icon: TrendingUp, label: "Health Score", value: "8/10" },
              { icon: ShieldCheck, label: "Vaccines", value: "5-7 core" },
              { icon: Clock, label: "Vet Visits", value: "2x yearly" }
            ].map((stat, index) => (
              <AnimatedFloat key={index} delay={0.6 + index * 0.1}>
                <Card className="text-center p-4 bg-gradient-to-br from-background to-primary/5 border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              </AnimatedFloat>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-16">
          <TabsList className="grid grid-cols-3 w-full max-w-3xl mx-auto h-auto p-2 bg-gradient-to-r from-primary/10 to-purple-500/10">
            <TabsTrigger value="diseases" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600">
              <AlertCircle className="mr-2 h-4 w-4" />
              Common Diseases
            </TabsTrigger>
            <TabsTrigger value="medicines" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600">
              <Pill className="mr-2 h-4 w-4" />
              Medicines
            </TabsTrigger>
            <TabsTrigger value="remedies" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600">
              <Leaf className="mr-2 h-4 w-4" />
              Natural Remedies
            </TabsTrigger>
          </TabsList>

          {/* Diseases Tab */}
          <TabsContent value="diseases" className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {commonDiseases.map((disease, index) => {
                const IconComponent = disease.icon;
                const isHovered = hoveredCard === index;
                
                return (
                  <div
                    key={disease.name}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Card3D className="group">
                      <Card className={`border-2 h-full transition-all duration-500 ${
                      isHovered ? 'border-primary shadow-2xl' : 'border-primary/20'
                    }`}>
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-16 h-16 rounded-full ${disease.bgColor} flex items-center justify-center
                            transform transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
                            <IconComponent className={`h-8 w-8 ${disease.color}`} />
                          </div>
                          <Badge variant={disease.severity === "High" ? "destructive" : "default"}>
                            {disease.severity} Risk
                          </Badge>
                        </div>
                        
                        <CardTitle className="text-2xl">{disease.name}</CardTitle>
                        <CardDescription className="text-base mt-2">
                          {disease.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                            Symptoms
                          </h4>
                          <ul className="space-y-1">
                            {disease.symptoms.map((symptom, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-center">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                            Prevention
                          </h4>
                          <ul className="space-y-1">
                            {disease.prevention.map((prev, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-center">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                                {prev}
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

            {/* Disease Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[shihTzuMain, shihTzuHero3, shihTzuGallery2].map((image, index) => (
                <div 
                  key={index}
                  className="relative group overflow-hidden rounded-2xl aspect-video cursor-pointer"
                >
                  <img 
                    src={image} 
                    alt={`Health Check ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <Badge className="mb-2">Health Tip</Badge>
                      <p className="text-white font-semibold">
                        {index === 0 ? 'Regular vet checkups prevent serious issues' : 
                         index === 1 ? 'Early detection saves lives' : 
                         'Monitor behavior changes closely'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Medicines Tab */}
          <TabsContent value="medicines" className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {medicines.map((medicine, index) => {
                const IconComponent = medicine.icon;
                
                return (
                  <Card3D key={medicine.category} className="group">
                    <Card className="border-2 border-primary/20 hover:border-primary transition-all h-full bg-gradient-to-br from-background to-primary/5">
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <IconComponent className="h-7 w-7 text-primary" />
                          </div>
                          <CardTitle className="text-xl">{medicine.category}</CardTitle>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-primary mb-1">Common Examples:</p>
                          <p className="text-sm text-muted-foreground">{medicine.examples.join(", ")}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-semibold text-primary mb-1">Used For:</p>
                          <p className="text-sm text-muted-foreground">{medicine.uses}</p>
                        </div>
                        
                        <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-900">
                          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-1 flex items-center">
                            <Info className="h-3 w-3 mr-1" />
                            Dosage:
                          </p>
                          <p className="text-sm text-yellow-700 dark:text-yellow-500">{medicine.dosage}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Card3D>
                );
              })}
            </div>

            <Card className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-900">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-red-900 dark:text-red-400 mb-2">Important Warning</h3>
                    <p className="text-sm text-red-800 dark:text-red-500">
                      Never give human medications to your Shih-Tzu without veterinary approval. Many human medicines are toxic to dogs. 
                      Always consult your veterinarian before administering any medication. Dosages must be carefully calculated based on weight and condition.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Natural Remedies Tab */}
          <TabsContent value="remedies" className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {naturalRemedies.map((remedy, index) => {
                const IconComponent = remedy.icon;
                
                return (
                  <Card3D key={remedy.name} className="group">
                    <Card className="border-2 border-green-200 dark:border-green-900 hover:border-green-400 transition-all h-full bg-gradient-to-br from-background to-green-50 dark:to-green-950/20">
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all">
                          <IconComponent className="h-8 w-8 text-green-600" />
                        </div>
                        <CardTitle className="text-lg">{remedy.name}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">Benefits:</p>
                          <ul className="space-y-1">
                            {remedy.benefits.map((benefit, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start">
                                <div className="w-1 h-1 bg-green-500 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                          <p className="text-xs font-semibold text-green-800 dark:text-green-400 mb-1">Usage:</p>
                          <p className="text-xs text-green-700 dark:text-green-500">{remedy.usage}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Card3D>
                );
              })}
            </div>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-900">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Info className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-green-900 dark:text-green-400 mb-2">Natural Remedy Guidelines</h3>
                    <p className="text-sm text-green-800 dark:text-green-500 mb-3">
                      While natural remedies can complement your Shih-Tzu's health regimen, they should not replace professional veterinary care. 
                      Always introduce new supplements gradually and monitor for any adverse reactions.
                    </p>
                    <ul className="space-y-1 text-sm text-green-700 dark:text-green-500">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2 mt-1.5" />
                        Start with small amounts and increase gradually
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2 mt-1.5" />
                        Consult your vet before combining with medications
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2 mt-1.5" />
                        Use organic, high-quality products when possible
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Emergency Contact CTA */}
        <div className="relative mt-16">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl" />
          <Card className="relative border-2 border-red-200 dark:border-red-900 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600 animate-pulse" />
              <h3 className="text-2xl font-bold mb-3">24/7 Emergency Support</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If your Shih-Tzu shows signs of distress, difficulty breathing, or unusual behavior, contact your veterinarian immediately. 
                Early intervention can save lives.
              </p>
              <Button size="lg" variant="destructive" className="group">
                <Stethoscope className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Find Emergency Vet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HealthSection;
