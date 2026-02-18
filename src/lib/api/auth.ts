import axios from 'axios'
import { api, getErrorMessage } from './axiosConfig'
import type { LoginFormData } from '@/lib/validation/auth'
import type { RegisterFormData } from '@/lib/validation/auth'

export interface AuthResult {
  ok: boolean
  message?: string
  error?: string
}

/** Response from GET /auth/me (matches backend MeResponse). */
export interface MeResponse {
  id: string
  email: string
  name: string
  roles: string[]
}

/**
 * Fetch current user from session. Uses access token from cookie.
 * Returns null on 401 (not authenticated or token expired).
 */
export async function getMe(): Promise<MeResponse | null> {
  try {
    const res = await api.get<MeResponse>('/auth/me')
    return res.data
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return null
    }
    throw err
  }
}

/**
 * Local login via password grant. Auth tokens are set in HttpOnly cookies
 * and sent automatically on subsequent requests (withCredentials).
 */
export async function login(payload: LoginFormData): Promise<AuthResult> {
  try {
    await api.post('/auth/token', {
      grant_type: 'password',
      email: payload.email,
      password: payload.password,
    })

    return {
      ok: true,
      message: 'Login successful.',
    }
  } catch (err) {
    return {
      ok: false,
      error: getErrorMessage(err),
    }
  }
}

export async function register(payload: RegisterFormData): Promise<AuthResult> {
  try {
    await api.post('/auth/register', {
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      password: payload.password,
    })

    return {
      ok: true,
      message: 'Registration successful. You can now log in.',
    }
  } catch (err) {
    return {
      ok: false,
      error: getErrorMessage(err),
    }
  }
}

/**
 * Logout: invalidate refresh token on server and clear auth cookies.
 * Backend responds with Set-Cookie to remove access_token and refresh_token
 * so the browser stops sending them on next requests.
 */
export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout')
  } catch {
    // Still clear local state even if request fails (e.g. network or already logged out)
  }
}
