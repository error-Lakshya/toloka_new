interface Props { params: { slug: string } }

function JsonLd({ tool }: any) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': tool.name,
    'applicationCategory': 'AIApplication',
    'url': `https://example.com/(tools)/${tool.slug}`,
    'offers': {
      '@type': 'Offer',
      'price': tool.pricing_model === 'free' ? 0 : undefined,
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock'
    }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

export default function ToolDetail({ params }: Props) {
  const tool = {
    name: params.slug,
    slug: params.slug,
    description: 'Tool description will appear here. Will be connected to DB later.',
    categories: ['Text & Writing'],
    pricing_model: 'freemium'
  }
  return (
    <div className="space-y-4">
      <JsonLd tool={tool} />
      <h1 className="section-title">{tool.name}</h1>
      <p className="card">{tool.description}</p>
      <div className="card">
        <h2 className="font-semibold mb-2">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {tool.categories.map((c: string) => (
            <span key={c} className="px-2 py-1 bg-gray-100 rounded">{c}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
