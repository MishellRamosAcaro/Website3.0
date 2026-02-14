<template>
  <section
    id="contact"
    class="section-padding bg-bg-1/30"
    aria-labelledby="contact-heading"
  >
    <div class="container-content">
      <h2
        id="contact-heading"
        class="font-serif text-h2 font-bold text-text-primary"
      >
        Talk with our team
      </h2>
      <p class="mt-4 max-w-2xl text-body-lg text-text-secondary">
        Share your challenge and we'll show you how the FAS AI Agent can help.
      </p>
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0 }"
        :transition="{ duration: 400 }"
        class="mx-auto mt-12 max-w-xl"
      >
        <div class="card-base p-8">
          <form
            novalidate
            class="space-y-6"
            @submit.prevent="submit"
          >
            <input
              v-model="form.honeypot"
              type="text"
              name="website"
              autocomplete="off"
              tabindex="-1"
              aria-hidden="true"
              class="sr-only"
            />
            <div>
              <label for="contact-name" class="block text-sm font-medium text-text-primary">
                Name <span class="text-red-400" aria-hidden="true">*</span>
              </label>
              <InputText
                id="contact-name"
                v-model="form.name"
                type="text"
                class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
                :invalid="Boolean(errors.name)"
                aria-required="true"
                :aria-invalid="Boolean(errors.name)"
                :aria-describedby="errors.name ? 'contact-name-error' : undefined"
              />
              <p
                v-if="errors.name"
                id="contact-name-error"
                class="mt-1 text-small text-red-400"
                role="alert"
              >
                {{ errors.name }}
              </p>
            </div>
            <div>
              <label for="contact-email" class="block text-sm font-medium text-text-primary">
                Email <span class="text-red-400" aria-hidden="true">*</span>
              </label>
              <InputText
                id="contact-email"
                v-model="form.email"
                type="email"
                class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
                :invalid="Boolean(errors.email)"
                aria-required="true"
                :aria-describedby="errors.email ? 'contact-email-error' : undefined"
              />
              <p
                v-if="errors.email"
                id="contact-email-error"
                class="mt-1 text-small text-red-400"
                role="alert"
              >
                {{ errors.email }}
              </p>
            </div>
            <div>
              <label for="contact-company" class="block text-sm font-medium text-text-primary">
                Company <span class="text-red-400" aria-hidden="true">*</span>
              </label>
              <InputText
                id="contact-company"
                v-model="form.company"
                type="text"
                class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
                :invalid="Boolean(errors.company)"
                aria-required="true"
                :aria-describedby="errors.company ? 'contact-company-error' : undefined"
              />
              <p
                v-if="errors.company"
                id="contact-company-error"
                class="mt-1 text-small text-red-400"
                role="alert"
              >
                {{ errors.company }}
              </p>
            </div>
            <div>
              <label for="contact-message" class="block text-sm font-medium text-text-primary">
                Message <span class="text-red-400" aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="4"
                class="mt-1 w-full  rounded-lg border border-white/10 bg-bg-0 px-3 py-2 text-text-primary placeholder:text-text-muted focus:border-neon-a focus:outline-none focus:ring-1 focus:ring-neon-a"
                :aria-invalid="Boolean(errors.message)"
                aria-required="true"
                :aria-describedby="errors.message ? 'contact-message-error' : undefined"
              />
              <p
                v-if="errors.message"
                id="contact-message-error"
                class="mt-1 text-small text-red-400"
                role="alert"
              >
                {{ errors.message }}
              </p>
            </div>
            <Button
              type="submit"
              label="Request Contact"
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
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useContact } from '@/composables/useContact'

const { form, errors, loading, submitError, submit } = useContact()
</script>
