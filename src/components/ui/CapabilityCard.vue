<template>
  <div
    class="card-base card-hover-glow cursor-pointer p-6 text-left transition-all duration-200"
    :class="{ 'ring-2 ring-neon-a/50 shadow-glow-sm': expanded }"
    role="button"
    :aria-expanded="expanded"
    :aria-label="`${capability.title}. ${expanded ? 'Click to collapse' : 'Click to expand'}`"
    tabindex="0"
    @click="toggle"
    @keydown.enter.prevent="toggle"
    @keydown.space.prevent="toggle"
  >
    <div class="flex items-start gap-4">
      <span
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xl text-neon-a"
        aria-hidden="true"
      >
        <i :class="capability.icon" class="pi" />
      </span>
      <div class="min-w-0 flex-1">
        <h3 class="font-semibold text-text-primary">
          {{ capability.title }}
        </h3>
        <p class="mt-1 text-body text-text-secondary">
          {{ capability.description }}
        </p>
        <p
          v-if="expanded && capability.detail"
          v-motion
          :initial="{ opacity: 0, height: 0 }"
          :enter="{ opacity: 1, height: 'auto' }"
          class="mt-4 text-body text-text-muted"
        >
          {{ capability.detail }}
        </p>
      </div>
      <span
        class="shrink-0 text-text-muted transition-transform"
        :class="expanded ? 'rotate-180' : ''"
        aria-hidden="true"
      >
        <i class="pi pi-chevron-down" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CapabilityItem } from '@/lib/data/capabilities'

defineProps<{
  capability: CapabilityItem
}>()

const expanded = ref(false)

function toggle() {
  expanded.value = !expanded.value
}
</script>
