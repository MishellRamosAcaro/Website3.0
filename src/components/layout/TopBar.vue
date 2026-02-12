<template>
  <header
    class="sticky top-0 z-50 border-b border-white/10 bg-bg-0/95 backdrop-blur-sm"
    role="banner"
  >
    <div class="container-content flex h-16 items-center justify-between">
      <a
        href="/"
        class="flex flex-col items-center justify-center"
        aria-label="Field Application Specialist AI Agent - Home"
      >
      <span
            class="bg-gradient-to-r from-neon-a via-neon-b to-neon-c bg-clip-text text-transparent"
          >
          Field Application Specialist
        </span>
        <span class="text-text-primary mt-1"> AI Agent</span>
      </a>
      <nav class="flex items-center gap-6" aria-label="Main navigation">
        <a
          href="#capabilities"
          class="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0"
          @click.prevent="scrollToSection('capabilities')"
        >
          What we do?
        </a>
          <a
            href="#demo"
            class="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0"
            @click.prevent="scrollToSection('demo')"
          >
            Explore
          </a>
          <a
            href="#contact"
            class="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0"
            @click.prevent="scrollToSection('contact')"
          >
            Contact us
          </a>
          <a
            href=""
            class="btn-primary"
          >
            Login
          </a>
      
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useScrollTo } from '@/composables/useScrollTo'

const { scrollToSection } = useScrollTo()
</script>
