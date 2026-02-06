<template>
  <section
    class="relative overflow-hidden section-padding"
    aria-labelledby="hero-heading"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-neon-a/5 via-transparent to-neon-b/5 pointer-events-none"
      aria-hidden="true"
    />
    <div class="container-content relative">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0 }"
        :transition="{ duration: 300 }"
        class="mx-auto max-w-4xl text-center"
      >
        <span
          class="mb-6 inline-block rounded-full border border-white/20 bg-bg-1/80 px-4 py-1.5 text-small font-medium text-text-secondary"
        >
          The AI Senior FAS That Never Sleeps
        </span>
        <h1
          id="hero-heading"
          class="font-serif text-h1 font-bold tracking-tight text-text-primary"
        >
          Resolve complex technical support with
          <span
            class="bg-gradient-to-r from-neon-a via-neon-b to-neon-c bg-clip-text text-transparent"
          >
            AI precision
          </span>
        </h1>
        <p class="mt-6 text-body-lg text-text-secondary">
          An intelligent Field Application Specialist AI Agent for support
          teams, field engineers, and customer success—accurate, context-aware,
          and always on.
        </p>
        <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            class="btn-primary"
            @click.prevent="scrollToSection('contact')"
          >
            View Our Agent
          </a>
          <a
            href="#contact"
            class="btn-secondary"
            @click.prevent="scrollToSection('contact')"
          >
            Contact Us
          </a>
        </div>
      </div>
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1 }"
        :transition="{ duration: 400, delay: 200 }"
        class="mt-16 rounded-card border border-white/10 bg-bg-1/50 p-4 font-mono text-small text-text-muted"
      >
        <pre class="overflow-x-auto"><code><span class="text-neon-b">$</span> fas-agent --resolve "technical support" --channel all
<span class="text-neon-c">✓</span> Context loaded · 24/7 · Enterprise-ready</code></pre>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollTo } from '@/composables/useScrollTo'

const { scrollToSection } = useScrollTo()
</script>
