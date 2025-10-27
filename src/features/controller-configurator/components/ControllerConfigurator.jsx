import { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import PS5ControllerModel from '../models/PS5ControllerModel';
import XboxControllerModel from '../models/XboxControllerModel';

const ControllerConfigurator = () => {
  const [controllerType, setControllerType] = useState('ps5');
  const [selectedPart, setSelectedPart] = useState('body');
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  // Colores predeterminados
  const [colors, setColors] = useState({
    body: '#ffffff',
    grips: '#1a1a1a',
    buttons: '#00FFFF',
    dpad: '#2a2a2a',
    sticks: '#1a1a1a',
    triggers: '#333333',
    touchpad: '#0a0a0a',
    bumpers: '#333333',
    led: '#00FFFF'
  });

  // Paleta de colores básicos y neón
  const colorPresets = {
    basic: ['#ffffff', '#000000', '#808080', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
    neon: ['#00FFFF', '#FF00FF', '#00FF00', '#FF0080', '#FFFF00', '#8000FF', '#FF6600', '#00FFAA']
  };

  // Partes configurables según el tipo de control
  const partsByType = {
    ps5: [
      { id: 'body', name: 'Cuerpo Principal' },
      { id: 'grips', name: 'Grips Laterales' },
      { id: 'buttons', name: 'Botones' },
      { id: 'dpad', name: 'D-Pad' },
      { id: 'sticks', name: 'Joysticks' },
      { id: 'triggers', name: 'Gatillos' },
      { id: 'touchpad', name: 'Touchpad' },
      { id: 'led', name: 'LED Strip' }
    ],
    xbox: [
      { id: 'body', name: 'Cuerpo Principal' },
      { id: 'grips', name: 'Grips Laterales' },
      { id: 'buttons', name: 'Botones' },
      { id: 'dpad', name: 'D-Pad' },
      { id: 'sticks', name: 'Joysticks' },
      { id: 'triggers', name: 'Gatillos' },
      { id: 'bumpers', name: 'Bumpers' },
      { id: 'led', name: 'LED Xbox' }
    ]
  };

  const handleColorChange = (color) => {
    setColors(prev => ({
      ...prev,
      [selectedPart]: color
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetColors = () => {
    setColors({
      body: '#ffffff',
      grips: '#1a1a1a',
      buttons: '#00FFFF',
      dpad: '#2a2a2a',
      sticks: '#1a1a1a',
      triggers: '#333333',
      touchpad: '#0a0a0a',
      bumpers: '#333333',
      led: '#00FFFF'
    });
    setUploadedImage(null);
  };

  const exportConfiguration = () => {
    const config = {
      controllerType,
      colors,
      uploadedImage,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qstom-controller-${controllerType}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-4 glow-text font-['Orbitron']">
            LABORATORIO QSTOM
          </h1>
          <p className="text-xl text-cyan-400">
            Personaliza tu control al máximo | Experimenta con colores 3D
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Canvas 3D - Columna Principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-linear-to-br from-gray-900 to-black rounded-lg overflow-hidden border border-cyan-500/30 relative"
            style={{ height: '600px' }}
          >
            <Canvas
              camera={{ position: [0, 0, 8], fov: 45 }}
              shadows
            >
              <Suspense fallback={null}>
                {/* Iluminación */}
                <ambientLight intensity={0.5} />
                <spotLight 
                  position={[10, 10, 10]} 
                  angle={0.15} 
                  penumbra={1} 
                  intensity={1}
                  castShadow
                />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00FFFF" />
                <pointLight position={[10, -10, -10]} intensity={0.5} color="#FF00FF" />

                {/* Modelo del Control */}
                {controllerType === 'ps5' ? (
                  <PS5ControllerModel colors={colors} />
                ) : (
                  <XboxControllerModel colors={colors} />
                )}

                {/* Controles de órbita */}
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={3}
                  maxDistance={10}
                />

                {/* Sombras */}
                <ContactShadows
                  position={[0, -2, 0]}
                  opacity={0.5}
                  scale={10}
                  blur={2}
                  far={4}
                />

                {/* Entorno */}
                <Environment preset="city" />
              </Suspense>
            </Canvas>

            {/* Indicador de controles */}
            <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded border border-cyan-500/50">
              <p className="text-xs text-cyan-400">
                🖱️ Click + Arrastrar: Rotar | Scroll: Zoom | Click derecho: Mover
              </p>
            </div>
          </motion.div>

          {/* Panel de Configuración */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Selector de Tipo de Control */}
            <div className="bg-gray-900 p-6 rounded-lg border border-cyan-500/30">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Tipo de Control</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setControllerType('ps5')}
                  className={`px-4 py-3 rounded font-bold transition-all ${
                    controllerType === 'ps5'
                      ? 'bg-cyan-500 text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  PS5
                </button>
                <button
                  onClick={() => setControllerType('xbox')}
                  className={`px-4 py-3 rounded font-bold transition-all ${
                    controllerType === 'xbox'
                      ? 'bg-green-500 text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  Xbox
                </button>
              </div>
            </div>

            {/* Selector de Parte */}
            <div className="bg-gray-900 p-6 rounded-lg border border-cyan-500/30">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Parte a Personalizar</h3>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                {partsByType[controllerType].map((part) => (
                  <button
                    key={part.id}
                    onClick={() => setSelectedPart(part.id)}
                    className={`px-3 py-2 rounded text-sm font-semibold transition-all ${
                      selectedPart === part.id
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {part.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Paleta de Colores */}
            <div className="bg-gray-900 p-6 rounded-lg border border-cyan-500/30">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Colores</h3>
              
              {/* Colores Básicos */}
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Básicos</p>
                <div className="grid grid-cols-8 gap-2">
                  {colorPresets.basic.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className="w-8 h-8 rounded border-2 border-gray-700 hover:border-white transition-all hover:scale-110"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Colores Neón */}
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Neón</p>
                <div className="grid grid-cols-8 gap-2">
                  {colorPresets.neon.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className="w-8 h-8 rounded border-2 border-gray-700 hover:border-white transition-all hover:scale-110"
                      style={{ 
                        backgroundColor: color,
                        boxShadow: `0 0 10px ${color}`
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Selector de Color Personalizado */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Color Personalizado</p>
                <input
                  type="color"
                  value={colors[selectedPart]}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-full h-12 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Subir Imagen */}
            <div className="bg-gray-900 p-6 rounded-lg border border-cyan-500/30">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Imagen Personalizada</h3>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition-colors"
              >
                {uploadedImage ? 'Cambiar Imagen' : 'Subir Imagen'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {uploadedImage && (
                <div className="mt-4">
                  <img src={uploadedImage} alt="Preview" className="w-full rounded border border-cyan-500/50" />
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="bg-gray-900 p-6 rounded-lg border border-cyan-500/30 space-y-3">
              <button
                onClick={resetColors}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors"
              >
                Resetear Todo
              </button>
              <button
                onClick={exportConfiguration}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors"
              >
                Exportar Configuración
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ControllerConfigurator;
