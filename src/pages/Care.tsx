import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import CareSection from "@/components/CareSection";
import Footer from "@/components/Footer";
import DogLoadingAnimation from "@/components/DogLoadingAnimation";

const Care = () => {
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
        <CareSection />
      </main>
      <Footer />
    </div>
  );
};

export default Care;
