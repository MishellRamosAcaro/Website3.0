import axios from 'axios'
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
