import { ref, computed } from 'vue'
import type { FileUploadItem, UploadStatus } from '@/types/upload'
import { validateFileList } from '@/lib/validation/upload'
import { uploadFile } from '@/lib/api/uploadFiles'

let idCounter = 0
function nextId(): string {
  return `upload-${++idCounter}-${Date.now()}`
}

function toItem(file: File, validationError: string | null): FileUploadItem {
  return {
    id: nextId(),
    file,
    status: 'idle',
    progress: 0,
    validationError,
    errorMessage: null,
  }
}

export function useFileUpload(userId: string) {
  const fileItems = ref<FileUploadItem[]>([])
  const abortControllers = new Map<string, AbortController>()

  const hasAnyFiles = computed(() => fileItems.value.length > 0)
  const hasValidationErrors = computed(() =>
    fileItems.value.some((item) => item.validationError != null)
  )
  const canUpload = computed(
    () =>
      hasAnyFiles.value &&
      !hasValidationErrors.value &&
      fileItems.value.some((item) => item.status === 'idle')
  )
  const hasUploading = computed(() =>
    fileItems.value.some((item) => item.status === 'uploading')
  )

  function runValidation(files: File[]): Map<number, string> {
    return validateFileList(files)
  }

  function addFiles(files: FileList | File[]) {
    const list = Array.from(files)
    if (list.length === 0) return
    const current = fileItems.value.map((i) => i.file)
    const combined = [...current, ...list]
    const errors = runValidation(combined)
    const startIndex = current.length
    const newItems: FileUploadItem[] = list.map((file, i) => {
      const idx = startIndex + i
      const err = errors.get(idx) ?? null
      return toItem(file, err)
    })
    fileItems.value = [...fileItems.value, ...newItems]
    revalidateAll()
  }

  function revalidateAll() {
    const files = fileItems.value.map((i) => i.file)
    const errors = runValidation(files)
    fileItems.value = fileItems.value.map((item, i) => ({
      ...item,
      validationError: errors.get(i) ?? null,
    }))
  }

  function remove(id: string) {
    const item = fileItems.value.find((i) => i.id === id)
    if (item?.status === 'uploading') {
      cancelUpload(id)
    }
    abortControllers.delete(id)
    fileItems.value = fileItems.value.filter((i) => i.id !== id)
    revalidateAll()
  }

  function cancelUpload(id: string) {
    const ac = abortControllers.get(id)
    if (ac) {
      ac.abort()
      abortControllers.delete(id)
    }
    const item = fileItems.value.find((i) => i.id === id)
    if (item && item.status === 'uploading') {
      item.status = 'failed'
      item.errorMessage = 'Cancelled'
      item.progress = 0
    }
  }

  async function uploadOne(item: FileUploadItem): Promise<void> {
    if (item.validationError || item.status !== 'idle') return
    const ac = new AbortController()
    abortControllers.set(item.id, ac)
    item.status = 'uploading'
    item.progress = 0
    item.errorMessage = null

    const result = await uploadFile(
      item.file,
      (p) => {
        const i = fileItems.value.find((x) => x.id === item.id)
        if (i) i.progress = p
      },
      ac.signal
    )

    abortControllers.delete(item.id)
    const current = fileItems.value.find((x) => x.id === item.id)
    if (!current) return
    if (result.ok) {
      current.status = 'success'
      current.progress = 100
    } else {
      current.status = 'failed'
      current.errorMessage = result.error ?? 'Upload failed'
      current.progress = 0
    }
  }

  function startUpload() {
    if (!canUpload.value) return
    const toUpload = fileItems.value.filter(
      (i) => i.status === 'idle' && !i.validationError
    )
    toUpload.forEach((item) => uploadOne(item))
  }

  function retry(id: string) {
    const item = fileItems.value.find((i) => i.id === id)
    if (!item || item.status !== 'failed') return
    const files = [item.file]
    const errors = runValidation(files)
    if (errors.get(0)) {
      item.validationError = errors.get(0) ?? null
      item.errorMessage = null
      return
    }
    item.validationError = null
    item.errorMessage = null
    uploadOne(item)
  }

  function clearAll() {
    fileItems.value.forEach((item) => {
      if (item.status === 'uploading') cancelUpload(item.id)
    })
    abortControllers.clear()
    fileItems.value = []
  }

  return {
    fileItems,
    hasAnyFiles,
    hasValidationErrors,
    canUpload,
    hasUploading,
    addFiles,
    remove,
    cancelUpload,
    startUpload,
    retry,
    clearAll,
    revalidateAll,
  }
}
