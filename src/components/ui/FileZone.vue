<template>
  <div class="file-zone" :class="hasUploadedFiles ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : ''">
    <FileUploadZone @upload-complete="onUploadComplete" />
    <FileViewZone
      ref="fileViewZoneRef"
      @list-update="onListUpdate"
      :class="hasUploadedFiles ? '' : 'sr-only'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileUploadZone from '@/components/ui/FileUploadZone.vue'
import FileViewZone from '@/components/ui/FileViewZone.vue'
import type { UploadedFileItem } from '@/types/upload'

const fileViewZoneRef = ref<InstanceType<typeof FileViewZone> | null>(null)
const hasUploadedFiles = ref(false)

function onListUpdate(items: UploadedFileItem[]) {
  hasUploadedFiles.value = items.length > 0
}

function onUploadComplete() {
  fileViewZoneRef.value?.refresh()
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
</style>
