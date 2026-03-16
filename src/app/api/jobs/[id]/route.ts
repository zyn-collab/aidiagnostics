import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // TODO: Check real job status from queue/database
  // For now, always return complete for stub purposes
  return NextResponse.json({
    jobId: id,
    status: 'complete',
    estimatedTime: null,
  })
}
