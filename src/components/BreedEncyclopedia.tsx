import { useState, useRef } from "react";
import { Search, Filter, Heart, Star, Zap, Home, ArrowUpDown, Grid, Camera, MapPin, Bookmark, BookmarkCheck, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Import dog breed images
import shihtzu from "@/assets/breeds/shih-tzu-main.jpg";
import shihtzu1 from "@/assets/breeds/shih-tzu-gallery-1.jpg";
import shihtzu2 from "@/assets/breeds/shih-tzu-gallery-2.jpg";
import goldenRetriever from "@/assets/breeds/golden-retriever-main.jpg";
import goldenRetriever1 from "@/assets/breeds/golden-retriever-gallery-1.jpg";
import frenchBulldog from "@/assets/breeds/french-bulldog-main.jpg";
import frenchBulldog1 from "@/assets/breeds/french-bulldog-gallery-1.jpg";
import borderCollie from "@/assets/breeds/border-collie-main.jpg";
import borderCollie1 from "@/assets/breeds/border-collie-gallery-1.jpg";
import labradorRetriever from "@/assets/breeds/labrador-retriever-main.jpg";
import labradorRetriever1 from "@/assets/breeds/labrador-retriever-gallery-1.jpg";
import pomeranian from "@/assets/breeds/pomeranian-main.jpg";
import pomeranian1 from "@/assets/breeds/pomeranian-gallery-1.jpg";
import germanShepherd from "@/assets/breeds/german-shepherd-main.jpg";
import germanShepherd1 from "@/assets/breeds/german-shepherd-gallery-1.jpg";

const breeds = [
  {
    id: 1,
    name: "Shih-Tzu",
    category: "Small",
    energy: "Medium", 
    temperament: "Affectionate, Playful, Outgoing",
    barkSound: "https://assets.mixkit.co/active_storage/sfx/2460/2460-preview.mp3",
    image: shihtzu,
    images: [
      shihtzu,
      shihtzu1,
      shihtzu2,
      shihtzu,
      shihtzu1
    ],
    lifespan: "10-18 years",
    weight: "9-16 lbs",
    coat: "Long",
    rating: 4.9,
    reviewCount: 1847,
    popularity: 98,
    origin: "Tibet/China",
    goodWith: ["Families", "Children", "Seniors", "Apartments"],
    description: "Shih-Tzus are affectionate, playful, and outgoing companions bred to be house pets. Known for their flowing double coat and friendly demeanor, they make excellent family dogs and adapt well to apartment living. Their name means 'lion dog' in Chinese, reflecting their regal appearance and confident personality.",
    reviews: [
      { name: "Maria S.", rating: 5, comment: "Best family dog! So gentle with our toddler and incredibly loyal.", avatar: "/api/placeholder/40/40" },
      { name: "Robert L.", rating: 5, comment: "Perfect apartment companion. Doesn't need much exercise but loves cuddles!", avatar: "/api/placeholder/40/40" },
      { name: "Jennifer K.", rating: 5, comment: "Amazing temperament and so easy to train. Highly recommend for first-time owners.", avatar: "/api/placeholder/40/40" }
    ],
    detailedInfo: {
      history: "Originally bred by Tibetan monks and later developed in the Chinese imperial court, Shih-Tzus were highly prized by Chinese royalty and were often given as gifts to visiting dignitaries.",
      physicalTraits: "Compact body, short muzzle, large dark eyes, and a distinctive flowing double coat that comes in many color combinations.",
      careNeeds: {
        grooming: "Daily brushing required to prevent matting. Professional grooming every 6-8 weeks.",
        exercise: "20-30 minutes of daily exercise, including walks and indoor play.",
        training: "Responds well to positive reinforcement. Can be stubborn but generally eager to please.",
        health: "Watch for eye problems, respiratory issues due to flat face, and hip dysplasia."
      }
    }
  },
  {
    id: 2,
    name: "Golden Retriever",
    category: "Large",
    energy: "High",
    temperament: "Friendly, Intelligent, Devoted",
    barkSound: "https://assets.mixkit.co/active_storage/sfx/2459/2459-preview.mp3",
    image: goldenRetriever,
    images: [
      goldenRetriever,
      goldenRetriever1, 
      goldenRetriever,
      goldenRetriever1
    ],
    lifespan: "10-12 years",
    weight: "55-75 lbs",
    coat: "Long",
    rating: 4.9,
    reviewCount: 1247,
    popularity: 95,
    origin: "Scotland",
    goodWith: ["Families", "Children", "Other Dogs"],
    description: "Golden Retrievers are friendly, intelligent, and devoted dogs. They make excellent family pets and are known for their gentle nature.",
    reviews: [
      { name: "Sarah M.", rating: 5, comment: "Amazing family dog! So gentle with kids.", avatar: "/api/placeholder/40/40" },
      { name: "Mike R.", rating: 5, comment: "Best decision we ever made. Loyal and smart.", avatar: "/api/placeholder/40/40" }
    ]
  },
  {
    id: 3,
    name: "French Bulldog",
    category: "Small",
    energy: "Medium",
    temperament: "Playful, Adaptable, Smart",
    barkSound: "https://assets.mixkit.co/active_storage/sfx/2461/2461-preview.mp3",
    image: frenchBulldog,
    images: [
      frenchBulldog,
      frenchBulldog1,
      frenchBulldog
    ],
    lifespan: "10-12 years",
    weight: "20-28 lbs",
    coat: "Short",
    rating: 4.8,
    reviewCount: 892,
    popularity: 88,
    origin: "France",
    goodWith: ["Apartments", "Singles", "Seniors"],
    description: "French Bulldogs are playful, adaptable, and smart companions with an affectionate nature.",
    reviews: [
      { name: "Emma L.", rating: 5, comment: "Perfect apartment dog! Low maintenance and loving.", avatar: "/api/placeholder/40/40" }
    ]
  },
  {
    id: 4,
    name: "Border Collie",
    category: "Medium",
    energy: "Very High",
    temperament: "Energetic, Smart, Athletic",
    barkSound: "https://assets.mixkit.co/active_storage/sfx/2462/2462-preview.mp3",
    image: borderCollie,
    images: [
      borderCollie,
      borderCollie1,
      borderCollie,
      borderCollie1,
      borderCollie
    ],
    lifespan: "12-15 years",
    weight: "30-55 lbs",
    coat: "Medium",
    rating: 4.7,
    reviewCount: 654,
    popularity: 75,
    origin: "United Kingdom",
    goodWith: ["Active Families", "Experienced Owners"],
    description: "Border Collies are energetic, smart, and athletic dogs that excel in agility and obedience.",
    reviews: [
      { name: "Tom W.", rating: 5, comment: "Incredibly smart! Needs lots of exercise but worth it.", avatar: "/api/placeholder/40/40" }
    ]
  },
  {
    id: 5,
    name: "Labrador Retriever",
    category: "Large",
    energy: "High",
    temperament: "Outgoing, Active, Friendly",
    barkSound: "https://assets.mixkit.co/active_storage/sfx/2458/2458-preview.mp3",
    image: labradorRetriever,
    images: [
      labradorRetriever,
      labradorRetriever1,
      labradorRetriever
    ],
    lifespan: "10-12 years",
    weight: "55-80 lbs",
    coat: "Short",
    rating: 4.9,
    reviewCount: 1543,
    popularity: 98,
    origin: "Canada",
    goodWith: ["Families", "Children", "Active Lifestyle"],
    description: "Labrador Retrievers are outgoing, active, and friendly dogs that love to please their owners.",
    reviews: [
      { name: "Lisa K.", rating: 5, comment: "Most loyal companion ever! Great with our kids.", avatar: "/api/placeholder/40/40" }
    ]
  },
  {
    id: 6,
    name: "Pomeranian",
    category: "Small",
    energy: "Medium",
    temperament: "Bold, Curious, Lively",
    barkSound: "https://assets.mixkit.co/active_storage/sfx/2463/2463-preview.mp3",
    image: pomeranian,
    images: [
      pomeranian,
      pomeranian1
    ],
    lifespan: "12-16 years",
    weight: "3-7 lbs",
    coat: "Long",
    rating: 4.6,
    reviewCount: 423,
    popularity: 72,
    origin: "Germany",
    goodWith: ["Apartments", "Seniors", "Singles"],
    description: "Pomeranians are bold, curious, and lively small dogs with big personalities.",
    reviews: [
      { name: "Mary J.", rating: 4, comment: "Small but mighty! Full of personality and love.", avatar: "/api/placeholder/40/40" }
    ]
  },
  {
    id: 7,
    name: "German Shepherd",
    category: "Large",
    energy: "High",
    temperament: "Confident, Courageous, Smart",
    barkSound: "https://assets.mixkit.co/active_storage/sfx/2457/2457-preview.mp3",
    image: germanShepherd,
    images: [
      germanShepherd,
      germanShepherd1,
      germanShepherd,
      germanShepherd1
    ],
    lifespan: "9-13 years",
    weight: "50-90 lbs",
    coat: "Medium",
    rating: 4.8,
    reviewCount: 987,
    popularity: 85,
    origin: "Germany",
    goodWith: ["Experienced Owners", "Active Families"],
    description: "German Shepherds are confident, courageous, and smart working dogs with unwavering loyalty.",
    reviews: [
      { name: "David P.", rating: 5, comment: "Excellent guard dog and family protector. Highly intelligent.", avatar: "/api/placeholder/40/40" }
    ]
  }
];

const filters = {
  category: ["All", "Small", "Medium", "Large"],
  energy: ["All", "Low", "Medium", "High", "Very High"],
  coat: ["All", "Short", "Medium", "Long"]
};

const sortOptions = [
  { value: "popularity", label: "Most Popular" },
  { value: "name", label: "Name (A-Z)" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviews" }
];

const BreedEncyclopedia = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: "All",
    energy: "All",
    coat: "All"
  });
  const [sortBy, setSortBy] = useState("popularity");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<typeof breeds[0] | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [playingSound, setPlayingSound] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredBreeds = breeds
    .filter(breed => {
      const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           breed.temperament.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           breed.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           breed.goodWith.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedFilters.category === "All" || breed.category === selectedFilters.category;
      const matchesEnergy = selectedFilters.energy === "All" || breed.energy === selectedFilters.energy;
      const matchesCoat = selectedFilters.coat === "All" || breed.coat === selectedFilters.coat;
      
      return matchesSearch && matchesCategory && matchesEnergy && matchesCoat;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviewCount - a.reviewCount;
        case "popularity":
        default:
          return b.popularity - a.popularity;
      }
    });

  const toggleFavorite = (breedId: number) => {
    setFavorites(prev => 
      prev.includes(breedId) 
        ? prev.filter(id => id !== breedId)
        : [...prev, breedId]
    );
  };

  const openBreedDetails = (breed: typeof breeds[0]) => {
    setSelectedBreed(breed);
  };

  const openGallery = (breed: typeof breeds[0]) => {
    setSelectedBreed(breed);
    setShowGallery(true);
  };

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

  const playBarkSound = (breed: typeof breeds[0]) => {
    if (playingSound === breed.id) {
      // Stop playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setPlayingSound(null);
    } else {
      // Play new sound
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(breed.barkSound);
      audio.volume = 0.5;
      audio.play();
      audioRef.current = audio;
      setPlayingSound(breed.id);
      
      audio.onended = () => {
        setPlayingSound(null);
      };
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

        {/* Advanced Search and Filters */}
        <div className="mb-12 fade-in-up stagger-2">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search breeds, temperament, or characteristics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {Object.entries(filters).map(([filterType, options]) => (
                <Select
                  key={filterType}
                  value={selectedFilters[filterType as keyof typeof selectedFilters]}
                  onValueChange={(value) => setSelectedFilters(prev => ({
                    ...prev,
                    [filterType]: value
                  }))}
                >
                  <SelectTrigger className="w-[120px] capitalize">
                    <SelectValue placeholder={filterType} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredBreeds.length} of {breeds.length} breeds
              {searchTerm && ` for "${searchTerm}"`}
            </span>
            {favorites.length > 0 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {favorites.length} favorites
              </Badge>
            )}
          </div>
        </div>

        {/* Enhanced Breed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-up stagger-3">
          {filteredBreeds.map((breed, index) => (
            <Card key={breed.id} className="hover-lift group overflow-hidden relative">
              <div className="relative">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => openGallery(breed)}
                />
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <Badge variant="secondary" className="glass">
                    {breed.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="glass p-2 h-8 w-8"
                    onClick={() => toggleFavorite(breed.id)}
                  >
                    {favorites.includes(breed.id) ? (
                      <BookmarkCheck className="h-4 w-4 text-accent" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <Button
                    variant="secondary" 
                    size="sm"
                    className="glass text-xs"
                    onClick={() => openGallery(breed)}
                  >
                    <Camera className="h-3 w-3 mr-1" />
                    {breed.images.length} photos
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="glass text-xs btn-glow"
                    onClick={() => playBarkSound(breed)}
                  >
                    {playingSound === breed.id ? (
                      <VolumeX className="h-3 w-3 mr-1 animate-pulse" />
                    ) : (
                      <Volume2 className="h-3 w-3 mr-1" />
                    )}
                    Hear bark
                  </Button>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{breed.name}</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-accent fill-current" />
                    <span className="ml-1 text-sm font-medium">{breed.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({breed.reviewCount})
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {breed.origin}
                </div>
                <CardDescription className="line-clamp-2">{breed.description}</CardDescription>
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
                  
                  {/* Energy Level & Popularity */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground mr-2">Energy:</span>
                      <div className={`flex items-center ${getEnergyColor(breed.energy)}`}>
                        {getEnergyIcon(breed.energy)}
                        <span className="ml-1 text-sm font-medium">{breed.energy}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Popularity: </span>
                      <span className="font-medium text-primary">{breed.popularity}%</span>
                    </div>
                  </div>
                  
                  {/* Good With Tags */}
                  <div>
                    <span className="text-sm text-muted-foreground mb-2 block">Good with:</span>
                    <div className="flex flex-wrap gap-1">
                      {breed.goodWith.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {breed.goodWith.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{breed.goodWith.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1" 
                      onClick={() => openBreedDetails(breed)}
                    >
                      Learn More
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openGallery(breed)}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Breed Details Modal */}
        <Dialog open={selectedBreed !== null && !showGallery} onOpenChange={() => setSelectedBreed(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedBreed && (
              <div>
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{selectedBreed.name}</span>
                      <Badge variant="secondary">{selectedBreed.category}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(selectedBreed.id)}
                      >
                        {favorites.includes(selectedBreed.id) ? (
                          <BookmarkCheck className="h-4 w-4 text-accent" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-accent fill-current" />
                      <span className="ml-1 font-medium">{selectedBreed.rating}</span>
                      <span className="text-muted-foreground ml-1">({selectedBreed.reviewCount} reviews)</span>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  {/* Image Gallery Preview */}
                  <div className="space-y-4">
                    <img
                      src={selectedBreed.image}
                      alt={selectedBreed.name}
                      className="w-full h-64 object-cover rounded-lg cursor-pointer"
                      onClick={() => setShowGallery(true)}
                    />
                    <div className="grid grid-cols-3 gap-2">
                      {selectedBreed.images.slice(1, 4).map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${selectedBreed.name} ${idx + 2}`}
                          className="w-full h-20 object-cover rounded cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                          onClick={() => setShowGallery(true)}
                        />
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowGallery(true)}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      View All {selectedBreed.images.length} Photos
                    </Button>
                  </div>

                  {/* Breed Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground">{selectedBreed.description}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Key Characteristics</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Origin:</span>
                            <span className="font-medium">{selectedBreed.origin}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Size:</span>
                            <span className="font-medium">{selectedBreed.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Weight:</span>
                            <span className="font-medium">{selectedBreed.weight}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Lifespan:</span>
                            <span className="font-medium">{selectedBreed.lifespan}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Coat:</span>
                            <span className="font-medium">{selectedBreed.coat}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Energy:</span>
                            <div className={`flex items-center ${getEnergyColor(selectedBreed.energy)}`}>
                              {getEnergyIcon(selectedBreed.energy)}
                              <span className="ml-1 font-medium">{selectedBreed.energy}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Good With</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedBreed.goodWith.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Recent Reviews</h3>
                      <div className="space-y-3">
                        {selectedBreed.reviews.map((review, idx) => (
                          <div key={idx} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={review.avatar} />
                              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm">{review.name}</span>
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < review.rating 
                                          ? 'text-accent fill-current' 
                                          : 'text-muted-foreground'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">{review.comment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Photo Gallery Modal */}
        <Dialog open={showGallery} onOpenChange={() => setShowGallery(false)}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            {selectedBreed && (
              <div>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    {selectedBreed.name} Photo Gallery
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 max-h-[60vh] overflow-y-auto">
                  {selectedBreed.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`${selectedBreed.name} ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Load More & Stats */}
        <div className="text-center mt-12 fade-in-up stagger-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Button variant="outline" size="lg">
              <Filter className="mr-2 h-4 w-4" />
              Load More Breeds
            </Button>
            <Button variant="outline" size="lg">
              Take Breed Quiz
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Can't find what you're looking for? Try our interactive breed finder quiz to discover your perfect match!
          </p>
        </div>
      </div>
    </section>
  );
};

export default BreedEncyclopedia;