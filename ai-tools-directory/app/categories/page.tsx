import Link from 'next/link'

const CATS = [
  { slug: 'text-writing', en: 'Text & Writing' },
  { slug: 'image-design', en: 'Image & Design' },
  { slug: 'video', en: 'Video' },
  { slug: 'audio-speech', en: 'Audio & Speech' },
  { slug: 'code', en: 'Code' },
  { slug: 'productivity-automation', en: 'Productivity & Automation' },
  { slug: 'marketing-sales', en: 'Marketing & Sales' },
  { slug: 'research-education', en: 'Research & Education' },
  { slug: 'security-analytics', en: 'Security & Analytics' }
]

export default function CategoriesPage() {
  return (
    <div>
      <h1 className="section-title">Categories</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATS.map(cat => (
          <li key={cat.slug} className="card">
            <div className="flex items-center justify-between">
              <span>{cat.en}</span>
              <Link className="text-primary" href={`/search?category=${cat.slug}`}>Browse</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
