import { useState, useEffect, useCallback } from "react";

interface PawPrint {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

const CursorPawTrail = () => {
  const [pawPrints, setPawPrints] = useState<PawPrint[]>([]);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const createPaw = useCallback((x: number, y: number) => {
    const distance = Math.sqrt(
      Math.pow(x - lastPosition.x, 2) + Math.pow(y - lastPosition.y, 2)
    );

    // Only create paw if moved enough distance
    if (distance > 60) {
      const angle = Math.atan2(y - lastPosition.y, x - lastPosition.x);
      const rotation = (angle * 180) / Math.PI + 90;

      const newPaw: PawPrint = {
        id: Date.now() + Math.random(),
        x,
        y,
        rotation,
      };

      setPawPrints((prev) => [...prev.slice(-8), newPaw]);
      setLastPosition({ x, y });
    }
  }, [lastPosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      createPaw(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [createPaw]);

  // Remove old paw prints
  useEffect(() => {
    const interval = setInterval(() => {
      setPawPrints((prev) => prev.slice(1));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {pawPrints.map((paw, index) => (
        <div
          key={paw.id}
          className="absolute transition-opacity duration-500"
          style={{
            left: paw.x - 12,
            top: paw.y - 12,
            transform: `rotate(${paw.rotation}deg)`,
            opacity: (index + 1) / pawPrints.length * 0.6,
          }}
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 100 100"
            className="text-primary drop-shadow-sm"
          >
            {/* Main pad */}
            <ellipse cx="50" cy="65" rx="18" ry="22" fill="currentColor" />
            {/* Toe pads */}
            <circle cx="32" cy="38" r="9" fill="currentColor" />
            <circle cx="50" cy="32" r="9" fill="currentColor" />
            <circle cx="68" cy="38" r="9" fill="currentColor" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default CursorPawTrail;
