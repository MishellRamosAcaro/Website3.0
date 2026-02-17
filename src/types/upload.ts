/**
 * Upload status for a single file.
 */
export type UploadStatus = 'idle' | 'uploading' | 'success' | 'failed'

/**
 * Single file item in the upload queue with state and validation error.
 */
export interface FileUploadItem {
  /** Unique id for the item (for list keys and abort map). */
  id: string
  /** The file. */
  file: File
  /** Current upload status. */
  status: UploadStatus
  /** Upload progress 0–100 when status is 'uploading'. */
  progress: number
  /** Validation error message (e.g. "> 3MB", "Max 5 files", "Duplicated name"). */
  validationError: string | null
  /** Server/upload error message when status is 'failed'. */
  errorMessage: string | null
}

/**
 * Result of a single file upload (mock or real).
 */
export interface UploadFileResult {
  ok: boolean
  file_id?: string
  error?: string
}
