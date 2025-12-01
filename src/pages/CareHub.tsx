import Navigation from "@/components/Navigation";
import DogCareHub from "@/components/DogCareHub";
import PageTransition from "@/components/PageTransition";

const CareHub = () => {
  return (
    <PageTransition variant="slideUp">
      <div className="min-h-screen cursor-paw">
        <Navigation />
        <main className="pt-16">
          <DogCareHub />
        </main>
      </div>
    </PageTransition>
  );
};

export default CareHub;