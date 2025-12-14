
  # Project and Finance Organizer

  This is a code bundle for Project and Finance Organizer. The original project is available at https://whoop-repo-12182954.figma.site.

  ## Cómo ejecutar el proyecto

  1. **Instala dependencias**: `npm install` (requiere Node 18+).
  2. **Arranca todo junto (recomendado)**: `npm run dev:full`. Esto inicia el backend en `http://localhost:4000` y Vite en `http://localhost:5173`, con un proxy para que el frontend llame al backend en `/api`.
  3. **Entrar a la app**: abre `http://localhost:5173` en el navegador.

  ### Ejecutar servicios por separado
  - **Solo backend**: `npm run server` (puerto 4000). Endpoints de ejemplo: `/api/auth/login`, `/api/projects`, `/api/finances`, `/api/community`.
  - **Solo frontend**: define `VITE_API_URL` apuntando al backend (por ej. `http://localhost:4000`) y ejecuta `npm run dev`.

  ### Credenciales demo
  - Admin: `admin@uniora.com` / `admin123`
  - Propietario: `propietario@uniora.com` / `owner123`
  - Comité: `comite@uniora.com` / `committee123`
  
