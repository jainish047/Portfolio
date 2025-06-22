"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Loading() {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center relative z-50">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <WarpJumpEffect />
        <Stars radius={100} depth={50} count={1500} factor={4} fade />
      </Canvas>
      <div className="absolute bottom-20 text-white text-lg md:text-2xl tracking-widest animate-pulse z-50">
        Warping to the Galactic Nexus...
      </div>
    </div>
  );
}

function WarpJumpEffect() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(({ camera }, delta) => {
    camera.position.z -= delta * 15; // Simulate forward motion
  });

  return null;
}
