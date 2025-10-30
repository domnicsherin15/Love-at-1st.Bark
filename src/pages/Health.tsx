import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HealthSection from "@/components/HealthSection";
import DogLoadingAnimation from "@/components/DogLoadingAnimation";

const Health = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DogLoadingAnimation />;
  }

  return (
    <div className="min-h-screen cursor-paw">
      <Navigation />
      <main className="pt-16">
        <HealthSection />
      </main>
    </div>
  );
};

export default Health;
