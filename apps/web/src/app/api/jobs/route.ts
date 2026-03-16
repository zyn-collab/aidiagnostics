import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { jobId, modelSlug, email, encryptedKey, iv } = body

  if (!jobId || !modelSlug || !email || !encryptedKey || !iv) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // TODO: Write job to queue (SQS/DynamoDB) and dispatch to inference worker
  console.log(`[Job submitted] ${jobId} — model: ${modelSlug}`)

  return NextResponse.json({ status: 'processing' })
}
