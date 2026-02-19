/**
 * Upload status for a single file.
 */
export type UploadStatus = 'idle' | 'uploading' | 'success' | 'failed'

/**
 * Phase of upload-and-extract: upload (sending file) or extract (server extracting).
 */
export type UploadPhase = 'upload' | 'extract'

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
  /** Phase when status is 'uploading': 'upload' or 'extract'. */
  phase?: UploadPhase
  /** Validation error message (e.g. "> 3MB", "Max 5 files", "Duplicated name"). */
  validationError: string | null
  /** Server/upload error message when status is 'failed'. */
  errorMessage: string | null
}

/**
 * Response shape from POST /upload-and-extract (document + sections).
 */
export interface ExtractionResponse {
  document: Record<string, unknown>
  sections: unknown[]
}

/**
 * Result of a single file upload (upload-and-extract). On success includes extraction data.
 */
export interface UploadFileResult {
  ok: boolean
  file_id?: string
  document?: Record<string, unknown>
  sections?: unknown[]
  error?: string
}

/**
 * Single item in the list of uploaded files (GET /uploads).
 */
export interface UploadedFileItem {
  file_id: string
  filename: string
  size: number
  uploaded_at: string
  status: string
  /** Result of the security scan (e.g. CLEAN, INFECTED). Gives the user confidence about file safety. */
  scan_result?: string | null
}

/**
 * Response for GET /uploads list.
 */
export interface UploadListResponse {
  items: UploadedFileItem[]
}

/**
 * Single item for the extracted document panel (file_id, name, document).
 */
export interface ExtractedDocumentItem {
  file_id: string
  name: string
  document: Record<string, unknown>
}
