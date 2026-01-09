import Link from 'next/link'

export default function ToolCard({ tool }: { tool: any }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{tool.name}</h3>
          <p className="text-sm text-gray-600">{tool.description}</p>
        </div>
        <Link className="text-primary" href={`/(tools)/${tool.slug}`}>تفاصيل</Link>
      </div>
      <div className="mt-2 flex gap-2 flex-wrap">
        {tool.categories?.map((c: string) => (
          <span key={c} className="px-2 py-1 bg-gray-100 rounded">{c}</span>
        ))}
      </div>
    </div>
  )
}
