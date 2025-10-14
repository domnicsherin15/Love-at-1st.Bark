import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface FeaturedArticleCard3DProps {
  children?: React.ReactNode;
  className?: string;
}

function FeaturedCard3DModel({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const sphere1Ref = useRef<THREE.Mesh>(null);
  const sphere2Ref = useRef<THREE.Mesh>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth 3D rotation with mouse movement
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        isHovered ? rotation.x : 0,
        0.08
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        isHovered ? rotation.y : 0,
        0.08
      );

      // Scale effect on hover
      const targetScale = isHovered ? 1.1 : 1;
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1);
    }

    // Floating decorative spheres
    if (sphere1Ref.current) {
      sphere1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      sphere1Ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.5;
    }
    if (sphere2Ref.current) {
      sphere2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.4) * 0.5;
      sphere2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.5;
    }
  });

  const handlePointerMove = (e: any) => {
    if (!isHovered) return;
    const x = (e.point.x / 3) * 0.5;
    const y = (e.point.y / 3) * 0.5;
    setRotation({ x: -y, y: x });
  };

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Main card with distortion effect */}
        <RoundedBox
          ref={meshRef}
          args={[4.5, 5.5, 0.5]}
          radius={0.25}
          smoothness={4}
          onPointerMove={handlePointerMove}
          onPointerOut={() => setRotation({ x: 0, y: 0 })}
        >
          <MeshDistortMaterial
            color="#ffffff"
            roughness={0.05}
            metalness={0.3}
            distort={isHovered ? 0.4 : 0.15}
            speed={2}
          />
        </RoundedBox>

        {/* Decorative floating spheres */}
        <Sphere ref={sphere1Ref} args={[0.2, 32, 32]} position={[-2, 2, 0.5]}>
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} />
        </Sphere>
        <Sphere ref={sphere2Ref} args={[0.15, 32, 32]} position={[2, -2, 0.5]}>
          <meshStandardMaterial color="#339af0" emissive="#339af0" emissiveIntensity={0.5} />
        </Sphere>

        {/* Glowing border ring */}
        <mesh position={[0, 0, -0.3]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[3, 0.08, 16, 100]} />
          <meshBasicMaterial 
            color="#ec4899" 
            transparent 
            opacity={isHovered ? 0.9 : 0.5}
          />
        </mesh>
      </group>

      {/* Dynamic lighting */}
      {isHovered && (
        <>
          <pointLight position={[3, 3, 3]} intensity={2} color="#ec4899" distance={10} />
          <pointLight position={[-3, -3, 3]} intensity={2} color="#339af0" distance={10} />
          <spotLight 
            position={[0, 5, 5]} 
            intensity={1.5} 
            angle={0.5} 
            penumbra={1} 
            color="#ffffff"
          />
        </>
      )}
    </Float>
  );
}

export default function FeaturedArticleCard3D({ children, className }: FeaturedArticleCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 rounded-xl overflow-hidden" style={{ 
        transform: isHovered ? 'scale(1.08) translateY(-10px)' : 'scale(1)',
        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <FeaturedCard3DModel isHovered={isHovered} />
        </Canvas>
      </div>
      
      {/* Content Overlay with 3D perspective */}
      <div className="relative z-10 h-full" style={{
        transform: isHovered ? 'translateZ(40px) scale(1.05)' : 'translateZ(0) scale(1)',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        perspective: '1000px'
      }}>
        {children}
      </div>
    </div>
  );
}
