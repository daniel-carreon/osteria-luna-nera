# 🚀 Instrucciones de Deployment - Osteria Luna Nera

## Para la IA en Local

**Prompt exacto para copiar/pegar:**

```
Clona el proyecto de restaurante italiano desde GitHub y configúralo completamente:

git clone https://github.com/daniel-carreon/osteria-luna-nera.git
cd osteria-luna-nera

Este es un proyecto de restaurante italiano premium con:
- Next.js 16 + React 19
- AI Chat Assistant (Claude 3.5 Haiku via OpenRouter)
- Supabase PostgreSQL backend
- Sistema de reservaciones inteligente

PASOS QUE DEBES SEGUIR:

1. Instalar dependencias:
   npm install

2. Crear archivo .env.local con estas variables:
   NEXT_PUBLIC_SUPABASE_URL=https://qcfwborimqejlnkjyjzi.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZndib3JpbXFlamxua2p5anppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMjIyNjEsImV4cCI6MjA1NDg5ODI2MX0.eoFxXxbq8n23yIQjVVVuQVtMYwJ4PUYPeLDQTlsDp4A
   OPENROUTER_API_KEY=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

3. Configurar la base de datos en Supabase:
   - Ve a: https://supabase.com/dashboard/project/qcfwborimqejlnkjyjzi/editor
   - Abre el SQL Editor
   - Ejecuta los migrations en orden:
     a) supabase/migrations/001_create_dishes_table.sql
     b) supabase/migrations/002_create_reservations_table.sql
     c) supabase/migrations/003_create_availability_function.sql
     d) supabase/migrations/004_seed_menu_data.sql

   Alternativamente, ejecuta el script todo-en-uno:
   - Copia el contenido de: supabase/migrations/000_all_migrations.sql
   - Pégalo y ejecuta en SQL Editor

4. Iniciar el servidor de desarrollo:
   npm run dev

   El servidor auto-detectará puertos disponibles (3000-3006)

5. Abrir en el navegador:
   http://localhost:3000

ESTRUCTURA DEL PROYECTO:
- app/ - Next.js App Router
- features/ - Arquitectura feature-first (chat, menu)
- shared/ - Componentes y utilidades compartidas
- supabase/ - Migraciones de base de datos

FUNCIONALIDADES A PROBAR:
1. Visualizar menú interactivo con filtros por categoría
2. Abrir chat assistant (botón flotante abajo-derecha)
3. Preguntar sobre el menú: "What dishes do you recommend?"
4. Verificar disponibilidad: "Do you have tables available tomorrow at 7pm?"
5. Hacer reservación: "I'd like to book a table for 4 people"

Si encuentras algún error, revisa:
- Que las migrations se ejecutaron correctamente
- Que el .env.local tiene las 3 variables correctas
- Que el puerto no esté ocupado (el script auto-detecta puertos)
- Logs en la consola del navegador y terminal

¿Entendiste? Procede a clonar y configurar el proyecto paso por paso.
```

---

## 🔑 API Keys y Credenciales

### Supabase
- **Project URL**: `https://qcfwborimqejlnkjyjzi.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZndib3JpbXFlamxua2p5anppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMjIyNjEsImV4cCI6MjA1NDg5ODI2MX0.eoFxXxbq8n23yIQjVVVuQVtMYwJ4PUYPeLDQTlsDp4A`
- **Project Ref**: `qcfwborimqejlnkjyjzi`
- **Dashboard**: https://supabase.com/dashboard/project/qcfwborimqejlnkjyjzi

### OpenRouter
- **API Key**: `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`
- **Model**: `anthropic/claude-3.5-haiku`
- **Dashboard**: https://openrouter.ai/

---

## 📋 Contenido del .env.local

Copia exactamente esto en `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://qcfwborimqejlnkjyjzi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZndib3JpbXFlamxua2p5anppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMjIyNjEsImV4cCI6MjA1NDg5ODI2MX0.eoFxXxbq8n23yIQjVVVuQVtMYwJ4PUYPeLDQTlsDp4A

# OpenRouter Configuration
OPENROUTER_API_KEY=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
```

---

## ✅ Verificación Post-Setup

Después de configurar, verifica que:

1. **Base de datos**: Ve a Supabase Table Editor y confirma:
   - Tabla `dishes` tiene ~20 platillos italianos
   - Tabla `reservations` existe (puede estar vacía)

2. **Frontend**: Abre http://localhost:3000 y verifica:
   - El menú se muestra con imágenes
   - Los filtros de categoría funcionan
   - El chat widget aparece (botón flotante)

3. **AI Chat**: En el chat, prueba:
   - "Tell me about your menu"
   - "Check availability for tomorrow at 8pm for 4 people"
   - "Make a reservation" (completa el flujo)

4. **Logs limpios**: No debe haber errores en:
   - Terminal de Next.js
   - Consola del navegador (F12)

---

## 🐛 Troubleshooting

### Error: "Failed to fetch menu"
- Verifica que las migrations se ejecutaron
- Revisa el Supabase URL en .env.local
- Confirma en Supabase Dashboard que la tabla `dishes` existe

### Error: "AI chat not responding"
- Verifica el OPENROUTER_API_KEY en .env.local
- Revisa la consola del navegador para errores de API
- Confirma que `/api/chat` está accesible

### Error: "Port 3000 already in use"
- El script auto-detecta puertos 3000-3006
- Si todos están ocupados: `lsof -i :3000` y `kill -9 <PID>`

---

## 🎯 Siguiente Paso: Deploy a Vercel

Una vez que funcione localmente, deployea a producción:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Agregar las mismas variables de entorno en Vercel Dashboard:
# Settings → Environment Variables
```

---

**Repository**: https://github.com/daniel-carreon/osteria-luna-nera
**Created**: 2025
**License**: Proprietary

Buon appetito! 🍷
