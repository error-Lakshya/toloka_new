import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container py-3 flex items-center justify-between">
        <Link href="/" className="font-bold">AI Tools Directory</Link>
        <nav className="flex gap-4 items-center">
          <Link href="/categories">Categories</Link>
          <Link href="/search">Search</Link>
          <Link href="/submit-tool" className="text-primary">Submit Tool</Link>
        </nav>
      </div>
    </header>
  )
}
