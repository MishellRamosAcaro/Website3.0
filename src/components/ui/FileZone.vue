<template>
  <div class="file-zone" :class="hasUploadedFiles ? 'file-zone-grid' : ''">
    <FileUploadZone
      :uploaded-count="uploadedCount"
      @upload-complete="onUploadComplete"
    />
    <div
      class="file-view-zone-wrapper"
      :class="{ 'file-view-zone-visible': hasUploadedFiles }"
    >
      <FileViewZone
        ref="fileViewZoneRef"
        @list-update="onListUpdate"
        @view-extraction="onViewExtraction"
      />
    </div>

    <div
      v-if="showExtractOffer"
      class="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="extract-offer-title"
    >
      <div
        class="rounded-lg border border-white/20 bg-bg-0 p-6 shadow-xl max-w-md"
        @click.stop
      >
        <h2 id="extract-offer-title" class="text-lg font-semibold text-text-primary mb-2">
          Documents extracted
        </h2>
        <p class="text-text-secondary text-sm mb-4">
          Do you want to view your extracted documents?
        </p>
        <div class="flex gap-3 justify-end">
          <Button
            label="No"
            severity="secondary"
            @click="showExtractOffer = false"
          />
          <Button
            label="Yes"
            @click="openPanelFromOffer"
          />
        </div>
      </div>
    </div>

    <ExtractedDocumentPanel
      :open="panelOpen"
      :items="extractedDocs"
      :current-index="panelIndex"
      @close="panelOpen = false"
      @update:current-index="panelIndex = $event"
      @update:field="onUpdateField"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import FileUploadZone from '@/components/ui/FileUploadZone.vue'
import FileViewZone from '@/components/ui/FileViewZone.vue'
import ExtractedDocumentPanel from '@/components/ui/ExtractedDocumentPanel.vue'
import type { ExtractedDocumentItem, UploadedFileItem } from '@/types/upload'
import type { UploadSuccessResult } from '@/composables/useFileUpload'
import { getExtractedDocument, updateExtractionDocument } from '@/lib/api/uploadFiles'

const fileViewZoneRef = ref<InstanceType<typeof FileViewZone> | null>(null)
const hasUploadedFiles = ref(false)
const uploadedCount = ref(0)
const extractedDocs = ref<ExtractedDocumentItem[]>([])
const showExtractOffer = ref(false)
const panelOpen = ref(false)
const panelIndex = ref(0)

function onListUpdate(items: UploadedFileItem[]) {
  hasUploadedFiles.value = items.length > 0
  uploadedCount.value = items.length
}

function onUploadComplete(result?: UploadSuccessResult) {
  hasUploadedFiles.value = true
  fileViewZoneRef.value?.refresh()
  if (result?.file_id && result?.document) {
    const name =
      (result.document as { source?: string }).source ?? result.file_id
    extractedDocs.value.push({
      file_id: result.file_id,
      name,
      document: result.document,
    })
    showExtractOffer.value = true
  }
}

function openPanelFromOffer() {
  showExtractOffer.value = false
  panelIndex.value = Math.max(0, extractedDocs.value.length - 1)
  panelOpen.value = true
}

async function onViewExtraction(payload: { file_id: string; name: string }) {
  const { file_id, name } = payload
  const existing = extractedDocs.value.find((d) => d.file_id === file_id)
  if (existing) {
    panelIndex.value = extractedDocs.value.indexOf(existing)
    panelOpen.value = true
    return
  }
  try {
    const document = await getExtractedDocument(file_id)
    extractedDocs.value.push({ file_id, name, document })
    panelIndex.value = extractedDocs.value.length - 1
    panelOpen.value = true
  } catch {
    // Could show a toast "No extraction available"
  }
}

function setAtPath(
  obj: Record<string, unknown>,
  path: string[],
  value: unknown
): void {
  if (path.length === 0) return
  const first = path[0]
  if (first === undefined) return
  if (path.length === 1) {
    obj[first] = value
    return
  }
  const [, ...rest] = path
  let next = obj[first]
  if (next === null || next === undefined || typeof next !== 'object' || Array.isArray(next)) {
    next = {}
    obj[first] = next
  }
  setAtPath(next as Record<string, unknown>, rest, value)
}

function buildUpdatesFromPath(
  doc: Record<string, unknown>,
  path: string[],
  value: unknown
): Record<string, unknown> {
  if (path.length === 0) return {}
  const first = path[0]
  if (first === undefined) return {}
  if (path.length === 1) {
    return { [first]: value }
  }
  const [, ...rest] = path
  const existing = doc[first]
  const existingObj =
    existing !== null &&
    existing !== undefined &&
    typeof existing === 'object' &&
    !Array.isArray(existing)
      ? (existing as Record<string, unknown>)
      : {}
  const merged: Record<string, unknown> = { ...existingObj }
  const restFirst = rest[0]
  if (rest.length === 1 && restFirst !== undefined) {
    merged[restFirst] = value
  } else {
    const inner = buildUpdatesFromPath(existingObj, rest, value)
    Object.assign(merged, inner)
  }
  return { [first]: merged }
}

async function onUpdateField(payload: {
  file_id: string
  path: string[]
  value: unknown
}) {
  const { file_id, path, value } = payload
  const item = extractedDocs.value.find((d) => d.file_id === file_id)
  if (!item?.document) return
  const doc = item.document as Record<string, unknown>
  const previous = JSON.parse(JSON.stringify(doc)) as Record<string, unknown>
  setAtPath(doc, path, value)
  const updates = buildUpdatesFromPath(doc, path, value)
  try {
    const updated = await updateExtractionDocument(file_id, updates)
    item.document = updated
    const p0 = path[0]
    const p1 = path[1]
    if (p0 === 'source' && p1 === 'file_name' && typeof value === 'string') {
      item.name = value
    }
    // Refresh the file list (FileViewZone) so it shows updated filename/metadata from the server
    fileViewZoneRef.value?.refresh()
  } catch {
    setAtPath(doc, path, getAtPath(previous, path))
  }
}

function getAtPath(obj: Record<string, unknown>, path: string[]): unknown {
  let cur: unknown = obj
  for (const key of path) {
    cur =
      cur !== null && typeof cur === 'object' && !Array.isArray(cur)
        ? (cur as Record<string, unknown>)[key]
        : undefined
  }
  return cur
}
</script>

<style scoped>
.file-zone-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 1023px) {
  .file-zone-grid {
    grid-template-columns: 1fr;
  }
}

.file-view-zone-wrapper {
  overflow: hidden;
  transition:
    opacity 0.6s ease,
    transform 0.6s ease,
    max-width 0.7s ease-out,
    max-height 0.7s ease-out;
  opacity: 0;
  transform: translateX(1rem);
  max-width: 0;
  max-height: 0;
  min-width: 0;
}

.file-view-zone-wrapper.file-view-zone-visible {
  opacity: 1;
  transform: translateX(0);
  max-width: 100%;
  max-height: 80vh;
}

@media (max-width: 1023px) {
  .file-view-zone-wrapper:not(.file-view-zone-visible) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}
</style>
