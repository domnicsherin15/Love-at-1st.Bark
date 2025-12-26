import Navigation from "@/components/Navigation";
import BreedEncyclopedia from "@/components/BreedEncyclopedia";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

const Breeds = () => {
  return (
    <PageTransition variant="slide">
      <div className="min-h-screen cursor-paw">
        <Navigation />
        <main className="pt-16 sm:pt-20">
          <BreedEncyclopedia />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Breeds;
