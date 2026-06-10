import type { Metadata } from 'next'
import Link from 'next/link'
import { getProduits } from '@/lib/api/produits'
import CarteProduit from '@/components/product/CarteProduit'
import { ArrowRight, CheckCircle2, Zap, Wind } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Ventilateurs Tunisie 2026 — Meilleurs Prix Sur Pied, Mural & Table | Toprix',
  description: 'Comparez les prix des ventilateurs en Tunisie : sur pied, mural, de table, portatif. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
  alternates: { canonical: '/ete/ventilateurs' },
  openGraph: {
    title: 'Ventilateurs Tunisie 2026 — Meilleurs Prix | Toprix',
    description: 'Trouvez le meilleur ventilateur au meilleur prix en Tunisie.',
    type: 'website',
  },
}

const GUIDE = [
  { icon: '🏠', titre: 'Sur pied', desc: 'Idéal pour salon ou chambre. Oscillation automatique, télécommande, jusqu\'à 3 vitesses.' },
  { icon: '🔩', titre: 'Mural fixe', desc: 'Parfait pour cuisine, atelier ou salle de bain. Fixé au mur, libère l\'espace au sol.' },
  { icon: '🖥️', titre: 'De table', desc: 'Compact et silencieux. Pour bureau, chambre ou nuit. Facile à déplacer.' },
  { icon: '🔋', titre: 'Portatif', desc: 'Rechargeable USB, sans fil. À emporter partout : voiture, terrasse, bureau.' },
]

const MARQUES = ['Coala', 'Orient', 'Samsung', 'LG', 'Maji', 'Solstar', 'HGE']

const FAQ = [
  {
    q: 'Quel ventilateur choisir pour l\'été en Tunisie ?',
    r: 'Pour une chambre ou un bureau, un ventilateur de table suffit. Pour un salon, préférez un modèle sur pied avec télécommande. Pour la cuisine ou une salle d\'eau, optez pour un ventilateur mural fixe.',
  },
  {
    q: 'Quelle est la différence entre un ventilateur et un climatiseur ?',
    r: 'Un ventilateur brasse l\'air sans le refroidir — il est moins coûteux (à l\'achat et à l\'usage) mais moins efficace par forte chaleur. Un climatiseur refroidit réellement l\'air mais consomme plus d\'énergie.',
  },
  {
    q: 'Quel est le prix d\'un ventilateur en Tunisie ?',
    r: 'Les ventilateurs de table ou sur pied d\'entrée de gamme coûtent entre 40 et 150 TND. Les modèles haut de gamme avec télécommande et minuterie atteignent 300 TND. Comparez sur Toprix pour le meilleur prix.',
  },
]

type Props = { searchParams: Promise<{ page?: string }> }

function Pagination({ page, total }: { page: number; total: number }) {
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
        <Link href={`/ete/ventilateurs?page=${page - 1}`}
          className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-slate-500 hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors">
          ←
        </Link>
      )}
      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={`e${i}`} className="px-2 text-slate-400 text-sm">…</span>
        ) : (
          <Link key={p} href={`/ete/ventilateurs?page=${p}`}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${p === page ? 'bg-[#3B82F6] text-white font-bold' : 'border border-[#E2E8F0] text-slate-500 hover:border-[#3B82F6] hover:text-[#3B82F6]'}`}>
            {p}
          </Link>
        )
      )}
      {page < total && (
        <Link href={`/ete/ventilateurs?page=${page + 1}`}
          className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-slate-500 hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors">
          →
        </Link>
      )}
    </div>
  )
}

export default async function VentilateursPage({ searchParams }: Props) {
  const sp = await searchParams
  const page = Math.max(1, Number(sp.page) || 1)

  const [produitsRes] = await Promise.allSettled([
    getProduits({ q: 'ventilateur', page }),
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F] to-[#0F172A]" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#93C5FD]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-5 w-full">
          <span className="inline-flex items-center gap-1.5 text-[#93C5FD] text-xs font-bold uppercase tracking-widest mb-2">
            <Wind size={10} /> Été 2026
          </span>
          <h1 className="font-heading text-white text-2xl sm:text-3xl font-bold leading-tight">
            Ventilateurs Tunisie — Meilleurs prix 2026
          </h1>
          <p className="text-slate-400 text-sm mt-1">Sur pied · Mural · De table · Portatif — Mytek, Tunisianet, Spacenet</p>
        </div>
      </section>

      {/* ══════════════ FILTRE MARQUE ══════════════════════════════════════════ */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-2">
          <span className="text-[#64748B] text-[11px] font-bold uppercase tracking-widest w-14 shrink-0">Marque</span>
          {MARQUES.map((m) => (
            <Link key={m} href={`/rechercher?q=ventilateur+${encodeURIComponent(m.toLowerCase())}`}
              className="px-3 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full text-xs font-medium text-[#475569] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] transition-all">
              {m}
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════ GUIDE ACHAT ═══════════════════════════════════════════ */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-3">Guide d&apos;achat</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GUIDE.map(({ icon, titre, desc }) => (
              <div key={titre} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 hover:border-[#BFDBFE] hover:bg-[#EFF6FF] transition-all">
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
              <span className="w-1 h-7 bg-[#3B82F6] rounded-full" />
              <div>
                <p className="text-[#3B82F6] text-[10px] font-bold uppercase tracking-widest">Catalogue</p>
                <h2 className="font-heading text-[#0F172A] text-lg sm:text-xl">
                  Tous les ventilateurs
                  {totalItems > 0 && <span className="text-slate-400 text-sm font-normal ml-2">({totalItems})</span>}
                </h2>
              </div>
            </div>
            <Link href="/rechercher?q=ventilateur"
              className="hidden sm:flex items-center gap-1 text-sm text-slate-400 hover:text-[#3B82F6] transition-colors">
              Tout voir <ArrowRight size={13} />
            </Link>
          </div>

          {produits.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {produits.map((p) => (
                  <CarteProduit key={p.id} produit={p} compact />
                ))}
              </div>
              <Pagination page={page} total={totalPages} />
            </>
          ) : (
            <p className="text-slate-400 text-sm py-10 text-center">Aucun produit trouvé.</p>
          )}
        </section>

        {/* ══════════════ BANNER CTA ════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-r from-[#1E3A5F] to-[#0F172A] rounded-2xl overflow-hidden p-6 sm:p-8">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl opacity-20 select-none">💨</div>
          <p className="text-[#93C5FD] text-xs font-bold uppercase tracking-widest mb-2">Comparez maintenant</p>
          <h3 className="font-heading text-white text-xl sm:text-2xl mb-4">Trouvez le meilleur ventilateur au meilleur prix</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/rechercher?q=ventilateur&tri=prix_asc"
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors">
              <Zap size={13} /> Prix croissant
            </Link>
            <Link href="/rechercher?q=ventilateur&en_stock=1"
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
            <Link href="/ete/climeur"
              className="group relative overflow-hidden flex items-center justify-between bg-gradient-to-r from-emerald-950 to-[#0F172A] border border-white/10 rounded-2xl p-5 hover:border-[#34D399]/50 transition-all">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-15 select-none">💦</div>
              <div>
                <p className="text-[#34D399] text-xs font-bold uppercase tracking-wide mb-1">Été 2026</p>
                <p className="font-heading text-white text-lg">Climeurs mobiles</p>
                <p className="text-slate-400 text-sm">Portatif · Évaporatif</p>
              </div>
              <ArrowRight size={18} className="text-slate-500 group-hover:text-[#34D399] group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          </div>
        </section>

        {/* ══════════════ FAQ ═══════════════════════════════════════════════════ */}
        <section>
          <p className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-4">FAQ</p>
          <div className="divide-y divide-[#E2E8F0]">
            {FAQ.map(({ q, r }) => (
              <div key={q} className="py-5">
                <p className="font-semibold text-[#0F172A] text-sm sm:text-base mb-2 flex items-start gap-2">
                  <span className="text-[#3B82F6] mt-0.5 shrink-0">Q.</span> {q}
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
