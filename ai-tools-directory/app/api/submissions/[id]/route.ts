import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')
  const id = params.id
  const sub = await prisma.submission.findUnique({ where: { id } })
  if (!sub) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (action === 'approve') {
    const p: any = sub.payload
    // Create tool
    const tool = await prisma.tool.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        official_url: p.official_url,
        pricing_model: p.pricing_model,
        has_api: p.has_api,
        tags: p.tags ?? [],
        languages_supported: p.languages_supported ?? [],
        media: p.media ?? { images: [], videos: [] },
        pros: p.pros ?? [],
        cons: p.cons ?? [],
        popularity_score: p.popularity_score ?? null,
        source_citation: p.source_citation ?? []
      }
    })
    // Link categories by slug (assumes categories array of slugs)
    if (Array.isArray(p.categories)) {
      for (const slug of p.categories) {
        const cat = await prisma.category.findUnique({ where: { slug } })
        if (cat) {
          await prisma.toolCategory.create({ data: { tool_id: tool.id, category_id: cat.id } })
        }
      }
    }
    await prisma.submission.update({ where: { id }, data: { status: 'approved', reviewed_at: new Date() } })
    return NextResponse.json({ status: 'approved', tool_id: tool.id })
  }

  if (action === 'reject') {
    await prisma.submission.update({ where: { id }, data: { status: 'rejected', reviewed_at: new Date() } })
    return NextResponse.json({ status: 'rejected' })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
