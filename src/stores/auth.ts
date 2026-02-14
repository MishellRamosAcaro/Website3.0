import { defineStore } from 'pinia'
import { ref } from 'vue'

export type AuthMode = 'login' | 'register'

export const useAuthStore = defineStore('auth', () => {
  const showAuthModal = ref(false)
  const authMode = ref<AuthMode>('login')

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
    openLogin,
    openRegister,
    closeAuthModal,
    switchToLogin,
    switchToRegister,
  }
})
