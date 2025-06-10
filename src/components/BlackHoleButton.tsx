// components/BlackHoleButton.tsx
"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Orbit, MessageSquareText, Code, User } from "lucide-react";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function BlackHoleSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-1 right-1 md:top-4 md:right-4 w-20 h-20 z-50 pointer-events-none cursor-pointer">
      <button
        className="w-full h-full  rounded-full flex items-center justify-center flex-col"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <BlackHole />
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
        <div className="text-white text-xs">Menu</div>
      </button>
      {/* Hawking radiation beam + menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-2 w-1 bg-gradient-to-b from-white/80 via-blue-500 to-purple-600 rounded-full"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={beamVariants}
              className="space-y-4 py-4 flex flex-col items-center"
            >
              <MenuItem icon={<User />} label="About" />
              <MenuItem icon={<Code />} label="Projects" />
              <MenuItem icon={<MessageSquareText />} label="Contact" />
              <MenuItem icon={<Orbit />} label="Blog" />
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.li
      className="flex flex-col items-center text-white cursor-pointer hover:scale-110 transition-transform"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shadow-md">
        {icon}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </motion.li>
  );
}

const beamVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// const vertexShader = `
//   varying vec2 vUv;

//   void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// const fragmentShader = `
//   uniform sampler2D uTexture;
//   varying vec2 vUv;

//   void main() {
//     if (vUv.y > 0.5) discard; // hide top half
//     vec4 texColor = texture2D(uTexture, vUv);
//     if (texColor.a < 0.1) discard;
//     gl_FragColor = texColor;
//   }
// `;

function BlackHole() {
  // const disk = useRef<THREE.Mesh>(null!);
  // const [clicked, setClicked] = useState(false);

  // useFrame(() => {
  //   if (disk.current) {
  //     // Rotate around tilted local axis
  //     disk.current.rotation.y += 0.0;
  //   }
  // });

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
    texture2.rotation += 0.005; // adjust speed here
  });

  // const shaderMaterial = useMemo(
  //   () =>
  //     new THREE.ShaderMaterial({
  //       vertexShader,
  //       fragmentShader,
  //       uniforms: {
  //         uTexture: { value: texture2 },
  //       },
  //       transparent: true,
  //       side: THREE.DoubleSide,
  //     }),
  //   [texture2]
  // );

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

  return (
    <group raycast={() => null}>
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

      {/* Accretion Disk */}
      {/* <group rotation={[0, 0, 0]}> */}
      {/* <group rotation={[Math.PI / 10, 0, 0]}>
        <mesh
          ref={disk}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1, 1, 0.1]}
          onClick={() => setClicked(!clicked)}
        >
          <torusGeometry args={[0.65, 0.2, 32, 100]} />
          <meshStandardMaterial
            color="orange"
            emissive="red"
            emissiveIntensity={1.5}
            metalness={1}
            roughness={0.2}
          />
        </mesh>
      </group> */}
      {/* </group> */}

      {/* <mesh ref={meshRef} rotation={[0, 0, 0]}>
        <planeGeometry args={[3, 3, 64, 64]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh> */}

      {/* <mesh ref={meshRef}>
        <primitive object={geometry} attach="geometry" />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh> */}

      {/* <mesh
        ref={disk}
        rotation={[0, 0, 0]} // facing front directly, change if needed
        scale={[1, 1, 0.1]} // make disk flatter
        onClick={() => setClicked(!clicked)}
      >
        <torusGeometry args={[0.56, 0.1, 32, 100]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh> */}

      {/* <mesh
        ref={disk}
        rotation={[0, 0, 0]}
        scale={[1, 1, 0.1]}
        onClick={() => setClicked(!clicked)}
      >
        <torusGeometry args={[0.56, 0.1, 32, 100]} />
        <meshStandardMaterial
          color="orange"
          emissive="red"
          emissiveIntensity={1.5}
          metalness={1}
          roughness={0.2}
        />
      </mesh> */}
    </group>
  );
}
