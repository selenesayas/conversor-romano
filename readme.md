# TP3 - Conversor Números Romanos ↔ Arábigos

Servicio que convierte números romanos a arábigos y viceversa.  
Incluye endpoints REST y demo interactivo en el navegador.

### Endpoints:
- `/a2r/:num` → Árabe a romano
- `/r2a/:romano` → Romano a árabe

## Tecnologías
- Node.js
- Express
- Jest
- Vercel

## Tests
- Se ejecutan con `npm test`.
- Casos positivos y borde (decimales, negativos, cero, cadenas inválidas).

## Demo en navegador
Abrir `index.html` en la carpeta `public`.

Despliegue
- Hosteado en Vercel con GitHub Actions.
- Cada push a main ejecuta tests y despliega automáticamente.

 Uso local
```bash
npm install
npm start
# Acceder a http://localhost:3000/
