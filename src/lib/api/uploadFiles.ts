import axios from 'axios'
import { api, getErrorMessage } from './axiosConfig'
import type { UploadFileResult, UploadedFileItem } from '@/types/upload'

export type UploadProgressPhase = 'upload' | 'extract'

/**
 * Response from POST /upload-and-extract: document with selected fields only (no sections).
 */
export interface UploadAndExtractResponse {
  document: Record<string, unknown>
}

/**
 * Upload a single file and run extraction (POST /upload-and-extract).
 * Auth via cookie (JWT). Progress callback receives (percent, phase).
 * On success returns file_id and document (file_id, source, document_type, technical_context, risk_level, audience, state, effective_date, owner_team). Sections are not returned.
 */
export async function uploadFile(
  file: File,
  onProgress: (progress: number, phase: UploadProgressPhase) => void,
  signal?: AbortSignal
): Promise<UploadFileResult> {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await api.post<UploadAndExtractResponse>(
      '/upload-and-extract',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
        signal,
        onUploadProgress(progressEvent) {
          const loaded = progressEvent.loaded ?? 0
          const total = progressEvent.total ?? 1
          const percent = total > 0 ? Math.min(100, (loaded / total) * 100) : 0
          onProgress(percent, 'upload')
          if (total > 0 && loaded >= total) {
            onProgress(100, 'extract')
          }
        },
      }
    )
    onProgress(100, 'extract')
    const doc = res.data?.document as Record<string, unknown> | undefined
    const fileId =
      doc && (typeof doc.file_id === 'string' || typeof doc.file_id === 'object')
        ? String(doc.file_id)
        : undefined
    return {
      ok: true,
      file_id: fileId,
      document: doc,
    }
  } catch (err: unknown) {
    const message = getErrorMessage(err, 'Upload failed')
    const is409 = axios.isAxiosError(err) && err.response?.status === 409
    const is400 = axios.isAxiosError(err) && err.response?.status === 400
    const responseData = axios.isAxiosError(err) ? err.response?.data : undefined
    const detail =
      is400 && responseData != null && typeof (responseData as { detail?: string }).detail === 'string'
        ? (responseData as { detail: string }).detail
        : message
    return {
      ok: false,
      error: is409 ? 'You have reached the limit of 5 files.' : detail,
    }
  }
}

/**
 * List uploaded files for the current user.
 * Auth via cookie. Returns empty array on error (e.g. 401).
 */
export async function listUploads(): Promise<UploadedFileItem[]> {
  try {
    const res = await api.get<{ items: UploadedFileItem[] }>('/uploads', {
      withCredentials: true,
    })
    return res.data?.items ?? []
  } catch {
    return []
  }
}

/**
 * Delete an uploaded file. Only owner. Throws with message on 404/error.
 */
export async function deleteUpload(fileId: string): Promise<void> {
  try {
    await api.delete(`/uploads/${fileId}`, { withCredentials: true })
  } catch (err) {
    throw new Error(getErrorMessage(err, 'Delete failed'))
  }
}

/**
 * Download a file (blob). Only CLEAN files are allowed by the backend.
 * Triggers browser download with the given filename.
 */
export async function downloadUpload(fileId: string, filename: string): Promise<void> {
  const res = await api.get(`/uploads/${fileId}/download`, {
    responseType: 'blob',
    withCredentials: true,
  })
  const blob = res.data as Blob
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename || 'download'
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Get the extracted document section for a file (GET /extractions/{file_id}/document).
 * Auth via cookie. Throws on 404 or error.
 */
export async function getExtractedDocument(
  fileId: string
): Promise<Record<string, unknown>> {
  const res = await api.get<{ document: Record<string, unknown> }>(
    `/extractions/${fileId}/document`,
    { withCredentials: true }
  )
  const doc = res.data?.document
  if (doc && typeof doc === 'object' && !Array.isArray(doc)) {
    return doc as Record<string, unknown>
  }
  throw new Error(getErrorMessage(null, 'Invalid extraction response'))
}
