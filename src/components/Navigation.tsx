import { useState, useEffect } from "react";
import { Menu, X, Heart, Compass, Dog, Sparkles, Activity, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Discover", href: "/", icon: Compass },
    { name: "Breeds", href: "/breeds", icon: Dog },
    { name: "Care", href: "/care", icon: Sparkles },
    { name: "Health", href: "/health", icon: Activity },
    { name: "Join", href: "/auth", icon: Users }
  ];

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
    },
    visible: { 
      opacity: 1, 
      height: "auto",
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 }
    }),
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-medium" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <span className="font-bold text-lg sm:text-xl gradient-text">PawPerfect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center gap-1.5 transition-all duration-300 font-medium hover:scale-105 hover:-translate-y-0.5 ${
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  <item.icon className={`h-4 w-4 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 ${
                    isActive ? "text-primary" : ""
                  }`} />
                  <span className="text-sm xl:text-base">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="glow" size="sm" onClick={() => navigate('/auth')}>
              <span className="relative z-10">Join Community</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-primary/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden glass rounded-xl mt-2 p-4 mb-2 overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex flex-col space-y-1">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      custom={index}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        to={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? "bg-primary/10 text-primary" 
                            : "text-foreground hover:bg-primary/5 hover:text-primary"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className={`h-5 w-5 transition-transform duration-300 ${
                          isActive ? "scale-110" : ""
                        }`} />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  custom={navItems.length}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="pt-2"
                >
                  <Button 
                    variant="glow" 
                    className="w-full" 
                    onClick={() => { navigate('/auth'); setIsOpen(false); }}
                  >
                    <span className="relative z-10">Join Community</span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;