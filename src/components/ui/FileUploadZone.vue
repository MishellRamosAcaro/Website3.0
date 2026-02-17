<template>
  <div class="file-upload-zone" aria-labelledby="file-upload-heading">
    <h2 id="file-upload-heading" class="sr-only">Upload files</h2>

    <input
      ref="fileInputRef"
      type="file"
      :accept="ACCEPT_UPLOAD"
      :multiple="true"
      class="sr-only"
      aria-hidden="true"
      @change="onFileInputChange"
    />

    <div class="flex flex-wrap items-center gap-3 p-4 border-b border-white/10">
      <Button
        type="button"
        label="Choose"
        icon="pi pi-plus"
        icon-pos="left"
        class="btn-primary flex items-center gap-2"
        aria-label="Choose files"
        @click="openFilePicker"
      />
      <Button
        type="button"
        label="Upload"
        icon="pi pi-upload"
        icon-pos="left"
        class="btn-secondary flex items-center gap-2"
        aria-label="Upload selected files"
        :disabled="!canUpload"
        @click="startUpload()"
      />
      <Button
        v-if="hasAnyFiles"
        type="button"
        label="Clear"
        severity="secondary"
        text
        class="text-text-secondary hover:text-text-primary text-sm"
        aria-label="Clear all files"
        @click="clearAll()"
      />
    </div>

    <div
      class="min-h-[12rem] rounded-b-lg border border-t-0 border-white/10 bg-bg-1/50 p-4"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      :class="{ 'border-neon-a ring-1 ring-neon-a/30': isDragging }"
    >
      <div
        v-if="!hasAnyFiles"
        class="flex flex-col items-center justify-center py-12 text-center"
      >
        <i
          class="pi pi-cloud-upload text-4xl text-text-muted mb-3"
          aria-hidden="true"
        />
        <p class="text-text-secondary text-sm">
          Drag and drop files here or use Choose to select. Max 5 files, 3MB
          each. Allowed: .pdf, .docx, .txt
        </p>
      </div>
      <ul v-else class="space-y-3" role="list" aria-label="Selected files">
        <li
          v-for="item in fileItems"
          :key="item.id"
          class="flex flex-col gap-2 rounded-lg border border-white/10 bg-bg-0/50 p-3"
          :aria-describedby="
            item.validationError || item.errorMessage ? `err-${item.id}` : undefined
          "
        >
          <div class="flex items-center justify-between gap-2 min-w-0">
            <span
              class="truncate text-text-primary font-medium"
              :title="item.file.name"
            >
              {{ item.file.name }}
            </span>
            <div class="flex items-center gap-2 shrink-0">
              <span
                v-if="item.status === 'uploading'"
                class="text-text-secondary text-xs"
                aria-live="polite"
              >
                Uploading…
              </span>
              <Button
                v-if="item.status === 'uploading'"
                type="button"
                label="Cancel"
                severity="danger"
                text
                size="small"
                class="text-red-400 hover:text-red-300 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a rounded px-2"
                aria-label="Cancel upload"
                @click="cancelUpload(item.id)"
              />
              <Button
                v-if="item.status === 'failed'"
                type="button"
                label="Retry"
                severity="secondary"
                text
                size="small"
                class="text-neon-b hover:text-neon-c text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a rounded px-2"
                aria-label="Retry upload"
                @click="retry(item.id)"
              />
              <Button
                type="button"
                icon="pi pi-times"
                severity="secondary"
                text
                rounded
                size="small"
                class="text-text-muted hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a rounded p-1"
                :aria-label="`Remove ${item.file.name}`"
                @click="remove(item.id)"
              />
            </div>
          </div>
          <ProgressBar
            v-if="item.status === 'uploading'"
            :value="item.progress"
            :show-value="false"
            class="h-2 w-full"
            unstyled
          />
          <p
            v-if="item.status === 'success'"
            class="text-sm text-green-400"
            role="status"
          >
            Uploaded successfully
          </p>
          <p
            v-if="item.validationError || item.errorMessage"
            :id="`err-${item.id}`"
            class="text-sm text-red-400"
            role="alert"
          >
            {{ item.validationError ?? item.errorMessage }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProgressBar from 'primevue/progressbar'
import Button from 'primevue/button'
import { useAuthStore } from '@/stores/auth'
import { useFileUpload } from '@/composables/useFileUpload'
import { ACCEPT_UPLOAD } from '@/lib/validation/upload'

const emit = defineEmits<{ 'upload-complete': [] }>()

const authStore = useAuthStore()
const userId = authStore.userId ?? 'mock-user-1'
const fileInputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

const {
  fileItems,
  hasAnyFiles,
  canUpload,
  addFiles,
  remove,
  cancelUpload,
  startUpload,
  retry,
  clearAll,
} = useFileUpload(userId, {
  onUploadSuccess: () => emit('upload-complete'),
})

function openFilePicker() {
  fileInputRef.value?.click()
}

function onFileInputChange(e: Event) {
  const input = e.target as HTMLInputElement
  const files = input.files
  if (files?.length) {
    addFiles(files)
    input.value = ''
  }
}

function onDragOver() {
  isDragging.value = true
}

function onDragLeave() {
  isDragging.value = false
}

function onDrop(e: DragEvent) {
  e.stopPropagation()
  isDragging.value = false
  const dt = e.dataTransfer?.files
  if (dt?.length) addFiles(dt)
}
</script>

<style scoped>
.sr-only {
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

/* ProgressBar unstyled: bar styling */
.file-upload-zone :deep(.p-progressbar) {
  @apply h-2 w-full overflow-hidden rounded-full bg-white/10;
}
.file-upload-zone :deep(.p-progressbar-value) {
  @apply h-full rounded-full bg-gradient-to-r from-neon-a to-neon-b transition-all duration-300;
}
</style>
