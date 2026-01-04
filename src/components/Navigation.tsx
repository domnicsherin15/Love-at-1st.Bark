import { useState, useEffect } from "react";
import { Menu, X, Heart, Compass, Dog, Sparkles, Activity, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Discover", href: "/", icon: Compass },
    { name: "Breeds", href: "/breeds", icon: Dog },
    { name: "Care", href: "/care", icon: Sparkles },
    { name: "Health", href: "/health", icon: Activity },
    { name: "Join Community", href: "/auth", icon: Users }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-medium" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl gradient-text">PawPerfect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center gap-1.5 text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-110 hover:-translate-y-1"
              >
                <item.icon className="h-4 w-4 transition-all duration-300 group-hover:rotate-12 group-hover:scale-125" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button variant="glow" onClick={() => navigate('/auth')}>
              <span className="relative z-10">Join Community</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden glass rounded-lg mt-2 p-4 animate-scale-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group flex items-center gap-2 text-foreground hover:text-primary transition-all duration-300 font-medium hover:translate-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-4 w-4 transition-all duration-300 group-hover:rotate-12 group-hover:scale-125" />
                  {item.name}
                </Link>
                ))}
              <div className="flex items-center gap-3 mt-4">
                <ThemeToggle />
                <Button variant="glow" className="flex-1" onClick={() => { navigate('/auth'); setIsOpen(false); }}>
                  <span className="relative z-10">Join Community</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;