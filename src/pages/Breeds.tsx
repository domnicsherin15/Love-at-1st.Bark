import Navigation from "@/components/Navigation";
import BreedEncyclopedia from "@/components/BreedEncyclopedia";
import PageTransition from "@/components/PageTransition";

const Breeds = () => {
  return (
    <PageTransition variant="slide">
      <div className="min-h-screen cursor-paw">
        <Navigation />
        <main className="pt-16">
          <BreedEncyclopedia />
        </main>
      </div>
    </PageTransition>
  );
};

export default Breeds;
