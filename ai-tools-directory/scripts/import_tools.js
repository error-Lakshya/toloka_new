const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function importFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const items = JSON.parse(raw)
  for (const p of items) {
    const existing = await prisma.tool.findUnique({ where: { slug: p.slug } })
    if (existing) continue
    const tool = await prisma.tool.create({ data: {
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
    } })
    // Category linking by slug
    if (Array.isArray(p.categories)) {
      for (const slug of p.categories) {
        const cat = await prisma.category.findUnique({ where: { slug } })
        if (cat) {
          await prisma.toolCategory.upsert({
            where: { tool_id_category_id: { tool_id: tool.id, category_id: cat.id } },
            update: {},
            create: { tool_id: tool.id, category_id: cat.id }
          })
        }
      }
    }
  }
}

async function main() {
  const filename = process.argv[2]
  if (!filename) { console.error('Usage: node scripts/import_tools.js <file.json>'); process.exit(1) }
  const filePath = path.resolve(filename)
  await importFile(filePath)
}

main().catch(e => { console.error(e); process.exit(1) }).finally(async () => { await prisma.$disconnect() })
