import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'paw' | 'bone';
  opacity: number;
}

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate random particles
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const particleCount = 20;

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 20, // 20-50px
          duration: Math.random() * 10 + 15, // 15-25s
          delay: Math.random() * 5,
          type: Math.random() > 0.5 ? 'paw' : 'bone',
          opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4
        });
      }

      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  useEffect(() => {
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate particle offset based on mouse proximity
  const getParticleOffset = (particle: Particle) => {
    const dx = particle.x - mousePosition.x;
    const dy = particle.y - mousePosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const threshold = 15; // Distance threshold in percentage
    
    if (distance < threshold) {
      const force = (threshold - distance) / threshold;
      const offsetX = (dx / distance) * force * 50; // Push away
      const offsetY = (dy / distance) * force * 50;
      return { x: offsetX, y: offsetY };
    }
    
    return { x: 0, y: 0 };
  };

  const PawPrint = ({ size, opacity }: { size: number; opacity: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ opacity }}
      className="text-primary"
    >
      {/* Main pad */}
      <ellipse cx="12" cy="16" rx="4" ry="5" />
      {/* Toe pads */}
      <ellipse cx="8" cy="10" rx="2" ry="3" />
      <ellipse cx="12" cy="8" rx="2" ry="3" />
      <ellipse cx="16" cy="10" rx="2" ry="3" />
      <ellipse cx="6" cy="14" rx="2" ry="2.5" />
    </svg>
  );

  const BoneShape = ({ size, opacity }: { size: number; opacity: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ opacity }}
      className="text-accent"
    >
      {/* Bone shape */}
      <path d="M18 7c-1.1 0-2 .9-2 2 0 .4.1.7.3 1L13 13.3c-.3-.2-.6-.3-1-.3s-.7.1-1 .3L7.7 10c.2-.3.3-.6.3-1 0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2c.4 0 .7-.1 1-.3L10.3 14c-.2.3-.3.6-.3 1s.1.7.3 1L7 19.3c-.3-.2-.6-.3-1-.3-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2c0-.4-.1-.7-.3-1L11 16.7c.3.2.6.3 1 .3s.7-.1 1-.3L16.3 20c-.2.3-.3.6-.3 1 0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2c-.4 0-.7.1-1 .3L13.7 16c.2-.3.3-.6.3-1s-.1-.7-.3-1L17 10.7c.3.2.6.3 1 .3 1.1 0 2-.9 2-2s-.9-2-2-2z" />
    </svg>
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {particles.map((particle) => {
        const offset = getParticleOffset(particle);
        return (
          <div
            key={particle.id}
            className="absolute animate-float-particle transition-transform duration-300 ease-out"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              transform: `translate(${offset.x}px, ${offset.y}px)`,
            }}
          >
            {particle.type === 'paw' ? (
              <PawPrint size={particle.size} opacity={particle.opacity} />
            ) : (
              <BoneShape size={particle.size} opacity={particle.opacity} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ParticleBackground;
