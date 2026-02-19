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
  informatique:          '💻',
  telephonie:            '📱',
  electromenager:        '🏠',
  gaming:                '🎮',
  'tv-et-son':           '📺',
  'bureau-et-papeterie': '📋',
  'maison-et-mobilier':  '🛋️',
  'beaute-et-sante':     '💄',
  'sport-et-loisirs':    '⚽',
  surveillance:          '📷',
  energie:               '⚡',
  'bebe-et-jouets':      '🧸',
  'photo-et-video':      '📸',
  'autre-categorie':     '⚙️',
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
          <div className="flex flex-col gap-8">
            {categories.data.map((cat) => (
              <div key={cat.id}>
                {/* Catégorie parente */}
                <Link
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

                {/* Sous-catégories */}
                {cat.sous_categories && cat.sous_categories.length > 0 && (
                  <div className="mt-2 ml-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {cat.sous_categories.map((sous) => (
                      <Link
                        key={sous.id}
                        href={`/categories/${sous.slug}`}
                        className="group flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 hover:border-[#F97316]/40 hover:bg-orange-50/40 hover:shadow-sm transition-all"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-[#334155] group-hover:text-[#F97316] truncate transition-colors">
                            {sous.nom}
                          </p>
                          {sous.nombre_produits !== undefined && (
                            <p className="text-[10px] text-[#94A3B8]">{sous.nombre_produits}</p>
                          )}
                        </div>
                        <ChevronRight size={12} className="text-[#CBD5E1] group-hover:text-[#F97316] transition-colors shrink-0 ml-1" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
