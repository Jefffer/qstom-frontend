import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '573001234567';
  
  // Mensaje predefinido
  const message = encodeURIComponent(
    '¡Hola Qstom! 🎮 Me interesa personalizar mis accesorios gaming. ¿Me pueden ayudar?'
  );
  
  // URL de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: 1,
        type: "spring",
        stiffness: 260,
        damping: 20 
      }}
    //   whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-300 group"
      aria-label="Contactar por WhatsApp"
    >
      {/* Pulse Animation Ring */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-green-500 rounded-full"
      />
      
      {/* WhatsApp Icon */}
      <FaWhatsapp className="relative text-xl md:text-2xl" />
      
      {/* Tooltip - Hidden on mobile */}
      <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        ¿Necesitas ayuda? ¡Escríbenos!
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
