import type { Metadata } from 'next'
import { getCategorie } from '@/lib/api/categories'
import { getProduits } from '@/lib/api/produits'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const categorie = await getCategorie(slug)
    return { title: `${categorie.nom} - Pièces automobiles` }
  } catch {
    return { title: 'Catégorie introuvable' }
  }
}

export default async function CategorieDetailPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { page = '1' } = await searchParams

  let categorie = null
  let produits = null

  try {
    categorie = await getCategorie(slug)
  } catch {
    notFound()
  }

  try {
    produits = await getProduits({ categorie: slug, page: Number(page) })
  } catch {
    // Erreur silencieuse — afficher catégorie sans produits
  }

  if (!categorie) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{categorie.nom}</h1>
      <p className="text-gray-500 mb-8">
        {categorie.nombre_produits ?? 0} produit(s)
      </p>

      {produits && produits.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produits.data.map((p) => (
            <Link
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
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-10">
          Aucun produit dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  )
}
