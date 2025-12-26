import Navigation from "@/components/Navigation";
import HealthSection from "@/components/HealthSection";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

const Health = () => {
  return (
    <PageTransition variant="fade">
      <div className="min-h-screen cursor-paw">
        <Navigation />
        <main className="pt-16 sm:pt-20">
          <HealthSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Health;
