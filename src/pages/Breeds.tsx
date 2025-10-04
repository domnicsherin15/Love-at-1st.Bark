import Navigation from "@/components/Navigation";
import BreedEncyclopedia from "@/components/BreedEncyclopedia";
import Footer from "@/components/Footer";

const Breeds = () => {
  return (
    <div className="min-h-screen cursor-paw">
      <Navigation />
      <main className="pt-16">
        <BreedEncyclopedia />
      </main>
      <Footer />
    </div>
  );
};

export default Breeds;
