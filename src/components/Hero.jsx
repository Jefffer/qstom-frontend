import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-black via-purple-900/20 to-black pt-26">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Orbitron']">
            <span className="glow-text">.::: Qstom :::.</span>
            <br />
            <span className="text-2xl md:text-4xl glow-pink">
              PERSONALIZACIÓN DE ACCESORIOS
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Transforma tus accesorios gamer en obras de arte únicas.
           Estamos ubicados en Bogotá, próximamente en tu ciudad.
        </motion.p>

        {/* Laboratorio Banner - Nuevo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 max-w-2xl mx-auto"
        >
          <div className="bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-sm md:text-base">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎨
              </motion.span>
              <span className="text-cyan-300 font-semibold">
                ¡NUEVA FUNCIONALIDAD!
              </span>
              <span className="text-gray-300">
                Prueba nuestro <span className="text-pink-400 font-bold">Laboratorio 3D</span> para diseñar controles personalizados
              </span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              >
                ✨
              </motion.span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/lab"
            className="group relative px-8 py-4 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold uppercase overflow-hidden transition-all duration-300 hover:scale-105 glow-border btn-tech"
          >
            <span className="relative z-10 flex items-center gap-2">
              🔬 LABORATORIO 3D
            </span>
          </Link>

          <Link
            to="/catalog"
            className="group relative px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold uppercase overflow-hidden transition-all duration-300 hover:scale-105 glow-border btn-tech"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaRocket className="group-hover:rotate-12 transition-transform" />
              EXPLORA EL CATÁLOGO
            </span>
          </Link>

          <Link
            to="/contact"
            className="px-8 py-4 border border-pink-500 text-pink-400 font-bold uppercase hover:bg-pink-500/10 transition-all duration-300 hover:scale-105 btn-tech-alt"
          >
            COTIZA TU DISEÑO
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
        >
          {[
            { number: '50+', label: 'PROYECTOS' },
            { number: '100%', label: 'PERSONALIZADO' },
            { number: '24/7', label: 'SOPORTE' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 glow-text font-['Orbitron']">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-400 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
