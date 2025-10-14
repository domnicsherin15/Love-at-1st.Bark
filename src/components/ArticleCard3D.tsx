import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ArticleCard3DProps {
  children?: React.ReactNode;
  className?: string;
  featured?: boolean;
}

function ArticleCard3DModel({ isHovered, featured }: { isHovered: boolean; featured?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation with mouse movement
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

      // Continuous subtle rotation when not hovered
      if (!isHovered) {
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      }
    }
  });

  const handlePointerMove = (e: any) => {
    if (!isHovered) return;
    const x = (e.point.x / 3) * 0.4;
    const y = (e.point.y / 3) * 0.4;
    setRotation({ x: -y, y: x });
  };

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        {/* Main card body */}
        <RoundedBox
          ref={meshRef}
          args={[4.5, 5, 0.4]}
          radius={0.2}
          smoothness={4}
          onPointerMove={handlePointerMove}
          onPointerOut={() => setRotation({ x: 0, y: 0 })}
        >
          {featured ? (
            <MeshDistortMaterial
              color="#ffffff"
              roughness={0.1}
              metalness={0.2}
              distort={isHovered ? 0.3 : 0.1}
              speed={2}
            />
          ) : (
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.15}
              metalness={0.1}
            />
          )}
        </RoundedBox>

        {/* Featured glow ring */}
        {featured && (
          <mesh position={[0, 0, -0.25]}>
            <torusGeometry args={[2.8, 0.05, 16, 100]} />
            <meshBasicMaterial color="#ec4899" transparent opacity={isHovered ? 0.8 : 0.4} />
          </mesh>
        )}
      </group>

      {/* Dynamic lighting based on hover */}
      {isHovered && (
        <>
          <pointLight position={[2, 2, 2]} intensity={1.5} color="#339af0" distance={8} />
          <pointLight position={[-2, -2, 2]} intensity={1} color="#ec4899" distance={6} />
        </>
      )}
    </Float>
  );
}

export default function ArticleCard3D({ children, className, featured }: ArticleCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 rounded-lg overflow-hidden" style={{ 
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <directionalLight position={[-10, -10, -5]} intensity={0.4} />
          <spotLight position={[0, 5, 5]} intensity={0.5} angle={0.6} penumbra={1} />
          <ArticleCard3DModel isHovered={isHovered} featured={featured} />
        </Canvas>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full" style={{
        transform: isHovered ? 'translateZ(30px) scale(1.03)' : 'translateZ(0) scale(1)',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>
        {children}
      </div>
    </div>
  );
}
