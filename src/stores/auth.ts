import { defineStore } from 'pinia'
import { ref } from 'vue'

export type AuthMode = 'login' | 'register'

export const useAuthStore = defineStore('auth', () => {
  const showAuthModal = ref(false)
  const authMode = ref<AuthMode>('login')
  const isAuthenticated = ref(false)
  const userId = ref<string | null>(null)

  function setAuthenticated(id: string) {
    isAuthenticated.value = true
    userId.value = id
  }

  function logout() {
    isAuthenticated.value = false
    userId.value = null
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
    userId,
    setAuthenticated,
    logout,
    openLogin,
    openRegister,
    closeAuthModal,
    switchToLogin,
    switchToRegister,
  }
})
