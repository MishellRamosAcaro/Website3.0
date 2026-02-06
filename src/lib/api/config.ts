/**
 * API base URL for backend. When unset, contact form uses local success only.
 */
export const API_BASE_URL: string | undefined = import.meta.env.VITE_API_BASE_URL

export function isBackendConfigured(): boolean {
  return Boolean(API_BASE_URL && API_BASE_URL.trim() !== '')
}
