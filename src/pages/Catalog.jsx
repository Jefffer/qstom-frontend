import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGamepad, FaKeyboard, FaMouse, FaDesktop, FaFilter } from 'react-icons/fa';

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Consolas', 'Controles', 'Teclados', 'Ratones', 'Torres'];

  const catalogItems = [
    {
      id: 1,
      title: 'Control PS5 Cyberpunk Edition',
      category: 'Controles',
      price: '$150',
      technique: 'Aerografía',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop',
      description: 'Diseño cyberpunk con efectos neón y detalles geométricos en colores cyan y magenta',
      features: ['Acabado mate', 'Detalles luminiscentes', 'Protección UV'],
    },
    {
      id: 2,
      title: 'Teclado Mecánico Dragon Tech',
      category: 'Teclados',
      price: '$280',
      technique: 'Serigrafía + Aerografía',
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&h=600&fit=crop',
      description: 'Teclado mecánico 100% con diseño de dragón tecnológico y teclas custom',
      features: ['Switches personalizados', 'RGB integrado', 'Acabado premium'],
    },
    {
      id: 3,
      title: 'Xbox Series Elite Pro',
      category: 'Controles',
      price: '$200',
      technique: 'Aerografía',
      image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=600&fit=crop',
      description: 'Control elite con acabado metálico y detalles holográficos personalizados',
      features: ['Grips texturizados', 'Botones intercambiables', 'Garantía 1 año'],
    },
    {
      id: 4,
      title: 'Torre PC Neon City',
      category: 'Torres',
      price: '$450',
      technique: 'Aerografía + Vinilo',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=600&fit=crop',
      description: 'Case gaming con diseño de ciudad futurista y efectos de profundidad 3D',
      features: ['Panel lateral personalizado', 'Iluminación integrada', 'Diseño único'],
    },
    {
      id: 5,
      title: 'Mouse Wireless Phantom',
      category: 'Ratones',
      price: '$120',
      technique: 'Serigrafía',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=600&fit=crop',
      description: 'Mouse gaming con diseño fantasma y líneas tech minimalistas',
      features: ['16,000 DPI', 'Peso ajustable', 'Diseño ergonómico'],
    },
    {
      id: 6,
      title: 'Nintendo Switch Neon Sakura',
      category: 'Consolas',
      price: '$320',
      technique: 'Aerografía',
      image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&h=600&fit=crop',
      description: 'Consola personalizada con temática japonesa y flores de cerezo neón',
      features: ['Joy-cons incluidos', 'Dock personalizado', 'Protector incluido'],
    },
    {
      id: 7,
      title: 'Control PS5 Galaxy Warrior',
      category: 'Controles',
      price: '$175',
      technique: 'Aerografía',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop',
      description: 'Diseño espacial con galaxias y guerrero futurista',
      features: ['Textura antideslizante', 'Colores iridiscentes', 'LED custom'],
    },
    {
      id: 8,
      title: 'Teclado Matrix Code',
      category: 'Teclados',
      price: '$260',
      technique: 'Serigrafía',
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&h=600&fit=crop',
      description: 'Inspirado en Matrix con código verde y estética hacker',
      features: ['Teclas retroiluminadas', 'Macros programables', 'Cable detachable'],
    },
    {
      id: 9,
      title: 'Torre PC Mech Samurai',
      category: 'Torres',
      price: '$500',
      technique: 'Aerografía + 3D',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=600&fit=crop',
      description: 'Case con diseño de samurái robótico y elementos 3D aplicados',
      features: ['Elementos en relieve', 'Acabado metálico', 'Diseño exclusivo'],
    },
  ];

  const filteredItems = selectedCategory === 'Todos'
    ? catalogItems
    : catalogItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen pt-34 pb-20 px-4 bg-linear-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-['Orbitron']">
            <span className="glow-text">Catálogo</span> de Proyectos
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explora nuestra colección de diseños personalizados. Cada pieza es única y hecha a mano con técnicas profesionales.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center items-center mb-12"
        >
          <FaFilter className="text-cyan-400 text-xl" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-cyan-500 text-black glow-border'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-cyan-500/30'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Catalog Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gray-900/50 rounded-lg overflow-hidden border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-cyan-500/90 text-black text-sm font-bold rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Price Tag */}
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-2 bg-pink-500/90 text-white text-lg font-bold rounded-lg glow-pink">
                    {item.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 font-['Orbitron'] group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-pink-400 font-medium">
                    ✦ {item.technique}
                  </span>
                </div>

                <p className="text-gray-400 mb-4 text-sm">
                  {item.description}
                </p>

                {/* Features */}
                <div className="space-y-1 mb-4">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-cyan-400">•</span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full py-3 bg-linear-to-r from-cyan-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
                  Solicitar Cotización
                </button>
              </div>

              {/* Corner Decorations */}
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-pink-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-4xl mx-auto mt-16 p-6 bg-gray-900/50 border border-cyan-500/30 rounded-lg text-center"
      >
        <p className="text-gray-400">
          <span className="text-cyan-400 font-bold">Nota:</span> Todos los precios son estimados y pueden variar según la complejidad del diseño. 
          Los tiempos de entrega van de 7 a 21 días dependiendo del proyecto.
        </p>
      </motion.div>
    </div>
  );
};

export default Catalog;
