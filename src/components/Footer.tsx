import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Discover": [
      { name: "All Breeds", href: "#breeds" },
      { name: "Popular Breeds", href: "#popular" },
      { name: "Breed Finder", href: "#finder" },
      { name: "Size Guide", href: "#sizes" }
    ],
    "Care & Training": [
      { name: "Nutrition Guide", href: "#nutrition" },
      { name: "Training Tips", href: "#training" },
      { name: "Health & Wellness", href: "#health" },
      { name: "Grooming Guide", href: "#grooming" }
    ],
    "Adoption": [
      { name: "Find Shelters", href: "#shelters" },
      { name: "Adoption Process", href: "#process" },
      { name: "Success Stories", href: "#stories" },
      { name: "Resources", href: "#resources" }
    ],
    "Community": [
      { name: "Blog", href: "#blog" },
      { name: "Expert Advice", href: "#experts" },
      { name: "Forums", href: "#forums" },
      { name: "Events", href: "#events" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-primary-foreground/20">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Stay Updated with PawPerfect</h3>
            <p className="text-lg mb-8 text-primary-foreground/80">
              Get the latest dog care tips, breed spotlights, and adoption news delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground text-primary border-0"
              />
              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Heart className="h-8 w-8 text-accent" />
                <span className="font-bold text-2xl">PawPerfect</span>
              </div>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                Your comprehensive guide to the wonderful world of dogs. From breed selection to lifelong care, we're here to help you and your furry friend live your best lives together.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <span className="text-primary-foreground/80">hello@pawperfect.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <span className="text-primary-foreground/80">1-800-PAW-HELP</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span className="text-primary-foreground/80">Available Worldwide</span>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-lg mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-primary-foreground/80 mb-4 md:mb-0">
              © {currentYear} PawPerfect. All rights reserved. Made with ❤️ for dog lovers everywhere.
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-200 group"
                  >
                    <IconComponent className="h-5 w-5 text-primary-foreground/80 group-hover:text-primary" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;