import type { Metadata } from 'next'
import type React from 'react'
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Tag } from 'lucide-react'
import { getProduits } from '@/lib/api/produits'
import CarteProduit from '@/components/product/CarteProduit'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Rechercher',
  description: 'Recherchez et comparez les prix des produits high-tech en Tunisie.',
}

interface Props {
  searchParams: Promise<{
    q?: string
    page?: string
    categorie?: string
    marque?: string
    prix_min?: string
    prix_max?: string
    en_promo?: string
  }>
}

export default async function RechercherPage({ searchParams }: Props) {
  const params = await searchParams
  const {
    q = '',
    page = '1',
    categorie = '',
    marque = '',
    prix_min = '',
    prix_max = '',
    en_promo = '',
  } = params

  let produits = null
  let erreur = null

  if (q || categorie || marque || prix_min || prix_max || en_promo === '1') {
    try {
      produits = await getProduits({
        q,
        page: Number(page),
        categorie,
        marque,
        prix_min: prix_min ? Number(prix_min) : undefined,
        prix_max: prix_max ? Number(prix_max) : undefined,
        en_promo: en_promo === '1',
      })
    } catch {
      erreur = 'Impossible de charger les résultats.'
    }
  }

  const nbResultats = produits?.meta?.total_items ?? produits?.data.length ?? 0
  const hasFilters = !!(categorie || marque || prix_min || prix_max || en_promo === '1')
  const nbFiltresActifs = [
    categorie,
    marque,
    (prix_min || prix_max) ? '1' : '',
    en_promo === '1' ? '1' : '',
  ].filter(Boolean).length

  // Helper : URL en enlevant certains filtres
  const buildFilterUrl = (exclude: string[] = []) => {
    const sp = new URLSearchParams()
    if (q) sp.set('q', q)
    if (categorie && !exclude.includes('categorie')) sp.set('categorie', categorie)
    if (marque && !exclude.includes('marque')) sp.set('marque', marque)
    if (prix_min && !exclude.includes('prix_min')) sp.set('prix_min', prix_min)
    if (prix_max && !exclude.includes('prix_max')) sp.set('prix_max', prix_max)
    if (en_promo === '1' && !exclude.includes('en_promo')) sp.set('en_promo', '1')
    return `?${sp.toString()}`
  }

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
                placeholder="Ex : PC portable, iPhone, casque..."
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

        {!q && !hasFilters && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] mb-4">
              <Search size={28} className="text-slate-300" />
            </div>
            <p className="font-heading text-[#0F172A] text-xl font-semibold mb-2">Que recherchez-vous ?</p>
            <p className="text-[#64748B] text-sm">Entrez le nom d'un produit pour comparer les prix.</p>
          </div>
        )}

        {erreur && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm">{erreur}</div>
        )}

        {(q || hasFilters) && (
          <div>
            {/* En-tête résultats */}
            {produits && (
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="font-heading text-[#0F172A] text-xl font-bold">
                    {nbResultats > 0
                      ? `${nbResultats} résultat${nbResultats > 1 ? 's' : ''}${q ? ` pour "${q}"` : ''}`
                      : `Aucun résultat${q ? ` pour "${q}"` : ''}`}
                  </h1>
                  {nbResultats > 0 && (
                    <p className="text-[#64748B] text-sm mt-0.5">Comparez les prix parmi toutes les boutiques</p>
                  )}
                </div>
              </div>
            )}

            {/* Panneau filtre (details/summary = toggle CSS pur, SSR-compatible) */}
            <details className="mb-6" {...(hasFilters ? { open: true } : {})}>
              <summary className="list-none cursor-pointer inline-flex items-center gap-2 border border-[#E2E8F0] text-[#64748B] text-sm px-4 py-2 rounded-lg hover:border-[#F97316]/40 hover:text-[#1E293B] transition-colors select-none">
                <SlidersHorizontal size={14} />
                Filtrer
                {hasFilters && (
                  <span className="ml-0.5 bg-[#F97316] text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {nbFiltresActifs}
                  </span>
                )}
              </summary>

              {/* Formulaire GET — soumet les filtres comme params URL */}
              <form
                method="get"
                className="mt-3 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex flex-wrap items-end gap-4"
              >
                {/* Préserve la recherche */}
                <input type="hidden" name="q" value={q} />

                {/* Catégorie */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="filter-cat" className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
                    Catégorie
                  </label>
                  <input
                    id="filter-cat"
                    type="text"
                    name="categorie"
                    defaultValue={categorie}
                    placeholder="Ex : smartphones, laptops…"
                    className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#F97316] bg-white transition-colors min-w-[180px]"
                  />
                </div>

                {/* Marque */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="filter-marque" className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
                    Marque
                  </label>
                  <input
                    id="filter-marque"
                    type="text"
                    name="marque"
                    defaultValue={marque}
                    placeholder="Ex : Samsung, HP, Sony…"
                    className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#F97316] bg-white transition-colors min-w-[180px]"
                  />
                </div>

                {/* Prix */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
                    Prix (TND)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      name="prix_min"
                      defaultValue={prix_min}
                      placeholder="Min"
                      min="0"
                      className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#F97316] bg-white transition-colors w-24"
                    />
                    <span className="text-slate-400 text-sm">—</span>
                    <input
                      type="number"
                      name="prix_max"
                      defaultValue={prix_max}
                      placeholder="Max"
                      min="0"
                      className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#F97316] bg-white transition-colors w-24"
                    />
                  </div>
                </div>

                {/* En promotion */}
                <div className="flex flex-col gap-1 justify-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="en_promo"
                      value="1"
                      defaultChecked={en_promo === '1'}
                      className="w-4 h-4 rounded accent-[#F97316] cursor-pointer"
                    />
                    <span className="text-sm text-[#1E293B] font-medium flex items-center gap-1.5">
                      <Tag size={13} className="text-[#F97316]" />
                      En promotion
                    </span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pb-0.5 ml-auto">
                  <button
                    type="submit"
                    className="bg-[#F97316] hover:bg-[#EA6C0A] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Appliquer
                  </button>
                  {hasFilters && (
                    <a
                      href={q ? `?q=${encodeURIComponent(q)}` : '?'}
                      className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#1E293B] px-3 py-2 rounded-lg border border-[#E2E8F0] hover:border-slate-300 transition-colors bg-white"
                    >
                      <X size={13} />
                      Effacer
                    </a>
                  )}
                </div>
              </form>

              {/* Badges filtres actifs */}
              {hasFilters && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {categorie && (
                    <span className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-2.5 py-1 rounded-full">
                      Catégorie : {categorie}
                      <a
                        href={buildFilterUrl(['categorie'])}
                        className="hover:opacity-70 transition-opacity"
                        aria-label="Supprimer filtre catégorie"
                      >
                        <X size={10} />
                      </a>
                    </span>
                  )}
                  {marque && (
                    <span className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-2.5 py-1 rounded-full">
                      Marque : {marque}
                      <a
                        href={buildFilterUrl(['marque'])}
                        className="hover:opacity-70 transition-opacity"
                        aria-label="Supprimer filtre marque"
                      >
                        <X size={10} />
                      </a>
                    </span>
                  )}
                  {(prix_min || prix_max) && (
                    <span className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-2.5 py-1 rounded-full">
                      Prix :{' '}
                      {prix_min && prix_max
                        ? `${prix_min} — ${prix_max} TND`
                        : prix_min
                          ? `≥ ${prix_min} TND`
                          : `≤ ${prix_max} TND`}
                      <a
                        href={buildFilterUrl(['prix_min', 'prix_max'])}
                        className="hover:opacity-70 transition-opacity"
                        aria-label="Supprimer filtre prix"
                      >
                        <X size={10} />
                      </a>
                    </span>
                  )}
                  {en_promo === '1' && (
                    <span className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-2.5 py-1 rounded-full">
                      <Tag size={10} />
                      En promotion
                      <a
                        href={buildFilterUrl(['en_promo'])}
                        className="hover:opacity-70 transition-opacity"
                        aria-label="Supprimer filtre promotion"
                      >
                        <X size={10} />
                      </a>
                    </span>
                  )}
                </div>
              )}
            </details>

            {produits && (
              <>
                {produits.data.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                      {produits.data.map((p) => (
                        <CarteProduit key={p.id} produit={p} />
                      ))}
                    </div>

                    {/* Pagination */}
                    {produits.meta && produits.meta.total_pages > 1 && (() => {
                      const currentPage = produits.meta!.page
                      const totalPages = produits.meta!.total_pages
                      const buildUrl = (p: number) => {
                        const sp = new URLSearchParams()
                        if (q) sp.set('q', q)
                        if (p > 1) sp.set('page', String(p))
                        if (categorie) sp.set('categorie', categorie)
                        if (marque) sp.set('marque', marque)
                        if (prix_min) sp.set('prix_min', prix_min)
                        if (prix_max) sp.set('prix_max', prix_max)
                        if (en_promo === '1') sp.set('en_promo', '1')
                        return `?${sp.toString()}`
                      }
                      const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                      return (
                        <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Pagination">
                          {currentPage > 1 ? (
                            <a
                              href={buildUrl(currentPage - 1)}
                              className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg text-[#64748B] hover:border-[#F97316]/40 hover:text-[#F97316] transition-colors"
                            >
                              <ChevronLeft size={14} /> Préc.
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg text-slate-300 cursor-not-allowed">
                              <ChevronLeft size={14} /> Préc.
                            </span>
                          )}

                          {pages.reduce<React.ReactNode[]>((acc, p, i, arr) => {
                            if (i > 0 && p - arr[i - 1] > 1) {
                              acc.push(<span key={`ellipsis-${p}`} className="px-2 text-slate-400 text-sm">…</span>)
                            }
                            acc.push(
                              p === currentPage ? (
                                <span key={p} className="inline-flex items-center justify-center w-9 h-9 text-sm font-semibold bg-[#F97316] text-white rounded-lg">
                                  {p}
                                </span>
                              ) : (
                                <a key={p} href={buildUrl(p)} className="inline-flex items-center justify-center w-9 h-9 text-sm border border-[#E2E8F0] rounded-lg text-[#64748B] hover:border-[#F97316]/40 hover:text-[#F97316] transition-colors">
                                  {p}
                                </a>
                              )
                            )
                            return acc
                          }, [])}

                          {currentPage < totalPages ? (
                            <a
                              href={buildUrl(currentPage + 1)}
                              className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg text-[#64748B] hover:border-[#F97316]/40 hover:text-[#F97316] transition-colors"
                            >
                              Suiv. <ChevronRight size={14} />
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg text-slate-300 cursor-not-allowed">
                              Suiv. <ChevronRight size={14} />
                            </span>
                          )}
                        </nav>
                      )
                    })()}
                  </>
                ) : (
                  <div className="text-center py-16 border border-dashed border-[#E2E8F0] rounded-2xl">
                    <p className="text-[#64748B] text-sm">Essayez avec un autre terme ou modifiez les filtres.</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
