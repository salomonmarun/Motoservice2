# 🏍️ MotoService MVP

Red certificada de talleres de motos en Colombia.

## Despliegue en Vercel (5 pasos)

### Opción A — Sin instalar nada (recomendada)

1. Ve a **[github.com](https://github.com)** → crea cuenta gratis si no tienes
2. Crea repositorio nuevo: `New repository` → nombre: `motoservice` → Public → Create
3. Sube los archivos de esta carpeta (arrastra y suelta en GitHub)
4. Ve a **[vercel.com](https://vercel.com)** → `Sign up with GitHub`
5. Click `New Project` → selecciona `motoservice` → **Deploy**

✅ En 2 minutos tienes tu URL tipo `motoservice-xxx.vercel.app`

---

### Opción B — Con terminal (más control)

```bash
# 1. Instala dependencias
npm install

# 2. Prueba local (abre en http://localhost:3000)
npm start

# 3. Instala Vercel CLI
npm install -g vercel

# 4. Despliega
vercel --prod
```

---

## Instalación como App en el celular (PWA)

Una vez publicada en Vercel:

**Android (Chrome):**
1. Abre la URL en Chrome
2. Menú (⋮) → "Agregar a pantalla de inicio"
3. Se instala como app nativa

**iPhone (Safari):**
1. Abre la URL en Safari
2. Botón compartir (□↑) → "Agregar a pantalla de inicio"
3. Se instala como app nativa

---

## Roles de demo

| Rol | Descripción |
|-----|-------------|
| 🏍️ Motociclista | Busca talleres, reserva, historial de moto |
| 🔧 Taller | Gestiona solicitudes, cotizaciones, repuestos |
| ⚙️ Admin | Panel general, certificación, reportes |

Usa el **Demo Rápido** en la pantalla de login — no necesitas número real.

---

## Stack técnico

- React 18
- Anthropic Claude API (cotizaciones inteligentes)
- PWA ready (instalable en móvil)
- Google Fonts (Barlow Condensed)

## Variables de entorno (opcional)

Si quieres usar tu propia API key de Anthropic, crea `.env`:
```
REACT_APP_ANTHROPIC_KEY=sk-ant-...
```

---

Desarrollado para el mercado motociclístico colombiano 🇨🇴
