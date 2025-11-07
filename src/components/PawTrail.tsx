import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface PawPrint {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
}

const PawTrail = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [pawPrints] = useState<PawPrint[]>([
    { id: 1, x: 10, y: 85, rotation: -15, size: 40 },
    { id: 2, x: 15, y: 75, rotation: 10, size: 45 },
    { id: 3, x: 22, y: 65, rotation: -10, size: 42 },
    { id: 4, x: 28, y: 55, rotation: 15, size: 38 },
    { id: 5, x: 35, y: 45, rotation: -5, size: 44 },
    { id: 6, x: 42, y: 35, rotation: 12, size: 41 },
    { id: 7, x: 50, y: 28, rotation: -8, size: 43 },
  ]);

  useEffect(() => {
    // Show message after all paw prints have appeared
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, pawPrints.length * 400 + 500);

    return () => clearTimeout(timer);
  }, [pawPrints.length]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Paw prints trail */}
      {pawPrints.map((paw, index) => (
        <div
          key={paw.id}
          className="absolute animate-fade-in cursor-pointer pointer-events-auto hover:scale-125 transition-transform"
          style={{
            left: `${paw.x}%`,
            top: `${paw.y}%`,
            transform: `rotate(${paw.rotation}deg)`,
            animationDelay: `${index * 0.4}s`,
            animationDuration: "0.6s",
          }}
        >
          <svg
            width={paw.size}
            height={paw.size}
            viewBox="0 0 100 100"
            className="text-primary/60 hover:text-primary drop-shadow-glow"
          >
            {/* Main pad */}
            <ellipse cx="50" cy="65" rx="20" ry="25" fill="currentColor" />
            {/* Toe pads */}
            <circle cx="30" cy="35" r="10" fill="currentColor" />
            <circle cx="50" cy="30" r="10" fill="currentColor" />
            <circle cx="70" cy="35" r="10" fill="currentColor" />
            <circle cx="35" cy="50" r="8" fill="currentColor" />
          </svg>
        </div>
      ))}

      {/* Secret Message */}
      {showMessage && (
        <div
          className="absolute animate-scale-in pointer-events-auto"
          style={{
            left: "55%",
            top: "22%",
          }}
        >
          <div className="relative bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 backdrop-blur-md border-2 border-primary/40 rounded-2xl p-6 shadow-[0_0_40px_rgba(59,130,246,0.4)] max-w-sm">
            {/* Decorative heart */}
            <div className="absolute -top-4 -right-4">
              <Heart className="h-10 w-10 text-accent fill-accent animate-pulse" />
            </div>
            
            <div className="text-center space-y-3">
              <p className="text-lg font-medium text-foreground">
                Follow your heart... 💕
              </p>
              <p className="text-sm text-muted-foreground italic">
                (Type "luv" to reveal something special)
              </p>
            </div>

            {/* Arrow pointing down */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-primary/40"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PawTrail;
