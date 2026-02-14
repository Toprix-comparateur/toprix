import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Toprix - Comparateur de pièces automobiles',
  description: 'Trouvez et comparez les meilleurs prix pour vos pièces automobiles en Tunisie.',
}

export default function AccueilPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Comparez les prix des pièces automobiles
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Trouvez les meilleures offres parmi toutes les boutiques en Tunisie
          </p>
          <Link
            href="/rechercher"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
          >
            Rechercher une pièce
          </Link>
        </div>
      </section>

      {/* Liens rapides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Explorer par catégorie</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: '/categories', label: 'Toutes les catégories', icon: '🔧' },
            { href: '/marques', label: 'Par marque', icon: '🏷️' },
            { href: '/boutiques', label: 'Boutiques', icon: '🏪' },
            { href: '/blog', label: 'Blog & guides', icon: '📖' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
            >
              <span className="text-3xl mb-2">{item.icon}</span>
              <span className="font-medium text-gray-800 text-center text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
