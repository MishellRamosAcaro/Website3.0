<template>
  <section
    class="file-view-zone rounded-lg border border-white/10 bg-bg-1/50 p-4"
    aria-labelledby="file-view-heading"
  >
    <h2 id="file-view-heading" class="text-lg font-semibold text-text-primary mb-3">
      Files Uploads
    </h2>

    <div v-if="loadingUploaded" class="flex items-center justify-center py-8 text-text-secondary text-sm">
      <i class="pi pi-spin pi-spinner mr-2" aria-hidden="true" />
      <span>Loading…</span>
    </div>

    <ul
      v-else-if="uploadedFiles.length > 0"
      class="space-y-3"
      role="list"
      aria-label="Uploaded files"
    >
      <li
        v-for="item in uploadedFiles"
        :key="item.file_id"
        class="flex flex-col gap-2 rounded-lg border border-white/10 bg-bg-0/50 p-3"
      >
        <div class="flex items-center justify-between gap-2 min-w-0">
          <span class="truncate text-text-primary font-medium" :title="item.name">
            {{ item.name }}
          </span>
          <div class="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              icon="pi pi-download"
              severity="secondary"
              text
              rounded
              size="small"
              class="text-text-muted hover:text-neon-a focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a rounded p-1"
              :aria-label="`Download ${item.name}`"
              :disabled="item.status !== 'CLEAN'"
              :title="
                item.status === 'PENDING_SCAN'
                  ? 'Disponible cuando termine el análisis'
                  : undefined
              "
              @click="onDownload(item)"
            />
            <Button
              type="button"
              icon="pi pi-trash"
              severity="secondary"
              text
              rounded
              size="small"
              class="text-text-muted hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a rounded p-1"
              :aria-label="`Delete ${item.name}`"
              :disabled="deletingId === item.file_id"
              :loading="deletingId === item.file_id"
              @click="onDelete(item)"
            />
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
          <span>{{ formatSize(item.size) }}</span>
          <span>{{ formatDate(item.uploaded_at) }}</span>
          <span
            v-if="item.status"
            class="rounded px-2 py-0.5 text-xs font-medium"
            :class="
              item.status === 'CLEAN'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-amber-500/20 text-amber-400'
            "
          >
            {{ item.status }}
          </span>
          <span
            v-if="item.scan_result"
            class="text-xs text-text-muted"
            title="Resultado del análisis de seguridad"
          >
            Scan: {{ item.scan_result }}
          </span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import { listUploads, deleteUpload, downloadUpload } from '@/lib/api/uploadFiles'
import type { UploadedFileItem } from '@/types/upload'

const uploadedFiles = ref<UploadedFileItem[]>([])
const loadingUploaded = ref(false)
const deletingId = ref<string | null>(null)

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

const emit = defineEmits<{ 'list-update': [items: UploadedFileItem[]] }>()

async function load() {
  loadingUploaded.value = true
  try {
    uploadedFiles.value = await listUploads()
    emit('list-update', uploadedFiles.value)
  } finally {
    loadingUploaded.value = false
  }
}

async function onDownload(item: UploadedFileItem) {
  if (item.status !== 'CLEAN') return
  try {
    await downloadUpload(item.file_id, item.name)
  } catch {
    // Error could be shown via toast; for now silent
  }
}

async function onDelete(item: UploadedFileItem) {
  deletingId.value = item.file_id
  try {
    await deleteUpload(item.file_id)
    uploadedFiles.value = uploadedFiles.value.filter((f) => f.file_id !== item.file_id)
    emit('list-update', uploadedFiles.value)
  } finally {
    deletingId.value = null
  }
}

function refresh() {
  load()
}

onMounted(() => {
  load()
})

defineExpose({ refresh })
</script>
