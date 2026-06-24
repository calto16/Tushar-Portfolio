"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Float, Grid } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/** Slowly rotating brutalist monolith with glowing neon edges. */
function Monolith() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.15;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={[0, 0.2, 0]}>
        <boxGeometry args={[1.1, 2.6, 1.1]} />
        <meshStandardMaterial
          color="#0c0c0e"
          metalness={0.4}
          roughness={0.6}
        />
        <Edges threshold={15} color="#39ff14" />
      </mesh>
    </Float>
  );
}

/** Wireframe icosahedron core that counter-rotates. */
function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.x -= dt * 0.2;
      ref.current.rotation.y -= dt * 0.25;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0.2, 0]} scale={2.1}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.18} />
    </mesh>
  );
}

/** Drifting particle field. */
function Particles({ count = 550 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 28;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 28;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#9a978d"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

/** Camera parallax that follows the pointer. */
function Rig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0.4, 0), []);
  useFrame(() => {
    camera.position.x += (pointer.x * 2.2 - camera.position.x) * 0.04;
    camera.position.y += (0.8 + pointer.y * 1.2 - camera.position.y) * 0.04;
    camera.lookAt(target);
  });
  return null;
}

export function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.8, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#0a0a0b"]} />
      <fog attach="fog" args={["#0a0a0b", 8, 20]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 6, 4]} intensity={40} color="#39ff14" />
      <pointLight position={[-6, -2, -4]} intensity={30} color="#ff2bd6" />

      <Monolith />
      <Core />
      <Particles />

      <Grid
        position={[0, -2.4, 0]}
        args={[40, 40]}
        cellSize={0.8}
        cellThickness={0.6}
        cellColor="#1f1f24"
        sectionSize={4}
        sectionThickness={1}
        sectionColor="#2a2a31"
        fadeDistance={26}
        fadeStrength={1.5}
        infiniteGrid
      />

      <Rig />

      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
