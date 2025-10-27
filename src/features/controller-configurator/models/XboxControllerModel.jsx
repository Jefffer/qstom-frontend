import { Suspense, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Fallback model con geometrías básicas
const FallbackXboxModel = ({ colors }) => {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 1, 0.9]} />
        <meshStandardMaterial 
          color={colors.body || '#ffffff'} 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[-1.1, -0.7, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.4, 0.5, 1.4, 16]} />
        <meshStandardMaterial color={colors.grips || '#1a1a1a'} roughness={0.5} />
      </mesh>
      <mesh position={[1.1, -0.7, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.4, 0.5, 1.4, 16]} />
        <meshStandardMaterial color={colors.grips || '#1a1a1a'} roughness={0.5} />
      </mesh>
      {/* Botones A, B, X, Y */}
      {[
        { pos: [0.9, 0.2, 0.5], color: '#00FF00' },
        { pos: [1.2, 0.2, 0.5], color: '#FF0000' },
        { pos: [1.05, 0.4, 0.5], color: '#FFFF00' },
        { pos: [1.05, 0, 0.5], color: '#0080FF' },
      ].map((btn, idx) => (
        <mesh key={idx} position={btn.pos}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial 
            color={colors.buttons || btn.color} 
            roughness={0.2}
            emissive={colors.buttons || btn.color}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      {/* Botón Xbox central */}
      <mesh position={[0, 0.55, 0.5]}>
        <cylinderGeometry args={[0.18, 0.18, 0.08, 32]} />
        <meshStandardMaterial 
          color={colors.led || '#00FF00'} 
          emissive={colors.led || '#00FF00'}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
};

// Componente que carga el modelo GLTF
const XboxGLTFModel = ({ colors }) => {
  // Ruta al modelo (debes descargar un modelo GLTF/GLB y colocarlo en public/models/)
  const modelPath = '/models/xbox-controller.glb';
  
  let scene;
  try {
    const gltf = useGLTF(modelPath);
    scene = gltf.scene.clone();
  } catch (error) {
    console.warn('Modelo GLTF Xbox no encontrado, usando fallback');
    return <FallbackXboxModel colors={colors} />;
  }

  // Centrar el modelo en su origen
  useEffect(() => {
    if (scene) {
      // Calcular el centro del modelo
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      
      // Mover el modelo para que su centro esté en (0, 0, 0)
      scene.position.sub(center);
    }
  }, [scene]);

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
            // Mantener colores característicos de Xbox si no se personaliza
            if (!colors.buttons) {
              // Los modelos GLTF suelen tener nombres específicos para cada botón
              if (meshName.includes('a')) child.material.color = new THREE.Color('#00C000');
              else if (meshName.includes('b')) child.material.color = new THREE.Color('#E00000');
              else if (meshName.includes('x')) child.material.color = new THREE.Color('#0080FF');
              else if (meshName.includes('y')) child.material.color = new THREE.Color('#FFD000');
            } else {
              child.material.color = new THREE.Color(colors.buttons);
            }
            child.material.emissive = child.material.color.clone();
            child.material.emissiveIntensity = 0.3;
          } else if (meshName.includes('grip') || materialName.includes('grip')) {
            child.material.color = new THREE.Color(colors.grips || '#1a1a1a');
          } else if (meshName.includes('stick') || meshName.includes('analog') || meshName.includes('thumbstick')) {
            child.material.color = new THREE.Color(colors.sticks || '#1a1a1a');
          } else if (meshName.includes('trigger') || materialName.includes('trigger')) {
            child.material.color = new THREE.Color(colors.triggers || '#2a2a2a');
          } else if (meshName.includes('bumper') || materialName.includes('bumper')) {
            child.material.color = new THREE.Color(colors.bumpers || '#333333');
          } else if (meshName.includes('xbox') || meshName.includes('logo') || materialName.includes('logo')) {
            child.material.color = new THREE.Color(colors.led || '#00FF00');
            child.material.emissive = new THREE.Color(colors.led || '#00FF00');
            child.material.emissiveIntensity = 0.9;
          } else if (meshName.includes('dpad') || materialName.includes('dpad')) {
            child.material.color = new THREE.Color(colors.dpad || '#2a2a2a');
          }
        }
      });
    }
  }, [scene, colors]);

  return <primitive object={scene} scale={5.5} />;
};

const XboxControllerModel = ({ colors, rotation = [0.1, 0, 0] }) => {
  return (
    <group rotation={rotation} position={[0, 0, 0]}>
      <Suspense fallback={<FallbackXboxModel colors={colors} />}>
        <XboxGLTFModel colors={colors} />
      </Suspense>
    </group>
  );
};

// Precargar modelo
useGLTF.preload('/models/xbox-controller.glb');

export default XboxControllerModel;
