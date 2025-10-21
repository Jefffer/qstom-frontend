# Configuración del Botón de WhatsApp

## 📱 Cómo personalizar el número de WhatsApp

El botón flotante de WhatsApp se encuentra en: `src/components/WhatsAppButton.jsx`

### Cambiar el número de teléfono

Edita la línea 6 del archivo:

```javascript
const phoneNumber = '573001234567'; // Reemplaza con tu número
```

**Formato del número:**
- Sin el símbolo `+`
- Sin espacios
- Sin guiones
- Incluye el código de país

**Ejemplos por país:**

| País | Código | Ejemplo |
|------|--------|---------|
| 🇨🇴 Colombia | 57 | `573001234567` |
| 🇲🇽 México | 52 | `521234567890` |
| 🇪🇸 España | 34 | `34612345678` |
| 🇦🇷 Argentina | 54 | `5491123456789` |
| 🇺🇸 Estados Unidos | 1 | `15551234567` |

### Personalizar el mensaje inicial

Edita las líneas 9-11:

```javascript
const message = encodeURIComponent(
  '¡Hola QSTOM! 🎮 Me interesa personalizar mis accesorios gaming. ¿Me pueden ayudar?'
);
```

**Nota:** No elimines `encodeURIComponent()` ya que convierte el texto para que sea compatible con URLs.

### Personalizar el tooltip

Edita la línea 44:

```javascript
¿Necesitas ayuda? ¡Escríbenos!
```

## 🎨 Personalización de estilos

### Cambiar la posición del botón

En la línea 26, modifica las clases:
- `bottom-6` → Distancia desde abajo (1-96)
- `right-6` → Distancia desde la derecha (1-96)

**Ejemplos:**
```jsx
// Esquina inferior izquierda
className="fixed bottom-6 left-6 z-50..."

// Más arriba en la derecha
className="fixed bottom-20 right-6 z-50..."
```

### Cambiar el color del botón

Reemplaza `bg-green-500` y `hover:bg-green-600` con otros colores:

```jsx
// Azul
className="... bg-blue-500 hover:bg-blue-600 ..."

// Cyan (tema cyberpunk)
className="... bg-cyan-500 hover:bg-cyan-600 ..."

// Rosa
className="... bg-pink-500 hover:bg-pink-600 ..."
```

### Cambiar el tamaño del icono

En la línea 40, modifica `text-4xl`:
- `text-2xl` → Pequeño
- `text-3xl` → Mediano
- `text-4xl` → Grande (actual)
- `text-5xl` → Extra grande

## 🚀 Características actuales

✅ **Animación de entrada:** El botón aparece con efecto spring después de 1 segundo
✅ **Efecto pulse:** Anillo pulsante que llama la atención
✅ **Hover effect:** Se agranda al pasar el mouse
✅ **Tooltip:** Mensaje que aparece al hacer hover
✅ **Responsive:** Funciona en todas las pantallas
✅ **Mensaje predefinido:** El chat se abre con un mensaje automático

## 📝 Ejemplo de uso completo

```jsx
// Número colombiano
const phoneNumber = '573123456789';

// Mensaje personalizado
const message = encodeURIComponent(
  'Hola! Vi su catálogo y quiero cotizar una personalización para mi PS5'
);
```

---

**Ubicación del componente:** `src/components/WhatsAppButton.jsx`
**Integrado en:** `src/App.jsx`
