import { motion } from 'framer-motion';
import { FaKeyboard, FaMouse, FaGamepad, FaDesktop, FaPaintBrush, FaPrint } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaGamepad />,
      title: 'Consolas',
      description: 'PlayStation, Xbox, Nintendo - Diseños únicos para tu consola',
      color: 'cyan',
    },
    {
      icon: <FaGamepad />,
      title: 'Controles',
      description: 'Mandos personalizados con detalles precisos y acabados profesionales',
      color: 'pink',
    },
    {
      icon: <FaKeyboard />,
      title: 'Teclados',
      description: 'Teclados mecánicos con diseños que destacan tu setup',
      color: 'purple',
    },
    {
      icon: <FaMouse />,
      title: 'Ratones',
      description: 'Mouse gaming con acabados personalizados y texturas premium',
      color: 'blue',
    },
    {
      icon: <FaDesktop />,
      title: 'Torres PC',
      description: 'Cases y torres con diseños cyberpunk y temáticas gaming',
      color: 'green',
    },
    {
      icon: <FaPaintBrush />,
      title: 'Aerografía',
      description: 'Técnica de pintura profesional para detalles intrincados',
      color: 'yellow',
    },
  ];

  const colorMap = {
    cyan: 'from-cyan-500 to-blue-500',
    pink: 'from-pink-500 to-purple-500',
    purple: 'from-purple-500 to-indigo-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-teal-500',
    yellow: 'from-yellow-500 to-orange-500',
  };

  return (
    <div className="py-20 px-4 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
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
            <span className="glow-text">Nuestros Servicios</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Personalizamos cualquier accesorio gamer con técnicas profesionales
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group"
            >
              <div className="bg-linear-to-br from-gray-900 to-black border border-cyan-500/30 rounded-lg p-6 h-full transition-all duration-300 group-hover:border-cyan-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50">
                {/* Icon */}
                <div className={`text-5xl mb-4 bg-linear-to-r ${colorMap[service.color]} bg-clip-text text-transparent`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 font-['Orbitron']">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400">
                  {service.description}
                </p>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-500 transition-colors duration-300" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-500 transition-colors duration-300" style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
