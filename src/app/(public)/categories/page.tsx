import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategories } from '@/lib/api/categories'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catégories de pièces automobiles',
  description: 'Parcourez toutes les catégories de pièces automobiles.',
}

export default async function CategoriesPage() {
  let categories = null
  let erreur = null

  try {
    categories = await getCategories()
  } catch {
    erreur = 'Impossible de charger les catégories.'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Catégories</h1>

      {erreur && <p className="text-red-500">{erreur}</p>}

      {categories && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.data.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all text-center"
            >
              <p className="font-semibold text-gray-800">{cat.nom}</p>
              {cat.nombre_produits !== undefined && (
                <p className="text-xs text-gray-400 mt-1">{cat.nombre_produits} produit(s)</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
