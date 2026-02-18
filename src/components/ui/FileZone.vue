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
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileUploadZone from '@/components/ui/FileUploadZone.vue'
import FileViewZone from '@/components/ui/FileViewZone.vue'
import type { UploadedFileItem } from '@/types/upload'

const fileViewZoneRef = ref<InstanceType<typeof FileViewZone> | null>(null)
const hasUploadedFiles = ref(false)
const uploadedCount = ref(0)

function onListUpdate(items: UploadedFileItem[]) {
  hasUploadedFiles.value = items.length > 0
  uploadedCount.value = items.length
}

function onUploadComplete() {
  // Show FileViewZone immediately so the new file appears (or loading state); refresh updates the list/count
  hasUploadedFiles.value = true
  fileViewZoneRef.value?.refresh()
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

/* Valor concreto para que la transición de salida anime (none → 0 no se interpola) */
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
