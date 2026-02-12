<template>
  <div
    class="card-base card-hover-glow cursor-pointer p-6 text-left transition-all duration-200"
    :class="{ 'ring-2 ring-neon-a/50 shadow-glow-sm': effectiveExpanded }"
    role="button"
    :aria-expanded="effectiveExpanded"
    :aria-label="ariaLabel"
    tabindex="0"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
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
          v-if="effectiveExpanded && capability.detail && !hasSubCards"
          v-motion
          :initial="{ opacity: 0, height: 0 }"
          :enter="{ opacity: 1, height: 'auto' }"
          class="mt-4 text-body text-text-muted"
        >
          {{ capability.detail }}
        </p>
      </div>
      <span
        v-if="!hasSubCards"
        class="shrink-0 text-text-muted transition-transform"
        :class="effectiveExpanded ? 'rotate-180' : ''"
        aria-hidden="true"
      >
        <i class="pi pi-chevron-down" />
      </span>
      <span
        v-else
        class="shrink-0 text-text-muted"
        aria-hidden="true"
      >
        <i class="pi pi-chevron-right" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CapabilityItem } from '@/lib/data/capabilities'

const props = withDefaults(
  defineProps<{
    capability: CapabilityItem
    isExpanded?: boolean
  }>(),
  { isExpanded: false }
)

const emit = defineEmits<{
  expand: []
}>()

const expanded = ref(false)

const hasSubCards = computed(
  () => (props.capability.subCards?.length ?? 0) > 0
)

const effectiveExpanded = computed(() =>
  hasSubCards.value ? props.isExpanded : expanded.value
)

const ariaLabel = computed(() => {
  if (hasSubCards.value) {
    return props.isExpanded
      ? `${props.capability.title}. Expanded. Click elsewhere to close.`
      : `${props.capability.title}. Click to expand and view details.`
  }
  return `${props.capability.title}. ${effectiveExpanded.value ? 'Click to collapse' : 'Click to expand'}`
})

function handleClick() {
  if (hasSubCards.value) {
    emit('expand')
    return
  }
  expanded.value = !expanded.value
}
</script>
