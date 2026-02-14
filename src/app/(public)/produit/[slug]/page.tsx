import type { Metadata } from 'next'
import { getProduit } from '@/lib/api/produits'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const produit = await getProduit(slug)
    return {
      title: `${produit.nom} - ${produit.marque}`,
      description: produit.description,
    }
  } catch {
    return { title: 'Produit introuvable' }
  }
}

export default async function ProduitDetailPage({ params }: Props) {
  const { slug } = await params

  let produit = null
  try {
    produit = await getProduit(slug)
  } catch {
    notFound()
  }

  if (!produit) notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Fil d'ariane */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600">Accueil</Link>
        <span>›</span>
        <Link href="/categories" className="hover:text-blue-600">Catégories</Link>
        <span>›</span>
        <span className="text-gray-800">{produit.nom}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative h-64 md:h-80 bg-gray-100 rounded-xl overflow-hidden">
          {produit.image ? (
            <Image
              src={produit.image}
              alt={produit.nom}
              fill
              className="object-contain p-4"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-300 text-5xl">
              🔧
            </div>
          )}
        </div>

        {/* Infos */}
        <div>
          <p className="text-sm text-blue-600 font-medium mb-1">{produit.marque}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{produit.nom}</h1>

          {produit.prix_min && (
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500">Prix constaté</p>
              <p className="text-3xl font-bold text-blue-600">
                {produit.prix_min} DT
                {produit.prix_max && produit.prix_max !== produit.prix_min && (
                  <span className="text-lg text-gray-400 ml-2">— {produit.prix_max} DT</span>
                )}
              </p>
            </div>
          )}

          {produit.description && (
            <p className="text-gray-600 text-sm leading-relaxed">{produit.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
