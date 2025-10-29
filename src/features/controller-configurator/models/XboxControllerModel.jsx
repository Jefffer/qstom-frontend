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
const XboxGLTFModel = ({ colors, uploadedImage }) => {
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

  // Función para extraer color de gradientes y patrones SVG
  const getColorFromValue = (colorValue) => {
    if (!colorValue) return '#ffffff';
    
    // Si es una imagen SVG pattern, extraer el color de fondo
    if (colorValue.includes('data:image/svg')) {
      const match = colorValue.match(/#([0-9a-fA-F]{6})/);
      return match ? `#${match[1]}` : '#ffffff';
    }
    
    // Si es un gradiente, extraer el primer color
    if (colorValue.includes('linear-gradient')) {
      const match = colorValue.match(/#([0-9a-fA-F]{6})/);
      return match ? `#${match[1]}` : '#ffffff';
    }
    
    // Si ya es un color hex válido
    if (colorValue.match(/^#[0-9a-fA-F]{6}$/)) {
      return colorValue;
    }
    
    return '#ffffff';
  };

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
      
      // Cargar textura de imagen si existe
      let imageTexture = null;
      if (uploadedImage) {
        const textureLoader = new THREE.TextureLoader();
        imageTexture = textureLoader.load(uploadedImage);
        imageTexture.wrapS = THREE.RepeatWrapping;
        imageTexture.wrapT = THREE.RepeatWrapping;
      }
      
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          const materialName = child.material.name || '';
          const meshName = child.name || '';
          
          console.log('Mesh:', child.name, '| Material:', child.material.name);
          
          // Clonar material para no afectar otras instancias
          child.material = child.material.clone();
          
          // Solo aplicar colores si fueron personalizados por el usuario
          // Mapeo según los nombres exactos de la consola
          // TT_checker_1024x1024_UV_GRID -> Cuerpo principal
          if (materialName === 'TT_checker_1024x1024_UV_GRID' || materialName === 'TT_checker_1024x1024_UV_GRID.001') {
            if (imageTexture && (meshName.includes('Cylinder') || meshName.includes('Cube002'))) {
              // Aplicar imagen solo al cuerpo principal
              child.material.map = imageTexture;
              child.material.needsUpdate = true;
            } else if (colors.body) {
              child.material.color = new THREE.Color(getColorFromValue(colors.body));
            }
            child.material.roughness = 0.3;
            child.material.metalness = 0.1;
          }
          // Material.001 -> Letras de botones (A, B, X, Y)
          else if (materialName === 'Material.001') {
            if (colors.buttons) {
              child.material.color = new THREE.Color(colors.buttons);
              child.material.emissive = new THREE.Color(colors.buttons);
              child.material.emissiveIntensity = 0.5;
            }
          }
          // glass -> Botón Xbox central
          else if (materialName === 'glass') {
            if (colors.led) {
              child.material.color = new THREE.Color(getColorFromValue(colors.led));
              child.material.emissive = new THREE.Color(getColorFromValue(colors.led));
              child.material.emissiveIntensity = 0.8;
            }
            child.material.transparent = true;
            child.material.opacity = 0.9;
          }
          // Grips (Circle003, Circle004, etc.)
          else if (meshName.includes('Circle003') || meshName.includes('Circle004') || 
                   meshName.includes('Circle006') || meshName.includes('Circle007')) {
            if (colors.grips) {
              child.material.color = new THREE.Color(getColorFromValue(colors.grips));
              child.material.roughness = 0.5;
            }
          }
          // Joysticks (Circle008, Circle009)
          else if (meshName.includes('Circle008') || meshName.includes('Circle009')) {
            if (colors.sticks) {
              child.material.color = new THREE.Color(getColorFromValue(colors.sticks));
              child.material.roughness = 0.4;
            }
          }
          // D-Pad (Circle010)
          else if (meshName.includes('Circle010')) {
            if (colors.dpad) {
              child.material.color = new THREE.Color(getColorFromValue(colors.dpad));
            }
          }
          // Gatillos (Cube003, Plane001)
          else if (meshName.includes('Cube003') || meshName.includes('Plane001')) {
            if (colors.triggers) {
              child.material.color = new THREE.Color(getColorFromValue(colors.triggers));
            }
          }
          // Bumpers (Cube005, Circle011)
          else if (meshName.includes('Cube005') || meshName.includes('Circle011')) {
            if (colors.bumpers) {
              child.material.color = new THREE.Color(getColorFromValue(colors.bumpers));
            }
          }
        }
      });
    }
  }, [scene, colors, uploadedImage]);

  return <primitive object={scene} scale={0.3} />;
};

const XboxControllerModel = ({ colors, uploadedImage, rotation = [0.1, 0, 0] }) => {
  return (
    <group rotation={rotation} position={[0, 0, 0]}>
      <Suspense fallback={<FallbackXboxModel colors={colors} />}>
        <XboxGLTFModel colors={colors} uploadedImage={uploadedImage} />
      </Suspense>
    </group>
  );
};

// Precargar modelo
useGLTF.preload('/models/xbox-controller7.glb');

export default XboxControllerModel;
