import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function WaveSurface() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#0A0E1A') },
      uColor2: { value: new THREE.Color('#14B8A6') },
      uColor3: { value: new THREE.Color('#D4A853') },
    }),
    []
  );

  const vertexShader = `
    uniform float uTime;
    varying float vHeight;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      float wave = sin(pos.x * 1.5 + uTime * 0.3) * 0.3
                 + cos(pos.y * 2.0 + uTime * 0.2) * 0.2
                 + sin((pos.x + pos.y) * 1.0 + uTime * 0.15) * 0.15;
      pos.z = wave;
      vHeight = wave;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying float vHeight;
    varying vec2 vUv;
    void main() {
      float t = smoothstep(-0.5, 0.5, vHeight);
      vec3 color = mix(uColor1, uColor2, t * 0.6);
      color = mix(color, uColor3, t * t * 0.4);
      float alpha = 0.15 + t * 0.1;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[12, 12, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
        wireframe
      />
    </mesh>
  );
}

function ParametricCurves() {
  const groupRef = useRef<THREE.Group>(null);

  const curves = useMemo(() => {
    const items: {
      points: THREE.Vector3[];
      color: string;
      speed: number;
      offset: number;
    }[] = [];

    // Sine wave curve
    const sinePoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 4 - Math.PI * 2;
      sinePoints.push(new THREE.Vector3(t * 0.5, Math.sin(t) * 0.8, 0.5));
    }
    items.push({ points: sinePoints, color: '#D4A853', speed: 0.4, offset: 0 });

    // Spiral
    const spiralPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 3;
      spiralPoints.push(
        new THREE.Vector3(
          Math.cos(t) * (1 + t * 0.1),
          Math.sin(t) * (1 + t * 0.1),
          t * 0.15 - 0.5
        )
      );
    }
    items.push({ points: spiralPoints, color: '#14B8A6', speed: 0.6, offset: 2 });

    // Lissajous
    const lissPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 2;
      lissPoints.push(
        new THREE.Vector3(
          Math.sin(3 * t + 1) * 1.2,
          Math.sin(2 * t) * 1.2,
          Math.cos(t) * 0.3 + 0.8
        )
      );
    }
    items.push({ points: lissPoints, color: '#B8860B', speed: 0.3, offset: 4 });

    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {curves.map((curve, i) => (
        <lineLoop key={i} position={[0, 0, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(curve.points.flatMap((p) => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={curve.color} transparent opacity={0.5} />
        </lineLoop>
      ))}
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 80;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = Math.random() * 0.003 + 0.001;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      if (arr[i * 3 + 1] > 6) {
        arr[i * 3 + 1] = -5;
        arr[i * 3] = (Math.random() - 0.5) * 14;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D4A853"
        size={0.05}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame(() => {
    const targetX = mouseRef.current.x * 0.3;
    const targetY = mouseRef.current.y * 0.15 + 1.5;
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <CameraRig />
        <WaveSurface />
        <ParametricCurves />
        <Particles />
      </Canvas>
    </div>
  );
}
