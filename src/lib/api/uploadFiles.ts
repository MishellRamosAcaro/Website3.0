import axios from 'axios'
import { api, getErrorMessage } from './axiosConfig'
import type { UploadFileResult } from '@/types/upload'

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
      error: is409 ? 'Has alcanzado el límite de 5 archivos.' : message,
    }
  }
}
