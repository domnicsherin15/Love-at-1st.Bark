import { ReactNode, Children, cloneElement, isValidElement } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
}

const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  duration = 0.5,
  direction = "up",
}: StaggerContainerProps) => {
  const { ref, isVisible } = useScrollAnimation();

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 30, x: 0 };
      case "down":
        return { y: -30, x: 0 };
      case "left":
        return { y: 0, x: 30 };
      case "right":
        return { y: 0, x: -30 };
      default:
        return { y: 30, x: 0 };
    }
  };

  const offset = getDirectionOffset();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: offset.y,
      x: offset.x,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="contents"
      >
        {Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            return (
              <motion.div key={index} variants={itemVariants}>
                {child}
              </motion.div>
            );
          }
          return child;
        })}
      </motion.div>
    </div>
  );
};

export default StaggerContainer;
