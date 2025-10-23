import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaInstagram, FaFacebookF, FaTiktok, FaTwitter } from 'react-icons/fa';

const TopBanner = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  // =====================================================
  // CONFIGURACIÓN DE MENSAJES
  // =====================================================
  // Para personalizar los mensajes del banner:
  // 1. Mantén el formato: '> TIPO: mensaje'
  // 2. Tipos sugeridos: NUEVO, PROMO, INFO, ALERT, UPDATE
  // 3. Cada mensaje se mostrará durante 10 segundos
  // 4. Los mensajes se alternan: izquierda→derecha, derecha→izquierda
  // =====================================================
  const messages = [
    '> NUEVO: Personalización de controles PS5 con efectos holográficos disponible',
    '> PROMO: 15% de descuento en personalización de teclados este mes',
    '> UPDATE: Amaya es gay',
    '> INFO: Envíos gratis en pedidos superiores a $100.000',
    '> ALERT: Diseños exclusivos para Xbox Series X',
    '> UPDATE: Nueva técnica de aerografía 3D implementada',
  ];

  // =====================================================
  // CONFIGURACIÓN DE REDES SOCIALES
  // =====================================================
  const socialLinks = [
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: FaFacebookF, url: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: FaTiktok, url: 'https://tiktok.com', label: 'TikTok', color: 'hover:text-cyan-400' },
    // { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter', color: 'hover:text-cyan-300' },
  ];

  // Cambiar mensaje cada 12 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 10000); // 10 segundos de animación
    return () => clearInterval(interval);
  }, [messages.length]);

  // Determinar dirección basada en el índice (izq→der, der→izq alternados)
  const getDirection = (index) => {
    return index % 2 === 0 ? 'ltr' : 'rtl';
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-gray-900 via-black to-gray-900 border-b border-green-500/30 overflow-hidden">
      {/* Grid Background Pattern - Terminal Style */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 3px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, #00ff00 2px, #00ff00 3px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-between h-10 px-4">
        {/* Terminal Prompt Indicator - Solo Desktop */}
        <div className="hidden md:flex items-center gap-2 text-green-400 text-xs font-mono">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500"/>
            <div className="w-2 h-2 rounded-full bg-green-500"/>
          </div>
          <span className="text-green-500/70">qstom@terminal:~$</span>
        </div>

        {/* Scrolling Messages Container */}
        <div className="flex-1 md:mx-4 overflow-hidden relative h-full flex items-center">
          {/* Gradient Fade on Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />
          
          {/* Animated Messages */}
          <div className="relative w-full h-full flex items-center">

            {/* Scanline Effect */}
            <motion.div
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-linear-to-b from-transparent via-green-500/10 to-transparent h-8 pointer-events-none"
            />

            {messages.map((message, index) => {
              const direction = getDirection(index);
              const isActive = currentMessageIndex === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ 
                    x: direction === 'ltr' ? '-100%' : '100%',
                    opacity: 0 
                  }}
                  animate={{
                    x: isActive 
                      ? (direction === 'ltr' ? ['-100%', '100%'] : ['100%', '-100%'])
                      : (direction === 'ltr' ? '-100%' : '100%'),
                    opacity: isActive ? [0, 1, 1, 1, 0] : 0,
                  }}
                  transition={{
                    duration: 10,
                    ease: 'linear',
                    times: [0, 0.05, 0.45, 0.95, 1],
                  }}
                  className="absolute whitespace-nowrap text-xs sm:text-sm font-mono text-green-400 tracking-wide"
                  style={{
                    textShadow: '0 0 10px rgba(34, 197, 94, 0.5), 0 0 20px rgba(34, 197, 94, 0.3)',
                  }}
                >
                  {message}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block ml-1 w-2 h-4 bg-green-400"
                    style={{
                      boxShadow: '0 0 5px rgba(34, 197, 94, 0.8)',
                    }}
                  >
                    ▊
                  </motion.span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Social Media Icons - Solo Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className={`relative text-gray-400 ${social.color} transition-all group`}
            >
              {/* Hexagon Background */}
              <div className="relative">
                <div 
                  className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/20 transition-all -z-10"
                  style={{
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                    transform: 'scale(1.8)',
                  }}
                />
                <social.icon className="text-base sm:text-lg relative z-10" />
              </div>
              
              {/* Glow Effect on Hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 blur-md bg-green-500/30 rounded-full -z-20"
              />
            </motion.a>
          ))}
        </div>

        {/* Terminal Close Button - Decorative */}
        <div className="hidden lg:flex items-center gap-2 ml-4 text-green-500/50 text-xs font-mono">
          <span>[LIVE]</span>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-green-500 rounded-full"
            style={{
              boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)',
            }}
          />
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-green-500/50" />
    </div>
  );
};

export default TopBanner;
