import { z } from 'zod'

const MAX_FILES = 5
const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024 // 3 MB
const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.txt'] as const

function getAllowedExtensionsLower(): string[] {
  return [...ALLOWED_EXTENSIONS]
}

/**
 * Case-insensitive check: file name ends with one of the allowed extensions.
 */
export function isAllowedFileType(fileName: string): boolean {
  const lower = fileName.toLowerCase()
  return ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext))
}

/**
 * Allowed MIME types / extensions for upload (for accept attribute).
 */
export const ACCEPT_UPLOAD =
  '.pdf,.docx,.txt'

export const MAX_FILES_COUNT = MAX_FILES
export const MAX_FILE_SIZE = MAX_FILE_SIZE_BYTES

export const uploadValidation = {
  maxFiles: MAX_FILES,
  maxFileSize: MAX_FILE_SIZE_BYTES,
  allowedExtensions: getAllowedExtensionsLower(),
}

/**
 * Validation error codes for per-file messages.
 */
export const UPLOAD_ERROR_MESSAGES = {
  tooManyFiles: 'Maximum 5 files allowed.',
  fileTooBig: 'File size must be under 3MB.',
  invalidType: 'Allowed types: .pdf, .docx, .txt.',
  duplicatedName: 'Duplicated file name.',
} as const

/**
 * Validates a list of file names/sizes for upload.
 * Returns a record of index -> error message for invalid entries.
 */
export function validateFileList(files: File[]): Map<number, string> {
  const errors = new Map<number, string>()
  const nameCount = new Map<string, number>()

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const name = file?.name || ''
    const nameLower = name.toLowerCase()
  
    if (files.length > MAX_FILES) {
      errors.set(i, UPLOAD_ERROR_MESSAGES.tooManyFiles)
    }
    if (file.size  > MAX_FILE_SIZE_BYTES) {
      errors.set(i, UPLOAD_ERROR_MESSAGES.fileTooBig)
    }
    if (!isAllowedFileType(name)) {
      errors.set(i, UPLOAD_ERROR_MESSAGES.invalidType)
    }
    const count = nameCount.get(nameLower) ?? 0
    nameCount.set(nameLower, count + 1)
  }

  for (let i = 0; i < files.length; i++) {
    if (errors.has(i)) continue
    const nameLower = files[i].name.toLowerCase()
    if ((nameCount.get(nameLower) ?? 0) > 1) {
      errors.set(i, UPLOAD_ERROR_MESSAGES.duplicatedName)
    }
  }

  return errors
}

/**
 * Zod schema for a single file (for use in composable).
 * We validate count/size/type/duplicates in validateFileList; this schema can be used to parse options.
 */
export const uploadOptionsSchema = z.object({
  maxFiles: z.number().int().min(1).max(MAX_FILES),
  maxFileSize: z.number().int().positive().max(MAX_FILE_SIZE_BYTES),
})

export type UploadOptions = z.infer<typeof uploadOptionsSchema>
