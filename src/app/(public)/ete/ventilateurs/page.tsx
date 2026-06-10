import type { Metadata } from 'next'
import Link from 'next/link'
import { getProduits } from '@/lib/api/produits'
import CarouselProduits from '@/components/ui/CarouselProduits'
import { ArrowRight, Wind, Zap, Star } from 'lucide-react'

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

const TYPES = [
  { label: 'Sur pied', q: 'ventilateur pied' },
  { label: 'Mural', q: 'ventilateur mural' },
  { label: 'De table', q: 'ventilateur table' },
  { label: 'Portatif', q: 'mini ventilateur portatif' },
  { label: 'Tour', q: 'ventilateur tour' },
]

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

export default async function VentilateursPage() {
  const [produitsRes, promosRes] = await Promise.allSettled([
    getProduits({ q: 'ventilateur' }),
    getProduits({ q: 'ventilateur', en_promo: true }),
  ])

  const produits = produitsRes.status === 'fulfilled' ? produitsRes.value.data.slice(0, 20) : []
  const promos   = promosRes.status   === 'fulfilled' ? promosRes.value.data.slice(0, 12)  : []

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, r }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: r },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://toprix.tn' },
      { '@type': 'ListItem', position: 2, name: 'Été 2026', item: 'https://toprix.tn/ete/ventilateurs' },
      { '@type': 'ListItem', position: 3, name: 'Ventilateurs', item: 'https://toprix.tn/ete/ventilateurs' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#0F172A] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#38BDF8] rounded-full blur-[120px] opacity-20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              <Wind size={11} /> Été 2026
            </div>
            <h1 className="font-heading text-white text-3xl sm:text-5xl font-bold leading-tight mb-4">
              Ventilateurs<br />
              <span className="text-[#7DD3FC]">au meilleur prix</span>
            </h1>
            <p className="text-blue-200 text-base sm:text-lg mb-8 leading-relaxed">
              Sur pied · Mural · De table · Portatif — comparez les offres chez Mytek, Tunisianet et Spacenet.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/categories/electromenager/ventilateurs"
                className="inline-flex items-center gap-2 bg-white text-[#0F172A] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Voir tous les ventilateurs <ArrowRight size={14} />
              </Link>
              <Link
                href="/rechercher?q=ventilateur"
                className="inline-flex items-center gap-2 border border-white/30 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                Recherche avancée
              </Link>
            </div>
          </div>
        </div>

        {/* Types */}
        <div className="relative border-t border-white/10 bg-white/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-2">
            {TYPES.map(({ label }) => (
              <span key={label} className="flex items-center gap-1.5 text-white/70 text-sm">
                <Zap size={10} className="text-[#7DD3FC]" /> {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* ── Promos ───────────────────────────────────────────────────────── */}
        {promos.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-1">Offres spéciales</p>
                <h2 className="font-heading text-[#0F172A] text-2xl">Ventilateurs en promotion</h2>
              </div>
              <Link href="/rechercher?q=ventilateur&en_promo=1" className="text-sm text-slate-500 hover:text-[#F97316] flex items-center gap-1 transition-colors">
                Voir tout <ArrowRight size={13} />
              </Link>
            </div>
            <CarouselProduits produits={promos} />
          </section>
        )}

        {/* ── Tous les ventilateurs ─────────────────────────────────────────── */}
        {produits.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-widest mb-1">Catalogue</p>
                <h2 className="font-heading text-[#0F172A] text-2xl">Tous les ventilateurs</h2>
              </div>
              <Link href="/rechercher?q=ventilateur" className="text-sm text-slate-500 hover:text-[#F97316] flex items-center gap-1 transition-colors">
                Voir tout <ArrowRight size={13} />
              </Link>
            </div>
            <CarouselProduits produits={produits} />
          </section>
        )}

        {/* ── Types de ventilateurs ────────────────────────────────────────── */}
        <section>
          <h2 className="font-heading text-[#0F172A] text-xl mb-4">Par type</h2>
          <div className="flex flex-wrap gap-2">
            {TYPES.map(({ label, q }) => (
              <Link
                key={label}
                href={`/rechercher?q=${encodeURIComponent(q)}`}
                className="px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#475569] hover:border-[#0EA5E9] hover:text-[#0284C7] transition-all"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── Liens saisonniers ────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/ete/climatiseurs" className="group flex items-center justify-between bg-[#F0F9FF] border border-[#BAE6FD] rounded-2xl p-5 hover:border-[#0EA5E9] transition-all">
            <div>
              <p className="text-xs text-[#0EA5E9] font-semibold uppercase tracking-wide mb-1">Voir aussi</p>
              <p className="font-heading text-[#0F172A] text-lg">Climatiseurs</p>
              <p className="text-slate-500 text-sm">Split · Inverter · Chaud/Froid</p>
            </div>
            <ArrowRight size={18} className="text-[#0EA5E9] group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/ete/climeur" className="group flex items-center justify-between bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 hover:border-[#22C55E] transition-all">
            <div>
              <p className="text-xs text-[#22C55E] font-semibold uppercase tracking-wide mb-1">Voir aussi</p>
              <p className="font-heading text-[#0F172A] text-lg">Climeurs mobiles</p>
              <p className="text-slate-500 text-sm">Portatif · Évaporatif</p>
            </div>
            <ArrowRight size={18} className="text-[#22C55E] group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8">
          <h2 className="font-heading text-[#0F172A] text-xl mb-6">Questions fréquentes — Ventilateurs</h2>
          <div className="space-y-4">
            {FAQ.map(({ q, r }) => (
              <div key={q} className="border-b border-[#E2E8F0] pb-4 last:border-0 last:pb-0">
                <p className="font-semibold text-[#1E293B] text-sm mb-1">{q}</p>
                <p className="text-[#64748B] text-sm leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
