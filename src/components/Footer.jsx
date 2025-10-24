import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaGamepad, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import FooterBackground from './FooterBackground';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebook />, url: '#', name: 'Facebook' },
    { icon: <FaInstagram />, url: '#', name: 'Instagram' },
    { icon: <FaTwitter />, url: '#', name: 'Twitter' },
    { icon: <FaTiktok />, url: '#', name: 'TikTok' },
  ];

  const quickLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Catálogo', path: '/catalog' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <footer className="bg-black border-t border-cyan-500/30 relative overflow-hidden">
      {/* Background Component with 3D Grid and City */}
      <FooterBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FaGamepad className="text-3xl text-cyan-400" />
              <span className="text-2xl font-bold text-white glow-text font-['Orbitron']">
                Qstom
              </span>
            </div>
            {/* <p className="text-gray-400 mb-4">
              Personalización extrema de accesorios gamer. Hacemos realidad tus diseños más creativos.
            </p> */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-2xl text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-4 font-['Orbitron']">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="text-cyan-400">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-4 font-['Orbitron']">
              Servicios
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-pink-400">›</span>
                Aerografía
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-400">›</span>
                Serigrafía
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-400">›</span>
                Personalización 3D
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-400">›</span>
                Diseño Custom
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-4 font-['Orbitron']">
              Contacto
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-cyan-400 mt-1 shrink-0" />
                <span>info@qstom.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhone className="text-cyan-400 mt-1 shrink-0" />
                <span>+57 312 354 6561</span>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-cyan-400 mt-1 shrink-0" />
                <span>Bogotá, Colombia</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-cyan-500/30 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} QSTOM. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
