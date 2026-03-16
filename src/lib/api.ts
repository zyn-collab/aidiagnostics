import { MOCK_MODE } from './config'

interface JobStatus {
  status: 'queued' | 'processing' | 'complete' | 'error'
  estimatedTime?: string
  error?: string
}

export async function getJobStatus(jobId: string): Promise<JobStatus> {
  if (MOCK_MODE) {
    // Simulate: first call returns processing, subsequent calls return complete
    const key = `mock_job_${jobId}`
    const callCount = parseInt(sessionStorage.getItem(key) || '0') + 1
    sessionStorage.setItem(key, String(callCount))

    await delay(500)

    if (callCount < 3) {
      return { status: 'processing', estimatedTime: '30 seconds' }
    }
    return { status: 'complete' }
  }

  const res = await fetch(`/api/jobs/${jobId}`)
  if (!res.ok) throw new Error('Failed to get job status')
  return res.json()
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
