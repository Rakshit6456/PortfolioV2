"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Sparkles } from "@react-three/drei";

function DistortedCore({ scrollProgress }) {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const p = scrollProgress.current;
    mesh.rotation.x += delta * 0.15;
    mesh.rotation.y += delta * 0.22;
    mesh.rotation.z = p * Math.PI * 0.6;
    mesh.position.y = -p * 1.6;
    const pulse = 1.6 + Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
    mesh.scale.setScalar(pulse - p * 0.3);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 12]} />
      <MeshDistortMaterial
        color="#7c5cff"
        emissive="#2a1c66"
        roughness={0.15}
        metalness={0.6}
        distort={0.45}
        speed={1.6}
      />
    </mesh>
  );
}

export function Scene({ scrollProgress }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 5]} intensity={40} color="#7c5cff" />
      <pointLight position={[-4, -2, -3]} intensity={25} color="#ff6b4a" />
      <DistortedCore scrollProgress={scrollProgress} />
      <Sparkles count={80} scale={6} size={2} speed={0.3} color="#c9b8ff" />
      <Environment preset="city" />
    </Canvas>
  );
}
