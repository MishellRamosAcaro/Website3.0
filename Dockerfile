# ============================================
# Stage 1: Build de la aplicación Vue/Vite
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias (solo producción para build)
RUN pnpm install --frozen-lockfile

# Copiar código fuente y config
COPY . .

# Build: genera la carpeta dist
RUN pnpm run build

# ============================================
# Stage 2: Nginx con HTTPS en 443
# ============================================
FROM nginx:alpine

# Necesario para generar certificados autofirmados en el entrypoint
RUN apk add --no-cache openssl

# Eliminar config por defecto
RUN rm -f /etc/nginx/conf.d/default.conf

# Copiar la carpeta dist del stage anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de nginx (HTTPS, puerto 443, nombre del servidor)
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Script que genera certificado autofirmado si no existen
COPY nginx/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Crear directorio para certificados SSL
RUN mkdir -p /etc/nginx/ssl

EXPOSE 443

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
