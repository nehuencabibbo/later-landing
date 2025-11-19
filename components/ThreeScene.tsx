import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, ContactShadows, PerspectiveCamera, Stars, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

// Augment JSX namespace to include R3F intrinsic elements to fix TS errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      circleGeometry: any;
      planeGeometry: any;
      boxGeometry: any;
      cylinderGeometry: any;
      sphereGeometry: any;
      torusGeometry: any;
      dodecahedronGeometry: any;
      instancedMesh: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      extrudeGeometry: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      circleGeometry: any;
      planeGeometry: any;
      boxGeometry: any;
      cylinderGeometry: any;
      sphereGeometry: any;
      torusGeometry: any;
      dodecahedronGeometry: any;
      instancedMesh: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      extrudeGeometry: any;
    }
  }
}

const NotificationBubble = ({ position, delay, color = "#e11d48" }: { position: [number, number, number], delay: number, color?: string }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      // Bobbing motion
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + delay) * 0.2;
      // Gentle rotation
      ref.current.rotation.z = Math.sin(t * 0.5 + delay) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position}>
       <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Card Body */}
          <RoundedBox args={[1.8, 0.6, 0.05]} radius={0.05} smoothness={4}>
             <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
          </RoundedBox>
          
          {/* Glass Overlay */}
          <RoundedBox args={[1.82, 0.62, 0.06]} radius={0.05} smoothness={4}>
             <MeshTransmissionMaterial 
                samples={4}
                thickness={0.1}
                chromaticAberration={0.1}
                anisotropy={0.1}
                transmission={0.6}
                color="#ffffff"
                roughness={0.1}
             />
          </RoundedBox>

          {/* Icon / Content abstraction */}
          <group position={[-0.6, 0, 0.04]}>
             <mesh>
               <circleGeometry args={[0.15, 32]} />
               <meshBasicMaterial color={color} />
             </mesh>
          </group>
          
          {/* Text Lines */}
          <group position={[0.2, 0, 0.04]}>
             <mesh position={[0, 0.1, 0]}>
               <planeGeometry args={[1.0, 0.1]} />
               <meshBasicMaterial color="#ffffff" />
             </mesh>
             <mesh position={[-0.2, -0.1, 0]}>
               <planeGeometry args={[0.6, 0.05]} />
               <meshBasicMaterial color="#666666" />
             </mesh>
          </group>
       </Float>
    </group>
  );
};

const FloatingWidget = ({ position }: { position: [number, number, number] }) => {
  const mesh = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (mesh.current) {
       mesh.current.rotation.y += 0.01;
       mesh.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  // Create a bookmark shape path
  const bookmarkShape = useMemo(() => {
    const shape = new THREE.Shape();
    const width = 0.25;
    const height = 0.35;
    
    shape.moveTo(-width, height);
    shape.lineTo(width, height);
    shape.lineTo(width, -height);
    shape.lineTo(0, -height + 0.15); // V-cut bottom
    shape.lineTo(-width, -height);
    shape.closePath();
    
    return shape;
  }, []);

  return (
    <group ref={mesh} position={position}>
      <Float speed={4} rotationIntensity={1} floatIntensity={1}>
         {/* Widget Body - Red Square (Kept as requested) */}
         <RoundedBox args={[1.2, 1.2, 0.2]} radius={0.4} smoothness={4}>
            <meshStandardMaterial color="#e11d48" roughness={0.2} metalness={0.5} />
         </RoundedBox>
         
         {/* Front Face Detail - Bookmark Icon */}
         <group position={[0, 0, 0.11]}>
             <mesh>
                <extrudeGeometry args={[bookmarkShape, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3 }]} />
                <meshStandardMaterial color="white" roughness={0.4} metalness={0.2} />
             </mesh>
         </group>

         {/* Glow */}
         <pointLight color="#e11d48" intensity={2} distance={3} />
      </Float>
    </group>
  )
}

const PhoneModel = (props: any) => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 10 + 0.1, 0.1);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 10 - 0.2, 0.1);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <Float
        speed={2} 
        rotationIntensity={0.5} 
        floatIntensity={0.5} 
        floatingRange={[-0.1, 0.1]}
      >
        {/* Phone Chassis */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3, 6, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
        </mesh>

        {/* Phone Screen (Emissive Glow) */}
        <mesh position={[0, 0, 0.16]}>
          <planeGeometry args={[2.8, 5.8]} />
          <meshBasicMaterial color="#000" />
        </mesh>

        {/* UI Elements on Screen - Abstract representation of list */}
        <group position={[0, 0, 0.17]}>
           {/* Header */}
           <mesh position={[0, 2.5, 0]}>
             <planeGeometry args={[2.4, 0.4]} />
             <meshBasicMaterial color="#e11d48" />
           </mesh>
           
           {/* List Items */}
           {[1.5, 0.5, -0.5, -1.5].map((y, i) => (
             <group key={i} position={[0, y, 0]}>
                <mesh position={[-0.8, 0, 0]}>
                  <boxGeometry args={[0.4, 0.4, 0.05]} />
                  <meshStandardMaterial color="#333" />
                </mesh>
                <mesh position={[0.4, 0, 0]}>
                  <planeGeometry args={[1.6, 0.05]} />
                  <meshBasicMaterial color="#555" />
                </mesh>
                 <mesh position={[0.4, -0.15, 0]}>
                  <planeGeometry args={[1.0, 0.03]} />
                  <meshBasicMaterial color="#333" />
                </mesh>
                <mesh position={[0, 0, -0.01]}>
                   <planeGeometry args={[2.4, 0.8]} />
                   <MeshTransmissionMaterial 
                      backside
                      samples={4} 
                      thickness={0.2} 
                      chromaticAberration={0.2} 
                      anisotropy={0.3}
                      distortion={0.4}
                      distortionScale={0.3}
                      temporalDistortion={0.1}
                      color="#2a0a12"
                   />
                </mesh>
             </group>
           ))}
        </group>

        {/* Glass Overlay over everything for glossy finish */}
         <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[3.05, 6.05, 0.4]} />
          <MeshTransmissionMaterial 
            samples={8} 
            resolution={512} 
            thickness={0.5} 
            roughness={0.0} 
            transmission={0.98} 
            color="#ffffff"
            opacity={0.2}
            transparent
          />
        </mesh>
      </Float>
      
      {/* Floating Notification Cards attached relative to phone */}
      <NotificationBubble position={[2.2, 1.5, 0.5]} delay={0} color="#e11d48" />
      <NotificationBubble position={[-2.0, -1.0, 0.8]} delay={2} color="#e11d48" />
      <NotificationBubble position={[1.8, -2.5, -0.5]} delay={4} color="#e11d48" />
      
      {/* The New Widget Feature Visualization */}
      <FloatingWidget position={[-2.2, 2.0, 1.5]} />

    </group>
  );
};

const FloatingParticles = () => {
  const count = 30;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();

  useFrame((state) => {
    if (!mesh.current) return;
    
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const x = Math.sin(i * 100 + t * 0.1) * 6;
      const y = Math.cos(i * 100 + t * 0.1) * 6;
      const z = Math.sin(i * 200 + t * 0.1) * 4 - 2;
      
      dummy.position.set(x, y, z);
      dummy.rotation.x = t * 0.2 + i;
      dummy.rotation.y = t * 0.3 + i;
      dummy.scale.setScalar(Math.max(0.2, Math.sin(t + i) * 0.5));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color="#e11d48" emissive="#9f1239" emissiveIntensity={2} toneMapped={false} />
    </instancedMesh>
  );
};

const Scene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
        <Environment preset="city" />
        
        {/* Lights */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={20} color="#ff0055" />
        <pointLight position={[-10, -10, -10]} intensity={5} color="#00ffff" />

        {/* Objects */}
        <PhoneModel position={[2, 0, 0]} rotation={[0, -0.5, 0]} />
        <FloatingParticles />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <ContactShadows position={[0, -4, 0]} opacity={0.6} scale={20} blur={2.5} far={4} color="#e11d48" />
      </Canvas>
    </div>
  );
};

export default Scene;