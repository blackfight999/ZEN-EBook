
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

// Fix: Define intrinsic elements as components to bypass JSX.IntrinsicElements type checking
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const SpotLight = 'spotLight' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;
const Mesh = 'mesh' as any;
const BoxGeometry = 'boxGeometry' as any;
const PlaneGeometry = 'planeGeometry' as any;

const BreathingOrb = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      // Synchronize with breathing rhythm
      const pulse = Math.sin(t * 0.5) * 0.1 + 1;
      ref.current.scale.set(scale * pulse, scale * pulse, scale * pulse);
      ref.current.rotation.y = t * 0.1;
      ref.current.rotation.z = t * 0.05;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={0.5}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.2}
        distort={0.3}
        speed={1}
        roughness={0.1}
      />
    </Sphere>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Fix: Property 'ambientLight' does not exist on type 'JSX.IntrinsicElements' */}
        <AmbientLight intensity={1} />
        {/* Fix: Property 'spotLight' does not exist on type 'JSX.IntrinsicElements' */}
        <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
          <BreathingOrb position={[0, 0, 0]} color="#d4e2d4" scale={1.8} />
          
          {/* Floating aura rings */}
          {[1, 2, 3].map(i => (
             <Torus key={i} args={[2.5 + i * 0.5, 0.005, 16, 100]} rotation={[Math.PI / 2 + (i * 0.2), 0, 0]}>
               {/* Fix: Property 'meshBasicMaterial' does not exist on type 'JSX.IntrinsicElements' */}
               <MeshBasicMaterial color="#7a9e7a" transparent opacity={0.3 - i * 0.08} />
             </Torus>
          ))}
        </Float>
        <Environment preset="park" />
      </Canvas>
    </div>
  );
};

const RippleStone = ({ position, scale = 1, rotation = [0,0,0] }: { position: [number, number, number], scale?: number, rotation?: [number,number,number] }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.05;
        }
    });

    return (
        /* Fix: Property 'mesh' does not exist on type 'JSX.IntrinsicElements' */
        <Mesh ref={ref} position={position} rotation={rotation}>
             {/* Fix: Property 'boxGeometry' does not exist on type 'JSX.IntrinsicElements' */}
             <BoxGeometry args={[1.5 * scale, 0.4 * scale, 1 * scale]} />
             {/* Fix: Property 'meshStandardMaterial' does not exist on type 'JSX.IntrinsicElements' */}
             <MeshStandardMaterial color="#333" roughness={0.8} metalness={0.1} />
        </Mesh>
    );
}

export const SerenityPond: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 bg-[#0a0a0a]">
      <Canvas camera={{ position: [5, 4, 5], fov: 40 }}>
        {/* Fix: Property 'ambientLight' does not exist on type 'JSX.IntrinsicElements' */}
        <AmbientLight intensity={0.5} />
        {/* Fix: Property 'pointLight' does not exist on type 'JSX.IntrinsicElements' */}
        <PointLight position={[10, 10, 10]} intensity={1.5} color="#d4e2d4" />
        <Environment preset="night" />
        
        {/* The Water Surface */}
        {/* Fix: Property 'mesh' does not exist on type 'JSX.IntrinsicElements' */}
        <Mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            {/* Fix: Property 'planeGeometry' does not exist on type 'JSX.IntrinsicElements' */}
            <PlaneGeometry args={[100, 100]} />
            {/* Fix: Property 'meshStandardMaterial' does not exist on type 'JSX.IntrinsicElements' */}
            <MeshStandardMaterial 
                color="#050805" 
                roughness={0} 
                metalness={0.9} 
                transparent 
                opacity={0.8}
            />
        </Mesh>

        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
            <RippleStone position={[0, 0, 0]} scale={1} rotation={[0.2, 0.5, 0]} />
            <RippleStone position={[-2, -0.1, 1.5]} scale={0.7} rotation={[0, -0.3, 0.1]} />
            <RippleStone position={[2.5, -0.05, -1]} scale={1.2} rotation={[-0.1, 0.8, 0]} />
            
            {/* Subtle glow orb */}
            <Sphere args={[0.05, 32, 32]} position={[0, 0.8, 0]}>
                {/* Fix: Property 'meshStandardMaterial' does not exist on type 'JSX.IntrinsicElements' */}
                <MeshStandardMaterial color="#fff" emissive="#d4e2d4" emissiveIntensity={5} />
            </Sphere>
        </Float>

        {/* Rain ripples simulation */}
        {[...Array(5)].map((_, i) => (
             <Torus key={i} args={[i * 2 + 1, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.48, 0]}>
                {/* Fix: Property 'meshBasicMaterial' does not exist on type 'JSX.IntrinsicElements' */}
                <MeshBasicMaterial color="#fff" transparent opacity={0.05} />
            </Torus>
        ))}
      </Canvas>
    </div>
  );
}
