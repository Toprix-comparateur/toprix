import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <p className="text-white text-lg font-bold mb-2">Toprix</p>
            <p className="text-sm">Comparateur de pièces automobiles en Tunisie.</p>
          </div>

          <div>
            <p className="text-white font-semibold mb-3">Navigation</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categories" className="hover:text-white transition-colors">Catégories</Link></li>
              <li><Link href="/marques" className="hover:text-white transition-colors">Marques</Link></li>
              <li><Link href="/boutiques" className="hover:text-white transition-colors">Boutiques</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-3">Informations</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/a-propos" className="hover:text-white transition-colors">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-3">Ajouter</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ajouter" className="hover:text-white transition-colors">Proposer une boutique</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} Toprix. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
