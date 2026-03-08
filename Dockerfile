# ============================================
# Stage 1: Build de la aplicación Vue/Vite
# ============================================
FROM node:20-alpine AS builder

# API base URL para el backend (se inyecta en el build de Vite)
ARG VITE_API_BASE_URL=http://localhost:8000
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

WORKDIR /app

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias (solo producción para build)
RUN pnpm install --frozen-lockfile

# Copiar código fuente y config
COPY . .

# Build: genera la carpeta dist con las variables de entorno embebidas
RUN pnpm run build

# ============================================
# Stage 2: Nginx con HTTPS en 8080
# ============================================
FROM nginx:alpine

# Eliminar config por defecto
RUN rm -f /etc/nginx/conf.d/default.conf

# Copiar la carpeta dist del stage anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de nginx (HTTPS, puerto 443, nombre del servidor)
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
