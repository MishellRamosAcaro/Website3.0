<template>
  <div class="min-h-screen">
    <TopBar />
    <main>
      <HeroSection />
      <CapabilitiesSection />
      <DemoSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import TopBar from '@/components/layout/TopBar.vue'
import Footer from '@/components/layout/Footer.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import CapabilitiesSection from '@/components/sections/CapabilitiesSection.vue'
import DemoSection from '@/components/sections/DemoSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://fas-agent.com/#organization',
      name: 'Field Application Specialist AI Agent',
      url: 'https://fas-agent.com',
      description:
        'An intelligent Field Application Specialist AI Agent that resolves complex technical support with AI precision.',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contact@example.com',
        contactType: 'Customer Service',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://fas-agent.com/#website',
      url: 'https://fas-agent.com',
      name: 'Field Application Specialist AI Agent',
      publisher: { '@id': 'https://fas-agent.com/#organization' },
    },
  ],
}

let scriptEl: HTMLScriptElement | null = null

onMounted(() => {
  scriptEl = document.createElement('script')
  scriptEl.type = 'application/ld+json'
  scriptEl.textContent = JSON.stringify(structuredData)
  document.head.appendChild(scriptEl)
})

onUnmounted(() => {
  if (scriptEl?.parentNode) scriptEl.parentNode.removeChild(scriptEl)
})
</script>
