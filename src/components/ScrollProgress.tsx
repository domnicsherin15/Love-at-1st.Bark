import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const scaleX = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  useEffect(() => {
    scaleX.set(scrollProgress);
  }, [scrollProgress, scaleX]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-muted/30">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary origin-left"
        style={{ scaleX }}
      />
      {/* Glow effect */}
      <motion.div
        className="absolute top-0 h-1 w-8 bg-primary/60 blur-sm origin-left"
        style={{ 
          left: `calc(${scrollProgress * 100}% - 1rem)`,
          opacity: scrollProgress > 0.01 ? 1 : 0,
        }}
      />
    </div>
  );
};

export default ScrollProgress;
