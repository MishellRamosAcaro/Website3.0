import { ref, reactive } from 'vue'
import { useToast } from 'primevue/usetoast'
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
  const toast = useToast()
  const form = reactive(initialForm())
  const errors = ref<Partial<Record<keyof RegisterFormData, string>>>({})
  const loading = ref(false)

  const setError = (field: keyof RegisterFormData, message: string) => {
    errors.value = { ...errors.value, [field]: message }
  }

  const clearErrors = () => {
    errors.value = {}
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
    try {
      const payload = registerFormSchema.parse(form) as RegisterFormData
      const result = await registerApi(payload)
      if (result.ok) {
        reset()
        toast.add({
          severity: 'success',
          summary: 'Registration',
          detail: result.message ?? 'Registration successful. You can now log in.',
          life: 5000,
        })
        onSuccess?.()
      } else {
        toast.add({
          severity: 'error',
          summary: 'Registration failed',
          detail: result.error ?? 'Something went wrong. Please try again.',
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
