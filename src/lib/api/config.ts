/**
 * API base URL for backend (e.g. http://localhost:8000).
 */
export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string)?.trim() || ''
