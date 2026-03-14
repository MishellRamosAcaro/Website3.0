<template>
  <div class="min-h-screen">
    <TopBar />
    <main class="container-content py-14">
      <article class="mx-auto max-w-3xl prose prose-invert">
        <h1 class="font-serif text-h2 font-bold text-text-primary">
          Privacy Policy
        </h1>
        <p class="text-text-secondary mt-4 text-sm">
          Last updated: {{ lastUpdated }}
        </p>
        <div class="mt-8 space-y-6 text-text-secondary text-sm leading-relaxed">
          <p>
            We [Company Name] process your personal data (email, name, phone number, and account
            credentials) to provide the service, create and manage your account, and send
            verification emails. We rely on your consent and contract performance.
          </p>
          <p>
            Data is retained as long as your account is active and as required by law. You have
            the right to access, rectify, erase, restrict processing, data portability, and to
            lodge a complaint with a supervisory authority. We do not sell your data.
          </p>
          <p>
            For full details and contact information, please contact us at the address provided
            on this website.
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
