import { api, getErrorMessage } from './axiosConfig'
import type { UploadFileResult } from '@/types/upload'

/**
 * Upload a single file to the backend.
 * Path concept: data/<userId>/<file_name>
 * Use this module when the backend is ready; until then use uploadMock.
 */
export async function uploadFile(
  file: File,
  userId: string,
  onProgress: (progress: number) => void,
  signal?: AbortSignal
): Promise<UploadFileResult> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('userId', userId)

  try {
    await api.post('/upload', formData, {
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
    return { ok: true }
  } catch (err) {
    return {
      ok: false,
      error: getErrorMessage(err, 'Upload failed'),
    }
  }
}
