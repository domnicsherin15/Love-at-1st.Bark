import { X, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoveNoteOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoveNoteOverlay = ({ isOpen, onClose }: LoveNoteOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/95 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Love Note Card */}
      <div className="relative z-10 max-w-2xl w-full mx-4 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 border-2 border-primary/30 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(59,130,246,0.3)] animate-scale-in">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-primary/20"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Decorative Hearts */}
        <div className="absolute -top-6 -left-6 animate-pulse">
          <Heart className="h-12 w-12 text-accent fill-accent opacity-70" />
        </div>
        <div className="absolute -bottom-6 -right-6 animate-pulse" style={{ animationDelay: "1s" }}>
          <Heart className="h-16 w-16 text-primary fill-primary opacity-50" />
        </div>
        <div className="absolute top-1/2 -right-8 animate-pulse" style={{ animationDelay: "0.5s" }}>
          <Sparkles className="h-8 w-8 text-accent opacity-60" />
        </div>

        {/* Content */}
        <div className="text-center space-y-6">
          <div className="inline-block">
            <Heart className="h-16 w-16 text-accent fill-accent animate-pulse mx-auto mb-4" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">
            For You Mom✨
          </h2>
          
          <div className="space-y-4 text-lg md:text-xl text-foreground/90 leading-relaxed">
            <p className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Every pixel on this page, every animation, every color...
            </p>
            <p className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              They're all just my way of saying what words sometimes can't.
            </p>
            <p className="text-2xl font-semibold text-primary animate-fade-in" style={{ animationDelay: "0.6s" }}>
              With Love & Care💕
            </p>
            <p className="text-base italic text-muted-foreground animate-fade-in" style={{ animationDelay: "0.8s" }}>
              Just like these Shih-Tzus bring joy with their presence,<br />
              you brighten my world with your smile.
            </p>
          </div>

          <div className="pt-4 text-right animate-fade-in" style={{ animationDelay: "1s" }}>
            <p className="text-xl font-medium text-accent">
              — Forever yours,  Always 💝
            </p>
          </div>
        </div>

        {/* Floating hearts animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-accent/20 fill-accent/20 animate-float-heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
                fontSize: `${20 + Math.random() * 20}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoveNoteOverlay;
