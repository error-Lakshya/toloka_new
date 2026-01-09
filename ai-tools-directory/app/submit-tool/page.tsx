'use client'
import { useState } from 'react'

export default function SubmitToolPage() {
  const [status, setStatus] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      slug: (form.elements.namedItem('slug') as HTMLInputElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
      official_url: (form.elements.namedItem('official_url') as HTMLInputElement).value,
      pricing_model: (form.elements.namedItem('pricing_model') as HTMLSelectElement).value,
      has_api: (form.elements.namedItem('has_api') as HTMLSelectElement).value === 'true',
      categories: (form.elements.namedItem('categories') as HTMLInputElement).value.split(',').map(s => s.trim()).filter(Boolean),
      languages_supported: (form.elements.namedItem('languages_supported') as HTMLInputElement).value.split(',').map(s => s.trim()).filter(Boolean)
    }
    const res = await fetch('/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) setStatus('Submission sent for review')
    else setStatus('Submission failed — check fields')
  }

  return (
    <div className="space-y-4">
      <h1 className="section-title">Add a New Tool</h1>
      <form className="card space-y-3" onSubmit={onSubmit}>
        <div>
          <label className="block mb-1">Tool name</label>
          <input className="w-full border rounded p-2" name="name" required />
        </div>
        <div>
          <label className="block mb-1">Slug (lowercase, no spaces)</label>
          <input className="w-full border rounded p-2" name="slug" pattern="^[a-z0-9-]+$" required />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea className="w-full border rounded p-2" name="description" minLength={20} required></textarea>
        </div>
        <div>
          <label className="block mb-1">Official URL</label>
          <input className="w-full border rounded p-2" name="official_url" type="url" required />
        </div>
        <div>
          <label className="block mb-1">Pricing</label>
          <select className="w-full border rounded p-2" name="pricing_model" required>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            <option value="freemium">Freemium</option>
            <option value="subscription">Subscription</option>
            <option value="one_time">One-time</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Has API</label>
          <select className="w-full border rounded p-2" name="has_api" required>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Categories (comma-separated slugs)</label>
          <input className="w-full border rounded p-2" name="categories" required />
        </div>
        <div>
          <label className="block mb-1">Supported languages (comma-separated ISO codes)</label>
          <input className="w-full border rounded p-2" name="languages_supported" required />
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded" type="submit">Submit</button>
      </form>
      {status && <div className="card text-secondary">{status}</div>}
    </div>
  )
}
