#!/usr/bin/env bash
# Build y deploy en Google Cloud (Artifact Registry + Cloud Run).
# Uso: ./build-and-deploy-gc.sh

set -e

# ==============================
# CARGAR VARIABLES DEL .env
# ==============================
if [ ! -f .env ]; then
  echo "❌ No existe archivo .env"
  exit 1
fi

export $(grep -v '^#' .env | xargs)

# Tag de la imagen siempre con fecha
export TAG=$(date +%Y%m%d)

PROJECT_ID=$(gcloud config get-value project)

echo "-----------------------------------"
echo "Proyecto: $PROJECT_ID"
echo "Región: $REGION"
echo "Servicio: $SERVICE"
echo "Imagen: $IMAGE_NAME"
echo "Tag: $TAG"
echo "-----------------------------------"

# ==============================
# AUTENTICAR DOCKER
# ==============================
echo "🔐 Configurando autenticación Docker..."
gcloud auth configure-docker ${REGION}-docker.pkg.dev --quiet

# ==============================
# CREAR REPO SI NO EXISTE
# ==============================
echo "📦 Verificando repositorio Artifact Registry..."
if ! gcloud artifacts repositories describe ${REPO} --location=${REGION} >/dev/null 2>&1; then
  echo "Repositorio no existe. Creándolo..."
  gcloud artifacts repositories create ${REPO} \
    --repository-format=docker \
    --location=${REGION} \
    --description="Repositorio Docker para ${SERVICE}"
else
  echo "Repositorio ya existe."
fi

# ==============================
# BUILD + PUSH
# ==============================
IMAGE_URI="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/${IMAGE_NAME}:${TAG}"

echo "🏗️ Construyendo y subiendo imagen..."
gcloud builds submit --tag ${IMAGE_URI}

# ==============================
# DEPLOY CLOUD RUN
# ==============================
echo "🚀 Desplegando en Cloud Run..."
gcloud run deploy ${SERVICE} \
  --image ${IMAGE_URI} \
  --region ${REGION} \
  --platform managed \
  --allow-unauthenticated \
  --quiet

# ==============================
# MOSTRAR URL
# ==============================
SERVICE_URL=$(gcloud run services describe ${SERVICE} \
  --region ${REGION} \
  --format="value(status.url)")

echo "-----------------------------------"
echo "✅ Despliegue completado"
echo "🌐 URL: ${SERVICE_URL}"
echo "-----------------------------------"
