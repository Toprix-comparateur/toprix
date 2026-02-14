import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategories } from '@/lib/api/categories'
import PageHero from '@/components/ui/PageHero'
import { ChevronRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catégories de produits high-tech',
  description: 'Comparez les prix par catégorie : smartphones, laptops, écrans, et plus.',
}

const ICONES: Record<string, string> = {
  smartphones: '📱', laptop: '💻', tablette: '🖥️', ecran: '🖥️',
  audio: '🎧', photo: '📷', gaming: '🎮', maison: '🏠',
}

export default async function CategoriesPage() {
  let categories = null
  let erreur = null

  try { categories = await getCategories() } catch { erreur = 'Impossible de charger les catégories.' }

  return (
    <div>
      <PageHero
        surtitre="Explorer"
        titre="Toutes les catégories"
        sousTitre="Comparez les meilleurs produits high-tech par catégorie."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {erreur && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm mb-6">{erreur}</div>
        )}

        {categories && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.data.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group flex items-center justify-between bg-white border border-[#E2E8F0] rounded-2xl px-5 py-4 hover:border-[#F97316]/50 hover:shadow-md hover:shadow-orange-100/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-xl group-hover:bg-[#F97316]/10 transition-colors">
                    {ICONES[cat.slug] ?? '⚡'}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-[#0F172A] text-sm">{cat.nom}</p>
                    {cat.nombre_produits !== undefined && (
                      <p className="text-xs text-[#64748B]">{cat.nombre_produits} produit(s)</p>
                    )}
                  </div>
                </div>
                <ChevronRight size={16} className="text-[#64748B] group-hover:text-[#F97316] transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
