import Navigation from "@/components/Navigation";
import HealthSection from "@/components/HealthSection";
import PageTransition from "@/components/PageTransition";

const Health = () => {
  return (
    <PageTransition variant="fade">
      <div className="min-h-screen cursor-paw">
        <Navigation />
        <main className="pt-16">
          <HealthSection />
        </main>
      </div>
    </PageTransition>
  );
};

export default Health;
