import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL } from './config'

/**
 * Axios instance configured with the backend API base URL.
 * Use this for all HTTP requests to the API.
 */
export const api = axios.create({
  baseURL: API_BASE_URL.replace(/\/$/, ''),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send/receive cookies for auth
})

/** Called when refresh fails (session expired). Set from main.ts to avoid circular deps. */
let onSessionExpired: (() => void) | null = null
export function setSessionExpiredHandler(handler: () => void): void {
  onSessionExpired = handler
}

/** Serializes token refresh so concurrent 401s trigger a single POST /auth/token. */
let refreshPromise: Promise<boolean> | null = null

function isAuthEndpoint(url: string | undefined): boolean {
  if (!url) return false
  const path = url.replace(api.defaults.baseURL ?? '', '')
  return path.includes('/auth/token') || path.includes('/auth/logout')
}

api.interceptors.response.use(
  (response) => response,
  async (err: unknown) => {
    if (!axios.isAxiosError(err) || err.response?.status !== 401) {
      return Promise.reject(err)
    }
    const config = err.config as InternalAxiosRequestConfig & { _retry?: boolean }
    if (!config) return Promise.reject(err)

    if (isAuthEndpoint(config.url)) {
      onSessionExpired?.()
      return Promise.reject(err)
    }

    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          await api.post('/auth/token', { grant_type: 'refresh_token' })
          return true
        } catch {
          onSessionExpired?.()
          return false
        } finally {
          refreshPromise = null
        }
      })()
    }

    const refreshed = await refreshPromise
    if (!refreshed) return Promise.reject(err)

    try {
      return await api.request(config)
    } catch (retryErr) {
      return Promise.reject(retryErr)
    }
  }
)

/**
 * Extract error message from API error response or AxiosError.
 */
export function getErrorMessage(err: unknown, fallback = 'Network error'): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data
    if (typeof data === 'string' && data) return data
    if (data && typeof data === 'object') {
      const obj = data as {
        message?: string
        error?: string | { message?: string }
        detail?: string | string[]
      }
      const errObj =
        typeof obj.error === 'object' && obj.error !== null && 'message' in obj.error
          ? (obj.error as { message?: string }).message
          : obj.error
      const msg = obj.message ?? errObj ?? obj.detail
      if (typeof msg === 'string') return msg
      if (Array.isArray(msg) && msg.length > 0 && typeof msg[0] === 'string') return msg[0]
    }
    if (err.response?.status) return `Request failed (${err.response.status})`
  }
  return err instanceof Error ? err.message : fallback
}
