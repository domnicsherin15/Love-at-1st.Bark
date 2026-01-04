import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface CubeProps {
  position: [number, number, number];
  baseHue: number;
  isHovered: boolean;
  index: number;
}

const Cube = ({ position, baseHue, isHovered, index }: CubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hue, setHue] = useState(baseHue);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Rotate cubes
    meshRef.current.rotation.x += isHovered ? 0.02 : 0.005;
    meshRef.current.rotation.y += isHovered ? 0.03 : 0.005;
    
    // Color transition on hover
    if (isHovered) {
      const newHue = (baseHue + state.clock.elapsedTime * 50 + index * 30) % 360;
      setHue(newHue);
    }
  });

  const color = new THREE.Color(`hsl(${hue}, 70%, 60%)`);

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.3} 
        roughness={0.4}
        emissive={color}
        emissiveIntensity={isHovered ? 0.3 : 0.1}
      />
    </mesh>
  );
};

const CubeStack = ({ isHovered }: { isHovered: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += isHovered ? 0.015 : 0.003;
  });

  const cubePositions: [number, number, number][] = [
    // Bottom layer
    [-0.5, -1, -0.5],
    [0.5, -1, -0.5],
    [-0.5, -1, 0.5],
    [0.5, -1, 0.5],
    // Middle layer
    [0, 0, 0],
    [-0.5, 0, -0.5],
    [0.5, 0, 0.5],
    // Top layer
    [0, 1, 0],
  ];

  return (
    <group ref={groupRef}>
      {cubePositions.map((pos, index) => (
        <Cube
          key={index}
          position={pos}
          baseHue={(index * 45) % 360}
          isHovered={isHovered}
          index={index}
        />
      ))}
    </group>
  );
};

const ColorfulCubes3D = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Interactive 3D Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hover over the cubes to see them come alive with colorful animations
          </p>
        </div>
        
        <div 
          className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background border border-primary/20 shadow-elegant cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(var(--primary),0.2)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff6b6b" />
            <pointLight position={[5, -5, 5]} intensity={0.5} color="#4ecdc4" />
            <CubeStack isHovered={isHovered} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default ColorfulCubes3D;
