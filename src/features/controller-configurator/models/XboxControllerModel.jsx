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
const XboxGLTFModel = ({ colors, uploadedImage, testMeshName }) => {
  // Ruta al modelo
  const modelPath = '/models/xbox-controller7.glb';
  
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
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);
    }
  }, [scene]);

  // Aplicar colores personalizados
  useEffect(() => {
    if (scene) {
      console.log('=== Xbox Controller Scene Analysis ===');
      
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          const meshName = child.name || '';
          
          console.log('Mesh:', child.name, '| Material:', child.material.name);
          
          // Clonar material para no afectar otras instancias
          child.material = child.material.clone();
          
          // MODO TEST: Si hay un mesh seleccionado para prueba, resaltarlo en rojo
          if (testMeshName && meshName === testMeshName) {
            child.material.color = new THREE.Color('#ff0000');
            child.material.emissive = new THREE.Color('#ff0000');
            child.material.emissiveIntensity = 0.5;
          }
          // Si no está en modo test, mantener los colores y texturas originales del modelo
          // No aplicamos ninguna modificación para preservar el aspecto original
        }
      });
    }
  }, [scene, testMeshName]);

  return <primitive object={scene} scale={0.3} />;
};

const XboxControllerModel = ({ colors, uploadedImage, testMeshName, rotation = [0.1, 0, 0] }) => {
  return (
    <group rotation={rotation} position={[0, 0, 0]}>
      <Suspense fallback={<FallbackXboxModel colors={colors} />}>
        <XboxGLTFModel colors={colors} uploadedImage={uploadedImage} testMeshName={testMeshName} />
      </Suspense>
    </group>
  );
};

// Precargar modelo
useGLTF.preload('/models/xbox-controller7.glb');

// Función para obtener todos los nombres de meshes del modelo
export const getXboxMeshNames = () => {
  const meshNames = [
    'Cylinder_TT_checker_1024x1024_UV_GRID_0',
    'Cube002_TT_checker_1024x1024_UV_GRID_0',
    'Circle002_glass_0',
    'Circle003_TT_checker_1024x1024_UV_GRID_0',
    'Circle004_TT_checker_1024x1024_UV_GRID_0',
    'Circle006_TT_checker_1024x1024_UV_GRID_0',
    'Circle007_TT_checker_1024x1024_UV_GRID_0',
    'Circle008_TT_checker_1024x1024_UV_GRID_0',
    'Cube003_TT_checker_1024x1024_UV_GRID_0',
    'Plane001_TT_checker_1024x1024_UV_GRID_0',
    'Circle009_TT_checker_1024x1024_UV_GRID_0',
    'Text_Material001_0',
    'Text001_Material001_0',
    'Text002_Material001_0',
    'Text003_Material001_0',
    'Circle010_TT_checker_1024x1024_UV_GRID_0',
    'Cube005_TT_checker_1024x1024_UV_GRID_0',
    'Circle011_TT_checker_1024x1024_UV_GRID001_0'
  ];
  return meshNames;
};

export default XboxControllerModel;
