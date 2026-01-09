import ToolCard from '../components/ToolCard'
import Link from 'next/link'

function JsonLd() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'AI Tools Directory',
    'url': 'https://example.com/',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://example.com/search?q={query}',
      'query-input': 'required name=query'
    }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

export default function Home() {
  const featured = [
    { name: 'ChatGPT', slug: 'chatgpt', description: 'An AI assistant for text and answers', categories: ['Text & Writing'] },
    { name: 'Midjourney', slug: 'midjourney', description: 'Creative image generation with AI', categories: ['Image & Design'] }
  ]
  return (
    <div className="space-y-6">
      <JsonLd />
      <section>
        <h1 className="section-title">Featured Tools</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map(t => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>
      <section className="card">
        <h2 className="section-title">Start browsing</h2>
        <p className="mb-4">Explore categories or search for a tool that fits your needs.</p>
        <div className="flex gap-3">
          <Link className="btn" href="/categories">Categories</Link>
          <Link className="btn" href="/search">Search</Link>
          <Link className="btn" href="/submit-tool">Submit Tool</Link>
        </div>
      </section>
    </div>
  )
}
