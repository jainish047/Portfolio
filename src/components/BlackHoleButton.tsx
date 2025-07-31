// components/BlackHoleButton.tsx
"use client";

import React, {
  useRef,
  useMemo,
  useEffect,
  useState,
  // useCallback,
} from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { RadiationCanvas } from "@/components/RadiationCanvas";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { cn } from "@/utils/cn"; // Adjust path as needed

interface BlackHoleSectionProps {
  onClick: () => void;
  active: boolean;
}

// interface Particle {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
//   alpha: number;
// }

interface BlackHoleProps {
  // onClick: () => void;
  radiating: boolean;
}

const BlackHole: React.FC<BlackHoleProps> = ({ radiating }) => {
  const texture = useLoader(THREE.TextureLoader, "/accretion-disk8.png");
  // set the pivot for rotation to the center of the UV space
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.center.set(0.5, 0.5);

  useFrame((_, delta) => {
    if (texture) {
      // rotate the texture clockwise at 0.5 radians/sec
      texture.rotation += delta * 0.5;
    }
  });

  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      // meshRef.current.rotation.z -= delta * 0.9; // adjust rotation speed
      if (meshRef.current) {
        // For a *flat* disk spin (like a record), rotate around Z:
        // meshRef.current.rotation.z -= deltconst width = 5.25;
        // const height = 7.5;a * 0.5;
        // If instead you want it to *orbit* like a wheel
        // (so you see the rim spinning), comment the Z-line above
        // and uncomment this:
        // meshRef.current.rotation.y += delta * 0.5;
      }
    }
  });

  const geometry = useMemo(() => {
    const width = 4.5;
    // const height = 4;
    const height = width; // height of the black hole
    const R = height / 2;
    const d = 8; // 1/curvature factor
    const s = 2; // slope factor

    const angle = Math.asin(1 / s);
    // const xOffset = R / (s * d); // used to separate curved vs folded
    const xOffset = (s * R) / d; // x offset for the curve
    const r = (R * Math.tan(Math.PI / 4 + angle / 2)) / d; // radius for curve
    console.log(
      "R:",
      R,
      "d:",
      d,
      "s:",
      s,
      "angle:",
      angle,
      (angle / Math.PI) * 180,
      "xOffset:",
      xOffset,
      "r:",
      r
    );
    console.log("width:", width, "height:", height);
    const geo = new THREE.PlaneGeometry(width, height, 32, 32);
    const pos = geo.attributes.position;

    const yCompression = 1;
    const xexpansion = 1.3;

    // Smoothstep function for x-expansion
    const blendFactor = (y: number) => {
      const edge0 = R / d;
      const edge1 = -xOffset;
      const t = Math.max(0, Math.min(1, (edge0 - y) / (edge0 - edge1)));
      return 1 + (xexpansion - 1) * (t * t * (3 - 2 * t)); // classic smoothstep
    };

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);

      if (y > R / d) {
        // Top part — optionally compress Y
        pos.setY(i, y / yCompression);
      } else if (y >= -xOffset && y <= R / d) {
        // y coordinate for which to find newY
        const B = Math.atan(R / (d * r)); // angle for the curve
        const arcDepth = ((R / d - y) * 2 * B * r) / ((R * (s + 1)) / d);
        // delivation/depression of the arcDepth
        const depAngle = arcDepth / r; // angle for the arc depth
        // new Y coordinate
        // const newY = R/d - (R/d  + r*Math.sin(depAngle));
        const newY = R / d - r * Math.sin(depAngle);
        const newZ = r - r * Math.cos(depAngle); // move into +Z

        // Curved region
        // const newY = y / yCompression;
        // const newZ = -Math.sqrt(r * r - (y - R / d) ** 2) + r;

        const stretch = blendFactor(y);
        const newX = pos.getX(i) * stretch;

        pos.setX(i, newX);
        pos.setY(i, newY);
        pos.setZ(i, newZ);
        console.log("y:", y, "newZ:", newZ);
      } else if (y < -xOffset) {
        // Folded region
        const newY = y / s;
        const newZ = -newY * Math.sqrt(s * s - 1);
        // const newZ = -y * Math.sqrt(s * s - 1);

        const stretch = blendFactor(y);
        const newX = pos.getX(i) * stretch;

        pos.setX(i, newX);
        pos.setY(i, newY);
        pos.setZ(i, newZ);
        console.log("y:", y, "newZ:", newZ);
      }
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  const texture2 = useLoader(THREE.TextureLoader, "/accretion-disk4.png");
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  // texture2.wrapS = texture2.wrapT = THREE.ClampToEdgeWrapping;

  // Set center of rotation to center of texture
  useEffect(() => {
    texture2.center.set(0.5, 0.5); // very important
    texture2.rotation = 0;
    // ✅ Prevent repetition
    texture2.wrapS = THREE.ClampToEdgeWrapping;
    texture2.wrapT = THREE.ClampToEdgeWrapping;

    texture2.needsUpdate = true;
  }, [texture2]);

  // Rotate texture on each frame
  useFrame(() => {
    texture2.rotation += radiating ? 0.005 : 0.01; // adjust speed here
  });

  // Create geometry for bottom half of plane
  const geometry2 = new THREE.PlaneGeometry(4.5, 4.5, 2, 2);
  const pos = geometry2.attributes.position;
  const midY = 0;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y > midY) {
      pos.setY(i, midY); // Flatten top half to y=0
    }
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();

  // change size of bh with window size
  const [scale, setScale] = useState(1);
  // useEffect(() => {
  //   const handleResize = () => {
  //     const width = window.innerWidth;
  //     if (width < 640) setScale(0.6); // Mobile
  //     else if (width < 768) setScale(0.65);
  //     else if (width < 1024) setScale(0.8); // Tablet
  //     else setScale(1); // Desktop
  //   };

  //   handleResize(); // Initial call
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <group scale={scale} raycast={() => null}>
      {/* Event Horizon */}
      <mesh>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial color="black" />
      </mesh>

      <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 9, 0, 0]}>
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh geometry={geometry2} rotation={[Math.PI / 9, 0, 0]}>
        <meshBasicMaterial
          ref={materialRef}
          map={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

const BlackHoleSection: React.FC<BlackHoleSectionProps> = ({
  active,
  onClick,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [origins, setOrigins] = useState<{ x: number; y: number }[]>([]);

  const emitterOffset = -20; // Distance from the center of the black hole to the emitters

  const updateOrigins = () => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setOrigins([
        { x: cx, y: cy - emitterOffset },
        { x: cx, y: cy + emitterOffset },
      ]);
    }
  };

  useEffect(() => {
    updateOrigins();
    window.addEventListener("resize", updateOrigins);
    return () => window.removeEventListener("resize", updateOrigins);
  }, [emitterOffset]);

  return (
    <>
      {/* <div className="border border-amber-400"> */}
      <RadiationCanvas active={active} origins={origins} />
      <div
        ref={wrapperRef}
        // className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
      >
        <button
          className={cn(
            "group relative aspect-square w-24 sm:w-28 md:w-32 rounded-full",
            "flex items-center justify-center overflow-hidden",
            "hover:ring-2 hover:ring-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
            "transition-all duration-300 ease-in-out shadow-lg hover:cursor-pointer"
          )}
          onClick={onClick}
          aria-label="Open Project Modal"
        >
          <Canvas
            camera={{ position: [0, 0, 3] }}
            style={{
              pointerEvents: active ? "auto" : "none",
              zIndex: 0,
              height: "100%",
              width: "100%",
            }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} />
            <BlackHole radiating={active} />
            <OrbitControls enablePan={false} enableZoom={false} />
          </Canvas>

          {/* Optional hover or label text */}
          <span className="absolute bottom-1 text-white text-xs opacity-100 group-hover:opacity-100 transition">
            Menu
          </span>
        </button>
      </div>
      {/* </div> */}
    </>
  );
};

export default BlackHoleSection;
