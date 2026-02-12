# Website 3.0 — Field Application Specialist AI Agent

Sitio web corporativo para **Field Application Specialist AI Agent**: una landing con secciones de presentación, skills, demo y formulario de contacto.

## Stack

- **Vue 3** (Composition API) + **TypeScript**
- **Vite 5** — build y dev server
- **Vue Router** — rutas (history mode)
- **PrimeVue** — componentes UI y notificaciones (Toast)
- **Tailwind CSS** — estilos
- **Zod** — validación (formulario de contacto)
- **@vueuse/motion** — animaciones

## Requisitos

- **Node.js** 20+
- **pnpm** (recomendado) o npm/yarn

## Instalación

```bash
pnpm install
```

## Scripts

| Comando        | Descripción                    |
|----------------|--------------------------------|
| `pnpm dev`     | Servidor de desarrollo (Vite) |
| `pnpm build`   | Build de producción → `dist/`  |
| `pnpm preview` | Vista previa del build         |
| `pnpm lint`    | ESLint                         |
| `pnpm format`  | Prettier                       |

## Estructura del proyecto

```
src/
├── components/
│   ├── layout/     # TopBar, Footer
│   ├── sections/   # Hero, Skills, Demo, Contact
│   └── ui/         # SkillCard, etc.
├── composables/    # useContact, useScrollTo
├── lib/
│   ├── api/        # config, contact (llamadas al backend)
│   ├── data/       # datos estáticos (skills)
│   └── validation/ # esquemas Zod
├── router/         # rutas
├── styles/         # main.css, Tailwind
└── views/          # HomeView (página principal)
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta si usas backend:

| Variable            | Descripción |
|---------------------|-------------|
| `VITE_API_BASE_URL` | URL base del API (opcional). Si no se define, el formulario de contacto solo muestra éxito local. |

## Despliegue con Docker (HTTPS)

El proyecto incluye un **Dockerfile** multi-stage que construye la app y la sirve con **nginx** por el puerto 8080.

### Construir la imagen

```bash
docker build -t website3 .
```

### Ejecutar el contenedor

```bash
docker run -p 8080:8080 website3
```

Acceso: **http://localhost:8080**

### Nombre del servidor

El sitio está configurado para servirse por nombre de servidor (p. ej. `fas-agent.com`). La configuración está en `nginx/default.conf` (`server_name`). Para usar otro dominio, edita ese archivo o monta tu propio `default.conf`.

## Licencia

Privado / según tu organización.
