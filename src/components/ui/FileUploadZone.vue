<template>
  <div class="file-upload-zone" aria-labelledby="file-upload-heading">
    <h2 id="file-upload-heading" class="sr-only">Upload files</h2>
    <FileUpload
      ref="fileUploadRef"
      mode="advanced"
      :multiple="true"
      :accept="ACCEPT_UPLOAD"
      :max-file-size="MAX_FILE_SIZE"
      :file-limit="MAX_FILES_COUNT"
      :custom-upload="true"
      :show-upload-button="true"
      :show-cancel-button="false"
      choose-label="Choose"
      upload-label="Upload"
      class="upload-root"
      unstyled
      @select="onSelect"
      @uploader="onUploader"
    >
      <template #header="{ chooseCallback, uploadCallback, clearCallback }">
        <div class="flex flex-wrap items-center gap-3 p-4 border-b border-white/10">
          <button
            type="button"
            class="btn-primary flex items-center gap-2"
            aria-label="Choose files"
            @click="chooseCallback()"
          >
            <i class="pi pi-plus" aria-hidden="true" />
            <span>Choose</span>
          </button>
          <button
            type="button"
            class="btn-secondary flex items-center gap-2"
            aria-label="Upload selected files"
            :disabled="!canUpload"
            @click="startUpload()"
          >
            <i class="pi pi-upload" aria-hidden="true" />
            <span>Upload</span>
          </button>
          <button
            v-if="hasAnyFiles"
            type="button"
            class="text-text-secondary hover:text-text-primary text-sm"
            aria-label="Clear all files"
            @click="clearAll(); clearCallback?.()"
          >
            Clear
          </button>
        </div>
      </template>
      <template #content>
        <div
          class="min-h-[12rem] rounded-b-lg border border-t-0 border-white/10 bg-bg-1/50 p-4"
          @dragover.prevent="onDragOver"
          @dragleave.prevent="onDragLeave"
          @drop.prevent="onDrop"
          :class="{ 'border-neon-a ring-1 ring-neon-a/30': isDragging }"
        >
          <div v-if="!hasAnyFiles" class="flex flex-col items-center justify-center py-12 text-center">
            <i class="pi pi-cloud-upload text-4xl text-text-muted mb-3" aria-hidden="true" />
            <p class="text-text-secondary text-sm">
              Drag and drop files here or use Choose to select. Max 5 files, 3MB each. Allowed: .pdf, .docx, .txt
            </p>
          </div>
          <ul v-else class="space-y-3" role="list" aria-label="Selected files">
            <li
              v-for="item in fileItems"
              :key="item.id"
              class="flex flex-col gap-2 rounded-lg border border-white/10 bg-bg-0/50 p-3"
              :aria-describedby="item.validationError || item.errorMessage ? `err-${item.id}` : undefined"
            >
              <div class="flex items-center justify-between gap-2 min-w-0">
                <span class="truncate text-text-primary font-medium" :title="item.file.name">
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
                  <button
                    v-if="item.status === 'uploading'"
                    type="button"
                    class="text-red-400 hover:text-red-300 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a rounded px-2"
                    aria-label="Cancel upload"
                    @click="cancelUpload(item.id)"
                  >
                    Cancel
                  </button>
                  <button
                    v-if="item.status === 'failed'"
                    type="button"
                    class="text-neon-b hover:text-neon-c text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a rounded px-2"
                    aria-label="Retry upload"
                    @click="retry(item.id)"
                  >
                    Retry
                  </button>
                  <button
                    type="button"
                    class="text-text-muted hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-a rounded p-1"
                    :aria-label="`Remove ${item.file.name}`"
                    @click="remove(item.id)"
                  >
                    <i class="pi pi-times" aria-hidden="true" />
                  </button>
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
      </template>
      <template #empty>
        <span />
      </template>
    </FileUpload>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import FileUpload from 'primevue/fileupload'
import ProgressBar from 'primevue/progressbar'
import { useAuthStore } from '@/stores/auth'
import { useFileUpload } from '@/composables/useFileUpload'
import { ACCEPT_UPLOAD, MAX_FILE_SIZE, MAX_FILES_COUNT } from '@/lib/validation/upload'

const authStore = useAuthStore()
const userId = authStore.userId ?? 'mock-user-1'
const fileUploadRef = ref<InstanceType<typeof FileUpload> | null>(null)
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
} = useFileUpload(userId)

function onSelect(event: { files: FileList | File[] }) {
  const files = event.files instanceof FileList ? Array.from(event.files) : event.files
  addFiles(files)
  nextTick(() => {
    fileUploadRef.value?.clear()
  })
}

function onUploader() {
  // customUpload: we handle upload ourselves via startUpload()
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
.upload-root :deep(.p-fileupload-buttonbar) {
  display: none;
}
.upload-root :deep(.p-fileupload-content) {
  border: none;
  padding: 0;
  background: transparent;
}
.upload-root :deep(input[type='file']) {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}
/* ProgressBar unstyled: show a bar */
.upload-root :deep(.p-progressbar) {
  @apply h-2 w-full overflow-hidden rounded-full bg-white/10;
}
.upload-root :deep(.p-progressbar-value) {
  @apply h-full rounded-full bg-gradient-to-r from-neon-a to-neon-b transition-all duration-300;
}
</style>
