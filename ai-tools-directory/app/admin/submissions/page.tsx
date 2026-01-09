'use client'
import { useEffect, useState } from 'react'

export default function AdminSubmissions() {
  const [items, setItems] = useState<any[]>([])

  async function load() {
    const res = await fetch('/api/submissions')
    const data = await res.json()
    setItems(data.items)
  }

  useEffect(() => { load() }, [])

  async function act(id: string, action: 'approve'|'reject') {
    const res = await fetch(`/api/submissions/${id}?action=${action}`, { method: 'PATCH' })
    if (res.ok) load()
  }

  return (
    <div className="space-y-4">
      <h1 className="section-title">Manage Submissions</h1>
      <div className="grid grid-cols-1 gap-3">
        {items.map(it => (
          <div key={it.id} className="card">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{it.payload?.name} <span className="text-sm text-gray-500">({it.status})</span></div>
                <div className="text-sm text-gray-600">{it.payload?.official_url}</div>
                <div className="text-sm">Slug: {it.payload?.slug}</div>
              </div>
              <div className="flex gap-2">
                {it.status === 'pending' && (
                  <>
                    <button className="px-3 py-1 bg-secondary text-white rounded" onClick={() => act(it.id,'approve')}>Approve</button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => act(it.id,'reject')}>Reject</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
