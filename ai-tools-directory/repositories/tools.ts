import { prisma } from '../lib/db'

export interface SearchParams {
  q?: string
  category?: string // category slug
  pricing?: 'free' | 'paid' | 'freemium' | 'subscription' | 'one_time'
  has_api?: 'true' | 'false'
  language?: string // e.g., 'ar'
  sort?: 'alphabetical' | 'latest' | 'popularity'
  page?: number
  pageSize?: number
}

export async function getToolBySlug(slug: string) {
  return prisma.tool.findUnique({ where: { slug }, include: { categories: { include: { category: true } } } })
}

export async function searchTools(params: SearchParams) {
  const page = Math.max(1, Number(params.page ?? 1))
  const pageSize = Math.min(50, Math.max(1, Number(params.pageSize ?? 20)))
  const skip = (page - 1) * pageSize

  // Base filter (excluding q and category which may need special handling)
  const where: any = {}
  if (params.pricing) where.pricing_model = params.pricing
  if (params.has_api) where.has_api = params.has_api === 'true'
  if (params.language) where.languages_supported = { has: params.language }

  // Sorting
  let orderBy: any = undefined
  switch (params.sort) {
    case 'alphabetical':
      orderBy = { name: 'asc' }
      break
    case 'latest':
      orderBy = { updated_at: 'desc' }
      break
    case 'popularity':
      orderBy = { popularity_score: 'desc' }
      break
    default:
      orderBy = undefined
  }

  // If q provided, use full-text search via tool_search table
  if (params.q && params.q.trim().length > 0) {
    const q = params.q.trim()
    // Use plainto_tsquery on 'simple' configuration
    const ids = await prisma.$queryRaw<Array<{ tool_id: string }>>`
      SELECT tool_id FROM tool_search
      WHERE tsv @@ plainto_tsquery('simple', ${q})
      LIMIT ${pageSize} OFFSET ${skip}
    `
    const idList = ids.map((r: { tool_id: string }) => r.tool_id)
    let tools = await prisma.tool.findMany({
      where: { ...where, id: { in: idList } },
      include: { categories: { include: { category: true } } },
      orderBy: orderBy ? [orderBy] : undefined
    })
    if (params.category) {
      tools = tools.filter((t: any) => t.categories.some((tc: any) => tc.category.slug === params.category))
    }
    // Count total (approx via count on ids in match)
    const totalMatch = await prisma.$queryRaw<Array<{ count: number }>>`
      SELECT COUNT(*)::int AS count FROM tool_search WHERE tsv @@ plainto_tsquery('simple', ${q})
    `
    const total = totalMatch?.[0]?.count ?? tools.length
    return { items: tools, page, pageSize, total }
  }

  // No q: use Prisma filters with optional category
  const tools = await prisma.tool.findMany({
    where,
    skip,
    take: pageSize,
    include: { categories: { include: { category: true } } },
    orderBy: orderBy ? [orderBy] : undefined
  })
  let filtered = tools
  if (params.category) {
    filtered = tools.filter((t: any) => t.categories.some((tc: any) => tc.category.slug === params.category))
  }
  const total = await prisma.tool.count({ where })
  return { items: filtered, page, pageSize, total }
}
