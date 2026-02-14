import { isBackendConfigured } from './config'
import type { LoginFormData } from '@/lib/validation/auth'
import type { RegisterFormData } from '@/lib/validation/auth'

export interface AuthResult {
  ok: boolean
  message?: string
  error?: string
  token?: string
}

function parseErrorResponse(text: string, status: number): string {
  try {
    const json = JSON.parse(text) as { message?: string; error?: string }
    return json.message ?? json.error ?? `Request failed (${status})`
  } catch {
    return text || `Request failed (${status})`
  }
}

export async function login(payload: LoginFormData): Promise<AuthResult> {
  if (!isBackendConfigured()) {
    return { ok: true, message: 'Login successful.' }
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL as string
  const url = `${baseUrl.replace(/\/$/, '')}/auth/login`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
      }),
    })

    const text = await res.text()

    if (!res.ok) {
      return {
        ok: false,
        error: parseErrorResponse(text, res.status),
      }
    }

    let data: { token?: string } = {}
    try {
      data = JSON.parse(text) as { token?: string }
    } catch {
      // empty body is ok
    }

    return {
      ok: true,
      message: 'Login successful.',
      token: data.token,
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error'
    return { ok: false, error: message }
  }
}

export async function register(payload: RegisterFormData): Promise<AuthResult> {
  if (!isBackendConfigured()) {
    return { ok: true, message: 'Registration successful. You can now log in.' }
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL as string
  const url = `${baseUrl.replace(/\/$/, '')}/auth/register`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
      }),
    })

    const text = await res.text()

    if (!res.ok) {
      return {
        ok: false,
        error: parseErrorResponse(text, res.status),
      }
    }

    return {
      ok: true,
      message: 'Registration successful. You can now log in.',
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error'
    return { ok: false, error: message }
  }
}
