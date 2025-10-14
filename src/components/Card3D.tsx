import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Card3DProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function Card3DModel({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation animation
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        isHovered ? rotation.x : 0,
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        isHovered ? rotation.y : 0,
        0.1
      );
      
      // Subtle floating animation
      if (!isHovered) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      }
    }
  });

  const handlePointerMove = (e: any) => {
    if (!isHovered) return;
    const x = (e.point.x / 2) * 0.3;
    const y = (e.point.y / 2) * 0.3;
    setRotation({ x: -y, y: x });
  };

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <RoundedBox
        ref={meshRef}
        args={[4, 3, 0.3]}
        radius={0.15}
        smoothness={4}
        onPointerMove={handlePointerMove}
        onPointerOut={() => setRotation({ x: 0, y: 0 })}
      >
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.2}
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </RoundedBox>
      
      {/* Glow effect on hover */}
      {isHovered && (
        <pointLight position={[0, 0, 1]} intensity={2} color="#339af0" distance={5} />
      )}
    </Float>
  );
}

export default function Card3D({ children, className, onClick }: Card3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          <Card3DModel isHovered={isHovered} />
        </Canvas>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full transition-transform duration-300" style={{
        transform: isHovered ? 'translateZ(20px) scale(1.02)' : 'translateZ(0) scale(1)',
        transformStyle: 'preserve-3d'
      }}>
        {children}
      </div>
    </div>
  );
}
