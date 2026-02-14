import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Toprix
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/categories" className="hover:text-blue-600 transition-colors">
              Catégories
            </Link>
            <Link href="/marques" className="hover:text-blue-600 transition-colors">
              Marques
            </Link>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link href="/boutiques" className="hover:text-blue-600 transition-colors">
              Boutiques
            </Link>
          </nav>

          <Link
            href="/rechercher"
            className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Rechercher...
          </Link>
        </div>
      </div>
    </header>
  )
}
