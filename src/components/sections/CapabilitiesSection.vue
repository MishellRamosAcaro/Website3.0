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

      <!-- Normal layout: 3 cards -->
      <div
        v-if="!expandedCapabilityId"
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
          <CapabilityCard
            :capability="capability"
            :is-expanded="false"
            @expand="openExpand(capability.id)"
          />
        </div>
      </div>

      <!-- Expanded layout: 2 cards left + expanded panel right -->
      <div
        v-else
        v-motion
        class="mt-12 flex flex-col gap-6 lg:flex-row"
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        :transition="{ duration: 300 }"
      >
        <div
          class="flex flex-col gap-6 lg:w-[320px] lg:shrink-0"
          role="list"
        >
          <div
            v-for="(capability, index) in otherCapabilities"
            v-motion
            :key="capability.id"
            :initial="{ opacity: 0, x: -24 }"
            :enter="{ opacity: 1, x: 0 }"
            :transition="{ duration: 300, delay: index * 60 }"
            role="listitem"
          >
            <CapabilityCard
              :capability="capability"
              :is-expanded="false"
              @expand="openExpand(capability.id)"
            />
          </div>
        </div>
        <div
          v-if="expandedCapability && expandedCapability.subCards"
          v-motion
          class="min-w-0 flex-1"
          :initial="{ opacity: 0, x: 24 }"
          :enter="{ opacity: 1, x: 0 }"
          :transition="{ duration: 300, delay: 100 }"
          role="region"
          :aria-label="expandedCapability.expandSectionTitle ?? expandedCapability.title"
        >
          <div class="card-base card-hover-glow p-6 lg:p-8">
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-start gap-4">
                <span
                  class="flex h-14 w-14 shrink-0 items-center justify-center gap-0.5 rounded-lg border border-white/10 bg-white/5 text-xl text-neon-a"
                  aria-hidden="true"
                >
                  <i :class="expandedCapability.icon" class="pi" />
                  <i
                    v-if="expandedCapability.expandIcon"
                    :class="expandedCapability.expandIcon"
                    class="pi ml-0.5 text-sm"
                  />
                </span>
                <div>
                  <h3 class="font-serif text-xl font-semibold text-text-primary">
                    {{ expandedCapability.expandSectionTitle ?? expandedCapability.title }}
                  </h3>
                  <p class="mt-1 text-body text-text-secondary">
                    {{ expandedCapability.description }}
                  </p>
                </div>
              </div>
              <button
                ref="closeButtonRef"
                type="button"
                class="shrink-0 rounded-lg p-2 text-text-muted transition-colors hover:bg-white/10 hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-neon-a/50"
                aria-label="Close expanded view"
                @click="closeExpand"
              >
                <i class="pi pi-times text-xl" aria-hidden="true" />
              </button>
            </div>
            <div class="mt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              <div
                v-for="(subCard, subIndex) in expandedCapability.subCards"
                :key="subIndex"
                v-motion
                class="card-base border border-white/10 bg-white/5 p-4"
                :initial="{ opacity: 0, y: 12 }"
                :enter="{ opacity: 1, y: 0 }"
                :transition="{ duration: 250, delay: 150 + subIndex * 50 }"
              >
                <h4 class="font-semibold text-text-primary">
                  {{ subCard.title }}
                </h4>
                <ul class="mt-3 list-inside list-disc space-y-1 text-body text-text-muted">
                  <li
                    v-for="(item, itemIndex) in subCard.items"
                    :key="itemIndex"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import CapabilityCard from '@/components/ui/CapabilityCard.vue'
import {
  capabilities,
  type CapabilityItem,
} from '@/lib/data/capabilities'

const expandedCapabilityId = ref<string | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)

const otherCapabilities = computed(() =>
  capabilities.filter((c) => c.id !== expandedCapabilityId.value)
)

const expandedCapability = computed(
  (): CapabilityItem | undefined =>
    capabilities.find((c) => c.id === expandedCapabilityId.value) ?? undefined
)

watch(expandedCapabilityId, async (id) => {
  if (id) {
    await nextTick()
    closeButtonRef.value?.focus()
  }
})

function openExpand(id: string) {
  const cap = capabilities.find((c) => c.id === id)
  if (cap?.subCards?.length) {
    expandedCapabilityId.value = id
  }
}

function closeExpand() {
  expandedCapabilityId.value = null
}
</script>
