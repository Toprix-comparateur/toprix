import type { Metadata } from 'next'
import Link from 'next/link'
import { getProduits } from '@/lib/api/produits'
import CarouselEdito from '@/components/ui/CarouselEdito'
import CarouselProduits from '@/components/ui/CarouselProduits'
import { ArrowRight, Wind, Tag, Zap, CheckCircle2 } from 'lucide-react'

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

const TYPES = [
  { label: 'Sur pied', q: 'ventilateur pied' },
  { label: 'Mural', q: 'ventilateur mural' },
  { label: 'De table', q: 'ventilateur table' },
  { label: 'Tour', q: 'ventilateur tour' },
  { label: 'Portatif rechargeable', q: 'mini ventilateur portatif' },
  { label: 'Brasseur d\'air', q: 'brasseur air' },
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
  const promos   = promosRes.status   === 'fulfilled' ? promosRes.value.data.slice(0, 16)  : []

  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, r }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: r } })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ══════════════ HERO ══════════════════════════════════════════════════ */}
      <section className="relative bg-[#0F172A] overflow-hidden min-h-[420px] flex flex-col justify-center">

        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] via-[#0F172A] to-[#0F172A]" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#93C5FD]" />
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] bg-[#3B82F6] rounded-full blur-[150px] opacity-10 pointer-events-none" />

        <div className="absolute right-4 sm:right-16 top-1/2 -translate-y-1/2 text-[120px] sm:text-[180px] opacity-10 select-none pointer-events-none leading-none">
          🌬️
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#3B82F6]/20 border border-[#60A5FA]/30 text-[#93C5FD] text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              <Wind size={11} /> Été 2026
            </div>

            <h1 className="font-heading text-white text-4xl sm:text-6xl font-extrabold leading-[1.05] mb-5">
              Venti&shy;lateurs<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#93C5FD]">
                meilleurs prix
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
              Sur pied · Mural · De table · Portatif<br className="hidden sm:block" />
              Comparez en temps réel chez Mytek, Tunisianet et Spacenet.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/rechercher?q=ventilateur"
                className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-[#3B82F6]/25">
                Voir tous les ventilateurs <ArrowRight size={15} />
              </Link>
              <Link href="/rechercher?q=ventilateur&en_promo=1"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-[#60A5FA] text-slate-300 hover:text-white text-sm font-medium px-5 py-3 rounded-xl transition-all">
                <Tag size={13} /> Promotions
              </Link>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                { val: '180+', label: 'Modèles' },
                { val: '3', label: 'Boutiques' },
                { val: '40–300', label: 'TND' },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="font-heading text-white text-2xl font-bold">{val}</p>
                  <p className="text-slate-500 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ GUIDE ACHAT ═══════════════════════════════════════════ */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-4">Guide d&apos;achat</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GUIDE.map(({ icon, titre, desc }) => (
              <div key={titre} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 hover:border-[#BFDBFE] hover:bg-[#EFF6FF] transition-all">
                <div className="text-2xl mb-2">{icon}</div>
                <p className="font-semibold text-[#0F172A] text-sm mb-1">{titre}</p>
                <p className="text-[#64748B] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-14">

        {promos.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="w-1 h-8 bg-[#F97316] rounded-full" />
                <div>
                  <p className="text-[#F97316] text-[10px] font-bold uppercase tracking-widest">Offres limitées</p>
                  <h2 className="font-heading text-[#0F172A] text-xl sm:text-2xl">Ventilateurs en promotion</h2>
                </div>
              </div>
              <Link href="/rechercher?q=ventilateur&en_promo=1"
                className="hidden sm:flex items-center gap-1 text-sm text-slate-500 hover:text-[#F97316] transition-colors">
                Tout voir <ArrowRight size={13} />
              </Link>
            </div>
            <CarouselEdito produits={promos} />
          </section>
        )}

        {produits.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="w-1 h-8 bg-[#3B82F6] rounded-full" />
                <div>
                  <p className="text-[#3B82F6] text-[10px] font-bold uppercase tracking-widest">Catalogue complet</p>
                  <h2 className="font-heading text-[#0F172A] text-xl sm:text-2xl">Tous les ventilateurs</h2>
                </div>
              </div>
              <Link href="/rechercher?q=ventilateur"
                className="hidden sm:flex items-center gap-1 text-sm text-slate-500 hover:text-[#3B82F6] transition-colors">
                Tout voir <ArrowRight size={13} />
              </Link>
            </div>
            <CarouselProduits produits={produits} />
          </section>
        )}

        {/* Types */}
        <section>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Par type</p>
          <div className="flex flex-wrap gap-2">
            {TYPES.map(({ label, q }) => (
              <Link key={label} href={`/rechercher?q=${encodeURIComponent(q)}`}
                className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#475569] hover:border-[#3B82F6] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-all shadow-sm">
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* Banner CTA */}
        <section className="relative bg-gradient-to-r from-[#1E3A5F] to-[#0F172A] rounded-3xl overflow-hidden p-8 sm:p-10">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-7xl opacity-20 select-none">💨</div>
          <p className="text-[#93C5FD] text-xs font-bold uppercase tracking-widest mb-2">Comparez maintenant</p>
          <h3 className="font-heading text-white text-2xl sm:text-3xl mb-4">Trouvez le meilleur ventilateur<br />au meilleur prix</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/rechercher?q=ventilateur&tri=prix_asc"
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
              <Zap size={13} /> Prix croissant
            </Link>
            <Link href="/rechercher?q=ventilateur&en_stock=1"
              className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors">
              <CheckCircle2 size={13} /> En stock
            </Link>
          </div>
        </section>

        {/* Liens saisonniers */}
        <section>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">Voir aussi</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/ete/climatiseurs"
              className="group relative overflow-hidden flex items-center justify-between bg-gradient-to-r from-[#0C4A6E] to-[#0F172A] border border-white/10 rounded-2xl p-6 hover:border-[#38BDF8]/50 transition-all">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-15 select-none">❄️</div>
              <div>
                <p className="text-[#38BDF8] text-xs font-bold uppercase tracking-wide mb-1">Été 2026</p>
                <p className="font-heading text-white text-lg">Climatiseurs</p>
                <p className="text-slate-400 text-sm">Split · Inverter · Chaud/Froid</p>
              </div>
              <ArrowRight size={18} className="text-slate-500 group-hover:text-[#38BDF8] group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
            <Link href="/ete/climeur"
              className="group relative overflow-hidden flex items-center justify-between bg-gradient-to-r from-emerald-950 to-[#0F172A] border border-white/10 rounded-2xl p-6 hover:border-[#34D399]/50 transition-all">
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

        {/* FAQ */}
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
