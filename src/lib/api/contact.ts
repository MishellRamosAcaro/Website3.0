import { api, getErrorMessage } from './axiosConfig'
import type { ContactFormData } from '@/lib/validation/contact'

export interface ContactSubmitResult {
  ok: boolean
  message?: string
  error?: string
}

export async function submitContactForm(
  payload: ContactFormData
): Promise<ContactSubmitResult> {
  try {
    await api.post('/contact', {
      name: payload.name,
      email: payload.email,
      company: payload.company,
      message: payload.message,
      honeypot: payload.honeypot,
    })

    return { ok: true, message: 'Thank you. We will get back to you soon.' }
  } catch (err) {
    return {
      ok: false,
      error: getErrorMessage(err),
    }
  }
}
