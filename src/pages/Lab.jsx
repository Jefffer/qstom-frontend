import { motion } from 'framer-motion';
import { ControllerConfigurator } from '../features/controller-configurator';

const Lab = () => {
  return (
    <div className="min-h-screen bg-black pt-26">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-16 border-b border-cyan-500/30"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 glow-text font-['Orbitron']">
              LABORATORIO 3D
            </h1>
            <p className="text-xl md:text-2xl text-cyan-400 mb-4">
              Experimenta con tu diseño antes de ordenar
            </p>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Utiliza nuestro configurador 3D interactivo para visualizar cómo quedará tu control personalizado. 
              Prueba diferentes combinaciones de colores, sube tus propias imágenes y exporta tu configuración 
              para realizar tu pedido.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Configurator Section */}
      <ControllerConfigurator />

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 border-t border-cyan-500/30"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-cyan-500/30">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">🎮 Visualización Real</h3>
              <p className="text-gray-400">
                Nuestro modelo 3D te permite ver exactamente cómo quedará tu control con los colores que elijas.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-pink-500/30">
              <h3 className="text-xl font-bold mb-3 text-pink-400">🎨 Personalización Total</h3>
              <p className="text-gray-400">
                Cada parte del control es personalizable. Desde el cuerpo hasta los botones más pequeños.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-xl font-bold mb-3 text-purple-400">💾 Guarda tu Diseño</h3>
              <p className="text-gray-400">
                Exporta tu configuración y úsala como referencia para hacer tu pedido o compartirla con amigos.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Lab;
