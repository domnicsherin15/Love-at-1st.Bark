import { useState } from "react";
import { Search, Filter, Heart, Star, Zap, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const breeds = [
  {
    id: 1,
    name: "Golden Retriever",
    category: "Large",
    energy: "High",
    temperament: "Friendly, Intelligent, Devoted",
    image: "/api/placeholder/400/300",
    lifespan: "10-12 years",
    weight: "55-75 lbs",
    coat: "Long",
    rating: 4.9,
    goodWith: ["Families", "Children", "Other Dogs"]
  },
  {
    id: 2,
    name: "French Bulldog",
    category: "Small",
    energy: "Medium",
    temperament: "Playful, Adaptable, Smart",
    image: "/api/placeholder/400/300",
    lifespan: "10-12 years",
    weight: "20-28 lbs",
    coat: "Short",
    rating: 4.8,
    goodWith: ["Apartments", "Singles", "Seniors"]
  },
  {
    id: 3,
    name: "Border Collie",
    category: "Medium",
    energy: "Very High",
    temperament: "Energetic, Smart, Athletic",
    image: "/api/placeholder/400/300",
    lifespan: "12-15 years",
    weight: "30-55 lbs",
    coat: "Medium",
    rating: 4.7,
    goodWith: ["Active Families", "Experienced Owners"]
  },
  {
    id: 4,
    name: "Labrador Retriever",
    category: "Large",
    energy: "High",
    temperament: "Outgoing, Active, Friendly",
    image: "/api/placeholder/400/300",
    lifespan: "10-12 years",
    weight: "55-80 lbs",
    coat: "Short",
    rating: 4.9,
    goodWith: ["Families", "Children", "Active Lifestyle"]
  },
  {
    id: 5,
    name: "Pomeranian",
    category: "Small",
    energy: "Medium",
    temperament: "Bold, Curious, Lively",
    image: "/api/placeholder/400/300",
    lifespan: "12-16 years",
    weight: "3-7 lbs",
    coat: "Long",
    rating: 4.6,
    goodWith: ["Apartments", "Seniors", "Singles"]
  },
  {
    id: 6,
    name: "German Shepherd",
    category: "Large",
    energy: "High",
    temperament: "Confident, Courageous, Smart",
    image: "/api/placeholder/400/300",
    lifespan: "9-13 years",
    weight: "50-90 lbs",
    coat: "Medium",
    rating: 4.8,
    goodWith: ["Experienced Owners", "Active Families"]
  }
];

const filters = {
  category: ["All", "Small", "Medium", "Large"],
  energy: ["All", "Low", "Medium", "High", "Very High"],
  coat: ["All", "Short", "Medium", "Long"]
};

const BreedEncyclopedia = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: "All",
    energy: "All",
    coat: "All"
  });

  const filteredBreeds = breeds.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         breed.temperament.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedFilters.category === "All" || breed.category === selectedFilters.category;
    const matchesEnergy = selectedFilters.energy === "All" || breed.energy === selectedFilters.energy;
    const matchesCoat = selectedFilters.coat === "All" || breed.coat === selectedFilters.coat;
    
    return matchesSearch && matchesCategory && matchesEnergy && matchesCoat;
  });

  const getEnergyIcon = (energy: string) => {
    switch (energy) {
      case "Low": return <Home className="h-4 w-4" />;
      case "Medium": return <Heart className="h-4 w-4" />;
      case "High": case "Very High": return <Zap className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const getEnergyColor = (energy: string) => {
    switch (energy) {
      case "Low": return "text-muted-foreground";
      case "Medium": return "text-accent";
      case "High": return "text-primary";
      case "Very High": return "text-primary-dark";
      default: return "text-muted-foreground";
    }
  };

  return (
    <section id="breeds" className="py-20 bg-serenity-gradient">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <Badge variant="secondary" className="mb-4">
            200+ Breeds Available
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Paw-some</span> Breed Encyclopedia
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect breed for your lifestyle with our comprehensive database
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 fade-in-up stagger-2">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search breeds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {Object.entries(filters).map(([filterType, options]) => (
                <select
                  key={filterType}
                  value={selectedFilters[filterType as keyof typeof selectedFilters]}
                  onChange={(e) => setSelectedFilters(prev => ({
                    ...prev,
                    [filterType]: e.target.value
                  }))}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground capitalize"
                >
                  {options.map(option => (
                    <option key={option} value={option}>
                      {option} {filterType !== "category" && filterType}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </div>
        </div>

        {/* Breed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-up stagger-3">
          {filteredBreeds.map((breed, index) => (
            <Card key={breed.id} className="hover-lift group overflow-hidden">
              <div className="relative">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="glass">
                    {breed.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{breed.name}</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-accent fill-current" />
                    <span className="ml-1 text-sm font-medium">{breed.rating}</span>
                  </div>
                </div>
                <CardDescription>{breed.temperament}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Weight:</span>
                      <p className="font-medium">{breed.weight}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Lifespan:</span>
                      <p className="font-medium">{breed.lifespan}</p>
                    </div>
                  </div>
                  
                  {/* Energy Level */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Energy Level:</span>
                    <div className={`flex items-center ${getEnergyColor(breed.energy)}`}>
                      {getEnergyIcon(breed.energy)}
                      <span className="ml-1 text-sm font-medium">{breed.energy}</span>
                    </div>
                  </div>
                  
                  {/* Good With Tags */}
                  <div>
                    <span className="text-sm text-muted-foreground mb-2 block">Good with:</span>
                    <div className="flex flex-wrap gap-1">
                      {breed.goodWith.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12 fade-in-up stagger-4">
          <Button variant="outline" size="lg">
            <Filter className="mr-2 h-4 w-4" />
            Load More Breeds
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BreedEncyclopedia;