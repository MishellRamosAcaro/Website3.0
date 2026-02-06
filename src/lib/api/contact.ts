import { isBackendConfigured } from './config'
import type { ContactFormData } from '@/lib/validation/contact'

export interface ContactSubmitResult {
  ok: boolean
  message?: string
  error?: string
}

export async function submitContactForm(
  payload: ContactFormData
): Promise<ContactSubmitResult> {
  if (!isBackendConfigured()) {
    return { ok: true, message: 'Thank you. We will get back to you soon.' }
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL as string
  const url = `${baseUrl.replace(/\/$/, '')}/contact`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        company: payload.company,
        message: payload.message,
        honeypot: payload.honeypot,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      return {
        ok: false,
        error: text || `Request failed (${res.status})`,
      }
    }

    return { ok: true, message: 'Thank you. We will get back to you soon.' }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error'
    return { ok: false, error: message }
  }
}
