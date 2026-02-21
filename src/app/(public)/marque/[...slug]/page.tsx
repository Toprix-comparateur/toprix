import type { Metadata } from 'next'
import { getMarque } from '@/lib/api/marques'
import { getProduits } from '@/lib/api/produits'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CarteProduit from '@/components/product/CarteProduit'
import { ChevronLeft, ChevronRight, SlidersHorizontal, Tag, Package, ArrowUpDown, X } from 'lucide-react'
import Pagination from '@/components/ui/Pagination'

export const dynamic = 'force-dynamic'

const BOUTIQUES = [
  { id: 'mytek',      label: 'Mytek',      active: 'bg-blue-600 text-white border-blue-600',     inactive: 'bg-white text-blue-600 border-blue-200 hover:border-blue-400' },
  { id: 'tunisianet', label: 'Tunisianet', active: 'bg-green-600 text-white border-green-600',   inactive: 'bg-white text-green-600 border-green-200 hover:border-green-400' },
  { id: 'spacenet',   label: 'Spacenet',   active: 'bg-violet-600 text-white border-violet-600', inactive: 'bg-white text-violet-600 border-violet-200 hover:border-violet-400' },
] as const

const BADGE_BOUTIQUE: Record<string, string> = {
  mytek:      'bg-blue-50 text-blue-700',
  tunisianet: 'bg-green-50 text-green-700',
  spacenet:   'bg-violet-50 text-violet-700',
}

interface Props {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{
    page?: string
    boutique?: string
    tri?: string
    prix_min?: string
    prix_max?: string
    en_promo?: string
    en_stock?: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const name = slug.join('/')
  try {
    const marque = await getMarque(name)
    const title = `${marque.nom.toUpperCase()} – Produits au meilleur prix en Tunisie`
    const description = `Découvrez tous les produits ${marque.nom} en Tunisie. Comparez les prix sur Mytek, Tunisianet et Spacenet pour trouver les meilleures offres.`
    return {
      title,
      description,
      alternates: { canonical: `/marque/${name}` },
      openGraph: { title, description, type: 'website' },
    }
  } catch {
    return { title: 'Marque introuvable' }
  }
}

export default async function MarqueDetailPage({ params, searchParams }: Props) {
  const { slug } = await params
  const name = slug.join('/')
  const {
    page = '1',
    boutique = '',
    tri = '',
    prix_min = '',
    prix_max = '',
    en_promo = '',
    en_stock = '',
  } = await searchParams

  let marque = null
  let produits = null

  try { marque = await getMarque(name) } catch { notFound() }
  try {
    produits = await getProduits({
      marque: name,
      page: Number(page),
      boutique: boutique || undefined,
      tri: tri || undefined,
      prix_min: prix_min ? Number(prix_min) : undefined,
      prix_max: prix_max ? Number(prix_max) : undefined,
      en_promo: en_promo === '1',
      en_stock: en_stock === '1',
    })
  } catch {}

  if (!marque) notFound()

  const hasFilters = !!(boutique || tri || prix_min || prix_max || en_promo === '1' || en_stock === '1')
  const nbFiltresActifs = [boutique, tri, (prix_min || prix_max) ? '1' : '', en_promo === '1' ? '1' : '', en_stock === '1' ? '1' : ''].filter(Boolean).length

  const buildFilterUrl = (exclude: string[] = []) => {
    const sp = new URLSearchParams()
    if (boutique && !exclude.includes('boutique')) sp.set('boutique', boutique)
    if (tri && !exclude.includes('tri')) sp.set('tri', tri)
    if (prix_min && !exclude.includes('prix_min')) sp.set('prix_min', prix_min)
    if (prix_max && !exclude.includes('prix_max')) sp.set('prix_max', prix_max)
    if (en_promo === '1' && !exclude.includes('en_promo')) sp.set('en_promo', '1')
    if (en_stock === '1' && !exclude.includes('en_stock')) sp.set('en_stock', '1')
    return sp.toString() ? `?${sp.toString()}` : '?'
  }

  const buildPageUrl = (p: number) => {
    const sp = new URLSearchParams()
    if (p > 1) sp.set('page', String(p))
    if (boutique) sp.set('boutique', boutique)
    if (tri) sp.set('tri', tri)
    if (prix_min) sp.set('prix_min', prix_min)
    if (prix_max) sp.set('prix_max', prix_max)
    if (en_promo === '1') sp.set('en_promo', '1')
    if (en_stock === '1') sp.set('en_stock', '1')
    return sp.toString() ? `?${sp.toString()}` : '?'
  }

  const nbResultats = produits?.meta?.total_items ?? produits?.data.length ?? 0

  return (
    <div>
      {/* Hero marque */}
      <section className="bg-[#0F172A] py-8 px-4 relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-64 h-64 bg-[#F97316] rounded-full blur-[100px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">

          {/* Breadcrumb + bouton retour */}
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/marque"
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-all shrink-0"
              aria-label="Retour aux marques"
            >
              <ChevronLeft size={16} />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-slate-500">
              <Link href="/" className="hover:text-slate-300 transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/marque" className="hover:text-slate-300 transition-colors">Marques</Link>
              <ChevronRight size={12} />
              <span className="text-slate-300 font-medium">{marque.nom}</span>
            </nav>
          </div>

          {/* Titre marque */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center text-xl shrink-0">
              📦
            </div>
            <div>
              <h1 className="font-heading text-white text-2xl md:text-3xl font-bold">{marque.nom}</h1>
              <p className="text-slate-400 text-sm">
                {nbResultats > 0 ? `${nbResultats} produit${nbResultats > 1 ? 's' : ''}` : marque.nombre_produits !== undefined ? `${marque.nombre_produits} produit(s) référencé(s)` : ''}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Panneau filtres */}
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

          <form method="get" className="mt-3 p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex flex-col gap-5">

            {/* Ligne 1 : Boutique + Tri */}
            <div className="flex flex-wrap items-end gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Boutique</span>
                <div className="flex items-center gap-2">
                  {BOUTIQUES.map((b) => (
                    <label key={b.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${boutique === b.id ? b.active : b.inactive}`}>
                      <input type="radio" name="boutique" value={b.id} defaultChecked={boutique === b.id} className="sr-only" />
                      {b.label}
                    </label>
                  ))}
                  <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${!boutique ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-slate-300'}`}>
                    <input type="radio" name="boutique" value="" defaultChecked={!boutique} className="sr-only" />
                    Toutes
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="filter-tri" className="text-xs font-semibold text-[#64748B] uppercase tracking-wide flex items-center gap-1.5">
                  <ArrowUpDown size={12} />
                  Trier par
                </label>
                <select
                  id="filter-tri"
                  name="tri"
                  defaultValue={tri}
                  className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#F97316] bg-white transition-colors appearance-none pr-8 cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.25em 1.25em' }}
                >
                  <option value="">Pertinence</option>
                  <option value="prix_asc">Prix croissant</option>
                  <option value="prix_desc">Prix décroissant</option>
                </select>
              </div>
            </div>

            {/* Ligne 2 : Prix + Checkboxes + Actions */}
            <div className="flex flex-wrap items-end gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Prix (TND)</label>
                <div className="flex items-center gap-2">
                  <input type="number" name="prix_min" defaultValue={prix_min} placeholder="Min" min="0"
                    className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#F97316] bg-white transition-colors w-24" />
                  <span className="text-slate-400 text-sm">—</span>
                  <input type="number" name="prix_max" defaultValue={prix_max} placeholder="Max" min="0"
                    className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#F97316] bg-white transition-colors w-24" />
                </div>
              </div>

              <div className="flex items-center gap-5 pb-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" name="en_promo" value="1" defaultChecked={en_promo === '1'} className="w-4 h-4 rounded accent-[#F97316] cursor-pointer" />
                  <span className="text-sm text-[#1E293B] font-medium flex items-center gap-1.5">
                    <Tag size={13} className="text-[#F97316]" /> En promotion
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" name="en_stock" value="1" defaultChecked={en_stock === '1'} className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="text-sm text-[#1E293B] font-medium flex items-center gap-1.5">
                    <Package size={13} className="text-[#22C55E]" /> En stock
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button type="submit" className="bg-[#F97316] hover:bg-[#EA6C0A] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  Appliquer
                </button>
                {hasFilters && (
                  <a href="?" className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#1E293B] px-3 py-2 rounded-lg border border-[#E2E8F0] hover:border-slate-300 transition-colors bg-white">
                    <X size={13} /> Effacer
                  </a>
                )}
              </div>
            </div>
          </form>

          {/* Badges filtres actifs */}
          {hasFilters && (
            <div className="mt-2 flex flex-wrap gap-2">
              {boutique && (
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${BADGE_BOUTIQUE[boutique] ?? 'bg-slate-100 text-slate-700'}`}>
                  {BOUTIQUES.find(b => b.id === boutique)?.label}
                  <a href={buildFilterUrl(['boutique'])} className="hover:opacity-70"><X size={10} /></a>
                </span>
              )}
              {tri && (
                <span className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-2.5 py-1 rounded-full">
                  {tri === 'prix_asc' ? 'Prix ↑' : 'Prix ↓'}
                  <a href={buildFilterUrl(['tri'])} className="hover:opacity-70"><X size={10} /></a>
                </span>
              )}
              {(prix_min || prix_max) && (
                <span className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-2.5 py-1 rounded-full">
                  {prix_min && prix_max ? `${prix_min} — ${prix_max} TND` : prix_min ? `≥ ${prix_min} TND` : `≤ ${prix_max} TND`}
                  <a href={buildFilterUrl(['prix_min', 'prix_max'])} className="hover:opacity-70"><X size={10} /></a>
                </span>
              )}
              {en_promo === '1' && (
                <span className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-2.5 py-1 rounded-full">
                  <Tag size={10} /> En promotion
                  <a href={buildFilterUrl(['en_promo'])} className="hover:opacity-70"><X size={10} /></a>
                </span>
              )}
              {en_stock === '1' && (
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <Package size={10} /> En stock
                  <a href={buildFilterUrl(['en_stock'])} className="hover:opacity-70"><X size={10} /></a>
                </span>
              )}
            </div>
          )}
        </details>

        {/* Grille produits */}
        {produits && produits.data.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {produits.data.map((p) => <CarteProduit key={p.id} produit={p} />)}
            </div>
            {produits.meta && produits.meta.total_pages > 1 && (
              <Pagination
                currentPage={produits.meta.page}
                totalPages={produits.meta.total_pages}
                buildUrl={buildPageUrl}
              />
            )}
          </>
        ) : (
          <div className="text-center py-20 border border-dashed border-[#E2E8F0] rounded-2xl">
            <p className="font-heading text-[#0F172A] text-lg font-semibold mb-2">Aucun produit trouvé</p>
            <p className="text-[#64748B] text-sm mb-6">
              {hasFilters ? 'Essayez de modifier les filtres.' : `Les produits ${marque.nom} seront bientôt disponibles.`}
            </p>
            {hasFilters && (
              <a href="?" className="inline-flex items-center gap-2 text-[#F97316] text-sm font-semibold hover:underline">
                <X size={14} /> Effacer les filtres
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
