import { ref, reactive } from 'vue'
import { useToast } from 'primevue/usetoast'
import { loginFormSchema, type LoginFormData } from '@/lib/validation/auth'
import { login as loginApi } from '@/lib/api/auth'

const initialForm = (): Record<keyof LoginFormData, string> => ({
  email: '',
  password: '',
  honeypot: '',
})

export function useLogin(onSuccess?: () => void) {
  const toast = useToast()
  const form = reactive(initialForm())
  const errors = ref<Partial<Record<keyof LoginFormData, string>>>({})
  const loading = ref(false)

  const setError = (field: keyof LoginFormData, message: string) => {
    errors.value = { ...errors.value, [field]: message }
  }

  const clearErrors = () => {
    errors.value = {}
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
    try {
      const payload = loginFormSchema.parse(form) as LoginFormData
      const result = await loginApi(payload)
      if (result.ok) {
        reset()
        toast.add({
          severity: 'success',
          summary: 'Login',
          detail: result.message ?? 'Login successful.',
          life: 5000,
        })
        onSuccess?.()
      } else {
        toast.add({
          severity: 'error',
          summary: 'Login failed',
          detail: result.error ?? 'Invalid email or password. Please try again.',
          life: 5000,
        })
      }
    } catch {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong. Please try again.',
        life: 5000,
      })
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    errors,
    loading,
    validate,
    submit,
    reset,
    setError,
    clearErrors,
  }
}
