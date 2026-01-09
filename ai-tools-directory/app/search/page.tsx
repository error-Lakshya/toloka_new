'use client'
import { useEffect, useState } from 'react'
import ToolCard from '../../components/ToolCard'

export default function SearchPage() {
  const [items, setItems] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState<any>({})

  async function fetchResults(f: any, p = page) {
    const params = new URLSearchParams()
    if (f.q) params.set('q', f.q)
    if (f.category) params.set('category', f.category)
    if (f.pricing) params.set('pricing', f.pricing)
    if (f.has_api) params.set('has_api', f.has_api)
    if (f.language) params.set('language', f.language)
    if (f.sort) params.set('sort', f.sort)
    params.set('page', String(p))
    params.set('pageSize', String(pageSize))
    const res = await fetch(`/api/tools?${params.toString()}`)
    const data = await res.json()
    setItems(data.items)
    setTotal(data.total)
    setPage(data.page)
  }

  useEffect(() => { fetchResults(filters, 1) }, [pageSize])

  return (
    <div className="space-y-4">
      <h1 className="section-title">Search Tools</h1>
      <div className="card space-y-3">
        <div>
          <label className="block mb-1">Search query</label>
          <input className="w-full border rounded p-2" onChange={(e)=>setFilters({...filters,q:e.target.value})} placeholder="Search by name or description" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block mb-1">Category (slug)</label>
            <input className="w-full border rounded p-2" onChange={(e)=>setFilters({...filters,category:e.target.value})} placeholder="e.g., text-writing" />
          </div>
          <div>
            <label className="block mb-1">Pricing</label>
            <select className="w-full border rounded p-2" onChange={(e)=>setFilters({...filters,pricing:e.target.value})}>
              <option value="">—</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
              <option value="freemium">Freemium</option>
              <option value="subscription">Subscription</option>
              <option value="one_time">One-time</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Has API</label>
            <select className="w-full border rounded p-2" onChange={(e)=>setFilters({...filters,has_api:e.target.value})}>
              <option value="">—</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Language</label>
            <input className="w-full border rounded p-2" onChange={(e)=>setFilters({...filters,language:e.target.value})} placeholder="e.g., ar" />
          </div>
          <div>
            <label className="block mb-1">Sort</label>
            <select className="w-full border rounded p-2" onChange={(e)=>setFilters({...filters,sort:e.target.value})}>
              <option value="">—</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="latest">Latest</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded" onClick={()=>fetchResults(filters,1)}>Search</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(t => <ToolCard key={t.slug} tool={t} />)}
      </div>
      <div className="flex items-center justify-between">
        <div>Total: {total}</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-200 rounded" disabled={page<=1} onClick={() => { const p = page-1; setPage(p); fetchResults(filters, p) }}>Prev</button>
          <span>Page {page}</span>
          <button className="px-3 py-1 bg-gray-200 rounded" disabled={(page*pageSize)>=total} onClick={() => { const p = page+1; setPage(p); fetchResults(filters, p) }}>Next</button>
        </div>
      </div>
    </div>
  )
}
