<template>
  <section
    id="capabilities"
    class="section-padding bg-bg-1/30"
    aria-labelledby="capabilities-heading"
  >
    <div class="container-content">
      <h2
        id="capabilities-heading"
        class="font-serif text-h2 font-bold text-text-primary"
      >
        Capabilities
      </h2>
      <p class="mt-4 max-w-2xl text-body-lg text-text-secondary">
        Enterprise-ready features for support teams and field engineers.
      </p>
      <div
        class="mt-12 grid gap-6 sm:grid-cols-1 lg:grid-cols-3"
        role="list"
      >
        <div
          v-for="(capability, index) in capabilities"
          v-motion
          :key="capability.id"
          :initial="{ opacity: 0, y: 24 }"
          :visible="{ opacity: 1, y: 0 }"
          :transition="{ duration: 300, delay: index * 80 }"
          role="listitem"
        >
          <CapabilityCard :capability="capability" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CapabilityCard from '@/components/ui/CapabilityCard.vue'
import { capabilities } from '@/lib/data/capabilities'
</script>
