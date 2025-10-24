# Arquitectura del Proyecto Qstom Frontend

## Estructura General

```
qstom-frontend/
├── public/                           # Archivos estáticos
├── src/
│   ├── App.jsx                      # Componente raíz con rutas
│   ├── App.css                      # Estilos globales
│   ├── index.css                    # Estilos Tailwind
│   ├── main.jsx                     # Punto de entrada
│   │
│   ├── components/                  # Componentes compartidos
│   │   ├── Footer.jsx              # Footer del sitio
│   │   ├── FooterBackground.jsx    # Fondo 3D del footer
│   │   ├── Gallery.jsx             # Galería de imágenes
│   │   ├── Hero.jsx                # Sección hero
│   │   ├── Loading.jsx             # Componente de carga
│   │   ├── Navbar.jsx              # Barra de navegación
│   │   ├── Services.jsx            # Sección de servicios
│   │   ├── TopBanner.jsx           # Banner superior con terminal
│   │   └── WhatsAppButton.jsx      # Botón flotante de WhatsApp
│   │
│   ├── pages/                       # Páginas principales
│   │   ├── Home.jsx                # Página de inicio
│   │   ├── Catalog.jsx             # Catálogo de productos
│   │   ├── About.jsx               # Sobre nosotros
│   │   ├── Contact.jsx             # Formulario de contacto
│   │   └── Lab.jsx                 # Laboratorio 3D (usa configurador)
│   │
│   ├── features/                    # Módulos de características
│   │   └── controller-configurator/ # 🎮 CONFIGURADOR DE CONTROLES
│   │       ├── index.js            # Exportaciones públicas
│   │       ├── README.md           # Documentación del módulo
│   │       ├── components/         # Componentes del configurador
│   │       │   └── ControllerConfigurator.jsx  # Componente principal
│   │       └── models/             # Modelos 3D
│   │           ├── PS5ControllerModel.jsx     # Modelo PS5
│   │           └── XboxControllerModel.jsx    # Modelo Xbox
│   │
│   └── assets/                      # Recursos (imágenes, fuentes, etc.)
│
├── package.json                     # Dependencias
├── vite.config.js                  # Configuración de Vite
├── tailwind.config.js              # Configuración de Tailwind
└── eslint.config.js                # Configuración de ESLint
```

## Flujo de Datos - Controller Configurator

```
┌─────────────────────────────────────────────────────────────┐
│                         Lab.jsx (Page)                       │
│                                                              │
│  Importa y renderiza el ControllerConfigurator              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│          ControllerConfigurator.jsx (Component)              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Estado:                                             │  │
│  │  - controllerType (ps5/xbox)                         │  │
│  │  - colors (object con colores de cada parte)        │  │
│  │  - selectedPart (parte activa)                       │  │
│  │  - uploadedImage (imagen personalizada)             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │   UI Controls    │         │   3D Canvas      │         │
│  │                  │         │                  │         │
│  │ - Type Selector  │         │ - Lighting       │         │
│  │ - Part Selector  │────────▶│ - Camera         │         │
│  │ - Color Palette  │         │ - OrbitControls  │         │
│  │ - Image Upload   │         │ - Shadows        │         │
│  │ - Export/Reset   │         │ - Environment    │         │
│  └──────────────────┘         └──────┬───────────┘         │
└──────────────────────────────────────┼──────────────────────┘
                                       │
                  ┌────────────────────┴────────────────────┐
                  │                                         │
                  ▼                                         ▼
    ┌────────────────────────┐              ┌────────────────────────┐
    │ PS5ControllerModel.jsx │              │ XboxControllerModel.jsx │
    │                        │              │                         │
    │ Props: { colors }      │              │ Props: { colors }       │
    │                        │              │                         │
    │ Renderiza:             │              │ Renderiza:              │
    │ - Body (Cuerpo)        │              │ - Body (Cuerpo)         │
    │ - Grips (Empuñaduras)  │              │ - Grips (Empuñaduras)   │
    │ - Buttons (Botones)    │              │ - Buttons (Botones)     │
    │ - D-Pad                │              │ - D-Pad                 │
    │ - Sticks (Joysticks)   │              │ - Sticks (Joysticks)    │
    │ - Triggers (Gatillos)  │              │ - Bumpers               │
    │ - Touchpad             │              │ - Triggers (Gatillos)   │
    │ - LED Strip            │              │ - LED Xbox              │
    └────────────────────────┘              └────────────────────────┘
```

## Principios de Arquitectura

### 1. **Separation of Concerns**
- **Pages**: Solo orquestan componentes
- **Components**: UI reutilizables y presentacionales
- **Features**: Lógica de negocio encapsulada

### 2. **Feature-Based Organization**
- Cada feature es independiente
- Exportaciones públicas controladas vía index.js
- Documentación interna en README.md

### 3. **Single Responsibility**
- Modelos 3D: Solo renderizado visual
- Configurator: Solo lógica de estado y UI
- Page: Solo composición

### 4. **Scalability**
```
features/
├── controller-configurator/     # Módulo actual
├── [future-feature-1]/          # Futuros módulos
└── [future-feature-2]/          # Mantienen la misma estructura
```

## Beneficios de la Nueva Estructura

✅ **Modularidad**: El configurador puede extraerse como paquete npm
✅ **Mantenibilidad**: Cambios aislados en el feature no afectan el resto
✅ **Escalabilidad**: Fácil agregar nuevos tipos de controles o features
✅ **Testing**: Cada módulo puede testearse independientemente
✅ **Documentación**: README específico por feature
✅ **Reutilización**: Modelos 3D pueden usarse en otros contextos
✅ **Importaciones limpias**: Un solo import desde el index

## Ejemplo de Uso

### Antes (Acoplado)
```javascript
import ControllerConfigurator from '../components/ControllerConfigurator';
import PS5Model from '../components/PS5ControllerModel';
import XboxModel from '../components/XboxControllerModel';
```

### Después (Desacoplado)
```javascript
import { ControllerConfigurator } from '@/features/controller-configurator';
// Todo lo necesario en un solo import
```

## Tecnologías por Capa

### Presentación (Pages + Components)
- React 19.1.1
- React Router DOM 7.9.4
- Framer Motion 12.23.24
- Tailwind CSS 4.1.15

### Lógica de Negocio (Features)
- React Hooks (useState, useRef, useEffect)
- File API (para carga de imágenes)
- Blob API (para exportación)

### Renderizado 3D (Models)
- Three.js 0.180.0
- @react-three/fiber 9.4.0
- @react-three/drei 10.7.6

### Build & Dev Tools
- Vite 7.1.7
- ESLint 9.36.0
