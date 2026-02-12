<template>
  <header
    class="sticky top-0 left-0 right-0 z-50 w-full min-w-0 border-b border-white/10 bg-bg-0/95 backdrop-blur-sm transition-transform duration-300 ease-out"
    :class="{ '-translate-y-full': !visible }"
    role="banner"
  >
    <div class="container-content flex min-h-16 w-full max-w-full shrink-0 flex-nowrap items-center justify-between gap-3 py-3">
      <a
        href="/"
        class="flex min-w-0 shrink flex-col items-start justify-between sm:items-center"
        aria-label="Field Application Specialist AI Agent - Home"
      >
        <span
          class="bg-gradient-to-r from-neon-a via-neon-b to-neon-c bg-clip-text text-transparent text-[clamp(1rem,3vw,1.5rem)] leading-tight sm:text-base md:text-lg mt-1"
        >
          Field Application Specialist
        </span>
        <span class="text-text-primary mt-0.5 text-[clamp(0.875rem,2.2vw,1.125rem)] sm:text-sm md:text-base"> AI Agent</span>
      </a>
      <nav class="flex min-w-0 shrink flex-nowrap items-center justify-end gap-3 sm:gap-4 md:gap-6" aria-label="Main navigation">
        <a
          href="#capabilities"
          class="text-[clamp(0.7rem,1.5vw,0.875rem)] font-medium text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0 whitespace-nowrap"
          @click.prevent="scrollToSection('capabilities')"
        >
          Skills
        </a>
        <a
          href="#demo"
          class="text-[clamp(0.7rem,1.5vw,0.875rem)] font-medium text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0 whitespace-nowrap"
          @click.prevent="scrollToSection('demo')"
        >
          Explore
        </a>
        <a
          href="#contact"
          class="text-[clamp(0.7rem,1.5vw,0.875rem)] font-medium text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0 whitespace-nowrap"
          @click.prevent="scrollToSection('contact')"
        >
          Contact us
        </a>
        <a
          href=""
          class="btn-primary shrink-0 px-4 py-2 text-[clamp(0.7rem,1.5vw,0.875rem)] sm:px-5 sm:py-2.5 md:px-6 md:py-3"
        >
          Login
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollTo } from '@/composables/useScrollTo'

const { scrollToSection } = useScrollTo()

const visible = ref(true)
const lastScrollY = ref(0)
const scrollThreshold = 80
const mouseZoneHeight = 120

function onScroll() {
  const currentScrollY = window.scrollY
  if (currentScrollY <= 0) {
    visible.value = true
  } else if (currentScrollY > lastScrollY.value && currentScrollY > scrollThreshold) {
    visible.value = false
  }
  lastScrollY.value = currentScrollY
}

function onMouseMove(e: MouseEvent) {
  if (e.clientY < mouseZoneHeight) {
    visible.value = true
  }
}

onMounted(() => {
  lastScrollY.value = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('mousemove', onMouseMove, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>
