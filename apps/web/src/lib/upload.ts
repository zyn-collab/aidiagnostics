import { MOCK_MODE } from './config'

interface PresignedUrlResponse {
  uploadUrl: string
  jobId: string
}

interface JobSubmission {
  jobId: string
  modelSlug: string
  email: string
  encryptedKey: string
  iv: string
}

export async function getPresignedUrl(modelSlug: string): Promise<PresignedUrlResponse> {
  if (MOCK_MODE) {
    await delay(500)
    return {
      uploadUrl: 'https://mock-s3.example.com/upload',
      jobId: `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    }
  }

  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ modelSlug }),
  })
  if (!res.ok) throw new Error('Failed to get upload URL')
  return res.json()
}

export async function uploadEncryptedFile(
  url: string,
  blob: Blob,
  onProgress?: (percent: number) => void
): Promise<void> {
  if (MOCK_MODE) {
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await delay(150)
      onProgress?.(i)
    }
    return
  }

  // For real S3 presigned URL upload, use XMLHttpRequest for progress
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', url)
    xhr.setRequestHeader('Content-Type', 'application/octet-stream')

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress?.(Math.round((e.loaded / e.total) * 100))
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve()
      else reject(new Error(`Upload failed: ${xhr.status}`))
    }

    xhr.onerror = () => reject(new Error('Upload failed'))
    xhr.send(blob)
  })
}

export async function submitJob(submission: JobSubmission): Promise<{ status: string }> {
  if (MOCK_MODE) {
    await delay(300)
    return { status: 'processing' }
  }

  const res = await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  })
  if (!res.ok) throw new Error('Failed to submit job')
  return res.json()
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
