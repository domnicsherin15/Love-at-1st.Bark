import { useState } from "react";
import { Heart, Download, Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import shihtzu from "@/assets/shih-tzu-hero-1.jpg";

const ECard = () => {
  const [copied, setCopied] = useState(false);

  const cardMessage = `To my favourite human,

For days when you need a fluffy smile — 
remember that you bring as much joy to my life
as these adorable Shih-Tzus bring to everyone's hearts.

Love always,
Sherinzz 💝`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cardMessage);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "Share this love note with someone special",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "A Special Message for You",
          text: cardMessage,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      handleCopy();
    }
  };

  const handleDownload = () => {
    // Create a canvas to generate an image
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 800, 1000);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(0.5, '#ec4899');
      gradient.addColorStop(1, '#3b82f6');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 1000);

      // Semi-transparent overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, 800, 1000);

      // Card background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.roundRect(40, 40, 720, 920, 20);
      ctx.fill();

      // Text
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('For You 💕', 400, 120);

      ctx.font = '24px Arial';
      ctx.fillStyle = '#64748b';
      const lines = cardMessage.split('\n');
      let y = 200;
      lines.forEach(line => {
        ctx.fillText(line, 400, y);
        y += 40;
      });

      // Download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'love-note-from-sherinzz.png';
          a.click();
          URL.revokeObjectURL(url);
        }
      });
    }

    toast({
      title: "Downloading...",
      description: "Your e-card is being saved!",
    });
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Share Some Love 💝
          </h2>
          <p className="text-lg text-muted-foreground">
            A special e-card just for you, from my heart to yours
          </p>
        </div>

        <Card className="overflow-hidden shadow-elegant border-2 border-primary/20">
          <div className="relative">
            {/* Image section */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={shihtzu}
                alt="Adorable Shih-Tzu"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              
              {/* Floating hearts */}
              <div className="absolute top-4 right-4 animate-pulse">
                <Heart className="h-12 w-12 text-accent fill-accent opacity-80" />
              </div>
            </div>

            {/* Content section */}
            <div className="p-8 md:p-12 space-y-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  To my favourite human 💕
                </h3>
                
                <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
                  <p className="text-base md:text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                    {cardMessage.split('\n\n').slice(1, -1).join('\n\n')}
                  </p>
                </div>

                <p className="text-xl font-semibold text-accent pt-4">
                  Love always,<br />
                  Sherinzz 💝
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 justify-center pt-6">
                <Button
                  onClick={handleShare}
                  variant="premium"
                  size="lg"
                  className="group"
                >
                  <Share2 className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Share Love
                </Button>
                
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="lg"
                  className="group"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Copy Text
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleDownload}
                  variant="glow"
                  size="lg"
                  className="group"
                >
                  <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Download Card
                </Button>
              </div>

              <p className="text-sm text-center text-muted-foreground italic pt-4">
                Made with ❤️ • Share this moment with someone special
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ECard;
