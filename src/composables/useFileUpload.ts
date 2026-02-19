import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import type { FileUploadItem } from '@/types/upload'
import { validateFileList } from '@/lib/validation/upload'
import type { ValidateFileListOptions } from '@/lib/validation/upload'
import { uploadFile } from '@/lib/api/uploadFiles'

export type UploadSuccessResult = {
  file_id: string
  document?: Record<string, unknown>
  sections?: unknown[]
}

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

export interface UseFileUploadOptions {
  /** Called when a file is uploaded and extracted successfully; receives result with file_id, document, sections. */
  onUploadSuccess?: (result?: UploadSuccessResult) => void
  /** Current number of files already uploaded (e.g. from FileViewZone). Used so validation and retry respect the server limit of 5 total. */
  getUploadedCount?: () => number
  /** When provided, revalidate queue when this count changes (e.g. after user deletes a file in FileViewZone). */
  uploadedCountRef?: Ref<number>
}

const EXTRACT_PROGRESS_INTERVAL_MS = 120
const EXTRACT_PROGRESS_STEP = 4

export function useFileUpload(options?: UseFileUploadOptions) {
  const fileItems = ref<FileUploadItem[]>([])
  const abortControllers = new Map<string, AbortController>()
  const extractProgressIntervals = new Map<string, ReturnType<typeof setInterval>>()
  const onUploadSuccess = options?.onUploadSuccess
  const getUploadedCount = options?.getUploadedCount
  const uploadedCountRef = options?.uploadedCountRef

  const hasAnyFiles = computed(() => fileItems.value.length > 0)
  const hasValidationErrors = computed(() =>
    fileItems.value.some((item) => item.validationError != null)
  )
  const canUpload = computed(() =>
    fileItems.value.some(
      (item) => item.status === 'idle' && item.validationError == null
    )
  )
  const hasUploading = computed(() =>
    fileItems.value.some((item) => item.status === 'uploading')
  )

  function runValidation(
    files: File[],
    opts?: ValidateFileListOptions
  ): Map<number, string> {
    const alreadyUploaded = getUploadedCount?.() ?? 0
    return validateFileList(files, { alreadyUploadedCount: alreadyUploaded, ...opts })
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

  function clearExtractProgress(id: string) {
    const tid = extractProgressIntervals.get(id)
    if (tid) {
      clearInterval(tid)
      extractProgressIntervals.delete(id)
    }
  }

  function remove(id: string) {
    const item = fileItems.value.find((i) => i.id === id)
    if (item?.status === 'uploading') {
      cancelUpload(id)
    }
    clearExtractProgress(id)
    abortControllers.delete(id)
    fileItems.value = fileItems.value.filter((i) => i.id !== id)
    revalidateAll()
  }

  function cancelUpload(id: string) {
    clearExtractProgress(id)
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
      item.phase = undefined
    }
  }

  async function uploadOne(item: FileUploadItem): Promise<void> {
    if (item.validationError || item.status !== 'idle') return
    const ac = new AbortController()
    abortControllers.set(item.id, ac)
    item.status = 'uploading'
    item.progress = 0
    item.phase = 'upload'
    item.errorMessage = null

    const result = await uploadFile(
      item.file,
      (p, phase) => {
        const i = fileItems.value.find((x) => x.id === item.id)
        if (!i) return
        i.phase = phase
        if (phase === 'extract') {
          clearExtractProgress(item.id)
          i.progress = 0
          let progress = 0
          const tid = setInterval(() => {
            const curr = fileItems.value.find((x) => x.id === item.id)
            if (!curr || curr.status !== 'uploading') {
              clearExtractProgress(item.id)
              return
            }
            progress = Math.min(95, progress + EXTRACT_PROGRESS_STEP)
            curr.progress = progress
          }, EXTRACT_PROGRESS_INTERVAL_MS)
          extractProgressIntervals.set(item.id, tid)
        } else {
          i.progress = p
        }
      },
      ac.signal
    )

    clearExtractProgress(item.id)
    abortControllers.delete(item.id)
    const current = fileItems.value.find((x) => x.id === item.id)
    if (!current) return
    if (result.ok) {
      current.progress = 100
      fileItems.value = fileItems.value.filter((x) => x.id !== item.id)
      revalidateAll()
      onUploadSuccess?.({
        file_id: result.file_id ?? '',
        document: result.document,
        sections: result.sections,
      })
    } else {
      current.status = 'failed'
      current.errorMessage = result.error ?? 'Upload failed'
      current.progress = 0
      current.phase = undefined
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
    const errors = runValidation([item.file])
    if (errors.get(0)) {
      item.validationError = errors.get(0) ?? null
      item.errorMessage = null
      return
    }
    item.validationError = null
    item.errorMessage = null
    item.status = 'idle'
    uploadOne(item)
  }

  if (uploadedCountRef) {
    watch(uploadedCountRef, () => revalidateAll())
  }

  function clearAll() {
    fileItems.value.forEach((item) => {
      if (item.status === 'uploading') cancelUpload(item.id)
    })
    extractProgressIntervals.forEach((tid) => clearInterval(tid))
    extractProgressIntervals.clear()
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
