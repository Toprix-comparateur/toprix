import type { Metadata } from 'next'
import Link from 'next/link'
import { getProduits } from '@/lib/api/produits'
import CarouselProduits from '@/components/ui/CarouselProduits'
import { ArrowRight, Wind, Thermometer, Zap, Star } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Climatiseurs Tunisie 2026 — Meilleurs Prix Split & Inverter | Toprix',
  description: 'Comparez les prix des climatiseurs en Tunisie : Split, Inverter, Chaud/Froid. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
  alternates: { canonical: '/ete/climatiseurs' },
  openGraph: {
    title: 'Climatiseurs Tunisie 2026 — Meilleurs Prix | Toprix',
    description: 'Trouvez le meilleur prix pour votre climatiseur en Tunisie.',
    type: 'website',
  },
}

const MARQUES = ['Gree', 'LG', 'Samsung', 'Coala', 'Sharp', 'Bosch', 'Tornado']

const FAQ = [
  {
    q: 'Quel climatiseur choisir en Tunisie ?',
    r: 'Pour un usage résidentiel en Tunisie, privilégiez un modèle Inverter tropicalisé entre 9 000 et 18 000 BTU selon la superficie de la pièce. Les marques Gree, LG et Samsung offrent le meilleur rapport qualité/prix.',
  },
  {
    q: 'Quelle est la différence entre un climatiseur On/Off et Inverter ?',
    r: 'Le climatiseur Inverter ajuste sa puissance en continu, ce qui le rend 30 à 50 % plus économique en énergie. Le modèle On/Off fonctionne à pleine puissance ou s\'arrête, consommant plus d\'électricité.',
  },
  {
    q: 'Combien coûte un climatiseur en Tunisie ?',
    r: 'Les prix varient de 800 TND pour un modèle entrée de gamme à plus de 3 000 TND pour un Inverter haute gamme. Comparez les offres en temps réel sur Toprix pour trouver le meilleur prix.',
  },
]

export default async function ClimatiseursPage() {
  const [produitsRes, promosRes] = await Promise.allSettled([
    getProduits({ categorie: 'electromenager/climatisation' }),
    getProduits({ categorie: 'electromenager/climatisation', en_promo: true }),
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
      { '@type': 'ListItem', position: 2, name: 'Été 2026', item: 'https://toprix.tn/ete/climatiseurs' },
      { '@type': 'ListItem', position: 3, name: 'Climatiseurs', item: 'https://toprix.tn/ete/climatiseurs' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#0F172A] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#38BDF8] rounded-full blur-[100px] opacity-30 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              <Zap size={11} /> Été 2026
            </div>
            <h1 className="font-heading text-white text-3xl sm:text-5xl font-bold leading-tight mb-4">
              Climatiseurs<br />
              <span className="text-[#7DD3FC]">au meilleur prix</span>
            </h1>
            <p className="text-blue-200 text-base sm:text-lg mb-8 leading-relaxed">
              Split · Inverter · Chaud/Froid · Tropicalisé — comparez les offres chez Mytek, Tunisianet et Spacenet.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/categories/electromenager/climatisation"
                className="inline-flex items-center gap-2 bg-white text-[#0284C7] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Voir tous les climatiseurs <ArrowRight size={14} />
              </Link>
              <Link
                href="/rechercher?q=climatiseur&categorie=electromenager"
                className="inline-flex items-center gap-2 border border-white/30 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                Recherche avancée
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative border-t border-white/10 bg-white/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-6 sm:gap-12">
            {[
              { icon: Wind, label: 'Split & Inverter' },
              { icon: Thermometer, label: 'Chaud/Froid' },
              { icon: Star, label: 'Tropicalisé Tunisie' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/70 text-sm">
                <Icon size={14} className="text-[#7DD3FC]" />
                {label}
              </div>
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
                <h2 className="font-heading text-[#0F172A] text-2xl">Climatiseurs en promotion</h2>
              </div>
              <Link href="/categories/electromenager/climatisation?en_promo=1" className="text-sm text-slate-500 hover:text-[#F97316] flex items-center gap-1 transition-colors">
                Voir tout <ArrowRight size={13} />
              </Link>
            </div>
            <CarouselProduits produits={promos} />
          </section>
        )}

        {/* ── Tous les climatiseurs ─────────────────────────────────────────── */}
        {produits.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-widest mb-1">Catalogue</p>
                <h2 className="font-heading text-[#0F172A] text-2xl">Tous les climatiseurs</h2>
              </div>
              <Link href="/categories/electromenager/climatisation" className="text-sm text-slate-500 hover:text-[#F97316] flex items-center gap-1 transition-colors">
                Voir tout <ArrowRight size={13} />
              </Link>
            </div>
            <CarouselProduits produits={produits} />
          </section>
        )}

        {/* ── Marques ──────────────────────────────────────────────────────── */}
        <section>
          <h2 className="font-heading text-[#0F172A] text-xl mb-4">Climatiseurs par marque</h2>
          <div className="flex flex-wrap gap-2">
            {MARQUES.map((m) => (
              <Link
                key={m}
                href={`/categories/electromenager/climatisation?marque=${m.toLowerCase()}`}
                className="px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#475569] hover:border-[#0EA5E9] hover:text-[#0284C7] transition-all"
              >
                {m}
              </Link>
            ))}
          </div>
        </section>

        {/* ── Liens saisonniers ────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/ete/ventilateurs" className="group flex items-center justify-between bg-[#F0F9FF] border border-[#BAE6FD] rounded-2xl p-5 hover:border-[#0EA5E9] transition-all">
            <div>
              <p className="text-xs text-[#0EA5E9] font-semibold uppercase tracking-wide mb-1">Voir aussi</p>
              <p className="font-heading text-[#0F172A] text-lg">Ventilateurs</p>
              <p className="text-slate-500 text-sm">Sur pied · Mural · De table</p>
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
          <h2 className="font-heading text-[#0F172A] text-xl mb-6">Questions fréquentes — Climatiseurs</h2>
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
