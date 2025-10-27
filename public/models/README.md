# Modelos 3D para Controles

Este directorio contiene los modelos 3D GLTF/GLB para los controles de videojuegos.

## 📥 Cómo Obtener los Modelos

### Opción 1: Descargar desde Sketchfab (Recomendado)

#### PS5 DualSense Controller:
1. Visita: https://sketchfab.com/search?q=ps5+controller&type=models
2. Busca un modelo gratuito con licencia descargable
3. Modelos recomendados:
   - "PS5 DualSense Controller" por diversos autores
   - Filtra por: **Free Download** + **CC License**
4. Descarga en formato **GLTF** o **GLB**
5. Renombra el archivo a: `ps5-controller.glb`
6. Coloca en: `public/models/ps5-controller.glb`

#### Xbox Series X/S Controller:
1. Visita: https://sketchfab.com/search?q=xbox+controller&type=models
2. Busca "Xbox Series Controller" o "Xbox One Controller"
3. Descarga en formato **GLTF** o **GLB**
4. Renombra el archivo a: `xbox-controller.glb`
5. Coloca en: `public/models/xbox-controller.glb`

### Opción 2: Desde Poly Pizza

1. Visita: https://poly.pizza/
2. Busca "gamepad", "controller", "ps5", o "xbox"
3. Descarga modelos gratuitos
4. Coloca en este directorio con los nombres correctos

### Opción 3: Crear/Usar Modelos Propios

Si tienes modelos propios en Blender u otro software 3D:
1. Exporta como **GLTF 2.0** o **GLB**
2. Asegúrate de que los nombres de las partes sean descriptivos:
   - `body`, `shell` - Cuerpo principal
   - `grip`, `rubber` - Empuñaduras
   - `button_*` - Botones
   - `stick_*`, `analog_*` - Joysticks
   - `trigger_*` - Gatillos
   - `touchpad` - Touchpad (PS5)
   - `led`, `light` - Elementos luminosos

## 📁 Estructura Esperada

```
public/
└── models/
    ├── ps5-controller.glb     ← PlayStation 5 DualSense
    ├── xbox-controller.glb    ← Xbox Series X/S
    └── README.md              ← Este archivo
```

## 🎨 Personalización de Colores

Los modelos se personalizan automáticamente según los colores seleccionados:

- **Body**: Cuerpo principal del control
- **Grips**: Empuñaduras laterales
- **Buttons**: Botones de acción
- **Sticks**: Joysticks analógicos
- **Triggers**: Gatillos L2/R2 o LT/RT
- **LED**: Elementos luminosos (botón PS, logo Xbox)
- **Touchpad**: Panel táctil (solo PS5)
- **D-Pad**: Cruceta direccional

El sistema detecta automáticamente las partes del modelo por nombre y aplica los colores correspondientes.

## 🔄 Fallback

Si no se encuentran los modelos GLTF, el sistema usará automáticamente modelos de geometrías básicas como fallback. Los modelos seguirán siendo funcionales y personalizables, aunque menos detallados.

## 📏 Especificaciones Técnicas

- **Formato**: GLTF 2.0 o GLB (binario)
- **Escala**: Los modelos se escalan automáticamente a 1.5x
- **Rotación**: Rotación automática en el eje Y
- **Tamaño recomendado**: < 5MB por modelo
- **Texturas**: Incluidas en GLB o en carpeta separada para GLTF

## 🆓 Licencias

Asegúrate de verificar la licencia de cualquier modelo que descargues:
- ✅ CC0 (Dominio público)
- ✅ CC BY (Con atribución)
- ✅ CC BY-SA (Con atribución, compartir igual)
- ⚠️ Licencias comerciales (verifica términos)

## 🔗 URLs de Recursos

- **Sketchfab**: https://sketchfab.com/
- **Poly Pizza**: https://poly.pizza/
- **CGTrader**: https://www.cgtrader.com/ (algunos modelos gratuitos)
- **TurboSquid**: https://www.turbosquid.com/ (algunos modelos gratuitos)
- **Free3D**: https://free3d.com/

## 🛠️ Herramientas Útiles

- **Blender** (gratuito): Para editar/optimizar modelos
- **glTF Viewer**: https://gltf-viewer.donmccurdy.com/ - Vista previa online
- **glTF Transform**: https://gltf-transform.donmccurdy.com/ - Optimización

## ⚡ Optimización

Para mejor rendimiento:
1. Usa formato GLB (binario) en lugar de GLTF
2. Comprime texturas a 1024x1024 o menos
3. Reduce polígonos si el modelo tiene +100k triángulos
4. Elimina animaciones si no las necesitas

## 🐛 Solución de Problemas

### El modelo no se carga:
- Verifica que el archivo existe en `public/models/`
- Revisa el nombre del archivo (debe ser exacto)
- Abre la consola del navegador para ver errores
- Prueba con otro modelo

### Los colores no se aplican:
- Verifica que las partes del modelo tengan nombres descriptivos
- Edita el archivo del modelo en Blender y renombra objetos/materiales
- Revisa la consola para ver qué nombres detecta el sistema

### El modelo está muy grande/pequeño:
- Ajusta el valor de `scale` en el componente (actualmente 1.5)
- Normaliza el tamaño en Blender antes de exportar

## 📧 Soporte

Si necesitas ayuda para encontrar o configurar modelos, contacta al equipo de desarrollo.
