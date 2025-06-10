"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Star {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  mass: number;
  color: THREE.Color;
  shape: "sphere";
}

const STAR_COUNT = 1500;

// Generate stars with random initial positions, velocities, and colors
function generateStars(count: number): Star[] {
  const stars: Star[] = [];
  const colors = [
    new THREE.Color("#ffcc6f"), // Light Orange (e.g. Pollux)
    new THREE.Color("#ffd2a1"), // Pale Orange
    new THREE.Color("#fff4ea"), // Very Pale Yellow
    new THREE.Color("#f5f3ff"), // Soft White Blue (e.g. Vega)
    new THREE.Color("#ffffff"), // Pure White (e.g. Sirius)
    new THREE.Color("#d9eaff"), // Slight Blue Tint
    new THREE.Color("#aec8ff"), // Blue White (e.g. Rigel)
    new THREE.Color("#9bb0ff"), // Blue
    new THREE.Color("#aabfff"), // Blueish White
    new THREE.Color("#cfdfff"), // Soft Blue
    new THREE.Color("#ffd2a1"), // Yellow-Orange
    new THREE.Color("#f8e8c8"), // Warm White
    new THREE.Color("#ffddaa"), // Gold Tinge
    new THREE.Color("#ffe4c4"), // Bisque (cool yellow-orange)
    new THREE.Color("#ffcc99"), // Peachy Yellow
    new THREE.Color("#e0b0ff"), // Lavender (rare)
    new THREE.Color("#ffb07c"), // Soft Orange
    new THREE.Color("#ff6e6e"), // Light Red (very rare, M-class)
    new THREE.Color("#fff5f2"), // Almost White with a warm tint
    new THREE.Color("#f0f8ff"), // Very Pale Blue
    new THREE.Color("#ffe9dc"), // Pale Peach
    new THREE.Color("#fdf6e3"), // Warm Pale
  ];

  for (let i = 0; i < count; i++) {
    stars.push({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      mass: 1 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: "sphere",
    });
  }
  return stars;
}

function Starfield({ cursor3D }: { cursor3D: THREE.Vector3 | null }) {
  const pointsRef = useRef<THREE.Points>(null);
  const stars = useMemo(() => generateStars(STAR_COUNT), []);

  // Temporary vectors for calculations to avoid new allocations
  const distortedPos = new THREE.Vector3();
  const dirToCursor = new THREE.Vector3();

  // Parameters controlling lensing effect strength
  const LENSING_RADIUS = 20;
  const LENSING_STRENGTH = 10;

  useFrame(() => {
    if (!pointsRef.current) return;

    // Update star positions based on their velocities (simple drifting)
    for (const star of stars) {
      star.position.add(star.velocity);

      // Wrap stars around bounding box for continuous movement
      (["x", "y", "z"] as const).forEach((axis) => {
        if (star.position[axis] > 50) star.position[axis] = -50;
        else if (star.position[axis] < -50) star.position[axis] = 50;
      });
    }

    // Update buffer geometry positions with lensing effect applied
    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];

      if (cursor3D) {
        // Vector from star to cursor
        dirToCursor.subVectors(star.position, cursor3D);

        const dist = dirToCursor.length();

        if (dist < LENSING_RADIUS) {
          // Calculate lensing distortion: bend star position away from cursor,
          // proportional to how close star is (closer => more distortion)
          const effectStrength =
            ((LENSING_RADIUS - dist) / LENSING_RADIUS) * LENSING_STRENGTH;

          // Direction for distortion perpendicular to line of sight for subtle "bending"
          const perpendicular = new THREE.Vector3()
            .crossVectors(dirToCursor, new THREE.Vector3(0, 1, 0))
            .normalize();

          distortedPos
            .copy(star.position)
            .add(perpendicular.multiplyScalar(effectStrength));

          positions[i * 3] = distortedPos.x;
          positions[i * 3 + 1] = distortedPos.y;
          positions[i * 3 + 2] = distortedPos.z;
          continue;
        }
      }

      // No distortion if cursor null or star out of lensing radius
      positions[i * 3] = star.position.x;
      positions[i * 3 + 1] = star.position.y;
      positions[i * 3 + 2] = star.position.z;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Initial positions buffer
  const positions = useMemo(() => {
    const arr = new Float32Array(stars.length * 3);
    for (let i = 0; i < stars.length; i++) {
      arr[i * 3] = stars[i].position.x;
      arr[i * 3 + 1] = stars[i].position.y;
      arr[i * 3 + 2] = stars[i].position.z;
    }
    return arr;
  }, [stars]);

  // Colors buffer
  const colors = useMemo(() => {
    const arr = new Float32Array(stars.length * 3);
    for (let i = 0; i < stars.length; i++) {
      arr[i * 3] = stars[i].color.r;
      arr[i * 3 + 1] = stars[i].color.g;
      arr[i * 3 + 2] = stars[i].color.b;
    }
    return arr;
  }, [stars]);

  function createCircleTexture() {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);

    // Draw circle
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  const circleTexture = useMemo(() => createCircleTexture(), []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={stars.length}
          array={positions}
          itemSize={3}
          args={[positions, 3]} // positions is Float32Array, 3 = itemSize
        />
        <bufferAttribute
          attach="attributes-color"
          count={stars.length}
          array={colors}
          itemSize={3}
          args={[positions, 3]} // positions is Float32Array, 3 = itemSize
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.2}
        sizeAttenuation
        vertexColors
        transparent={false}
        alphaTest={0.5} // IMPORTANT: discard transparent pixels
        map={circleTexture} // assign your circle texture here
        opacity={0.85}
      />
    </points>
  );
}

function CursorTracker({
  setCursor3D,
}: {
  setCursor3D: React.Dispatch<React.SetStateAction<THREE.Vector3 | null>>;
}) {
  const { size, camera } = useThree();

  function getCursor3D(event: MouseEvent) {
    const x = (event.clientX / size.width) * 2 - 1;
    const y = -(event.clientY / size.height) * 2 + 1;

    const vector = new THREE.Vector3(x, y, 0.5);
    vector.unproject(camera);

    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    return pos;
  }

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      setCursor3D(getCursor3D(event));
    }
    function onMouseLeave() {
      setCursor3D(null);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [size, camera, setCursor3D]);

  return null;
}

export default function SpaceBackground() {
  const [cursor3D, setCursor3D] = useState<THREE.Vector3 | null>(null);

  return (
    <div
      style={{
        position: "fixed", // or 'absolute' based on need
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 5, // behind content
        pointerEvents: "none", // disable mouse interaction
        overflow: "hidden",
      }}
    >
      <Canvas
        className="fixed inset-0 -z-10 pointer-events-none h-screen w-screen"
        camera={{ position: [0, 0, 50], fov: 75 }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Starfield cursor3D={cursor3D} />
        <CursorTracker setCursor3D={setCursor3D} />
      </Canvas>
    </div>
  );
}
