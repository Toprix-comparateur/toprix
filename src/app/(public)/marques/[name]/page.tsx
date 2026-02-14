import type { Metadata } from 'next'
import { getMarque } from '@/lib/api/marques'
import { getProduits } from '@/lib/api/produits'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ name: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params
  try {
    const marque = await getMarque(name)
    return { title: `${marque.nom} - Pièces automobiles` }
  } catch {
    return { title: 'Marque introuvable' }
  }
}

export default async function MarqueDetailPage({ params, searchParams }: Props) {
  const { name } = await params
  const { page = '1' } = await searchParams

  let marque = null
  let produits = null

  try {
    marque = await getMarque(name)
  } catch {
    notFound()
  }

  try {
    produits = await getProduits({ marque: name, page: Number(page) })
  } catch {
    // Erreur silencieuse
  }

  if (!marque) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{marque.nom}</h1>

      {produits && produits.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produits.data.map((p) => (
            <Link
              key={p.id}
              href={`/produit/${p.slug}`}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <p className="font-semibold text-gray-900">{p.nom}</p>
              <p className="text-sm text-gray-500">{p.categorie}</p>
              {p.prix_min && (
                <p className="text-blue-600 font-bold mt-2">
                  À partir de {p.prix_min} DT
                </p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-10">
          Aucun produit pour cette marque pour le moment.
        </p>
      )}
    </div>
  )
}
