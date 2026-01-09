import './styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'AI Tools Directory',
  description: 'A directory of AI tools with search and filters',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'AI Tools Directory',
    description: 'Discover the best AI tools',
    url: 'https://example.com/',
    siteName: 'AI Tools Directory',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Directory',
    description: 'Discover the best AI tools'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <Header />
        <main className="container py-6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
