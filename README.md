# QSTOM - Personalización Gaming Cyberpunk 🎮✨

Sitio web para **QSTOM**, empresa especializada en personalización de accesorios gaming con estética cyberpunk. Diseño moderno, animado y futurista utilizando React, Tailwind CSS y Framer Motion.

## 🚀 Características

- **Estética Cyberpunk**: Diseño futurista con colores neón (cyan y magenta), efectos de brillo y animaciones fluidas
- **Terminal Banner**: Banner superior estilo terminal Linux con mensajes deslizantes y redes sociales
- **Responsive**: Totalmente adaptable a dispositivos móviles, tablets y desktop
- **Animaciones**: Implementadas con Framer Motion para transiciones suaves
- **Componentes Modulares**: Arquitectura basada en componentes reutilizables
- **React Router**: Navegación fluida entre páginas sin recargas
- **Catálogo Interactivo**: Galería de proyectos con filtros por categoría

## 📋 Páginas

- **Inicio**: Hero section con estadísticas y llamados a la acción
- **Catálogo**: Galería de proyectos con filtros y modal de detalles
- **Nosotros**: Historia del equipo, misión y proceso de trabajo
- **Contacto**: Formulario de cotización y datos de contacto

## 🛠️ Tecnologías

- **React 19** - Biblioteca de UI
- **Vite 7** - Build tool y dev server
- **React Router DOM** - Navegación entre páginas
- **Tailwind CSS 4** - Framework de estilos utility-first
- **Framer Motion** - Librería de animaciones
- **React Icons** - Iconos personalizables
- **Three.js** - Motor 3D para visualización de modelos
- **@react-three/fiber** - React renderer para Three.js
- **@react-three/drei** - Helpers y componentes para R3F

## 🎮 Laboratorio 3D

El sitio incluye un **Laboratorio Interactivo 3D** donde los usuarios pueden:
- Visualizar modelos 3D realistas de controles PS5 y Xbox
- Personalizar colores en tiempo real
- Rotar y explorar los modelos
- Subir imágenes personalizadas
- Exportar diseños

### Configuración de Modelos 3D

Los modelos 3D utilizan formato GLTF/GLB para máximo realismo. Para configurarlos:

1. **Descarga modelos desde:**
   - [Sketchfab](https://sketchfab.com/) - Busca "PS5 Controller" o "Xbox Controller"
   - [Poly Pizza](https://poly.pizza/) - Modelos 3D gratuitos
   - [CGTrader](https://www.cgtrader.com/) - Algunos modelos gratuitos

2. **Coloca los archivos en:**
   ```
   public/models/ps5-controller.glb
   public/models/xbox-controller.glb
   ```

3. **O ejecuta el script helper:**
   ```powershell
   .\download-models.ps1
   ```

4. **Consulta la guía completa:**
   Lee `public/models/README.md` para instrucciones detalladas

**Nota:** El sistema incluye modelos fallback si no se encuentran archivos GLTF.

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Jefffer/qstom-frontend.git

# Navegar al directorio
cd qstom-frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🎨 Paleta de Colores Cyberpunk

- **Primario**: Cyan (#00FFFF)
- **Secundario**: Pink/Magenta (#FF00FF)
- **Fondo**: Negro profundo (#0a0a0f)
- **Acentos**: Púrpura, Azul

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Ejecutar ESLint
```

## 📂 Estructura del Proyecto

```
qstom-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── TopBanner.jsx      # Banner superior tipo terminal
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── Gallery.jsx
│   │   ├── Footer.jsx
│   │   └── WhatsAppButton.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Catalog.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Configuración del Banner Superior

El componente `TopBanner.jsx` permite personalizar mensajes y redes sociales:

### Editar Mensajes

Abre `src/components/TopBanner.jsx` y localiza el array `messages`:

```jsx
const messages = [
  '> NUEVO: Personalización de controles PS5 con efectos holográficos disponible',
  '> PROMO: 15% de descuento en teclados RGB custom este mes',
  // Agrega más mensajes aquí
];
```

**Formato recomendado**: `> TIPO: tu mensaje aquí`

**Tipos sugeridos**: NUEVO, PROMO, INFO, ALERT, UPDATE

### Editar Redes Sociales

Localiza el array `socialLinks` y actualiza las URLs:

```jsx
const socialLinks = [
  { icon: FaInstagram, url: 'https://instagram.com/tu_usuario', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: FaFacebookF, url: 'https://facebook.com/tu_pagina', label: 'Facebook', color: 'hover:text-blue-500' },
  // Personaliza las URLs con tus redes sociales
];
```

## 🎨 Paleta de Colores Cyberpunk
```

## 🎯 Servicios

- Personalización de Consolas (PS5, Xbox, Nintendo Switch)
- Controles custom con diseños únicos
- Teclados mecánicos personalizados
- Ratones gaming con acabados premium
- Torres de PC con diseños cyberpunk
- Técnicas: Aerografía y Serigrafía profesional

## 🌐 Fuentes

- **Orbitron**: Títulos y encabezados (estilo cyberpunk)
- **Rajdhani**: Texto del cuerpo (legible y futurista)

## 📱 Contacto

- Email: info@qstom.com
- Teléfono: +1 (555) 123-4567
- WhatsApp: +1 (555) 123-4567
- Discord: QSTOM#1234

## 🚧 Próximas Mejoras

- [ ] Sistema de autenticación de usuarios
- [ ] Panel de administración
- [ ] Integración con pasarela de pagos
- [ ] Sistema de seguimiento de pedidos
- [ ] Blog con tutoriales y noticias
- [ ] Galería 3D interactiva

## 📄 Licencia

Este proyecto es privado y pertenece a QSTOM.

---

**Desarrollado con ❤️ y mucho neón 🎮✨**

