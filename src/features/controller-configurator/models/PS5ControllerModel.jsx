import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PS5ControllerModel = ({ colors, rotation = [0, 0, 0] }) => {
  const groupRef = useRef();

  // Rotar automáticamente el modelo
  useFrame((state, delta) => {
    if (groupRef.current && !rotation.some(r => r !== 0)) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} rotation={rotation}>
      {/* Cuerpo principal del control (forma de DualSense) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 1.2, 0.8]} />
        <meshStandardMaterial 
          color={colors.body || '#ffffff'} 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Grips laterales */}
      <mesh position={[-1, -0.8, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.7, 1.5, 0.7]} />
        <meshStandardMaterial 
          color={colors.grips || '#1a1a1a'} 
          roughness={0.5}
        />
      </mesh>
      <mesh position={[1, -0.8, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.7, 1.5, 0.7]} />
        <meshStandardMaterial 
          color={colors.grips || '#1a1a1a'} 
          roughness={0.5}
        />
      </mesh>

      {/* Botones frontales (X, O, Square, Triangle) */}
      <mesh position={[0.8, 0.3, 0.45]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial 
          color={colors.buttons || '#00FFFF'} 
          roughness={0.2}
          emissive={colors.buttons || '#00FFFF'}
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[1.1, 0.3, 0.45]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial 
          color={colors.buttons || '#00FFFF'} 
          roughness={0.2}
          emissive={colors.buttons || '#00FFFF'}
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0.95, 0.5, 0.45]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial 
          color={colors.buttons || '#00FFFF'} 
          roughness={0.2}
          emissive={colors.buttons || '#00FFFF'}
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0.95, 0.1, 0.45]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial 
          color={colors.buttons || '#00FFFF'} 
          roughness={0.2}
          emissive={colors.buttons || '#00FFFF'}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* D-Pad */}
      <mesh position={[-0.8, 0.2, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial 
          color={colors.dpad || '#2a2a2a'} 
          roughness={0.4}
        />
      </mesh>

      {/* Joysticks (Analog sticks) */}
      <group position={[-0.5, -0.1, 0.5]}>
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

      <group position={[0.5, -0.4, 0.5]}>
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

      {/* Triggers superiores (L2, R2) */}
      <mesh position={[-1, 0.7, -0.2]} rotation={[-0.5, 0, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.8]} />
        <meshStandardMaterial 
          color={colors.triggers || '#333333'} 
          roughness={0.5}
        />
      </mesh>
      <mesh position={[1, 0.7, -0.2]} rotation={[-0.5, 0, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.8]} />
        <meshStandardMaterial 
          color={colors.triggers || '#333333'} 
          roughness={0.5}
        />
      </mesh>

      {/* Touchpad central */}
      <mesh position={[0, 0.4, 0.45]}>
        <boxGeometry args={[1.2, 0.05, 0.5]} />
        <meshStandardMaterial 
          color={colors.touchpad || '#0a0a0a'} 
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* LED Strip (luz característica) */}
      <mesh position={[0, 0.65, 0.3]}>
        <boxGeometry args={[1.8, 0.05, 0.1]} />
        <meshStandardMaterial 
          color={colors.led || '#00FFFF'} 
          emissive={colors.led || '#00FFFF'}
          emissiveIntensity={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

export default PS5ControllerModel;
