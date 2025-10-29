import Navigation from "@/components/Navigation";
import DogCareHub from "@/components/DogCareHub";
import Footer from "@/components/Footer";

const CareHub = () => {
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