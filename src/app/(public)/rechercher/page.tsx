import type { Metadata } from 'next'
import { getProduits } from '@/lib/api/produits'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Rechercher une pièce automobile',
  description: 'Recherchez et comparez les prix des pièces automobiles.',
}

interface Props {
  searchParams: Promise<{ q?: string; page?: string; categorie?: string }>
}

export default async function RechercherPage({ searchParams }: Props) {
  const params = await searchParams
  const { q = '', page = '1', categorie } = params

  let produits = null
  let erreur = null

  if (q) {
    try {
      produits = await getProduits({ q, page: Number(page), categorie })
    } catch (e) {
      erreur = 'Impossible de charger les résultats.'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Rechercher une pièce</h1>

      {/* Barre de recherche */}
      <form method="get" className="flex gap-3 mb-10">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Ex: filtre à huile, plaquettes de frein..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Rechercher
        </button>
      </form>

      {/* Résultats */}
      {erreur && <p className="text-red-500">{erreur}</p>}

      {produits && produits.data.length === 0 && (
        <p className="text-gray-500 text-center py-10">
          Aucun résultat pour &quot;{q}&quot;
        </p>
      )}

      {produits && produits.data.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            {produits.meta?.total_items ?? produits.data.length} résultat(s) pour &quot;{q}&quot;
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produits.data.map((p) => (
              <a
                key={p.id}
                href={`/produit/${p.slug}`}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <p className="font-semibold text-gray-900">{p.nom}</p>
                <p className="text-sm text-gray-500">{p.marque}</p>
                {p.prix_min && (
                  <p className="text-blue-600 font-bold mt-2">
                    À partir de {p.prix_min} DT
                  </p>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

      {!q && (
        <p className="text-gray-400 text-center py-10">
          Entrez un terme de recherche pour commencer
        </p>
      )}
    </div>
  )
}
