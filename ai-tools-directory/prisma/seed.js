const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Categories
  const cats = [
    { slug: 'text-writing', name_ar: 'الكتابة والنصوص' },
    { slug: 'image-design', name_ar: 'الصور والتصميم' },
    { slug: 'video', name_ar: 'الفيديو' },
    { slug: 'audio-speech', name_ar: 'الصوت والكلام' },
  ]
  for (const c of cats) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c
    })
  }

  // Tools (sample)
  const tools = [
    {
      name: 'ChatGPT', slug: 'chatgpt', official_url: 'https://chat.openai.com/', pricing_model: 'freemium', has_api: true,
      tags: ['توليد المحتوى','مساعد نصي'], languages_supported: ['ar','en'],
      media: { images: [], videos: [] }, pros: ['سهل الاستخدام'], cons: ['يعتمد على الإنترنت'], popularity_score: 9.5, source_citation: [],
      categories: ['text-writing']
    },
    {
      name: 'Midjourney', slug: 'midjourney', official_url: 'https://www.midjourney.com/', pricing_model: 'subscription', has_api: false,
      tags: ['توليد صور'], languages_supported: ['en'],
      media: { images: [], videos: [] }, pros: ['جودة عالية'], cons: ['مدفوع'], popularity_score: 9.2, source_citation: [],
      categories: ['image-design']
    }
  ]

  for (const t of tools) {
    const tool = await prisma.tool.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        name: t.name,
        slug: t.slug,
        official_url: t.official_url,
        pricing_model: t.pricing_model,
        has_api: t.has_api,
        tags: t.tags,
        languages_supported: t.languages_supported,
        media: t.media,
        pros: t.pros,
        cons: t.cons,
        popularity_score: t.popularity_score,
        source_citation: t.source_citation
      }
    })
    for (const catSlug of t.categories) {
      const cat = await prisma.category.findUnique({ where: { slug: catSlug } })
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

main().catch(e => { console.error(e); process.exit(1) }).finally(async () => { await prisma.$disconnect() })
