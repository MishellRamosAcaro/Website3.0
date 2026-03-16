/**
 * API base URL for backend.
 * - Desarrollo: VITE_API_BASE_URL (ej. http://localhost:8000).
 * - Producción mismo origen: si no se define, se usa '/api' para que nginx haga proxy a FastAPI.
 */
const raw = (import.meta.env.VITE_API_BASE_URL as string)?.trim() || ''
export const API_BASE_URL: string =
  raw !== '' ? raw : '/api'
