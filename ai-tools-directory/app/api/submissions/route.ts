import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'
import { validateToolPayload } from '../../../lib/validator'

export const revalidate = 0

export async function GET() {
  const list = await prisma.submission.findMany({ orderBy: { created_at: 'desc' } })
  const res = NextResponse.json({ items: list })
  res.headers.set('Cache-Control', 'no-store')
  return res
}

export async function POST(req: Request) {
  const payload = await req.json()
  const { ok, errors } = validateToolPayload(payload)
  if (!ok) {
    return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 })
  }
  const created = await prisma.submission.create({ data: { payload, status: 'pending' } })
  return NextResponse.json({ id: created.id, status: created.status })
}
