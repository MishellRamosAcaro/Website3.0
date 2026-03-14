import { ref, reactive } from 'vue'
import {
  verifyEmailFormSchema,
  resendVerificationSchema,
  type VerifyEmailFormData,
  type ResendVerificationFormData,
} from '@/lib/validation/auth'
import { verifyEmail as verifyEmailApi, resendVerificationCode as resendApi } from '@/lib/api/auth'

const initialVerifyForm = (emailFromQuery: string): VerifyEmailFormData => ({
  email: emailFromQuery || '',
  code: '',
})

export function useVerifyEmail(initialEmail = '') {
  const form = reactive(initialVerifyForm(initialEmail))
  const errors = ref<Partial<Record<keyof VerifyEmailFormData, string>>>({})
  const loading = ref(false)
  const submitError = ref<string | null>(null)
  const submitSuccess = ref<string | null>(null)

  const validateVerify = (): boolean => {
    errors.value = {}
    const result = verifyEmailFormSchema.safeParse(form)
    if (!result.success) {
      const issues = result.error.flatten().fieldErrors
      for (const [k, v] of Object.entries(issues)) {
        const key = k as keyof VerifyEmailFormData
        if (v?.[0]) errors.value[key] = v[0]
      }
      return false
    }
    return true
  }

  const verify = async (onSuccess?: () => void): Promise<boolean> => {
    if (!validateVerify()) return false
    loading.value = true
    submitError.value = null
    submitSuccess.value = null
    try {
      const result = await verifyEmailApi(form.email, form.code)
      if (result.ok) {
        submitSuccess.value = result.message ?? 'Email verified. You can now sign in.'
        onSuccess?.()
        return true
      }
      submitError.value = result.error ?? 'Invalid or expired code.'
      return false
    } catch {
      submitError.value = 'Something went wrong. Please try again.'
      return false
    } finally {
      loading.value = false
    }
  }

  const resendLoading = ref(false)
  const resendError = ref<string | null>(null)
  const resendSuccess = ref<string | null>(null)
  const retryAfterSeconds = ref<number | null>(null)

  const resend = async (): Promise<void> => {
    const parse = resendVerificationSchema.safeParse({ email: form.email })
    if (!parse.success) {
      resendError.value = 'Please enter a valid email address.'
      return
    }
    resendLoading.value = true
    resendError.value = null
    resendSuccess.value = null
    retryAfterSeconds.value = null
    try {
      const result = await resendApi(form.email)
      if (result.ok) {
        resendSuccess.value = result.message ?? 'Verification code sent.'
      } else {
        resendError.value = result.error ?? 'Could not send code. Try again later.'
        const match = result.error?.match(/Try again in (\d+) seconds\.?/)
        if (match) retryAfterSeconds.value = parseInt(match[1], 10)
      }
    } catch {
      resendError.value = 'Something went wrong. Please try again.'
    } finally {
      resendLoading.value = false
    }
  }

  return {
    form,
    errors,
    loading,
    submitError,
    submitSuccess,
    verify,
    resend,
    resendLoading,
    resendError,
    resendSuccess,
    retryAfterSeconds,
  }
}
