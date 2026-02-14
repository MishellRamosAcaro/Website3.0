import { ref, reactive } from 'vue'
import { loginFormSchema, type LoginFormData } from '@/lib/validation/auth'
import { login as loginApi } from '@/lib/api/auth'

const initialForm = (): Record<keyof LoginFormData, string> => ({
  email: '',
  password: '',
  honeypot: '',
})

export function useLogin(onSuccess?: () => void) {
  const form = reactive(initialForm())
  const errors = ref<Partial<Record<keyof LoginFormData, string>>>({})
  const loading = ref(false)
  const submitError = ref<string | null>(null)

  const setError = (field: keyof LoginFormData, message: string) => {
    errors.value = { ...errors.value, [field]: message }
  }

  const clearErrors = () => {
    errors.value = {}
    submitError.value = null
  }

  const validate = (): boolean => {
    clearErrors()
    const result = loginFormSchema.safeParse(form)
    if (!result.success) {
      const issues = result.error.flatten().fieldErrors
      for (const [k, v] of Object.entries(issues)) {
        const key = k as keyof LoginFormData
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
      const payload = loginFormSchema.parse(form) as LoginFormData
      const result = await loginApi(payload)
      if (result.ok) {
        reset()
        onSuccess?.()
      } else {
        submitError.value = result.error ?? 'Invalid email or password. Please try again.'
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
