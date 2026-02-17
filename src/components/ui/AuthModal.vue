<template>
  <div
    class="card-base p-8 w-full max-w-md min-w-[20rem]"
    role="document"
    aria-labelledby="auth-form-heading"
  >
        <h2
          id="auth-form-heading"
          class="font-serif text-xl font-bold text-text-primary mb-6"
        >
          {{ authStore.authMode === 'login' ? 'Login' : 'Register' }}
        </h2>
        <p id="auth-dialog-desc" class="sr-only">
          {{ authStore.authMode === 'login' ? 'Enter your email and password to sign in.' : 'Enter your details to create an account.' }}
        </p>

        <!-- Login form -->
        <form
          v-if="authStore.authMode === 'login'"
          novalidate
          class="space-y-5"
          @submit.prevent="loginSubmit"
        >
          <input
            v-model="loginForm.honeypot"
            type="text"
            name="website"
            autocomplete="off"
            tabindex="-1"
            aria-hidden="true"
            class="sr-only"
          />
          <div>
            <label for="auth-email" class="block text-sm font-medium text-text-primary">
              Email <span class="text-red-400" aria-hidden="true">*</span>
            </label>
            <InputText
              id="auth-email"
              v-model="loginForm.email"
              type="email"
              autocomplete="email"
              class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
              :invalid="Boolean(loginErrors.email)"
              aria-required="true"
              :aria-invalid="Boolean(loginErrors.email)"
              :aria-describedby="loginErrors.email ? 'auth-email-error' : undefined"
            />
            <p
              v-if="loginErrors.email"
              id="auth-email-error"
              class="mt-1 text-small text-red-400"
              role="alert"
            >
              {{ loginErrors.email }}
            </p>
          </div>
          <div>
            <label for="auth-password" class="block text-sm font-medium text-text-primary">
              Password <span class="text-red-400" aria-hidden="true">*</span>
            </label>
            <InputText
              id="auth-password"
              v-model="loginForm.password"
              type="password"
              autocomplete="current-password"
              class="mt-1 mb-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
              :invalid="Boolean(loginErrors.password)"
              aria-required="true"
              :aria-invalid="Boolean(loginErrors.password)"
              :aria-describedby="loginErrors.password ? 'auth-password-error' : undefined"
            />
            <p
              v-if="loginErrors.password"
              id="auth-password-error"
              class="mt-1 text-small text-red-400"
              role="alert"
            >
              {{ loginErrors.password }}
            </p>
          </div>
          <Button
            type="submit"
            label="Login"
            class="btn-primary w-full"
            :loading="loginLoading"
            :disabled="loginLoading"
            :aria-busy="loginLoading"
          />
          <p
            v-if="loginSubmitError"
            class="mt-2 text-sm text-red-400 text-center"
            role="alert"
          >
            {{ loginSubmitError }}
          </p>
          <p class="text-center text-sm text-text-secondary">
            Don't have an account?
            <button
              type="button"
              class="text-neon-a font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0 rounded"
              @click="switchToRegister"
            >
              Sign up
            </button>
          </p>
        </form>

        <!-- Register form -->
        <form
          v-else
          novalidate
          class="space-y-5"
          @submit.prevent="registerSubmit"
        >
          <input
            v-model="registerForm.honeypot"
            type="text"
            name="website"
            autocomplete="off"
            tabindex="-1"
            aria-hidden="true"
            class="sr-only"
          />
          <div>
            <label for="auth-firstName" class="block text-sm font-medium text-text-primary">
              First name <span class="text-red-400" aria-hidden="true">*</span>
            </label>
            <InputText
              id="auth-firstName"
              v-model="registerForm.firstName"
              type="text"
              autocomplete="given-name"
              class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
              :invalid="Boolean(registerErrors.firstName)"
              aria-required="true"
              :aria-invalid="Boolean(registerErrors.firstName)"
              :aria-describedby="registerErrors.firstName ? 'auth-firstName-error' : undefined"
            />
            <p
              v-if="registerErrors.firstName"
              id="auth-firstName-error"
              class="mt-1 text-small text-red-400"
              role="alert"
            >
              {{ registerErrors.firstName }}
            </p>
          </div>
          <div>
            <label for="auth-lastName" class="block text-sm font-medium text-text-primary">
              Last name <span class="text-red-400" aria-hidden="true">*</span>
            </label>
            <InputText
              id="auth-lastName"
              v-model="registerForm.lastName"
              type="text"
              autocomplete="family-name"
              class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
              :invalid="Boolean(registerErrors.lastName)"
              aria-required="true"
              :aria-invalid="Boolean(registerErrors.lastName)"
              :aria-describedby="registerErrors.lastName ? 'auth-lastName-error' : undefined"
            />
            <p
              v-if="registerErrors.lastName"
              id="auth-lastName-error"
              class="mt-1 text-small text-red-400"
              role="alert"
            >
              {{ registerErrors.lastName }}
            </p>
          </div>
          <div>
            <label for="auth-register-email" class="block text-sm font-medium text-text-primary">
              Email <span class="text-red-400" aria-hidden="true">*</span>
            </label>
            <InputText
              id="auth-register-email"
              v-model="registerForm.email"
              type="email"
              autocomplete="email"
              class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
              :invalid="Boolean(registerErrors.email)"
              aria-required="true"
              :aria-invalid="Boolean(registerErrors.email)"
              :aria-describedby="registerErrors.email ? 'auth-register-email-error' : undefined"
            />
            <p
              v-if="registerErrors.email"
              id="auth-register-email-error"
              class="mt-1 text-small text-red-400"
              role="alert"
            >
              {{ registerErrors.email }}
            </p>
          </div>
          <div>
            <label for="auth-register-password" class="block text-sm font-medium text-text-primary">
              Password <span class="text-red-400" aria-hidden="true">*</span>
            </label>
            <InputText
              id="auth-register-password"
              v-model="registerForm.password"
              type="password"
              autocomplete="new-password"
              class="mt-1 mb-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
              :invalid="Boolean(registerErrors.password)"
              aria-required="true"
              :aria-invalid="Boolean(registerErrors.password)"
              :aria-describedby="registerErrors.password ? 'auth-register-password-error' : undefined"
            />
            <p
              v-if="registerErrors.password"
              id="auth-register-password-error"
              class="mt-1 text-small text-red-400"
              role="alert"
            >
              {{ registerErrors.password }}
            </p>
          </div>
         
          
          <Button
            type="submit"
            label="Register"
            class="btn-primary w-full"
            :loading="registerLoading"
            :disabled="registerLoading"
            :aria-busy="registerLoading"
          />
          <p
            v-if="registerSubmitError"
            class="mt-2 text-sm text-red-400 text-center"
            role="alert"
          >
            {{ registerSubmitError }}
          </p>
          <p class="text-center text-sm text-text-secondary">
            Have an account?
            <button
              type="button"
              class="text-neon-a font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0 rounded"
              @click="switchToLogin"
            >
            Log in
            </button>
          </p>
        </form>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLogin } from '@/composables/useLogin'
import { useRegister } from '@/composables/useRegister'

const MOCK_USER_ID = 'mock-user-1'

const props = defineProps<{
  onClose?: () => void
}>()

const router = useRouter()
const authStore = useAuthStore()

function handleSuccess() {
  authStore.setAuthenticated(MOCK_USER_ID)
  authStore.closeAuthModal()
  props.onClose?.()
  router.push('/upload')
}

const { form: loginForm, errors: loginErrors, loading: loginLoading, submitError: loginSubmitError, submit: loginSubmit, reset: loginReset } = useLogin(handleSuccess)
const { form: registerForm, errors: registerErrors, loading: registerLoading, submitError: registerSubmitError, submit: registerSubmit, reset: registerReset } = useRegister(handleSuccess)

function switchToRegister() {
  loginReset()
  authStore.switchToRegister()
}

function switchToLogin() {
  registerReset()
  authStore.switchToLogin()
}
</script>

