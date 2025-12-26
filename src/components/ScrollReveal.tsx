import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  scale?: number;
  once?: boolean;
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 40,
  scale = 1,
  once = true,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: once });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { y: 0, x: distance };
      case "right":
        return { y: 0, x: -distance };
      case "none":
        return { y: 0, x: 0 };
      default:
        return { y: distance, x: 0 };
    }
  };

  const initialPosition = getInitialPosition();

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{
          opacity: 0,
          y: initialPosition.y,
          x: initialPosition.x,
          scale: scale < 1 ? scale : 1,
        }}
        animate={
          isVisible
            ? { opacity: 1, y: 0, x: 0, scale: 1 }
            : {
                opacity: 0,
                y: initialPosition.y,
                x: initialPosition.x,
                scale: scale < 1 ? scale : 1,
              }
        }
        transition={{
          duration,
          delay,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;
