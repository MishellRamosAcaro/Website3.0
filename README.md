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
  Para que funcionalidades como **login, registro, subida de archivos, perfil de usuario y formulario de contacto** funcionen contra datos reales, la API de Atlas debe ser consumible.
  Todas las peticiones salientes usan la instancia definida en `lib/api/axiosConfig.ts`, que:
    - Usa `baseURL` y envía cookies con `withCredentials: true`.
    - Aplica un interceptor de respuesta que, ante 401, intenta renovar la sesión con `POST /auth/token` (refresh_token) y reenviar la petición, o invocar el handler de sesión expirada (logout y redirección).
    - La URL base se configura mediante la variable de entorno `VITE_API_BASE_URL`.Si la variable no está definida o el backend no está disponible, las llamadas a la API fallarán o quedarán limitadas (por ejemplo, solo contenido estático o formularios sin envío real).
    -  La documentación interactiva de la API (Swagger/OpenAPI) está disponible en el backend en `/docs` cuando Atlas se ejecuta en modo desarrollo; es útil para contrastar contratos (paths, cuerpos, códigos de respuesta) con lo que el frontend espera. En producción, el backend bloquea el acceso a esta información.

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

Se utiliza **ESLint** como herramienta principal de análisis estático para detectar problemas de estilo, variables no utilizadas, imports incorrectos y patrones no recomendados en archivos `.vue`, `.ts` y `.tsx`.

Para ejecutar el análisis, usar el siguiente comando desde la raíz del proyecto:

```bash
pnpm lint

> website3.0@1.0.0 lint /home/mishellramos/projects/FASEnvDev/Website3.0
> eslint . --fix

```
La opción --fix permite corregir automáticamente todos los problemas que pueden resolverse de forma segura, manteniendo el código alineado con las reglas de lint configuradas en el proyecto.

> Se recomienda ejecutar pnpm lint antes de realizar commits para evitar introducir errores de estilo o código no válido.

---

## 4. Estructura y Arquitectura aplicada

El proyecto sigue una arquitectura **modular y orientada a responsabilidades**, con una separación clara entre vistas, componentes reutilizables, lógica compartida (*composables*), capa de acceso a API y gestión de estado global.  

Esta organización tiene como objetivo mejorar la mantenibilidad, facilitar la escalabilidad y permitir la evolución del código sin acoplar la interfaz de usuario a los detalles de la API ni a una estructura monolítica.

Esta estructura permite mejorar la trazabilidad de los cambios, reducir el acoplamiento entre módulos y limitar el impacto de las modificaciones a los flujos funcionales afectados, facilitando el mantenimiento y la evolución del sistema. Conforme crezca el proyecto se va orientando a un sistema por capas. 

### 4.1 Arquitectura utilizada

La aplicación sigue una **arquitectura modular por capas orientada a responsabilidades**.
La separación de capas permite desacoplar la interfaz de usuario, la lógica de negocio y el acceso a datos, facilitando el mantenimiento y la evolución del sistema.

- **Capa de entrada y enrutado**  
  El directorio `router/` define las rutas de la aplicación y los *route guards* (por ejemplo, `requiresAuth`).  
  El guard consulta el estado de autenticación y decide si permite la navegación, redirige o abre el modal de login cuando la ruta requiere sesión activa.

- **Capa de vistas**  
  El directorio `views/` contiene los componentes asociados a cada ruta (`Home`, `Upload`, `Profile`, `VerifyEmail`, `Privacy`, `Terms`).  
  Cada vista actúa como orquestador, componiendo secciones y componentes UI, y delegando la lógica en *composables*, *stores* o servicios de API.

- **Capa de componentes**  
  El directorio `components/` agrupa los elementos reutilizables de la interfaz:
  - `components/layout/` → estructura global (`TopBar`, `Footer`)
  - `components/sections/` → bloques funcionales de páginas (`Hero`, `Skills`, `Demo`, `Contact`)
  - `components/ui/` → componentes reutilizables (`AuthModal`, `FileUploadZone`, `FileViewZone`, `ExtractedDocumentPanel`, `UserMenuPanel`, `SkillCard`)

  Esta capa encapsula la presentación y la interacción, evitando que las vistas contengan lógica de bajo nivel.

- **Capa de lógica reutilizable (Composables)**  
  El directorio `composables/` centraliza la lógica reutilizable independiente de la vista, incluyendo flujos de formularios y operaciones comunes:
  `useLogin`, `useRegister`, `useVerifyEmail`, `useContact`, `useFileUpload`, `useScrollTo`, `usePrivacyPolicy`, `useTermsOfService`.

  Los composables permiten reutilizar comportamiento sin acoplarlo a un componente concreto.

- **Capa de API y configuración**  
  El directorio `lib/api/` contiene la configuración de acceso al backend:
  - Instancia de **Axios** configurada (base URL, cookies, interceptor de refresh ante `401`)
  - Módulos por dominio (`auth`, `contact`, `uploadFiles`, `enrichments`)
  - Lectura de variables de entorno en `config.ts` (`VITE_API_BASE_URL`)

  Esta capa aísla completamente la comunicación con la API del resto de la aplicación.

- **Capa de estado global**  
  El directorio `stores/` gestiona el estado compartido mediante stores (por ejemplo `auth`).  
  Aquí se mantiene el estado de sesión, la visibilidad del modal de autenticación y la ejecución controlada de la comprobación de sesión (`runSessionCheck`).

- **Validación y tipado**  
  - `lib/validation/` contiene los esquemas **Zod** para validación de formularios y datos.
  - `types/` define los tipos utilizados en la aplicación.
  - Los tipos se usan tanto en formularios como en respuestas de API para mantener coherencia con el backend.

Esta organización permite mantener una estructura escalable, predecible y desacoplada, alineada con buenas prácticas en aplicaciones SPA modernas.

### 4.2 Decisión arquitectónica

Como hemos comentado antes es una **arquitectura modular por capas orientada a responsabilidades**,propia de una SPA moderna basada en Vue Composition API, con separación explícita entre las distintas capas.   
Este enfoque se alinea con el patrón **Layered Architecture aplicado a frontend**, combinado con un modelo **Client–API desacoplado**, lo que permite mejorar la mantenibilidad, escalabilidad y previsibilidad del sistema.

### 4.3 Mejoras y evolución futura

La arquitectura actual establece una base modular y desacoplada que permite su evolución natural hacia un modelo más cercano a **Clean Architecture**.  
A medida que aumente la complejidad funcional del sistema se podrá refinarse en capas más estrictas, diferenciando con mayor claridad la **presentación**, los **casos de uso**, la **lógica de dominio** y la **infraestructura**.

---

## 5. Funcionalidades principales

En esta sección se describen las funcionalidades tal como están implementadas en el frontend (vistas, componentes, stores y composables). Se utiliza la técnica Given/When/Then para definir de forma estructurada las funcionalidades principales y los requisitos del sistema.

## 5. Requisitos funcionales

### 5.1 Navegación y contenido público

#### Acceso a la página principal
 Given: el usuario accede a la aplicación desde la ruta principal,  
 When: se carga la página de inicio,  
 Then: el sistema debe mostrar la landing principal con las secciones informativas y de presentación del producto.

#### Navegación interna por secciones de la landing
 Given: el usuario se encuentra en la página principal,  
 When: selecciona un acceso en el topbar,  
 Then: el sistema debe desplazar la vista hasta la sección correspondiente de forma fluida.

#### Visualización de información ampliada de skills
 Given: el usuario navega por la sección de skills,  
 When: solicita ampliar la información de una capacidad concreta,  
 Then: el sistema debe mostrar el detalle asociado sin abandonar la página actual.

#### Reproducción de la demo visual
 Given: el usuario accede a la sección de demostración,  
 When: interactúa con el recurso multimedia disponible,  
 Then: el sistema debe permitir la reproducción del contenido embebido.

---

### 5.2 Contacto, privacidad y términos

#### Envío del formulario de contacto
 Given: el usuario completa los campos obligatorios del formulario,  
 When: envía la solicitud,  
 Then: el sistema debe validar los datos y mostrar un mensaje de éxito o error según el resultado.

#### Prevención de envíos automatizados
 Given: el usuario utiliza el formulario de contacto,  
 When: el sistema detecta un comportamiento incompatible con un uso legítimo,  
 Then: debe bloquear el envío para evitar envios no deseados.

#### Consulta de la política de privacidad
 Given: el usuario accede a la pantalla de política de privacidad,  
 When: se carga la información,  
 Then: el sistema debe mostrar el contenido legal correspondiente.

#### Consulta de los términos de servicio
 Given: el usuario accede a la pantalla de términos de servicio,  
 When: se carga la vista,  
 Then: el sistema debe mostrar el contenido legal correspondiente.

---

### 5.3 Autenticación y sesión

#### Navegación pública sin autenticación
 Given: el usuario accede a contenido informativo o legal (términos y condiciones),  
 When: navega por esa información,  
 Then: el sistema no debe exigir autenticación.

#### Restricción de acceso a áreas protegidas
 Given: un usuario no autenticado intenta acceder a una funcionalidad restringida,  
 When: el sistema detecta que la ruta requiere autenticación,  
 Then: debe impedir el acceso y redirigir al contexto público.

#### Apertura del flujo de autenticación
 Given: el acceso a una funcionalidad protegida es denegado,  
 When: el sistema detecta que el usuario no está autenticado,  
 Then: debe ofrecer el mecanismo de inicio de sesión.

#### Registro de usuario
 Given: el usuario introduce los datos requeridos y acepta las condiciones,  
 When: solicita crear una cuenta,  
 Then: el sistema debe validar la información y registrar el usuario si es correcta.

#### Redirección tras registro correcto
 Given: el registro se completa correctamente,  
 When: finaliza el proceso,  
 Then: el sistema debe redirigir al usuario al flujo de verificación de correo.

#### Envio de código mediante correo

 Given: el usuario se ha registrado correctamente.
 When: cuando finaliza el proceso de registro,  
 Then: el sistema envia un código de verificación al correo del usuario.

#### Verificación de correo electrónico
 Given: el usuario dispone de un código válido,  
 When: lo introduce y confirma,  
 Then: el sistema debe validar la cuenta y mostrar el resultado.

#### Reenvío de código de verificación
 Given: el usuario no ha verificado su cuenta,  
 When: solicita un nuevo código,  
 Then: el sistema debe enviarlo respetando las restricciones definidas.

#### Inicio de sesión
 Given: el usuario introduce credenciales válidas,  
 When: confirma el acceso,  
 Then: el sistema debe iniciar la sesión.

#### Gestión de cuentas no verificadas
 Given: el usuario intenta iniciar sesión sin haber verificado el correo,  
 When: accede a través de login  
 Then: el sistema debe informar y solicitar la verificación.

#### Persistencia de sesión
 Given: El usuario tiene una sesión activa,  
 When: el usuario navega o recarga la aplicación,  
 Then: el sistema debe comprobar el estado y mantener la sesión si es válida.

#### Renovación automática de sesión
 Given: una operación falla por sesión expirada,  
 When: el sistema puede renovarla,  
 Then: debe hacerlo automáticamente y reintentar la operación.

#### Cierre de sesión
 Given: el usuario está autenticado,  
 When: solicita cerrar sesión,  
 Then: el sistema debe invalidar la sesión y volver a mostrar la página pública.

---

### 5.4 Perfil de usuario

#### Consulta del perfil
 Given: el usuario autenticado accede a su perfil,  
 When: se carga la vista de usuario,  
 Then: el sistema debe mostrar sus datos actuales.

#### Edición de datos personales
 Given: el usuario modifica su información exepto el correo electrónico,  
 When: guarda los cambios,  
 Then: el sistema debe validarlos y actualizarlos.

#### Cambio de correo electrónico
 Given: el usuario modifica su correo electrónico,  
 When: el cambio requiere verificación,  
 Then: el sistema debe iniciar el proceso de validación correspondiente.

#### Cambio de contraseña
 Given: el usuario introduce contraseña actual y nueva válida,  
 When: confirma la operación,  
 Then: el sistema debe actualizar la credencial.

#### Invalidación tras cambio de contraseña
 Given: la contraseña ha cambiado correctamente,  
 When: finaliza el proceso,  
 Then: el sistema debe cerrar la sesión actual.

#### Desactivación de cuenta
 Given: el usuario solicita desactivar la cuenta,  
 When: confirma la opción de desactivar la cuenta,  
 Then: el sistema debe desactivarla y cerrar sesión.

#### Eliminación de cuenta
 Given: el usuario solicita eliminar la cuenta,  
 When: confirma la operación,  
 Then: el sistema debe eliminarla y finalizar la sesión.

---

### 5.5 Subida y análisis de archivos

#### Selección de archivos
 Given: el usuario autenticado accede a la zona de subida de archivos,  
 When: selecciona o arrastra archivos válidos de su sistema,  
 Then: el sistema debe añadirlos a la cola de subida.

#### Validación de archivos
 Given: se han seleccionado archivos del sistema del usuario,  
 When: el sistema verifica sus características,  
 Then: debe comprobar cantidad, tamaño y formato.

#### Rechazo de archivos inválidos
 Given: un archivo que no cumple las restricciones establecidass,  
 When: el sistema lo detecta,  
 Then: debe impedir la subida de los archivos e informar.

#### Subida de archivos
 Given: el usuario confirma la subida de los archivos,  
 When: se inicia el proceso,  
 Then: el sistema debe transferir los archivos mostrando progreso.

#### Resultado de la subida
 Given: finaliza la carga,  
 When: termina el proceso,  
 Then: el sistema debe indicar éxito o error.

#### Inicio del análisis documental
 Given: el archivo se ha subido correctamente,  
 When: el sistema dispone de procesamiento,  
 Then: debe iniciar el análisis y mostrar el estado.

#### Listado de archivos
 Given: existen archivos asociados al usuario,  
 When: accede a la pantalla correspondiente,  
 Then: el sistema debe mostrar el listado.

#### Visualización del documento procesado
 Given: un archivo tiene información extraída,  
 When: el usuario solicita verla,  
 Then: el sistema debe mostrar parte de la sección extraída.

#### Descarga de archivo
 Given: el archivo está disponible,  
 When: el usuario solicita descargarlo,  
 Then: el sistema debe permitir la descarga.

#### Eliminación de archivo
 Given: el usuario tiene permisos sobre el archivo,  
 When: solicita eliminarlo,  
 Then: el sistema debe borrarlo y actualizar la lista.

#### Edición de datos extraídos
 Given: el archivo que se visualiza permite edición,  
 When: el usuario modifica información,  
 Then: el sistema debe guardar los cambios.

#### Actualización coherente de datos
 Given: se modifica información del documento,  
 When: el cambio afecta a datos visibles en el listado,  
 Then: el sistema debe actualizar la información mostrada.

## 6. SEO, accesibilidad y seguridad en cliente

La aplicación incorpora medidas orientadas a mejorar la indexación, la accesibilidad y la seguridad en el lado cliente, siguiendo buenas prácticas habituales  aprendidas en el master.

- **SEO**  
  Cada ruta define su título y metadatos asociados, permitiendo mejorar la indexación en buscadores.  
  Se incluyen metadatos para redes sociales (Open Graph y Twitter Card) cuando corresponde, así como datos estructurados en formato JSON-LD en la página principal para facilitar la identificación del sitio por motores de búsqueda.  
  Cuando la configuración lo permite, se define también la URL canónica para evitar problemas de contenido duplicado.

- **Accesibilidad**  
  La interfaz utiliza HTML semántico y atributos ARIA cuando es necesario, con el objetivo de mejorar la compatibilidad con lectores de pantalla y dispositivos de asistencia.  
  Los formularios incluyen etiquetas asociadas a cada campo, se garantiza la navegación mediante teclado y se respetan las preferencias del sistema del usuario, como la reducción de animaciones cuando está activada la opción de movimiento reducido.

- **Seguridad en cliente**  
  La aplicación aplica medidas de seguridad en el navegador y en el entorno de desarrollo, incluyendo cabeceras de protección frente a ejecución de contenido no autorizado, bloqueo de carga en iframes no permitidos, control del tipo de contenido y políticas de referencia.  
  Los formularios se validan en cliente antes de enviarse al servidor, evitando datos mal formados.  
  El contenido dinámico se muestra únicamente cuando es seguro, evitando la inserción directa de HTML sin control.  
  La gestión de cookies y sesión se realiza desde el backend, utilizando cookies seguras que no son accesibles desde el código cliente.


---

## 8. Buenas prácticas y calidad

- **Arquitectura por capas**: Separación clara entre vistas, componentes, composables, `lib/api` y stores; un único punto de configuración HTTP y de lectura de variables `VITE_*`.
- **Configuración tipada**: Uso de `import.meta.env.VITE_*` para variables de entorno; tipos explícitos en respuestas de API y formularios (Zod + TypeScript).
- **Estado y sesión**: Pinia para estado global; comprobación de sesión idempotente (`runSessionCheck`) y guard de rutas para rutas protegidas; manejo de sesión expirada centralizado en el interceptor de Axios.
- **Calidad de código**: ESLint y Prettier; convenciones de nombres y estructura de componentes Vue (template, script setup, style scoped); composables con responsabilidad única.
- **Accesibilidad y SEO**: HTML semántico, ARIA donde aplica, `prefers-reduced-motion` en animaciones; meta y datos estructurados por ruta.
- **Seguridad en cliente**: Sin secretos en variables `VITE_*`; validación Zod en formularios; cabeceras de seguridad en el servidor de desarrollo (CSP, X-Frame-Options, etc.); cookies gestionadas por el backend.

  La documentación de gobierno técnico, convenciones de componentes, estilos y patrones de código se detalla en el archivo **`AGENTS.MD`** en la raíz del repositorio. Este documento sirve como referencia para mantener coherencia en la evolución del frontend y en la integración con Atlas. Se diseño en primer lugar para poder que los agentes utilizados se basen en las mismas reglas. 
