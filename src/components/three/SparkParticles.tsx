"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface LayerConfig {
  count: number;
  size: number;
  opacity: number;
  zRange: [number, number];
  speedRange: [number, number];
}

const LAYERS: LayerConfig[] = [
  { count: 60, size: 0.06, opacity: 0.8, zRange: [1, 3], speedRange: [0.003, 0.01] },
  { count: 80, size: 0.04, opacity: 0.6, zRange: [-1, 1], speedRange: [0.002, 0.008] },
  { count: 60, size: 0.025, opacity: 0.4, zRange: [-3, -1], speedRange: [0.001, 0.006] },
];

const COLOR_PALETTE = [
  new THREE.Color("#c47a2a"),
  new THREE.Color("#e8a849"),
  new THREE.Color("#f5c96b"),
  new THREE.Color("#8b3a2a"),
];

const BURST_DURATION = 90; // frames (~1.5s at 60fps)

function ParticleLayer({ config, burst }: { config: LayerConfig; burst?: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const burstActiveRef = useRef(false);
  const burstFrameRef = useRef(0);
  const prevBurstRef = useRef(false);

  const { positions, colors, speeds, velocities } = useMemo(() => {
    const pos = new Float32Array(config.count * 3);
    const col = new Float32Array(config.count * 3);
    const spd = new Float32Array(config.count);
    const vel = new Float32Array(config.count * 2); // vx, vy per particle

    for (let i = 0; i < config.count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8 - 2;
      pos[i * 3 + 2] =
        config.zRange[0] +
        Math.random() * (config.zRange[1] - config.zRange[0]);

      const color =
        COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      spd[i] =
        config.speedRange[0] +
        Math.random() * (config.speedRange[1] - config.speedRange[0]);
    }

    return { positions: pos, colors: col, speeds: spd, velocities: vel };
  }, [config]);

  useFrame(() => {
    if (!meshRef.current) return;
    const posArray = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    // Detect burst rising edge
    if (burst && !prevBurstRef.current) {
      burstActiveRef.current = true;
      burstFrameRef.current = 0;

      // Reset all particles to center with outward velocity
      for (let i = 0; i < config.count; i++) {
        posArray[i * 3] = (Math.random() - 0.5) * 0.5; // near center x
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 0.5; // near center y
        // keep z unchanged

        const angle = Math.random() * Math.PI * 2;
        const magnitude = 0.05 + Math.random() * 0.1;
        velocities[i * 2] = Math.cos(angle) * magnitude;
        velocities[i * 2 + 1] = Math.sin(angle) * magnitude;
      }
    }
    prevBurstRef.current = !!burst;

    // Mouse position in world-ish coordinates
    const mx = pointer.x * 5;
    const my = pointer.y * 4;

    for (let i = 0; i < config.count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      if (burstActiveRef.current) {
        // Burst mode: follow velocity with damping
        posArray[ix] += velocities[i * 2];
        posArray[iy] += velocities[i * 2 + 1];
        velocities[i * 2] *= 0.97;
        velocities[i * 2 + 1] *= 0.97;
      } else {
        // Normal mode: rise upward
        posArray[iy] += speeds[i];
        // Slight horizontal drift
        posArray[ix] += (Math.random() - 0.5) * 0.003;
        posArray[iz] += (Math.random() - 0.5) * 0.002;

        // Mouse repulsion
        const dx = posArray[ix] - mx;
        const dy = posArray[iy] - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 2.0 && dist > 0.01) {
          const force = 0.005 / dist;
          posArray[ix] += dx * force;
          posArray[iy] += dy * force;
        }
      }

      // Reset when particle drifts too far (both modes)
      if (posArray[iy] > 4 || posArray[iy] < -6 || posArray[ix] > 6 || posArray[ix] < -6) {
        posArray[ix] = (Math.random() - 0.5) * 10;
        posArray[iy] = -4 - Math.random() * 2;
        posArray[iz] =
          config.zRange[0] +
          Math.random() * (config.zRange[1] - config.zRange[0]);
      }
    }

    // End burst after duration
    if (burstActiveRef.current) {
      burstFrameRef.current++;
      if (burstFrameRef.current >= BURST_DURATION) {
        burstActiveRef.current = false;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={config.count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={config.count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={config.size}
        vertexColors
        transparent
        opacity={config.opacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

interface SparkParticlesProps {
  burst?: boolean;
}

export default function SparkParticles({ burst }: SparkParticlesProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ alpha: true, antialias: false }}
      dpr={[1, 1.5]}
    >
      {LAYERS.map((layer, i) => (
        <ParticleLayer key={i} config={layer} burst={burst} />
      ))}
    </Canvas>
  );
}
