<template>
  <div
    v-if="open"
    class="extracted-document-panel fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
    role="dialog"
    aria-modal="true"
    aria-labelledby="extracted-document-title"
    @keydown.escape="close"
  >
    <div
      class="relative flex max-w-4xl w-full max-h-[90vh] rounded-lg border border-white/20 bg-bg-0 shadow-xl"
      @click.stop
    >
      <button
        type="button"
        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 w-10 h-10 rounded-full bg-bg-1 border border-white/20 flex items-center justify-center text-text-primary hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a disabled:opacity-40 disabled:pointer-events-none"
        :disabled="!hasPrev"
        aria-label="Previous document"
        @click="goPrev"
      >
        <i class="pi pi-chevron-left" aria-hidden="true" />
      </button>

      <div class="flex flex-col flex-1 min-w-0 p-4 md:p-6">
        <div class="flex items-center justify-between gap-2 mb-3">
          <h2
            id="extracted-document-title"
            class="text-lg font-semibold text-text-primary truncate"
          >
           {{ currentItem?.document.source.file_name }}
           </h2>
          <button
            type="button"
            class="shrink-0 p-2 rounded text-text-muted hover:text-text-primary hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a"
            aria-label="Close panel"
            @click="close"
          >
            <i class="pi pi-times" aria-hidden="true" />
          </button>
        </div>
        <div
          class="flex-1 overflow-auto rounded border border-white/10 bg-bg-1/50 p-4 text-sm text-text-secondary font-mono whitespace-pre-wrap break-words"
        >
          <template v-if="currentItem?.document">
            {{ formattedDocument }}
          </template>
          <p v-else class="text-text-muted">
            No document content.
          </p>
        </div>
        <p v-if="items.length > 1" class="mt-2 text-xs text-text-muted text-center">
          {{ currentIndex + 1 }} / {{ items.length }}
        </p>
      </div>

      <button
        type="button"
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 w-10 h-10 rounded-full bg-bg-1 border border-white/20 flex items-center justify-center text-text-primary hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a disabled:opacity-40 disabled:pointer-events-none"
        :disabled="!hasNext"
        aria-label="Next document"
        @click="goNext"
      >
        <i class="pi pi-chevron-right" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ExtractedDocumentItem } from '@/types/upload'

const props = withDefaults(
  defineProps<{
    open: boolean
    items?: ExtractedDocumentItem[]
    currentIndex?: number
  }>(),
  { items: () => [], currentIndex: 0 }
)

const emit = defineEmits<{
  close: []
  'update:currentIndex': [index: number]
}>()

const currentItem = computed(
  () => props.items[props.currentIndex] ?? null
)

const hasPrev = computed(() => props.currentIndex > 0)
const hasNext = computed(
  () => props.currentIndex < props.items.length - 1 && props.items.length > 1
)

const formattedDocument = computed(() => {
  const doc = currentItem.value?.document
  if (!doc) return ''
  try {
    return JSON.stringify(doc, null, 2)
  } catch {
    return String(doc)
  }
})

function goPrev() {
  if (hasPrev.value) {
    emit('update:currentIndex', props.currentIndex - 1)
  }
}

function goNext() {
  if (hasNext.value) {
    emit('update:currentIndex', props.currentIndex + 1)
  }
}

function close() {
  emit('close')
}
</script>
