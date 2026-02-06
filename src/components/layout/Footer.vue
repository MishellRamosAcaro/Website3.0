<template>
  <footer
    class="border-t border-white/10 bg-bg-1 py-12"
    role="contentinfo"
    aria-label="Site footer"
  >
    <div class="container-content">
      <!-- Info Cards Row -->
      <div
        class="grid grid-cols-1 gap-6 border-t border-white/10 pt-8 md:grid-cols-3"
        role="list"
      >
        <article
          v-for="card in infoCards"
          :key="card.title"
          class="rounded-lg p-4 text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1 hover:bg-white/5"
          role="listitem"
        >
          <i
            :class="['pi', card.icon, 'mb-2 block text-xl text-neon-a']"
            aria-hidden="true"
          />
          <h3 class="text-sm font-semibold text-text-primary">
            {{ card.title }}
          </h3>
          <p class="mb-2 text-small text-text-muted">
            {{ card.description }}
          </p>
          <a
            v-if="card.contact"
            :href="`mailto:${card.contact}`"
            class="text-small font-medium text-text-secondary underline transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1"
            :aria-label="`Email ${card.contact}`"
          >
            {{ card.contact }}
          </a>
        </article>
      </div>

      <div class="mt-8 border-t border-white/10 pt-8 text-center">
        <p class="text-small text-text-muted">
          &copy; {{ currentYear }} Field Application Specialist AI Agent.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const infoCards = [
  {
    title: 'Sales',
    description:
      'Interested in our automation solutions? Reach out to discuss how we can help.',
    contact: 'sales@fas-agent.com',
    icon: 'pi-briefcase',
  },
  {
    title: 'Support',
    description:
      'Need help with your existing setup? Our team is here to assist you.',
    contact: 'support@fas-agent.com',
    icon: 'pi-phone',
  },
  {
    title: 'Partnerships',
    description:
      "Let's collaborate. Explore partnership opportunities with us.",
    contact: 'partners@fas-agent.com',
    icon: 'pi-envelope',
  },
]
</script>
