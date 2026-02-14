import type { Metadata } from 'next'
import Link from 'next/link'
import { getMarques } from '@/lib/api/marques'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Marques automobiles',
  description: 'Recherchez des pièces par marque de voiture.',
}

export default async function MarquesPage() {
  let marques = null
  let erreur = null

  try {
    marques = await getMarques()
  } catch {
    erreur = 'Impossible de charger les marques.'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Marques</h1>

      {erreur && <p className="text-red-500">{erreur}</p>}

      {marques && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {marques.data.map((marque) => (
            <Link
              key={marque.id}
              href={`/marques/${marque.slug}`}
              className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all text-center"
            >
              <p className="font-semibold text-gray-800 text-sm">{marque.nom}</p>
              {marque.nombre_produits !== undefined && (
                <p className="text-xs text-gray-400 mt-1">{marque.nombre_produits}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
