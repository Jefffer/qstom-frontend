import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-white font-['Orbitron'] glow-text">
          QSTOM
        </h2>
        <p className="text-gray-400 mt-2">Cargando...</p>
      </div>
    </div>
  );
};

export default Loading;
