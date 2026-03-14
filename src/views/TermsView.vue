<template>
  <div class="min-h-screen">
    <TopBar />
    <main class="container-content py-14">
      <article class="mx-auto max-w-3xl prose prose-invert">
        <h1 class="font-serif text-h2 font-bold text-text-primary">
          Terms of Service
        </h1>
        <p class="text-text-secondary mt-4 text-sm">
          Last updated: {{ lastUpdated }}
        </p>
        <div class="mt-8 space-y-6 text-text-secondary text-sm leading-relaxed">
          <p>
            By using this service you agree to these Terms of Service. You must provide accurate
            information when registering and keep your account credentials secure.
          </p>
          <p>
            You are responsible for all activity under your account. We may suspend or terminate
            access for violation of these terms or for any other reason at our discretion.
          </p>
          <p>
            The service is provided “as is”. For full terms, limitations of liability, and
            dispute resolution, please contact us.
          </p>
        </div>
        <p class="mt-10">
          <RouterLink
            to="/"
            class="text-neon-a font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a rounded"
          >
            Back to home
          </RouterLink>
        </p>
      </article>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import TopBar from '@/components/layout/TopBar.vue'
import Footer from '@/components/layout/Footer.vue'
import { RouterLink } from 'vue-router'

const lastUpdated = '2025'
</script>
