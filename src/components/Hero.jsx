import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiBeaker } from 'react-icons/hi2';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { RiMessage3Fill } from 'react-icons/ri';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-26">
      {/* Imagen Cyberpunk del Control - Desktop (izquierda, detrás del fondo) */}
      <div className="hidden md:block absolute inset-y-0 left-0 w-1/2 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1614294148960-9aa740632a87?q=80&w=1200&auto=format&fit=crop')`,
          }}
        />
        {/* Gradiente de desvanecimiento sutil hacia la derecha */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 1) 100%)'
          }}
        />
      </div>

      {/* Imagen Cyberpunk del Control - Mobile (superior) */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-1/2 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1614294148960-9aa740632a87?q=80&w=1200&auto=format&fit=crop')`,
          }}
        />
        {/* Gradiente de desvanecimiento hacia abajo */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 1) 100%)'
          }}
        />
      </div>

      {/* Fondo Cyberpunk con Cuadrículas (sobre la imagen) */}
      <div className="absolute inset-0 z-10">
        {/* Cuadrícula principal */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Cuadrícula secundaria */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 0, 255, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 255, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Líneas diagonales de profundidad */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0, 255, 255, 0.5) 40px, rgba(0, 255, 255, 0.5) 41px),
                repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255, 0, 255, 0.5) 40px, rgba(255, 0, 255, 0.5) 41px)
              `
            }}
          />
        </div>

        {/* Gradiente radial central sutil */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 255, 255, 0.05) 0%, transparent 50%)'
          }}
        />

        {/* Vignette elegante */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.8) 100%)'
          }}
        />

        {/* Líneas horizontales de acento */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-linear-to-r from-transparent via-pink-500/40 to-transparent" />
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-linear-to-r from-transparent via-pink-500/40 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenedor alineado a la derecha en desktop */}
        <div className="md:ml-auto md:max-w-2xl lg:max-w-3xl">
          {/* Título Principal - Alineado a la derecha en desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-right mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <div className="relative">
                <h1 className="text-6xl md:text-8xl font-bold text-white font-['Orbitron'] tracking-wider drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                  <span className="glow-text">Qstom</span>
                </h1>
                {/* Líneas decorativas */}
                <div className="absolute -left-8 top-1/2 w-6 h-px bg-linear-to-r from-cyan-500 to-transparent" />
                <div className="absolute -right-8 top-1/2 w-6 h-px bg-linear-to-l from-pink-500 to-transparent" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-cyan-400 font-['Orbitron'] tracking-widest uppercase mb-3 drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]"
            >
              Personalización de Alto Nivel
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto md:ml-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            >
              Transforma tus accesorios gaming en piezas únicas con tecnología de personalización 3D
            </motion.p>
          </motion.div>

          {/* Botones de Navegación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 mb-16"
          >
          {/* Laboratorio 3D */}
          <Link
            to="/lab"
            className="group relative"
          >
            <div className="relative px-8 py-4 border border-cyan-400 clip-corners overflow-hidden transition-all duration-300 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/50">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-cyan-400 font-bold uppercase text-sm tracking-wider font-['Orbitron'] flex items-center gap-2">
                <HiBeaker className="text-xl group-hover:scale-110 transition-transform" />
                Laboratorio 3D
              </span>
            </div>
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
          </Link>

          {/* Catálogo */}
          <Link
            to="/catalogo"
            className="group relative"
          >
            <div className="relative px-8 py-4 border border-pink-400 clip-corners overflow-hidden transition-all duration-300 hover:bg-pink-400/10 hover:shadow-lg hover:shadow-pink-400/50">
              <div className="absolute inset-0 bg-linear-to-r from-pink-500/0 via-pink-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-pink-400 font-bold uppercase text-sm tracking-wider font-['Orbitron'] flex items-center gap-2">
                <BsGrid3X3GapFill className="text-lg group-hover:scale-110 transition-transform" />
                Catálogo
              </span>
            </div>
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-pink-400" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-pink-400" />
          </Link>

          {/* Contacto */}
          <Link
            to="/contacto"
            className="group relative"
          >
            <div className="relative px-8 py-4 border border-purple-400 clip-corners overflow-hidden transition-all duration-300 hover:bg-purple-400/10 hover:shadow-lg hover:shadow-purple-400/50">
              <div className="absolute inset-0 bg-linear-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-purple-400 font-bold uppercase text-sm tracking-wider font-['Orbitron'] flex items-center gap-2">
                <RiMessage3Fill className="text-lg group-hover:scale-110 transition-transform" />
                Contacto
              </span>
            </div>
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-purple-400" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-purple-400" />
          </Link>
        </motion.div>

        {/* Stats Minimalistas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-3 gap-8 max-w-3xl mx-auto md:ml-auto"
        >
          {[
            { number: '50+', label: 'Proyectos', color: 'cyan' },
            { number: '100%', label: 'Personalizado', color: 'pink' },
            { number: '24/7', label: 'Soporte', color: 'purple' },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative inline-block mb-2">
                <div className={`text-3xl md:text-4xl font-bold text-${stat.color}-400 font-['Orbitron'] glow-text`}>
                  {stat.number}
                </div>
                <div className={`absolute -bottom-1 left-0 right-0 h-px bg-${stat.color}-400/50`} />
              </div>
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-['Orbitron']">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
        </div>
      </div>

      {/* Scroll Indicator Minimalista */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-linear-to-b from-transparent via-cyan-400 to-transparent" />
          <div className="w-2 h-2 border border-cyan-400 rotate-45" />
        </div>
      </motion.div>

      {/* CSS para clip-corners */}
      <style jsx>{`
        .clip-corners {
          clip-path: polygon(
            8px 0, 
            100% 0, 
            100% calc(100% - 8px), 
            calc(100% - 8px) 100%, 
            0 100%, 
            0 8px
          );
        }
      `}</style>
    </div>
  );
};

export default Hero;
