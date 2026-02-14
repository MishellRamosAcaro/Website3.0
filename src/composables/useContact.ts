import { ref, reactive, computed } from 'vue'
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
  const form = reactive(initialForm())
  const errors = ref<Partial<Record<keyof ContactFormData, string>>>({})
  const loading = ref(false)
  const submitted = ref(false)
  const submitError = ref<string | null>(null)

  const setError = (field: keyof ContactFormData, message: string) => {
    errors.value = { ...errors.value, [field]: message }
  }

  const clearErrors = () => {
    errors.value = {}
    submitError.value = null
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
    submitError.value = null
    try {
      const payload = contactFormSchema.parse(form) as ContactFormData
      const result = await submitContactForm(payload)
      if (result.ok) {
        submitted.value = true
        reset()
      } else {
        submitError.value = result.error ?? 'Something went wrong. Please try again.'
      }
    } catch {
      submitError.value = 'Something went wrong. Please try again.'
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
    submitError,
    validate,
    submit,
    reset,
    setError,
    clearErrors,
    hasErrors,
  }
}
