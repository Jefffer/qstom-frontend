import { Suspense, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Fallback model con geometrías básicas
const FallbackPS5Model = ({ colors }) => {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 1.2, 0.8]} />
        <meshStandardMaterial 
          color={colors.body || '#ffffff'} 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[-1, -0.8, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.7, 1.5, 0.7]} />
        <meshStandardMaterial color={colors.grips || '#1a1a1a'} roughness={0.5} />
      </mesh>
      <mesh position={[1, -0.8, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.7, 1.5, 0.7]} />
        <meshStandardMaterial color={colors.grips || '#1a1a1a'} roughness={0.5} />
      </mesh>
      {/* Botones */}
      {[
        [0.8, 0.3, 0.45],
        [1.1, 0.3, 0.45],
        [0.95, 0.5, 0.45],
        [0.95, 0.1, 0.45],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial 
            color={colors.buttons || '#00FFFF'} 
            roughness={0.2}
            emissive={colors.buttons || '#00FFFF'}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// Componente que carga el modelo GLTF
const PS5GLTFModel = ({ colors }) => {
  // Ruta al modelo (debes descargar un modelo GLTF/GLB y colocarlo en public/models/)
  const modelPath = '/models/ps5-controller3.glb';
  
  let scene;
  try {
    const gltf = useGLTF(modelPath);
    scene = gltf.scene;
  } catch (error) {
    console.warn('Modelo GLTF PS5 no encontrado, usando fallback');
    return <FallbackPS5Model colors={colors} />;
  }

  // Aplicar colores personalizados
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          const materialName = child.material.name?.toLowerCase() || '';
          const meshName = child.name?.toLowerCase() || '';
          
          child.material = child.material.clone();
          
          // Mapeo inteligente de partes
          if (meshName.includes('body') || materialName.includes('body') || materialName.includes('shell')) {
            child.material.color = new THREE.Color(colors.body || '#ffffff');
          } else if (meshName.includes('button') || materialName.includes('button')) {
            child.material.color = new THREE.Color(colors.buttons || '#00FFFF');
            child.material.emissive = new THREE.Color(colors.buttons || '#00FFFF');
            child.material.emissiveIntensity = 0.3;
          } else if (meshName.includes('grip') || materialName.includes('grip')) {
            child.material.color = new THREE.Color(colors.grips || '#1a1a1a');
          } else if (meshName.includes('stick') || meshName.includes('analog')) {
            child.material.color = new THREE.Color(colors.sticks || '#1a1a1a');
          } else if (meshName.includes('trigger')) {
            child.material.color = new THREE.Color(colors.triggers || '#333333');
          } else if (meshName.includes('touchpad')) {
            child.material.color = new THREE.Color(colors.touchpad || '#0a0a0a');
          } else if (meshName.includes('led') || meshName.includes('light')) {
            child.material.color = new THREE.Color(colors.led || '#00FFFF');
            child.material.emissive = new THREE.Color(colors.led || '#00FFFF');
            child.material.emissiveIntensity = 0.8;
          }
        }
      });
    }
  }, [scene, colors]);

  return <primitive object={scene} scale={1} />;
};

const PS5ControllerModel = ({ colors, rotation = [0.1, 0, 0] }) => {
  return (
    <group rotation={rotation} position={[0, 0, 0]}>
      <Suspense fallback={<FallbackPS5Model colors={colors} />}>
        <PS5GLTFModel colors={colors} />
      </Suspense>
    </group>
  );
};

// Precargar modelo
useGLTF.preload('/models/ps5-controller3.glb');

export default PS5ControllerModel;
