# Website 3.0 — Frontend Field Application Specialist AI Agent

## 1. Descripción general del repositorio

Website 3.0 es la aplicación frontend de la solución web Field Application Specialist (FAS) AI Agent. Es una SPA (Single Page Application) que consume la API REST expuesta por **Atlas**, el backend del sistema. El frontend se encarga de la presentación, la interacción con el usuario, la validación básica en cliente y la orquestación de las llamadas HTTP hacia la API; toda la lógica de negocio, persistencia y servicios externos reside en el backend.

El frontend centraliza:
- La experiencia de usuario (landing, autenticación, flujos de subida y análisis de documentos).
- La gestión de sesión en cliente (estado de autenticación, redirección ante rutas protegidas, renovación de tokens mediante cookies HttpOnly).
- La visualización y edición de datos devueltos por la API (perfil, archivos, extracciones, enriquecimientos).
- La coherencia de interfaz, accesibilidad y SEO (metadatos por ruta, datos estructurados, HTML semántico).

De este modo, el backend queda desacoplado de la capa de presentación; el frontend no contiene lógica de dominio ni acceso directo a base de datos, limitándose a consumir los endpoints de Atlas y reflejar su estado en la UI.

No hay que olvidarse de que este proyecto se encuentra actualmente en fase de **MVP**. Por este motivo, tanto la arquitectura como la estructura de carpetas, la organización por módulos y los estándares de calidad del código continuarán evolucionando a medida que el producto madure.

Se trata de un proyecto con una gran incertidumbre, en el que las decisiones técnicas y de diseño se ajustan de forma iterativa en función de las necesidades funcionales y de producto. En consecuencia, la solución actual debe entenderse como una base evolutiva, diseñada para crecer y refinarse progresivamente conforme se consoliden los requisitos y se estabilice el ecosistema frontend-backend.

---

## 2. Stack tecnológico utilizado

### 2.1 Stack tecnológico principal

| Categoría     | Tecnología        | Versión aproximada | ¿Por qué se ha elegido esta tecnología? |
|---------------|-------------------|--------------------|------------------------------------------|
| **Lenguaje**  | TypeScript        | 5.3.x              | Tipado estático en modo estricto para reducir errores en tiempo de ejecución y mejorar el mantenimiento del código en una aplicación que integra múltiples fuentes de datos (API, formularios, estado global). |
| **Framework** | Vue 3             | 3.4.x              | Composition API y `<script setup>` permiten una organización clara por composables y una curva de aprendizaje razonable; el ecosistema (Vue Router, Pinia) está alineado con el mismo estilo de desarrollo. |
| **Build**     | Vite              | 6.x                | Desarrollo rápido con HMR, builds de producción optimizados y soporte nativo para ESM y variables de entorno con prefijo `VITE_`. |
| **Routing**   | Vue Router        | 4.x                | Integración directa con Vue 3, guards de navegación para rutas protegidas y scroll behavior configurable. |
| **Estado**    | Pinia             | 3.x                | Store oficial recomendado para Vue 3, tipado correcto con TypeScript y sin mutaciones explícitas; suficiente para el volumen de estado global actual (autenticación, modal de login). |
| **HTTP**      | Axios             | 1.7.x              | Cliente HTTP con interceptores para renovación de tokens en 401, `withCredentials` para cookies HttpOnly y extracción centralizada de mensajes de error de la API. |
| **UI**        | PrimeVue          | 4.x                | Componentes accesibles y personalizables (unstyled + temas propios); reduce el tiempo de desarrollo en formularios, modales y controles complejos. |
| **Estilos**   | Tailwind CSS      | 3.4.x              | Utilidades de bajo nivel para diseños responsive y consistencia visual sin depender de un sistema de diseño cerrado; se combina con estilos propios y variables CSS donde hace falta. |
| **Validación**| Zod               | 3.x                | Esquemas reutilizables y tipados para formularios (auth, contacto, subida); los tipos inferidos se alinean con los payloads enviados a la API. |

### 2.2 Dependencias secundarias de apoyo

| Categoría        | Tecnología       | Uso |
|------------------|------------------|-----|
| **Animaciones**  | @vueuse/motion   | Animaciones ligeras respetando `prefers-reduced-motion` para mejorar la accesibilidad. |
| **Iconos**       | primeicons      | Iconografía consistente con PrimeVue. |
| **Linter**       | ESLint          | Reglas para Vue y TypeScript; ejecución con `--fix` para corrección automática donde aplica. |
| **Formato**      | Prettier        | Formato consistente en `src/` independiente del editor. |
| **Tipado Vue**   | vue-tsc         | Verificación de tipos en componentes Vue durante el build. |
| **Plugin Vite**  | @vitejs/plugin-vue | Compilación de SFC y soporte HMR para Vue 3. |
| **PostCSS**      | tailwindcss, autoprefixer | Procesado de CSS y prefijos para compatibilidad. |

### 2.3 Consideraciones de versión y seguridad

Las versiones exactas se fijan en `package.json` y `pnpm-lock.yaml`. Se recomienda mantener dependencias actualizadas y revisar avisos de seguridad con `pnpm audit`. En un MVP en evolución, la prioridad es compatibilidad con el backend Atlas y estabilidad del entorno de desarrollo; las actualizaciones mayores (Vue, Vite, PrimeVue) deben probarse de forma explícita antes de subir de versión.

---

## 3. Instalación y ejecución

### 3.1 Instalación en local

#### 3.1.1 Descarga del código

El código debe descargarse desde el repositorio del proyecto (por ejemplo, clonando el repositorio que contenga Website 3.0). A continuación se describen los pasos necesarios para ejecutar el frontend en un entorno local.

> **Nota:** Los comandos mostrados a continuación están precedidos por el símbolo `$` y deben ejecutarse en la terminal.

1. Abrir una terminal en el directorio donde se desee ubicar el proyecto.

2. Clonar o descargar el repositorio y entrar en el directorio del frontend (por ejemplo `Website3.0`). Verificar con `git status` y `git remote -v` que el proyecto se ha obtenido correctamente si se usa Git.

3. Instalar dependencias con **pnpm** (recomendado), **npm** o **yarn**:

```bash
$ cd Website3.0
$ pnpm install
```

#### 3.1.2 Requisitos necesarios previos a la ejecución

Para poder ejecutar el frontend en modo desarrollo necesitas:

- **Node.js 18 o superior** (recomendado 20 LTS) para el runtime de desarrollo y build.

- **Backend Atlas en ejecución** (opcional pero recomendado). Para que el login, el registro, la subida de archivos, el perfil y el formulario de contacto funcionen de forma real, la API Atlas debe estar levantada y accesible. La URL base se configura en la variable de entorno `VITE_API_BASE_URL`. Si no se define o el backend no está disponible, las llamadas a la API fallarán o quedarán limitadas (por ejemplo, solo contenido estático o formulario de contacto sin envío real).

- **Archivo `.env`** en la raíz del proyecto (opcional). Puede copiarse desde `.env.example`. La variable imprescindible para integrar con el backend es `VITE_API_BASE_URL` (por ejemplo `http://localhost:8000`). El resto de variables `VITE_*` son opcionales (título de la app, flags de depuración, etc.). Solo las variables con prefijo `VITE_` se exponen al código cliente; no deben incluirse secretos en este archivo.

#### 3.1.3 Ejecutar el servidor de desarrollo

Una vez instaladas las dependencias y configurado el `.env` si se desea conectar con Atlas, se puede iniciar el servidor de desarrollo con Vite.

Ejecutar el siguiente comando desde la raíz del proyecto:

```bash
$ pnpm dev
```

En producción (Docker), el frontend se sirve en el puerto **80** (http://localhost). En desarrollo local, Vite se sirve en el puerto configurable en `vite.config.ts` (por defecto 5173). Vite aplica HMR (Hot Module Replacement), de modo que los cambios en el código se reflejan en el navegador sin recarga completa cuando así lo permiten los módulos.

Para probar un build de producción en local:

```bash
$ pnpm build
$ pnpm preview
```

#### 3.1.4 Formateo de código con Prettier

Prettier se utiliza para mantener un formato de código consistente en el directorio `src/`. No modifica la lógica del programa, solo el estilo. Se ejecuta desde la raíz del proyecto:

```bash
$ pnpm format
```

#### 3.1.5 Análisis estático con ESLint

ESLint se utiliza como linter principal para detectar problemas de estilo, imports no usados y patrones no recomendados en archivos `.vue`, `.ts` y `.tsx`.

```bash
$ pnpm lint
```

El script incluye `--fix` para corregir automáticamente los problemas que lo permitan.


---

## 4. Estructura del proyecto y arquitectura aplicada

El proyecto sigue una organización **modular y orientada a responsabilidades**, con separación clara entre vistas, componentes reutilizables, lógica reutilizable (composables), capa de API y estado global. El objetivo es facilitar el mantenimiento y la evolución sin acoplar la UI a detalles de la API o a una estructura monolítica.

Website 3.0 no se organiza como un conjunto de páginas sueltas, sino con una distinción explícita entre **vistas (rutas)**, **componentes de presentación**, **lógica compartida (composables)**, **cliente HTTP y configuración (lib/api)** y **estado global (stores)**. Con ello se mejora la trazabilidad de cambios y se acota el impacto de modificaciones en un flujo concreto.

### 4.1 Arquitectura utilizada

La arquitectura se describe como **por capas y por responsabilidades**, típica de una SPA Vue que consume una API externa:

- **Capa de entrada y enrutado**: `router` define las rutas y los guards (por ejemplo, `requiresAuth`); el guard consulta el estado de autenticación y redirige o abre el modal de login cuando el usuario no está autenticado y la ruta lo exige.

- **Capa de vistas**: `views/` agrupa los componentes de página asociados a cada ruta (Home, Upload, Profile, VerifyEmail, Privacy, Terms). Cada vista orquesta secciones y componentes UI y delega en composables o stores la lógica y las llamadas a la API.

- **Capa de componentes**: `components/layout/` (TopBar, Footer), `components/sections/` (bloques de la home: Hero, Skills, Demo, Contact) y `components/ui/` (AuthModal, FileUploadZone, FileViewZone, ExtractedDocumentPanel, UserMenuPanel, SkillCard) encapsulan la presentación y la interacción reutilizable.

- **Capa de lógica reutilizable**: `composables/` concentra la lógica de formularios y flujos (useLogin, useRegister, useVerifyEmail, useContact, useFileUpload, useScrollTo, usePrivacyPolicy, useTermsOfService) sin acoplarlos a una vista concreta.

- **Capa de API y configuración**: `lib/api/` expone la instancia Axios configurada (base URL, cookies, interceptor de refresh ante 401), los módulos por dominio (auth, contact, uploadFiles, enrichments) y la lectura de `VITE_API_BASE_URL` en `config.ts`.

- **Capa de estado global**: `stores/` (por ejemplo `auth`) mantiene el estado de sesión, la visibilidad del modal de login/registro y la ejecución idempotente de la comprobación de sesión (`runSessionCheck`).

- **Validación y tipos**: `lib/validation/` contiene los esquemas Zod; `types/` y los tipos inferidos o declarados se usan en formularios y en las respuestas de la API para mantener coherencia con el backend.

### 4.2 Decisión arquitectónica

La estructura no aplica patrones de forma dogmática, sino que resuelve un problema concreto: una SPA que debe ofrecer landing, autenticación, subida y análisis de archivos, perfil y páginas legales, consumiendo una API REST con sesión en cookies y renovación de tokens. En resumen:

- **Organización por carpetas por responsabilidad** (views, components, composables, lib, stores).
- **Separación explícita** entre presentación (componentes/vistas), orquestación (composables) y comunicación con el backend (lib/api).
- **Un único punto de configuración HTTP** (axiosConfig + config) y un store de autenticación centralizado para evitar estados incoherentes.

### 4.3 Mejoras y evolución futura

La estructura actual es adecuada para el estado MVP y está preparada para evolucionar. Mejoras razonables a futuro:

- Introducir una capa de **servicios o adaptadores** por dominio si la cantidad de endpoints y transformaciones crece (por ejemplo, mapeo específico de respuestas de extracción/enriquecimiento).
- Formalizar **contratos con el backend** (tipos compartidos o generados a partir de OpenAPI) para reducir desalineaciones entre frontend y API.
- Reforzar **tests** (unitarios de composables y componentes, e2e de flujos críticos) en cuanto se estabilice el producto.
- Considerar **lazy loading** por ruta si el tamaño del bundle crece (Vue Router ya permite `component: () => import(...)`).
- Documentar decisiones estructurales con **ADRs (Architecture Decision Records)** si el equipo crece o el proyecto se vuelve referencia.

En conjunto, la estructura actual cubre las necesidades presentes del frontend y establece una base técnica para crecer sin perder claridad en la separación de responsabilidades.


---

## 5. Funcionalidades principales

En esta sección se describen las capacidades del frontend desde un punto de vista técnico, vinculando cada flujo con las rutas, los componentes y los endpoints de la API Atlas que consume. Se utiliza la técnica Given/When/Then para describir el comportamiento esperado de forma estructurada.

### 5.1 Página de inicio y contenido estático

La vista principal (`HomeView`) agrupa el hero, la sección de capacidades (skills), la sección demo y el formulario de contacto. El frontend no ejecuta lógica de negocio; presenta contenido y enlaza a rutas protegidas o a acciones que disparan llamadas a la API.

- **Landing (hero, skills, demo)**  
  Ruta: `/`  
  - Given: El usuario accede a la raíz de la aplicación.  
  - When: La vista se renderiza con las secciones Hero, Skills y Demo.  
  - Then: El usuario puede navegar por anclas (scroll suave), ver las capacidades del producto y acceder al CTA de análisis de archivos o al formulario de contacto.

- **Formulario de contacto**  
  Componente: `ContactSection`; API: `POST /contact`  
  - Given: El usuario rellena nombre, email, empresa y mensaje; el honeypot no está rellenado.  
  - When: El usuario envía el formulario validado con Zod.  
  - Then: El frontend envía un POST a `/contact`; muestra mensaje de éxito o error según la respuesta del backend; el backend se encarga del envío del correo (Resend).

- **Política de privacidad y términos de servicio**  
  Rutas: `/privacy`, `/terms`  
  - Given: El usuario navega a estas rutas.  
  - When: Se cargan las vistas `PrivacyView` y `TermsView`.  
  - Then: Se muestra el contenido legal (por ejemplo, cargado desde composables `usePrivacyPolicy` y `useTermsOfService`); no se requiere autenticación.

### 5.2 Autenticación y sesión

El frontend no es fuente de verdad de la identidad; solo refleja el estado de sesión obtenido del backend (cookie HttpOnly, `GET /auth/me`) y orquesta el login, registro y verificación de email mediante la API.

- **Apertura del modal de login/registro**  
  - Given: El usuario no está autenticado y navega a una ruta con `meta.requiresAuth` (por ejemplo `/upload` o `/profile`).  
  - When: El guard del router comprueba la sesión (`runSessionCheck` → `GET /auth/me`).  
  - Then: Si no hay sesión válida, se redirige a `/` y se abre el modal de login (configurable a registro).

- **Registro de usuario**  
  API: `POST /auth/register`  
  - Given: El usuario no tiene cuenta y rellena el formulario de registro (nombre, email, contraseña, país, teléfono según implementación).  
  - When: El usuario envía el formulario validado.  
  - Then: El frontend llama a `POST /auth/register`; si la respuesta es correcta, se indica que debe verificarse el email (flujo de verificación en `/verify-email`).

- **Verificación de email**  
  Ruta: `/verify-email`; API: `POST /auth/verify-email`  
  - Given: El usuario ha recibido un código de verificación por correo.  
  - When: El usuario introduce el código en la vista de verificación y envía.  
  - Then: El frontend envía el código a `POST /auth/verify-email`; si es válido, el backend activa la cuenta y el usuario puede iniciar sesión.

- **Login con credenciales**  
  API: `POST /auth/token` (grant_type=password)  
  - Given: El usuario tiene cuenta verificada.  
  - When: El usuario introduce email y contraseña en el modal y envía.  
  - Then: El frontend envía las credenciales a `POST /auth/token`; el backend responde con cookies HttpOnly (access/refresh); el store marca al usuario como autenticado y cierra el modal.

- **Renovación de sesión ante 401**  
  - Given: El usuario tenía sesión y una petición a la API devuelve 401.  
  - When: El interceptor de Axios detecta el 401 (excepto en endpoints de auth/token y logout).  
  - Then: Se intenta una única llamada a `POST /auth/token` con grant_type=refresh_token; si tiene éxito, se reenvía la petición original; si falla, se invoca el handler de sesión expirada (logout y redirección a home).

- **Cierre de sesión**  
  API: `POST /auth/logout`  
  - Given: El usuario está autenticado.  
  - When: El usuario cierra sesión desde el menú o el flujo correspondiente.  
  - Then: El frontend llama a `POST /auth/logout` (best-effort); el store limpia el estado de autenticación y redirige a `/`.

### 5.3 Perfil de usuario

Los datos del perfil provienen exclusivamente del backend; el frontend solo los muestra y envía actualizaciones mediante PATCH.

- **Consulta del perfil**  
  Ruta: `/profile` (protegida); API: `GET /auth/me`  
  - Given: El usuario está autenticado.  
  - When: El usuario accede a `/profile`.  
  - Then: El frontend solicita `GET /auth/me` y muestra los datos del usuario (nombre, email, etc.) en `ProfileView`.

- **Actualización de perfil y cambio de contraseña**  
  API: `PATCH /auth/me`, `PATCH /auth/me/password`  
  - Given: El usuario está en la vista de perfil.  
  - When: El usuario modifica datos o contraseña y envía el formulario.  
  - Then: El frontend envía los cambios a los endpoints correspondientes; el backend valida y persiste; se muestra éxito o error según la respuesta.

### 5.4 Subida y análisis de archivos

El flujo de subida, extracción y enriquecimiento está orquestado por el backend; el frontend envía el archivo, muestra el progreso y lista o visualiza los resultados según los endpoints expuestos por Atlas.

- **Subida y flujo combinado (upload + extracción + enriquecimiento)**  
  Ruta: `/upload` (protegida); API: `POST /upload-extract-enrichment`.  
  - Given: El usuario está autenticado y en la vista de subida.  
  - When: El usuario arrastra o selecciona un archivo PDF y confirma el envío.  
  - Then: El frontend envía el archivo a la API con la instancia configurada (cookies); muestra progreso de subida y de extracción/enriquecimiento; al finalizar, muestra el resultado o lo incorpora al listado de archivos.

- **Listado, descarga y eliminación de archivos**  
  API: listado, descarga y borrado de archivos (endpoints expuestos por Atlas para uploads del usuario).  
  - Given: El usuario tiene archivos subidos.  
  - When: El usuario consulta la lista, solicita descargar o eliminar un archivo.  
  - Then: El frontend llama a los endpoints correspondientes y actualiza la UI (listado, panel de documento, opciones de descarga y borrado según permisos y estado del archivo en el backend).

- **Visualización y edición del documento extraído/enriquecido**  
  API: `GET /extractions/{file_id}/document`, `PATCH /extractions/{file_id}/document`, y endpoints de enriquecimiento si aplica.  
  - Given: El usuario es propietario del archivo y existe extracción (y opcionalmente enriquecimiento).  
  - When: El usuario abre el panel de documento o edita metadatos (tipo, contexto técnico, nivel de riesgo, audiencia, etc.).  
  - Then: El frontend obtiene los datos con GET y envía actualizaciones con PATCH; el backend persiste los cambios; la UI refleja el estado actual (secciones, keywords, metadatos).

### 5.5 SEO, accesibilidad y seguridad en cliente

- **SEO**: Títulos y meta por ruta (router), Open Graph y Twitter Card donde corresponda, datos estructurados JSON-LD (por ejemplo Organization, WebSite) en la home; URL canónica si se configura.
- **Accesibilidad**: HTML semántico, ARIA donde aplica, etiquetas en formularios, soporte de teclado y respeto a `prefers-reduced-motion` en animaciones (@vueuse/motion).
- **Seguridad en cliente**: Cabeceras de seguridad en el servidor de desarrollo (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) configuradas en `vite.config.ts`; validación Zod en formularios; sin `v-html` sin sanitizar; cookies manejadas por el backend (HttpOnly).


---

## 6. Relación con el backend (Atlas) y configuración

El frontend depende de la API Atlas para autenticación, perfil, archivos, extracciones, enriquecimientos y contacto. La URL base se configura mediante la variable de entorno **`VITE_API_BASE_URL`** (por ejemplo `http://localhost:8000`). Todas las peticiones salientes usan la instancia definida en `lib/api/axiosConfig.ts`, que:

- Usa `baseURL` y envía cookies con `withCredentials: true`.
- Aplica un interceptor de respuesta que, ante 401, intenta renovar la sesión con `POST /auth/token` (refresh_token) y reenviar la petición, o invocar el handler de sesión expirada (logout y redirección).

La documentación interactiva de la API (Swagger/OpenAPI) está disponible en el backend en `/docs` cuando Atlas se ejecuta en modo desarrollo; es útil para contrastar contratos (paths, cuerpos, códigos de respuesta) con lo que el frontend espera. En producción, el backend puede deshabilitar estas rutas; el frontend no las consume directamente.


---

## 7. Comandos de desarrollo

Definidos en `package.json`:

| Comando        | Descripción |
|----------------|-------------|
| `pnpm dev`     | Inicia el servidor de desarrollo Vite (puerto en `vite.config.ts`; por defecto 5173) con HMR. En producción (Docker), el frontend se sirve en el puerto 80. |
| `pnpm build`   | Ejecuta la comprobación de tipos con `vue-tsc` y genera el build de producción con `vite build`. |
| `pnpm preview` | Sirve localmente el resultado de `pnpm build` para pruebas pre-despliegue. |
| `pnpm lint`    | Ejecuta ESLint sobre `.vue`, `.js`, `.jsx`, `.ts`, `.tsx` con `--fix`. |
| `pnpm format`  | Aplica Prettier sobre `src/` para unificar el formato. |


---

## 8. Buenas prácticas y calidad

- **Arquitectura por capas**: Separación clara entre vistas, componentes, composables, `lib/api` y stores; un único punto de configuración HTTP y de lectura de variables `VITE_*`.
- **Configuración tipada**: Uso de `import.meta.env.VITE_*` para variables de entorno; tipos explícitos en respuestas de API y formularios (Zod + TypeScript).
- **Estado y sesión**: Pinia para estado global; comprobación de sesión idempotente (`runSessionCheck`) y guard de rutas para rutas protegidas; manejo de sesión expirada centralizado en el interceptor de Axios.
- **Calidad de código**: ESLint y Prettier; convenciones de nombres y estructura de componentes Vue (template, script setup, style scoped); composables con responsabilidad única.
- **Accesibilidad y SEO**: HTML semántico, ARIA donde aplica, `prefers-reduced-motion` en animaciones; meta y datos estructurados por ruta.
- **Seguridad en cliente**: Sin secretos en variables `VITE_*`; validación Zod en formularios; cabeceras de seguridad en el servidor de desarrollo (CSP, X-Frame-Options, etc.); cookies gestionadas por el backend.

La documentación de gobierno técnico, convenciones de componentes, estilos y patrones de código se detalla en el archivo **`AGENTS.MD`** en la raíz del repositorio. Este documento sirve como referencia para mantener coherencia en la evolución del frontend y en la integración con Atlas.
