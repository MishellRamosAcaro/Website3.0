import { api, getErrorMessage } from './axiosConfig'
import type { LoginFormData } from '@/lib/validation/auth'
import type { RegisterFormData } from '@/lib/validation/auth'

export interface AuthResult {
  ok: boolean
  message?: string
  error?: string
  token?: string
}

export async function login(payload: LoginFormData): Promise<AuthResult> {
  try {
    const { data } = await api.post<{ token?: string }>('/auth/login', {
      email: payload.email,
      password: payload.password,
    })

    return {
      ok: true,
      message: 'Login successful.',
      token: data?.token,
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
