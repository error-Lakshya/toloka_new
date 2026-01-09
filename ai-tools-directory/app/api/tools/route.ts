import { NextResponse } from 'next/server'
import { searchTools } from '../../../repositories/tools'

export const revalidate = 30

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? undefined
  const category = searchParams.get('category') ?? undefined
  const pricing = searchParams.get('pricing') ?? undefined as any
  const has_api_param = searchParams.get('has_api')
  const has_api = (has_api_param === 'true' || has_api_param === 'false') ? has_api_param : undefined
  const language = searchParams.get('language') ?? undefined
  const sort = (searchParams.get('sort') ?? undefined) as any
  const page = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '20')

  const data = await searchTools({ q, category, pricing, has_api, language, sort, page, pageSize })
  const res = NextResponse.json(data)
  res.headers.set('Cache-Control', 'public, max-age=30, s-maxage=60')
  return res
}
