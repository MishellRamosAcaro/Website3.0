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
           {{ documentTitle }}
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
          class="flex-1 overflow-auto rounded border border-white/10 bg-bg-1/50 p-4 text-sm text-text-secondary"
        >
          <template v-if="doc">
            <section class="mb-6">
              <h2 class="text-base font-semibold text-text-primary mb-3 border-b border-white/10 pb-1.5">
                File
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5">
                <div class="flex gap-2">
                  <span class="font-semibold text-text-primary shrink-0 min-w-[7rem]">File ID:</span>
                  <span class="text-text-secondary">{{ formatValue(get(doc, 'file_id')) }}</span>
                </div>
                <div class="flex gap-2">
                  <span class="font-semibold text-text-primary shrink-0 min-w-[7rem]">File name:</span>
                  <span class="text-text-secondary">{{ formatValue(get(doc, 'source', 'file_name')) }}</span>
                </div>
                <div class="flex gap-2">
                  <span class="font-semibold text-text-primary shrink-0 min-w-[7rem]">Upload date:</span>
                  <span class="text-text-secondary">{{ formatDate(get(doc, 'source', 'upload_date')) }}</span>
                </div>
                <div class="flex gap-2">
                  <span class="font-semibold text-text-primary shrink-0 min-w-[7rem]">Document type:</span>
                  <span class="text-text-secondary">{{ formatValue(get(doc, 'document_type')) }}</span>
                </div>
                <div class="flex gap-2">
                  <span class="font-semibold text-text-primary shrink-0 min-w-[7rem]">Risk level:</span>
                  <span class="text-text-secondary">{{ formatValue(get(doc, 'risk_level')) }}</span>
                </div>
                <div class="flex gap-2">
                  <span class="font-semibold text-text-primary shrink-0 min-w-[7rem]">Audience:</span>
                  <span class="text-text-secondary">{{ formatArray(get(doc, 'audience')) }}</span>
                </div>
                <div class="flex gap-2">
                  <span class="font-semibold text-text-primary shrink-0 min-w-[7rem]">State:</span>
                  <span class="text-text-secondary">{{ formatValue(get(doc, 'state')) }}</span>
                </div>
                <div class="flex gap-2">
                  <span class="font-semibold text-text-primary shrink-0 min-w-[7rem]">Effective date:</span>
                  <span class="text-text-secondary">{{ formatDate(get(doc, 'effective_date')) }}</span>
                </div>
                <div class="flex gap-2">
                  <span class="font-semibold text-text-primary shrink-0 min-w-[7rem]">Owner team:</span>
                  <span class="text-text-secondary">{{ formatValue(get(doc, 'owner_team')) }}</span>
                </div>
              </div>
            </section>
            <section>
              <h2 class="text-base font-semibold text-text-primary mb-3 border-b border-white/10 pb-1.5">
                Technical Context
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5">
                <div class="flex gap-2">
                  <span class="font-semibold text-text-primary shrink-0 min-w-[7rem]">Equipment:</span>
                  <span class="text-text-secondary">{{ formatValue(get(doc, 'technical_context', 'equipment')) }}</span>
                </div>
                <div class="flex gap-2">
                  <span class="font-semibold text-text-primary shrink-0 min-w-[7rem]">Version:</span>
                  <span class="text-text-secondary">{{ formatValue(get(doc, 'technical_context', 'version')) }}</span>
                </div>
                <div class="flex gap-2 md:col-span-2">
                  <span class="font-semibold text-text-primary shrink-0 min-w-[7rem]">Workflow:</span>
                  <span class="text-text-secondary">{{ formatArray(get(doc, 'technical_context', 'workflow')) }}</span>
                </div>
              </div>
            </section>
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

const doc = computed(() => currentItem.value?.document ?? null)

const documentTitle = computed(() => {
  const d = doc.value
  if (!d) return 'Document'
  const name = get(d, 'source', 'file_name')
  return name !== null && name !== undefined && name !== ''
    ? String(name)
    : 'Document'
})

const hasPrev = computed(() => props.currentIndex > 0)
const hasNext = computed(
  () => props.currentIndex < props.items.length - 1 && props.items.length > 1
)

const EMPTY = '—'

function get(obj: Record<string, unknown> | null | undefined, ...keys: string[]): unknown {
  if (obj == null) return undefined
  let cur: unknown = obj
  for (const key of keys) {
    cur = cur !== null && typeof cur === 'object' ? (cur as Record<string, unknown>)[key] : undefined
  }
  return cur
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === '') return EMPTY
  return String(value)
}

function formatDate(value: unknown): string {
  if (value === null || value === undefined || value === '') return EMPTY
  const str = String(value)
  try {
    const d = new Date(str)
    if (Number.isNaN(d.getTime())) return str
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return str
  }
}

function formatArray(value: unknown): string {
  if (value === null || value === undefined) return EMPTY
  if (!Array.isArray(value)) return formatValue(value)
  if (value.length === 0) return EMPTY
  return value.map(String).join(', ')
}

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
