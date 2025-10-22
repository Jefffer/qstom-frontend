import { motion } from 'framer-motion';
import { FaPaintBrush, FaRocket, FaUsers, FaAward, FaLightbulb, FaHeart } from 'react-icons/fa';

const About = () => {
  const stats = [
    { icon: <FaPaintBrush />, number: '500+', label: 'Proyectos Completados' },
    { icon: <FaUsers />, number: '350+', label: 'Clientes Satisfechos' },
    { icon: <FaAward />, number: '5', label: 'Años de Experiencia' },
    { icon: <FaRocket />, number: '100%', label: 'Personalización' },
  ];

  const values = [
    {
      icon: <FaLightbulb />,
      title: 'Creatividad',
      description: 'Cada proyecto es una oportunidad para crear algo único y espectacular',
      color: 'cyan',
    },
    {
      icon: <FaHeart />,
      title: 'Pasión',
      description: 'Amamos lo que hacemos y se refleja en cada detalle de nuestro trabajo',
      color: 'pink',
    },
    {
      icon: <FaAward />,
      title: 'Calidad',
      description: 'Utilizamos las mejores técnicas y materiales para resultados duraderos',
      color: 'purple',
    },
  ];

  const team = [
    {
      name: 'Alex "Neon" Rivera',
      role: 'Artista Principal / Aerografista',
      specialty: 'Diseños cyberpunk y efectos neón',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      name: 'Maya "Pixel" Chen',
      role: 'Diseñadora Digital',
      specialty: 'Conceptualización y renders 3D',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      name: 'Carlos "Tech" Morales',
      role: 'Especialista en Serigrafía',
      specialty: 'Técnicas de impresión avanzadas',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-['Orbitron']"
          >
            Sobre <span className="glow-text">Qstom</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 leading-relaxed"
          >
            Somos un equipo de artistas y gamers apasionados que transformamos accesorios ordinarios en obras de arte únicas. 
            Desde 2019, hemos estado llevando la personalización gaming al siguiente nivel con técnicas de aerografía y serigrafía 
            de clase mundial.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl text-cyan-400 mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 glow-text font-['Orbitron']">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Orbitron']">
              Nuestra <span className="glow-pink">Misión</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Hacer que cada gamer pueda expresar su personalidad única a través de sus accesorios, 
              combinando arte tradicional con estética futurista para crear piezas que no solo se ven increíbles, 
              sino que cuentan una historia.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-8 text-center hover:border-pink-500 transition-all duration-300 hover:scale-105"
              >
                <div className={`text-5xl mb-4 ${
                  value.color === 'cyan' ? 'text-cyan-400' :
                  value.color === 'pink' ? 'text-pink-400' :
                  'text-purple-400'
                }`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-['Orbitron']">
                  {value.title}
                </h3>
                <p className="text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Orbitron']">
              Nuestro <span className="glow-text">Team</span>
            </h2>
            <p className="text-xl text-gray-400">
              Los artistas detrás de cada diseño único
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-black border-2 border-cyan-500/30 rounded-lg overflow-hidden hover:border-cyan-500 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 font-['Orbitron'] group-hover:text-cyan-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-pink-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm">
                    <span className="text-cyan-400">✦</span> {member.specialty}
                  </p>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-cyan-500/20 via-transparent to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Orbitron']">
              Nuestro <span className="glow-pink">Proceso</span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Consulta',
                description: 'Hablamos contigo para entender tu visión y crear un diseño personalizado',
              },
              {
                step: '02',
                title: 'Diseño',
                description: 'Nuestro equipo crea mockups digitales hasta que estés 100% satisfecho',
              },
              {
                step: '03',
                title: 'Producción',
                description: 'Aplicamos las técnicas de aerografía o serigrafía con precisión profesional',
              },
              {
                step: '04',
                title: 'Entrega',
                description: 'Tu accesorio personalizado llega protegido y listo para destacar',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="text-5xl font-bold text-cyan-400/20 font-['Orbitron'] min-w-[80px]">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 font-['Orbitron']">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
