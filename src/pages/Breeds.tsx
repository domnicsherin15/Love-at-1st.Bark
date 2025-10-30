import Navigation from "@/components/Navigation";
import BreedEncyclopedia from "@/components/BreedEncyclopedia";

const Breeds = () => {
  return (
    <div className="min-h-screen cursor-paw">
      <Navigation />
      <main className="pt-16">
        <BreedEncyclopedia />
      </main>
    </div>
  );
};

export default Breeds;
