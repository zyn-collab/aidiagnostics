import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { modelSlug } = body

  if (!modelSlug) {
    return NextResponse.json({ error: 'modelSlug is required' }, { status: 400 })
  }

  // TODO: Replace with real S3 presigned URL generation
  const jobId = `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

  return NextResponse.json({
    uploadUrl: `https://mock-s3-bucket.s3.amazonaws.com/${jobId}`,
    jobId,
  })
}
