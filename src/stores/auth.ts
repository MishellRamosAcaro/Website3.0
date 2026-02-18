import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMe } from '@/lib/api/auth'

export type AuthMode = 'login' | 'register'

export const useAuthStore = defineStore('auth', () => {
  const showAuthModal = ref(false)
  const authMode = ref<AuthMode>('login')
  const isAuthenticated = ref(false)
  /** Single promise for session check; reused so we only call GET /auth/me once. */
  let sessionCheckPromise: Promise<void> | null = null

  function setAuthenticated() {
    isAuthenticated.value = true
  }

  function logout() {
    isAuthenticated.value = false
  }

  /**
   * Run session check once (GET /auth/me). Updates isAuthenticated if cookie is valid.
   * Idempotent: returns the same promise if already in progress or done.
   */
  async function runSessionCheck(): Promise<void> {
    if (sessionCheckPromise) return sessionCheckPromise
    sessionCheckPromise = (async () => {
      const me = await getMe()
      if (me) setAuthenticated()
    })()
    return sessionCheckPromise
  }

  function openLogin() {
    authMode.value = 'login'
    showAuthModal.value = true
  }

  function openRegister() {
    authMode.value = 'register'
    showAuthModal.value = true
  }

  function closeAuthModal() {
    showAuthModal.value = false
  }

  function switchToLogin() {
    authMode.value = 'login'
  }

  function switchToRegister() {
    authMode.value = 'register'
  }

  return {
    showAuthModal,
    authMode,
    isAuthenticated,
    setAuthenticated,
    logout,
    runSessionCheck,
    openLogin,
    openRegister,
    closeAuthModal,
    switchToLogin,
    switchToRegister,
  }
})
