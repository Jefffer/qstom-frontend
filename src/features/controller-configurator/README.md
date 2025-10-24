# Controller Configurator Feature

Este módulo contiene toda la lógica del configurador 3D de controles de consola (PS5 y Xbox).

## Estructura

```
controller-configurator/
├── index.js                          # Punto de entrada principal
├── components/                        # Componentes React
│   └── ControllerConfigurator.jsx    # Componente principal del configurador
└── models/                           # Modelos 3D
    ├── PS5ControllerModel.jsx        # Modelo 3D del control PS5 DualSense
    └── XboxControllerModel.jsx       # Modelo 3D del control Xbox
```

## Uso

### Importación

```javascript
import { ControllerConfigurator } from '@/features/controller-configurator';
```

O importaciones específicas:

```javascript
import { 
  ControllerConfigurator, 
  PS5ControllerModel, 
  XboxControllerModel 
} from '@/features/controller-configurator';
```

### Ejemplo

```jsx
import { ControllerConfigurator } from '@/features/controller-configurator';

function Lab() {
  return (
    <div>
      <ControllerConfigurator />
    </div>
  );
}
```

## Componentes

### ControllerConfigurator

Componente principal que incluye:
- Canvas 3D con renderizado Three.js
- Selector de tipo de control (PS5/Xbox)
- Selector de partes personalizables
- Paleta de colores (básicos y neón)
- Selector de color personalizado
- Carga de imágenes
- Exportación de configuración
- Reset de configuración

**Props:** Ninguna (componente autónomo)

### PS5ControllerModel

Modelo 3D del control PlayStation 5 DualSense.

**Props:**
- `colors` (Object): Objeto con colores para cada parte del control
  - `body`: Color del cuerpo principal
  - `grips`: Color de los grips laterales
  - `buttons`: Color de los botones frontales
  - `dpad`: Color del D-Pad
  - `sticks`: Color de los joysticks
  - `triggers`: Color de los gatillos L2/R2
  - `touchpad`: Color del touchpad
  - `led`: Color del LED strip
- `rotation` (Array): Array de 3 números [x, y, z] para rotación inicial (opcional)

### XboxControllerModel

Modelo 3D del control Xbox.

**Props:**
- `colors` (Object): Objeto con colores para cada parte del control
  - `body`: Color del cuerpo principal
  - `grips`: Color de los grips laterales
  - `buttons`: Color de los botones frontales
  - `dpad`: Color del D-Pad
  - `sticks`: Color de los joysticks
  - `bumpers`: Color de los bumpers LB/RB
  - `triggers`: Color de los gatillos LT/RT
  - `led`: Color del LED del botón Xbox
- `rotation` (Array): Array de 3 números [x, y, z] para rotación inicial (opcional)

## Tecnologías

- **Three.js**: Motor 3D
- **@react-three/fiber**: Integración de Three.js con React
- **@react-three/drei**: Helpers y componentes útiles (OrbitControls, Environment, ContactShadows)
- **Framer Motion**: Animaciones
- **React Hooks**: useState, useRef, useFrame

## Características

✅ Rotación automática del modelo 3D
✅ Controles de cámara interactivos (orbit, zoom, pan)
✅ 8 partes personalizables por control
✅ Paleta de 16 colores predefinidos (8 básicos + 8 neón)
✅ Selector de color personalizado
✅ Carga de imágenes personalizadas
✅ Exportación de configuración en JSON
✅ Reset completo de la configuración
✅ Iluminación profesional con múltiples fuentes de luz
✅ Sombras y entorno realista

## Futuros Desarrollos

- [ ] Soporte para más tipos de controles (Switch, Steam Deck)
- [ ] Aplicación de texturas/imágenes directamente en el modelo 3D
- [ ] Importación de configuraciones guardadas
- [ ] Vista previa de múltiples ángulos simultáneos
- [ ] Integración con carrito de compras
- [ ] Guardado en base de datos
- [ ] Compartir diseños en redes sociales
