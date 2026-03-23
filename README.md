<p align="center">
  <img src="public/logo.png" alt="FAS AI Agent Logo" width="120" />
</p>

# Website 3.0 — Frontend Field Application Specialist AI Agent

## 1. Descripción general del repositorio

Website 3.0 es la aplicación frontend de la aplicación web Field Application Specialist (FAS) AI Agent. 
Es una SPA (Single Page Application) que consume la API REST expuesta por **Atlas**, el backend del sistema. 

De este modo, el backend queda desacoplado de la capa de presentación; el frontend no contiene lógica de dominio ni acceso directo a base de datos, limitándose a consumir los endpoints de Atlas y reflejar su estado en la UI.Este comportamiento se pre-diseño porque en el futuro próximo se migre tanto el frontend como el backend a modelos de arquitectura más escalables. Por ello no hay que olvidarse de que este proyecto se encuentra actualmente en fase de **MVP**. Por este motivo, tanto la arquitectura como la estructura de carpetas, la organización por módulos y los estándares de calidad del código continuarán evolucionando y mejorando a medida que el producto madure.

El proyecto no ha tenido ni tiene los requisitos funcionales y no funcionales completamente definidos, por lo que desde el inicio se adoptó y se sigue adoptando un modelo iterativo, en el que la arquitectura y las decisiones técnicas evolucionan de forma incremental en función de las necesidades funcionales y de producto.

Previsos a este repositorio,ya consolidado, se desarrollaron dos frontends previos que no se continuaron, ya que no cumplian con la calidad visual y de diseño que este proyecto si se han mantenido. 

---

## 2. Stack tecnológico utilizado

### 2.1 Stack tecnológico principal

| Categoría     | Tecnología        | Versión aproximada | ¿Por qué se ha elegido esta tecnología? |
|---------------|-------------------|--------------------|------------------------------------------|
| **Lenguaje**  | TypeScript        | 5.9.3              | Tipado estático en modo estricto para reducir errores en tiempo de ejecución y mejorar el mantenimiento del código en una aplicación. |
| **Framework** | Vue 3             | 3.5.29              | Se elije Composition API que permite una organización clara por composables y una curva de aprendizaje razonable |
| **Build**     | Vite              | 6.4.1                | Desarrollo rápido y builds de producción optimizados |
| **Routing**   | Vue Router        | 4.6.4                | Integración directa con Vue 3, guards de navegación para rutas protegidas. Es estándar en la industria.|
| **Estado**    | Pinia             | 3.0.4                | Store oficial recomendado para Vue 3, tipado correcto con TypeScript; suficiente para el volumen de estado global actual (autenticación,  login). |
| **HTTP/HTTPS**      | Axios             | 1.13.6              | Cliente HTTP con interceptores para realizar las llamadas HTTP/HTTPS a Atlas. Fácil de configurar|
| **UI**        | PrimeVue          | 4.5.4                | Librería de Componentes accesibles y personalizables; reduce el tiempo de desarrollo en formularios, botones y controles complejos. |
| **Estilos**   | Tailwind CSS      | 3.4.19              | Utilidades de bajo nivel para diseños responsive y consistencia visual sin depender de un sistema de diseño cerrado; se combina con estilos propios y variables CSS donde hace falta. |

### 2.2 Dependencias secundarias de apoyo

| Categoría        | Tecnología       | Versión   | Uso |
|------------------|------------------|-----------|-----|
| **Validación**| Zod               | 3.25.76                | Esquemas reutilizables y tipados para formularios (auth, contacto, subida); los tipos inferidos se alinean con los payloads enviados a la API. |
| **Animaciones**  | @vueuse/motion   | 2.2.6    | Animaciones ligeras respetando `prefers-reduced-motion` para mejorar la accesibilidad. |
| **Iconos**       | primeicons       | 6.0.1    | Iconografía consistente con PrimeVue. |
| **Linter**       | ESLint           | 9.39.4   | Reglas para Vue y TypeScript; ejecución con `--fix` para corrección automática donde aplica. |
| **Formato**      | Prettier         | 3.8.1    | Estrablecer un formato consistente en `src/` independiente del editor. |
| **Tipado Vue**   | vue-tsc          | 3.2.5    | Verificación de tipos en componentes Vue durante el build. |
| **Plugin Vite**  | @vitejs/plugin-vue | 6.0.4  | Compilación de SFC y soporte HMR para Vue 3. |
| **PostCSS**      |  autoprefixer | 10.4.27 | Procesado de CSS y prefijos para compatibilidad. |


El resto de dependencias y sus versiones quedan definidas en package.json y pnpm-lock.yaml. Se mantiene una política estricta de actualización periódica para garantizar la corrección de vulnerabilidades conocidas y reducir la superficie de ataque del proyecto.

Se ha optado por pnpm como gestor de paquetes en lugar de npm debido a su mejor rendimiento en la instalación de dependencias y a un uso más eficiente del espacio en disco, gracias a su estrategia de almacenamiento compartido.
Adicionalmente, se prioriza por motivos de seguridad: en los últimos meses se han registrado múltiples incidentes relacionados con paquetes comprometidos en el ecosistema de npm, por lo que pnpm ofrece un mayor control sobre el árbol de dependencias y una gestión más predecible del lockfile, reduciendo el riesgo de introducir código vulnerable.

La fecha de la última actualización es **17/03/2026**. 

---

## 3. Instalación y ejecución

### 3.1 Instalación en local

Los comandos mostrados en esta documentación se han ejecutado sobre **Ubuntu 24.04 LTS**.El proyecto debería funcionar en cualquier distribución Linux moderna. 

#### 3.1.1 Descarga del código

El código debe descargarse desde el repositorio público en GitHub: https://github.com/MishellRamosAcaro/Website3.0

A continuación se describen los pasos necesarios para ejecutar el frontend en un entorno local.

> **Nota:** Los comandos mostrados a continuación están precedidos por el símbolo `$` y deben ejecutarse en la terminal.

1. Abrir una terminal en el directorio donde se desee ubicar el proyecto.

2. Clonar o descargar el repositorio. Verificar con `git status` y `git remote -v` que el proyecto se ha obtenido correctamente si se usa Git.

```bash
  $ git clone https://github.com/MishellRamosAcaro/Website3.0

  Cloning into 'Website3.0'...
  remote: Enumerating objects: 543, done.
  remote: Counting objects: 100% (543/543), done.
  remote: Compressing objects: 100% (301/301), done.
  remote: Total 543 (delta 294), reused 461 (delta 212), pack-reused 0 (from 0)
  Receiving objects: 100% (543/543), 9.12 MiB | 2.33 MiB/s, done.
  Resolving deltas: 100% (294/294), done.

  $ cd Website3.0

  $ git status

  On branch main
  Your branch is up to date with 'origin/main'.

  $ git remote -v

  origin  https://github.com/MishellRamosAcaro/Website3.0.git (fetch)
  origin  https://github.com/MishellRamosAcaro/Website3.0.git (push)

```

Si estos comandos se ejecutan sin errores y la salida es igual a la que mostramos el proyecto se ha clonado correctamente.



#### 3.1.2 Requisitos necesarios previos a la ejecución

Para ejecutar el frontend en modo desarrollo es necesario cumplir los siguientes requisitos:

- **Node.js 18 o superior** (recomendado **20 LTS**) para el runtime de desarrollo y el proceso de build.  
  El proyecto ha sido validado con **Node.js v24.11.1**, por lo que cualquier versión ≥ 18 debería ser compatible.

- **Backend Atlas en ejecución** (opcional, pero recomendado).  
  Para que funcionalidades como **login, registro, subida de archivos, perfil de usuario y formulario de contacto** funcionen contra datos reales, la API de Atlas debe estar levantada y accesible.(Ver README.md de Atlas) 
  La URL base se configura mediante la variable de entorno `VITE_API_BASE_URL`.  
  Si la variable no está definida o el backend no está disponible, las llamadas a la API fallarán o quedarán limitadas (por ejemplo, solo contenido estático o formularios sin envío real).

- **Archivo `.env`** en la raíz del proyecto
  Puede generarse a partir de `.env.example`.
  La variable necesaria para la integración con el backend es `VITE_API_BASE_URL` (por ejemplo, `http://localhost:8000`).  
  Solo las variables con prefijo `VITE_` se exponen al código cliente, por lo que **no deben almacenarse secretos ni credenciales en este archivo**.

#### 3.1.3 Instalación de dependencias

Antes de instalar las dependencias del proyecto, es necesario disponer del gestor de paquetes **pnpm** (v10.28.2).

Si no está instalado, puede añadirse de forma global mediante:

```bash
npm install -g pnpm

```
A continuación se instalan las dependencias necesarias para preparar el entorno local:

```bash
$ cd Website3.0
$ pnpm install

Lockfile is up to date, resolution step is skipped
Packages: +327
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   ╭───────────────────────────────────────────────╮
   │                                               │
   │     Update available! 10.28.2 → 10.32.1.      │
   │     Changelog: https://pnpm.io/v/10.32.1      │
   │   To update, run: corepack use pnpm@10.32.1   │
   │                                               │
   ╰───────────────────────────────────────────────╯

Progress: resolved 327, reused 327, downloaded 0, added 327, done

dependencies:
+ @vueuse/motion 2.2.6
+ axios 1.13.6
+ pinia 3.0.4
+ primeicons 6.0.1
+ primevue 4.5.4
+ vue 3.5.29
+ vue-router 4.6.4
+ zod 3.25.76

devDependencies:
+ @types/node 20.19.37
+ @vitejs/plugin-vue 6.0.4
+ @vue/eslint-config-prettier 9.0.0
+ @vue/eslint-config-typescript 14.7.0
+ autoprefixer 10.4.27
+ eslint 9.39.4
+ eslint-plugin-vue 10.8.0
+ postcss 8.5.8
+ prettier 3.8.1
+ tailwindcss 3.4.19
+ typescript 5.9.3
+ vite 6.4.1
+ vue-tsc 3.2.5

╭ Warning ───────────────────────────────────────────────────────────────────────────────────╮
│                                                                                            │
│   Ignored build scripts: esbuild@0.25.12, vue-demi@0.14.10.                                │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.   │
│                                                                                            │
╰────────────────────────────────────────────────────────────────────────────────────────────╯
Done in 1.4s using pnpm v10.28.2
```



#### 3.1.4 Ejecución del servidor de desarrollo

Una vez instaladas las dependencias y configurado el archivo `.env`, se puede iniciar el servidor de desarrollo mediante **Vite**.

Se ha modificado la configuración por defecto del proyecto para utilizar el **puerto 8080** al ejecutar el script `dev`, por lo que el servidor se iniciará automáticamente en dicho puerto salvo que se cambie la configuración de Vite.  

Si existe otro proceso utilizando ese puerto, se producirá un **conflicto de puerto**, impidiendo que el servidor de desarrollo se inicie correctamente.  
En ese caso, deberá liberarse el puerto o modificar el puerto configurado en Vite.

Ejecutar el siguiente comando desde la raíz del proyecto:

```bash
$ pnpm run dev

 website3.0@1.0.0 dev /home/mishellramos/projects/FASEnvDev/Website3.0
 vite


  VITE v6.4.1  ready in 512 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

```
 
#### 3.1.5 Construcción y previsualización en local

El comando `build` genera los archivos optimizados para producción en el directorio de salida (`dist/`), mientras que `preview` inicia un servidor local que permite verificar el resultado final de la aplicación en un entorno similar al de producción.

```bash
$ pnpm run build

> website3.0@1.0.0 build /home/mishellramos/projects/FASEnvDev/Website3.0
> vue-tsc && vite build

vite v6.4.1 building for production...
✓ 287 modules transformed.
dist/index.html                          1.64 kB │ gzip:  0.59 kB
dist/assets/primeicons-DsZ1W7-Z.woff2   30.18 kB
dist/assets/primeicons-NDVQFXzF.ttf     72.20 kB
dist/assets/primeicons-CCFeZR6K.woff    72.28 kB
dist/assets/primeicons-Dk_eWBPK.eot     72.38 kB
dist/assets/primeicons-BubJZjaf.svg    291.45 kB │ gzip: 89.84 kB
dist/assets/vendor-C0K41dM0.css         10.03 kB │ gzip:  2.37 kB
dist/assets/index-bcNQEWa1.css          34.64 kB │ gzip:  6.30 kB
dist/assets/utils-vendor-Cy1QmQBi.js    53.42 kB │ gzip: 12.20 kB
dist/assets/vendor-pEFuLjp6.js         127.36 kB │ gzip: 36.19 kB
dist/assets/index-BHvkW2ne.js          192.92 kB │ gzip: 50.35 kB
dist/assets/vue-vendor-C94f1qkt.js     285.74 kB │ gzip: 86.51 kB
✓ built in 2.28s

$ pnpm run preview

> website3.0@1.0.0 preview /home/mishellramos/projects/FASEnvDev/Website3.0
> vite preview

  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
^C ELIFECYCLE  Command failed.


```

#### 3.1.6 Formateo de código con Prettier

Prettier se utiliza para mantener un formato de código consistente en el directorio `src/`.El formateo no modifica la lógica del código, únicamente ajusta el estilo (espaciado, saltos de línea, comillas, etc.), por lo que es seguro ejecutarlo antes de commits o builds.. Para ejecutar el formateo, usar el siguiente comando desde la raíz del proyecto:

```bash
$ pnpm run format

> website3.0@1.0.0 format /home/mishellramos/projects/FASEnvDev/Website3.0
> prettier --write src/

src/App.vue 57ms (unchanged)
src/components/layout/Footer.vue 23ms (unchanged)
src/components/layout/TopBar.vue 48ms (unchanged)
src/components/sections/ContactSection.vue 19ms (unchanged)
...
```
Este comando ejecuta prettier --write src/, aplicando las reglas de formato a todos los archivos dentro del directorio src/.
La definición de este comando se encuentra en en el archivo **`package.json`**, dentro de la sección `scripts` (format).


#### 3.1.7 Análisis estático con ESLint

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
