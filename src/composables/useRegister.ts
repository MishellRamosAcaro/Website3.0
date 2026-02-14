import { ref, reactive } from 'vue'
import {
  registerFormSchema,
  type RegisterFormData,
} from '@/lib/validation/auth'
import { register as registerApi } from '@/lib/api/auth'

const initialForm = (): Record<keyof RegisterFormData, string> => ({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  honeypot: '',
})

export function useRegister(onSuccess?: () => void) {
  const form = reactive(initialForm())
  const errors = ref<Partial<Record<keyof RegisterFormData, string>>>({})
  const loading = ref(false)
  const submitError = ref<string | null>(null)

  const setError = (field: keyof RegisterFormData, message: string) => {
    errors.value = { ...errors.value, [field]: message }
  }

  const clearErrors = () => {
    errors.value = {}
    submitError.value = null
  }

  const validate = (): boolean => {
    clearErrors()
    const result = registerFormSchema.safeParse(form)
    if (!result.success) {
      const issues = result.error.flatten().fieldErrors
      for (const [k, v] of Object.entries(issues)) {
        const key = k as keyof RegisterFormData
        if (v?.[0]) setError(key, v[0])
      }
      return false
    }
    return true
  }

  const reset = () => {
    Object.assign(form, initialForm())
    clearErrors()
  }

  const submit = async () => {
    if (!validate()) return
    loading.value = true
    submitError.value = null
    try {
      const payload = registerFormSchema.parse(form) as RegisterFormData
      const result = await registerApi(payload)
      if (result.ok) {
        reset()
        onSuccess?.()
      } else {
        submitError.value = result.error ?? 'Something went wrong. Please try again.'
      }
    } catch {
      submitError.value = 'Something went wrong. Please try again.'
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    errors,
    loading,
    submitError,
    validate,
    submit,
    reset,
    setError,
    clearErrors,
  }
}
