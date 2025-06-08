// components/BlackHoleButton.tsx
"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function BlackHoleSection() {
  return (
    <div className="fixed top-4 right-4 w-60 h-60 z-50 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} />
        <BlackHole />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}

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

  const geometry =   useMemo(() => {
    const width = 3;
    // const height = 4;
    const height = width; // height of the black hole
    const R = height / 2;``
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
    const geo = new THREE.PlaneGeometry(width, height, 256, 256);
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
  const geometry2 = new THREE.PlaneGeometry(3, 3, 2, 2);
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
    <>
      {/* Event Horizon */}
      <mesh>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial color="black" />
      </mesh>

      <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI/9, 0, 0]}>
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh geometry={geometry2} rotation={[Math.PI/9, 0, 0]}>
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
    </>
  );
}
