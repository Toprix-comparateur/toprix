import type { Metadata } from 'next'
import Link from 'next/link'
import { getProduits } from '@/lib/api/produits'
import CarteProduit from '@/components/product/CarteProduit'
import { ArrowRight, CheckCircle2, Zap, Droplets, X } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Climeur Mobile Tunisie 2026 — Meilleurs Prix Portatif & Évaporatif | Toprix',
  description: 'Comparez les prix des climeurs mobiles en Tunisie : refroidisseur portatif, évaporatif, sans installation. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
  alternates: { canonical: '/ete/climeur' },
  openGraph: {
    title: 'Climeur Mobile Tunisie 2026 — Meilleurs Prix | Toprix',
    description: 'Trouvez le meilleur climeur mobile au meilleur prix en Tunisie.',
    type: 'website',
  },
}

const GUIDE = [
  { icon: '💧', titre: 'Évaporation naturelle', desc: 'Le même principe que la brise marine : l\'eau s\'évapore et refroidit l\'air de 5 à 10°C. Silencieux, sans gaz réfrigérant.' },
  { icon: '🔌', titre: 'Sans installation', desc: 'Pas de travaux ni de technicien. Remplissez le réservoir d\'eau, branchez et profitez — prêt en 30 secondes.' },
  { icon: '🚶', titre: 'Portatif sur roulettes', desc: 'Déplacez-le de chambre en chambre. Les grands modèles (90L Westpoint) couvrent jusqu\'à 80 m².' },
  { icon: '💸', titre: '10× moins qu\'un clim', desc: 'Un climeur consomme 60–350W contre 800–2000W pour un climatiseur split. Économie de 40 à 70 DT/mois sur la STEG.' },
]

const MARQUES = ['Westpoint', 'Coala', 'Sharp', 'Tornado']

const FAQ = [
  {
    q: 'Comment fonctionne un climeur évaporatif ?',
    r: 'Le climeur aspire l\'air chaud, le fait passer à travers des panneaux humidifiés, puis souffle l\'air rafraîchi. L\'évaporation de l\'eau absorbe la chaleur et baisse la température de l\'air de 5 à 10°C — le même principe naturel que la brise au bord de la mer.',
  },
  {
    q: 'Un climeur est-il efficace en Tunisie ?',
    r: 'Oui, dans les régions intérieures à air sec (Kairouan, Gafsa, Kasserine). En revanche, sur la côte (Tunis, Sfax, Sousse) où l\'humidité est élevée en été, l\'évaporation est réduite et l\'efficacité limitée. Dans ce cas, un climatiseur split reste la meilleure option.',
  },
  {
    q: 'Quelle est la différence entre un climeur Coala et un Westpoint ?',
    r: 'Le Coala (6L, 1500 m³/h) est compact et silencieux, idéal pour une chambre ou un bureau. Le Westpoint grand modèle (90L, 8000-10000 m³/h, 350W) est conçu pour couvrir 60 à 80 m² — parfait pour un salon ou un espace ouvert.',
  },
  {
    q: 'Combien consomme un climeur et quel est le prix de revient ?',
    r: 'Un petit climeur Coala consomme environ 60-100W (comme une ampoule puissante), soit moins de 2 DT/mois. Un grand modèle Westpoint (350W) coûte environ 8-10 DT/mois contre 40-80 DT pour un climatiseur split. C\'est 10 à 15 fois moins cher à utiliser.',
  },
  {
    q: 'Quel est le prix d\'un climeur en Tunisie en 2026 ?',
    r: 'Les petits climeurs de table (6-10L) coûtent entre 150 et 300 DT. Les modèles moyens (15-30L) sont entre 300 et 500 DT. Les grands climeurs industriels (50-90L Westpoint) atteignent 600 à 1 200 DT. Comparez en temps réel sur Toprix.',
  },
]

type SP = { page?: string; marque?: string }
type Props = { searchParams: Promise<SP> }

const BASE = '/ete/climeur'

function buildUrl(sp: SP, update: Partial<SP>): string {
  const p: Record<string, string> = {}
  const marque = 'marque' in update ? update.marque : sp.marque
  const page   = 'page'   in update ? update.page   : undefined
  if (marque) p.marque = marque
  if (page)   p.page = page
  const qs = new URLSearchParams(p).toString()
  return qs ? `${BASE}?${qs}` : BASE
}

function Pagination({ page, total, sp }: { page: number; total: number; sp: SP }) {
  if (total <= 1) return null
  const getPages = (): (number | '...')[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    if (page <= 4) return [1, 2, 3, 4, 5, '...', total]
    if (page >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
    return [1, '...', page - 1, page, page + 1, '...', total]
  }
  return (
    <div className="flex items-center justify-center gap-1.5 pt-10 flex-wrap">
      {page > 1 && (
        <Link href={buildUrl(sp, { page: String(page - 1) })}
          className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-slate-500 hover:border-[#10B981] hover:text-[#10B981] transition-colors">←</Link>
      )}
      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={`e${i}`} className="px-2 text-slate-400 text-sm">…</span>
        ) : (
          <Link key={p} href={buildUrl(sp, { page: String(p) })}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${p === page ? 'bg-[#10B981] text-white font-bold' : 'border border-[#E2E8F0] text-slate-500 hover:border-[#10B981] hover:text-[#10B981]'}`}>
            {p}
          </Link>
        )
      )}
      {page < total && (
        <Link href={buildUrl(sp, { page: String(page + 1) })}
          className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-slate-500 hover:border-[#10B981] hover:text-[#10B981] transition-colors">→</Link>
      )}
    </div>
  )
}

export default async function ClimeurPage({ searchParams }: Props) {
  const sp = await searchParams
  const page   = Math.max(1, Number(sp.page) || 1)
  const marque = sp.marque || ''

  const [produitsRes] = await Promise.allSettled([
    getProduits({ q: 'climeur', marque: marque || undefined, page }),
  ])

  const produits   = produitsRes.status === 'fulfilled' ? produitsRes.value.data : []
  const totalPages = produitsRes.status === 'fulfilled' ? (produitsRes.value.meta?.total_pages ?? 1) : 1
  const totalItems = produitsRes.status === 'fulfilled' ? (produitsRes.value.meta?.total_items ?? produits.length) : produits.length

  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, r }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: r } })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ══════════════ HERO COMPACT ══════════════════════════════════════════ */}
      <section className="relative bg-[#0F172A] overflow-hidden min-h-[140px] flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 to-[#0F172A]" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#34D399] via-[#10B981] to-[#6EE7B7]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-5 w-full">
          <span className="inline-flex items-center gap-1.5 text-[#6EE7B7] text-xs font-bold uppercase tracking-widest mb-2">
            <Droplets size={10} /> Été 2026
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'white' }}>
            Climeurs mobiles Tunisie — Meilleurs prix 2026
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Refroidisseur évaporatif sans installation — portatif, économique, idéal pour cet été.
          </p>
        </div>
      </section>

      {/* ══════════════ FILTRE MARQUE ══════════════════════════════════════════ */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-2">
          <span className="text-[#64748B] text-[11px] font-bold uppercase tracking-widest w-14 shrink-0">Marque</span>
          {MARQUES.map((m) => {
            const active = marque.toLowerCase() === m.toLowerCase()
            return (
              <Link key={m}
                href={buildUrl(sp, { marque: active ? undefined : m.toLowerCase() })}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  active
                    ? 'bg-[#10B981] text-white border-[#10B981]'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-[#10B981] hover:text-white hover:border-[#10B981]'
                }`}>
                {m}
              </Link>
            )
          })}
          {marque && (
            <Link href={BASE}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 transition-all ml-1">
              <X size={10} /> Effacer
            </Link>
          )}
        </div>
      </section>

      {/* ══════════════ GUIDE ACHAT ═══════════════════════════════════════════ */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-[#10B981] text-xs font-bold uppercase tracking-widest mb-3">Guide d&apos;achat</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GUIDE.map(({ icon, titre, desc }) => (
              <div key={titre} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 hover:border-[#A7F3D0] hover:bg-[#ECFDF5] transition-all">
                <div className="text-xl mb-1.5">{icon}</div>
                <p className="font-semibold text-[#0F172A] text-xs mb-1">{titre}</p>
                <p className="text-[#64748B] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">

        {/* ══════════════ GRILLE PRODUITS ═══════════════════════════════════════ */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="w-1 h-7 bg-[#10B981] rounded-full" />
              <div>
                <p className="text-[#10B981] text-[10px] font-bold uppercase tracking-widest">Catalogue</p>
                <h2 className="font-heading text-[#0F172A] text-lg sm:text-xl">
                  {marque ? `Climeurs ${marque.charAt(0).toUpperCase() + marque.slice(1)}` : 'Tous les climeurs mobiles'}
                  {totalItems > 0 && <span className="text-slate-400 text-sm font-normal ml-2">({totalItems})</span>}
                </h2>
              </div>
            </div>
            {marque && (
              <Link href={BASE} className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1">
                <X size={12} /> Réinitialiser
              </Link>
            )}
          </div>

          {produits.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {produits.map((p) => (
                  <CarteProduit key={p.id} produit={p} compact />
                ))}
              </div>
              <Pagination page={page} total={totalPages} sp={sp} />
            </>
          ) : (
            <div className="py-16 text-center">
              <p className="text-slate-400 text-sm mb-3">Aucun produit trouvé pour ce filtre.</p>
              <Link href={BASE} className="text-[#10B981] text-sm hover:underline">Voir tous les climeurs</Link>
            </div>
          )}
        </section>

        {/* ══════════════ BANNER CTA ════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-r from-emerald-950 to-[#0F172A] rounded-2xl overflow-hidden p-6 sm:p-8">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl opacity-20 select-none">💧</div>
          <p className="text-[#6EE7B7] text-xs font-bold uppercase tracking-widest mb-2">Comparez maintenant</p>
          <h3 className="font-heading text-white text-xl sm:text-2xl mb-4">Trouvez le meilleur climeur au meilleur prix</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/rechercher?q=climeur&tri=prix_asc"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors">
              <Zap size={13} /> Prix croissant
            </Link>
            <Link href="/rechercher?q=climeur&en_stock=1"
              className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-white/10 transition-colors">
              <CheckCircle2 size={13} /> En stock
            </Link>
          </div>
        </section>

        {/* ══════════════ LIENS SAISONNIERS ═════════════════════════════════════ */}
        <section>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Voir aussi</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/ete/climatiseurs"
              className="group relative overflow-hidden flex items-center justify-between bg-gradient-to-r from-[#0C4A6E] to-[#0F172A] border border-white/10 rounded-2xl p-5 hover:border-[#38BDF8]/50 transition-all">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-15 select-none">❄️</div>
              <div>
                <p className="text-[#38BDF8] text-xs font-bold uppercase tracking-wide mb-1">Été 2026</p>
                <p className="font-heading text-white text-lg">Climatiseurs</p>
                <p className="text-slate-400 text-sm">Split · Inverter · Chaud/Froid</p>
              </div>
              <ArrowRight size={18} className="text-slate-500 group-hover:text-[#38BDF8] group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
            <Link href="/ete/ventilateurs"
              className="group relative overflow-hidden flex items-center justify-between bg-gradient-to-r from-[#1E3A5F] to-[#0F172A] border border-white/10 rounded-2xl p-5 hover:border-[#93C5FD]/50 transition-all">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-15 select-none">🌬️</div>
              <div>
                <p className="text-[#93C5FD] text-xs font-bold uppercase tracking-wide mb-1">Été 2026</p>
                <p className="font-heading text-white text-lg">Ventilateurs</p>
                <p className="text-slate-400 text-sm">Sur pied · Mural · Table · Portatif</p>
              </div>
              <ArrowRight size={18} className="text-slate-500 group-hover:text-[#93C5FD] group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          </div>
        </section>

        {/* ══════════════ FAQ ═══════════════════════════════════════════════════ */}
        <section>
          <p className="text-[#10B981] text-xs font-bold uppercase tracking-widest mb-4">FAQ</p>
          <div className="divide-y divide-[#E2E8F0]">
            {FAQ.map(({ q, r }) => (
              <div key={q} className="py-5">
                <p className="font-semibold text-[#0F172A] text-sm sm:text-base mb-2 flex items-start gap-2">
                  <span className="text-[#10B981] mt-0.5 shrink-0">Q.</span> {q}
                </p>
                <p className="text-[#64748B] text-sm leading-relaxed pl-5">{r}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
