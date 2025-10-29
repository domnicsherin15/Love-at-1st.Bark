import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import DogCareHub from "@/components/DogCareHub";
import Footer from "@/components/Footer";
import DogLoadingAnimation from "@/components/DogLoadingAnimation";

const CareHub = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading animation for 2 seconds
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
        <DogCareHub />
      </main>
      <Footer />
    </div>
  );
};

export default CareHub;