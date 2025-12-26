import Navigation from "@/components/Navigation";
import CareSection from "@/components/CareSection";
import GroomingGuide from "@/components/GroomingGuide";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

const Care = () => {
  return (
    <PageTransition variant="slideUp">
      <div className="min-h-screen cursor-paw">
        <Navigation />
        <main className="pt-16 sm:pt-20">
          <CareSection />
          <GroomingGuide />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Care;
