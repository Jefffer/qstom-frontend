import { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { TbReload } from 'react-icons/tb';
import { HiDownload } from 'react-icons/hi';
import PS5ControllerModel from '../models/PS5ControllerModel';
import XboxControllerModel, { getXboxMeshNames } from '../models/XboxControllerModel';

const ControllerConfigurator = () => {
  const [controllerType, setControllerType] = useState('ps5');
  const [selectedPart, setSelectedPart] = useState('body');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [testMeshName, setTestMeshName] = useState(null); // Para testing de meshes
  const fileInputRef = useRef(null);

  // Colores predeterminados - null para usar colores originales del modelo
  const [colors, setColors] = useState({
    body: null,           
    frontLowerBody: null, 
    backBody: null,       
    grips: null,          
    buttons: null,        
    dpad: null,           
    sticks: null,         
    triggers: null,       
    touchpad: null,       
    bumpers: null,        
    led: null             
  });

  // Paleta de colores elegantes y patrones
  const colorPresets = {
    solid: [
      '#ffffff', '#000000', '#1a1a1a', '#2d2d2d', 
      '#c0c0c0', '#8b4513', '#2c3e50', '#34495e',
      '#7f8c8d', '#95a5a6', '#bdc3c7', '#ecf0f1',
      '#e74c3c', '#3498db', '#9b59b6', '#1abc9c'
    ],
    metallic: [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    ],
    patterns: [
      // Animal Print - Leopardo
      `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.4'%3E%3Cpath d='M10 10 Q 15 5 20 10 T 30 10' stroke='%23000' fill='%23d4a574'/%3E%3Cellipse cx='15' cy='15' rx='8' ry='6' transform='rotate(20 15 15)'/%3E%3Cellipse cx='35' cy='20' rx='7' ry='5' transform='rotate(-15 35 20)'/%3E%3Cellipse cx='25' cy='35' rx='6' ry='8' transform='rotate(30 25 35)'/%3E%3Cellipse cx='45' cy='40' rx='7' ry='6' transform='rotate(-20 45 40)'/%3E%3C/g%3E%3C/svg%3E") #d4a574`,
      // Camuflaje Digital
      `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Crect x='0' y='0' width='20' height='20' fill='%233d5a3d'/%3E%3Crect x='20' y='0' width='20' height='20' fill='%235a7a5a'/%3E%3Crect x='40' y='0' width='20' height='20' fill='%232d3d2d'/%3E%3Crect x='0' y='20' width='20' height='20' fill='%235a7a5a'/%3E%3Crect x='20' y='20' width='20' height='20' fill='%232d3d2d'/%3E%3Crect x='40' y='20' width='20' height='20' fill='%233d5a3d'/%3E%3C/g%3E%3C/svg%3E") #3d5a3d`,
      // Zebra
      `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M0 10 Q 30 5 60 10 L 60 20 Q 30 15 0 20 Z' fill='%23000'/%3E%3Cpath d='M0 30 Q 30 25 60 30 L 60 40 Q 30 35 0 40 Z' fill='%23000'/%3E%3Cpath d='M0 50 Q 30 45 60 50 L 60 60 Q 30 55 0 60 Z' fill='%23000'/%3E%3C/g%3E%3C/svg%3E") #ffffff`,
      // Camuflaje Bosque
      `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M0 0 L 30 0 L 25 30 L 0 25 Z' fill='%2352684d'/%3E%3Cpath d='M30 0 L 60 5 L 55 35 L 25 30 Z' fill='%233d5a3d'/%3E%3Cpath d='M60 5 L 90 0 L 85 30 L 55 35 Z' fill='%232d3d2d'/%3E%3Cpath d='M0 25 L 25 30 L 20 60 L 0 55 Z' fill='%233d5a3d'/%3E%3C/g%3E%3C/svg%3E") #3d5a3d`,
      // Carbon Fiber
      `url("data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23333'%3E%3Cpath d='M0 0h3v3H0zM3 3h3v3H3z'/%3E%3C/g%3E%3C/svg%3E") #1a1a1a`,
      // Tiger Stripes
      `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M0 10 L 15 8 L 18 15 L 10 20 L 0 18 Z' fill='%23000'/%3E%3Cpath d='M25 5 L 40 3 L 43 12 L 30 18 L 25 12 Z' fill='%23000'/%3E%3Cpath d='M50 8 L 65 6 L 68 15 L 55 22 L 50 15 Z' fill='%23000'/%3E%3Cpath d='M0 35 L 12 33 L 15 42 L 8 48 L 0 45 Z' fill='%23000'/%3E%3C/g%3E%3C/svg%3E") #d4822f`,
      // Hex Camo
      `url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234a5f4a'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66z'/%3E%3C/g%3E%3C/svg%3E") #2d3d2d`,
      // Snake Skin
      `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cellipse cx='10' cy='10' rx='8' ry='6' fill='%23000' opacity='0.3'/%3E%3Cellipse cx='30' cy='10' rx='7' ry='5' fill='%23000' opacity='0.3'/%3E%3Cellipse cx='10' cy='30' rx='7' ry='5' fill='%23000' opacity='0.3'/%3E%3Cellipse cx='30' cy='30' rx='8' ry='6' fill='%23000' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E") #8b8680`
    ]
  };

  // Partes configurables según el tipo de control
  const partsByType = {
    ps5: [
      { id: 'body', name: 'Frontal Superior' },
      { id: 'frontLowerBody', name: 'Frontal Inferior' },
      { id: 'backBody', name: 'Cuerpo Trasero' },
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
        // La imagen se aplicará automáticamente en el modelo 3D
        // No modificamos el estado de colors
      };
      reader.readAsDataURL(file);
    }
  };

  const resetColors = () => {
    setColors({
      body: null,           
      frontLowerBody: null, 
      backBody: null,       
      grips: null,          
      buttons: null,        
      dpad: null,           
      sticks: null,         
      triggers: null,       
      touchpad: null,       
      bumpers: null,        
      led: null             
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
              <PS5ControllerModel colors={colors} uploadedImage={uploadedImage} />
            ) : (
              <XboxControllerModel colors={colors} uploadedImage={uploadedImage} testMeshName={testMeshName} />
            )}

            {/* Controles de órbita */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
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
          {/* <div className="mb-6 pb-4 border-b border-cyan-500/30">
            <h2 className="text-2xl font-bold glow-text font-['Orbitron']">
              CONTROLES
            </h2>
          </div> */}

              {/* Selector de Tipo de Control */}
              <div className="space-y-3">
                <h3 className="text-2xl text-cyan-400 font-['Orbitron'] tracking-widest uppercase">Tipo de Control</h3>
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
                <h3 className="text-2xl text-cyan-400 font-['Orbitron'] tracking-widest uppercase">Parte a Personalizar</h3>
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

              {/* MODO TEST - Solo para Xbox - Identificar Meshes */}
              {controllerType === 'xbox' && (
                <div className="space-y-3 border-2 border-yellow-500/50 p-4 rounded-lg bg-yellow-900/20">
                  <h3 className="text-xl text-yellow-400 font-['Orbitron'] tracking-widest uppercase">🔍 Modo Test - Meshes</h3>
                  <p className="text-xs text-yellow-300 mb-2">Click en un mesh para resaltarlo en ROJO en el modelo 3D</p>
                  <div className="grid grid-cols-1 gap-1 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                    {getXboxMeshNames().map((meshName) => (
                      <button
                        key={meshName}
                        onClick={() => setTestMeshName(testMeshName === meshName ? null : meshName)}
                        className={`px-2 py-1.5 text-xs font-mono transition-colors border btn-tech text-left ${
                          testMeshName === meshName
                            ? 'bg-red-500 text-white border-red-400 glow-border'
                            : 'bg-gray-900 border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/20 hover:border-yellow-500'
                        }`}
                      >
                        {meshName}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setTestMeshName(null)}
                    className="w-full border border-yellow-500 text-yellow-400 font-bold py-2 px-3 hover:bg-yellow-500/20 transition-colors btn-tech-alt uppercase text-sm"
                  >
                    Limpiar Selección
                  </button>
                </div>
              )}

              {/* Paleta de Colores */}
              <div className="space-y-3 border border-cyan-500/30 p-4 rounded-lg bg-gray-900/30">
                <h3 className="text-xl text-cyan-400 font-['Orbitron'] tracking-widest uppercase">Colores</h3>
                
                {/* Colores Sólidos */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">Sólidos</p>
                  <div className="grid grid-cols-8 gap-2">
                    {colorPresets.solid.map((color, index) => (
                      <button
                        key={`solid-${index}`}
                        onClick={() => handleColorChange(color)}
                        className="w-8 h-8 rounded border border-gray-700 hover:border-cyan-400 transition-colors"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Colores Metálicos/Gradientes */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">Metálicos & Gradientes</p>
                  <div className="grid grid-cols-8 gap-2">
                    {colorPresets.metallic.map((gradient, index) => (
                      <button
                        key={`metallic-${index}`}
                        onClick={() => handleColorChange(gradient)}
                        className="w-8 h-8 rounded border border-gray-700 hover:border-cyan-400 transition-colors"
                        style={{ background: gradient }}
                        title="Gradiente metálico"
                      />
                    ))}
                  </div>
                </div>

                {/* Patrones Especiales */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">Patrones Especiales</p>
                  <div className="grid grid-cols-8 gap-2">
                    {colorPresets.patterns.map((pattern, index) => (
                      <button
                        key={`pattern-${index}`}
                        onClick={() => handleColorChange(pattern)}
                        className="w-8 h-8 rounded border border-gray-700 hover:border-cyan-400 transition-colors"
                        style={{ background: pattern, backgroundSize: 'cover' }}
                        title={['Leopardo', 'Camo Digital', 'Zebra', 'Camo Bosque', 'Fibra Carbono', 'Tigre', 'Hex Camo', 'Serpiente'][index]}
                      />
                    ))}
                  </div>
                </div>

                {/* Selector de Color Personalizado */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">Color Personalizado</p>
                  <input
                    type="color"
                    value={colors[selectedPart]?.startsWith('#') ? colors[selectedPart] : '#ffffff'}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-full h-12 rounded-lg cursor-pointer border border-cyan-500/30"
                  />
                  <p className="text-xs text-cyan-400 mt-2 text-center font-mono break-all">
                    {colors[selectedPart]?.startsWith('#') ? colors[selectedPart] : 'Patrón/Imagen'}
                  </p>
                </div>
              </div>

              {/* Subir Imagen */}
              <div className="space-y-3 border border-purple-500/30 p-4 rounded-lg bg-gray-900/30">
                <h3 className="text-xl text-purple-400 font-['Orbitron'] tracking-widest uppercase">Imagen Personalizada</h3>
                <p className="text-xs text-gray-400 mb-2">La imagen se aplicará al cuerpo principal</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-linear-to-r from-purple-500 to-pink-600 text-white font-bold py-3 px-4 border border-purple-400 transition-colors hover:brightness-110 glow-border btn-tech uppercase tracking-wider"
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
                  className="w-full border border-red-500 text-red-400 font-bold py-3 px-4 hover:bg-red-500/20 hover:border-red-400 transition-colors btn-tech-alt uppercase tracking-wider group"
                >
                  <span className="flex items-center justify-center gap-2">
                    <TbReload className="text-xl group-hover:rotate-180 transition-transform duration-500" />
                    Resetear Todo
                  </span>
                </button>
                <button
                  onClick={exportConfiguration}
                  className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-4 border border-cyan-400 transition-colors hover:brightness-110 glow-border btn-tech uppercase tracking-wider group"
                >
                  <span className="flex items-center justify-center gap-2">
                    <HiDownload className="text-xl group-hover:translate-y-1 transition-transform" />
                    Exportar Configuración
                  </span>
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
            <h3 className="text-xs font-bold mb-1.5 text-cyan-400 font-['Orbitron']">Colores & Patrones</h3>
            
            {/* Sólidos */}
            <p className="text-[10px] text-gray-500 mb-1">Sólidos</p>
            <div className="grid grid-cols-8 gap-1 mb-2">
              {colorPresets.solid.slice(0, 8).map((color, index) => (
                <button
                  key={`mobile-solid-${index}`}
                  onClick={() => handleColorChange(color)}
                  className="w-full aspect-square rounded border border-gray-700 hover:border-cyan-400 transition-colors"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Gradientes */}
            <p className="text-[10px] text-gray-500 mb-1">Metálicos</p>
            <div className="grid grid-cols-8 gap-1 mb-2">
              {colorPresets.metallic.slice(0, 8).map((gradient, index) => (
                <button
                  key={`mobile-metallic-${index}`}
                  onClick={() => handleColorChange(gradient)}
                  className="w-full aspect-square rounded border border-gray-700 hover:border-cyan-400 transition-colors"
                  style={{ background: gradient }}
                />
              ))}
            </div>

            {/* Patrones */}
            <p className="text-[10px] text-gray-500 mb-1">Patrones</p>
            <div className="grid grid-cols-8 gap-1 mb-2">
              {colorPresets.patterns.map((pattern, index) => (
                <button
                  key={`mobile-pattern-${index}`}
                  onClick={() => handleColorChange(pattern)}
                  className="w-full aspect-square rounded border border-gray-700 hover:border-cyan-400 transition-colors"
                  style={{ background: pattern, backgroundSize: 'cover' }}
                />
              ))}
            </div>

            {/* Selector de color */}
            <input
              type="color"
              value={colors[selectedPart]?.startsWith('#') ? colors[selectedPart] : '#ffffff'}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-8 rounded-lg cursor-pointer border border-cyan-500/30"
            />
          </div>

          {/* Acciones Compactas */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={resetColors}
              className="border border-red-500 text-red-400 text-xs font-bold py-1.5 px-2 hover:bg-red-500/20 hover:border-red-400 transition-colors btn-tech-alt uppercase group"
            >
              <span className="flex items-center justify-center gap-1">
                <TbReload className="text-sm group-hover:rotate-180 transition-transform duration-500" />
                Resetear
              </span>
            </button>
            <button
              onClick={exportConfiguration}
              className="bg-linear-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold py-1.5 px-2 border border-cyan-400 transition-colors hover:brightness-110 glow-border btn-tech uppercase group"
            >
              <span className="flex items-center justify-center gap-1">
                <HiDownload className="text-sm group-hover:translate-y-0.5 transition-transform" />
                Exportar
              </span>
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
