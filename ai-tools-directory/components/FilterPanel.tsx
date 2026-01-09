'use client'
import { useState } from 'react'

export interface Filters {
  q?: string
  category?: string
  pricing?: 'free'|'paid'|'freemium'|'subscription'|'one_time'|''
  has_api?: 'true'|'false'|''
  language?: string
  sort?: 'alphabetical'|'latest'|'popularity'|''
}

export default function FilterPanel({ onChange }: { onChange: (f: Filters) => void }) {
  const [filters, setFilters] = useState<Filters>({ q: '', category: '', pricing: '', has_api: '', language: '', sort: '' })

  function update(partial: Partial<Filters>) {
    const next = { ...filters, ...partial }
    setFilters(next)
    onChange(next)
  }

  return (
    <div className="card space-y-3">
      <div>
        <label className="block mb-1">كلمة البحث</label>
        <input className="w-full border rounded p-2" value={filters.q} onChange={(e) => update({ q: e.target.value })} placeholder="ابحث باسم الأداة أو الوصف" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block mb-1">الفئة (slug)</label>
          <input className="w-full border rounded p-2" value={filters.category} onChange={(e) => update({ category: e.target.value })} placeholder="مثال: text-writing" />
        </div>
        <div>
          <label className="block mb-1">التسعير</label>
          <select className="w-full border rounded p-2" value={filters.pricing} onChange={(e) => update({ pricing: e.target.value as any })}>
            <option value="">—</option>
            <option value="free">مجاني</option>
            <option value="paid">مدفوع</option>
            <option value="freemium">Freemium</option>
            <option value="subscription">اشتراك</option>
            <option value="one_time">مرة واحدة</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">وجود API</label>
          <select className="w-full border rounded p-2" value={filters.has_api} onChange={(e) => update({ has_api: e.target.value as any })}>
            <option value="">—</option>
            <option value="true">نعم</option>
            <option value="false">لا</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">اللغة</label>
          <input className="w-full border rounded p-2" value={filters.language} onChange={(e) => update({ language: e.target.value })} placeholder="مثال: ar" />
        </div>
        <div>
          <label className="block mb-1">الترتيب</label>
          <select className="w-full border rounded p-2" value={filters.sort} onChange={(e) => update({ sort: e.target.value as any })}>
            <option value="">—</option>
            <option value="alphabetical">أبجدي</option>
            <option value="latest">الأحدث</option>
            <option value="popularity">الشعبية</option>
          </select>
        </div>
      </div>
    </div>
  )
}
