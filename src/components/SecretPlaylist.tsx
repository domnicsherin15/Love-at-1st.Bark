import { useState } from "react";
import { Lock, Music, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const SecretPlaylist = () => {
  const [isOpen, setIsOpen] = useState(false);

  const songs = [
    { title: "Perfect", artist: "Ed Sheeran", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g" },
    { title: "Thinking Out Loud", artist: "Ed Sheeran", url: "https://www.youtube.com/watch?v=lp-EO5I60KA" },
    { title: "A Thousand Years", artist: "Christina Perri", url: "https://www.youtube.com/watch?v=rtOvBOTyX00" },
    { title: "All of Me", artist: "John Legend", url: "https://www.youtube.com/watch?v=450p7goxZqg" },
    { title: "Make You Feel My Love", artist: "Adele", url: "https://www.youtube.com/watch?v=0put0_a--Ng" },
  ];

  return (
    <>
      {/* Lock Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 p-3 glass rounded-full hover:bg-primary/20 transition-all hover:scale-110 group"
        aria-label="Open secret playlist"
      >
        <Lock className="w-5 h-5 text-primary group-hover:animate-pulse" />
      </button>

      {/* Playlist Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-primary/20 rounded-2xl p-8 max-w-md w-full shadow-elegant animate-scale-in relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-primary/10 rounded-full transition-all"
              aria-label="Close playlist"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Music className="w-8 h-8 text-primary animate-pulse" />
              <div>
                <h3 className="text-2xl font-bold gradient-text">Songs for You</h3>
                <p className="text-sm text-muted-foreground">A playlist I made just for you</p>
              </div>
            </div>

            {/* Playlist */}
            <div className="space-y-3 mb-6">
              {songs.map((song, index) => (
                <a
                  key={index}
                  href={song.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 glass rounded-lg hover:bg-primary/5 transition-all group"
                >
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {song.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>

            {/* Footer Message */}
            <div className="text-center pt-4 border-t border-primary/10">
              <p className="text-sm text-muted-foreground italic">
                "Every song reminds me of you"
              </p>
              <p className="text-xs text-primary mt-1">— Sherinzz</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecretPlaylist;
