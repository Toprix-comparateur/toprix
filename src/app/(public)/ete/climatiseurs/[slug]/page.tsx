import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProduits } from '@/lib/api/produits'
import CarteProduit from '@/components/product/CarteProduit'
import { ArrowRight, Zap, CheckCircle2, X, Snowflake } from 'lucide-react'

export const dynamic = 'force-dynamic'

// ══════════════════════════════════════════════════════════════════════════════
// CONFIG — chaque slug → type + valeur API + textes SEO
// ══════════════════════════════════════════════════════════════════════════════

type EntreeConfig = {
  type: 'btu' | 'marque'
  valeur: string          // valeur passée à l'API
  titre: string           // <h1> et title SEO
  description: string     // meta description
  intro: string           // sous-titre hero
  heroFrom: string        // couleur gradient from
}

const CONFIG: Record<string, EntreeConfig> = {
  // ── BTU ────────────────────────────────────────────────────────────────────
  '9000-btu': {
    type: 'btu', valeur: '9000',
    titre: 'Climatiseur 9000 BTU Tunisie — Meilleurs prix 2026',
    description: 'Comparez les climatiseurs 9000 BTU en Tunisie. Idéal pour chambre jusqu\'à 12 m². Dès 859 DT. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
    intro: 'Pour chambre ou bureau jusqu\'à 12 m² — les modèles Inverter tropicalisés dès 859 DT (TCL, Biolux). Comparez tous les prix 9 000 BTU en Tunisie.',
    heroFrom: '#0C4A6E',
  },
  '12000-btu': {
    type: 'btu', valeur: '12000',
    titre: 'Climatiseur 12000 BTU Tunisie — Meilleurs prix 2026',
    description: 'Comparez les climatiseurs 12000 BTU en Tunisie. Idéal pour salon de 12 à 18 m². De 999 à 4 100 DT. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
    intro: 'Pour salon ou chambre de 12 à 18 m² — entrée de gamme dès 999 DT (TCL, Biolux), milieu de gamme Gree/Midea à 1 669–2 279 DT, haut de gamme LG/Samsung jusqu\'à 4 100 DT.',
    heroFrom: '#0C4A6E',
  },
  '18000-btu': {
    type: 'btu', valeur: '18000',
    titre: 'Climatiseur 18000 BTU Tunisie — Meilleurs prix 2026',
    description: 'Comparez les climatiseurs 18000 BTU en Tunisie. Idéal pour grand salon 18 à 25 m². De 1 599 à 2 379 DT. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
    intro: 'Pour grand salon ou open-space de 18 à 25 m² — Midea 18 000 BTU Inverter Chaud/Froid à 2 259 DT, Westpoint Inverter à 2 379 DT. Comparez tous les modèles.',
    heroFrom: '#0C4A6E',
  },
  '24000-btu': {
    type: 'btu', valeur: '24000',
    titre: 'Climatiseur 24000 BTU Tunisie — Meilleurs prix 2026',
    description: 'Comparez les climatiseurs 24000 BTU en Tunisie. Idéal pour grande pièce 25 à 35 m². Meilleures offres chez Mytek, Tunisianet et Spacenet.',
    intro: 'Pour grande pièce, salle de conférence ou open-space de 25 à 35 m² — modèles Inverter tropicalisés disponibles chez Mytek, Tunisianet et Spacenet. Comparez en temps réel.',
    heroFrom: '#0C4A6E',
  },
  // ── MARQUES ────────────────────────────────────────────────────────────────
  'gree': {
    type: 'marque', valeur: 'gree',
    titre: 'Climatiseur Gree Tunisie — Meilleurs prix 2026',
    description: 'Comparez les prix des climatiseurs Gree en Tunisie. G-Boost Inverter Chaud/Froid, 9000 à 24000 BTU. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
    intro: 'Gree — 1ᵉʳ fabricant mondial de climatiseurs. Le G-Boost 12 000 BTU Inverter Chaud/Froid est disponible dès 2 279 DT. Technologie Inverter, tropicalisé, garantie pièces incluse.',
    heroFrom: '#064E3B',
  },
  'midea': {
    type: 'marque', valeur: 'midea',
    titre: 'Climatiseur Midea Tunisie — Meilleurs prix 2026',
    description: 'Comparez les prix des climatiseurs Midea en Tunisie. Inverter Chaud/Froid, 9000 à 24000 BTU. Dès 999 DT. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
    intro: 'Midea — marque mondiale reconnue pour sa fiabilité. Le 18 000 BTU Inverter Chaud/Froid est à 2 259 DT. Large gamme de 9 000 à 24 000 BTU, modèles tropicalisés disponibles.',
    heroFrom: '#1E3A5F',
  },
  'saba': {
    type: 'marque', valeur: 'saba',
    titre: 'Climatiseur SABA Tunisie — Meilleurs prix 2026',
    description: 'Comparez les prix des climatiseurs SABA en Tunisie. Split Inverter Chaud/Froid économique. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
    intro: 'SABA — le bon rapport qualité-prix pour les petits budgets. Modèles split Inverter Chaud/Froid disponibles en 9 000, 12 000 et 18 000 BTU. Idéal pour une première installation.',
    heroFrom: '#312E81',
  },
  'condor': {
    type: 'marque', valeur: 'condor',
    titre: 'Climatiseur Condor Tunisie — Meilleurs prix 2026',
    description: 'Comparez les prix des climatiseurs Condor en Tunisie. Split Inverter robuste et économique. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
    intro: 'Condor — marque algérienne robuste et populaire au Maghreb. Modèles Inverter Chaud/Froid en 9 000, 12 000 et 18 000 BTU, tropicalisés pour le climat tunisien.',
    heroFrom: '#7C2D12',
  },
  'biolux': {
    type: 'marque', valeur: 'biolux',
    titre: 'Climatiseur Biolux Tunisie — Meilleurs prix 2026',
    description: 'Comparez les prix des climatiseurs Biolux en Tunisie. Smart Inverter Chaud/Froid dès 859 DT. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
    intro: 'Biolux — marque accessible avec le Smart Inverter 9 000 BTU dès 859 DT. L\'un des climatiseurs Inverter les moins chers du marché tunisien. Disponible en 9 000, 12 000 et 18 000 BTU.',
    heroFrom: '#14532D',
  },
  'lg': {
    type: 'marque', valeur: 'lg',
    titre: 'Climatiseur LG Tunisie — Meilleurs prix 2026',
    description: 'Comparez les prix des climatiseurs LG en Tunisie. Dual Inverter, ArtCool, WiFi, 9000 à 24000 BTU. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
    intro: 'LG Dual Inverter — technologie silencieuse et économique. De 1 500 DT (9 000 BTU entrée de gamme) à 5 000 DT (ArtCool 24 000 BTU WiFi). La référence haut de gamme en Tunisie.',
    heroFrom: '#1E1B4B',
  },
  'tcl': {
    type: 'marque', valeur: 'tcl',
    titre: 'Climatiseur TCL Tunisie — Meilleurs prix 2026',
    description: 'Comparez les prix des climatiseurs TCL en Tunisie. Inverter Chaud/Froid WiFi dès 859 DT. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
    intro: 'TCL — le meilleur rapport qualité-prix du marché tunisien. L\'Inverter 9 000 BTU démarre à 859 DT. WiFi intégré sur les modèles récents. Disponible en 9 000, 12 000 et 18 000 BTU.',
    heroFrom: '#0C4A6E',
  },
  'samsung': {
    type: 'marque', valeur: 'samsung',
    titre: 'Climatiseur Samsung Tunisie — Meilleurs prix 2026',
    description: 'Comparez les prix des climatiseurs Samsung en Tunisie. WindFree Inverter WiFi, 9000 à 24000 BTU. De 1 800 à 4 100 DT. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
    intro: 'Samsung WindFree — confort sans courant d\'air direct et connectivité WiFi SmartThings. Gamme 9 000 à 24 000 BTU, modèles mid-range de 1 800 à 2 400 DT, haut de gamme jusqu\'à 4 100 DT.',
    heroFrom: '#1E3A5F',
  },
  'cristor': {
    type: 'marque', valeur: 'cristor',
    titre: 'Climatiseur Cristor Tunisie — Meilleurs prix 2026',
    description: 'Comparez les prix des climatiseurs Cristor en Tunisie. Split Inverter Chaud/Froid. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
    intro: 'Cristor — climatiseur économique et fiable pour les petits budgets. Modèles split Inverter Chaud/Froid tropicalisés disponibles en 9 000, 12 000 et 18 000 BTU en Tunisie.',
    heroFrom: '#064E3B',
  },
}

const BTU_SLUGS   = ['9000-btu', '12000-btu', '18000-btu', '24000-btu']
const MARQUE_SLUGS = ['gree', 'midea', 'saba', 'condor', 'biolux', 'lg', 'tcl', 'samsung', 'cristor']

// ══════════════════════════════════════════════════════════════════════════════
// METADATA DYNAMIQUE
// ══════════════════════════════════════════════════════════════════════════════

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const cfg = CONFIG[slug]
  if (!cfg) return { title: 'Climatiseurs Tunisie | Toprix' }
  return {
    title: cfg.titre,
    description: cfg.description,
    alternates: { canonical: `/ete/climatiseurs/${slug}` },
    openGraph: { title: cfg.titre, description: cfg.description, type: 'website' },
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGINATION
// ══════════════════════════════════════════════════════════════════════════════

const BASE_PARENT = '/ete/climatiseurs'

function Pagination({ page, total, slug }: { page: number; total: number; slug: string }) {
  if (total <= 1) return null
  const base = `${BASE_PARENT}/${slug}`
  const url = (p: number) => p === 1 ? base : `${base}?page=${p}`
  const getPages = (): (number | '...')[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    if (page <= 4) return [1, 2, 3, 4, 5, '...', total]
    if (page >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
    return [1, '...', page - 1, page, page + 1, '...', total]
  }
  return (
    <div className="flex items-center justify-center gap-1.5 pt-10 flex-wrap">
      {page > 1 && (
        <Link href={url(page - 1)} className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-slate-500 hover:border-[#38BDF8] hover:text-[#38BDF8] transition-colors">←</Link>
      )}
      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={`e${i}`} className="px-2 text-slate-400 text-sm">…</span>
        ) : (
          <Link key={p} href={url(p as number)}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${p === page ? 'bg-[#0EA5E9] text-white font-bold' : 'border border-[#E2E8F0] text-slate-500 hover:border-[#38BDF8] hover:text-[#38BDF8]'}`}>
            {p}
          </Link>
        )
      )}
      {page < total && (
        <Link href={url(page + 1)} className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-slate-500 hover:border-[#38BDF8] hover:text-[#38BDF8] transition-colors">→</Link>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════════════════════

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function ClimatiseurSlugPage({ params, searchParams }: Props) {
  const { slug } = await params
  const cfg = CONFIG[slug]
  if (!cfg) notFound()

  const sp   = await searchParams
  const page = Math.max(1, Number(sp.page) || 1)

  // Appel API selon le type
  const queryParams = cfg.type === 'btu'
    ? { categorie: 'electromenager/climatisation', q: `${cfg.valeur} btu`, page }
    : { categorie: 'electromenager/climatisation', marque: cfg.valeur, page }

  const [produitsRes] = await Promise.allSettled([getProduits(queryParams)])

  const produits   = produitsRes.status === 'fulfilled' ? produitsRes.value.data : []
  const totalPages = produitsRes.status === 'fulfilled' ? (produitsRes.value.meta?.total_pages ?? 1) : 1
  const totalItems = produitsRes.status === 'fulfilled' ? (produitsRes.value.meta?.total_items ?? produits.length) : produits.length

  // Nom affiché (h1 court)
  const nomAffiche = cfg.type === 'btu'
    ? `Climatiseurs ${cfg.valeur} BTU`
    : `Climatiseurs ${cfg.valeur.charAt(0).toUpperCase() + cfg.valeur.slice(1)}`

  return (
    <>
      {/* ══════════════ HERO COMPACT ══════════════════════════════════════════ */}
      <section className="relative bg-[#0F172A] overflow-hidden min-h-[140px] flex flex-col justify-center">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${cfg.heroFrom}, #0F172A)` }} />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#38BDF8] via-[#0EA5E9] to-[#7DD3FC]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-5 w-full">
          <div className="flex items-center gap-2 mb-2">
            <Link href={BASE_PARENT} className="text-[#7DD3FC] text-xs hover:text-white transition-colors">← Tous les climatiseurs</Link>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[#7DD3FC] text-xs font-bold uppercase tracking-widest mb-2">
            <Snowflake size={10} /> Été 2026
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'white' }}>
            {cfg.titre.replace(' | Toprix', '')}
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.75)' }}>{cfg.intro}</p>
        </div>
      </section>

      {/* ══════════════ FILTRES RAPIDES (autres BTU ou marques) ═══════════════ */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-2">
          {cfg.type === 'btu' ? (
            <>
              <span className="text-[#64748B] text-[11px] font-bold uppercase tracking-widest w-8 shrink-0">BTU</span>
              {BTU_SLUGS.map((s) => (
                <Link key={s} href={`${BASE_PARENT}/${s}`}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    s === slug
                      ? 'bg-[#0EA5E9] text-white border-[#0EA5E9]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-[#0EA5E9] hover:text-white hover:border-[#0EA5E9]'
                  }`}>
                  {s.replace('-btu', ' BTU')}
                </Link>
              ))}
            </>
          ) : (
            <>
              <span className="text-[#64748B] text-[11px] font-bold uppercase tracking-widest w-14 shrink-0">Marque</span>
              {MARQUE_SLUGS.map((s) => (
                <Link key={s} href={`${BASE_PARENT}/${s}`}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    s === slug
                      ? 'bg-[#0EA5E9] text-white border-[#0EA5E9]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-[#0EA5E9] hover:text-white hover:border-[#0EA5E9]'
                  }`}>
                  {s.toUpperCase()}
                </Link>
              ))}
            </>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/* ══════════════ GRILLE PRODUITS ═══════════════════════════════════════ */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="w-1 h-7 bg-[#0EA5E9] rounded-full" />
              <div>
                <p className="text-[#0EA5E9] text-[10px] font-bold uppercase tracking-widest">Catalogue</p>
                <h2 className="font-heading text-[#0F172A] text-lg sm:text-xl">
                  {nomAffiche}
                  {totalItems > 0 && <span className="text-slate-400 text-sm font-normal ml-2">({totalItems})</span>}
                </h2>
              </div>
            </div>
            <Link href={BASE_PARENT} className="text-xs text-slate-400 hover:text-[#0EA5E9] transition-colors flex items-center gap-1">
              <X size={12} /> Effacer le filtre
            </Link>
          </div>

          {produits.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {produits.map((p) => (
                  <CarteProduit key={p.id} produit={p} compact />
                ))}
              </div>
              <Pagination page={page} total={totalPages} slug={slug} />
            </>
          ) : (
            <div className="py-16 text-center">
              <p className="text-slate-400 text-sm mb-3">Aucun produit trouvé.</p>
              <Link href={BASE_PARENT} className="text-[#0EA5E9] text-sm hover:underline">Voir tous les climatiseurs</Link>
            </div>
          )}
        </section>

        {/* ══════════════ BANNER CTA ════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-r from-[#0C4A6E] to-[#0F172A] rounded-2xl overflow-hidden p-6 sm:p-8">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl opacity-20 select-none">❄️</div>
          <p className="text-[#7DD3FC] text-xs font-bold uppercase tracking-widest mb-2">Comparez maintenant</p>
          <h3 className="font-heading text-white text-xl sm:text-2xl mb-4">{nomAffiche} — Meilleur prix garanti</h3>
          <div className="flex flex-wrap gap-3">
            <Link href={`/rechercher?q=climatiseur+${cfg.type === 'btu' ? cfg.valeur + '+btu' : cfg.valeur}&tri=prix_asc`}
              className="inline-flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors">
              <Zap size={13} /> Prix croissant
            </Link>
            <Link href={`/rechercher?q=climatiseur+${cfg.type === 'btu' ? cfg.valeur + '+btu' : cfg.valeur}&en_stock=1`}
              className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-white/10 transition-colors">
              <CheckCircle2 size={13} /> En stock
            </Link>
          </div>
        </section>

        {/* ══════════════ LIENS CROISÉS ══════════════════════════════════════════ */}
        <section>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">
            {cfg.type === 'btu' ? 'Autres puissances' : 'Autres marques'}
          </p>
          <div className="flex flex-wrap gap-2">
            {(cfg.type === 'btu' ? BTU_SLUGS : MARQUE_SLUGS)
              .filter((s) => s !== slug)
              .map((s) => (
                <Link key={s} href={`${BASE_PARENT}/${s}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#475569] hover:border-[#38BDF8] hover:text-[#0EA5E9] transition-all">
                  {cfg.type === 'btu'
                    ? s.replace('-btu', ' BTU')
                    : s.charAt(0).toUpperCase() + s.slice(1)}
                  <ArrowRight size={12} />
                </Link>
              ))}
          </div>
        </section>

        {/* ══════════════ RETOUR CATÉGORIE ═══════════════════════════════════════ */}
        <div className="pt-4 border-t border-[#E2E8F0]">
          <Link href={BASE_PARENT}
            className="inline-flex items-center gap-2 text-sm text-[#0EA5E9] hover:underline">
            ← Voir tous les climatiseurs Tunisie 2026
          </Link>
        </div>

      </div>
    </>
  )
}
