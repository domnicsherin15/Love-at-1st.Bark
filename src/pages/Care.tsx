import Navigation from "@/components/Navigation";
import CareSection from "@/components/CareSection";
import GroomingGuide from "@/components/GroomingGuide";
import PageTransition from "@/components/PageTransition";

const Care = () => {
  return (
    <PageTransition variant="slideUp">
      <div className="min-h-screen cursor-paw">
        <Navigation />
        <main className="pt-16">
          <CareSection />
          <GroomingGuide />
        </main>
      </div>
    </PageTransition>
  );
};

export default Care;
