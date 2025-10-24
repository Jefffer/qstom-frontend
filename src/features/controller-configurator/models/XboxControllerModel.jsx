import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const XboxControllerModel = ({ colors, rotation = [0, 0, 0] }) => {
  const groupRef = useRef();

  // Rotar automáticamente el modelo
  useFrame((state, delta) => {
    if (groupRef.current && !rotation.some(r => r !== 0)) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} rotation={rotation}>
      {/* Cuerpo principal del control Xbox */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 1, 0.9]} />
        <meshStandardMaterial 
          color={colors.body || '#ffffff'} 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Grips laterales (más redondeados que PS5) */}
      <mesh position={[-1.1, -0.7, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.4, 0.5, 1.4, 16]} />
        <meshStandardMaterial 
          color={colors.grips || '#1a1a1a'} 
          roughness={0.5}
        />
      </mesh>
      <mesh position={[1.1, -0.7, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.4, 0.5, 1.4, 16]} />
        <meshStandardMaterial 
          color={colors.grips || '#1a1a1a'} 
          roughness={0.5}
        />
      </mesh>

      {/* Botones frontales (A, B, X, Y) */}
      <mesh position={[0.9, 0.2, 0.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial 
          color={colors.buttons || '#00FF00'} 
          roughness={0.2}
          emissive={colors.buttons || '#00FF00'}
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[1.2, 0.2, 0.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial 
          color={colors.buttons || '#FF0000'} 
          roughness={0.2}
          emissive={colors.buttons || '#FF0000'}
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[1.05, 0.4, 0.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial 
          color={colors.buttons || '#FFFF00'} 
          roughness={0.2}
          emissive={colors.buttons || '#FFFF00'}
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[1.05, 0, 0.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial 
          color={colors.buttons || '#0080FF'} 
          roughness={0.2}
          emissive={colors.buttons || '#0080FF'}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* D-Pad */}
      <mesh position={[-0.9, 0.2, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial 
          color={colors.dpad || '#2a2a2a'} 
          roughness={0.4}
        />
      </mesh>

      {/* Joysticks (Xbox asymmetric) */}
      <group position={[-0.5, 0.1, 0.5]}>
        <mesh>
          <cylinderGeometry args={[0.25, 0.3, 0.3, 32]} />
          <meshStandardMaterial 
            color={colors.sticks || '#1a1a1a'} 
            roughness={0.6}
          />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={colors.sticks || '#1a1a1a'} 
            roughness={0.7}
          />
        </mesh>
      </group>

      <group position={[0.4, -0.4, 0.5]}>
        <mesh>
          <cylinderGeometry args={[0.25, 0.3, 0.3, 32]} />
          <meshStandardMaterial 
            color={colors.sticks || '#1a1a1a'} 
            roughness={0.6}
          />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={colors.sticks || '#1a1a1a'} 
            roughness={0.7}
          />
        </mesh>
      </group>

      {/* Bumpers superiores (LB, RB) */}
      <mesh position={[-1.1, 0.6, -0.1]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.7, 0.15, 0.6]} />
        <meshStandardMaterial 
          color={colors.bumpers || '#333333'} 
          roughness={0.5}
        />
      </mesh>
      <mesh position={[1.1, 0.6, -0.1]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.7, 0.15, 0.6]} />
        <meshStandardMaterial 
          color={colors.bumpers || '#333333'} 
          roughness={0.5}
        />
      </mesh>

      {/* Triggers (LT, RT) */}
      <mesh position={[-1.1, 0.8, -0.3]} rotation={[-0.6, 0, 0]}>
        <boxGeometry args={[0.6, 0.15, 0.5]} />
        <meshStandardMaterial 
          color={colors.triggers || '#2a2a2a'} 
          roughness={0.6}
        />
      </mesh>
      <mesh position={[1.1, 0.8, -0.3]} rotation={[-0.6, 0, 0]}>
        <boxGeometry args={[0.6, 0.15, 0.5]} />
        <meshStandardMaterial 
          color={colors.triggers || '#2a2a2a'} 
          roughness={0.6}
        />
      </mesh>

      {/* Botones centrales (View, Menu, Xbox) */}
      <mesh position={[-0.2, 0.3, 0.5]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0.2, 0.3, 0.5]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.3}
        />
      </mesh>

      {/* Botón Xbox (logo iluminado) */}
      <mesh position={[0, 0.55, 0.5]}>
        <cylinderGeometry args={[0.18, 0.18, 0.08, 32]} />
        <meshStandardMaterial 
          color={colors.led || '#00FF00'} 
          emissive={colors.led || '#00FF00'}
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

export default XboxControllerModel;
