import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
    }, 6000); // 10 segundos por imagen
    return () => clearInterval(timer);
  }, [galleryItems.length, isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <div className="relative overflow-hidden bg-linear-to-b from-black via-purple-950/30 to-black">
      {/* Top Slanted Edge */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-black" style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)'
      }} />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -left-32 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-500 rounded-full blur-3xl"
      />

      <div className="relative z-10 py-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-['Orbitron']">
              <span className="glow-pink">GALERÍA</span>
            </h2>
            <div className="w-32 h-1 bg-linear-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-4" />
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Explora nuestros trabajos más destacados
            </p>
          </motion.div>
        </div>

        {/* Main Carousel */}
        <div className="relative mb-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="relative h-[500px] md:h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div 
                    className="relative h-full group cursor-pointer" 
                    onClick={() => setSelectedImage(galleryItems[currentSlide])}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    {/* Main Image with Irregular Shape */}
                    <div className="relative h-full overflow-hidden">
                      <motion.img
                        src={galleryItems[currentSlide].image}
                        alt={galleryItems[currentSlide].title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/50" />
                      
                      {/* Scan Line Effect */}
                      <motion.div
                        animate={{ y: ['0%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/10 to-transparent h-32 opacity-50"
                      />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex flex-wrap gap-3 mb-4">
                          <span className="px-4 py-2 bg-cyan-500/90 text-black font-bold text-sm btn-filter">
                            {galleryItems[currentSlide].category}
                          </span>
                          <span className="px-4 py-2 bg-pink-500/90 text-white font-bold text-sm btn-filter">
                            {galleryItems[currentSlide].technique}
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 font-['Orbitron'] glow-text">
                          {galleryItems[currentSlide].title}
                        </h3>
                        <p className="text-base md:text-lg text-gray-300 max-w-2xl">
                          {galleryItems[currentSlide].description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-pink-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {/* <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-cyan-500/50 text-white p-4 backdrop-blur-sm transition-all duration-300 btn-tech group"
                aria-label="Previous"
              >
                <FaChevronLeft className="text-2xl group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-pink-500/50 text-white p-4 backdrop-blur-sm transition-all duration-300 btn-tech group"
                aria-label="Next"
              >
                <FaChevronRight className="text-2xl group-hover:scale-110 transition-transform" />
              </button> */}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-12 h-3 bg-linear-to-r from-cyan-500 to-pink-500'
                    : 'w-3 h-3 bg-gray-600 hover:bg-gray-400'
                }`}
                style={{
                  clipPath: currentSlide === index 
                    ? 'polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)'
                    : 'polygon(20% 0, 80% 0, 100% 50%, 80% 100%, 20% 100%, 0 50%)'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                // whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => {
                  setCurrentSlide(index);
                  setSelectedImage(item);
                }}
                className={`relative cursor-pointer group overflow-hidden transition-all duration-300 ${
                  currentSlide === index ? 'ring-2 ring-cyan-500' : ''
                }`}
                style={{
                  clipPath: 'polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)'
                }}
              >
                <div className="relative aspect-square">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-linear-to-t from-black/80 to-transparent transition-opacity ${
                    currentSlide === index ? 'opacity-50' : 'opacity-80 group-hover:opacity-50'
                  }`} />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs font-bold font-['Orbitron'] truncate">
                      {item.title}
                    </p>
                  </div>
                  {currentSlide === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 border-2 border-cyan-500"
                      style={{
                        clipPath: 'polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)'
                      }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Slanted Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-black" style={{
        clipPath: 'polygon(0 50%, 100% 0, 100% 100%, 0 100%)'
      }} />

      {/* Modal for Selected Image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-gray-900/90 backdrop-blur-xl overflow-hidden border-2 border-cyan-500 glow-border"
              style={{
                clipPath: 'polygon(0 3%, 3% 0, 97% 0, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0 97%)'
              }}
            >
              {/* Close Button - Fixed Position */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-10 text-white bg-red-500/90 hover:bg-red-600 w-12 h-12 flex items-center justify-center transition-all duration-300 btn-corner-cut group"
                aria-label="Close"
              >
                <span className="text-2xl font-bold group-hover:rotate-90 transition-transform duration-300">✕</span>
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-auto">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-transparent to-gray-900/50" />
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex gap-3 mb-6">
                    <span className="px-4 py-2 bg-cyan-500/80 text-black font-bold text-sm btn-filter">
                      {selectedImage.category}
                    </span>
                    <span className="px-4 py-2 bg-pink-500/80 text-white font-bold text-sm btn-filter">
                      {selectedImage.technique}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Orbitron'] glow-text">
                    {selectedImage.title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {selectedImage.description}
                  </p>

                  <div className="flex gap-4">
                    <button className="flex-1 px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold transition-all duration-300 hover:scale-105 btn-tech">
                      Ver Más Detalles
                    </button>
                  </div>
                </div>
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-cyan-500" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-pink-500" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
