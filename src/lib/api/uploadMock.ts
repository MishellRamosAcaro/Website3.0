import type { UploadFileResult } from '@/types/upload'

const UPLOAD_DURATION_MS = 1500
const FAIL_PROBABILITY = 0.1

/**
 * Simulates file upload with progress and optional abort.
 * Does not use axios; does not write to disk.
 * In production this will be replaced by uploadFiles (axios).
 */
export function uploadFile(
  _file: File,
  onProgress: (progress: number) => void,
  signal?: AbortSignal
): Promise<UploadFileResult> {
  return new Promise((resolve) => {
    if (signal?.aborted) {
      resolve({ ok: false, error: 'Cancelled' })
      return
    }

    const start = Date.now()
    const interval = 50
    const tick = () => {
      if (signal?.aborted) {
        resolve({ ok: false, error: 'Cancelled' })
        return
      }
      const elapsed = Date.now() - start
      const progress = Math.min(100, (elapsed / UPLOAD_DURATION_MS) * 100)
      onProgress(progress)
      if (progress >= 100) {
        const fail = Math.random() < FAIL_PROBABILITY
        resolve(
          fail
            ? { ok: false, error: 'Upload failed (simulated)' }
            : { ok: true }
        )
        return
      }
      setTimeout(tick, interval)
    }
    onProgress(0)
    setTimeout(tick, interval)
  })
}
