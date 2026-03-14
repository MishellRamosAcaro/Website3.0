import axios from 'axios'
import { api, getErrorMessage } from './axiosConfig'
import type { LoginFormData } from '@/lib/validation/auth'
import type { RegisterFormData } from '@/lib/validation/auth'

export interface AuthResult {
  ok: boolean
  message?: string
  error?: string
  /** Backend error code (e.g. email_not_verified for 403). */
  code?: string
}

/** Response from GET /auth/me (matches backend MeResponse). */
export interface MeResponse {
  id: string
  email: string
  name: string
  first_name: string
  last_name: string
  country_code: string
  phone_number_normalized: string
  is_active: boolean
  roles: string[]
  email_pending_verification?: boolean
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
    const code =
      axios.isAxiosError(err) && err.response?.status === 403
        ? (err.response?.data?.detail?.code as string | undefined)
        : undefined
    return {
      ok: false,
      error: getErrorMessage(err),
      code,
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
      country_code: payload.countryCode,
      phone_number_normalized: payload.phoneNumberNormalized,
      accept_terms: payload.acceptTerms,
      accept_privacy: payload.acceptPrivacy,
    })

    return {
      ok: true,
      message: 'Registration successful. Check your email for the verification code.',
    }
  } catch (err) {
    return {
      ok: false,
      error: getErrorMessage(err),
    }
  }
}

/**
 * Verify email with 6-digit code. Call after registration.
 */
export async function verifyEmail(email: string, code: string): Promise<AuthResult> {
  try {
    await api.post('/auth/verify-email', { email, code })
    return { ok: true, message: 'Email verified. You can now sign in.' }
  } catch (err) {
    return {
      ok: false,
      error: getErrorMessage(err),
    }
  }
}

/**
 * Resend verification code to email. Rate limited (e.g. 2/min) and cooldown (e.g. 2 min).
 */
export async function resendVerificationCode(email: string): Promise<AuthResult> {
  try {
    await api.post('/auth/resend-verification-code', { email })
    return { ok: true, message: 'Verification code sent.' }
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

/** Payload for PATCH /auth/me (profile update). */
export interface UpdateProfilePayload {
  email?: string
  first_name?: string
  last_name?: string
  country_code?: string
  phone_number_normalized?: string
  is_active?: boolean
}

/** Payload for PATCH /auth/me/password. */
export interface UpdatePasswordPayload {
  current_password: string
  new_password: string
}

/** Payload for DELETE /auth/me (account deletion). */
export interface DeleteAccountPayload {
  password: string
}

/** Result of PATCH /auth/me when email was changed (verification required). */
export interface UpdateProfileResult extends AuthResult {
  email_pending_verification?: boolean
  /** New email that must be verified when email_pending_verification is true. */
  email?: string
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<UpdateProfileResult> {
  try {
    const res = await api.patch<MeResponse & { email_pending_verification?: boolean }>(
      '/auth/me',
      payload
    )
    const data = res.data
    return {
      ok: true,
      message:
        data.email_pending_verification
          ? 'A verification code has been sent to your new email. Please verify to sign in again.'
          : 'Profile updated.',
      email_pending_verification: data.email_pending_verification ?? false,
      email: data.email_pending_verification ? data.email : undefined,
    }
  } catch (err) {
    return { ok: false, error: getErrorMessage(err) }
  }
}

export async function updatePassword(payload: UpdatePasswordPayload): Promise<AuthResult> {
  try {
    await api.patch('/auth/me/password', payload)
    return { ok: true, message: 'Password updated. Please log in again.' }
  } catch (err) {
    return { ok: false, error: getErrorMessage(err) }
  }
}

export async function deactivateAccount(): Promise<AuthResult> {
  try {
    await api.post('/auth/me/deactivate')
    return { ok: true, message: 'Account deactivated.' }
  } catch (err) {
    return { ok: false, error: getErrorMessage(err) }
  }
}

export async function deleteAccount(payload: DeleteAccountPayload): Promise<AuthResult> {
  try {
    await api.delete('/auth/me', { data: payload })
    return { ok: true, message: 'Your account has been deleted.' }
  } catch (err) {
    return { ok: false, error: getErrorMessage(err) }
  }
}
