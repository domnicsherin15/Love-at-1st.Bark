import { Heart } from "lucide-react";

const DogLoadingAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="relative">
        {/* Central Heart Logo */}
        <div className="relative z-10 flex flex-col items-center">
          <Heart className="h-20 w-20 text-primary animate-pulse mb-4" />
          <h2 className="text-2xl font-bold gradient-text mb-2">PawPerfect</h2>
          <p className="text-muted-foreground animate-pulse">Loading Care Hub...</p>
        </div>

        {/* Rotating Paw Prints */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 animate-spin"
              style={{
                animationDuration: "3s",
                animationDelay: `${i * 0.125}s`,
              }}
            >
              <div
                className="absolute"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-80px)`,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-primary opacity-60"
                  fill="currentColor"
                >
                  {/* Paw Print SVG */}
                  <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM9 15c-1.1 0-2 .9-2 2 0 1.66 1.34 3 3 3h4c1.66 0 3-1.34 3-3 0-1.1-.9-2-2-2h-6z" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Orbiting Hearts */}
        <div className="absolute inset-0 flex items-center justify-center animate-spin" style={{ animationDuration: "4s" }}>
          <Heart className="absolute h-6 w-6 text-accent" style={{ transform: "translateY(-120px)" }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center animate-spin" style={{ animationDuration: "4s", animationDelay: "2s" }}>
          <Heart className="absolute h-6 w-6 text-accent" style={{ transform: "translateY(-120px)" }} />
        </div>

        {/* Expanding Circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 border-4 border-primary/20 rounded-full animate-ping" style={{ animationDuration: "2s" }}></div>
          <div className="absolute w-60 h-60 border-4 border-accent/20 rounded-full animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }}></div>
        </div>

        {/* Bouncing Dots */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: "0.6s",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DogLoadingAnimation;
