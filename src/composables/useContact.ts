import { ref, reactive, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import { contactFormSchema, type ContactFormData } from '@/lib/validation/contact'
import { submitContactForm } from '@/lib/api/contact'

const initialForm = (): Record<keyof ContactFormData, string> => ({
  name: '',
  email: '',
  company: '',
  message: '',
  honeypot: '',
})

export function useContact() {
  const toast = useToast()
  const form = reactive(initialForm())
  const errors = ref<Partial<Record<keyof ContactFormData, string>>>({})
  const loading = ref(false)
  const submitted = ref(false)

  const setError = (field: keyof ContactFormData, message: string) => {
    errors.value = { ...errors.value, [field]: message }
  }

  const clearErrors = () => {
    errors.value = {}
  }

  const validate = (): boolean => {
    clearErrors()
    const result = contactFormSchema.safeParse(form)
    if (!result.success) {
      const issues = result.error.flatten().fieldErrors
      for (const [k, v] of Object.entries(issues)) {
        const key = k as keyof ContactFormData
        if (v?.[0]) setError(key, v[0])
      }
      return false
    }
    return true
  }

  const reset = () => {
    Object.assign(form, initialForm())
    clearErrors()
    submitted.value = false
  }

  const submit = async () => {
    if (!validate()) return
    loading.value = true
    try {
      const payload = contactFormSchema.parse(form) as ContactFormData
      const result = await submitContactForm(payload)
      if (result.ok) {
        submitted.value = true
        reset()
        toast.add({
          severity: 'success',
          summary: 'Message sent',
          detail: result.message ?? 'We will get back to you soon.',
          life: 5000,
        })
      } else {
        toast.add({
          severity: 'error',
          summary: 'Error',
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

  const hasErrors = computed(() => Object.keys(errors.value).length > 0)

  return {
    form,
    errors,
    loading,
    submitted,
    validate,
    submit,
    reset,
    setError,
    clearErrors,
    hasErrors,
  }
}
