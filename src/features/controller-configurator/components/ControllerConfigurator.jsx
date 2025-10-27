import { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="w-full h-full bg-transparent text-white overflow-hidden pt-104" style={{ height: 'calc(100vh - 104px)'}}>
      {/* Canvas 3D - Pantalla Completa */}
      <div 
        className="absolute inset-0 left-0 right-0 md:right-96 bottom-[40vh] md:bottom-0"
        style={{ 
          top: '104px',
          bottom: 0
        }}
      >
        {/* Fondo 3D cyberpunk - capa detrás */}
        <div className="absolute inset-0 h-full grid-3d-background" style={{ zIndex: 0 }}>
          <div className="ambient-light"></div>
          <div className="vignette"></div>
        </div>

        {/* Canvas encima del fondo con fondo transparente */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            shadows
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent' }}
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
              minDistance={1}
              maxDistance={25}
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
        </div>

        {/* Logo/Título inferior derecha */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute bottom-4 right-4 z-10 hidden md:block"
        >
          <h1 className="text-2xl md:text-3xl font-bold glow-text font-['Orbitron']">
            Qstom LAB
          </h1>
        </motion.div>

        {/* Indicador de controles - inferior izquierdo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/50 hidden md:block z-10"
        >
          <p className="text-xs text-cyan-400">
            🖱️ Click + Arrastrar: Rotar | Scroll: Zoom | Click derecho: Mover
          </p>
        </motion.div>
      </div>

      {/* Sidebar Derecha - Desktop - Siempre visible */}
      <div
        className="hidden md:block fixed right-0 w-96 bg-black/95 backdrop-blur-md border-l border-cyan-500/50 shadow-2xl shadow-cyan-500/20 overflow-y-auto z-20 custom-scrollbar"
        style={{ top: '104px', height: 'calc(100vh - 104px)' }}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="mb-6 pb-4 border-b border-cyan-500/30">
            <h2 className="text-2xl font-bold glow-text font-['Orbitron']">
              CONTROLES
            </h2>
          </div>

              {/* Selector de Tipo de Control */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-cyan-400 font-['Orbitron']">Tipo de Control</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setControllerType('ps5')}
                    className={`px-4 py-3 font-bold transition-colors border btn-tech uppercase ${
                      controllerType === 'ps5'
                        ? 'bg-linear-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 glow-border'
                        : 'bg-gray-900 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500'
                    }`}
                  >
                    PS5
                  </button>
                  <button
                    onClick={() => setControllerType('xbox')}
                    className={`px-4 py-3 font-bold transition-colors border btn-tech uppercase ${
                      controllerType === 'xbox'
                        ? 'bg-linear-to-r from-green-500 to-emerald-600 text-white border-green-400 glow-border'
                        : 'bg-gray-900 border-cyan-500/30 text-cyan-400 hover:bg-green-500/20 hover:border-green-500'
                    }`}
                  >
                    Xbox
                  </button>
                </div>
              </div>

              {/* Selector de Parte */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-cyan-400 font-['Orbitron']">Parte a Personalizar</h3>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {partsByType[controllerType].map((part) => (
                    <button
                      key={part.id}
                      onClick={() => setSelectedPart(part.id)}
                      className={`px-3 py-2 text-sm font-semibold transition-colors border btn-tech uppercase ${
                        selectedPart === part.id
                          ? 'bg-pink-500 text-white border-pink-400 glow-border'
                          : 'bg-gray-900 border-cyan-500/30 text-gray-300 hover:bg-pink-500/20 hover:border-pink-500'
                      }`}
                    >
                      {part.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paleta de Colores */}
              <div className="space-y-3 border border-cyan-500/30 p-4 rounded-lg bg-gray-900/30">
                <h3 className="text-lg font-bold text-cyan-400 font-['Orbitron']">Colores</h3>
                
                {/* Colores Básicos */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">Básicos</p>
                  <div className="grid grid-cols-8 gap-2">
                    {colorPresets.basic.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className="w-8 h-8 rounded border border-gray-700 hover:border-cyan-400 transition-colors"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Colores Neón */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">Neón</p>
                  <div className="grid grid-cols-8 gap-2">
                    {colorPresets.neon.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className="w-8 h-8 rounded border border-gray-700 hover:border-cyan-400 transition-colors"
                        style={{ 
                          backgroundColor: color,
                          boxShadow: `0 0 15px ${color}`
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
                    className="w-full h-12 rounded-lg cursor-pointer border border-cyan-500/30"
                  />
                  <p className="text-xs text-cyan-400 mt-2 text-center font-mono">{colors[selectedPart]}</p>
                </div>
              </div>

              {/* Subir Imagen */}
              <div className="space-y-3 border border-purple-500/30 p-4 rounded-lg bg-gray-900/30">
                <h3 className="text-lg font-bold text-purple-400 font-['Orbitron']">Imagen Personalizada</h3>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-linear-to-r from-purple-500 to-pink-600 text-white font-bold py-3 px-4 border border-purple-400 transition-colors hover:brightness-110 glow-border btn-tech uppercase"
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
                    <img src={uploadedImage} alt="Preview" className="w-full rounded-lg border border-purple-500/50" />
                  </div>
                )}
              </div>

              {/* Acciones */}
              <div className="space-y-3 sticky bottom-0 bg-black/95 pt-4 pb-2">
                <button
                  onClick={resetColors}
                  className="w-full border border-red-500 text-red-400 font-bold py-3 px-4 hover:bg-red-500/20 hover:border-red-400 transition-colors btn-tech-alt uppercase"
                >
                  🔄 Resetear Todo
                </button>
                <button
                  onClick={exportConfiguration}
                  className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-4 border border-cyan-400 transition-colors hover:brightness-110 glow-border btn-tech uppercase"
                >
                  💾 Exportar Configuración
                </button>
              </div>
            </div>
          </div>

      {/* Panel inferior - Mobile */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-cyan-500/50 overflow-y-auto z-20 custom-scrollbar" style={{ height: '40vh' }}>
        <div className="p-3 space-y-3">
          {/* Selector de Tipo de Control */}
          <div>
            <h3 className="text-xs font-bold mb-1.5 text-cyan-400 font-['Orbitron']">Tipo de Control</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setControllerType('ps5')}
                className={`px-2 py-1.5 text-xs font-bold transition-colors border btn-tech uppercase ${
                  controllerType === 'ps5'
                    ? 'bg-linear-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 glow-border'
                    : 'bg-gray-900 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500'
                }`}
              >
                PS5
              </button>
              <button
                onClick={() => setControllerType('xbox')}
                className={`px-2 py-1.5 text-xs font-bold transition-colors border btn-tech uppercase ${
                  controllerType === 'xbox'
                    ? 'bg-linear-to-r from-green-500 to-emerald-600 text-white border-green-400 glow-border'
                    : 'bg-gray-900 border-cyan-500/30 text-cyan-400 hover:bg-green-500/20 hover:border-green-500'
                }`}
              >
                Xbox
              </button>
            </div>
          </div>

          {/* Selector de Parte */}
          <div>
            <h3 className="text-xs font-bold mb-1.5 text-cyan-400 font-['Orbitron']">Parte</h3>
            <div className="grid grid-cols-3 gap-1.5">
              {partsByType[controllerType].map((part) => (
                <button
                  key={part.id}
                  onClick={() => setSelectedPart(part.id)}
                  className={`px-1.5 py-1.5 text-[10px] font-semibold transition-colors border btn-tech uppercase ${
                    selectedPart === part.id
                      ? 'bg-pink-500 text-white border-pink-400 glow-border'
                      : 'bg-gray-900 border-cyan-500/30 text-gray-300 hover:bg-pink-500/20 hover:border-pink-500'
                  }`}
                >
                  {part.name}
                </button>
              ))}
            </div>
          </div>

          {/* Paleta de Colores Compacta */}
          <div>
            <h3 className="text-xs font-bold mb-1.5 text-cyan-400 font-['Orbitron']">Colores</h3>
            <div className="grid grid-cols-10 gap-1 mb-2">
              {[...colorPresets.basic, ...colorPresets.neon].map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className="w-full aspect-square rounded border border-gray-700 hover:border-cyan-400 transition-colors"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <input
              type="color"
              value={colors[selectedPart]}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-8 rounded-lg cursor-pointer border border-cyan-500/30"
            />
          </div>

          {/* Acciones Compactas */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={resetColors}
              className="border border-red-500 text-red-400 text-xs font-bold py-1.5 px-2 hover:bg-red-500/20 hover:border-red-400 transition-colors btn-tech-alt uppercase"
            >
              🔄 Resetear
            </button>
            <button
              onClick={exportConfiguration}
              className="bg-linear-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold py-1.5 px-2 border border-cyan-400 transition-colors hover:brightness-110 glow-border btn-tech uppercase"
            >
              💾 Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
};

export default ControllerConfigurator;
