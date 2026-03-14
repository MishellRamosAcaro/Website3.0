<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4 bg-bg-0">
    <div
      class="card-base p-8 w-full max-w-md"
      role="main"
      aria-labelledby="verify-email-heading"
    >
      <h1
        id="verify-email-heading"
        class="font-serif text-2xl font-bold text-text-primary mb-2"
      >
        Verify your email
      </h1>
      <p class="text-text-secondary mb-6">
        Enter the 6-digit code we sent to
        <strong class="text-text-primary">{{ form.email || 'your email' }}</strong
        >. You can request a new code in 2 minutes if needed.
      </p>

      <form novalidate class="space-y-5" @submit.prevent="handleVerify">
        <div>
          <label for="verify-email" class="block text-sm font-medium text-text-primary">
            Email <span class="text-red-400" aria-hidden="true">*</span>
          </label>
          <InputText
            id="verify-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
            :invalid="Boolean(errors.email)"
            aria-required="true"
            :aria-invalid="Boolean(errors.email)"
            :aria-describedby="errors.email ? 'verify-email-error' : undefined"
          />
          <p
            v-if="errors.email"
            id="verify-email-error"
            class="mt-1 text-small text-red-400"
            role="alert"
          >
            {{ errors.email }}
          </p>
        </div>
        <div>
          <label for="verify-code" class="block text-sm font-medium text-text-primary">
            Verification code <span class="text-red-400" aria-hidden="true">*</span>
          </label>
          <InputText
            id="verify-code"
            v-model="form.code"
            type="text"
            inputmode="numeric"
            maxlength="6"
            placeholder="000000"
            autocomplete="one-time-code"
            class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary font-mono text-lg tracking-widest"
            :invalid="Boolean(errors.code)"
            aria-required="true"
            :aria-invalid="Boolean(errors.code)"
            :aria-describedby="errors.code ? 'verify-code-error' : undefined"
          />
          <p
            v-if="errors.code"
            id="verify-code-error"
            class="mt-1 text-small text-red-400"
            role="alert"
          >
            {{ errors.code }}
          </p>
        </div>
        <Button
          type="submit"
          label="Verify"
          class="btn-primary w-full"
          :loading="loading"
          :disabled="loading"
          :aria-busy="loading"
        />
        <p
          v-if="submitError"
          class="mt-2 text-sm text-red-400 text-center"
          role="alert"
        >
          {{ submitError }}
        </p>
        <p
          v-if="submitSuccess"
          class="mt-2 text-sm text-green-400 text-center"
          role="status"
        >
          {{ submitSuccess }}
        </p>
      </form>

      <div class="mt-6 pt-6 border-t border-white/10">
        <p class="text-sm text-text-secondary mb-2">Didn't receive the code?</p>
        <Button
          type="button"
          label="Resend code"
          class="p-button-outlined p-button-secondary w-full"
          :loading="resendLoading"
          :disabled="resendLoading || (retryAfterSeconds != null && retryAfterSeconds > 0)"
          :aria-busy="resendLoading"
          @click="resend()"
        />
        <p
          v-if="retryAfterSeconds != null && retryAfterSeconds > 0"
          class="mt-2 text-sm text-text-secondary text-center"
        >
          Too many attempts. Try again in {{ retryAfterSeconds }} seconds.
        </p>
        <p
          v-else-if="resendError"
          class="mt-2 text-sm text-red-400 text-center"
          role="alert"
        >
          {{ resendError }}
        </p>
        <p
          v-else-if="resendSuccess"
          class="mt-2 text-sm text-green-400 text-center"
          role="status"
        >
          {{ resendSuccess }}
        </p>
      </div>

      <p class="mt-6 text-center text-sm text-text-secondary">
        <RouterLink
          to="/"
          class="text-neon-a font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a rounded"
        >
          Back to home
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useRoute, useRouter } from 'vue-router'
import { useVerifyEmail } from '@/composables/useVerifyEmail'

const route = useRoute()
const router = useRouter()
const emailFromQuery = typeof route.query.email === 'string' ? route.query.email : ''
const {
  form,
  errors,
  loading,
  submitError,
  submitSuccess,
  verify,
  resend,
  resendLoading,
  resendError,
  resendSuccess,
  retryAfterSeconds,
} = useVerifyEmail(emailFromQuery)

async function handleVerify() {
  const ok = await verify(() => {
    router.push('/')
  })
  if (ok) {
    router.push('/')
  }
}
</script>
