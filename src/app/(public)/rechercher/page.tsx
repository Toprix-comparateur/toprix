import type { Metadata } from 'next'
import { Search, SlidersHorizontal } from 'lucide-react'
import { getProduits } from '@/lib/api/produits'
import CarteProduit from '@/components/product/CarteProduit'

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
    } catch {
      erreur = 'Impossible de charger les résultats.'
    }
  }

  const nbResultats = produits?.meta?.total_items ?? produits?.data.length ?? 0

  return (
    <div>
      {/* Hero recherche */}
      <section className="bg-[#0F172A] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-3">Comparateur</p>
          <form method="get" className="flex items-center bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/40">
            <div className="flex items-center gap-3 flex-1 px-5">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Ex : filtre à huile, disque de frein..."
                autoFocus
                className="w-full py-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold text-sm px-6 py-4 transition-colors"
            >
              Comparer
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {!q && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] mb-4">
              <Search size={28} className="text-slate-300" />
            </div>
            <p className="font-heading text-[#0F172A] text-xl font-semibold mb-2">Que recherchez-vous ?</p>
            <p className="text-[#64748B] text-sm">Entrez le nom d'une pièce pour comparer les prix.</p>
          </div>
        )}

        {erreur && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm">{erreur}</div>
        )}

        {produits && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-heading text-[#0F172A] text-xl font-bold">
                  {nbResultats > 0 ? `${nbResultats} résultat${nbResultats > 1 ? 's' : ''} pour "${q}"` : `Aucun résultat pour "${q}"`}
                </h1>
                {nbResultats > 0 && (
                  <p className="text-[#64748B] text-sm mt-0.5">Comparez les prix parmi toutes les boutiques</p>
                )}
              </div>
              <button className="hidden sm:flex items-center gap-2 border border-[#E2E8F0] text-[#64748B] text-sm px-4 py-2 rounded-lg hover:border-slate-300 transition-colors">
                <SlidersHorizontal size={14} />
                Filtrer
              </button>
            </div>

            {produits.data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {produits.data.map((p) => (
                  <CarteProduit key={p.id} produit={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-[#E2E8F0] rounded-2xl">
                <p className="text-[#64748B] text-sm">Essayez avec un autre terme de recherche.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
