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
const PS5GLTFModel = ({ colors, uploadedImage }) => {
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
      // Crear textura desde imagen si existe
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
          
          // Clone material to avoid affecting other instances
          child.material = child.material.clone();
          
          // Helper function to extract color from gradient/pattern or use solid color
          const getColorFromValue = (colorValue) => {
            if (!colorValue) return '#ffffff';
            
            // Si es un data URI de SVG pattern, extraer color de fondo o usar blanco
            if (colorValue.includes('data:image/svg')) {
              const match = colorValue.match(/#([0-9a-fA-F]{6})/);
              return match ? `#${match[1]}` : '#ffffff';
            }
            
            // Si es un gradiente lineal, extraer el primer color
            if (colorValue.includes('linear-gradient')) {
              const match = colorValue.match(/#([0-9a-fA-F]{6})/);
              return match ? `#${match[1]}` : '#ffffff';
            }
            
            // Si es un color hex válido, usarlo directamente
            if (colorValue.match(/^#[0-9a-fA-F]{6}$/)) {
              return colorValue;
            }
            
            return '#ffffff';
          };
          
          // Mapeo basado en nombres de materiales del modelo GLTF
          // BODY FRONTAL SUPERIOR: Object_10 (mesh name)
          if (meshName === 'Object_10') {
            if (imageTexture) {
              child.material.map = imageTexture;
              child.material.needsUpdate = true;
            } else if (colors.body) {
              child.material.map = null;
              child.material.color = new THREE.Color(getColorFromValue(colors.body));
              child.material.needsUpdate = true;
            }
          }
          // BODY FRONTAL INFERIOR: front_body.001
          else if (materialName === 'front_body.001') {
            if (imageTexture) {
              child.material.map = imageTexture;
              child.material.needsUpdate = true;
            } else if (colors.frontLowerBody || colors.body) {
              child.material.map = null;
              child.material.color = new THREE.Color(getColorFromValue(colors.frontLowerBody || colors.body));
              child.material.needsUpdate = true;
            }
          }
          // BODY TRASERO: VRayMtl55
          else if (materialName.includes('VRayMtl55')) {
            if (colors.backBody || colors.body) {
              child.material.color = new THREE.Color(getColorFromValue(colors.backBody || colors.body));
            }
          }
          // GRIPS: material_0
          else if (materialName === 'material_0') {
            if (colors.grips) {
              child.material.color = new THREE.Color(getColorFromValue(colors.grips));
            }
          }
          // BUTTONS (face buttons): Material.002
          else if (materialName === 'Material.002') {
            if (colors.buttons) {
              const btnColor = getColorFromValue(colors.buttons);
              child.material.color = new THREE.Color(btnColor);
              child.material.emissive = new THREE.Color(btnColor);
              child.material.emissiveIntensity = 0.1;
            }
          }
          // DPAD: Material.009
          else if (materialName === 'Material.009') {
            if (colors.dpad) {
              child.material.color = new THREE.Color(getColorFromValue(colors.dpad));
            }
          }
          // STICKS: VRayMtl33, Material.004
          else if (materialName === 'VRayMtl33' ||
                   materialName === 'Material.004') {
            if (colors.sticks) {
              child.material.color = new THREE.Color(getColorFromValue(colors.sticks));
            }
          }
          // TRIGGERS: VRayMtl37, 1001, 1001.002
          else if (materialName === 'VRayMtl37' ||
                   materialName.includes('1001')) {
            if (colors.triggers) {
              child.material.color = new THREE.Color(getColorFromValue(colors.triggers));
            }
          }
          // TOUCHPAD: Material.006, Material.008, Material.010
          else if (materialName === 'Material.006' || 
                   materialName === 'Material.008' || 
                   materialName === 'Material.010') {
            if (colors.touchpad) {
              child.material.color = new THREE.Color(getColorFromValue(colors.touchpad));
            }
          }
          // LED: Material.005, Material.007
          else if (materialName === 'Material.005' || 
                   materialName === 'Material.007') {
            if (colors.led) {
              const ledColor = getColorFromValue(colors.led);
              child.material.color = new THREE.Color(ledColor);
              child.material.emissive = new THREE.Color(ledColor);
              child.material.emissiveIntensity = 0.6;
            }
          }
          // DEFAULT: Material
          else if (materialName === 'Material') {
            if (colors.body) {
              child.material.color = new THREE.Color(getColorFromValue(colors.body));
            }
          }
        }
      });
    }
  }, [scene, colors, uploadedImage]);

  return <primitive object={scene} scale={1} />;
};

const PS5ControllerModel = ({ colors, uploadedImage, rotation = [0.1, 0, 0] }) => {
  return (
    <group rotation={rotation} position={[0, 0, 0]}>
      <Suspense fallback={<FallbackPS5Model colors={colors} />}>
        <PS5GLTFModel colors={colors} uploadedImage={uploadedImage} />
      </Suspense>
    </group>
  );
};

// Precargar modelo
useGLTF.preload('/models/ps5-controller3.glb');

export default PS5ControllerModel;
