#!/bin/sh
set -e

SSL_DIR="/etc/nginx/ssl"
CERT_FILE="${SSL_DIR}/cert.pem"
KEY_FILE="${SSL_DIR}/key.pem"

# Si no existen certificados, generar autofirmados (desarrollo/pruebas)
if [ ! -f "$CERT_FILE" ] || [ ! -f "$KEY_FILE" ]; then
    echo "Generando certificado SSL autofirmado en ${SSL_DIR}..."
    mkdir -p "$SSL_DIR"
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "$KEY_FILE" \
        -out "$CERT_FILE" \
        -subj "/CN=fas-agent.com/O=Field Application Specialist AI Agent/C=US"
    echo "Certificado autofirmado generado."
fi

exec "$@"
