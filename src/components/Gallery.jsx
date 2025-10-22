import { motion } from 'framer-motion';
import { useState } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Control PS5 Neon',
      category: 'Controles',
      technique: 'Aerografía',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop',
      description: 'Diseño cyberpunk con efectos neón y detalles geométricos',
    },
    {
      id: 2,
      title: 'Teclado RGB Custom',
      category: 'Teclados',
      technique: 'Serigrafía',
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&h=600&fit=crop',
      description: 'Teclado mecánico con diseño futurista y teclas personalizadas',
    },
    {
      id: 3,
      title: 'Xbox Series X Elite',
      category: 'Controles',
      technique: 'Aerografía',
      image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=600&fit=crop',
      description: 'Control elite con acabado metálico y detalles holográficos',
    },
    {
      id: 4,
      title: 'Torre PC Dragon',
      category: 'Torres',
      technique: 'Aerografía',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=600&fit=crop',
      description: 'Case gaming con diseño de dragón y efectos 3D',
    },
    {
      id: 5,
      title: 'Mouse Wireless Tech',
      category: 'Ratones',
      technique: 'Serigrafía',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=600&fit=crop',
      description: 'Mouse gaming con diseño minimalista y líneas tech',
    },
    {
      id: 6,
      title: 'Nintendo Switch Anime',
      category: 'Consolas',
      technique: 'Aerografía',
      image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&h=600&fit=crop',
      description: 'Consola personalizada con temática anime y colores vibrantes',
    },
  ];

  return (
    <div className="py-20 px-4 bg-linear-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 255, 0.1) 2px,
            rgba(0, 255, 255, 0.1) 4px
          )`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Orbitron']">
            <span className="glow-pink">Galería de Proyectos</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explora algunos de nuestros trabajos más destacados
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(item)}
              className="group cursor-pointer relative overflow-hidden rounded-lg border-2 border-cyan-500/30 hover:border-pink-500 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs bg-cyan-500/80 rounded">
                    {item.category}
                  </span>
                  <span className="px-2 py-1 text-xs bg-pink-500/80 rounded">
                    {item.technique}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 font-['Orbitron']">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Selected Image */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-gray-900 rounded-lg overflow-hidden border-2 border-cyan-500 glow-border"
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-6">
              <h3 className="text-3xl font-bold text-white mb-2 font-['Orbitron']">
                {selectedImage.title}
              </h3>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 text-sm bg-cyan-500/80 rounded text-white">
                  {selectedImage.category}
                </span>
                <span className="px-3 py-1 text-sm bg-pink-500/80 rounded text-white">
                  {selectedImage.technique}
                </span>
              </div>
              <p className="text-gray-300 text-lg">
                {selectedImage.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-red-500/80 hover:bg-red-500 w-10 h-10 flex items-center justify-center transition-colors duration-300 btn-corner-cut"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
