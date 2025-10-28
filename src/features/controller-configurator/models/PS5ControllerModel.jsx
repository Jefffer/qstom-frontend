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
          const materialName = child.material.name || '';
          const meshName = child.name || '';
          
          // Clone material to avoid affecting other instances
          child.material = child.material.clone();
          
          // Mapeo basado en nombres de materiales del modelo GLTF
          // BODY FRONTAL SUPERIOR: Object_10 (mesh name)
          if (meshName === 'Object_42') {
            child.material.color = new THREE.Color(colors.body || '#f5f5f5');
          }
          // BODY FRONTAL INFERIOR: front_body.001
          else if (materialName === 'front_body.001') {
            child.material.color = new THREE.Color(colors.frontLowerBody || colors.body || '#f5f5f5');
          }
          // BODY TRASERO: VRayMtl55
          else if (materialName.includes('VRayMtl55')) {
            child.material.color = new THREE.Color(colors.backBody || colors.body || '#f5f5f5');
          }
          // GRIPS: material_0
          else if (materialName === 'material_0') {
            child.material.color = new THREE.Color(colors.grips || '#1a1a1a');
          }
          // BUTTONS (face buttons): Material.002
          else if (materialName === 'Material.002') {
            child.material.color = new THREE.Color(colors.buttons || '#e8e8e8');
            child.material.emissive = new THREE.Color(colors.buttons || '#e8e8e8');
            child.material.emissiveIntensity = 0.1;
          }
          // DPAD: Material.009
          else if (materialName === 'Material.009') {
            child.material.color = new THREE.Color(colors.dpad || '#1a1a1a');
          }
          // STICKS: VRayMtl33, Material.004
          else if (materialName === 'VRayMtl33' ||
                   materialName === 'Material.004') {
            child.material.color = new THREE.Color(colors.sticks || '#1a1a1a');
          }
          // TRIGGERS: VRayMtl37, 1001, 1001.002
          else if (materialName === 'VRayMtl37' ||
                   materialName.includes('1001')) {
            child.material.color = new THREE.Color(colors.triggers || '#e8e8e8');
          }
          // TOUCHPAD: Material.006, Material.008, Material.010
          else if (materialName === 'Material.006' || 
                   materialName === 'Material.008' || 
                   materialName === 'Material.010') {
            child.material.color = new THREE.Color(colors.touchpad || '#0a0a0a');
          }
          // LED: Material.005, Material.007
          else if (materialName === 'Material.005' || 
                   materialName === 'Material.007') {
            child.material.color = new THREE.Color(colors.led || '#0066ff');
            child.material.emissive = new THREE.Color(colors.led || '#0066ff');
            child.material.emissiveIntensity = 0.6;
          }
          // DEFAULT: Material
          else if (materialName === 'Material') {
            child.material.color = new THREE.Color(colors.body || '#f5f5f5');
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
