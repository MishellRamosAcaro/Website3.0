<template>
  <div class="min-h-screen">
    <TopBar />
    <main class="container-content py-14">
      <article class="mx-auto max-w-4xl">
        <div class="privacy-content" v-html="content" />
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
import TopBar from "@/components/layout/TopBar.vue";
import Footer from "@/components/layout/Footer.vue";
import { RouterLink } from "vue-router";
import { usePrivacyPolicy } from "@/composables/usePrivacyPolicy";

const { content } = usePrivacyPolicy();
</script>
