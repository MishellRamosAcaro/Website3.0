import axios from 'axios'
import { api, getErrorMessage } from './axiosConfig'
import type { UploadFileResult, UploadedFileItem } from '@/types/upload'

/**
 * Upload a single file to the backend.
 * Auth via cookie (JWT); backend derives user from token. Do not send userId.
 */
export async function uploadFile(
  file: File,
  onProgress: (progress: number) => void,
  signal?: AbortSignal
): Promise<UploadFileResult> {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await api.post<{ ok: boolean; file_id?: string }>('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
      signal,
      onUploadProgress(progressEvent) {
        const loaded = progressEvent.loaded ?? 0
        const total = progressEvent.total ?? 1
        const percent = total > 0 ? Math.min(100, (loaded / total) * 100) : 0
        onProgress(percent)
      },
    })
    onProgress(100)
    return { ok: true, file_id: res.data?.file_id }
  } catch (err) {
    const message = getErrorMessage(err, 'Upload failed')
    const is409 = axios.isAxiosError(err) && err.response?.status === 409
    return {
      ok: false,
      error: is409 ? 'You have reached the limit of 5 files.' : message,
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
