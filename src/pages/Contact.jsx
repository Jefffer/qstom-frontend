import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaDiscord, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  // Validar si todos los campos requeridos están llenos
  const isFormValid = formData.name.trim() !== '' && 
                      formData.email.trim() !== '' && 
                      formData.category !== '' && 
                      formData.message.trim() !== '';

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      content: 'info@qstom.com',
      link: 'mailto:info@qstom.com',
    },
    {
      icon: <FaPhone />,
      title: 'Teléfono',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      content: '+1 (555) 123-4567',
      link: 'https://wa.me/15551234567',
    },
    {
      icon: <FaDiscord />,
      title: 'Discord',
      content: 'QSTOM#1234',
      link: '#',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Ubicación',
      content: 'Ciudad Tech, Cyber District',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen pt-34 pb-20 px-4 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-['Orbitron']">
            <span className="glow-text">Contáctanos</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            ¿Listo para personalizar tu equipo? Envíanos tu idea y te responderemos en menos de 24 horas
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6 font-['Orbitron']">
                Solicita tu <span className="text-cyan-400">Cotización</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="floating-input">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    required
                    placeholder=" "
                    className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 input-tech"
                  />
                  <label>Nombre Completo</label>
                </div>

                {/* Email */}
                <div className="floating-input">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    required
                    placeholder=" "
                    className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 input-tech"
                  />
                  <label>Email</label>
                </div>

                {/* Phone */}
                <div className="floating-input">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField('')}
                    placeholder=" "
                    className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 input-tech"
                  />
                  <label>Teléfono (Opcional)</label>
                </div>

                {/* Category */}
                <div className="floating-input">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('category')}
                    onBlur={() => setFocusedField('')}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 select-tech"
                  >
                    <option value="">Selecciona</option>
                    <option value="consolas">Consolas</option>
                    <option value="controles">Controles</option>
                    <option value="teclados">Teclados</option>
                    <option value="ratones">Ratones</option>
                    <option value="torres">Torres PC</option>
                    <option value="otro">Otro</option>
                  </select>
                  <label>Tipo de Producto</label>
                </div>

                {/* Message */}
                <div className="floating-input">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField('')}
                    required
                    rows="5"
                    placeholder=" "
                    className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 resize-none input-tech"
                  />
                  <label>Describe tu Idea</label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-4 border font-bold transition-all duration-300 flex items-center justify-center gap-3 btn-tech-alt ${
                    isFormValid 
                      ? 'border-pink-500 text-pink-400 hover:bg-pink-500/10 glow-border hover:scale-105' 
                      : 'border-gray-300 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {submitted ? (
                    <>
                      <span>✓ Mensaje Enviado</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>ENVIAR COTIZACIÓN</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="block bg-gray-900/50 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 hover:scale-105 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl text-cyan-400 group-hover:text-pink-500 transition-colors duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1 font-['Orbitron']">
                        {info.title}
                      </h3>
                      <p className="text-gray-400">
                        {info.content}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="bg-linear-to-br from-cyan-500/10 to-pink-500/10 border border-cyan-500/30 rounded-lg p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4 font-['Orbitron']">
                Horario de Atención
              </h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span className="text-cyan-400 font-bold">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span className="text-cyan-400 font-bold">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span className="text-gray-500">Cerrado</span>
                </div>
              </div>
            </motion.div>

            {/* FAQ Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="bg-gray-900/50 border border-pink-500/30 rounded-lg p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4 font-['Orbitron']">
                Preguntas Frecuentes
              </h3>
              <ul className="space-y-3">
                {[
                  '¿Cuánto tiempo toma un proyecto?',
                  '¿Hacen envíos internacionales?',
                  '¿Puedo enviar mi propio diseño?',
                  '¿Ofrecen garantía?',
                ].map((question, index) => (
                  <li key={index} className="text-gray-400 hover:text-pink-400 transition-colors cursor-pointer flex items-center gap-2">
                    <span className="text-pink-400">›</span>
                    {question}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
