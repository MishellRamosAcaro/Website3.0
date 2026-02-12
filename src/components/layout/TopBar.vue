<template>
  <header
    class="sticky top-0 left-0 right-0 z-50 w-full min-w-0 border-b border-white/10 bg-bg-0/95 backdrop-blur-sm transition-transform duration-300 ease-out"
    :class="{ '-translate-y-full': !visible }"
    role="banner"
  >
    <div class="container-content flex min-h-16 w-full max-w-full shrink-0 flex-wrap items-center justify-between gap-3 py-3">
      <a
        href="/"
        class="flex min-w-0 shrink items-center gap-3"
        aria-label="Field Application Specialist AI Agent - Home"
      >
        <img
          src="/logo.png"
          alt=""
          class="h-12 min-h-[2.5rem] w-auto shrink-0 sm:h-14 sm:min-h-[3rem]"
          width="56"
          height="56"
        />
        <div class="flex min-w-0 flex-col items-center justify-center text-center">
          <span
            class="bg-gradient-to-r from-neon-a via-neon-b to-neon-c bg-clip-text text-transparent text-[clamp(1rem,3vw,1.5rem)] leading-tight sm:text-base md:text-lg"
          >
            Field Application Specialist
          </span>
          <span class="text-text-primary text-[clamp(0.875rem,2.2vw,1.125rem)] sm:text-sm md:text-base">
            AI Agent
          </span>
        </div>
      </a>
      <nav class="flex min-w-0 shrink flex-wrap items-center justify-end gap-3 gap-y-2 sm:gap-4 md:gap-6" aria-label="Main navigation">
        <a
          href="#skills"
          class="text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0"
          @click.prevent="scrollToSection('skills')"
        >
          Skills
        </a>
        <a
          href="#demo"
          class="text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0"
          @click.prevent="scrollToSection('demo')"
        >
          View our agent
        </a>
        <a
          href="#contact"
          class="text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0"
          @click.prevent="scrollToSection('contact')"
        >
          Contact us
        </a>
        <a
          href=""
          class="btn-primary shrink-0 px-4 py-2 text-[clamp(0.875rem,1.5vw,1rem)] sm:px-5 sm:py-2.5 md:px-6 md:py-3"
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
