import type { Metadata } from 'next'
import Link from 'next/link'
import { getProduits } from '@/lib/api/produits'
import CarouselProduits from '@/components/ui/CarouselProduits'
import { ArrowRight, Droplets, Zap } from 'lucide-react'

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

const FAQ = [
  {
    q: 'Qu\'est-ce qu\'un climeur mobile ?',
    r: 'Un climeur (ou refroidisseur d\'air évaporatif) est un appareil portatif qui refroidit l\'air par évaporation d\'eau. Il ne nécessite pas d\'installation, consomme peu d\'énergie et est idéal pour les pièces sans climatisation fixe.',
  },
  {
    q: 'Quelle est la différence entre un climeur et un climatiseur ?',
    r: 'Le climeur utilise de l\'eau pour refroidir l\'air par évaporation — il est moins cher (à l\'achat et à l\'usage) mais moins puissant par forte humidité. Le climatiseur split est plus efficace mais nécessite une installation fixe.',
  },
  {
    q: 'Quel est le prix d\'un climeur en Tunisie ?',
    r: 'Les climeurs mobiles coûtent entre 200 et 600 TND selon la capacité du réservoir et la puissance. Comparez les prix en temps réel sur Toprix pour trouver la meilleure offre.',
  },
]

export default async function ClimeurPage() {
  const [produitsRes, promosRes] = await Promise.allSettled([
    getProduits({ q: 'climeur' }),
    getProduits({ q: 'climeur', en_promo: true }),
  ])

  const produits = produitsRes.status === 'fulfilled' ? produitsRes.value.data : []
  const promos   = promosRes.status   === 'fulfilled' ? promosRes.value.data  : []

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
      { '@type': 'ListItem', position: 2, name: 'Été 2026', item: 'https://toprix.tn/ete/climeur' },
      { '@type': 'ListItem', position: 3, name: 'Climeurs mobiles', item: 'https://toprix.tn/ete/climeur' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#0F172A] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute -top-20 right-0 w-72 h-72 bg-[#34D399] rounded-full blur-[120px] opacity-20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              <Droplets size={11} /> Été 2026
            </div>
            <h1 className="font-heading text-white text-3xl sm:text-5xl font-bold leading-tight mb-4">
              Climeurs mobiles<br />
              <span className="text-[#6EE7B7]">au meilleur prix</span>
            </h1>
            <p className="text-emerald-200 text-base sm:text-lg mb-8 leading-relaxed">
              Portatif · Évaporatif · Sans installation — comparez les offres chez Mytek, Tunisianet et Spacenet.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/rechercher?q=climeur"
                className="inline-flex items-center gap-2 bg-white text-[#065F46] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                Voir tous les climeurs <ArrowRight size={14} />
              </Link>
              <Link
                href="/ete/climatiseurs"
                className="inline-flex items-center gap-2 border border-white/30 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                Voir les climatiseurs
              </Link>
            </div>
          </div>
        </div>

        {/* Avantages */}
        <div className="relative border-t border-white/10 bg-white/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-6">
            {['Sans installation', 'Économique', 'Portatif', 'Réservoir d\'eau'].map((label) => (
              <span key={label} className="flex items-center gap-1.5 text-white/70 text-sm">
                <Zap size={10} className="text-[#6EE7B7]" /> {label}
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
                <h2 className="font-heading text-[#0F172A] text-2xl">Climeurs en promotion</h2>
              </div>
              <Link href="/rechercher?q=climeur&en_promo=1" className="text-sm text-slate-500 hover:text-[#F97316] flex items-center gap-1 transition-colors">
                Voir tout <ArrowRight size={13} />
              </Link>
            </div>
            <CarouselProduits produits={promos} />
          </section>
        )}

        {/* ── Tous les climeurs ─────────────────────────────────────────────── */}
        {produits.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-1">Catalogue</p>
                <h2 className="font-heading text-[#0F172A] text-2xl">Tous les climeurs mobiles</h2>
              </div>
              <Link href="/rechercher?q=climeur" className="text-sm text-slate-500 hover:text-[#F97316] flex items-center gap-1 transition-colors">
                Voir tout <ArrowRight size={13} />
              </Link>
            </div>
            <CarouselProduits produits={produits} />
          </section>
        )}

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
          <Link href="/ete/ventilateurs" className="group flex items-center justify-between bg-[#F0F9FF] border border-[#BAE6FD] rounded-2xl p-5 hover:border-[#38BDF8] transition-all">
            <div>
              <p className="text-xs text-[#38BDF8] font-semibold uppercase tracking-wide mb-1">Voir aussi</p>
              <p className="font-heading text-[#0F172A] text-lg">Ventilateurs</p>
              <p className="text-slate-500 text-sm">Sur pied · Mural · De table</p>
            </div>
            <ArrowRight size={18} className="text-[#38BDF8] group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8">
          <h2 className="font-heading text-[#0F172A] text-xl mb-6">Questions fréquentes — Climeurs mobiles</h2>
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
