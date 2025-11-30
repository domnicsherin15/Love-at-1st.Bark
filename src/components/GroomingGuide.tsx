import { useState } from "react";
import { Check, Sparkles, Droplets, UtensilsCrossed } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Step {
  id: number;
  title: string;
  description: string;
  duration: string;
  animation: "brush" | "water" | "kibble";
  tips: string[];
}

const groomingSteps: Step[] = [
  {
    id: 1,
    title: "Brushing",
    description: "Start with gentle brushing to remove tangles and mats from your Shih-Tzu's coat",
    duration: "10-15 min",
    animation: "brush",
    tips: [
      "Use a slicker brush for the topcoat",
      "Be gentle around sensitive areas",
      "Brush in the direction of hair growth",
      "Check for any skin irritations"
    ]
  },
  {
    id: 2,
    title: "Bathing",
    description: "Give your Shih-Tzu a warm bath using dog-specific shampoo",
    duration: "15-20 min",
    animation: "water",
    tips: [
      "Use lukewarm water",
      "Protect ears from water",
      "Apply shampoo gently",
      "Rinse thoroughly"
    ]
  },
  {
    id: 3,
    title: "Drying",
    description: "Thoroughly dry your Shih-Tzu's coat to prevent skin issues",
    duration: "20-30 min",
    animation: "water",
    tips: [
      "Use a towel first",
      "Blow-dry on low heat",
      "Keep dryer moving",
      "Brush while drying"
    ]
  },
  {
    id: 4,
    title: "Face Cleaning",
    description: "Clean around eyes, nose, and mouth with a damp cloth",
    duration: "5 min",
    animation: "water",
    tips: [
      "Use tear stain remover",
      "Be very gentle",
      "Clean daily if needed",
      "Dry the area thoroughly"
    ]
  },
  {
    id: 5,
    title: "Nail Trimming",
    description: "Carefully trim nails to prevent overgrowth and discomfort",
    duration: "5-10 min",
    animation: "brush",
    tips: [
      "Use proper nail clippers",
      "Avoid the quick",
      "Trim small amounts",
      "File sharp edges"
    ]
  },
  {
    id: 6,
    title: "Treat Time!",
    description: "Reward your Shih-Tzu with a healthy treat for being patient",
    duration: "2 min",
    animation: "kibble",
    tips: [
      "Choose healthy treats",
      "Give praise and affection",
      "Make it a positive experience",
      "Keep treats small"
    ]
  }
];

const GroomingGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const progress = ((completedSteps.length) / groomingSteps.length) * 100;

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < groomingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepSelect = (index: number) => {
    setCurrentStep(index);
  };

  const currentStepData = groomingSteps[currentStep];
  const isStepCompleted = completedSteps.includes(currentStep);
  const allComplete = completedSteps.length === groomingSteps.length;

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="text-lg px-6 py-2 mb-4">
            <Sparkles className="mr-2 h-4 w-4" />
            Step-by-Step Guide
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Grooming Your Shih-Tzu
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow this comprehensive guide for professional grooming at home
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
          {allComplete && (
            <p className="text-center mt-4 text-primary font-semibold animate-bounce">
              🎉 Congratulations! All grooming steps completed!
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border" />
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary transition-all duration-500"
              style={{ height: `${progress}%` }}
            />

            {/* Timeline Steps */}
            <div className="space-y-8">
              {groomingSteps.map((step, index) => {
                const isCompleted = completedSteps.includes(index);
                const isCurrent = currentStep === index;

                return (
                  <div
                    key={step.id}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    {/* Step Content */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <button
                        onClick={() => handleStepSelect(index)}
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left
                          ${isCurrent 
                            ? 'border-primary bg-primary/10 scale-105 shadow-elegant' 
                            : 'border-border hover:border-primary/50 hover:bg-primary/5'
                          }
                          ${isCompleted ? 'opacity-75' : ''}
                        `}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{step.title}</h3>
                          {isCompleted && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{step.duration}</p>
                      </button>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <div
                        className={`w-8 h-8 rounded-full border-4 transition-all duration-300 flex items-center justify-center
                          ${isCompleted 
                            ? 'bg-primary border-primary scale-110' 
                            : isCurrent 
                            ? 'bg-background border-primary scale-125 animate-pulse' 
                            : 'bg-background border-border'
                          }
                        `}
                      >
                        {isCompleted && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Step Detail */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    {/* Animation Container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {currentStepData.animation === "brush" && (
                        <div className="animate-brush-stroke">
                          <Sparkles className="w-12 h-12 text-primary" />
                        </div>
                      )}
                      {currentStepData.animation === "water" && (
                        <div className="animate-water-ripple">
                          <Droplets className="w-12 h-12 text-primary" />
                        </div>
                      )}
                      {currentStepData.animation === "kibble" && (
                        <div className="animate-kibble-drop">
                          <UtensilsCrossed className="w-12 h-12 text-primary" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      Step {currentStep + 1}: {currentStepData.title}
                    </CardTitle>
                    <Badge variant="outline">{currentStepData.duration}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <CardDescription className="text-base mb-6">
                {currentStepData.description}
              </CardDescription>

              {/* Tips */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-foreground">Pro Tips:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentStepData.tips.map((tip, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous Step
                  </Button>
                )}
                <Button
                  variant={isStepCompleted ? "glow" : "premium"}
                  onClick={handleStepComplete}
                  className="group"
                >
                  {isStepCompleted ? (
                    <>
                      <Check className="relative z-10 mr-2 h-5 w-5" />
                      <span className="relative z-10">Completed</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Mark Complete</span>
                      <Check className="relative z-10 ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </Button>
                {currentStep < groomingSteps.length - 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    Next Step
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GroomingGuide;
