"use client";

import { useRef, useMemo, useEffect, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Alle snelheden in eenheden per SECONDE (delta uit useFrame), zodat het effect
// op 60 Hz en 120 Hz even snel is.

const CAMERA_Z = 5;
const FOV = 60;
const TAN_HALF_FOV = Math.tan((FOV / 2) * (Math.PI / 180));
const MAX_DELTA = 1 / 20; // tab terug na pauze: geen sprong

// Heet → afkoelend: wit-goud → goud → koper (geen roest)
const HOT = new THREE.Color("#fff1cf");
const GOLD = new THREE.Color("#f5c96b");
const COPPER_LIGHT = new THREE.Color("#e8a849");
const COPPER = new THREE.Color("#c47a2a");
const tmpColor = new THREE.Color();

interface LayerConfig {
  count: number;
  size: number;
  opacity: number;
  zRange: [number, number];
}

const AMBIENT_LAYERS: LayerConfig[] = [
  { count: 30, size: 0.05, opacity: 0.55, zRange: [1, 3] },
  { count: 35, size: 0.038, opacity: 0.4, zRange: [-1, 1] },
  { count: 25, size: 0.028, opacity: 0.25, zRange: [-3, -1] },
];

const AMBIENT_SPEED: [number, number] = [0.05, 0.25];
const DRIFT_AMPLITUDE = 0.15;
const DRIFT_PERIOD: [number, number] = [4, 8];
const TWINKLE = 0.2;
const FADE_IN = 0.6;
const REPEL_RADIUS = 1.2;
const REPEL_SPEED = 0.15;

// Burst: alle afmetingen in LOGOBREEDTES (W), per vonk omgerekend naar
// wereldeenheden op zijn eigen diepte, zodat de reikwijdte op elk scherm
// ± 1,5 × de logobreedte blijft.
const BURST_POOL = 105;
const BURST_SIZE = 0.05;
const BURST_Z: [number, number] = [1.2, 2.6];
const BURST_SPEED: [number, number] = [1.2, 3.6]; // W/s
const BURST_CONE = (65 * Math.PI) / 180;
const BURST_GRAVITY = 2.2; // W/s²
const BURST_DRAG = 2.2; // 1/s, v *= exp(-k·dt)
const BURST_LIFE: [number, number] = [0.5, 0.9];
const BURST_JITTER = 0.08; // W, rond het logocentrum
const BURST_END_SIZE = 0.4;

export interface BurstRequest {
  id: number;
  count: number;
  at: number; // performance.now() van het verzoek
}

const BURST_MAX_AGE_MS = 1000; // canvas laadt later dan het verzoek: daarna niet meer afvuren

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function halfHeightAt(z: number) {
  return TAN_HALF_FOV * (CAMERA_Z - z);
}

/** Ronde vonk met zachte rand, eenmalig op een canvas van 32 × 32. */
function useSparkTexture() {
  const texture = useMemo(() => {
    const size = 32;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.25, "rgba(255,255,255,0.85)");
      g.addColorStop(0.55, "rgba(255,255,255,0.25)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

/** PointsMaterial met een grootte per vonk (attribuut `aSize`, vermenigvuldiger). */
function useSparkMaterial(size: number, opacity: number, map: THREE.Texture) {
  const material = useMemo(() => {
    const m = new THREE.PointsMaterial({
      size,
      map,
      vertexColors: true,
      transparent: true,
      opacity,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    m.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nattribute float aSize;")
        .replace("gl_PointSize = size;", "gl_PointSize = size * aSize;");
    };
    return m;
  }, [size, opacity, map]);
  useEffect(() => () => material.dispose(), [material]);
  return material;
}

function AmbientLayer({ config, map }: { config: LayerConfig; map: THREE.Texture }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer, viewport } = useThree();
  const material = useSparkMaterial(config.size, config.opacity, map);
  const timeRef = useRef(0);

  const initialAspect = viewport.aspect;
  const data = useMemo(() => {
    const n = config.count;
    const positions = new Float32Array(n * 3);
    const colors = new Float32Array(n * 3);
    const sizes = new Float32Array(n).fill(1);
    const baseX = new Float32Array(n);
    const speed = new Float32Array(n);
    const phase = new Float32Array(n);
    const omega = new Float32Array(n);
    const twinkleOmega = new Float32Array(n);
    const age = new Float32Array(n);
    const base = new Float32Array(n * 3);
    const palette = [GOLD, COPPER_LIGHT, COPPER];
    for (let i = 0; i < n; i++) {
      const z = rand(config.zRange[0], config.zRange[1]);
      const hh = halfHeightAt(z);
      positions[i * 3 + 1] = rand(-hh, hh);
      positions[i * 3 + 2] = z;
      baseX[i] = rand(-1, 1) * hh * initialAspect;
      speed[i] = rand(AMBIENT_SPEED[0], AMBIENT_SPEED[1]);
      phase[i] = rand(0, Math.PI * 2);
      omega[i] = (Math.PI * 2) / rand(DRIFT_PERIOD[0], DRIFT_PERIOD[1]);
      twinkleOmega[i] = (Math.PI * 2) / rand(2.5, 5);
      age[i] = FADE_IN; // bij de start al zichtbaar
      const c = palette[Math.floor(Math.random() * palette.length)];
      base[i * 3] = c.r;
      base[i * 3 + 1] = c.g;
      base[i * 3 + 2] = c.b;
    }
    return { positions, colors, sizes, baseX, speed, phase, omega, twinkleOmega, age, base };
  }, [config]);

  useFrame((_, rawDelta) => {
    const points = pointsRef.current;
    if (!points) return;
    const dt = Math.min(rawDelta, MAX_DELTA);
    timeRef.current += dt;
    const t = timeRef.current;
    const { positions, colors, baseX, speed, phase, omega, twinkleOmega, age, base } = data;
    const aspect = viewport.aspect;

    for (let i = 0; i < config.count; i++) {
      const ix = i * 3;
      const z = positions[ix + 2];
      const hh = halfHeightAt(z);
      const hw = hh * aspect;

      let y = positions[ix + 1] + speed[i] * dt;
      age[i] += dt;

      // Muis-afstoting, per diepte omgerekend
      const mx = pointer.x * hw;
      const my = pointer.y * hh;
      const dx = positions[ix] - mx;
      const dy = y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL_RADIUS && dist > 0.01) {
        const push = (REPEL_SPEED * dt) / dist;
        baseX[i] += dx * push;
        y += dy * push;
      }

      // Boven het beeld: onderaan opnieuw, met fade-in
      if (y > hh + 0.1) {
        y = -hh - 0.1;
        baseX[i] = rand(-1, 1) * hw;
        age[i] = 0;
      }

      positions[ix] = baseX[i] + Math.sin(t * omega[i] + phase[i]) * DRIFT_AMPLITUDE;
      positions[ix + 1] = y;

      const fade = Math.min(age[i] / FADE_IN, 1);
      const twinkle = 1 - TWINKLE + TWINKLE * Math.sin(t * twinkleOmega[i] + phase[i] * 2);
      const k = fade * twinkle;
      colors[ix] = base[ix] * k;
      colors[ix + 1] = base[ix + 1] * k;
      colors[ix + 2] = base[ix + 2] * k;
    }

    points.geometry.attributes.position.needsUpdate = true;
    points.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} material={material} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={config.count} array={data.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={config.count} array={data.colors} itemSize={3} />
        <bufferAttribute attach="attributes-aSize" count={config.count} array={data.sizes} itemSize={1} />
      </bufferGeometry>
    </points>
  );
}

function BurstLayer({
  request,
  originRef,
  map,
}: {
  request: BurstRequest | null;
  originRef: RefObject<HTMLElement>;
  map: THREE.Texture;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const { gl, viewport } = useThree();
  const material = useSparkMaterial(BURST_SIZE, 1, map);
  const lastIdRef = useRef(0);

  const data = useMemo(() => {
    const n = BURST_POOL;
    return {
      positions: new Float32Array(n * 3),
      colors: new Float32Array(n * 3),
      sizes: new Float32Array(n),
      vel: new Float32Array(n * 2),
      gravity: new Float32Array(n),
      age: new Float32Array(n),
      life: new Float32Array(n), // 0 = vrij
    };
  }, []);

  const spawn = (count: number) => {
    const origin = originRef.current;
    if (!origin) return;
    const canvasRect = gl.domElement.getBoundingClientRect();
    const logoRect = origin.getBoundingClientRect();
    // Logo nog 0 px breed (PNG niet geladen): anders 70 vonken op één punt
    if (canvasRect.width === 0 || canvasRect.height === 0 || logoRect.width === 0) return;
    const ndcX = ((logoRect.left + logoRect.width / 2 - canvasRect.left) / canvasRect.width) * 2 - 1;
    const ndcY = -(((logoRect.top + logoRect.height / 2 - canvasRect.top) / canvasRect.height) * 2 - 1);
    const logoFrac = logoRect.width / canvasRect.height; // logobreedte als deel van de beeldhoogte
    const aspect = viewport.aspect;
    const { positions, vel, gravity, age, life, sizes } = data;

    let spawned = 0;
    for (let i = 0; i < BURST_POOL && spawned < count; i++) {
      if (life[i] > 0) continue;
      const z = rand(BURST_Z[0], BURST_Z[1]);
      const hh = halfHeightAt(z);
      const W = logoFrac * 2 * hh; // logobreedte in wereldeenheden op deze diepte
      positions[i * 3] = ndcX * hh * aspect + rand(-1, 1) * BURST_JITTER * W;
      positions[i * 3 + 1] = ndcY * hh + rand(-1, 1) * BURST_JITTER * W;
      positions[i * 3 + 2] = z;
      const angle = Math.PI / 2 + rand(-BURST_CONE, BURST_CONE);
      // meer trage dan snelle vonken: kwadratisch naar de onderkant
      const speed = (BURST_SPEED[0] + Math.random() ** 1.6 * (BURST_SPEED[1] - BURST_SPEED[0])) * W;
      vel[i * 2] = Math.cos(angle) * speed;
      vel[i * 2 + 1] = Math.sin(angle) * speed;
      gravity[i] = BURST_GRAVITY * W;
      age[i] = 0;
      life[i] = rand(BURST_LIFE[0], BURST_LIFE[1]);
      sizes[i] = 1;
      spawned++;
    }
  };

  useFrame((_, rawDelta) => {
    const points = pointsRef.current;
    if (!points) return;

    if (request && request.id !== lastIdRef.current) {
      lastIdRef.current = request.id;
      if (performance.now() - request.at < BURST_MAX_AGE_MS) spawn(request.count);
    }

    const dt = Math.min(rawDelta, MAX_DELTA);
    const drag = Math.exp(-BURST_DRAG * dt);
    const { positions, colors, sizes, vel, gravity, age, life } = data;

    for (let i = 0; i < BURST_POOL; i++) {
      const ix = i * 3;
      if (life[i] <= 0) {
        colors[ix] = colors[ix + 1] = colors[ix + 2] = 0;
        sizes[i] = 0;
        continue;
      }
      age[i] += dt;
      const u = age[i] / life[i];
      if (u >= 1) {
        life[i] = 0;
        colors[ix] = colors[ix + 1] = colors[ix + 2] = 0;
        sizes[i] = 0;
        continue;
      }

      vel[i * 2] *= drag;
      vel[i * 2 + 1] = vel[i * 2 + 1] * drag - gravity[i] * dt;
      positions[ix] += vel[i * 2] * dt;
      positions[ix + 1] += vel[i * 2 + 1] * dt;

      // Kleur over het leven: wit-goud → goud → koper
      const c = tmpColor;
      if (u < 0.15) c.copy(HOT).lerp(GOLD, u / 0.15);
      else if (u < 0.5) c.copy(GOLD).lerp(COPPER_LIGHT, (u - 0.15) / 0.35);
      else c.copy(COPPER_LIGHT).lerp(COPPER, (u - 0.5) / 0.5);

      // Zacht uitdoven (ease-out) over de laatste 60 %; additive: donker = weg
      const f = u < 0.4 ? 1 : (1 - (u - 0.4) / 0.6) ** 2;
      colors[ix] = c.r * f;
      colors[ix + 1] = c.g * f;
      colors[ix + 2] = c.b * f;
      sizes[i] = 1 - (1 - BURST_END_SIZE) * u;
    }

    points.geometry.attributes.position.needsUpdate = true;
    points.geometry.attributes.color.needsUpdate = true;
    points.geometry.attributes.aSize.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} material={material} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={BURST_POOL} array={data.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={BURST_POOL} array={data.colors} itemSize={3} />
        <bufferAttribute attach="attributes-aSize" count={BURST_POOL} array={data.sizes} itemSize={1} />
      </bufferGeometry>
    </points>
  );
}

function Sparks({
  burst,
  originRef,
}: {
  burst: BurstRequest | null;
  originRef: RefObject<HTMLElement>;
}) {
  const map = useSparkTexture();
  return (
    <>
      {AMBIENT_LAYERS.map((layer, i) => (
        <AmbientLayer key={i} config={layer} map={map} />
      ))}
      <BurstLayer request={burst} originRef={originRef} map={map} />
    </>
  );
}

interface SparkParticlesProps {
  burst: BurstRequest | null;
  originRef: RefObject<HTMLElement>;
}

export default function SparkParticles({ burst, originRef }: SparkParticlesProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA_Z], fov: FOV }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ alpha: true, antialias: false }}
      dpr={[1, 1.5]}
    >
      <Sparks burst={burst} originRef={originRef} />
    </Canvas>
  );
}
